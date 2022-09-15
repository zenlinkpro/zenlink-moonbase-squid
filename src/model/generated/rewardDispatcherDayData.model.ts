import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {RewardDispatcher} from "./rewardDispatcher.model"

@Entity_()
export class RewardDispatcherDayData {
  constructor(props?: Partial<RewardDispatcherDayData>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Index_()
  @ManyToOne_(() => RewardDispatcher, {nullable: true})
  dispatcher!: RewardDispatcher

  @Column_("text", {nullable: false})
  dailyDispatchedAmount!: string

  @Column_("text", {nullable: false})
  dailyDispatchedUSD!: string
}
