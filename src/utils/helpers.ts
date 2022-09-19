import { EvmLogHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Big as BigDecimal } from 'big.js'
import { ZERO_BD } from '../consts'
import { LiquidityPosition, Pair, User } from '../model'

interface LiquidityPositionData {
  pair: Pair
  user: User
}

export function convertTokenToDecimal(amount: bigint, decimals: number): BigDecimal {
  return BigDecimal(amount.toString()).div((10 ** decimals).toString())
}

export function createLiquidityPosition(data: LiquidityPositionData): LiquidityPosition {
  const { pair, user } = data

  return new LiquidityPosition({
    id: `${pair.id}-${user.id}`,
    liquidityTokenBalance: ZERO_BD.toString(),
    pair,
    user,
  })
}

export function getEvmLogArgs(ctx: EvmLogHandlerContext<Store>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return ctx.event.args.log || ctx.event.args
}
