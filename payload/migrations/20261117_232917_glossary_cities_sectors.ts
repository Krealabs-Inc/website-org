import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { seedGlossary } from '../seed/glossary'
import { seedLocal } from '../seed/local'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_glossary_category" AS ENUM('Web', 'Mobile', 'SEO', 'WordPress', 'Infrastructure');
  CREATE TABLE "payload"."glossary_related_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."glossary" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"term" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "payload"."enum_glossary_category" NOT NULL,
  	"short_def" varchar NOT NULL,
  	"definition" varchar NOT NULL,
  	"why_it_matters" varchar NOT NULL,
  	"our_approach" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."glossary_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."cities_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."cities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"city_article" varchar NOT NULL,
  	"city_possessive" varchar NOT NULL,
  	"adjective" varchar NOT NULL,
  	"adjective_plural" varchar NOT NULL,
  	"hero_intro" varchar NOT NULL,
  	"city_reason" varchar NOT NULL,
  	"postal_code" varchar NOT NULL,
  	"department" varchar NOT NULL,
  	"region" varchar NOT NULL,
  	"insee_code" varchar NOT NULL,
  	"population" varchar NOT NULL,
  	"metropole" varchar NOT NULL,
  	"distance_from_rouen" numeric NOT NULL,
  	"lat" numeric NOT NULL,
  	"lng" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."cities_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."sectors_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."sectors_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."sectors_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."sectors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"name_plural" varchar NOT NULL,
  	"name_labeled" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"recommended_stack" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."sectors_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "glossary_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "cities_id" integer;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "sectors_id" integer;
  ALTER TABLE "payload"."glossary_related_links" ADD CONSTRAINT "glossary_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."glossary_texts" ADD CONSTRAINT "glossary_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."cities_faq" ADD CONSTRAINT "cities_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."cities_texts" ADD CONSTRAINT "cities_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."sectors_challenges" ADD CONSTRAINT "sectors_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."sectors_features" ADD CONSTRAINT "sectors_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."sectors_faq" ADD CONSTRAINT "sectors_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."sectors_texts" ADD CONSTRAINT "sectors_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "glossary_related_links_order_idx" ON "payload"."glossary_related_links" USING btree ("_order");
  CREATE INDEX "glossary_related_links_parent_id_idx" ON "payload"."glossary_related_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "glossary_slug_idx" ON "payload"."glossary" USING btree ("slug");
  CREATE INDEX "glossary_updated_at_idx" ON "payload"."glossary" USING btree ("updated_at");
  CREATE INDEX "glossary_created_at_idx" ON "payload"."glossary" USING btree ("created_at");
  CREATE INDEX "glossary_texts_order_parent" ON "payload"."glossary_texts" USING btree ("order","parent_id");
  CREATE INDEX "cities_faq_order_idx" ON "payload"."cities_faq" USING btree ("_order");
  CREATE INDEX "cities_faq_parent_id_idx" ON "payload"."cities_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cities_slug_idx" ON "payload"."cities" USING btree ("slug");
  CREATE INDEX "cities_updated_at_idx" ON "payload"."cities" USING btree ("updated_at");
  CREATE INDEX "cities_created_at_idx" ON "payload"."cities" USING btree ("created_at");
  CREATE INDEX "cities_texts_order_parent" ON "payload"."cities_texts" USING btree ("order","parent_id");
  CREATE INDEX "sectors_challenges_order_idx" ON "payload"."sectors_challenges" USING btree ("_order");
  CREATE INDEX "sectors_challenges_parent_id_idx" ON "payload"."sectors_challenges" USING btree ("_parent_id");
  CREATE INDEX "sectors_features_order_idx" ON "payload"."sectors_features" USING btree ("_order");
  CREATE INDEX "sectors_features_parent_id_idx" ON "payload"."sectors_features" USING btree ("_parent_id");
  CREATE INDEX "sectors_faq_order_idx" ON "payload"."sectors_faq" USING btree ("_order");
  CREATE INDEX "sectors_faq_parent_id_idx" ON "payload"."sectors_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sectors_slug_idx" ON "payload"."sectors" USING btree ("slug");
  CREATE INDEX "sectors_updated_at_idx" ON "payload"."sectors" USING btree ("updated_at");
  CREATE INDEX "sectors_created_at_idx" ON "payload"."sectors" USING btree ("created_at");
  CREATE INDEX "sectors_texts_order_parent" ON "payload"."sectors_texts" USING btree ("order","parent_id");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_glossary_fk" FOREIGN KEY ("glossary_id") REFERENCES "payload"."glossary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "payload"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sectors_fk" FOREIGN KEY ("sectors_id") REFERENCES "payload"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_glossary_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("glossary_id");
  CREATE INDEX "payload_locked_documents_rels_cities_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("cities_id");
  CREATE INDEX "payload_locked_documents_rels_sectors_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("sectors_id");`)
  // Import the original glossary, cities (with FAQ) and sectors in the same transaction.
  await seedGlossary(payload, req)
  await seedLocal(payload, req)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."glossary_related_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."glossary" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."glossary_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."cities_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."cities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."cities_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."sectors_challenges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."sectors_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."sectors_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."sectors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."sectors_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."glossary_related_links" CASCADE;
  DROP TABLE "payload"."glossary" CASCADE;
  DROP TABLE "payload"."glossary_texts" CASCADE;
  DROP TABLE "payload"."cities_faq" CASCADE;
  DROP TABLE "payload"."cities" CASCADE;
  DROP TABLE "payload"."cities_texts" CASCADE;
  DROP TABLE "payload"."sectors_challenges" CASCADE;
  DROP TABLE "payload"."sectors_features" CASCADE;
  DROP TABLE "payload"."sectors_faq" CASCADE;
  DROP TABLE "payload"."sectors" CASCADE;
  DROP TABLE "payload"."sectors_texts" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_glossary_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cities_fk";
  
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sectors_fk";
  
  DROP INDEX "payload"."payload_locked_documents_rels_glossary_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_cities_id_idx";
  DROP INDEX "payload"."payload_locked_documents_rels_sectors_id_idx";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "glossary_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "cities_id";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "sectors_id";
  DROP TYPE "payload"."enum_glossary_category";`)
}
