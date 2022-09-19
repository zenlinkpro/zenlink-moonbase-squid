import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {GaugePeriodState} from "./gaugePeriodState.model"

@Entity_()
export class GaugePoolState {
  constructor(props?: Partial<GaugePoolState>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => GaugePeriodState, {nullable: true})
  periodState!: GaugePeriodState

  @Column_("int4", {nullable: false})
  periodId!: number

  @Column_("int4", {nullable: false})
  poolId!: number

  @Column_("bool", {nullable: false})
  inherit!: boolean

  @Column_("bool", {nullable: false})
  resetVotable!: boolean

  @Column_("bool", {nullable: false})
  votable!: boolean

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  score!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalAmount!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date
}
