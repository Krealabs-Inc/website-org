/* Payload admin root layout (route group separate from the site). */
import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ReactNode } from "react";

import { cms } from "@/lib/cms";

import { importMap } from "./cms/importMap.js";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  await cms(); // applies pending migrations first (production)
  return handleServerFunctions({ ...args, config, importMap });
};

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
