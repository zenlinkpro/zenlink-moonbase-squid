import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Gauge} from "./gauge.model"
import {GaugePoolState} from "./gaugePoolState.model"

@Entity_()
export class GaugePeriodState {
  constructor(props?: Partial<GaugePeriodState>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Gauge, {nullable: true})
  gauge!: Gauge

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  start!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  end!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalAmount!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalScore!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @OneToMany_(() => GaugePoolState, e => e.periodState)
  allPoolStates!: GaugePoolState[]
}
