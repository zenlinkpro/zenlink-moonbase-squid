import { lookupArchive } from "@subsquid/archive-registry";
import { EvmLogHandlerContext, SubstrateBatchProcessor } from "@subsquid/substrate-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { CHAIN_NODE, DISPATCHER, FACTORY_ADDRESS, FOUR_POOL, VXZLK, ZENLINK_MAKER } from "./consts";
import { handleNewPair } from "./mappings/factory";
import { Pair } from "./model";
import { handleBurn, handleMint, handleSwap, handleSync, handleTransfer } from "./mappings/pair";
import {
  handleRampA,
  handleStableSwapAddLiquidity,
  handleStableSwapExchange,
  handleStableSwapNewFee,
  handleStableSwapRemoveLiquidity,
  handleStableSwapRemoveLiquidityImbalance,
  handleStableSwapRemoveLiquidityOne,
  handleStopRampA
} from "./mappings/stableSwap";
import { handleConvertPair, handleConvertStableSwap } from "./mappings/zenlinkMaker";
import { handleMintVXZLK, handleRedeemVXZLK } from "./mappings/vxzlk";
import { handleDispatch } from "./mappings/rewardDispatcher";
import { getEvmLogArgs } from "./utils/helpers";
import * as factory from './abis/factory'
import * as pair from './abis/pair'
import * as StableSwapContract from "./abis/StableSwap"
import * as ZenlinkMakerContract from './abis/ZenlinkMaker'
import * as VXZLKContract from './abis/vxZenlinkToken'
import * as DispatcherContract from './abis/RewardDispatcher'

const database = new TypeormDatabase()
const processor = new SubstrateBatchProcessor()
  .setBatchSize(100)
  .setBlockRange({ from: 2782045 })
  .setDataSource({
    chain: CHAIN_NODE,
    archive: lookupArchive('moonbase', { release: "FireSquid" })
  })
  .addEvmLog(FACTORY_ADDRESS, {
    filter: [factory.events['PairCreated(address,address,address,uint256)'].topic],
  })
  .addEvmLog('*', {
    filter: [
      [
        pair.events['Transfer(address,address,uint256)'].topic,
        pair.events['Sync(uint112,uint112)'].topic,
        pair.events['Swap(address,uint256,uint256,uint256,uint256,address)'].topic,
        pair.events['Mint(address,uint256,uint256)'].topic,
        pair.events['Burn(address,uint256,uint256,address)'].topic,
      ],
    ],
  })
  .addEvmLog(FOUR_POOL, {
    filter: [
      [
        StableSwapContract.events['NewFee(uint256,uint256)'].topic,
        StableSwapContract.events['RampA(uint256,uint256,uint256,uint256)'].topic,
        StableSwapContract.events['StopRampA(uint256,uint256)'].topic,
        StableSwapContract.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic,
        StableSwapContract.events['RemoveLiquidity(address,uint256[],uint256[],uint256)'].topic,
        StableSwapContract.events['RemoveLiquidityOne(address,uint256,uint256,uint256)'].topic,
        StableSwapContract.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic,
        StableSwapContract.events['TokenExchange(address,uint256,uint256,uint256,uint256)'].topic
      ],
    ],
    range: { from: 2782402 }
  })
  .addEvmLog(ZENLINK_MAKER, {
    filter: [
      [
        ZenlinkMakerContract.events['LogConvertPair(address,address,address,uint256,uint256,uint256)'].topic,
        ZenlinkMakerContract.events['LogConvertStableSwap(address,address,address,uint256,uint256)'].topic,
      ],
    ],
    range: { from: 2782586 }
  })
  .addEvmLog(VXZLK, {
    filter: [
      [
        VXZLKContract.events['Deposit(address,address,uint256,uint256)'].topic,
        VXZLKContract.events['WithdrawVXZLK(address,address,address,uint256,uint256,uint256)'].topic,
      ],
    ],
    range: { from: 2782509 }
  })
  .addEvmLog(DISPATCHER, {
    filter: [DispatcherContract.events['DispatchReward(address,address,uint256)'].topic],
    range: { from: 2839018 }
  })

