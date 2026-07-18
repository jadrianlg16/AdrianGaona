# Next.js 15 portfolio — build then run `next start`.
# Multi-stage to keep the runtime image lean.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# Don't fail the image build on lint; we just need the production build.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
# Bring over the built app + deps.
COPY --from=build /app/ ./
EXPOSE 3000
CMD ["npm", "run", "start"]
