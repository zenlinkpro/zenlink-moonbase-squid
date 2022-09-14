import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {User} from "./user.model"
import {VxZLKMintHistory} from "./vxZlkMintHistory.model"
import {VxZLKRedeemHistory} from "./vxZlkRedeemHistory.model"

@Entity_()
export class VxZLKUserInfo {
  constructor(props?: Partial<VxZLKUserInfo>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => User, {nullable: true})
  user!: User

  @Column_("text", {nullable: false})
  mintAmount!: string

  @Column_("text", {nullable: false})
  redeemRecieveAmount!: string

  @Column_("text", {nullable: false})
  redeemFeeAmount!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @OneToMany_(() => VxZLKMintHistory, e => e.userInfo)
  mints!: VxZLKMintHistory[]

  @OneToMany_(() => VxZLKRedeemHistory, e => e.userInfo)
  redeems!: VxZLKRedeemHistory[]
}
