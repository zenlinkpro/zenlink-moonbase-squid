import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {RewardDispatcherDayData} from "./rewardDispatcherDayData.model"

@Entity_()
export class RewardDispatcher {
  constructor(props?: Partial<RewardDispatcher>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("bytea", {nullable: false})
  token!: Uint8Array

  @Column_("bytea", {nullable: false})
  dest!: Uint8Array

  @Column_("text", {nullable: false})
  totalDispatchedAmount!: string

  @Column_("text", {nullable: false})
  totalDispatchedUSD!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @OneToMany_(() => RewardDispatcherDayData, e => e.dispatcher)
  dailyData!: RewardDispatcherDayData[]
}
