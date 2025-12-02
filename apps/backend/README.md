# NAM Conference Survey - Backend API

Anonymous survey submission backend built with NestJS, Prisma, and PostgreSQL.

## Features

- ✅ Anonymous survey submission (no authentication required)
- ✅ All 19 survey questions with comprehensive validation
- ✅ Zero mandatory fields - submit any subset of questions
- ✅ Rate limiting to prevent spam (10 submissions per hour per IP)
- ✅ Automatic anonymous user creation
- ✅ Transaction-safe database operations
- ✅ Comprehensive error handling with detailed validation messages
- ✅ Full test coverage

## Tech Stack

- **Framework**: NestJS 10
- **Database**: PostgreSQL 15+ via Prisma ORM
- **Validation**: class-validator, class-transformer
- **Rate Limiting**: @nestjs/throttler
- **Testing**: Jest

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- pnpm (recommended) or npm

## Quick Start

### 1. Install Dependencies

```bash
cd apps/backend
pnpm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/nam_survey?schema=public"
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Set Up Database

```bash
# Generate Prisma Client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# Seed database (optional - creates sample data)
pnpm prisma:seed
```

### 4. Run Development Server

```bash
pnpm start:dev
```

Server runs at `http://localhost:3001/api`

## API Endpoints

### Survey Submission

**POST** `/api/survey/submit`

Submit anonymous survey response (no authentication required).

**Request Body**:
```json
{
  "q1OverallRating": 5,
  "q1Comment": "Excellent conference!",
  "q2ReturnIntent": 5,
  "q3CoworkingEffectiveness": "4",
  "q4ConnectionTypes": ["colleagues", "clients"],
  "q5ConnectionDepth": 4,
  "q6LearningValue": 5,
  "q7FutureTopics": "AI and machine learning",
  "q8SaturdayWorth": "5",
  "q9PreConferenceCommunication": 4,
  "q10AccommodationsVenue": "5",
  "q11SessionRankings": {
    "workshops": 1,
    "presentations": 2,
    "networking": 3,
    "coworking": 4
  },
  "q12ConferenceLength": "just_right",
  "q13ComparisonToPD": "4",
  "q14LikedMost": "The networking sessions",
  "q15AdditionalFeedback": "Great work!",
  "q16Improvements": "better_than_last",
  "q17FeedbackConfidence": ["transparency", "acknowledgment"],
  "q18EmploymentStatus": "employee",
  "q19Name": "John Doe",
  "q19Location": "New York, NY"
}
```

**Response** (201 Created):
```json
{
  "id": "abc-123-def-456",
  "userId": "anonymous-user-uuid",
  "status": "submitted",
  "createdAt": "2025-11-18T14:35:00.000Z",
  "message": "Survey submitted successfully"
}
```

**Validation Error** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "q1OverallRating",
      "message": "Must be between 1 and 5"
    }
  ],
  "timestamp": "2025-11-18T14:50:00.000Z",
  "path": "/api/survey/submit"
}
```

## Validation Rules

### Likert Scale Questions (1-5)
- `q1OverallRating`, `q2ReturnIntent`, `q5ConnectionDepth`, `q6LearningValue`, `q9PreConferenceCommunication`
- Type: Integer
- Range: 1-5 or null (optional)

### Likert with N/A Option
- `q3CoworkingEffectiveness`, `q8SaturdayWorth`, `q10AccommodationsVenue`, `q13ComparisonToPD`
- Type: String
- Values: '1', '2', '3', '4', '5', 'NA', or null

### Multiple Select
- `q4ConnectionTypes`, `q17FeedbackConfidence`
- Type: Array of strings
- Default: Empty array `[]`

### Ranking
- `q11SessionRankings`
- Type: JSON object
- Example: `{"workshops": 1, "presentations": 2}`

### Single Choice
- `q12ConferenceLength`: 'too_short' | 'just_right' | 'too_long'
- `q18EmploymentStatus`: 'employee' | 'contractor' | 'client' | 'other'

### Open-Ended Text
- `q7FutureTopics`, `q14LikedMost`, `q15AdditionalFeedback`
- `q1Comment`, `q2Comment`, `q3Comment`, `q5Comment`, `q6Comment`, `q8Comment`, `q16Comment`
- Type: String (unlimited length)

## Rate Limiting

- **Survey Submission**: 10 requests per hour per IP
- **Global**: 100 requests per minute per IP

Rate limit exceeded returns **429 Too Many Requests**:
```json
{
  "statusCode": 429,
  "message": "Too Many Requests",
  "retryAfter": 3600,
  "timestamp": "2025-11-18T15:05:00.000Z"
}
```

## Testing

### Run All Tests
```bash
pnpm test
```

### Run Tests with Coverage
```bash
pnpm test:cov
```

### Run E2E Tests
```bash
pnpm test:e2e
```

### Watch Mode
```bash
pnpm test:watch
```

## Database Management

### View Database in Prisma Studio
```bash
pnpm prisma:studio
```

### Create New Migration
```bash
pnpm prisma:migrate
```

### Reset Database (⚠️ Deletes all data)
```bash
npx prisma migrate reset
```

## Project Structure

```
apps/backend/
├── src/
│   ├── common/
│   │   └── filters/
│   │       └── http-exception.filter.ts  # Global error handling
│   ├── modules/
│   │   └── survey/
│   │       ├── dto/
│   │       │   ├── create-survey-response.dto.ts
│   │       │   └── survey-response.dto.ts
│   │       ├── survey.controller.ts
│   │       ├── survey.service.ts
│   │       ├── survey.module.ts
│   │       ├── survey.controller.spec.ts
│   │       └── survey.service.spec.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── test/                 # E2E tests
├── .env.example
├── package.json
└── tsconfig.json
```

## Development Scripts

```bash
# Start development server with hot reload
pnpm start:dev

# Build for production
pnpm build

# Start production server
pnpm start:prod

# Lint code
pnpm lint

# Format code
pnpm format
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `JWT_SECRET` | JWT secret (future admin auth) | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |

## Error Handling

All errors return a consistent format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error"
    }
  ],
  "timestamp": "2025-11-18T14:50:00.000Z",
  "path": "/api/survey/submit"
}
```

## Anonymous User

- Email: `anonymous@survey.local`
- Role: `PARTICIPANT`
- Auto-created on first survey submission
- All anonymous submissions linked to this user

## Performance

- P95 submission time: <500ms
- Database indexes on: `userId`, `status`, `createdAt`
- Connection pooling via Prisma

## Security

- Input validation on all fields
- Rate limiting to prevent spam
- SQL injection protection via Prisma
- XSS protection via validation
- CORS configured for frontend only

## License

Proprietary - Equal Experts