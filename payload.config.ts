import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { fr } from "@payloadcms/translations/languages/fr";
import sharp from "sharp";

import { Users } from "./payload/collections/users";
import { Media } from "./payload/collections/media";
import { Team } from "./payload/collections/team";
import { Projects } from "./payload/collections/projects";
import { Glossary } from "./payload/collections/glossary";
import { Cities } from "./payload/collections/cities";
import { Sectors } from "./payload/collections/sectors";
import { Faq } from "./payload/collections/faq";
import { Posts } from "./payload/collections/posts";
import { PageGlobals } from "./payload/globals/pages";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Content admin. Lives at /cms (the existing /admin stays the dashboard
 * for contact requests and the newsletter). Its tables live in their own
 * Postgres schema, "payload", so Prisma's tables in "public" are never
 * touched.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/cms/importMap.js"),
    },
    meta: { titleSuffix: " · Krealabs CMS" },
  },
  routes: {
    admin: "/cms",
    api: "/cms-api",
    graphQL: "/cms-api/graphql",
    graphQLPlayground: "/cms-api/graphql-playground",
  },
  i18n: { supportedLanguages: { fr }, fallbackLanguage: "fr" },
  collections: [Posts, Projects, Team, Faq, Glossary, Cities, Sectors, Media, Users],
  globals: PageGlobals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    schemaName: "payload",
    migrationDir: path.resolve(dirname, "payload/migrations"),
    // Production migrations run from lib/cms.ts under an advisory lock
    // (parallel build workers); development pushes the schema directly.
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      // Without a token (local dev) files stay on disk, but the storage
      // fields are always declared, so the database schema is the same in
      // every environment and the migrations match production.
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      alwaysInsertFields: true,
      // The browser sends files straight to Blob: Vercel functions refuse
      // request bodies over 4.5 MB, which a phone photo easily exceeds.
      clientUploads: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
