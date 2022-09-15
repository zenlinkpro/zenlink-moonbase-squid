import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {FactoryDayData} from "./factoryDayData.model"
import {StableDayData} from "./stableDayData.model"

@Entity_()
export class ZenlinkDayInfo {
  constructor(props?: Partial<ZenlinkDayInfo>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Index_()
  @ManyToOne_(() => FactoryDayData, {nullable: true})
  standardInfo!: FactoryDayData

  @Index_()
  @ManyToOne_(() => StableDayData, {nullable: true})
  stableInfo!: StableDayData

  @Column_("text", {nullable: false})
  dailyVolumeUSD!: string

  @Column_("text", {nullable: false})
  tvlUSD!: string
}
