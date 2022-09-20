import { CommonHandlerContext } from "@subsquid/substrate-processor"
import { Store } from "@subsquid/typeorm-store"
import { FACTORY_ADDRESS, ONE_BI, ZENLINK_MAKER, ZERO_BD } from "../consts"
import {
  Bundle,
  Factory,
  LiquidityPosition,
  StableSwapInfo,
  Transaction,
  User,
  VxZLK,
  VxZLKUserInfo,
  ZenlinkInfo,
  ZenlinkMakerInfo
} from "../model"

export async function getTransaction(
  ctx: CommonHandlerContext<Store>, 
  id: string
): Promise<Transaction | undefined> {
  const tx = await ctx.store.get(Transaction, id)

  return tx
}

export async function getPosition(
  ctx: CommonHandlerContext<Store>, 
  id: string
): Promise<LiquidityPosition | undefined> {
  const liquidityPosition = await ctx.store.get(LiquidityPosition, id)

  return liquidityPosition
}

export async function getBundle(ctx: CommonHandlerContext<Store>): Promise<Bundle> {
  const bundle = await ctx.store.get(Bundle, '1')

  return bundle!
}

export async function getFactory(ctx: CommonHandlerContext<Store>): Promise<Factory> {
  const factory = await ctx.store.get(Factory, FACTORY_ADDRESS)

  return factory!
}

export async function getStableSwapInfo(ctx: CommonHandlerContext<Store>): Promise<StableSwapInfo> {
  let stbleSwapInfo = await ctx.store.get(StableSwapInfo, {
    where: { id: '1' },
    relations: { swaps: true }
  })
  if (!stbleSwapInfo) {
    stbleSwapInfo = new StableSwapInfo({
      id: '1',
      poolCount: 0,
      totalVolumeUSD: ZERO_BD.toString(),
      totalTvlUSD: ZERO_BD.toString(),
      txCount: 0,
      swaps: []
    })
    await ctx.store.save(stbleSwapInfo)
  }

  return stbleSwapInfo
}

export async function getZenlinkInfo(ctx: CommonHandlerContext<Store>): Promise<ZenlinkInfo> {
  let zenlinkInfo = await ctx.store.get(ZenlinkInfo, {
    where: { id: '1' },
    relations: { factory: true, stableSwapInfo: true }
  })
  if (!zenlinkInfo) {
    zenlinkInfo = new ZenlinkInfo({
      id: '1',
      updatedDate: new Date(ctx.block.timestamp),
      totalVolumeUSD: ZERO_BD.toString(),
      totalTvlUSD: ZERO_BD.toString(),
      txCount: 0,
      factory: await getFactory(ctx),
      stableSwapInfo: await getStableSwapInfo(ctx)
    })
    await ctx.store.save(zenlinkInfo)
  }

  return zenlinkInfo
}

export async function getZenlinkMakerInfo(ctx: CommonHandlerContext<Store>): Promise<ZenlinkMakerInfo> {
  let zenlinkMakerInfo = await ctx.store.get(ZenlinkMakerInfo, ZENLINK_MAKER)
  if (!zenlinkMakerInfo) {
    zenlinkMakerInfo = new ZenlinkMakerInfo({
      id: ZENLINK_MAKER,
      updatedDate: new Date(ctx.block.timestamp),
      totalAmount: ZERO_BD.toString(),
      totalUSD: ZERO_BD.toString(),
      dayData: []
    })
    await ctx.store.save(zenlinkMakerInfo)
  }

  return zenlinkMakerInfo
}

export async function getUser(ctx: CommonHandlerContext<Store>, id: string): Promise<User> {
  let user = await ctx.store.get(User, id)
  if (!user) {
    user = new User({
      id,
      liquidityPositions: [],
      usdSwapped: ZERO_BD.toString()
    })
    await ctx.store.save(user)
  }

  return user
}

export async function getvxzlkUserInfo(
  ctx: CommonHandlerContext<Store>, 
  id: string, 
  vxzlk: VxZLK
): Promise<VxZLKUserInfo> {
  let vxzlkUserInfo = await ctx.store.get(VxZLKUserInfo, id)
  if (!vxzlkUserInfo) {
    const user = await getUser(ctx, id)
    vxzlk.totalUsers += ONE_BI
    vxzlkUserInfo = new VxZLKUserInfo({
      id,
      user,
      mintAmount: ZERO_BD.toString(),
      redeemRecieveAmount: ZERO_BD.toString(),
      redeemFeeAmount: ZERO_BD.toString(),
      timestamp: BigInt(ctx.block.timestamp),
      updatedAt: new Date(ctx.block.timestamp),
      mints: [],
      redeems: []
    })
    await ctx.store.save(vxzlk)
    await ctx.store.save(vxzlkUserInfo)
  }

  return vxzlkUserInfo
}
