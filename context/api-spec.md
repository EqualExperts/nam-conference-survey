# NAM Conference Survey - API Specification

**Version**: 2.0
**Last Updated**: 2025-11-19
**Base URL**: `http://localhost:3001/api`
**API Style**: RESTful JSON
**Auth**: Anonymous Survey + Password-Based Admin

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Error Handling](#error-handling)
4. [Endpoints](#endpoints)
   - [Authentication](#authentication-endpoints)
   - [Survey](#survey-endpoints)
   - [Admin](#admin-endpoints)
   - [Users](#user-endpoints)
5. [Request/Response Examples](#requestresponse-examples)
6. [Rate Limiting](#rate-limiting)

---

## Overview

### API Principles
- **REST-based**: Resource-oriented URLs
- **JSON**: All requests and responses use `Content-Type: application/json`
- **HTTP methods**: GET (read), POST (create), PATCH (update), DELETE (remove)
- **Status codes**: Standard HTTP status codes
- **Versioning**: URL-based (`/api/v1/` for future versions)
- **Authentication**:
  - Survey endpoints: **No authentication required** (anonymous)
  - Admin endpoints: JWT Bearer tokens in `Authorization` header

### Base URL
```
Local Development: http://localhost:3001/api
Production (future): https://survey.equalexperts.com/api
```

---

## Authentication

### Strategy: Anonymous Survey + Password-Based Admin

**For Survey Participants**:
- **No authentication required** - survey endpoint is fully public
- All submissions stored under anonymous user (`anonymous@survey.local`)
- Rate-limited: 10 submissions per hour per IP address

**For Admins**:
1. Admin visits `/admin/login` page
2. Submits password via `POST /api/auth/admin/login`
3. Backend verifies password against `ADMIN_PASSWORD` environment variable
4. Backend generates JWT token
5. Frontend stores token in `localStorage` as `admin_token`
6. All subsequent admin requests include `Authorization: Bearer {token}`

### JWT Token Structure (Admin Only)

```json
{
  "userId": "0ec06d7f-72b7-4da5-a99b-d63e59999e08",
  "email": "admin@equalexperts.com",
  "role": "ADMIN",
  "iat": 1700000000,
  "exp": 1700604800
}
```

**Expiry**: 7 days (604800 seconds)

### Protected Routes

Only **admin endpoints** (`/admin/*`) require JWT token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Access Control

- **Anonymous** (no auth): Submit survey - `POST /survey/submit`
- **Admin** (JWT required): View responses, export CSV, view statistics

---

## Error Handling

### Error Response Format

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
  "timestamp": "2025-11-18T14:30:00.000Z",
  "path": "/api/survey/submit"
}
```

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation error, malformed request |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |

---

## Endpoints

### Authentication Endpoints

#### `POST /api/auth/admin/login`
Admin password-based login.

**Auth**: None (public endpoint)
**Role**: None

**Request**:
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "password": "admin123"
}
```

**Response (Success)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error)**:
```json
{
  "statusCode": 401,
  "message": "Invalid password",
  "timestamp": "2025-11-19T15:00:00.000Z"
}
```

**Process**:
1. Verify password against `ADMIN_PASSWORD` environment variable
2. Find admin user in database (`admin@equalexperts.com`)
3. Update last login timestamp
4. Generate JWT token with admin role
5. Return token

**Rate Limiting**: 5 attempts per minute per IP

---

#### `POST /api/auth/logout`
Logout admin user (client-side token deletion).

**Auth**: Required
**Role**: Admin

**Request**:
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response**:
```json
{
  "message": "Logged out successfully"
}
```

**Status**: 200 OK

**Note**: For MVP, token is simply deleted from `localStorage`. Future: implement token blacklist.

---

#### `GET /api/auth/me`
Get current authenticated user info.

**Auth**: Required
**Role**: Any

**Request**:
```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://lh3.googleusercontent.com/...",
  "role": "participant",
  "createdAt": "2025-11-18T10:00:00.000Z",
  "lastLoginAt": "2025-11-18T14:30:00.000Z"
}
```

**Status**: 200 OK

**Errors**:
- 401: Invalid or expired token

---

### Survey Endpoints

#### `POST /api/survey/submit`
Submit completed survey (or partial response - zero mandatory fields).

**Auth**: None (Anonymous)
**Role**: None

**Request**:
```http
POST /api/survey/submit
Content-Type: application/json
```

**Body**:
```json
{
  "q1OverallRating": 5,
  "q1Comment": "Excellent conference!",
  "q2ReturnIntent": 5,
  "q3CoworkingEffectiveness": "4",
  "q3Comment": null,
  "q4ConnectionTypes": ["colleagues", "clients", "prospects"],
  "q4ConnectionOther": null,
  "q5ConnectionDepth": 4,
  "q6LearningValue": 5,
  "q6Comment": null,
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
  "q16Comment": null,
  "q17FeedbackConfidence": ["transparency", "acknowledgment"],
  "q18EmploymentStatus": "employee",
  "q19Name": "John Doe",
  "q19Location": "New York, NY"
}
```

**Response**:
```json
{
  "id": "abc-123-def-456",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "submitted",
  "createdAt": "2025-11-18T14:35:00.000Z",
  "message": "Survey submitted successfully"
}
```

**Status**: 201 Created

**Validation Rules**:
- All fields optional (zero mandatory)
- Likert scales (1-5): Integer between 1-5 or null
- Likert with N/A: String '1'-'5', 'NA', or null
- Multiple select: Array of strings
- Ranking: JSON object with valid keys
- Text fields: String or null

**Errors**:
- 400: Validation error (e.g., q1OverallRating = 6)
- 429: Rate limit exceeded (10 submissions per hour per IP)

---

#### `GET /api/survey/my-responses`
Get all survey responses for current user.

**Auth**: Required
**Role**: Participant

**Request**:
```http
GET /api/survey/my-responses
Authorization: Bearer {token}
```

**Response**:
```json
[
  {
    "id": "abc-123",
    "status": "submitted",
    "createdAt": "2025-11-18T14:35:00.000Z",
    "q1OverallRating": 5,
    "q2ReturnIntent": 5,
    // ... all fields
  }
]
```

**Status**: 200 OK

---

### Admin Endpoints

#### `GET /api/admin/responses`
Get all survey responses (admin only).

**Auth**: Required
**Role**: Admin

**Request**:
```http
GET /api/admin/responses?status=submitted&limit=50&offset=0
Authorization: Bearer {token}
```

**Query Parameters**:
- `status` (optional): Filter by status ('draft' | 'submitted')
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `sortBy` (optional): Sort field (default: 'createdAt')
- `order` (optional): Sort order ('asc' | 'desc', default: 'desc')

**Response**:
```json
{
  "data": [
    {
      "id": "abc-123",
      "user": {
        "id": "user-1",
        "email": "user@example.com",
        "name": "John Doe"
      },
      "status": "submitted",
      "createdAt": "2025-11-18T14:35:00.000Z",
      "q1OverallRating": 5,
      "q1Comment": "Great!",
      // ... all fields
    }
  ],
  "total": 38,
  "limit": 50,
  "offset": 0
}
```

**Status**: 200 OK

**Errors**:
- 401: Invalid token
- 403: User is not admin

---

#### `GET /api/admin/export`
Export all responses as CSV file.

**Auth**: Required
**Role**: Admin

**Request**:
```http
GET /api/admin/export?status=submitted
Authorization: Bearer {token}
```

**Query Parameters**:
- `status` (optional): Filter by status (default: 'submitted')

**Response Headers**:
```http
Content-Type: text/csv
Content-Disposition: attachment; filename="survey-responses-2025-11-18.csv"
```

**Response Body** (CSV):
```csv
response_id,submitted_at,user_email,q1_overall_rating,q1_comment,q2_return_intent,...
abc-123,2025-11-18 14:35:00,user@example.com,5,"Excellent conference!",5,...
def-456,2025-11-18 14:40:00,user2@example.com,4,"",4,...
```

**Status**: 200 OK

**CSV Format**:
- 34 columns (see database-schema.md for full mapping)
- Multi-select: Semicolon-separated (e.g., "colleagues;clients")
- Ranking: JSON string or separate columns
- Text with commas: Quoted
- Null values: Empty cells

**Errors**:
- 401: Invalid token
- 403: User is not admin

---

#### `GET /api/admin/stats`
Get survey statistics (total submissions, averages, etc.).

**Auth**: Required
**Role**: Admin

**Request**:
```http
GET /api/admin/stats
Authorization: Bearer {token}
```

**Response**:
```json
{
  "totalSubmissions": 38,
  "totalDrafts": 2,
  "averages": {
    "q1OverallRating": 4.5,
    "q2ReturnIntent": 4.7,
    "q5ConnectionDepth": 4.2,
    "q6LearningValue": 4.6
  },
  "demographics": {
    "byEmploymentStatus": {
      "employee": 25,
      "contractor": 10,
      "client": 3
    }
  },
  "completionRate": 95.0,
  "latestSubmission": "2025-11-18T16:00:00.000Z"
}
```

**Status**: 200 OK

**Errors**:
- 401: Invalid token
- 403: User is not admin

---

### User Endpoints

#### `GET /api/users`
Get all users (admin only).

**Auth**: Required
**Role**: Admin

**Request**:
```http
GET /api/users?role=participant&limit=50
Authorization: Bearer {token}
```

**Query Parameters**:
- `role` (optional): Filter by role ('admin' | 'participant')
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response**:
```json
{
  "data": [
    {
      "id": "user-1",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "participant",
      "createdAt": "2025-11-01T10:00:00.000Z",
      "lastLoginAt": "2025-11-18T14:00:00.000Z",
      "responseCount": 1
    }
  ],
  "total": 40,
  "limit": 50,
  "offset": 0
}
```

**Status**: 200 OK

---

#### `PATCH /api/users/:id/role`
Update user role (promote to admin or demote to participant).

**Auth**: Required
**Role**: Admin

**Request**:
```http
PATCH /api/users/user-123/role
Authorization: Bearer {token}
Content-Type: application/json
```

**Body**:
```json
{
  "role": "admin"
}
```

**Response**:
```json
{
  "id": "user-123",
  "email": "newadmin@example.com",
  "name": "New Admin",
  "role": "admin",
  "updatedAt": "2025-11-18T15:00:00.000Z"
}
```

**Status**: 200 OK

**Errors**:
- 400: Invalid role value
- 401: Invalid token
- 403: User is not admin
- 404: User not found

---

#### `GET /api/users/:id`
Get single user by ID (admin only).

**Auth**: Required
**Role**: Admin

**Request**:
```http
GET /api/users/user-123
Authorization: Bearer {token}
```

**Response**:
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://lh3.googleusercontent.com/...",
  "role": "participant",
  "createdAt": "2025-11-01T10:00:00.000Z",
  "lastLoginAt": "2025-11-18T14:00:00.000Z",
  "responses": [
    {
      "id": "response-1",
      "status": "submitted",
      "createdAt": "2025-11-18T14:35:00.000Z"
    }
  ]
}
```

**Status**: 200 OK

**Errors**:
- 401: Invalid token
- 403: User is not admin
- 404: User not found

---

## Request/Response Examples

### Complete Survey Submission

**Request**:
```bash
curl -X POST http://localhost:3001/api/survey/submit \
  -H "Content-Type: application/json" \
  -d '{
    "q1OverallRating": 5,
    "q2ReturnIntent": 5,
    "q3CoworkingEffectiveness": "4",
    "q4ConnectionTypes": ["colleagues", "clients"],
    "q5ConnectionDepth": 4,
    "q6LearningValue": 5,
    "q7FutureTopics": "AI and ML",
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
    "q14LikedMost": "Networking was great",
    "q15AdditionalFeedback": "Keep it up!",
    "q16Improvements": "better_than_last",
    "q17FeedbackConfidence": ["transparency"],
    "q18EmploymentStatus": "employee",
    "q19Name": "John Doe",
    "q19Location": "NYC"
  }'
```

**Response**:
```json
{
  "id": "abc-123-def-456",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "submitted",
  "createdAt": "2025-11-18T14:35:00.000Z",
  "message": "Survey submitted successfully"
}
```

---

### Partial Survey Submission (Zero Mandatory Fields)

**Request**:
```bash
curl -X POST http://localhost:3001/api/survey/submit \
  -H "Content-Type: application/json" \
  -d '{
    "q1OverallRating": 5
  }'
```

**Response**:
```json
{
  "id": "ghi-789",
  "userId": "user-456",
  "status": "submitted",
  "createdAt": "2025-11-18T14:40:00.000Z",
  "message": "Survey submitted successfully"
}
```

---

### Admin CSV Export

**Request**:
```bash
curl -X GET "http://localhost:3001/api/admin/export?status=submitted" \
  -H "Authorization: Bearer {admin-token}" \
  -o survey-responses.csv
```

**Response** (saved to `survey-responses.csv`):
```csv
response_id,submitted_at,user_email,q1_overall_rating,q1_comment,q2_return_intent,...
abc-123,2025-11-18 14:35:00,user1@example.com,5,"Excellent!",5,...
def-456,2025-11-18 14:40:00,user2@example.com,4,,4,...
```

---

### Validation Error Example

**Request**:
```bash
curl -X POST http://localhost:3001/api/survey/submit \
  -H "Content-Type: application/json" \
  -d '{
    "q1OverallRating": 10
  }'
```

**Response** (400 Bad Request):
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

---

### Unauthorized Error Example

**Request**:
```bash
curl -X GET http://localhost:3001/api/admin/responses
```

**Response** (401 Unauthorized):
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2025-11-18T14:55:00.000Z",
  "path": "/api/admin/responses"
}
```

---

### Forbidden Error Example

**Request** (Participant trying to access admin endpoint):
```bash
curl -X GET http://localhost:3001/api/admin/responses \
  -H "Authorization: Bearer {participant-token}"
```

**Response** (403 Forbidden):
```json
{
  "statusCode": 403,
  "message": "Forbidden: Admin role required",
  "timestamp": "2025-11-18T15:00:00.000Z",
  "path": "/api/admin/responses"
}
```

---

## Rate Limiting

### Strategy
- **Global Rate Limit**: 100 requests/minute per IP address
- **Auth Endpoints**: 10 requests/minute per IP (prevent brute force)
- **Survey Submission**: 5 submissions/hour per user (prevent spam)

### Implementation (NestJS Throttler)

```typescript
import { ThrottlerModule } from '@nestjs/throttler';

ThrottlerModule.forRoot({
  ttl: 60,      // Time to live (seconds)
  limit: 100,   // Max requests
});
```

### Rate Limit Response

**Response** (429 Too Many Requests):
```json
{
  "statusCode": 429,
  "message": "Too Many Requests",
  "retryAfter": 60,
  "timestamp": "2025-11-18T15:05:00.000Z"
}
```

**Headers**:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1700000000
Retry-After: 60
```

---

## CORS Configuration

### Allowed Origins
```typescript
// Development
cors: {
  origin: 'http://localhost:3000',
  credentials: true,
}

// Production (future)
cors: {
  origin: 'https://survey.equalexperts.com',
  credentials: true,
}
```

---

## API Testing

### Using Postman/Insomnia

**1. Login (Get Token)**:
- Manually visit: `http://localhost:3001/api/auth/google`
- Complete OAuth flow
- Copy JWT token from redirect URL

**2. Set Bearer Token**:
- Add header: `Authorization: Bearer {token}`

**3. Test Endpoints**:
- POST /api/survey/submit
- GET /api/admin/responses

### Using cURL

```bash
# Get token (manual OAuth flow)
# Then use in subsequent requests:

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:3001/api/survey/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @survey-data.json
```

---

## Future Enhancements

### Phase 2
- **WebSocket**: Real-time admin dashboard updates
- **Refresh Tokens**: Longer session management
- **API Versioning**: `/api/v2/` for breaking changes

### Phase 3
- **GraphQL**: Alternative to REST for flexible queries
- **Pagination Cursors**: More efficient than offset
- **Partial Updates**: PATCH with field-level updates

---

**API Spec Owner**: Backend Team
**Last Updated**: 2025-11-18
