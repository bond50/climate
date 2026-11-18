# syntax=docker/dockerfile:1.7

# ---- deps ----
FROM node:24-bookworm-slim AS deps

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm \
  npm ci


# ---- builder ----
FROM node:24-bookworm-slim AS builder
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Only public build-time env (the Turnstile SITE key is public; the secret key is runtime-only)
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,target=/root/.npm \
  npm run build


# ---- runner ----
FROM node:24-bookworm-slim AS runner
WORKDIR /app

# npm is not used at runtime (the app starts with plain `node`); removing it also drops its
# bundled dependencies from vulnerability scans.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

# Unprivileged runtime user (the siscom deploy runs the container as 10001:10001)
RUN groupadd --system --gid 10001 app   && useradd --system --uid 10001 --gid 10001 --home-dir /app --no-create-home --shell /usr/sbin/nologin app

ENV NODE_ENV=production
ENV PORT=3003
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=10001:10001 /app/.next/standalone ./
COPY --from=builder --chown=10001:10001 /app/.next/static ./.next/static
COPY --from=builder --chown=10001:10001 /app/public ./public

# Next writes its image cache here
RUN mkdir -p .next/cache && chown 10001:10001 .next/cache

EXPOSE 3003

USER 10001:10001

CMD ["node", "server.js"]