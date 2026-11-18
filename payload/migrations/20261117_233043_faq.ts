import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { seedFaq } from '../seed/faq'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_faq_topic" AS ENUM('Le projet', 'Tarifs & devis', 'Technologies & expertise', 'Collaboration');
  CREATE TABLE "payload"."faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"topic" "payload"."enum_faq_topic" NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "faq_id" integer;
  CREATE INDEX "faq_updated_at_idx" ON "payload"."faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "payload"."faq" USING btree ("created_at");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "payload"."faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("faq_id");`)
  // Import the original /faq questions in the same transaction.
  await seedFaq(payload, req)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."faq" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."faq" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_fk";
  
  DROP INDEX "payload"."payload_locked_documents_rels_faq_id_idx";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "faq_id";
  DROP TYPE "payload"."enum_faq_topic";`)
}
