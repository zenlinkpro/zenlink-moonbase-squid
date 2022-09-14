import { CommonHandlerContext, decodeHex } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Big as BigDecimal } from 'big.js'
import { VXZLK, ZERO_BD, ZLK } from '../consts'
import { convertTokenToDecimal } from '../utils/helpers'
import { Token, VxZLK } from '../model'
import * as ERC20 from '../abis/ERC20'
import * as VXZLKTOKEN from '../abis/vxZenlinkToken'

export async function getOrCreateToken(ctx: CommonHandlerContext<Store>, address: string): Promise<Token> {
  let token = await ctx.store.get(Token, address)

  if (!token) {
    const erc20 = new ERC20.Contract(ctx, address)

    const name = await erc20.name()
    const symbol = await erc20.symbol()
    const decimals = await erc20.decimals()
    const totalSupply = await erc20.totalSupply()

    token = new Token({
      id: address.toLowerCase(),
      symbol,
      name,
      totalSupply: convertTokenToDecimal(totalSupply.toBigInt(), decimals).toString(),
      decimals,
      derivedETH: ZERO_BD.toString(),
      tradeVolume: ZERO_BD.toString(),
      tradeVolumeUSD: ZERO_BD.toString(),
      untrackedVolumeUSD: ZERO_BD.toString(),
      totalLiquidity: ZERO_BD.toString(),
      txCount: 0,
    })

    await ctx.store.save(token)
  }

  return token
}

export async function getOrCreateVXZLK(ctx: CommonHandlerContext<Store>): Promise<VxZLK> {
  await getOrCreateToken(ctx, VXZLK)
  
  let vxzlk = await ctx.store.get(VxZLK, VXZLK)
  const vxzlkContract = new VXZLKTOKEN.Contract(ctx, VXZLK)
  const zlkContract = new ERC20.Contract(ctx, ZLK)
  
  if (!vxzlk) {
    const name = await vxzlkContract.name()
    const symbol = await vxzlkContract.symbol()
    const decimals = await vxzlkContract.decimals()

    vxzlk = new VxZLK({
      id: VXZLK,
      symbol,
      name,
      decimals,
      totalUsers: BigInt(0),
      mintAmount: ZERO_BD.toString(),
      redeemAmount: ZERO_BD.toString(),
      feeAmount: ZERO_BD.toString(),
      zlk: decodeHex(ZLK),
      updatedAt: new Date(ctx.block.timestamp)
    })
  }

  const zlk = await getOrCreateToken(ctx, ZLK)
  const zlkBalance = await zlkContract.balanceOf(VXZLK)
  const totalSupply = await vxzlkContract.totalSupply()

  vxzlk.zlkBalance = BigDecimal(zlkBalance.toString()).div(10 ** zlk.decimals).toFixed(6)
  vxzlk.totalSupply = BigDecimal(totalSupply.toString()).div(10 ** vxzlk.decimals).toFixed(6)
  await ctx.store.save(vxzlk)

  return vxzlk
}
