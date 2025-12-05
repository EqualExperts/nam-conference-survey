# Anonymous Survey Submission Backend

This feature implements the backend API and data layer for anonymous conference survey submissions. It enables attendees to submit feedback without authentication while providing rate-limited protection against spam. All submissions are stored under an anonymous user account (`anonymous@survey.local`) with comprehensive validation and persistence.

## Requirements

- Anonymous survey endpoint accepts POST requests without authentication
- All 19 survey questions stored in database with proper field mapping
- Zero mandatory fields - all questions are optional (can submit with any subset of answers)
- No submission stored if zero fields filled in
- Proper validation for all question types (Likert 1-5, N/A options, multi-select arrays, ranking JSON, text fields)
- Anonymous user (`anonymous@survey.local`) created if doesn't exist
- Response status automatically set to `SUBMITTED`
- Return response ID and metadata upon successful submission
- Comprehensive error handling with clear validation messages
- Database indexes on userId, status, and createdAt for performance

## Rules

- rules/nestjs-rules.md
- rules/typescript-rules.md
- rules/clean-code.md
- rules/domain-driven-design.md

## Domain

```typescript
// Core domain entities from knowledge/database-schema.md

enum Role {
  ADMIN = 'ADMIN',
  PARTICIPANT = 'PARTICIPANT'
}

enum Status {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED'
}

interface User {
  id: string;              // UUID
  email: string;           // For anonymous: 'anonymous@survey.local'
  name?: string;
  role: Role;              // PARTICIPANT for anonymous
  createdAt: Date;
  lastLoginAt: Date;
  responses: SurveyResponse[];
}

interface SurveyResponse {
  id: string;              // UUID
  userId: string;
  user: User;
  status: Status;          // Default: SUBMITTED
  
  // Likert scale questions (1-5 or null)
  q1OverallRating?: number;
  q1Comment?: string;
  q2ReturnIntent?: number;
  q2Comment?: string;
  
  // Likert with N/A (string: '1'-'5', 'NA', or null)
  q3CoworkingEffectiveness?: string;
  q3Comment?: string;
  
  // Multiple select (string arrays)
  q4ConnectionTypes: string[];     // e.g., ['colleagues', 'clients']
  q4ConnectionOther?: string;
  
  // Additional Likert questions
  q5ConnectionDepth?: number;
  q5Comment?: string;
  q6LearningValue?: number;
  q6Comment?: string;
  
  // Open-ended text
  q7FutureTopics?: string;
  
  // Likert with N/A
  q8SaturdayWorth?: string;
  q8Comment?: string;
  
  // Standard Likert
  q9PreConferenceCommunication?: number;
  
  // Likert with N/A
  q10AccommodationsVenue?: string;
  
  // Ranking question (JSON object)
  q11SessionRankings?: Record<string, number>;  // e.g., {"workshops": 1, "presentations": 2}
  
  // Single choice questions
  q12ConferenceLength?: string;    // 'too_short' | 'just_right' | 'too_long'
  
  // Likert with N/A
  q13ComparisonToPD?: string;
  
  // Open-ended questions
  q14LikedMost?: string;
  q15AdditionalFeedback?: string;
  
  // Single choice with optional comment
  q16Improvements?: string;
  q16Comment?: string;
  
  // Multiple select
  q17FeedbackConfidence: string[];
  
  // Demographics
  q18EmploymentStatus?: string;    // 'employee' | 'contractor' | 'client' | 'other'
  q19Name?: string;
  q19Location?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// DTOs for survey submission
interface CreateSurveyResponseDto {
  // All fields from SurveyResponse except id, userId, user, status, createdAt, updatedAt
  // All fields optional except arrays which default to []
}

interface SurveyResponseDto {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
  message: string;
}
```

## Extra Considerations

- **Anonymous User Management**: Create anonymous user on first submission if not exists
- **Validation Strategy**: Use class-validator decorators in DTOs for all field types
- **Prisma Schema Alignment**: Ensure field names match exactly with [`knowledge/database-schema.md`](../knowledge/database-schema.md)
- **Array Defaults**: Empty arrays for `q4ConnectionTypes` and `q17FeedbackConfidence` if not provided
- **Null vs Undefined**: Treat both as skipped questions - store as null in database
- **String vs Integer Likert**: Questions with N/A option use string type ('1'-'5', 'NA'), others use integer
- **JSON Validation**: Validate ranking structure for [`q11SessionRankings`](../knowledge/database-schema.md)
- **Transaction Safety**: Use Prisma transactions if creating anonymous user during submission
- **Error Response Format**: Follow format specified in [`knowledge/api-spec.md`](../knowledge/api-spec.md)

