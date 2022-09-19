import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {GaugePeriodState} from "./gaugePeriodState.model"

@Entity_()
export class Gauge {
  constructor(props?: Partial<Gauge>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("bytea", {nullable: false})
  farming!: Uint8Array

  @Column_("bytea", {nullable: false})
  voteToken!: Uint8Array

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  voteSetWindow!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  voteDuration!: bigint

  @Column_("int4", {nullable: false})
  nextVotePeriodID!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @Column_("int4", {array: true, nullable: true})
  stablePoolIds!: (number)[] | undefined | null

  @OneToMany_(() => GaugePeriodState, e => e.gauge)
  periodStates!: GaugePeriodState[]
}
