import config from "@payload-config";
import "@payloadcms/next/css";
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from "@payloadcms/next/routes";

import { cms } from "@/lib/cms";

type Handler = (req: Request, ctx: { params: Promise<{ slug: string[] }> }) => Promise<Response>;

/** Every API call waits for pending migrations (production) before Payload runs. */
const migrated =
  (handler: Handler): Handler =>
  async (req, ctx) => {
    await cms();
    return handler(req, ctx);
  };

export const GET = migrated(REST_GET(config));
export const POST = migrated(REST_POST(config));
export const DELETE = migrated(REST_DELETE(config));
export const PATCH = migrated(REST_PATCH(config));
export const PUT = migrated(REST_PUT(config));
export const OPTIONS = migrated(REST_OPTIONS(config));
