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
import { migrations } from "./payload/migrations";

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
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    schemaName: "payload",
    migrationDir: path.resolve(dirname, "payload/migrations"),
    // In production, pending migrations run when Payload starts; in
    // development the schema is pushed directly from the config.
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
