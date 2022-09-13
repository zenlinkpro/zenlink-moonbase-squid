import assert from "assert"
import * as marshal from "./marshal"

export class ZenlinkMakerConvertStableSwapData {
  public readonly isTypeOf = 'ZenlinkMakerConvertStableSwapData'
  private _sender!: string
  private _pool!: string
  private _token!: string
  private _amount!: bigint
  private _amountZLK!: bigint

  constructor(props?: Partial<Omit<ZenlinkMakerConvertStableSwapData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._sender = marshal.string.fromJSON(json.sender)
      this._pool = marshal.string.fromJSON(json.pool)
      this._token = marshal.string.fromJSON(json.token)
      this._amount = marshal.bigint.fromJSON(json.amount)
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

  get pool(): string {
    assert(this._pool != null, 'uninitialized access')
    return this._pool
  }

  set pool(value: string) {
    this._pool = value
  }

  get token(): string {
    assert(this._token != null, 'uninitialized access')
    return this._token
  }

  set token(value: string) {
    this._token = value
  }

  get amount(): bigint {
    assert(this._amount != null, 'uninitialized access')
    return this._amount
  }

  set amount(value: bigint) {
    this._amount = value
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
      pool: this.pool,
      token: this.token,
      amount: marshal.bigint.toJSON(this.amount),
      amountZLK: marshal.bigint.toJSON(this.amountZLK),
    }
  }
}
