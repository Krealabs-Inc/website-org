import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload"."page_contact_next" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_contact_promises" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Votre devis gratuit',
  	"title" varchar DEFAULT 'Un premier retour *concret*, sous 24h.',
  	"intro" varchar DEFAULT 'Quelques questions, une à la fois. Deux minutes suffisent.',
  	"direct_label" varchar DEFAULT 'Ou directement',
  	"next_label" varchar DEFAULT 'Ensuite',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_notre_histoire_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_notre_histoire_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_notre_histoire" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Notre histoire',
  	"title" varchar DEFAULT 'Une agence *artisanale*, ancrée en Normandie.',
  	"intro" varchar DEFAULT 'Depuis 2020, nous construisons des sites web, applications mobiles et logiciels sur mesure pour les entreprises de Rouen et de toute la Normandie. Pas de promesses creuses, juste du travail propre.',
  	"cta" varchar DEFAULT 'Parler de mon projet',
  	"timeline_eyebrow" varchar DEFAULT 'Parcours',
  	"timeline_title" varchar DEFAULT 'Six années de *construction*.',
  	"values_eyebrow" varchar DEFAULT 'Ce qui nous guide',
  	"team_line" varchar DEFAULT 'associés, et c’est *voulu*.',
  	"team_link" varchar DEFAULT 'Rencontrer l’équipe',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'On *construit* ensemble ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_equipe_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_equipe_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_equipe" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'L’équipe qui *construit* votre projet.',
  	"why_eyebrow" varchar DEFAULT 'Pourquoi ça compte',
  	"why_title" varchar DEFAULT 'Vous parlez à *ceux qui codent.*',
  	"why_text" varchar DEFAULT 'Pas de chaîne d’intermédiaires entre votre idée et votre site : ce que vous demandez est exactement ce qui est construit.',
  	"values_eyebrow" varchar DEFAULT 'La même façon de travailler',
  	"values_title" varchar DEFAULT 'Des parcours différents.
  Une même *exigence.*',
  	"values_text" varchar DEFAULT 'Quatre associés, et c’est voulu : vous gardez les mêmes interlocuteurs du premier échange à la mise en ligne, et ceux qui vous écoutent sont ceux qui construisent.',
  	"cta_eyebrow" varchar DEFAULT 'La prochaine rencontre',
  	"cta_title" varchar DEFAULT 'On fait *équipe ?*',
  	"cta_text" varchar DEFAULT 'Un premier échange offert, en visio ou autour d’un café à Rouen. Parlons de votre idée et de ce que nous pourrions construire ensemble.',
  	"cta_primary" varchar DEFAULT 'Rencontrer le collectif',
  	"cta_secondary" varchar DEFAULT '',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_expertise_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"points" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_expertise_method" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_expertise_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_expertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Notre expertise',
  	"title" varchar DEFAULT 'Savoir-faire *technique*, rigueur d’*artisan*.',
  	"intro" varchar DEFAULT 'Architecture, performance, sécurité, accessibilité - les compétences que nous mobilisons sur chaque projet pour livrer du code propre, maintenable, et qui dure dans le temps.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"hero_secondary" varchar DEFAULT 'Découvrir l’équipe',
  	"video_eyebrow" varchar DEFAULT 'Votre projet, étape par étape',
  	"video_title" varchar DEFAULT 'Quatre étapes, *aucune surprise*.',
  	"skills_eyebrow" varchar DEFAULT 'Savoir-faire',
  	"skills_title" varchar DEFAULT 'Le *plan* de votre projet.',
  	"skills_text" varchar DEFAULT 'Au-delà du code, ce qui fait tenir un projet dans la durée : six savoir-faire, comme les pièces d’un bâtiment bien conçu.',
  	"stack_eyebrow" varchar DEFAULT 'Stack technique',
  	"stack_title" varchar DEFAULT 'Les *outils* que nous maîtrisons.',
  	"stack_text" varchar DEFAULT 'Une stack moderne, typée, testée. Nous nous tenons à jour avec les dernières versions tout en privilégiant la stabilité pour vos projets en production.',
  	"method_eyebrow" varchar DEFAULT 'Méthodologie',
  	"method_title" varchar DEFAULT 'Comment nous *travaillons*.',
  	"method_text" varchar DEFAULT 'Quatre principes structurent notre façon de travailler sur chaque projet, du devis à la maintenance.',
  	"standards_eyebrow" varchar DEFAULT 'Standards & conformité',
  	"standards_title" varchar DEFAULT 'Conformes aux *exigences* du métier.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Discutons de votre *projet*.',
  	"cta_text" varchar DEFAULT 'Quel que soit le projet - site, app mobile, logiciel - la première étape est toujours un échange pour comprendre votre contexte.',
  	"cta_primary" varchar DEFAULT 'Démarrer la conversation',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Réalisations & explorations',
  	"title" varchar DEFAULT 'Des besoins différents.
  Des réponses *concrètes.*',
  	"intro" varchar DEFAULT 'Une plateforme multilingue, des sites vitrines, un site de marque, une boutique, un concept de refonte et notre propre logiciel. Pour chacun : la situation de départ, ce qui a été fait, et ce que ça change. Peut-être un cas proche du vôtre.',
  	"cases_eyebrow" varchar DEFAULT 'Les fiches en détail',
  	"cases_title" varchar DEFAULT 'Leur situation, ce qui a été fait, *ce que ça change.*',
  	"label_situation" varchar DEFAULT 'La situation.',
  	"label_work" varchar DEFAULT 'Ce qui a été fait.',
  	"label_result" varchar DEFAULT 'Ce que ça change.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Et votre *projet ?*',
  	"cta_text" varchar DEFAULT 'Parlons de votre activité, de vos visiteurs et de ce que votre site doit leur permettre de faire.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_recrutement_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_recrutement" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Recrutement · Rouen',
  	"title" varchar DEFAULT 'Aucun poste ouvert, *pour le moment*.',
  	"intro" varchar DEFAULT 'L’équipe est au complet aujourd’hui. Si vous développez, designez ou démarrez dans le web et que notre façon de travailler vous parle, écrivez-nous quand même : votre message sera lu.',
  	"cta" varchar DEFAULT 'Envoyer ma candidature spontanée',
  	"secondary" varchar DEFAULT 'Voir avec qui vous travailleriez',
  	"points_intro" varchar DEFAULT 'Le jour où un poste s’ouvrira, vous trouverez ici :',
  	"apply_eyebrow" varchar DEFAULT 'Candidature spontanée',
  	"apply_title" varchar DEFAULT 'Vous voulez *vous présenter* quand même ?',
  	"apply_text1" varchar DEFAULT 'Écrivez à [contact@krealabs.fr](mailto:contact@krealabs.fr?subject=Candidature%20spontan%C3%A9e) avec quelques lignes sur vous, ce que vous aimez construire et un lien vers votre travail : portfolio, GitHub, site ou projet personnel. Inutile de soigner une lettre de motivation, un projet concret vous présente mieux.',
  	"apply_text2" varchar DEFAULT 'Vous êtes une entreprise et vous cherchez plutôt à faire avancer votre projet ? [Parlez-nous de votre besoin](/contact).',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_tech_nextjs_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_tech_nextjs_uses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_tech_nextjs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" varchar DEFAULT 'Technologie · Web',
  	"title" varchar DEFAULT '*Next.js* : le framework
  React de production.',
  	"description" varchar DEFAULT 'Un socle technique pour les sites et applications qui ont besoin de fonctionnalités sur mesure. Nous l’utilisons quand le projet demande davantage qu’un site de présentation.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"why_eyebrow" varchar DEFAULT 'Pourquoi',
  	"why_title" varchar DEFAULT 'Six raisons de *miser* dessus.',
  	"uses_eyebrow" varchar DEFAULT 'Cas d’usage',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Un projet *Next.js* à lancer ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_tech_react_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_tech_react_uses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_tech_react" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" varchar DEFAULT 'Technologie · UI',
  	"title" varchar DEFAULT '*React* : la bibliothèque
  qui a tout changé.',
  	"description" varchar DEFAULT 'L’écosystème UI le plus mature de l’industrie. Composants réutilisables, philosophie déclarative, communauté immense. La base de toutes nos applications web et mobiles.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"why_eyebrow" varchar DEFAULT 'Pourquoi',
  	"why_title" varchar DEFAULT 'Six fondations *solides*.',
  	"uses_eyebrow" varchar DEFAULT 'Cas d’usage',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Une app *React* à construire ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_tech_react_native_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_tech_react_native_uses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_tech_react_native" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" varchar DEFAULT 'Technologie · Mobile',
  	"title" varchar DEFAULT '*React Native* : iOS & Android,
  une seule équipe.',
  	"description" varchar DEFAULT 'Le framework cross-platform le plus mature pour développer des applications mobiles natives. Une base de code, deux App Stores, l’expérience utilisateur fidèle à chaque plateforme.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"why_eyebrow" varchar DEFAULT 'Pourquoi',
  	"why_title" varchar DEFAULT 'Six atouts *décisifs*.',
  	"uses_eyebrow" varchar DEFAULT 'Cas d’usage',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Une app *mobile* à concevoir ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_tech_typescript_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_tech_typescript_uses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_tech_typescript" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" varchar DEFAULT 'Technologie · Langage',
  	"title" varchar DEFAULT '*TypeScript* : du code
  qui se laisse refactorer.',
  	"description" varchar DEFAULT 'Le typage statique au-dessus de JavaScript. Moins de bugs en production, refactoring serein, autocomplétion partout. La fondation de tous nos projets Krealabs.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"why_eyebrow" varchar DEFAULT 'Pourquoi',
  	"why_title" varchar DEFAULT 'Six bénéfices *concrets*.',
  	"uses_eyebrow" varchar DEFAULT 'Cas d’usage',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Un projet *TypeScript* à démarrer ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_technologies_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"kind" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_technologies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Stack technique',
  	"title" varchar DEFAULT 'Les *outils* sur lesquels
  nous misons.',
  	"intro" varchar DEFAULT 'WordPress reste notre spécialité (et la majorité des projets que nous livrons), mais on s’adapte : Next.js, React Native, TypeScript, Python, Node.js - on choisit la techno selon le projet, pas selon une chapelle.',
  	"cta" varchar DEFAULT 'Démarrer un projet',
  	"map_hint" varchar DEFAULT 'Survolez un outil pour voir avec quoi il travaille.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Une stack à *concevoir* ?',
  	"cta_text" varchar DEFAULT 'Si vous hésitez entre plusieurs technologies pour votre projet, nous pouvons vous accompagner sur le choix.',
  	"cta_primary" varchar DEFAULT 'Demander conseil',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload"."page_contact_next" ADD CONSTRAINT "page_contact_next_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_contact_promises" ADD CONSTRAINT "page_contact_promises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_notre_histoire_timeline" ADD CONSTRAINT "page_notre_histoire_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_notre_histoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_notre_histoire_values" ADD CONSTRAINT "page_notre_histoire_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_notre_histoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_equipe_band" ADD CONSTRAINT "page_equipe_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_equipe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_equipe_values" ADD CONSTRAINT "page_equipe_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_equipe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_expertise_skills" ADD CONSTRAINT "page_expertise_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_expertise_method" ADD CONSTRAINT "page_expertise_method_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_expertise_standards" ADD CONSTRAINT "page_expertise_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_recrutement_points" ADD CONSTRAINT "page_recrutement_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_recrutement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_tech_nextjs_reasons" ADD CONSTRAINT "page_tech_nextjs_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_tech_nextjs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_tech_nextjs_uses" ADD CONSTRAINT "page_tech_nextjs_uses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_tech_nextjs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_tech_react_reasons" ADD CONSTRAINT "page_tech_react_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_tech_react"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_tech_react_uses" ADD CONSTRAINT "page_tech_react_uses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_tech_react"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_tech_react_native_reasons" ADD CONSTRAINT "page_tech_react_native_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_tech_react_native"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_tech_react_native_uses" ADD CONSTRAINT "page_tech_react_native_uses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_tech_react_native"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_tech_typescript_reasons" ADD CONSTRAINT "page_tech_typescript_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_tech_typescript"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_tech_typescript_uses" ADD CONSTRAINT "page_tech_typescript_uses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_tech_typescript"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_technologies_tools" ADD CONSTRAINT "page_technologies_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_technologies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_contact_next_order_idx" ON "payload"."page_contact_next" USING btree ("_order");
  CREATE INDEX "page_contact_next_parent_id_idx" ON "payload"."page_contact_next" USING btree ("_parent_id");
  CREATE INDEX "page_contact_promises_order_idx" ON "payload"."page_contact_promises" USING btree ("_order");
  CREATE INDEX "page_contact_promises_parent_id_idx" ON "payload"."page_contact_promises" USING btree ("_parent_id");
  CREATE INDEX "page_notre_histoire_timeline_order_idx" ON "payload"."page_notre_histoire_timeline" USING btree ("_order");
  CREATE INDEX "page_notre_histoire_timeline_parent_id_idx" ON "payload"."page_notre_histoire_timeline" USING btree ("_parent_id");
  CREATE INDEX "page_notre_histoire_values_order_idx" ON "payload"."page_notre_histoire_values" USING btree ("_order");
  CREATE INDEX "page_notre_histoire_values_parent_id_idx" ON "payload"."page_notre_histoire_values" USING btree ("_parent_id");
  CREATE INDEX "page_equipe_band_order_idx" ON "payload"."page_equipe_band" USING btree ("_order");
  CREATE INDEX "page_equipe_band_parent_id_idx" ON "payload"."page_equipe_band" USING btree ("_parent_id");
  CREATE INDEX "page_equipe_values_order_idx" ON "payload"."page_equipe_values" USING btree ("_order");
  CREATE INDEX "page_equipe_values_parent_id_idx" ON "payload"."page_equipe_values" USING btree ("_parent_id");
  CREATE INDEX "page_expertise_skills_order_idx" ON "payload"."page_expertise_skills" USING btree ("_order");
  CREATE INDEX "page_expertise_skills_parent_id_idx" ON "payload"."page_expertise_skills" USING btree ("_parent_id");
  CREATE INDEX "page_expertise_method_order_idx" ON "payload"."page_expertise_method" USING btree ("_order");
  CREATE INDEX "page_expertise_method_parent_id_idx" ON "payload"."page_expertise_method" USING btree ("_parent_id");
  CREATE INDEX "page_expertise_standards_order_idx" ON "payload"."page_expertise_standards" USING btree ("_order");
  CREATE INDEX "page_expertise_standards_parent_id_idx" ON "payload"."page_expertise_standards" USING btree ("_parent_id");
  CREATE INDEX "page_recrutement_points_order_idx" ON "payload"."page_recrutement_points" USING btree ("_order");
  CREATE INDEX "page_recrutement_points_parent_id_idx" ON "payload"."page_recrutement_points" USING btree ("_parent_id");
  CREATE INDEX "page_tech_nextjs_reasons_order_idx" ON "payload"."page_tech_nextjs_reasons" USING btree ("_order");
  CREATE INDEX "page_tech_nextjs_reasons_parent_id_idx" ON "payload"."page_tech_nextjs_reasons" USING btree ("_parent_id");
  CREATE INDEX "page_tech_nextjs_uses_order_idx" ON "payload"."page_tech_nextjs_uses" USING btree ("_order");
  CREATE INDEX "page_tech_nextjs_uses_parent_id_idx" ON "payload"."page_tech_nextjs_uses" USING btree ("_parent_id");
  CREATE INDEX "page_tech_react_reasons_order_idx" ON "payload"."page_tech_react_reasons" USING btree ("_order");
  CREATE INDEX "page_tech_react_reasons_parent_id_idx" ON "payload"."page_tech_react_reasons" USING btree ("_parent_id");
  CREATE INDEX "page_tech_react_uses_order_idx" ON "payload"."page_tech_react_uses" USING btree ("_order");
  CREATE INDEX "page_tech_react_uses_parent_id_idx" ON "payload"."page_tech_react_uses" USING btree ("_parent_id");
  CREATE INDEX "page_tech_react_native_reasons_order_idx" ON "payload"."page_tech_react_native_reasons" USING btree ("_order");
  CREATE INDEX "page_tech_react_native_reasons_parent_id_idx" ON "payload"."page_tech_react_native_reasons" USING btree ("_parent_id");
  CREATE INDEX "page_tech_react_native_uses_order_idx" ON "payload"."page_tech_react_native_uses" USING btree ("_order");
  CREATE INDEX "page_tech_react_native_uses_parent_id_idx" ON "payload"."page_tech_react_native_uses" USING btree ("_parent_id");
  CREATE INDEX "page_tech_typescript_reasons_order_idx" ON "payload"."page_tech_typescript_reasons" USING btree ("_order");
  CREATE INDEX "page_tech_typescript_reasons_parent_id_idx" ON "payload"."page_tech_typescript_reasons" USING btree ("_parent_id");
  CREATE INDEX "page_tech_typescript_uses_order_idx" ON "payload"."page_tech_typescript_uses" USING btree ("_order");
  CREATE INDEX "page_tech_typescript_uses_parent_id_idx" ON "payload"."page_tech_typescript_uses" USING btree ("_parent_id");
  CREATE INDEX "page_technologies_tools_order_idx" ON "payload"."page_technologies_tools" USING btree ("_order");
  CREATE INDEX "page_technologies_tools_parent_id_idx" ON "payload"."page_technologies_tools" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."page_contact_next" CASCADE;
  DROP TABLE "payload"."page_contact_promises" CASCADE;
  DROP TABLE "payload"."page_contact" CASCADE;
  DROP TABLE "payload"."page_notre_histoire_timeline" CASCADE;
  DROP TABLE "payload"."page_notre_histoire_values" CASCADE;
  DROP TABLE "payload"."page_notre_histoire" CASCADE;
  DROP TABLE "payload"."page_equipe_band" CASCADE;
  DROP TABLE "payload"."page_equipe_values" CASCADE;
  DROP TABLE "payload"."page_equipe" CASCADE;
  DROP TABLE "payload"."page_expertise_skills" CASCADE;
  DROP TABLE "payload"."page_expertise_method" CASCADE;
  DROP TABLE "payload"."page_expertise_standards" CASCADE;
  DROP TABLE "payload"."page_expertise" CASCADE;
  DROP TABLE "payload"."page_clients" CASCADE;
  DROP TABLE "payload"."page_recrutement_points" CASCADE;
  DROP TABLE "payload"."page_recrutement" CASCADE;
  DROP TABLE "payload"."page_tech_nextjs_reasons" CASCADE;
  DROP TABLE "payload"."page_tech_nextjs_uses" CASCADE;
  DROP TABLE "payload"."page_tech_nextjs" CASCADE;
  DROP TABLE "payload"."page_tech_react_reasons" CASCADE;
  DROP TABLE "payload"."page_tech_react_uses" CASCADE;
  DROP TABLE "payload"."page_tech_react" CASCADE;
  DROP TABLE "payload"."page_tech_react_native_reasons" CASCADE;
  DROP TABLE "payload"."page_tech_react_native_uses" CASCADE;
  DROP TABLE "payload"."page_tech_react_native" CASCADE;
  DROP TABLE "payload"."page_tech_typescript_reasons" CASCADE;
  DROP TABLE "payload"."page_tech_typescript_uses" CASCADE;
  DROP TABLE "payload"."page_tech_typescript" CASCADE;
  DROP TABLE "payload"."page_technologies_tools" CASCADE;
  DROP TABLE "payload"."page_technologies" CASCADE;`)
}