processor.run(database, async (ctx) => {
  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.kind === 'event' && item.name === 'EVM.Log') {
        await handleEvmLog({ ...ctx, block: block.header, event: item.event })
      }
    }
  }
})

const knownPairContracts: Set<string> = new Set()

async function tryIsPairInvolved(store: Store, address: string) {
  try {
    return (await store.countBy(Pair, { id: address })) > 0
  } catch {
    return false
  }
}

async function isKnownPairContracts(store: Store, address: string) {
  const normalizedAddress = address.toLowerCase()
  if (knownPairContracts.has(normalizedAddress)) {
    return true
  }
  if (await tryIsPairInvolved(store, normalizedAddress)) {
    knownPairContracts.add(normalizedAddress)
    return true
  }
  return false
}

async function handleEvmLog(ctx: EvmLogHandlerContext<Store>) {
  const contractAddress = getEvmLogArgs(ctx).address
  const firstTopic = getEvmLogArgs(ctx).topics[0]

  switch (contractAddress) {
    case FACTORY_ADDRESS:
      await handleNewPair(ctx)
      break
    case FOUR_POOL:
      switch (firstTopic) {
        case StableSwapContract.events['NewFee(uint256,uint256)'].topic:
          await handleStableSwapNewFee(ctx)
          break
        case StableSwapContract.events['RampA(uint256,uint256,uint256,uint256)'].topic:
          await handleRampA(ctx)
          break
        case StableSwapContract.events['StopRampA(uint256,uint256)'].topic:
          await handleStopRampA(ctx)
          break
        case StableSwapContract.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic:
          await handleStableSwapAddLiquidity(ctx)
          break
        case StableSwapContract.events['RemoveLiquidity(address,uint256[],uint256[],uint256)'].topic:
          await handleStableSwapRemoveLiquidity(ctx)
          break
        case StableSwapContract.events['RemoveLiquidityOne(address,uint256,uint256,uint256)'].topic:
          await handleStableSwapRemoveLiquidityOne(ctx)
          break
        case StableSwapContract.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic:
          await handleStableSwapRemoveLiquidityImbalance(ctx)
          break
        case StableSwapContract.events['TokenExchange(address,uint256,uint256,uint256,uint256)'].topic:
          await handleStableSwapExchange(ctx)
          break
        default:
          break
      }
      break
    case ZENLINK_MAKER:
      switch (firstTopic) {
        case ZenlinkMakerContract.events['LogConvertPair(address,address,address,uint256,uint256,uint256)'].topic:
          await handleConvertPair(ctx)
          break
        case ZenlinkMakerContract.events['LogConvertStableSwap(address,address,address,uint256,uint256)'].topic:
          await handleConvertStableSwap(ctx)
          break
        default:
          break
      }
      break
    case VXZLK:
      switch (firstTopic) {
        case VXZLKContract.events['Deposit(address,address,uint256,uint256)'].topic:
          await handleMintVXZLK(ctx)
          break
        case VXZLKContract.events['WithdrawVXZLK(address,address,address,uint256,uint256,uint256)'].topic:
          await handleRedeemVXZLK(ctx)
          break
        default:
          break
      }
      break
    case DISPATCHER:
      switch (firstTopic) {
        case DispatcherContract.events['DispatchReward(address,address,uint256)'].topic:
          await handleDispatch(ctx)
          break
        default:
          break
      }
      break
    default:
      if (await isKnownPairContracts(ctx.store, contractAddress)) {
        switch (firstTopic) {
          case pair.events['Transfer(address,address,uint256)'].topic:
            await handleTransfer(ctx)
            break
          case pair.events['Sync(uint112,uint112)'].topic:
            await handleSync(ctx)
            break
          case pair.events['Swap(address,uint256,uint256,uint256,uint256,address)'].topic:
            await handleSwap(ctx)
            break
          case pair.events['Mint(address,uint256,uint256)'].topic:
            await handleMint(ctx)
            break
          case pair.events['Burn(address,uint256,uint256,address)'].topic:
            await handleBurn(ctx)
            break
          default:
            break
        }
      }
  }
}
