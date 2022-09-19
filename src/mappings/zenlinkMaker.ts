import { decodeHex, EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { Big as BigDecimal } from 'big.js'
import * as ZenlinkMakerContract from '../abis/ZenlinkMaker'
import { 
  ZenlinkMakerConvertEvent, 
  ZenlinkMakerConvertPairData, 
  ZenlinkMakerConvertStableSwapData 
} from "../model";
import { findUSDPerToken } from "../utils/pricing";
import { getOrCreateToken } from "../entities/token";
import { updateZenlinkMakerInfo } from "../utils/updates";
import { ZLK } from "../consts";
import { getEvmLogArgs } from "../utils/helpers";

export async function handleConvertPair(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = ZenlinkMakerContract.events[
    'LogConvertPair(address,address,address,uint256,uint256,uint256)'
  ].decode(getEvmLogArgs(ctx))
  const { sender, token0, token1, amount0, amount1, amountZLK } = event

  const log = new ZenlinkMakerConvertEvent({
    id: `convert_pair-${ctx.event.evmTxHash}-${ctx.event.indexInBlock}`,
    contract: getEvmLogArgs(ctx).address,
    data: new ZenlinkMakerConvertPairData({
      sender,
      token0,
      token1,
      amount0: amount0.toBigInt(),
      amount1: amount1.toBigInt(),
      amountZLK: amountZLK.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })
  await ctx.store.save(log)

  const zlk = await getOrCreateToken(ctx, ZLK)
  const zlkUSDPrice = await findUSDPerToken(ctx, ZLK)
  const amountDecimal = BigDecimal(amountZLK.toString()).div(10 ** zlk.decimals)
  const amountUSD = amountDecimal.mul(zlkUSDPrice)

  await updateZenlinkMakerInfo(ctx, amountDecimal, amountUSD)
}

export async function handleConvertStableSwap(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = ZenlinkMakerContract.events[
    'LogConvertStableSwap(address,address,address,uint256,uint256)'
  ].decode(getEvmLogArgs(ctx))
  const { sender, token, pool, amount, amountZLK } = event

  const log = new ZenlinkMakerConvertEvent({
    id: `convert_stable_swap-${ctx.event.evmTxHash}-${ctx.event.indexInBlock}`,
    contract: getEvmLogArgs(ctx).address,
    data: new ZenlinkMakerConvertStableSwapData({
      sender,
      token,
      pool,
      amount: amount.toBigInt(),
      amountZLK: amountZLK.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })
  await ctx.store.save(log)

  const zlk = await getOrCreateToken(ctx, ZLK)
  const zlkUSDPrice = await findUSDPerToken(ctx, ZLK)
  const amountDecimal = BigDecimal(amountZLK.toString()).div(10 ** zlk.decimals)
  const amountUSD = amountDecimal.mul(zlkUSDPrice)

  await updateZenlinkMakerInfo(ctx, amountDecimal, amountUSD)
}
