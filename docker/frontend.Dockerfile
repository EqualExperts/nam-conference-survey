# =============================================================================
# Multi-stage Dockerfile for React Frontend
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Base - Install dependencies
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy shared package first
COPY packages/shared /packages/shared

# Copy package files
COPY apps/frontend/package.json apps/frontend/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# -----------------------------------------------------------------------------
# Stage 2: Development - Hot reload
# -----------------------------------------------------------------------------
FROM base AS development

WORKDIR /app

# Copy source code
COPY apps/frontend .

# Expose port
EXPOSE 3000

# Start dev server (--host allows access from host machine)
CMD ["sh", "-c", "pnpm install && pnpm run dev -- --host"]

# -----------------------------------------------------------------------------
# Stage 3: Builder - Build static assets
# -----------------------------------------------------------------------------
FROM base AS builder

WORKDIR /app

# Copy source code
COPY apps/frontend .

# Build application
RUN pnpm run build

# -----------------------------------------------------------------------------
# Stage 4: Production - Serve with Nginx
# -----------------------------------------------------------------------------
FROM nginx:alpine AS production

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
