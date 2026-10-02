# Next.js 15 portfolio: build, then serve with Next's standalone server on
# port 3000.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Optional: build for another domain (see src/app/lib/site.ts). Unset means
# the default, https://www.adriangaona.dev.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL NEXT_TELEMETRY_DISABLED=1 BUILD_STANDALONE=1
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
# HOSTNAME is set explicitly: Docker sets it to the container ID, and the
# standalone server listens on whatever it holds.
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
# The standalone server, plus the two folders it leaves for the host to copy.
# Owned by the unprivileged user so Next.js can write its image cache.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
