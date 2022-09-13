import assert from "assert"
import * as marshal from "./marshal"

export class ZenlinkMakerConvertPairData {
  public readonly isTypeOf = 'ZenlinkMakerConvertPairData'
  private _sender!: string
  private _token0!: string
  private _token1!: string
  private _amount0!: bigint
  private _amount1!: bigint
  private _amountZLK!: bigint

  constructor(props?: Partial<Omit<ZenlinkMakerConvertPairData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._sender = marshal.string.fromJSON(json.sender)
      this._token0 = marshal.string.fromJSON(json.token0)
      this._token1 = marshal.string.fromJSON(json.token1)
      this._amount0 = marshal.bigint.fromJSON(json.amount0)
      this._amount1 = marshal.bigint.fromJSON(json.amount1)
      this._amountZLK = marshal.bigint.fromJSON(json.amountZLK)
    }
  }

  get sender(): string {
    assert(this._sender != null, 'uninitialized access')
    return this._sender
  }

  set sender(value: string) {
    this._sender = value
  }

  get token0(): string {
    assert(this._token0 != null, 'uninitialized access')
    return this._token0
  }

  set token0(value: string) {
    this._token0 = value
  }

  get token1(): string {
    assert(this._token1 != null, 'uninitialized access')
    return this._token1
  }

  set token1(value: string) {
    this._token1 = value
  }

  get amount0(): bigint {
    assert(this._amount0 != null, 'uninitialized access')
    return this._amount0
  }

  set amount0(value: bigint) {
    this._amount0 = value
  }

  get amount1(): bigint {
    assert(this._amount1 != null, 'uninitialized access')
    return this._amount1
  }

  set amount1(value: bigint) {
    this._amount1 = value
  }

  get amountZLK(): bigint {
    assert(this._amountZLK != null, 'uninitialized access')
    return this._amountZLK
  }

  set amountZLK(value: bigint) {
    this._amountZLK = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      sender: this.sender,
      token0: this.token0,
      token1: this.token1,
      amount0: marshal.bigint.toJSON(this.amount0),
      amount1: marshal.bigint.toJSON(this.amount1),
      amountZLK: marshal.bigint.toJSON(this.amountZLK),
    }
  }
}
