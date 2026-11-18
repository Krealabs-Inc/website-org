import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload"."page_home_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"detail" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_home_promises" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_home_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Agence web à Rouen · Sites, apps et logiciels sur mesure',
  	"hero_title" varchar DEFAULT 'Votre activité mérite
  un site qui
  *travaille pour vous.*',
  	"hero_takeover" varchar DEFAULT 'Vous gardez la main, *on s’occupe du reste.*',
  	"hero_text" varchar DEFAULT 'Un site qui vous amène des demandes, une application que vos clients gardent, un outil qui remplace vos tableurs. Vous gardez la main sur votre projet, de la première idée à la mise en ligne.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"hero_secondary" varchar DEFAULT 'Voir les réalisations',
  	"hero_reassurance" varchar DEFAULT 'On vous répond sous 24h · Votre devis est gratuit · À Rouen et partout en France',
  	"demands_eyebrow" varchar DEFAULT 'Ça vous parle ?',
  	"demands_title" varchar DEFAULT 'Des demandes *éparpillées* partout ?',
  	"demands_text" varchar DEFAULT 'Mails, téléphone, tableurs : quand les demandes arrivent de partout, il y en a toujours une qui se perd. Votre site peut les rassembler au même endroit.',
  	"promises_eyebrow" varchar DEFAULT 'Ce que vous obtenez',
  	"promises_title" varchar DEFAULT 'Un besoin précis ?
  Une réponse *sur mesure*.',
  	"promises_text" varchar DEFAULT 'Vous nous décrivez le problème, on vous propose le format qui le règle.',
  	"promises_link" varchar DEFAULT 'Voir toutes les solutions',
  	"projects_eyebrow" varchar DEFAULT 'Réalisations & concepts',
  	"projects_title" varchar DEFAULT 'Des projets concrets, *à explorer.*',
  	"method_eyebrow" varchar DEFAULT 'Votre projet, étape par étape',
  	"method_title" varchar DEFAULT 'Vous savez toujours
  *où l’on en est.*',
  	"stack_eyebrow" varchar DEFAULT 'Sous le capot',
  	"stack_title" varchar DEFAULT 'Des outils solides, *choisis pour vous*.',
  	"stack_text" varchar DEFAULT 'WordPress pour un site que vous gérez vous-même, Next.js ou React Native quand votre projet demande plus. La technologie s’adapte à votre besoin, pas l’inverse.',
  	"local_eyebrow" varchar DEFAULT 'Rouen, Normandie',
  	"local_title" varchar DEFAULT 'Proches de vous.
  *Où que vous soyez.*',
  	"local_text" varchar DEFAULT 'À Rouen, ailleurs en Normandie ou partout en France : on se voit en visio ou à Rouen, et vous parlez directement aux personnes qui construisent votre projet.',
  	"local_link" varchar DEFAULT 'Voir qui travaille sur votre projet',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Et si votre idée *prenait vie* ?',
  	"cta_text" varchar DEFAULT 'Décrivez votre projet en quelques lignes : on vous répond sous 24h ouvrées avec un premier retour concret.',
  	"cta_primary" varchar DEFAULT 'Recevoir mon devis',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload"."page_home_benefits" ADD CONSTRAINT "page_home_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_home_promises" ADD CONSTRAINT "page_home_promises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_home_steps" ADD CONSTRAINT "page_home_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_home_benefits_order_idx" ON "payload"."page_home_benefits" USING btree ("_order");
  CREATE INDEX "page_home_benefits_parent_id_idx" ON "payload"."page_home_benefits" USING btree ("_parent_id");
  CREATE INDEX "page_home_promises_order_idx" ON "payload"."page_home_promises" USING btree ("_order");
  CREATE INDEX "page_home_promises_parent_id_idx" ON "payload"."page_home_promises" USING btree ("_parent_id");
  CREATE INDEX "page_home_steps_order_idx" ON "payload"."page_home_steps" USING btree ("_order");
  CREATE INDEX "page_home_steps_parent_id_idx" ON "payload"."page_home_steps" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."page_home_benefits" CASCADE;
  DROP TABLE "payload"."page_home_promises" CASCADE;
  DROP TABLE "payload"."page_home_steps" CASCADE;
  DROP TABLE "payload"."page_home" CASCADE;`)
}
