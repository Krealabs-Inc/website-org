import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { seedPosts } from '../seed/posts'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_posts_category" AS ENUM('WordPress', 'Web', 'Mobile', 'SEO', 'Outils');
  CREATE TABLE "payload"."posts_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "payload"."posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "payload"."enum_posts_category" NOT NULL,
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"updated_on" timestamp(3) with time zone,
  	"read_time" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"excerpt" varchar NOT NULL,
  	"image_id" integer,
  	"image_path" varchar,
  	"introduction" varchar NOT NULL,
  	"conclusion" varchar NOT NULL,
  	"author_name" varchar DEFAULT 'Maxime Dubois' NOT NULL,
  	"author_role" varchar DEFAULT 'Fondateur · Krealabs' NOT NULL,
  	"author_avatar" varchar DEFAULT 'https://avatars.githubusercontent.com/u/36298487?v=4' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload"."posts_sections" ADD CONSTRAINT "posts_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_sections_order_idx" ON "payload"."posts_sections" USING btree ("_order");
  CREATE INDEX "posts_sections_parent_id_idx" ON "payload"."posts_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "payload"."posts" USING btree ("slug");
  CREATE INDEX "posts_image_idx" ON "payload"."posts" USING btree ("image_id");
  CREATE INDEX "posts_updated_at_idx" ON "payload"."posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "payload"."posts" USING btree ("created_at");
  CREATE INDEX "posts_texts_order_parent" ON "payload"."posts_texts" USING btree ("order","parent_id");
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("posts_id");`)
  // Import the original 42 articles (lib/blog-data.ts) in the same transaction.
  await seedPosts(payload, req)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."posts_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."posts_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."posts_sections" CASCADE;
  DROP TABLE "payload"."posts" CASCADE;
  DROP TABLE "payload"."posts_texts" CASCADE;
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  DROP INDEX "payload"."payload_locked_documents_rels_posts_id_idx";
  ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "posts_id";
  DROP TYPE "payload"."enum_posts_category";`)
}
