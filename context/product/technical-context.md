# Technical Context

## Tech Stack

### Frontend
- **Framework**: [e.g., React, Vue, Angular, Svelte, Next.js]
- **Language**: [e.g., TypeScript, JavaScript]
- **Styling**: [e.g., Tailwind CSS, CSS Modules, Styled Components]
- **State Management**: [e.g., Redux, Zustand, React Query]
- **Build Tool**: [e.g., Vite, Next.js, Create React App]

**Example:**
> **Framework**: React 18 with Next.js 14
> **Language**: TypeScript (strict mode)
> **Styling**: Tailwind CSS + Headless UI
> **State Management**: React Query + Zustand
> **Build Tool**: Next.js (App Router)

### Backend
- **Framework**: [e.g., Node.js/Express, Django, Rails, FastAPI]
- **Language**: [e.g., TypeScript, Python, Ruby, Go]
- **Database**: [e.g., PostgreSQL, MySQL, MongoDB]
- **API Style**: [e.g., REST, GraphQL, tRPC]
- **Authentication**: [e.g., JWT, Session-based, OAuth]

**Example:**
> **Framework**: Node.js with Express
> **Language**: TypeScript
> **Database**: PostgreSQL 15
> **API Style**: RESTful JSON API
> **Authentication**: JWT with refresh tokens

### Infrastructure
- **Cloud Provider**: [e.g., AWS, GCP, Azure, Vercel]
- **Compute**: [e.g., Cloud Run, Lambda, EC2, App Engine]
- **Database Hosting**: [e.g., Cloud SQL, RDS, Supabase]
- **File Storage**: [e.g., S3, Cloud Storage, Cloudinary]
- **CDN**: [e.g., CloudFront, Cloud CDN, Cloudflare]
- **Monitoring**: [e.g., DataDog, Sentry, New Relic]

**Example:**
> **Cloud Provider**: Google Cloud Platform
> **Compute**: Cloud Run (serverless containers)
> **Database Hosting**: Cloud SQL (managed PostgreSQL)
> **File Storage**: Cloud Storage
> **Monitoring**: Sentry + Cloud Logging

### CI/CD
- **Source Control**: [e.g., GitHub, GitLab, Bitbucket]
- **CI/CD Platform**: [e.g., GitHub Actions, CircleCI, GitLab CI]
- **Deployment Strategy**: [e.g., Blue/Green, Canary, Rolling]
- **Environments**: [e.g., dev, staging, production]

**Example:**
> **Source Control**: GitHub
> **CI/CD Platform**: GitHub Actions
> **Deployment Strategy**: Rolling deployment to Cloud Run
> **Environments**: development, staging, production

