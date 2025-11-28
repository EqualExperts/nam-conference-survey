# NAM Conference Survey - System Architecture

**Version**: 2.0
**Last Updated**: 2025-11-19
**Tech Stack**: React + NestJS + Prisma + PostgreSQL + Docker
**Auth**: Anonymous Survey + Password-Based Admin

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Application Structure](#application-structure)
5. [Authentication & Authorization](#authentication--authorization)
6. [Data Flow](#data-flow)
7. [API Design](#api-design)
8. [Database Design](#database-design)
9. [Security](#security)
10. [Performance](#performance)
11. [Error Handling](#error-handling)

---

## System Overview

### Purpose
A lightweight, mobile-first survey application for the Equal Experts North America Conference that enables **anonymous** attendees to provide structured feedback with admin capabilities for viewing and exporting responses.

### Key Characteristics
- **Monolithic Architecture**: Single NestJS backend serving RESTful API
- **SPA Frontend**: React + Vite for fast, responsive UI
- **Anonymous Access**: No login required for survey participants
- **Simple Admin Auth**: Password-based admin access only
- **Mobile-First**: 375px - 1920px responsive design
- **Accessibility**: WCAG 2.1 AA compliant
- **Dockerized**: Complete local development environment

### Target Users
- **Conference Attendees (Anonymous)**: 40 users submitting surveys with no login
- **Conference Organizers (Admins)**: 2-3 users viewing/exporting data
- **Concurrent Load**: 40 simultaneous users during scheduled activity

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         DOCKER COMPOSE                           │
│                                                                   │
│  ┌────────────────┐      ┌────────────────┐      ┌───────────┐ │
│  │   Frontend     │      │    Backend     │      │ PostgreSQL │ │
│  │   (React +     │─────▶│   (NestJS)     │─────▶│    15+     │ │
│  │    Vite)       │      │   + Prisma     │      │            │ │
│  │  Port: 3000    │      │  Port: 3001    │      │ Port: 5432 │ │
│  └────────────────┘      └────────────────┘      └───────────┘ │
│         │                                                         │
│         │ Public: /survey (anonymous)                            │
│         │ Admin: /admin/login (password-based)                   │
│         │                                                         │
└─────────────────────────────────────────────────────────────────┘

No External Services Required:
  - Survey is fully anonymous (no OAuth)
  - Admin uses simple password authentication
  - Logo served from Equal Experts CDN
```

### Container Communication
- Frontend → Backend: HTTP REST API (`http://backend:3001`)
- Backend → PostgreSQL: Prisma connection (`postgresql://postgres:5432`)
- Frontend exposed: `localhost:3000`
- Backend exposed: `localhost:3001` (for direct API testing)
- PostgreSQL exposed: `localhost:5432` (for debugging)

---

## Technology Stack

### Frontend
```json
{
  "framework": "React 18",
  "language": "TypeScript (strict mode)",
  "ui-library": "Mantine UI v7",
  "routing": "React Router v6",
  "forms": "React Hook Form + Zod",
  "state": "TanStack Query (server) + Zustand (client)",
  "http": "Axios",
  "build": "Vite 5"
}
```

**Key Dependencies**:
- `@mantine/core` - Component library
- `@mantine/form` - Form management
- `@mantine/hooks` - Utility hooks
- `@tanstack/react-query` - Server state management
- `react-router-dom` - Routing
- `zod` - Schema validation
- `axios` - HTTP client
- `@dnd-kit/core` - Drag-and-drop for ranking question

### Backend
```json
{
  "framework": "NestJS v10",
  "language": "TypeScript",
  "orm": "Prisma v5",
  "database": "PostgreSQL 15",
  "auth": "Passport.js + JWT",
  "validation": "class-validator + class-transformer",
  "api-style": "RESTful JSON"
}
```

**Key Dependencies**:
- `@nestjs/core` - Framework core
- `@nestjs/passport` - Authentication
- `@nestjs/jwt` - JWT tokens (admin only)
- `@nestjs/throttler` - Rate limiting
- `@prisma/client` - Database ORM
- `class-validator` - DTO validation

### Database
```yaml
Type: PostgreSQL 15
ORM: Prisma
Migrations: Prisma Migrate
Connection Pooling: Default (max 10 connections for local)
```

### DevOps
```yaml
Containerization: Docker + Docker Compose
Package Manager: pnpm (workspace monorepo)
Node Version: 20 LTS
```

---

## Application Structure

### Monorepo Layout
```
nam-conf-survey/
├── apps/
│   ├── frontend/                 # React application
│   │   ├── src/
│   │   │   ├── components/       # Reusable UI components
│   │   │   │   ├── common/       # Buttons, Inputs, Cards
│   │   │   │   ├── survey/       # Question components
│   │   │   │   ├── admin/        # Admin dashboard components
│   │   │   │   └── layout/       # Header, Footer, Layout
│   │   │   ├── pages/            # Route pages
│   │   │   │   ├── Survey.tsx    # Main survey page (public)
│   │   │   │   ├── AdminDashboard.tsx  # Admin dashboard
│   │   │   │   └── AdminLogin.tsx      # Password-based admin login
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── services/         # API client
│   │   │   ├── stores/           # Zustand stores
│   │   │   ├── types/            # TypeScript types
│   │   │   ├── utils/            # Utilities
│   │   │   ├── theme/            # Mantine theme config
│   │   │   ├── App.tsx           # Root component
│   │   │   └── main.tsx          # Entry point
│   │   ├── public/               # Static assets
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── backend/                  # NestJS application
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/         # Authentication module (admin only)
│       │   │   │   ├── auth.controller.ts  # POST /admin/login
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── auth.module.ts
│       │   │   │   ├── strategies/
│       │   │   │   │   └── jwt.strategy.ts
│       │   │   │   ├── guards/
│       │   │   │   │   ├── jwt-auth.guard.ts
│       │   │   │   │   └── roles.guard.ts
│       │   │   │   └── decorators/
│       │   │   │       └── roles.decorator.ts
│       │   │   ├── survey/       # Survey module
│       │   │   │   ├── survey.controller.ts
│       │   │   │   ├── survey.service.ts
│       │   │   │   ├── survey.module.ts
│       │   │   │   └── dto/
│       │   │   │       ├── create-response.dto.ts
│       │   │   │       └── update-response.dto.ts
│       │   │   ├── admin/        # Admin module
│       │   │   │   ├── admin.controller.ts
│       │   │   │   ├── admin.service.ts
│       │   │   │   └── admin.module.ts
│       │   │   ├── users/        # User management
│       │   │   │   ├── users.controller.ts
│       │   │   │   ├── users.service.ts
│       │   │   │   └── users.module.ts
│       │   │   └── prisma/       # Prisma module
│       │   │       ├── prisma.service.ts
│       │   │       └── prisma.module.ts
│       │   ├── common/
│       │   │   ├── filters/      # Exception filters
│       │   │   ├── interceptors/ # Response interceptors
│       │   │   └── pipes/        # Validation pipes
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── prisma/
│       │   ├── schema.prisma     # Database schema
│       │   ├── migrations/       # Migration history
│       │   └── seed.ts           # Seed data
│       ├── test/                 # E2E tests
│       ├── nest-cli.json
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   └── shared/                   # Shared TypeScript types
│       ├── src/
│       │   ├── types/            # Common types
│       │   ├── constants/        # Shared constants
│       │   └── schemas/          # Zod schemas
│       ├── tsconfig.json
│       └── package.json
│
├── .rules/                       # Architecture docs
│   ├── architecture.md           # This file
│   ├── design.md                 # UI/UX guidelines
│   ├── database-schema.md        # Database design
│   ├── api-spec.md               # API documentation
│   └── docker-setup.md           # Docker guide
│
├── docker-compose.yml            # Production-like setup
├── docker-compose.dev.yml        # Development setup
├── .env.example                  # Environment template
├── pnpm-workspace.yaml           # Workspace config
├── package.json                  # Root package.json
└── README.md                     # Setup guide
```

---

## Authentication & Authorization

### Strategy: Anonymous Access + Password-Based Admin Auth

#### Flow: Survey Participant (Anonymous)
```
1. User visits http://localhost:3000
2. Survey page loads immediately (no login required)
3. User fills out survey questions (all optional)
4. User clicks "Submit Survey"
5. Frontend sends POST /api/survey/submit with survey data
6. Backend creates response under anonymous user (anonymous@survey.local)
7. Backend applies rate limiting: 10 submissions/hour per IP address
8. Frontend shows thank you page
9. No authentication, no tokens, fully anonymous
```

#### Flow: Admin Login
```
1. Admin visits http://localhost:3000/admin/login
2. Admin enters password (default: "admin123", configurable via ADMIN_PASSWORD env)
3. Frontend sends POST /api/auth/admin/login with { password: "..." }
4. Backend verifies password against ADMIN_PASSWORD environment variable
5. Backend generates JWT token with payload:
   {
     userId: "uuid",
     email: "admin@equalexperts.com",
     role: "ADMIN",
     iat: timestamp,
     exp: timestamp + 7 days
   }
6. Backend returns { token: "JWT" }
7. Frontend stores token in localStorage as "admin_token"
8. Frontend redirects to /admin dashboard
```

#### JWT Structure
```typescript
interface JwtPayload {
  userId: string;          // UUID from database
  email: string;           // admin@equalexperts.com
  role: 'ADMIN';           // Only admins have JWTs
  iat: number;             // Issued at
  exp: number;             // Expires (7 days)
}
```

#### Protected Routes

**Frontend**:
```typescript
// React Router routes
<Route path="/survey" element={<Survey />} />  // Public, no auth
<Route path="/" element={<Navigate to="/survey" />} />  // Public
<Route path="/admin/login" element={<AdminLogin />} />  // Public login page
<Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
```

**Backend**:
```typescript
// Public survey endpoint - no auth guards
@Post('survey/submit')
@Throttle({ default: { limit: 10, ttl: 3600000 } })  // 10/hour per IP
submitSurvey(@Body() dto: CreateSurveyResponseDto) { ... }

// Admin-only endpoints
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Get('admin/responses')
getResponses() { ... }
```

### Role Definitions

| Role | Permissions |
|------|------------|
| **Anonymous** | Submit survey (no login required), rate-limited to 10/hour per IP |
| **ADMIN** | View all responses, export CSV, view statistics, manage users |

### Security Considerations
- Survey submissions are anonymous (stored under anonymous@survey.local user)
- Rate limiting prevents spam: 10 submissions per hour per IP address
- Admin password configurable via ADMIN_PASSWORD environment variable
- JWT tokens expire after 7 days
- Refresh tokens NOT implemented (MVP simplicity)
- HTTPS required in production (handled by reverse proxy)
- CORS restricted to frontend origin
- Rate limiting: 100 requests/minute per IP (NestJS throttler)

---

## Data Flow

### Survey Submission Flow
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌──────────┐
│ User    │────▶│ React   │────▶│ NestJS  │────▶│PostgreSQL│
│ Browser │     │Frontend │     │ Backend │     │ Database │
└─────────┘     └─────────┘     └─────────┘     └──────────┘
    │               │                 │               │
    │ 1. Fill       │                 │               │
    │    survey     │                 │               │
    │───────────────▶                 │               │
    │               │ 2. POST /api/   │               │
    │               │    survey/submit│               │
    │               │    (JWT token)  │               │
    │               │─────────────────▶               │
    │               │                 │ 3. Validate   │
    │               │                 │    JWT & DTO  │
    │               │                 │               │
    │               │                 │ 4. INSERT     │
    │               │                 │    response   │
    │               │                 │───────────────▶
    │               │                 │               │
    │               │                 │ 5. Return ID  │
    │               │                 │◀───────────────
    │               │ 6. 201 Created  │               │
    │               │    { id: uuid } │               │
    │               │◀─────────────────               │
    │ 7. Redirect   │                 │               │
    │    to /thanks │                 │               │
    │◀───────────────                 │               │
```

### CSV Export Flow
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌──────────┐
│ Admin   │────▶│ React   │────▶│ NestJS  │────▶│PostgreSQL│
│ Browser │     │Frontend │     │ Backend │     │ Database │
└─────────┘     └─────────┘     └─────────┘     └──────────┘
    │               │                 │               │
    │ 1. Click      │                 │               │
    │    "Export"   │                 │               │
    │───────────────▶                 │               │
    │               │ 2. GET /api/    │               │
    │               │    admin/export │               │
    │               │    (JWT admin)  │               │
    │               │─────────────────▶               │
    │               │                 │ 3. Verify     │
    │               │                 │    admin role │
    │               │                 │               │
    │               │                 │ 4. SELECT *   │
    │               │                 │    FROM       │
    │               │                 │    responses  │
    │               │                 │───────────────▶
    │               │                 │               │
    │               │                 │ 5. Return rows│
    │               │                 │◀───────────────
    │               │                 │ 6. Transform  │
    │               │                 │    to CSV     │
    │               │ 7. CSV file     │               │
    │               │    download     │               │
    │               │◀─────────────────               │
    │ 8. Save file  │                 │               │
    │◀───────────────                 │               │
```

---

## API Design

### RESTful Principles
- **Resource-oriented URLs**: `/api/survey`, `/api/admin/responses`
- **HTTP methods**: GET (read), POST (create), PATCH (update), DELETE (remove)
- **Status codes**: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)
- **JSON payloads**: All requests/responses use `Content-Type: application/json`

### Base URL
```
Local: http://localhost:3001/api
```

### Endpoints Overview

See `api-spec.md` for full documentation. Summary:

| Method | Endpoint | Auth | Role | Purpose |
|--------|----------|------|------|---------|
| GET | `/auth/google` | No | - | Initiate Google OAuth |
| GET | `/auth/google/callback` | No | - | OAuth callback |
| POST | `/auth/logout` | Yes | Any | Logout user |
| GET | `/auth/me` | Yes | Any | Get current user |
| POST | `/survey/submit` | Yes | Participant | Submit survey |
| GET | `/survey/my-responses` | Yes | Participant | Get own responses |
| GET | `/admin/responses` | Yes | Admin | Get all responses |
| GET | `/admin/export` | Yes | Admin | Export CSV |
| GET | `/admin/stats` | Yes | Admin | Get statistics |
| PATCH | `/admin/users/:id/role` | Yes | Admin | Update user role |

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "q1_overall_rating",
      "message": "Must be between 1 and 5"
    }
  ],
  "timestamp": "2025-11-18T14:30:00.000Z",
  "path": "/api/survey/submit"
}
```

---

## Database Design

### Prisma Schema Location
`apps/backend/prisma/schema.prisma`

### Core Models
```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  name          String?
  picture       String?  // Google profile picture URL
  role          Role     @default(PARTICIPANT)
  createdAt     DateTime @default(now())
  lastLoginAt   DateTime @default(now())

  responses     SurveyResponse[]

  @@index([email])
  @@index([role])
}

enum Role {
  ADMIN
  PARTICIPANT
}

model SurveyResponse {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  status    Status   @default(SUBMITTED)

  // All 19 questions (see database-schema.md for full list)
  q1_overall_rating          Int?
  q2_return_intent           Int?
  // ... (all questions)

  // Metadata
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

enum Status {
  DRAFT
  SUBMITTED
}
```

See `database-schema.md` for complete schema with all 19 questions + 12 comment fields.

---

## Security

### Authentication Security
- **OAuth 2.0**: Delegated authentication (no password storage)
- **JWT Tokens**: Signed with `HS256` algorithm
- **Token Storage**: Frontend stores in `localStorage` (acceptable for MVP)
- **Token Expiry**: 7 days (conference window + buffer)

### Authorization
- **Role-Based Access Control (RBAC)**: Admin vs Participant roles
- **Guard-Protected Routes**: NestJS guards verify JWT + role
- **Frontend Route Protection**: React Router guards (backup, not primary security)

### API Security
- **CORS**: Restricted to frontend origin (`http://localhost:3000`)
- **Rate Limiting**: 100 requests/minute per IP (NestJS throttler)
- **Input Validation**: class-validator DTOs (prevent injection)
- **SQL Injection**: Prevented by Prisma ORM (parameterized queries)

### Data Protection
- **No PII Required**: Name and location optional (Q19)
- **Encryption**: PostgreSQL connection over TLS in production
- **Environment Variables**: Secrets in `.env` (never committed)

### Docker Security
- **Non-Root User**: Containers run as non-root
- **No Secrets in Images**: Environment variables only
- **Minimal Base Images**: Alpine Linux variants

---

## Performance

### Target Metrics
- **Page Load**: < 2 seconds (P95)
- **API Response**: < 200ms (P95)
- **Survey Submission**: < 500ms (P95)
- **CSV Export (40 responses)**: < 1 second
- **Concurrent Users**: 40 simultaneous submissions

### Optimization Strategies

#### Frontend
- **Code Splitting**: Lazy load admin dashboard
- **Mantine Optimizations**: Tree-shaking unused components
- **TanStack Query**: Automatic caching, deduplication
- **Vite**: Fast HMR, optimized production builds

#### Backend
- **Database Indexing**: Indexes on `userId`, `createdAt`, `status`
- **Connection Pooling**: Prisma connection pool (max 10 for local)
- **DTO Validation**: Fail fast on invalid requests
- **Streaming CSV**: Stream large exports (future enhancement)

#### Database
- **Normalized Schema**: Efficient column storage vs JSON
- **Selective Queries**: Only fetch needed columns
- **Prepared Statements**: Prisma uses prepared statements

---

## Error Handling

### Frontend Error Boundaries
```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

### Backend Exception Filters
```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Log error, return sanitized response
  }
}
```

### Error Categories
1. **Validation Errors** (400): User input invalid
2. **Authentication Errors** (401): Missing/invalid JWT
3. **Authorization Errors** (403): Insufficient permissions
4. **Not Found** (404): Resource doesn't exist
5. **Server Errors** (500): Unexpected failures

### Logging Strategy
- **Development**: Console logs
- **Production**: Structured JSON logs (future: send to monitoring)

---

## Deployment

### Local Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production (Future)
- **Platform**: GCP Cloud Run (containerized)
- **Database**: GCP Cloud SQL (managed PostgreSQL)
- **Secrets**: GCP Secret Manager
- **HTTPS**: Automatic via Cloud Run
- **CI/CD**: GitHub Actions

---

## Future Enhancements

### Phase 2
- Save draft functionality
- Email notifications (survey submitted confirmation)
- Advanced analytics dashboard
- Rate limiting per user (not just IP)

### Phase 3
- Multi-survey support (admin creates surveys)
- Branching logic (conditional questions)
- Conversational AI interface (per Katie's interest)
- Real-time results dashboard

---

## Dependencies

### Critical Path
1. Google OAuth setup (client ID, secret)
2. PostgreSQL database created
3. Environment variables configured
4. Docker Compose running

### External Services
- **Google OAuth**: Requires GCP project with OAuth credentials

---

## Key Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| Monolithic architecture | Small team, 40 users, MVP simplicity |
| PostgreSQL over MongoDB | Structured survey data, relational queries for CSV export |
| Column-based schema vs JSON | Type safety, easier CSV export, query performance |
| JWT without refresh tokens | 7-day conference window, acceptable UX trade-off |
| Google OAuth only | Conference attendees have Google Workspace accounts |
| Mantine UI | Form components, accessibility, mobile-first, Equal Experts branding |
| Docker Compose | Local development, non-technical user setup |
| pnpm monorepo | Shared types, faster than npm, better workspace support |

---

## Contact & Ownership

**Product Owner**: Katie Coleman (Managing Director)
**Target Release**: MVP - November 19, 2025
**Architecture Author**: Generated 2025-11-18
