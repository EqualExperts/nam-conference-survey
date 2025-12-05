# Admin Dashboard Metrics Endpoint

This endpoint provides aggregate metrics for the admin dashboard overview page, specifically the count of completed and in-progress survey responses. The endpoint enables conference organizers to quickly assess survey participation without requiring direct database access.

## Requirements

- Expose a GET endpoint at `/api/admin/metrics` that returns response counts
- Return the count of completed survey responses (fully submitted)
- Return the count of in-progress survey responses (partial submissions, if tracked)
- Endpoint must handle empty database state (return zeros)
- Use appropriate HTTP status codes (200 for success)

## Rules

- rules/nestjs-rules.md
- rules/typescript-rules.md
- rules/domain-driven-design.md

## Domain

```typescript
// Status enum from Prisma schema (already exists in apps/backend/prisma/schema.prisma)
enum Status {
  DRAFT      // Survey response in progress, not yet submitted
  SUBMITTED  // Survey response completed and submitted
}

// Response DTO for metrics endpoint
interface AdminMetricsResponse {
  completed: number;   // Count of responses with status = SUBMITTED
  inProgress: number;  // Count of responses with status = DRAFT
}
```

## Extra Considerations

- Performance: Use database aggregation (COUNT) rather than fetching all records
- The endpoint should be under an `/admin` module/controller prefix
- Consider if authentication/authorization is needed (story doesn't specify, but this is admin data)
- The Prisma schema already has `SurveyResponse` model with `status` field (Status enum)
- The Status enum is already defined in the Prisma schema with DRAFT and SUBMITTED values
- A response is "completed" when `status = SUBMITTED`
- A response is "in-progress" when `status = DRAFT`
- The status field is indexed for performance (see `@@index([status])` in schema)

## Testing Considerations

- Unit test the service method to verify correct Prisma query logic
- Unit test should mock PrismaService and verify COUNT queries
- E2E test should verify the endpoint returns correct structure
- Test scenarios:
  - Empty database (0 completed, 0 in-progress)
  - Only completed responses
  - Only in-progress responses
  - Mix of both
- Verify response time meets <2 second requirement with seeded data

## Implementation Notes

- Create a new `AdminModule` in `apps/backend/src/modules/admin/`
- Create `AdminController` with `@Get('metrics')` endpoint
- Create `AdminService` with method to fetch metrics from database
- Inject `PrismaService` into `AdminService`
- Use DTO classes with class-validator decorators for response validation
- Follow NestJS module organization patterns (co-locate controller, service, DTOs)
- Use ConfigModule for any environment-specific configuration
- No direct `process.env` access

## Specification by Example

**Request:**
```http
GET /api/admin/metrics HTTP/1.1
Host: localhost:3001
```

**Response (with data):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "completed": 47,
  "inProgress": 3
}
```

**Response (empty state):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "completed": 0,
  "inProgress": 0
}
```

**Prisma Query Pattern:**
```typescript
// Count completed responses (status = SUBMITTED)
const completed = await prisma.surveyResponse.count({
  where: { status: 'SUBMITTED' }
});

// Count in-progress responses (status = DRAFT)
const inProgress = await prisma.surveyResponse.count({
  where: { status: 'DRAFT' }
});
```

## Verification

- [ ] Endpoint accessible at `/api/admin/metrics`
- [ ] Returns correct JSON structure with `completed` and `inProgress` fields
- [ ] Completed count matches `SurveyResponse.count({ where: { status: 'SUBMITTED' } })`
- [ ] In-progress count matches `SurveyResponse.count({ where: { status: 'DRAFT' } })`
- [ ] Returns `{ completed: 0, inProgress: 0 }` when database is empty
- [ ] Response time is under 2 seconds with 500+ responses in database
- [ ] Unit tests pass with >80% coverage
- [ ] E2E tests pass for all scenarios
- [ ] DTOs use class-validator decorators
- [ ] Service uses dependency injection for PrismaService
- [ ] No direct process.env usage
- [ ] Uses Status enum values ('DRAFT', 'SUBMITTED') from Prisma schema