## Testing Considerations

- **Unit Tests**: DTO validation for all question types, service methods for anonymous user creation
- **Integration Tests**: Test the boundary of the PrismaService against an actual database
- **Acceptance Tests**: Validate the end to end submission process of the user
- **Validation Tests**: Test boundaries (Likert 1-5, invalid N/A values, malformed ranking JSON)
- **Partial Submission Tests**: Submit with only Q1, only multiple questions, empty submission
- **Error Scenarios**: Invalid field types, out-of-range values, missing arrays

## Implementation Notes

- **Module Structure**: Create dedicated `survey` module with controller, service, DTOs
- **Prisma Service**: Inject PrismaService for database operations
- **DTO Validation**: Use `class-validator` with custom validators for Likert scales, N/A options
- **Rate Limiting**: Apply `@Throttle()` decorator with custom IP-based configuration
- **Anonymous User**: Implement helper method `getOrCreateAnonymousUser()` in service
- **Error Handling**: Use NestJS exception filters for consistent error responses
- **Logging**: Log submission attempts with IP, timestamp, and partial response data (no PII)
- **Response Mapping**: Return minimal response data (id, userId, status, createdAt, message)
- **Database Transactions**: Use Prisma transactions for user creation + response creation
- **Field Mapping**: Map camelCase DTO fields to snake_case Prisma schema fields

## Specification by Example

### Example 1: Complete Survey Submission

**Request**:
```http
POST /api/survey/submit
Content-Type: application/json

{
  "q1OverallRating": 5,
  "q1Comment": "Excellent conference!",
  "q2ReturnIntent": 5,
  "q3CoworkingEffectiveness": "4",
  "q4ConnectionTypes": ["colleagues", "clients", "prospects"],
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
  "q14LikedMost": "The networking sessions were fantastic",
  "q15AdditionalFeedback": "Keep up the great work!",
  "q16Improvements": "better_than_last",
  "q17FeedbackConfidence": ["transparency", "acknowledgment"],
  "q18EmploymentStatus": "employee",
  "q19Name": "John Doe",
  "q19Location": "New York, NY"
}
```

**Response (201 Created)**:
```json
{
  "id": "abc-123-def-456",
  "userId": "anonymous-user-uuid",
  "status": "submitted",
  "createdAt": "2025-11-18T14:35:00.000Z",
  "message": "Survey submitted successfully"
}
```

### Example 2: Partial Submission (Zero Mandatory Fields)

**Request**:
```http
POST /api/survey/submit
Content-Type: application/json

{
  "q1OverallRating": 5
}
```

**Response (201 Created)**:
```json
{
  "id": "ghi-789-jkl-012",
  "userId": "anonymous-user-uuid",
  "status": "submitted",
  "createdAt": "2025-11-18T14:40:00.000Z",
  "message": "Survey submitted successfully"
}
```

### Example 3: Validation Error

**Request**:
```http
POST /api/survey/submit
Content-Type: application/json

{
  "q1OverallRating": 10
}
```

**Response (400 Bad Request)**:
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

### Example 4: Rate Limit Exceeded

**Response (429 Too Many Requests)**:
```json
{
  "statusCode": 429,
  "message": "Too Many Requests",
  "retryAfter": 3600,
  "timestamp": "2025-11-18T15:05:00.000Z"
}
```

## Verification

- [ ] Anonymous user creation works correctly (email: `anonymous@survey.local`, role: PARTICIPANT)
- [ ] Survey endpoint accepts requests without authentication
- [ ] All 19 questions can be submitted with proper field types
- [ ] Zero mandatory fields - can submit with any subset of questions
- [ ] Likert scale validation (1-5) works for integer fields
- [ ] Likert with N/A validation ('1'-'5', 'NA') works for string fields
- [ ] Multi-select arrays stored correctly for Q4 and Q17
- [ ] Ranking JSON validated and stored for Q11
- [ ] Text fields accept any length content
- [ ] Response status set to SUBMITTED automatically
- [ ] Response ID (UUID) returned on success
- [ ] Validation errors return clear field-level messages
- [ ] Database indexes created on userId, status, createdAt
- [ ] Submission completes in <500ms (P95)
- [ ] Integration tests cover complete, partial, and empty submissions
- [ ] Error responses follow API spec format from [`knowledge/api-spec.md`](../knowledge/api-spec.md)