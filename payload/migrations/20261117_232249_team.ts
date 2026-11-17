import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { seedTeam } from '../seed/team'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload"."team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"initials" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"photo_id" integer,
  	"photo_path" varchar,
  	"loves" varchar NOT NULL,
  	"background" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"long_bio" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"years_experience" varchar NOT NULL,
  	"github" varchar,
  	"linkedin" varchar,
  	"twitter" varchar,
  	"website" varchar,
  	"meta_title" varchar NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."team_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "team_id" integer;
  ALTER TABLE "payload"."team" ADD CONSTRAINT "team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."team_texts" ADD CONSTRAINT "team_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."team"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "team_slug_idx" ON "payload"."team" USING btree ("slug");
  CREATE INDEX "team_photo_idx" ON "payload"."team" USING btree ("photo_id");
  CREATE INDEX "team_updated_at_idx" ON "payload"."team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "payload"."team" USING btree ("created_at");
  CREATE INDEX "team_texts_order_parent" ON "payload"."team_texts" USING btree ("order","parent_id");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "payload"."team"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("team_id");`)
  // Import the original team (lib/team.ts) in the same transaction.
  await seedTeam(payload, req)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."team_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."team" CASCADE;
  DROP TABLE "payload"."team_texts" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_fk";
  
  DROP INDEX "payload"."payload_locked_documents_rels_team_id_idx";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "team_id";`)
}
