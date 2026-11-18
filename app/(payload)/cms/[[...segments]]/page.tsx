import type { Metadata } from "next";
import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";

import { cms } from "@/lib/cms";

import { importMap } from "../importMap.js";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

export default async function Page({ params, searchParams }: Args) {
  await cms(); // applies pending migrations first (production)
  return RootPage({ config, params, searchParams, importMap });
}
