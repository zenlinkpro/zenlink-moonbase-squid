import { EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { Big as BigDecimal } from 'big.js'
import { getOrCreateToken, getOrCreateVXZLK } from "../entities/token";
import * as VXZLKContract from "../abis/vxZenlinkToken"
import { VxZLKMintHistory, VxZLKRedeemHistory } from "../model";
import { ZLK } from "../consts";
import { getvxzlkUserInfo } from "../entities/utils";

export async function handleMintVXZLK(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const vxzlk = await getOrCreateVXZLK(ctx)
  const event = VXZLKContract.events['Deposit(address,address,uint256,uint256)']
    .decode(getEvmLogArgs(ctx))
  const { owner, shares } = event
  const mintAmount = BigDecimal(shares.toString()).div(10 ** vxzlk.decimals)

  const vxzlkUserInfo = await getvxzlkUserInfo(ctx, owner, vxzlk)

  vxzlkUserInfo.mintAmount = BigDecimal(vxzlkUserInfo.mintAmount).add(mintAmount).toFixed(6)
  vxzlkUserInfo.timestamp = BigInt(ctx.block.timestamp)
  vxzlkUserInfo.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(vxzlkUserInfo)

  vxzlk.mintAmount = BigDecimal(vxzlk.mintAmount).add(mintAmount).toFixed(6)
  vxzlk.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(vxzlk)

  const history = new VxZLKMintHistory({
    id: `${ctx.event.evmTxHash}-${ctx.event.indexInBlock}`,
    userInfo: vxzlkUserInfo,
    amount: mintAmount.toFixed(6),
    timestamp: BigInt(ctx.block.timestamp),
    updatedAt: new Date(ctx.block.timestamp)
  })
  await ctx.store.save(history)
}

export async function handleRedeemVXZLK(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const vxzlk = await getOrCreateVXZLK(ctx)
  const zlk = await getOrCreateToken(ctx, ZLK)
  const event = VXZLKContract.events['WithdrawVXZLK(address,address,address,uint256,uint256,uint256)']
    .decode(getEvmLogArgs(ctx))
  const { receiver, owner, assets, fee } = event
  const redeemAmount = BigDecimal(assets.toString()).div(10 ** zlk.decimals)
  const feeAmount = BigDecimal(fee.toString()).div(10 ** zlk.decimals)

  if (receiver !== owner) {
    await getvxzlkUserInfo(ctx, receiver, vxzlk)
  }

  const ownerUserInfo = await getvxzlkUserInfo(ctx, owner, vxzlk)

  ownerUserInfo.redeemRecieveAmount = BigDecimal(ownerUserInfo.redeemRecieveAmount).add(redeemAmount).toFixed(6)
  ownerUserInfo.redeemFeeAmount = BigDecimal(ownerUserInfo.redeemFeeAmount).add(feeAmount).toFixed(6)
  ownerUserInfo.timestamp = BigInt(ctx.block.timestamp)
  ownerUserInfo.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(ownerUserInfo)

  vxzlk.redeemAmount = BigDecimal(vxzlk.redeemAmount).add(redeemAmount).toFixed(6)
  vxzlk.feeAmount = BigDecimal(vxzlk.feeAmount).add(feeAmount).toFixed(6)
  vxzlk.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(vxzlk)

  const history = new VxZLKRedeemHistory({
    id: `${ctx.event.evmTxHash}-${ctx.event.indexInBlock}`,
    userInfo: ownerUserInfo,
    recieve: redeemAmount.toFixed(6),
    fee: feeAmount.toFixed(6),
    timestamp: BigInt(ctx.block.timestamp),
    updatedAt: new Date(ctx.block.timestamp)
  })
  await ctx.store.save(history)
}
