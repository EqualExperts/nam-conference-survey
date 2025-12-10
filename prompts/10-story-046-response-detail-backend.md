# Response Detail API Endpoint

**Story Reference**: STORY-046 (iterations/2025-12-02-admin-page/stories/story-046-response-detail-modal.md)

The admin overview page displays recent survey responses in a table view, but only shows basic information (ID and timestamp). This backend feature adds a public API endpoint that retrieves the complete details of a single response, including all 19 questions and their answers, to power the response detail modal on the frontend.

**Note**: Following the existing pattern, this endpoint will be public like other admin endpoints (`/api/admin/metrics`, `/api/admin/recent-responses`). Authentication is currently handled frontend-only via React Context.

## Requirements

- Create a public GET endpoint at `/api/admin/responses/:id` that returns complete response details
- Return all 19 survey questions with their corresponding answer values
- Include response metadata: ID, submission timestamp, IP address (if stored)
- Return 404 if response ID does not exist
- Response time must be under 500ms for typical responses
- Handle both answered and unanswered questions (null values)
- Format response data consistently for each question type:
  - Likert scale: return numeric value (1-5)
  - Multi-select: return array of selected option strings
  - Ranking: return ordered array of ranked items
  - Open-ended: return text string (preserve line breaks)

## Rules

- rules/nestjs-rules.md
- rules/typescript-rules.md
- rules/domain-driven-design.md
- rules/clean-code.md

## Domain

```typescript
// Response entity (already exists in Prisma schema)
interface SurveyResponse {
  id: number;
  userId: number;
  ipAddress: string;
  createdAt: Date;

  // 19 question fields (existing schema)
  overallSatisfaction: number | null;
  sessionQuality: number | null;
  venueRating: number | null;
  // ... (16 more question fields)
}

// API response DTO
interface ResponseDetailDto {
  id: number;
  submittedAt: string; // ISO 8601 formatted
  questions: QuestionAnswer[];
}

interface QuestionAnswer {
  questionNumber: number;
  questionText: string;
  questionType: 'likert' | 'multi-select' | 'ranking' | 'open-ended';
  answer: LikertAnswer | MultiSelectAnswer | RankingAnswer | OpenEndedAnswer | null;
}

interface LikertAnswer {
  value: number; // 1-5
  label: string; // "Very Dissatisfied" | "Dissatisfied" | "Neutral" | "Satisfied" | "Very Satisfied"
}

interface MultiSelectAnswer {
  selectedOptions: string[];
}

interface RankingAnswer {
  rankedItems: string[]; // Ordered array
}

interface OpenEndedAnswer {
  text: string;
}
```

## Extra Considerations

- **Consistency with existing admin endpoints**: Follow the same pattern as `/api/admin/metrics` and `/api/admin/recent-responses` (public, no auth guards)
- **Question mapping**: Survey response columns need to be mapped to user-friendly question text and types
- **Data privacy**: Consider whether to include IP addresses in response (may be sensitive)
- **Null handling**: All questions are optional, so expect many null values
- **Database query optimization**: Use Prisma's `findUnique` for single record lookup
- **Error handling**: Proper HTTP status codes (404 for not found, 500 for server errors)
- **Response structure**: Frontend expects questions in display order (Q1-Q19)
- **Star rating labels**: Likert questions (Q1, Q2, Q3, Q8, Q9, Q10, Q11, Q12) should include human-readable labels

## Testing Considerations

- **Unit tests**: Test the response service method that transforms database records to DTOs
- **Integration tests**: Test the complete endpoint flow
- **Test scenarios**:
  - Fetch response with all questions answered
  - Fetch response with some questions unanswered (null values)
  - Fetch response that doesn't exist (404)
  - Verify response contains all 19 questions in correct order
  - Verify each question type returns expected data structure

## Implementation Notes

- **Module structure**: Add to existing `admin` module (AdminController and AdminService from STORY-045)
- **DTO validation**: Use class-validator decorators for request validation (if params needed)
- **Prisma integration**: Inject PrismaService to query SurveyResponse model
- **Question metadata**: Consider creating a separate constants file for question text, types, and labels
- **Response transformation**: Create a dedicated mapper/service method to convert database model to API DTO
- **Consistent with existing patterns**: Follow the same public endpoint pattern as other admin endpoints (no auth guards)
- **TypeScript strict mode**: Ensure null checking for optional question fields

## Specification by Example

### Example API Request

```http
GET /api/admin/responses/42 HTTP/1.1
Host: localhost:3001
Content-Type: application/json
```

### Example API Response (Success)

```json
{
  "id": 42,
  "submittedAt": "2025-12-02T14:34:22.000Z",
  "questions": [
    {
      "questionNumber": 1,
      "questionText": "Overall Satisfaction",
      "questionType": "likert",
      "answer": {
        "value": 4,
        "label": "Satisfied"
      }
    },
    {
      "questionNumber": 2,
      "questionText": "Session Quality",
      "questionType": "likert",
      "answer": {
        "value": 5,
        "label": "Very Satisfied"
      }
    },
    {
      "questionNumber": 3,
      "questionText": "Topics of Interest",
      "questionType": "multi-select",
      "answer": {
        "selectedOptions": ["AI/ML", "Cloud Architecture", "DevOps Practices"]
      }
    },
    {
      "questionNumber": 4,
      "questionText": "Session Ranking",
      "questionType": "ranking",
      "answer": {
        "rankedItems": ["Keynote", "Workshop A", "Panel Discussion"]
      }
    },
    {
      "questionNumber": 5,
      "questionText": "Additional Comments",
      "questionType": "open-ended",
      "answer": {
        "text": "Great conference! Would love more hands-on\nworkshops next year."
      }
    },
    {
      "questionNumber": 6,
      "questionText": "Venue Rating",
      "questionType": "likert",
      "answer": null
    }
    // ... questions 7-19
  ]
}
```

### Example API Response (Not Found)

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "statusCode": 404,
  "message": "Response with ID 999 not found",
  "error": "Not Found"
}
```

### Gherkin Scenarios

```gherkin
Feature: Response Detail API Endpoint

Scenario: Fetch complete response details
  Given a response with ID 42 exists in the database
  When a client requests GET /api/admin/responses/42
  Then the response status is 200 OK
  And the response body contains all 19 questions with their answers
  And answered questions show their values
  And unanswered questions show null answers

Scenario: Fetch non-existent response
  When a client requests GET /api/admin/responses/999
  And no response with ID 999 exists
  Then the response status is 404 Not Found
  And the error message indicates the response was not found
```

## Verification

- [ ] GET /api/admin/responses/:id endpoint created and accessible as a public endpoint
- [ ] Returns 404 for non-existent response IDs
- [ ] Returns all 19 questions in correct order (Q1-Q19)
- [ ] Likert questions include both numeric value and label
- [ ] Multi-select questions return array of selected options
- [ ] Ranking questions return ordered array
- [ ] Open-ended questions preserve line breaks in text
- [ ] Unanswered questions return null for answer field
- [ ] Response time is under 500ms for typical responses
- [ ] Unit tests cover DTO transformation logic
- [ ] Integration tests cover successful response fetch
- [ ] Integration tests cover 404 scenario
- [ ] Endpoint follows same pattern as existing admin endpoints (no auth guards)
