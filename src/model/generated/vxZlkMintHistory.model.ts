import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {VxZLKUserInfo} from "./vxZlkUserInfo.model"

@Entity_()
export class VxZLKMintHistory {
  constructor(props?: Partial<VxZLKMintHistory>) {
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
  amount!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date
}
