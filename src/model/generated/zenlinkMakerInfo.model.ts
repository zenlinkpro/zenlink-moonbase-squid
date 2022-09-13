import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {ZenlinkMakerDayData} from "./zenlinkMakerDayData.model"

@Entity_()
export class ZenlinkMakerInfo {
  constructor(props?: Partial<ZenlinkMakerInfo>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("timestamp with time zone", {nullable: false})
  updatedDate!: Date

  @Column_("text", {nullable: false})
  totalAmount!: string

  @Column_("text", {nullable: false})
  totalUSD!: string

  @OneToMany_(() => ZenlinkMakerDayData, e => e.info)
  dayData!: ZenlinkMakerDayData[]
}
