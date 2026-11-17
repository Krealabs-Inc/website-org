import config from "@payload-config";
import { getPayload } from "payload";

/** Payload's Local API (no HTTP), shared by every content getter. */
export function cms() {
  return getPayload({ config });
}

/** URL of an uploaded media document, if the relation is populated. */
export function mediaUrl(value: unknown): string | undefined {
  if (value && typeof value === "object" && "url" in value && typeof value.url === "string") return value.url;
  return undefined;
}
