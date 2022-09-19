import { decodeHex, EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { Big as BigDecimal } from 'big.js'
import { DISPATCHER, VXZLK, ZERO_BI, ZLK } from "../consts";
import { getOrCreateToken } from "../entities/token";
import { RewardDispatcher, RewardDispatcherDayData } from "../model";
import * as RewardDispatcherContract from '../abis/RewardDispatcher'
import { findUSDPerToken } from "../utils/pricing";
import { getEvmLogArgs } from "../utils/helpers";

export async function handleDispatch(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  let dispatcher = await ctx.store.get(RewardDispatcher, DISPATCHER)
  if (!dispatcher) {
    dispatcher = new RewardDispatcher({
      id: DISPATCHER,
      token: decodeHex(ZLK),
      dest: decodeHex(VXZLK),
      totalDispatchedAmount: ZERO_BI.toString(),
      totalDispatchedUSD: ZERO_BI.toString(),
      timestamp: BigInt(ctx.block.timestamp),
      updatedAt: new Date(ctx.block.timestamp),
      dailyData: []
    })
    await ctx.store.save(dispatcher)
  }

  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  let dispatcherDayData = await ctx.store.get(RewardDispatcherDayData, dayID.toString())
  if (!dispatcherDayData) {
    dispatcherDayData = new RewardDispatcherDayData({
      id: dayID.toString(),
      timestamp: BigInt(dayStartTimestamp),
      date: new Date(dayStartTimestamp),
      dispatcher,
      dailyDispatchedAmount: ZERO_BI.toString(),
      dailyDispatchedUSD: ZERO_BI.toString()
    })
    await ctx.store.save(dispatcherDayData)
  }

  const event = RewardDispatcherContract.events['DispatchReward(address,address,uint256)']
    .decode(getEvmLogArgs(ctx))
  const { amount } = event

  const zlk = await getOrCreateToken(ctx, ZLK)
  const zlkUSDPrice = await findUSDPerToken(ctx, ZLK)
  const amountDecimal = BigDecimal(amount.toString()).div(10 ** zlk.decimals)
  const amountUSD = amountDecimal.mul(zlkUSDPrice)

  dispatcher.totalDispatchedAmount = BigDecimal(dispatcher.totalDispatchedAmount).add(amountDecimal).toFixed(6)
  dispatcher.totalDispatchedUSD = BigDecimal(dispatcher.totalDispatchedUSD).add(amountUSD).toFixed(6)
  dispatcher.timestamp = BigInt(ctx.block.timestamp)
  dispatcher.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(dispatcher)

  dispatcherDayData.dailyDispatchedAmount = BigDecimal(dispatcherDayData.dailyDispatchedAmount).add(amountDecimal).toFixed(6)
  dispatcherDayData.dailyDispatchedUSD = BigDecimal(dispatcherDayData.dailyDispatchedUSD).add(amountUSD).toFixed(6)
  dispatcherDayData.timestamp = BigInt(dayStartTimestamp)
  dispatcherDayData.date = new Date(dayStartTimestamp)
  await ctx.store.save(dispatcherDayData)
}
