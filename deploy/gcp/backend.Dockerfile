# =============================================================================
# Production Dockerfile for NestJS Backend on Cloud Run
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Builder - Install dependencies and compile
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl libc6-compat

# Install pnpm
RUN npm install -g pnpm

# Copy shared package
COPY packages/shared /packages/shared

# Copy package files
COPY apps/backend/package.json apps/backend/pnpm-lock.yaml* ./

# Install all dependencies (including dev for build)
RUN pnpm install --frozen-lockfile || pnpm install

# Copy Prisma schema and generate client
COPY apps/backend/prisma ./prisma
RUN npx prisma generate

# Copy source code and build
COPY apps/backend .
RUN pnpm run build

# -----------------------------------------------------------------------------
# Stage 2: Production - Optimized runtime
# -----------------------------------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Install OpenSSL for Prisma runtime
RUN apk add --no-cache openssl libc6-compat

# Copy compiled code, prisma, and full node_modules from builder
# (Avoids pnpm symlink issues by copying everything)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001
USER nestjs

# Cloud Run uses PORT environment variable (default 8080)
ENV PORT=8080
EXPOSE 8080

# Health check endpoint is at /api/health
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Start application (migrations run separately via Cloud Run job)
CMD ["node", "dist/main"]
