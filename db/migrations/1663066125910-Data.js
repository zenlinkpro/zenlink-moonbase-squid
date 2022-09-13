module.exports = class Data1663066125910 {
  name = 'Data1663066125910'

  async up(db) {
    await db.query(`CREATE TABLE "zenlink_maker_day_data" ("id" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "daily_amount" text NOT NULL, "daily_usd" text NOT NULL, "info_id" character varying, CONSTRAINT "PK_596c8e521d2d4b5d7f7ac1e55a9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_ae03fa28099498a18a2a26c503" ON "zenlink_maker_day_data" ("info_id") `)
    await db.query(`CREATE TABLE "zenlink_maker_info" ("id" character varying NOT NULL, "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL, "total_amount" text NOT NULL, "total_usd" text NOT NULL, CONSTRAINT "PK_cd4d27f0ac931c8f9e7977a935d" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "zenlink_maker_convert_event" ("id" character varying NOT NULL, "contract" text NOT NULL, "data" jsonb, "block" numeric NOT NULL, "timestamp" numeric NOT NULL, "transaction" bytea NOT NULL, CONSTRAINT "PK_ba8a1a44a747affcbff412e70e9" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "zenlink_maker_day_data" ADD CONSTRAINT "FK_ae03fa28099498a18a2a26c503f" FOREIGN KEY ("info_id") REFERENCES "zenlink_maker_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "zenlink_maker_day_data"`)
    await db.query(`DROP INDEX "public"."IDX_ae03fa28099498a18a2a26c503"`)
    await db.query(`DROP TABLE "zenlink_maker_info"`)
    await db.query(`DROP TABLE "zenlink_maker_convert_event"`)
    await db.query(`ALTER TABLE "zenlink_maker_day_data" DROP CONSTRAINT "FK_ae03fa28099498a18a2a26c503f"`)
  }
}
