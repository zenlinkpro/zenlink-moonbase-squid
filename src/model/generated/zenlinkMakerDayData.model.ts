import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {ZenlinkMakerInfo} from "./zenlinkMakerInfo.model"

@Entity_()
export class ZenlinkMakerDayData {
  constructor(props?: Partial<ZenlinkMakerDayData>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Column_("text", {nullable: false})
  dailyAmount!: string

  @Column_("text", {nullable: false})
  dailyUSD!: string

  @Index_()
  @ManyToOne_(() => ZenlinkMakerInfo, {nullable: true})
  info!: ZenlinkMakerInfo
}