### Third-Party Integrations
[List key integrations and why they're needed]

**Examples:**
- **Stripe**: Payment processing (subscriptions)
- **SendGrid**: Transactional emails
- **Auth0**: Social authentication (Google, GitHub)
- **Segment**: Analytics and customer data
- **Intercom**: Customer support chat

---

## Architecture Decisions

### Application Architecture
[Describe overall architecture pattern]

**Example:**
> **Pattern**: Monolithic backend API with SPA frontend
> **Rationale**: Team is small, premature to split into microservices
> **Future**: May extract background jobs into separate service if needed

### Data Model Strategy
[Describe approach to data modeling]

**Example:**
> **Approach**: Relational (PostgreSQL) with normalized schema
> **Caching**: Redis for session data and frequently accessed queries
> **Migrations**: Managed via Prisma ORM
> **Backups**: Daily automated backups with 30-day retention

### API Design Principles
[Describe API conventions]

**Example:**
> **Style**: RESTful with JSON
> **Versioning**: URL-based (/api/v1/)
> **Authentication**: Bearer token in Authorization header
> **Error Handling**: Standard HTTP status codes + error details in body
> **Pagination**: Cursor-based for large collections

---

## Technical Constraints

### Performance Requirements
[Define performance targets]

**Examples:**
- **Page Load**: < 2 seconds (P95)
- **API Response**: < 200ms (P95)
- **Database Queries**: < 100ms (P95)
- **Uptime**: 99.9% (excluding planned maintenance)

### Scalability Requirements
[Define scale targets]

**Examples:**
- **Users**: Support 10K concurrent users (Year 1)
- **Data Volume**: Handle 100M database rows
- **Request Rate**: 1000 req/sec sustained
- **Geographic**: US only (Year 1), expand to EU (Year 2)

### Security Requirements
[Define security standards]

**Examples:**
- **Authentication**: Multi-factor authentication (MFA) optional
- **Data Encryption**: At rest (database) and in transit (HTTPS)
- **Compliance**: GDPR compliant (data deletion, export)
- **Secrets Management**: Google Secret Manager (no secrets in code)
- **Dependency Scanning**: Automated vulnerability scanning in CI

### Browser/Device Support
[Define supported platforms]

**Examples:**
- **Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: Responsive web (iOS Safari, Android Chrome)
- **Screen Sizes**: 375px - 1920px width
- **Accessibility**: WCAG 2.1 AA compliance

---

## Development Practices

### Code Standards
[Define coding conventions]

**Examples:**
- **Linting**: ESLint + Prettier (enforced in CI)
- **TypeScript**: Strict mode, no `any` types
- **Testing**: Jest + React Testing Library
- **Coverage**: Minimum 80% for new code
- **Code Review**: Required approval from 1+ team member

### Testing Strategy
[Define testing approach]

**Examples:**
- **Unit Tests**: All business logic functions
- **Integration Tests**: API endpoints, database interactions
- **E2E Tests**: Critical user flows (Playwright)
- **Load Testing**: Before major releases
- **CI Tests**: Run on every PR, must pass before merge

### Release Process
[Define deployment workflow]

**Example:**
> 1. Feature branch → PR → Code review
> 2. CI runs tests, linting, type checking
> 3. Merge to `main` → Auto-deploy to staging
> 4. Manual QA in staging
> 5. Tag release → Auto-deploy to production
> 6. Monitor for 24h, rollback if issues

---

## Dependencies & Integrations

### Core Dependencies
[List critical libraries/frameworks]

**Examples:**
- **Frontend**: React 18, React Query, Tailwind CSS
- **Backend**: Express, Prisma ORM, Zod (validation)
- **Testing**: Jest, Playwright, MSW (API mocking)
- **DevOps**: Docker, GitHub Actions

### Integration Points
[Map out external services and APIs]

**Example:**
```
┌─────────────┐
│   Frontend  │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│   Backend   │────▶│  PostgreSQL │
└──────┬──────┘     └─────────────┘
       │
       ├────▶ Stripe (payments)
       ├────▶ SendGrid (email)
       ├────▶ Segment (analytics)
       └────▶ Auth0 (social auth)
```

---

## Known Technical Debt

[Document shortcuts taken that need addressing]

**Examples:**
- **Authentication**: Using basic JWT, need to add refresh token rotation
- **Database**: No connection pooling, may hit limits at scale
- **Caching**: Redis not yet implemented for read-heavy queries
- **Monitoring**: Basic logging only, need structured logging + APM
- **Tests**: E2E test coverage is low (only happy paths)

---

## Future Technical Investments

[Planned improvements and when to tackle them]

**Examples:**
- **Q2 2025**: Add Redis caching layer (when > 1000 DAU)
- **Q3 2025**: Implement background job queue (when async tasks > 100/day)
- **Q4 2025**: Consider microservices (when team > 10 engineers)
- **2026**: Multi-region deployment (when EU customers > 30%)

---

## Development Environment

### Setup Requirements
[What developers need to run locally]

**Examples:**
- Node.js 20+
- PostgreSQL 15+
- Docker (for local services)
- Git
- Code editor (VS Code recommended)

### Local Development
[How to run the app locally]

**Example:**
```bash
# Install dependencies
npm install

# Start PostgreSQL (Docker)
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start dev server
npm run dev

# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

### Environment Variables
[Key environment variables needed]

**Example:**
```bash
DATABASE_URL=postgresql://localhost:5432/myapp
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG....
```

---

## Monitoring & Observability

### Metrics to Track
[Key metrics to monitor]

**Examples:**
- **Performance**: API response times, database query times
- **Errors**: Error rate by endpoint, exception types
- **Usage**: Active users, feature adoption rates
- **Infrastructure**: CPU, memory, disk usage

### Alerting Strategy
[When to alert on-call engineers]

**Examples:**
- **Critical**: Error rate > 5%, API downtime > 1 min
- **Warning**: Response time > 1s, CPU > 80%
- **Info**: Deployments, scheduled maintenance

---

## Questions to Answer During Discovery

[Common technical questions that come up in product discovery]

- What compute platform should we use? (Cloud Run vs App Engine vs GKE)
- JWT vs session-based authentication?
- SQL vs NoSQL database?
- Monorepo vs separate repos for frontend/backend?
- Which email service provider?
- How to handle file uploads (size limits, storage)?
- What caching strategy (if any)?
- Which monitoring/observability tools?
