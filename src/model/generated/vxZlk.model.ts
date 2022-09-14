import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class VxZLK {
  constructor(props?: Partial<VxZLK>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("text", {nullable: false})
  name!: string

  @Column_("int4", {nullable: false})
  decimals!: number

  @Column_("text", {nullable: false})
  totalSupply!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalUsers!: bigint

  @Column_("text", {nullable: false})
  mintAmount!: string

  @Column_("text", {nullable: false})
  redeemAmount!: string

  @Column_("text", {nullable: false})
  feeAmount!: string

  @Column_("bytea", {nullable: false})
  zlk!: Uint8Array

  @Column_("text", {nullable: false})
  zlkBalance!: string

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date
}
