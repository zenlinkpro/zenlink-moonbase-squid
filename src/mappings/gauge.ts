import { EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import * as GaugeContract from '../abis/Gauge'
import { GAUGE } from "../consts";
import { getGauge, getGaugePeriodState, getGaugePoolState } from "../entities/gauge";
import { GaugePoolState } from "../model";
import { getEvmLogArgs } from "../utils/helpers";

export async function handleUpdateVoteSetWindow(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events['UpdateVoteSetWindow(uint256,uint256)']
    .decode(getEvmLogArgs(ctx))
  const gauge = await getGauge(ctx)
  gauge.voteSetWindow = event.voteSetWindow.toBigInt()
  gauge.timestamp = BigInt(ctx.block.timestamp)
  gauge.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(gauge)
}

export async function handleUpdateVoteDuration(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events['UpdateVoteDuration(uint256,uint256)']
    .decode(getEvmLogArgs(ctx))
  const gauge = await getGauge(ctx)
  gauge.voteDuration = event.voteDuration.toBigInt()
  gauge.timestamp = BigInt(ctx.block.timestamp)
  gauge.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(gauge)
}

export async function handleUpdateVotePeriod(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events['UpdateVotePeriod(uint256,uint256,uint256)']
    .decode(getEvmLogArgs(ctx))
  const { curPeriod, start, end } = event
  const prevGaugePeriodState = await getGaugePeriodState(
    ctx,
    (curPeriod.toNumber() - 1).toString(),
  )
  const currentGaugePeriodState = await getGaugePeriodState(
    ctx,
    curPeriod.toString(),
    { start, end }
  )
  currentGaugePeriodState.totalAmount = prevGaugePeriodState.totalAmount
  currentGaugePeriodState.timestamp = BigInt(ctx.block.timestamp)
  currentGaugePeriodState.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(currentGaugePeriodState)

  const allPrevStates = await ctx.store.findBy(GaugePoolState, {
    periodId: curPeriod.toNumber() - 1
  })
  for (const prevState of allPrevStates) {
    const currentState = await getGaugePoolState(
      ctx,
      curPeriod.toString(),
      prevState.poolId.toString()
    )
    currentState.inherit = true
    if (!currentState.resetVotable) {
      currentState.votable = prevState.votable
    }
    if (currentState.votable) {
      currentGaugePeriodState.totalScore += prevState.totalAmount
    }
    currentState.totalAmount = prevState.totalAmount
    currentState.score = prevState.totalAmount
    await ctx.store.save(currentState)
  }
  await ctx.store.save(currentGaugePeriodState)
}

export async function handleSetVotablePools(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events['SetVotablePools(uint256,uint256[])']
    .decode(getEvmLogArgs(ctx))
  const { period, pools } = event
  const gaugePeriodState = await getGaugePeriodState(ctx, period.toString())
  for (const poolId of pools) {
    const gaugePoolState = await getGaugePoolState(
      ctx,
      period.toString(),
      poolId.toString()
    )
    if (!gaugePoolState.votable) {
      gaugePeriodState.totalScore += gaugePoolState.score
    }
    gaugePoolState.votable = true
    gaugePoolState.resetVotable = true
    gaugePoolState.timestamp = BigInt(ctx.block.timestamp)
    gaugePoolState.updatedAt = new Date(ctx.block.timestamp)
    await ctx.store.save(gaugePoolState)
  }
  await ctx.store.save(gaugePeriodState)
}

export async function handleSetNonVotablePools(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events['SetNonVotablePools(uint256,uint256[])']
    .decode(getEvmLogArgs(ctx))
  const { period, pools } = event
  const gaugePeriodState = await getGaugePeriodState(ctx, period.toString())
  for (const poolId of pools) {
    const gaugePoolState = await getGaugePoolState(
      ctx,
      period.toString(),
      poolId.toString()
    )
    if (gaugePoolState.votable) {
      gaugePeriodState.totalScore -= gaugePoolState.score
    }
    gaugePoolState.votable = false
    gaugePoolState.resetVotable = true
    gaugePoolState.timestamp = BigInt(ctx.block.timestamp)
    gaugePoolState.updatedAt = new Date(ctx.block.timestamp)
    await ctx.store.save(gaugePoolState)
  }
  await ctx.store.save(gaugePeriodState)
}

export async function handleInheritPool(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events[
    'InheritPool(uint256,uint256,uint256,uint256,bool)'
  ]
    .decode(getEvmLogArgs(ctx))
  const { poolId, curPeriod, amount, votable } = event
  const gaugePoolState = await getGaugePoolState(
    ctx,
    curPeriod.toString(),
    poolId.toString()
  )
  gaugePoolState.inherit = true
  if (!gaugePoolState.resetVotable) {
    gaugePoolState.votable = votable
  }
  gaugePoolState.totalAmount = amount.toBigInt()
  gaugePoolState.score = amount.toBigInt()
  gaugePoolState.timestamp = BigInt(ctx.block.timestamp)
  gaugePoolState.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(gaugePoolState)
}

export async function handleUpdatePoolHistory(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events[
    'UpdatePoolHistory(uint256,uint256,uint256,uint256,uint256)'
  ]
    .decode(getEvmLogArgs(ctx))
  const { poolId, lastPeriod, needUpdatePool, lastPeriodAmount } = event
  const lastGaugePoolState = await getGaugePoolState(
    ctx,
    lastPeriod.toString(),
    poolId.toString()
  )
  for (let i = needUpdatePool.toNumber(); i > lastPeriod.toNumber(); i--) {
    const gaugePoolState = await getGaugePoolState(
      ctx,
      i.toString(),
      poolId.toString()
    )
    if (!gaugePoolState.inherit) {
      gaugePoolState.inherit = true
      if (!gaugePoolState.resetVotable) {
        gaugePoolState.votable = lastGaugePoolState.votable
      }
      gaugePoolState.score = lastPeriodAmount.toBigInt()
      gaugePoolState.totalAmount = lastPeriodAmount.toBigInt()
      gaugePoolState.timestamp = BigInt(ctx.block.timestamp)
      gaugePoolState.updatedAt = new Date(ctx.block.timestamp)
      await ctx.store.save(gaugePoolState)
    }
  }
}

export async function handleSetStablePools(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events['UpdateStablePools(uint256[])']
    .decode(getEvmLogArgs(ctx))
  const { pids } = event
  const gauge = await getGauge(ctx)
  const gaugeContract = new GaugeContract.Contract(ctx, GAUGE)

  if (pids.length && await gaugeContract.stablePools(pids[0])) {
    gauge.stablePoolIds = pids.map(poolId => poolId.toNumber())
    gauge.timestamp = BigInt(ctx.block.timestamp)
    gauge.updatedAt = new Date(ctx.block.timestamp)
  }

  await ctx.store.save(gauge)
}

export async function handleVote(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events[
    'Vote(address,uint256,uint256,uint256,uint256,uint256)'
  ]
    .decode(getEvmLogArgs(ctx))
  const { period, poolId, poolPeriodAmount, poolPeriodScore } = event
  const gaugePeriodState = await getGaugePeriodState(ctx, period.toString())
  const gaugePoolState = await getGaugePoolState(
    ctx,
    period.toString(),
    poolId.toString()
  )
  gaugePeriodState.totalScore -= gaugePoolState.score
  gaugePeriodState.totalAmount -= gaugePoolState.totalAmount

  gaugePoolState.score = poolPeriodScore.toBigInt()
  gaugePoolState.totalAmount = poolPeriodAmount.toBigInt()
  gaugePoolState.timestamp = BigInt(ctx.block.timestamp)
  gaugePoolState.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(gaugePoolState)

  gaugePeriodState.totalScore += poolPeriodScore.toBigInt()
  gaugePeriodState.totalAmount += poolPeriodAmount.toBigInt()
  gaugePeriodState.timestamp = BigInt(ctx.block.timestamp)
  gaugePeriodState.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(gaugePeriodState)
}

export async function handleCancelVote(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const event = GaugeContract.events[
    'CancelVote(address,uint256,uint256,uint256,uint256,uint256)'
  ]
    .decode(getEvmLogArgs(ctx))
  const { period, poolId, poolPeriodAmount, poolPeriodScore } = event
  const gaugePeriodState = await getGaugePeriodState(ctx, period.toString())
  const gaugePoolState = await getGaugePoolState(
    ctx,
    period.toString(),
    poolId.toString()
  )
  if (gaugePoolState.votable) {
    gaugePeriodState.totalScore -= gaugePoolState.score
  }
  gaugePeriodState.totalAmount -= gaugePoolState.totalAmount

  gaugePoolState.score = poolPeriodScore.toBigInt()
  gaugePoolState.totalAmount = poolPeriodAmount.toBigInt()
  gaugePoolState.timestamp = BigInt(ctx.block.timestamp)
  gaugePoolState.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(gaugePoolState)

  if (gaugePoolState.votable) {
    gaugePeriodState.totalScore += poolPeriodScore.toBigInt()
  }
  gaugePeriodState.totalAmount += poolPeriodAmount.toBigInt()
  gaugePeriodState.timestamp = BigInt(ctx.block.timestamp)
  gaugePeriodState.updatedAt = new Date(ctx.block.timestamp)
  await ctx.store.save(gaugePeriodState)
}
