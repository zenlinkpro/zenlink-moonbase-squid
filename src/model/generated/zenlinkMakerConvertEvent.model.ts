import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {ZenlinkMakerConvertData, fromJsonZenlinkMakerConvertData} from "./_zenlinkMakerConvertData"

@Entity_()
export class ZenlinkMakerConvertEvent {
  constructor(props?: Partial<ZenlinkMakerConvertEvent>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  contract!: string

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : fromJsonZenlinkMakerConvertData(obj)}, nullable: true})
  data!: ZenlinkMakerConvertData | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  block!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("bytea", {nullable: false})
  transaction!: Uint8Array
}
