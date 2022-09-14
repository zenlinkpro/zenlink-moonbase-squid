import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {VxZLKUserInfo} from "./vxZlkUserInfo.model"

@Entity_()
export class VxZLKRedeemHistory {
  constructor(props?: Partial<VxZLKRedeemHistory>) {
    Object.assign(this, props)
  }

  /**
   * transaction hash
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => VxZLKUserInfo, {nullable: true})
  userInfo!: VxZLKUserInfo

  @Column_("text", {nullable: false})
  recieve!: string

  @Column_("text", {nullable: false})
  fee!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date
}
