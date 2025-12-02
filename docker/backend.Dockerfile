# =============================================================================
# Multi-stage Dockerfile for NestJS Backend
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Base - Install dependencies
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl libc6-compat

# Install pnpm
RUN npm install -g pnpm

# Copy shared package first
COPY packages/shared /packages/shared

# Copy package files
COPY apps/backend/package.json apps/backend/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy Prisma schema
COPY apps/backend/prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# -----------------------------------------------------------------------------
# Stage 2: Development - Hot reload
# -----------------------------------------------------------------------------
FROM base AS development

WORKDIR /app

# Copy all source code
COPY apps/backend .

# Expose port
EXPOSE 3001

# Run migrations and start dev server
CMD ["sh", "-c", "pnpm install && npx prisma generate && npx prisma migrate deploy && npx prisma db seed && pnpm run start:dev"]

# -----------------------------------------------------------------------------
# Stage 3: Builder - Compile TypeScript
# -----------------------------------------------------------------------------
FROM base AS builder

WORKDIR /app

# Copy source code
COPY apps/backend .

# Build application
RUN pnpm run build

# -----------------------------------------------------------------------------
# Stage 4: Production - Optimized runtime
# -----------------------------------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl libc6-compat

# Install pnpm
RUN npm install -g pnpm

# Copy shared package first
COPY packages/shared /packages/shared

# Copy package files
COPY apps/backend/package.json apps/backend/pnpm-lock.yaml* ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001
USER nestjs

# Expose port
EXPOSE 3001

# Start application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
