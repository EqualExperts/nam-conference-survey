# Admin Dashboard Recent Responses Endpoint

This endpoint provides a list of the 5 most recent survey responses for the admin dashboard overview page. The endpoint enables conference organizers to see recent submission activity with basic metadata (ID, timestamp) and enables navigation to individual response details.

## Requirements

- Expose a GET endpoint at `/api/admin/recent-responses` that returns the 5 most recent survey submissions
- Return responses ordered by submission time (most recent first)
- Include response ID, submission timestamp for each response
- Only return submitted responses (status = SUBMITTED), not drafts
- Endpoint must handle empty database state (return empty array)
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

// Individual response item in the list
interface RecentResponseItem {
  id: string;           // UUID of the survey response
  submittedAt: Date;    // Timestamp when response was created/submitted (from createdAt)
}

// Response DTO for recent responses endpoint
interface AdminRecentResponsesResponse {
  responses: RecentResponseItem[];  // Array of 0-5 most recent responses
}
```

## Extra Considerations

- Query: Use database query with LIMIT 5 and ORDER BY createdAt DESC
- The endpoint should be under the existing `/admin` module/controller
- Only fetch the minimal fields needed (id, createdAt) - do not fetch all 19 question fields
- No authentication/authorization is needed
- The Prisma schema already has `SurveyResponse` model with `createdAt` field indexed
- Use `createdAt` as the submission timestamp (since `updatedAt` reflects last modification)
- The `createdAt` field is already indexed for performance
- Empty array response when no submitted responses exist (not an error condition)

## Testing Considerations

- Unit test the service method to verify correct Prisma query logic
- Unit test should mock PrismaService and verify:
  - Query filters by status = SUBMITTED
  - Query orders by createdAt DESC
  - Query limits to 5 results
  - Query selects only id and createdAt fields
- E2E test should verify the endpoint returns correct structure
- E2E test should follow the same pattern as the metrics endpoint and **DON'T USE SUPERTEST**
- Test scenarios:
  - Empty database (empty array)
  - Fewer than 5 responses (return all)
  - Exactly 5 responses
  - More than 5 responses (return only 5 most recent)
  - Mix of DRAFT and SUBMITTED (only SUBMITTED returned)
  - Responses ordered correctly (newest first)
- Verify response time meets <2 second requirement with seeded data (500+ responses)

## Implementation Notes

- Add new method to existing `AdminService` in `apps/backend/src/modules/admin/`
- Add new endpoint to existing `AdminController` with `@Get('recent-responses')`
- Inject `PrismaService` into `AdminService` (already done for metrics endpoint)
- Use DTO classes with class-validator decorators for response validation
- Follow NestJS module organization patterns (co-locate DTOs with existing admin DTOs)
- Use ConfigModule for any environment-specific configuration
- No direct `process.env` access
- Use Prisma's `select` to fetch only needed fields (id, createdAt) for performance
- Return ISO 8601 formatted timestamps (Date objects serialize to ISO 8601 in JSON)

## Specification by Example

**Request:**
```http
GET /api/admin/recent-responses HTTP/1.1
Host: localhost:3001
```

**Response (with data):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "responses": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440047",
      "submittedAt": "2025-12-03T14:34:22.123Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440046",
      "submittedAt": "2025-12-03T13:12:45.456Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440045",
      "submittedAt": "2025-12-02T16:45:33.789Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440044",
      "submittedAt": "2025-12-02T15:21:18.234Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440043",
      "submittedAt": "2025-12-02T14:15:02.567Z"
    }
  ]
}
```

**Response (empty state):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "responses": []
}
```

**Response (fewer than 5):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "responses": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "submittedAt": "2025-12-03T14:34:22.123Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "submittedAt": "2025-12-03T13:12:45.456Z"
    }
  ]
}
```

**Prisma Query Pattern:**
```typescript
// Fetch 5 most recent submitted responses
const responses = await prisma.surveyResponse.findMany({
  where: { status: 'SUBMITTED' },
  orderBy: { createdAt: 'desc' },
  take: 5,
  select: {
    id: true,
    createdAt: true,
  },
});

// Map to DTO format (rename createdAt to submittedAt)
const items = responses.map(r => ({
  id: r.id,
  submittedAt: r.createdAt,
}));

return { responses: items };
```

## Verification

- [ ] Endpoint accessible at `/api/admin/recent-responses`
- [ ] Returns correct JSON structure with `responses` array
- [ ] Each response item has `id` (string UUID) and `submittedAt` (ISO 8601 timestamp)
- [ ] Returns only SUBMITTED responses (filters out DRAFT)
- [ ] Returns maximum of 5 responses
- [ ] Responses ordered by submission time (newest first)
- [ ] Returns empty array `{ responses: [] }` when database is empty
- [ ] Returns all responses when fewer than 5 exist
- [ ] Response time is under 2 seconds with 500+ responses in database
- [ ] Query uses `select` to fetch only id and createdAt (not all 19 question fields)
- [ ] Unit tests pass with >80% coverage
- [ ] E2E tests pass for all scenarios (empty, <5, =5, >5, mixed status)
- [ ] DTOs use class-validator decorators
- [ ] Service uses dependency injection for PrismaService
- [ ] No direct process.env usage
- [ ] Uses Status enum value 'SUBMITTED' from Prisma schema
- [ ] Timestamps returned in ISO 8601 format
