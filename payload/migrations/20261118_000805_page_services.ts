import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload"."page_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_services_commitments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Services · Agence web Rouen',
  	"title" varchar DEFAULT 'De quoi avez-vous *besoin* ?',
  	"intro" varchar DEFAULT 'Un seul interlocuteur du devis à la mise en ligne : les personnes que vous rencontrez construisent votre projet.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Une idée ? *Parlons-en.*',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_service_wordpress_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_wordpress_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_wordpress_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_wordpress_sectors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_wordpress_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_wordpress" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Site WordPress sur mesure',
  	"hero_title" varchar DEFAULT 'Votre site *WordPress*,
  simple à faire vivre.',
  	"hero_text" varchar DEFAULT 'Un site à votre image, des contenus que vous mettez à jour vous-même, et une équipe joignable dès que vous en avez besoin. À Rouen et partout en France.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet WordPress',
  	"hero_secondary" varchar DEFAULT 'Voir toutes les solutions',
  	"features_eyebrow" varchar DEFAULT 'Ce que vous obtenez',
  	"features_title" varchar DEFAULT 'Un site pour votre activité.
  Une gestion *à votre portée.*',
  	"features_text" varchar DEFAULT 'De l’idée à la maintenance, vous avez un seul interlocuteur pour toute la vie de votre site.',
  	"projects_eyebrow" varchar DEFAULT 'Réalisations WordPress',
  	"projects_title" varchar DEFAULT 'Un même outil.
  Des besoins *très différents.*',
  	"method_eyebrow" varchar DEFAULT 'Méthode',
  	"method_title" varchar DEFAULT 'Un site rapide, que vous *maîtrisez*.',
  	"method_text1" varchar DEFAULT 'Votre site repose sur un thème sur mesure (PHP, HTML, CSS), avec ACF Pro pour vos contenus. Sans Elementor ni Divi, il reste rapide, léger et simple à maintenir.',
  	"method_text2" varchar DEFAULT 'Si votre projet le justifie, il peut passer en **headless WordPress** : vous gardez l’administration WordPress, et Next.js affiche vos pages plus vite à vos visiteurs.',
  	"stack_eyebrow" varchar DEFAULT 'Extensions',
  	"stack_title" varchar DEFAULT 'Les outils qui font la *différence*.',
  	"stack_text" varchar DEFAULT 'Des extensions éprouvées au quotidien, choisies pour que votre site reste rapide, sûr et sauvegardé.',
  	"sectors_eyebrow" varchar DEFAULT 'Secteurs accompagnés',
  	"sectors_title" varchar DEFAULT 'Votre secteur, *vos besoins*.',
  	"sectors_text" varchar DEFAULT 'Site vitrine, boutique de PME, média ou site institutionnel : WordPress s’adapte à votre activité.',
  	"faq_title" varchar DEFAULT 'Vos questions sur *WordPress*.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Un projet *WordPress* à lancer ?',
  	"cta_text" varchar DEFAULT 'Que ce soit un site vitrine, une boutique WooCommerce, une refonte ou une migration - discutons-en. Le premier échange est offert.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet WordPress',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_service_developpement_web_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_developpement_web_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_developpement_web_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_developpement_web_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_developpement_web" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Développement web sur mesure',
  	"hero_title" varchar DEFAULT 'Vos process tournent
  sans *tableurs* ni ressaisie.',
  	"hero_text" varchar DEFAULT 'Un site vitrine qui vous amène des demandes, une application métier qui automatise vos tâches, une plateforme pour vos clients : un outil construit autour de votre façon de travailler, rapide et fait pour durer.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"hero_secondary" varchar DEFAULT 'Voir toutes les solutions',
  	"features_eyebrow" varchar DEFAULT 'Ce que vous obtenez',
  	"features_title" varchar DEFAULT 'Du site vitrine à l’*application métier*.',
  	"features_text" varchar DEFAULT 'Que vous ayez besoin de vous faire connaître ou d’outiller vos équipes, vous trouvez la réponse ici, du site marketing au logiciel interne.',
  	"method_title" varchar DEFAULT 'Vous voyez votre projet *avancer*.',
  	"method_text" varchar DEFAULT 'Quatre étapes et des démos régulières : vous réagissez tôt, et rien ne vous surprend à la livraison.',
  	"stack_eyebrow" varchar DEFAULT 'Stack technique',
  	"stack_title" varchar DEFAULT 'Des outils éprouvés, pour un site *qui dure*.',
  	"projects_eyebrow" varchar DEFAULT 'Réalisations',
  	"projects_title" varchar DEFAULT 'Ce qu’on a livré pour
  *ILIASS et Méli-Mélo.*',
  	"faq_title" varchar DEFAULT 'Vos questions sur le *développement web*.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Et si on supprimait *vos tableurs* ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_service_applications_mobile_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_applications_mobile_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_applications_mobile_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_applications_mobile_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_applications_mobile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Application mobile · iOS & Android',
  	"hero_title" varchar DEFAULT 'Vos clients vous ont *dans leur poche*.',
  	"hero_text" varchar DEFAULT 'Une application sur iOS et Android pour le budget d’une seule : une base de code React Native, deux App Stores, une expérience native. Vous réduisez vos coûts sans rogner sur la qualité.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"hero_secondary" varchar DEFAULT 'Voir toutes les solutions',
  	"features_eyebrow" varchar DEFAULT 'Ce que vous obtenez',
  	"features_title" varchar DEFAULT 'Une app *complète*, prête à publier.',
  	"method_eyebrow" varchar DEFAULT 'Méthode',
  	"method_title" varchar DEFAULT 'Vous testez votre app *avant* qu’elle existe.',
  	"method_text" varchar DEFAULT 'Tout commence par un prototype navigable : vous testez l’expérience sur votre téléphone avant la moindre ligne de code.',
  	"stack_eyebrow" varchar DEFAULT 'Fiche technique',
  	"stack_title" varchar DEFAULT 'Ce qui fait tourner *votre app*.',
  	"faq_title" varchar DEFAULT 'Vos questions sur le *développement mobile*.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Et si vos clients vous *avaient en poche* ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_service_design_uiux_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_design_uiux_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_design_uiux_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_design_uiux_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_design_uiux" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Design UI/UX',
  	"hero_title" varchar DEFAULT 'Vos visiteurs comprennent
  *et passent à l’action.*',
  	"hero_text" varchar DEFAULT 'Des écrans clairs, des parcours évidents, une interface qui vous ressemble : vos visiteurs trouvent ce qu’ils cherchent et vous contactent. Maquettes, design system et prototypes, accessibles à tous.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"hero_secondary" varchar DEFAULT 'Voir toutes les solutions',
  	"before_eyebrow" varchar DEFAULT 'Avant / après',
  	"before_title" varchar DEFAULT 'De la structure *à l’émotion.*',
  	"before_text" varchar DEFAULT 'Glissez la poignée : la même page, en fil de fer puis en maquette finale. Exemple fictif.',
  	"projects_eyebrow" varchar DEFAULT 'Deux identités, deux expressions',
  	"projects_title" varchar DEFAULT 'Une interface doit aussi
  *vous ressembler.*',
  	"features_eyebrow" varchar DEFAULT 'Ce que vous obtenez',
  	"features_title" varchar DEFAULT 'Du *brief* au design system.',
  	"features_text" varchar DEFAULT 'Vous recevez un design documenté et réutilisable, pas une simple maquette qu’il faudra interpréter.',
  	"method_eyebrow" varchar DEFAULT 'Méthode',
  	"method_title" varchar DEFAULT 'Vous validez *chaque étape*.',
  	"method_text" varchar DEFAULT 'De l’atelier de cadrage au design system, rien ne passe à l’étape suivante sans votre accord.',
  	"tools_eyebrow" varchar DEFAULT 'Outils',
  	"tools_title" varchar DEFAULT 'Testé *avant d’être codé*.',
  	"faq_title" varchar DEFAULT 'Vos questions sur le *design UI/UX*.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Et si vos visiteurs *passaient à l’action* ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_service_performance_seo_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"metric" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_performance_seo_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_performance_seo_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_performance_seo_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."page_service_performance_seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Performance & SEO local',
  	"hero_title" varchar DEFAULT 'Vos clients vous trouvent sur Google, à *Rouen*.',
  	"hero_text" varchar DEFAULT 'Vous apparaissez quand vos clients cherchent votre métier, et votre site s’affiche instantanément. Audit technique, Core Web Vitals et SEO local pour les entreprises de Rouen et de Normandie.',
  	"hero_cta" varchar DEFAULT 'Parler de mon projet',
  	"hero_secondary" varchar DEFAULT 'Voir toutes les solutions',
  	"speed_eyebrow" varchar DEFAULT 'Vitesse',
  	"speed_title" varchar DEFAULT 'Vos visiteurs n’attendent pas. *Votre site non plus.*',
  	"speed_text" varchar DEFAULT 'Chaque seconde d’attente fait partir des visiteurs, et Google le sait : la vitesse compte dans votre classement.',
  	"features_eyebrow" varchar DEFAULT 'Ce que vous obtenez',
  	"features_title" varchar DEFAULT 'Six leviers, un seul *objectif*.',
  	"features_text" varchar DEFAULT 'Chaque levier est mesuré avant/après : vous savez exactement ce que votre investissement rapporte.',
  	"method_eyebrow" varchar DEFAULT 'Méthode',
  	"method_title" varchar DEFAULT 'Audit, plan d’action, *résultats*.',
  	"method_text" varchar DEFAULT 'Aucune boîte noire : chaque recommandation vous est expliquée, vous décidez, on l’applique. Et tout est mesuré.',
  	"tools_eyebrow" varchar DEFAULT 'Outils',
  	"tools_title" varchar DEFAULT 'Des mesures *vérifiables*, pas des promesses.',
  	"faq_title" varchar DEFAULT 'Vos questions sur *SEO & performance*.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Vos clients vous *cherchent*. Ils vous trouvent ?',
  	"cta_text" varchar DEFAULT 'Le premier échange est gratuit et sans engagement. Décrivez votre projet, on vous répond sous 24h.',
  	"cta_primary" varchar DEFAULT 'Parler de mon projet',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload"."page_services_services" ADD CONSTRAINT "page_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_services_commitments" ADD CONSTRAINT "page_services_commitments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_wordpress_features" ADD CONSTRAINT "page_service_wordpress_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_wordpress"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_wordpress_steps" ADD CONSTRAINT "page_service_wordpress_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_wordpress"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_wordpress_stack" ADD CONSTRAINT "page_service_wordpress_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_wordpress"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_wordpress_sectors" ADD CONSTRAINT "page_service_wordpress_sectors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_wordpress"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_wordpress_faq" ADD CONSTRAINT "page_service_wordpress_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_wordpress"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_developpement_web_features" ADD CONSTRAINT "page_service_developpement_web_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_developpement_web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_developpement_web_steps" ADD CONSTRAINT "page_service_developpement_web_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_developpement_web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_developpement_web_stack" ADD CONSTRAINT "page_service_developpement_web_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_developpement_web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_developpement_web_faq" ADD CONSTRAINT "page_service_developpement_web_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_developpement_web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_applications_mobile_features" ADD CONSTRAINT "page_service_applications_mobile_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_applications_mobile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_applications_mobile_steps" ADD CONSTRAINT "page_service_applications_mobile_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_applications_mobile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_applications_mobile_stack" ADD CONSTRAINT "page_service_applications_mobile_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_applications_mobile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_applications_mobile_faq" ADD CONSTRAINT "page_service_applications_mobile_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_applications_mobile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_design_uiux_features" ADD CONSTRAINT "page_service_design_uiux_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_design_uiux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_design_uiux_steps" ADD CONSTRAINT "page_service_design_uiux_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_design_uiux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_design_uiux_tools" ADD CONSTRAINT "page_service_design_uiux_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_design_uiux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_design_uiux_faq" ADD CONSTRAINT "page_service_design_uiux_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_design_uiux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_performance_seo_features" ADD CONSTRAINT "page_service_performance_seo_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_performance_seo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_performance_seo_steps" ADD CONSTRAINT "page_service_performance_seo_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_performance_seo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_performance_seo_tools" ADD CONSTRAINT "page_service_performance_seo_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_performance_seo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."page_service_performance_seo_faq" ADD CONSTRAINT "page_service_performance_seo_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."page_service_performance_seo"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_services_services_order_idx" ON "payload"."page_services_services" USING btree ("_order");
  CREATE INDEX "page_services_services_parent_id_idx" ON "payload"."page_services_services" USING btree ("_parent_id");
  CREATE INDEX "page_services_commitments_order_idx" ON "payload"."page_services_commitments" USING btree ("_order");
  CREATE INDEX "page_services_commitments_parent_id_idx" ON "payload"."page_services_commitments" USING btree ("_parent_id");
  CREATE INDEX "page_service_wordpress_features_order_idx" ON "payload"."page_service_wordpress_features" USING btree ("_order");
  CREATE INDEX "page_service_wordpress_features_parent_id_idx" ON "payload"."page_service_wordpress_features" USING btree ("_parent_id");
  CREATE INDEX "page_service_wordpress_steps_order_idx" ON "payload"."page_service_wordpress_steps" USING btree ("_order");
  CREATE INDEX "page_service_wordpress_steps_parent_id_idx" ON "payload"."page_service_wordpress_steps" USING btree ("_parent_id");
  CREATE INDEX "page_service_wordpress_stack_order_idx" ON "payload"."page_service_wordpress_stack" USING btree ("_order");
  CREATE INDEX "page_service_wordpress_stack_parent_id_idx" ON "payload"."page_service_wordpress_stack" USING btree ("_parent_id");
  CREATE INDEX "page_service_wordpress_sectors_order_idx" ON "payload"."page_service_wordpress_sectors" USING btree ("_order");
  CREATE INDEX "page_service_wordpress_sectors_parent_id_idx" ON "payload"."page_service_wordpress_sectors" USING btree ("_parent_id");
  CREATE INDEX "page_service_wordpress_faq_order_idx" ON "payload"."page_service_wordpress_faq" USING btree ("_order");
  CREATE INDEX "page_service_wordpress_faq_parent_id_idx" ON "payload"."page_service_wordpress_faq" USING btree ("_parent_id");
  CREATE INDEX "page_service_developpement_web_features_order_idx" ON "payload"."page_service_developpement_web_features" USING btree ("_order");
  CREATE INDEX "page_service_developpement_web_features_parent_id_idx" ON "payload"."page_service_developpement_web_features" USING btree ("_parent_id");
  CREATE INDEX "page_service_developpement_web_steps_order_idx" ON "payload"."page_service_developpement_web_steps" USING btree ("_order");
  CREATE INDEX "page_service_developpement_web_steps_parent_id_idx" ON "payload"."page_service_developpement_web_steps" USING btree ("_parent_id");
  CREATE INDEX "page_service_developpement_web_stack_order_idx" ON "payload"."page_service_developpement_web_stack" USING btree ("_order");
  CREATE INDEX "page_service_developpement_web_stack_parent_id_idx" ON "payload"."page_service_developpement_web_stack" USING btree ("_parent_id");
  CREATE INDEX "page_service_developpement_web_faq_order_idx" ON "payload"."page_service_developpement_web_faq" USING btree ("_order");
  CREATE INDEX "page_service_developpement_web_faq_parent_id_idx" ON "payload"."page_service_developpement_web_faq" USING btree ("_parent_id");
  CREATE INDEX "page_service_applications_mobile_features_order_idx" ON "payload"."page_service_applications_mobile_features" USING btree ("_order");
  CREATE INDEX "page_service_applications_mobile_features_parent_id_idx" ON "payload"."page_service_applications_mobile_features" USING btree ("_parent_id");
  CREATE INDEX "page_service_applications_mobile_steps_order_idx" ON "payload"."page_service_applications_mobile_steps" USING btree ("_order");
  CREATE INDEX "page_service_applications_mobile_steps_parent_id_idx" ON "payload"."page_service_applications_mobile_steps" USING btree ("_parent_id");
  CREATE INDEX "page_service_applications_mobile_stack_order_idx" ON "payload"."page_service_applications_mobile_stack" USING btree ("_order");
  CREATE INDEX "page_service_applications_mobile_stack_parent_id_idx" ON "payload"."page_service_applications_mobile_stack" USING btree ("_parent_id");
  CREATE INDEX "page_service_applications_mobile_faq_order_idx" ON "payload"."page_service_applications_mobile_faq" USING btree ("_order");
  CREATE INDEX "page_service_applications_mobile_faq_parent_id_idx" ON "payload"."page_service_applications_mobile_faq" USING btree ("_parent_id");
  CREATE INDEX "page_service_design_uiux_features_order_idx" ON "payload"."page_service_design_uiux_features" USING btree ("_order");
  CREATE INDEX "page_service_design_uiux_features_parent_id_idx" ON "payload"."page_service_design_uiux_features" USING btree ("_parent_id");
  CREATE INDEX "page_service_design_uiux_steps_order_idx" ON "payload"."page_service_design_uiux_steps" USING btree ("_order");
  CREATE INDEX "page_service_design_uiux_steps_parent_id_idx" ON "payload"."page_service_design_uiux_steps" USING btree ("_parent_id");
  CREATE INDEX "page_service_design_uiux_tools_order_idx" ON "payload"."page_service_design_uiux_tools" USING btree ("_order");
  CREATE INDEX "page_service_design_uiux_tools_parent_id_idx" ON "payload"."page_service_design_uiux_tools" USING btree ("_parent_id");
  CREATE INDEX "page_service_design_uiux_faq_order_idx" ON "payload"."page_service_design_uiux_faq" USING btree ("_order");
  CREATE INDEX "page_service_design_uiux_faq_parent_id_idx" ON "payload"."page_service_design_uiux_faq" USING btree ("_parent_id");
  CREATE INDEX "page_service_performance_seo_features_order_idx" ON "payload"."page_service_performance_seo_features" USING btree ("_order");
  CREATE INDEX "page_service_performance_seo_features_parent_id_idx" ON "payload"."page_service_performance_seo_features" USING btree ("_parent_id");
  CREATE INDEX "page_service_performance_seo_steps_order_idx" ON "payload"."page_service_performance_seo_steps" USING btree ("_order");
  CREATE INDEX "page_service_performance_seo_steps_parent_id_idx" ON "payload"."page_service_performance_seo_steps" USING btree ("_parent_id");
  CREATE INDEX "page_service_performance_seo_tools_order_idx" ON "payload"."page_service_performance_seo_tools" USING btree ("_order");
  CREATE INDEX "page_service_performance_seo_tools_parent_id_idx" ON "payload"."page_service_performance_seo_tools" USING btree ("_parent_id");
  CREATE INDEX "page_service_performance_seo_faq_order_idx" ON "payload"."page_service_performance_seo_faq" USING btree ("_order");
  CREATE INDEX "page_service_performance_seo_faq_parent_id_idx" ON "payload"."page_service_performance_seo_faq" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."page_services_services" CASCADE;
  DROP TABLE "payload"."page_services_commitments" CASCADE;
  DROP TABLE "payload"."page_services" CASCADE;
  DROP TABLE "payload"."page_service_wordpress_features" CASCADE;
  DROP TABLE "payload"."page_service_wordpress_steps" CASCADE;
  DROP TABLE "payload"."page_service_wordpress_stack" CASCADE;
  DROP TABLE "payload"."page_service_wordpress_sectors" CASCADE;
  DROP TABLE "payload"."page_service_wordpress_faq" CASCADE;
  DROP TABLE "payload"."page_service_wordpress" CASCADE;
  DROP TABLE "payload"."page_service_developpement_web_features" CASCADE;
  DROP TABLE "payload"."page_service_developpement_web_steps" CASCADE;
  DROP TABLE "payload"."page_service_developpement_web_stack" CASCADE;
  DROP TABLE "payload"."page_service_developpement_web_faq" CASCADE;
  DROP TABLE "payload"."page_service_developpement_web" CASCADE;
  DROP TABLE "payload"."page_service_applications_mobile_features" CASCADE;
  DROP TABLE "payload"."page_service_applications_mobile_steps" CASCADE;
  DROP TABLE "payload"."page_service_applications_mobile_stack" CASCADE;
  DROP TABLE "payload"."page_service_applications_mobile_faq" CASCADE;
  DROP TABLE "payload"."page_service_applications_mobile" CASCADE;
  DROP TABLE "payload"."page_service_design_uiux_features" CASCADE;
  DROP TABLE "payload"."page_service_design_uiux_steps" CASCADE;
  DROP TABLE "payload"."page_service_design_uiux_tools" CASCADE;
  DROP TABLE "payload"."page_service_design_uiux_faq" CASCADE;
  DROP TABLE "payload"."page_service_design_uiux" CASCADE;
  DROP TABLE "payload"."page_service_performance_seo_features" CASCADE;
  DROP TABLE "payload"."page_service_performance_seo_steps" CASCADE;
  DROP TABLE "payload"."page_service_performance_seo_tools" CASCADE;
  DROP TABLE "payload"."page_service_performance_seo_faq" CASCADE;
  DROP TABLE "payload"."page_service_performance_seo" CASCADE;`)
}
