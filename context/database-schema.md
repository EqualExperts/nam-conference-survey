# NAM Conference Survey - Database Schema

**Version**: 1.0
**Last Updated**: 2025-11-18
**ORM**: Prisma 5
**Database**: PostgreSQL 15+

---

## Table of Contents

1. [Schema Overview](#schema-overview)
2. [Complete Prisma Schema](#complete-prisma-schema)
3. [Question Mapping](#question-mapping)
4. [Data Types & Rationale](#data-types--rationale)
5. [Indexes](#indexes)
6. [Migrations](#migrations)
7. [Seed Data](#seed-data)
8. [CSV Export Mapping](#csv-export-mapping)

---

## Schema Overview

### Design Decision: Wide Table Approach

**Choice**: Single `SurveyResponse` table with all 19 questions + 12 comments as columns

**Rationale**:
- **Type Safety**: Prisma generates strongly-typed client
- **Query Performance**: No joins needed for full response retrieval
- **CSV Export**: Direct column-to-CSV mapping
- **Simplicity**: Easier to understand and maintain
- **Small Scale**: 40-100 responses don't require optimization

**Trade-off**: Less flexible if questions change frequently (acceptable for fixed survey)

---

## Complete Prisma Schema

**File**: `apps/backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// USER MODEL
// ============================================================================

model User {
  id          String   @id @default(uuid())
  email       String   @unique
  name        String?
  picture     String?  // Google profile picture URL
  role        Role     @default(PARTICIPANT)
  createdAt   DateTime @default(now())
  lastLoginAt DateTime @default(now())

  // Relations
  responses SurveyResponse[]

  @@index([email])
  @@index([role])
  @@map("users")
}

enum Role {
  ADMIN
  PARTICIPANT
}

// ============================================================================
// SURVEY RESPONSE MODEL
// ============================================================================

model SurveyResponse {
  id     String @id @default(uuid())
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  status Status @default(SUBMITTED)

  // ========================================================================
  // LIKERT SCALE QUESTIONS (1-5 rating, nullable)
  // ========================================================================

  // Q1: Overall conference rating
  q1OverallRating Int? // 1-5 or null
  q1Comment       String? @db.Text

  // Q2: Return attendance intent
  q2ReturnIntent Int? // 1-5 or null
  q2Comment      String? @db.Text

  // Q3: Coworking day effectiveness (has N/A option)
  q3CoworkingEffectiveness String? // '1', '2', '3', '4', '5', 'NA', or null
  q3Comment                String? @db.Text

  // Q5: Connection depth rating
  q5ConnectionDepth Int? // 1-5 or null
  q5Comment         String? @db.Text

  // Q6: Learning value
  q6LearningValue Int? // 1-5 or null
  q6Comment       String? @db.Text

  // Q8: Saturday personal time worth (has N/A option)
  q8SaturdayWorth String? // '1', '2', '3', '4', '5', 'NA', or null
  q8Comment       String? @db.Text

  // Q9: Pre-conference communication clarity
  q9PreConferenceCommunication Int? // 1-5 or null

  // Q10: Accommodations, venue & catering (has N/A option)
  q10AccommodationsVenue String? // '1', '2', '3', '4', '5', 'NA', or null

  // Q13: Comparison to other professional development (has N/A option)
  q13ComparisonToPD String? // '1', '2', '3', '4', '5', 'NA', or null

  // ========================================================================
  // MULTIPLE SELECT QUESTIONS (checkboxes)
  // ========================================================================

  // Q4: Connection quality - Who (multiple checkboxes)
  q4ConnectionTypes String[] @default([]) // Array: ['colleagues', 'clients', 'prospects', etc.]
  q4ConnectionOther String? // Text if "Other" selected

  // Q17: Feedback confidence - What gives confidence (multiple checkboxes)
  q17FeedbackConfidence String[] @default([]) // Array of selected options

  // ========================================================================
  // CHOICE RANKING QUESTION
  // ========================================================================

  // Q11: Session format preferences (rank 1-4)
  // Stored as JSON: { "workshops": 1, "presentations": 2, "networking": 3, "coworking": 4 }
  q11SessionRankings Json?

  // ========================================================================
  // SINGLE CHOICE QUESTIONS
  // ========================================================================

  // Q12: Conference length
  q12ConferenceLength String? // 'too_short', 'just_right', 'too_long'

  // Q16: Improvements from last conference
  q16Improvements String? // Option value
  q16Comment      String? @db.Text

  // ========================================================================
  // OPEN-ENDED TEXT QUESTIONS
  // ========================================================================

  // Q7: Future learning topics
  q7FutureTopics String? @db.Text

  // Q14: What you liked most
  q14LikedMost String? @db.Text

  // Q15: Additional feedback
  q15AdditionalFeedback String? @db.Text

  // ========================================================================
  // DEMOGRAPHICS QUESTIONS (Q18, Q19)
  // ========================================================================

  // Q18: Employment status (single choice)
  q18EmploymentStatus String? // 'employee', 'contractor', 'client', 'other'

  // Q19: Name and home location (optional text fields)
  q19Name     String?
  q19Location String?

  // ========================================================================
  // METADATA
  // ========================================================================

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([status])
  @@index([createdAt])
  @@map("survey_responses")
}

enum Status {
  DRAFT     // For future save draft functionality
  SUBMITTED // Default - survey completed
}
```

---

## Question Mapping

### All 19 Questions with Database Fields

| Q# | Question | Type | Database Field | Data Type | Notes |
|----|----------|------|----------------|-----------|-------|
| 1 | Overall conference rating | Likert | `q1OverallRating` | `Int?` | 1-5 or null |
| | Q1 comment | Comment | `q1Comment` | `String?` | Optional |
| 2 | Return attendance intent | Likert | `q2ReturnIntent` | `Int?` | 1-5 or null |
| | Q2 comment | Comment | `q2Comment` | `String?` | Optional |
| 3 | Coworking day effectiveness | Likert + N/A | `q3CoworkingEffectiveness` | `String?` | '1'-'5', 'NA', null |
| | Q3 comment | Comment | `q3Comment` | `String?` | Optional |
| 4 | Connection quality - Who | Multi-select | `q4ConnectionTypes` | `String[]` | Array of values |
| | Q4 "Other" text | Text | `q4ConnectionOther` | `String?` | If "Other" selected |
| 5 | Connection depth | Likert | `q5ConnectionDepth` | `Int?` | 1-5 or null |
| | Q5 comment | Comment | `q5Comment` | `String?` | Optional |
| 6 | Learning value | Likert | `q6LearningValue` | `Int?` | 1-5 or null |
| | Q6 comment | Comment | `q6Comment` | `String?` | Optional |
| 7 | Future learning topics | Open-ended | `q7FutureTopics` | `String?` | Text |
| 8 | Saturday personal time worth | Likert + N/A | `q8SaturdayWorth` | `String?` | '1'-'5', 'NA', null |
| | Q8 comment | Comment | `q8Comment` | `String?` | Optional |
| 9 | Pre-conference communication | Likert | `q9PreConferenceCommunication` | `Int?` | 1-5 or null |
| 10 | Accommodations, venue, catering | Likert + N/A | `q10AccommodationsVenue` | `String?` | '1'-'5', 'NA', null |
| 11 | Session format preferences | Ranking | `q11SessionRankings` | `Json?` | JSON object |
| 12 | Conference length | Single choice | `q12ConferenceLength` | `String?` | Enum value |
| 13 | Comparison to other PD | Likert + N/A | `q13ComparisonToPD` | `String?` | '1'-'5', 'NA', null |
| 14 | What you liked most | Open-ended | `q14LikedMost` | `String?` | Text |
| 15 | Additional feedback | Open-ended | `q15AdditionalFeedback` | `String?` | Text |
| 16 | Improvements from last year | Single choice | `q16Improvements` | `String?` | Option value |
| | Q16 comment | Comment | `q16Comment` | `String?` | Optional |
| 17 | Feedback confidence | Multi-select | `q17FeedbackConfidence` | `String[]` | Array of values |
| 18 | Employment status | Single choice | `q18EmploymentStatus` | `String?` | Enum value |
| 19 | Name | Text | `q19Name` | `String?` | Optional |
| 19 | Home location | Text | `q19Location` | `String?` | Optional |

**Total Fields**: 31 columns (19 questions + 12 comment fields)

---

## Data Types & Rationale

### Likert Scale Questions (Standard 1-5)
```prisma
q1OverallRating Int?
```
**Rationale**:
- Simple integer storage
- Nullable for optional questions
- Direct CSV export (1, 2, 3, 4, 5, or blank)

### Likert with N/A Option (Q3, Q8, Q10, Q13)
```prisma
q3CoworkingEffectiveness String?
```
**Values**: `'1'`, `'2'`, `'3'`, `'4'`, `'5'`, `'NA'`, `null`

**Rationale**:
- String type distinguishes N/A from null (skipped)
- `'NA'` = user explicitly selected N/A
- `null` = user skipped question entirely
- CSV export: "1", "2", "3", "4", "5", "N/A", "" (blank)

**Alternative (Not Chosen)**:
- Using `-1` or `0` for N/A: Confusing in CSV, affects averages
- Separate `hasNA` boolean: Extra complexity, hard to query

### Multiple Select (Q4, Q17)
```prisma
q4ConnectionTypes String[] @default([])
```
**Example Values**:
```typescript
['colleagues', 'clients', 'prospects']
// Empty array if nothing selected
```

**Rationale**:
- PostgreSQL native array support
- Prisma handles array serialization
- Easy to query: `contains`, `has`, `hasSome`
- CSV export: Join with semicolons (e.g., "colleagues;clients;prospects")

**Q4 "Other" Text**:
```prisma
q4ConnectionOther String?
```
Stores free-text if user selects "Other" checkbox

### Ranking Question (Q11)
```prisma
q11SessionRankings Json?
```
**Example Value**:
```json
{
  "workshops": 1,
  "presentations": 2,
  "networking": 3,
  "coworking": 4
}
```

**Rationale**:
- JSON allows flexible key-value storage
- Easy to add/remove session types
- Prisma supports JSON queries
- CSV export: Separate columns (Q11_workshops, Q11_presentations, etc.) or JSON string

**Alternative (Not Chosen)**:
- Separate columns (`q11WorkshopsRank`, `q11PresentationsRank`, etc.): Rigid, lots of columns
- Relational table: Overkill for 4 options

### Open-Ended Text
```prisma
q7FutureTopics String? @db.Text
```
**Rationale**:
- `@db.Text` allows unlimited length (vs VARCHAR(255))
- Nullable for optional questions
- Direct CSV export (quoted if contains commas)

### Single Choice
```prisma
q12ConferenceLength String?
```
**Example Values**: `'too_short'`, `'just_right'`, `'too_long'`

**Rationale**:
- String for semantic values (not 1, 2, 3)
- Frontend sends value directly
- CSV export: Human-readable ("just_right")

**Alternative (Not Chosen)**:
- Enum in Prisma: Harder to change options later, migration needed

---

## Indexes

### Purpose
- **Performance**: Fast CSV export (fetch all responses)
- **Query Optimization**: Admin dashboard filters
- **Uniqueness**: Prevent duplicate users

### Index Definitions

```prisma
@@index([userId])       // Filter responses by user
@@index([status])       // Filter by draft vs submitted
@@index([createdAt])    // Order by submission time
@@index([email])        // User lookup by email (OAuth)
```

### Query Examples

```typescript
// Get all submitted responses (for CSV export)
const responses = await prisma.surveyResponse.findMany({
  where: { status: 'SUBMITTED' },
  orderBy: { createdAt: 'asc' },
});
// Uses: @@index([status]) and @@index([createdAt])

// Get user's responses
const myResponses = await prisma.surveyResponse.findMany({
  where: { userId: 'abc-123' },
});
// Uses: @@index([userId])
```

---

## Migrations

### Initial Migration

**Command**:
```bash
cd apps/backend
npx prisma migrate dev --name init
```

**Generated SQL** (excerpt):
```sql
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PARTICIPANT');
CREATE TYPE "Status" AS ENUM ('DRAFT', 'SUBMITTED');

CREATE TABLE "users" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT,
  "picture" TEXT,
  "role" "Role" DEFAULT 'PARTICIPANT',
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "lastLoginAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "survey_responses" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "status" "Status" DEFAULT 'SUBMITTED',

  -- All question fields (see schema above)
  "q1OverallRating" INTEGER,
  "q1Comment" TEXT,
  -- ... (all 31 fields)

  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3),

  CONSTRAINT "survey_responses_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_role_idx" ON "users"("role");
CREATE INDEX "survey_responses_userId_idx" ON "survey_responses"("userId");
CREATE INDEX "survey_responses_status_idx" ON "survey_responses"("status");
CREATE INDEX "survey_responses_createdAt_idx" ON "survey_responses"("createdAt");
```

### Migration Workflow

**Development**:
```bash
# Create migration
npx prisma migrate dev --name add_new_field

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Apply migrations
npx prisma migrate deploy
```

**Production**:
```bash
# Apply migrations only (no prompt)
npx prisma migrate deploy
```

---

## Seed Data

### Purpose
- Create admin user for local development
- Add sample survey responses for testing CSV export
- Test all question types

### Seed Script (`apps/backend/prisma/seed.ts`)

```typescript
import { PrismaClient, Role, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@equalexperts.com' },
    update: {},
    create: {
      email: 'admin@equalexperts.com',
      name: 'Admin User',
      role: Role.ADMIN,
    },
  });
  console.log('Created admin user:', admin.email);

  // Create participant users
  const participant1 = await prisma.user.upsert({
    where: { email: 'participant1@example.com' },
    update: {},
    create: {
      email: 'participant1@example.com',
      name: 'Test Participant 1',
      role: Role.PARTICIPANT,
    },
  });

  const participant2 = await prisma.user.upsert({
    where: { email: 'participant2@example.com' },
    update: {},
    create: {
      email: 'participant2@example.com',
      name: 'Test Participant 2',
      role: Role.PARTICIPANT,
    },
  });

  console.log('Created participant users');

  // Create sample survey responses
  await prisma.surveyResponse.create({
    data: {
      userId: participant1.id,
      status: Status.SUBMITTED,

      // Likert questions
      q1OverallRating: 5,
      q1Comment: 'Excellent conference!',
      q2ReturnIntent: 5,
      q3CoworkingEffectiveness: '4',
      q5ConnectionDepth: 4,
      q6LearningValue: 5,
      q8SaturdayWorth: '5',
      q9PreConferenceCommunication: 4,
      q10AccommodationsVenue: '5',
      q13ComparisonToPD: '4',

      // Multiple select
      q4ConnectionTypes: ['colleagues', 'clients', 'prospects'],
      q17FeedbackConfidence: ['transparency', 'acknowledgment'],

      // Ranking
      q11SessionRankings: {
        workshops: 1,
        presentations: 2,
        networking: 3,
        coworking: 4,
      },

      // Single choice
      q12ConferenceLength: 'just_right',
      q16Improvements: 'better_than_last',

      // Open-ended
      q7FutureTopics: 'AI and machine learning',
      q14LikedMost: 'The networking sessions were fantastic',
      q15AdditionalFeedback: 'Keep up the great work!',

      // Demographics
      q18EmploymentStatus: 'employee',
      q19Name: 'Test Participant 1',
      q19Location: 'New York, NY',
    },
  });

  // Create partial response (test zero mandatory fields)
  await prisma.surveyResponse.create({
    data: {
      userId: participant2.id,
      status: Status.SUBMITTED,

      // Only answer Q1 and Q2
      q1OverallRating: 3,
      q2ReturnIntent: 4,

      // All other fields remain null
    },
  });

  // Create response with N/A values
  await prisma.surveyResponse.create({
    data: {
      userId: participant1.id,
      status: Status.SUBMITTED,

      q1OverallRating: 4,
      q3CoworkingEffectiveness: 'NA', // User selected N/A
      q8SaturdayWorth: 'NA',
      q10AccommodationsVenue: 'NA',
      q13ComparisonToPD: 'NA',
    },
  });

  console.log('Seeded sample survey responses');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Run Seed**:
```bash
npx prisma db seed
```

**package.json** (configure seed):
```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

---

## CSV Export Mapping

### Column Headers (34 total)

| CSV Column | Database Field | Data Type | Example Value |
|------------|----------------|-----------|---------------|
| `response_id` | `id` | UUID | `abc-123-def-456` |
| `submitted_at` | `createdAt` | Timestamp | `2025-12-06 15:30:00` |
| `user_email` | `user.email` | String | `attendee@example.com` |
| `q1_overall_rating` | `q1OverallRating` | Int | `5` |
| `q1_comment` | `q1Comment` | String | `"Great event"` |
| `q2_return_intent` | `q2ReturnIntent` | Int | `4` |
| `q2_comment` | `q2Comment` | String | `""` |
| `q3_coworking_effectiveness` | `q3CoworkingEffectiveness` | String | `NA` |
| `q3_comment` | `q3Comment` | String | `""` |
| `q4_connection_types` | `q4ConnectionTypes` | String | `colleagues;clients` |
| `q4_connection_other` | `q4ConnectionOther` | String | `""` |
| `q5_connection_depth` | `q5ConnectionDepth` | Int | `4` |
| `q5_comment` | `q5Comment` | String | `""` |
| `q6_learning_value` | `q6LearningValue` | Int | `5` |
| `q6_comment` | `q6Comment` | String | `""` |
| `q7_future_topics` | `q7FutureTopics` | String | `"AI and ML"` |
| `q8_saturday_worth` | `q8SaturdayWorth` | String | `5` |
| `q8_comment` | `q8Comment` | String | `""` |
| `q9_preconference_communication` | `q9PreConferenceCommunication` | Int | `4` |
| `q10_accommodations_venue` | `q10AccommodationsVenue` | String | `5` |
| `q11_session_rankings` | `q11SessionRankings` | JSON | `{"workshops":1,"presentations":2}` |
| `q12_conference_length` | `q12ConferenceLength` | String | `just_right` |
| `q13_comparison_to_pd` | `q13ComparisonToPD` | String | `4` |
| `q14_liked_most` | `q14LikedMost` | String | `"Networking"` |
| `q15_additional_feedback` | `q15AdditionalFeedback` | String | `""` |
| `q16_improvements` | `q16Improvements` | String | `better_than_last` |
| `q16_comment` | `q16Comment` | String | `""` |
| `q17_feedback_confidence` | `q17FeedbackConfidence` | String | `transparency;acknowledgment` |
| `q18_employment_status` | `q18EmploymentStatus` | String | `employee` |
| `q19_name` | `q19Name` | String | `"John Doe"` |
| `q19_location` | `q19Location` | String | `"New York, NY"` |

### CSV Export Implementation (NestJS)

```typescript
// apps/backend/src/modules/admin/admin.service.ts

async exportCSV(): Promise<string> {
  const responses = await this.prisma.surveyResponse.findMany({
    where: { status: 'SUBMITTED' },
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: 'asc' },
  });

  const csvRows = [];

  // Header row
  csvRows.push([
    'response_id',
    'submitted_at',
    'user_email',
    'q1_overall_rating',
    'q1_comment',
    // ... all 34 columns
  ].join(','));

  // Data rows
  for (const response of responses) {
    csvRows.push([
      response.id,
      response.createdAt.toISOString(),
      response.user.email,
      response.q1OverallRating ?? '',
      this.escapeCsv(response.q1Comment ?? ''),
      // ... map all fields
      response.q4ConnectionTypes.join(';'),  // Array to semicolon-separated
      JSON.stringify(response.q11SessionRankings ?? {}),  // JSON to string
      // ...
    ].join(','));
  }

  return csvRows.join('\n');
}

private escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
```

---

## Database Operations Examples

### Create Response (Survey Submission)

```typescript
const response = await prisma.surveyResponse.create({
  data: {
    userId: currentUser.id,
    status: 'SUBMITTED',
    q1OverallRating: 5,
    q1Comment: 'Great conference!',
    q4ConnectionTypes: ['colleagues', 'clients'],
    q11SessionRankings: {
      workshops: 1,
      presentations: 2,
      networking: 3,
      coworking: 4,
    },
    // ... all other fields
  },
});
```

### Get All Responses (Admin)

```typescript
const responses = await prisma.surveyResponse.findMany({
  where: { status: 'SUBMITTED' },
  include: {
    user: {
      select: {
        email: true,
        name: true,
      },
    },
  },
  orderBy: { createdAt: 'desc' },
});
```

### Get User's Own Responses

```typescript
const myResponses = await prisma.surveyResponse.findMany({
  where: { userId: currentUser.id },
});
```

### Statistics (Admin Dashboard)

```typescript
// Total submissions
const totalSubmissions = await prisma.surveyResponse.count({
  where: { status: 'SUBMITTED' },
});

// Average overall rating (Q1)
const avgRating = await prisma.surveyResponse.aggregate({
  _avg: { q1OverallRating: true },
  where: {
    status: 'SUBMITTED',
    q1OverallRating: { not: null },
  },
});

// Submissions by employment status (Q18)
const byEmployment = await prisma.surveyResponse.groupBy({
  by: ['q18EmploymentStatus'],
  _count: true,
  where: { status: 'SUBMITTED' },
});
```

---

## Environment Variables

### Database Connection

**.env**:
```bash
# Local development
DATABASE_URL="postgresql://postgres:password@localhost:5432/nam_survey?schema=public"

# Docker Compose
DATABASE_URL="postgresql://postgres:password@postgres:5432/nam_survey?schema=public"

# Production (example: GCP Cloud SQL)
DATABASE_URL="postgresql://user:password@/nam_survey?host=/cloudsql/project:region:instance"
```

---

## Backup & Recovery

### Local Development

**Manual Backup**:
```bash
pg_dump -U postgres -d nam_survey > backup.sql
```

**Restore**:
```bash
psql -U postgres -d nam_survey < backup.sql
```

### Production (Future)

**GCP Cloud SQL**:
- Automatic daily backups (7-day retention)
- Point-in-time recovery
- Managed by cloud provider

---

## Performance Considerations

### Connection Pooling

**Prisma Default**:
- Connection limit: Calculated automatically (num_cpus * 2 + 1)
- For local dev: ~10 connections sufficient

**Custom Configuration**:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Add to connection string: ?connection_limit=10
}
```

### Query Optimization

**Avoid N+1 Queries**:
```typescript
// ❌ Bad: N+1 query
const responses = await prisma.surveyResponse.findMany();
for (const response of responses) {
  const user = await prisma.user.findUnique({ where: { id: response.userId } });
}

// ✅ Good: Single query with include
const responses = await prisma.surveyResponse.findMany({
  include: { user: true },
});
```

---

## Testing Strategy

### Unit Tests (Prisma Mocking)

```typescript
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

let prisma: DeepMockProxy<PrismaClient>;

beforeEach(() => {
  prisma = mockDeep<PrismaClient>();
});

test('creates survey response', async () => {
  const mockResponse = {
    id: 'abc-123',
    userId: 'user-1',
    q1OverallRating: 5,
    // ...
  };

  prisma.surveyResponse.create.mockResolvedValue(mockResponse);

  const result = await service.createResponse(data);
  expect(result.id).toBe('abc-123');
});
```

### Integration Tests (Test Database)

```bash
# Create test database
createdb nam_survey_test

# Run migrations
DATABASE_URL="postgresql://localhost:5432/nam_survey_test" npx prisma migrate deploy

# Run tests
DATABASE_URL="postgresql://localhost:5432/nam_survey_test" npm test
```

---

## Future Enhancements

### Phase 2
- Save draft functionality (use `status: 'DRAFT'`)
- Soft deletes (add `deletedAt` timestamp)
- Response history (add `version` tracking)

### Phase 3
- Multi-survey support (add `surveyId` foreign key)
- Question template system (separate `Survey` and `Question` tables)
- Analytics aggregation tables (materialized views)

---

**Schema Owner**: Backend Team
**Last Updated**: 2025-11-18
