import { CommonHandlerContext, decodeHex } from "@subsquid/substrate-processor"
import { Store } from "@subsquid/typeorm-store"
import { BigNumber } from "ethers"
import { GAUGE, ZERO_BI } from "../consts"
import { Gauge, GaugePeriodState, GaugePoolState } from "../model"
import * as GAUGE_CONTRACT from '../abis/Gauge'

export async function getGauge(ctx: CommonHandlerContext<Store>): Promise<Gauge> {
  let gauge = await ctx.store.get(Gauge, GAUGE)
  if (!gauge) {
    const gaugeContract = new GAUGE_CONTRACT.Contract(ctx, GAUGE)
    gauge = new Gauge({
      id: GAUGE,
      farming: decodeHex(await gaugeContract.farming()),
      voteToken: decodeHex(await gaugeContract.voteToken()),
      voteSetWindow: (await gaugeContract.voteSetWindow()).toBigInt(),
      voteDuration: (await gaugeContract.voteDuration()).toBigInt(),
      nextVotePeriodID: 0,
      timestamp: BigInt(ctx.block.timestamp),
      updatedAt: new Date(ctx.block.timestamp),
      stablePoolIds: [],
      periodStates: []
    })
    await ctx.store.save(gauge)
  }

  return gauge
}

export async function getGaugePeriodState(
  ctx: CommonHandlerContext<Store>,
  periodId: string,
  args?: { start: BigNumber, end: BigNumber }
): Promise<GaugePeriodState> {
  let gaugePeriodState = await ctx.store.get(GaugePeriodState, periodId)
  if (!gaugePeriodState) {
    const gauge = await getGauge(ctx)
    gauge.nextVotePeriodID++
    gauge.timestamp = BigInt(ctx.block.timestamp)
    gauge.updatedAt = new Date(ctx.block.timestamp)
    
    let start = BigNumber.from(0)
    let end = BigNumber.from(0)
    if (!args) {
      const gaugeContract = new GAUGE_CONTRACT.Contract(ctx, GAUGE)
      ;[start, end] = await gaugeContract.votePeriods(BigNumber.from(periodId))
    }

    gaugePeriodState = new GaugePeriodState({
      id: periodId,
      gauge,
      start: args?.start?.toBigInt() ?? start?.toBigInt() ?? ZERO_BI,
      end: args?.end.toBigInt() ?? end?.toBigInt() ?? ZERO_BI,
      totalAmount: ZERO_BI,
      totalScore: ZERO_BI,
      timestamp: BigInt(ctx.block.timestamp),
      updatedAt: new Date(ctx.block.timestamp),
      allPoolStates: []
    })
    await ctx.store.save(gauge)
    await ctx.store.save(gaugePeriodState)
  }

  if (args && gaugePeriodState.start === ZERO_BI) {
    gaugePeriodState.start = args.start.toBigInt()
    gaugePeriodState.end = args.end.toBigInt()
    await ctx.store.save(gaugePeriodState) 
  }
  return gaugePeriodState
}

export async function getGaugePoolState(
  ctx: CommonHandlerContext<Store>,
  periodId: string,
  poolId: string,
  args?: {
    votable?: boolean,
    resetVotable?: boolean,
    inherit?: boolean,
    totalAmount?: BigNumber,
    score?: BigNumber
  }
): Promise<GaugePoolState> {
  const id = `${periodId}-${poolId}`
  let gaugePoolState = await ctx.store.get(GaugePoolState, id)
  if (!gaugePoolState) {
    gaugePoolState = new GaugePoolState({
      id,
      periodState: await getGaugePeriodState(ctx, periodId),
      periodId: Number(periodId),
      poolId: Number(poolId),
      inherit: args?.inherit ?? false,
      resetVotable: args?.resetVotable ?? false,
      votable: args?.votable ?? false,
      score: args?.score?.toBigInt() ?? ZERO_BI,
      totalAmount: args?.totalAmount?.toBigInt() ?? ZERO_BI,
      timestamp: BigInt(ctx.block.timestamp),
      updatedAt: new Date(ctx.block.timestamp)
    })
    await ctx.store.save(gaugePoolState)
  }

  return gaugePoolState
}
