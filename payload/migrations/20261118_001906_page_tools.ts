import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload"."page_calculateur" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Calculateur · Estimation projet',
  	"title" varchar DEFAULT 'Combien *coûte* votre projet web ?',
  	"intro" varchar DEFAULT 'Trois choix, et votre ticket s’imprime ligne par ligne : une fourchette réaliste pour votre site, votre boutique, votre logiciel ou votre application, basée sur les prix du marché normand.',
  	"method_eyebrow" varchar DEFAULT 'D’où vient votre estimation ?',
  	"method_title" varchar DEFAULT 'Une estimation *que vous pouvez vérifier*.',
  	"method_text1" varchar DEFAULT 'La fourchette de base par type de projet est dérivée des devis réels qu''on a chiffrés depuis 2020 à Rouen. Les options additionnelles (paiement Stripe, comptes utilisateur, intégrations…) sont valorisées au prix marché normand : environ 600-800 €/jour de dev senior, avec une fourchette qui reflète la variance selon la complexité.',
  	"method_text2" varchar DEFAULT 'Le multiplicateur d''urgence (+20% si < 4 semaines, -5% si flexible) reflète le coût opérationnel réel : un projet urgent demande de déprioriser d''autres clients ou de mobiliser des renforts.',
  	"method_text3" varchar DEFAULT '**Cette estimation n''est pas un devis.** Pour un chiffrage précis, votre projet doit d''abord être cadré (besoins exacts, contraintes, intégrations spécifiques) : c''est l''objet du premier rendez-vous, gratuit. Pour aller plus loin sur les tarifs, lisez l''[article complet sur les prix des sites internet à Rouen](/blog/prix-site-internet-rouen-2026).',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Passez de l''estimation au *devis précis*.',
  	"cta_text" varchar DEFAULT 'Votre premier rendez-vous est offert, à Rouen ou en visio : vous passez de la fourchette à un prix ferme.',
  	"cta_primary" varchar DEFAULT 'Réserver mon rendez-vous offert',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_lexique" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Lexique · {n} définitions',
  	"title" varchar DEFAULT 'Le *web technique* en clair.',
  	"intro" varchar DEFAULT 'Les termes que nous employons en agence, expliqués simplement : pour comprendre les choix techniques que nous vous proposons.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Un projet à *discuter* ?',
  	"cta_text" varchar DEFAULT 'Premier échange offert pour cadrer votre projet - sites, apps, plateformes. On parle technique sans jargon.',
  	"cta_primary" varchar DEFAULT 'Prendre rendez-vous',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_comparateur" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Comparateurs · Choix techniques',
  	"title" varchar DEFAULT 'Comparer *deux stacks*,
  choisir la bonne.',
  	"intro" varchar DEFAULT 'Les questions qu''on nous pose en boucle : WordPress ou Webflow ? Next.js ou WordPress ? React Native ou Flutter ? On a écrit des comparatifs détaillés pour cadrer ces choix techniques honnêtement, du point de vue d''une agence web normande.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Besoin d''*aide* pour choisir ?',
  	"cta_text" varchar DEFAULT 'Premier échange offert pour cadrer la bonne stack selon votre projet, votre équipe et votre budget.',
  	"cta_primary" varchar DEFAULT 'Prendre rendez-vous',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Questions fréquentes',
  	"title" varchar DEFAULT 'Votre question a sûrement *sa réponse*.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Une autre *question* ?',
  	"cta_text" varchar DEFAULT 'Vous ne trouvez pas votre réponse ? Écrivez-nous directement, nous revenons vers vous sous 24h.',
  	"cta_primary" varchar DEFAULT 'Poser ma question',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_changelog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Journal des versions',
  	"title" varchar DEFAULT 'Ce qui *évolue*, version après version.',
  	"intro" varchar DEFAULT 'L’historique de Krealabs depuis 2020 : lancements, migrations techniques, livraisons et évolutions du site. {n} versions.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Une *suggestion* ?',
  	"cta_text" varchar DEFAULT 'Vous avez une idée d''amélioration ou une demande spécifique ? Nous sommes à l''écoute.',
  	"cta_primary" varchar DEFAULT 'Nous écrire',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."page_blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"mast_left" varchar DEFAULT 'Krealabs · Rouen',
  	"title" varchar DEFAULT 'Le Journal',
  	"intro" varchar DEFAULT 'Articles techniques, retours d’expérience et veille sur les outils que nous utilisons chaque jour, pour vous aider à décider en connaissance de cause.',
  	"empty" varchar DEFAULT 'Aucun article dans cette rubrique pour l’instant.',
  	"cta_eyebrow" varchar DEFAULT 'Votre projet',
  	"cta_title" varchar DEFAULT 'Une question *technique* ?',
  	"cta_text" varchar DEFAULT 'Au-delà des articles, nous sommes disponibles pour répondre à vos questions sur vos projets web et mobile.',
  	"cta_primary" varchar DEFAULT 'Nous contacter',
  	"cta_secondary" varchar DEFAULT 'Voir ce qu’on peut faire pour vous',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."page_calculateur" CASCADE;
  DROP TABLE "payload"."page_lexique" CASCADE;
  DROP TABLE "payload"."page_comparateur" CASCADE;
  DROP TABLE "payload"."page_faq" CASCADE;
  DROP TABLE "payload"."page_changelog" CASCADE;
  DROP TABLE "payload"."page_blog" CASCADE;`)
}
