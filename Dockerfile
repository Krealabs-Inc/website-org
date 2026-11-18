# Krealabs site (Next.js + Payload), built and run by Coolify.
# Multi-stage: dependencies → build (standalone output) → slim runtime.

FROM node:24-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1

# ---- dependencies ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Install scripts are skipped: the only one that matters (prisma generate)
# runs in the build stage, once the sources are there.
RUN npm ci --ignore-scripts

# ---- build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Coolify passes the variables marked "Build Variable" as build args.
# The build prerenders pages from Directus and reads the CSP mode.
ARG DATABASE_URL
ARG DIRECTUS_URL
ARG CSP_ENFORCE
ENV NODE_OPTIONS=--max-old-space-size=3072
RUN npx prisma generate && npx next build

# ---- runtime ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
# curl: used by Coolify's health check.
RUN apt-get update && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/ -o /dev/null || exit 1
CMD ["node", "server.js"]
