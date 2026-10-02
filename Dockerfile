# Next.js 15 portfolio: build, then run `next start` on port 3000.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Optional: build for another domain (see src/app/lib/site.ts). Unset means
# the default, https://www.adriangaona.dev.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
# Run as the image's unprivileged user. It owns the app so Next.js can write
# its image-optimization cache under .next/cache.
COPY --from=build --chown=node:node /app/ ./
USER node
EXPOSE 3000
CMD ["npm", "run", "start"]
