# User Story: Database Schema and Response Data Storage

**Story ID**: 040
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-organizer, technical-foundation, data-storage

## User Story
As a Conference Organizer,
I want all survey responses reliably stored in a database with proper structure,
So that I can export complete data for analysis and ensure no feedback is lost.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**User Need**:
- Need 5 (Strategic planning need) - "When I plan future conferences, I want demographic-segmented data showing how different groups experienced the event"
- Need 6 (Accountability need) - "When I justify significant conference investment, I want measurable evidence across four dimensions"
**Supporting Evidence**:
- Conference Planner: "I love the raw data… it's more helpful for me to get all of it"; needs to "dice it the ways that I need to"
- Client Partner: "There's two ways I wanted… the raw excel of all the questions, all the answers, all the numbers"
- Managing Director: Needs systematic measurement framework across four dimensions (sentiment, logistics, learning, networking)

## Design Reference
Not applicable - backend/database implementation

**Related Screenshots**: None - this story supports all survey question screens (02-20) by storing their responses.

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Survey Response Stored Successfully**
- **Given** a Conference Attendee clicks "Next" on any question
- **When** the response is submitted to the backend
- **Then** the response is saved to the database with all required fields
- **And** a unique session ID associates the response with other responses from same attendee
- **And** the system returns a success confirmation
- **And** the response includes question ID, answer value(s), optional comment, and timestamp

**Scenario 2: Partial Survey Responses Saved**
- **Given** a Conference Attendee answers some questions and skips others
- **When** responses are saved throughout survey
- **Then** answered questions are stored with response values
- **And** skipped questions are stored as null or "no response"
- **And** session ID associates all responses (answered and skipped) to same attendee
- **And** data integrity maintained even if attendee abandons survey mid-way

**Scenario 3: Likert Scale Response Storage (Q1-Q10, Q12)**
- **Given** a Conference Attendee selects a Likert scale rating (1-5)
- **When** the response is saved
- **Then** the database stores the numeric rating value (1, 2, 3, 4, or 5)
- **And** the question ID is stored (e.g., "Q1", "Q2")
- **And** optional comment text is stored in separate field (if provided)
- **And** timestamp records when response was submitted

**Scenario 4: Multiple Select Response Storage (Q4, Q16, Q17)**
- **Given** a Conference Attendee selects multiple checkboxes
- **When** the response is saved
- **Then** all selected options are stored (as array or comma-separated values)
- **And** the question ID is stored
- **And** empty selection (no checkboxes selected) is stored as null or empty array
- **And** order of selections may or may not be preserved (confirm with organizers)

**Scenario 5: Choice Ranking Response Storage (Q11)**
- **Given** a Conference Attendee ranks session format preferences
- **When** the ranking is saved
- **Then** the ranked order is preserved in database (e.g., JSON array with ordered items)
- **And** the question ID ("Q11") is stored
- **And** partial rankings are accepted (attendee may not rank all options)
- **And** data structure supports export to CSV with ranking preserved

**Scenario 6: Open-Ended Text Response Storage (Q7, Q14, Q15)**
- **Given** a Conference Attendee provides free-form text answer
- **When** the response is saved
- **Then** full text content is stored without truncation
- **And** character encoding supports special characters, line breaks, and international characters (UTF-8)
- **And** the question ID is stored
- **And** empty text (no response) is stored as null or empty string

**Scenario 7: Demographic Data Storage (Q18, Q19)**
- **Given** a Conference Attendee selects role and years at company
- **When** responses are saved
- **Then** demographic values are stored in dedicated fields for segmentation
- **And** role field includes selected option (e.g., "Employee", "Active Associate", "Client")
- **And** years field includes selected range or "Prefer not to say"
- **And** N/A options are supported and stored distinctly from null (skipped)

**Scenario 8: Session Tracking for Response Association**
- **Given** a Conference Attendee starts the survey
- **When** the first response is saved
- **Then** a unique session ID is generated and assigned
- **And** all subsequent responses from same attendee use the same session ID
- **And** session ID enables grouping all 19 responses together for export
- **And** session ID is not personally identifiable (random UUID or similar)

**Scenario 9: Concurrent Response Handling**
- **Given** 40 Conference Attendees are completing surveys simultaneously during break
- **When** responses are being saved concurrently
- **Then** all responses are saved without data corruption or loss
- **And** database handles concurrent write operations safely (transactions or appropriate locking)
- **And** no responses are lost due to race conditions
- **And** response time remains < 500ms per save even under load

**Scenario 10: Optional Comment Storage Across Questions**
- **Given** a Conference Attendee provides optional comments on multiple questions
- **When** comments are saved
- **Then** each comment is associated with its corresponding question ID
- **And** comments are stored in text field supporting unlimited length (within reasonable limits like 5000 chars)
- **And** comments maintain association with main response (same session ID)

**Scenario 11: Data Integrity on Survey Abandonment**
- **Given** a Conference Attendee abandons survey after answering 5 of 19 questions
- **When** checking the database
- **Then** the 5 answered questions are stored with full data
- **And** the remaining 14 questions show no response (null) for that session ID
- **And** partial data is still useful for organizers (shows abandonment point)
- **And** session is marked as "incomplete" if not all questions answered

**Scenario 12: Timestamp Tracking**
- **Given** a Conference Attendee progresses through survey
- **When** each response is saved
- **Then** timestamp is recorded for each response
- **And** survey start time is captured (first response)
- **And** survey completion time is captured (after Q19)
- **And** timestamps enable calculation of completion duration for analysis

### Non-Functional Requirements
- [ ] Performance: Response save operation completes in < 500ms
- [ ] Performance: Database handles 40 concurrent saves without degradation
- [ ] Scalability: Schema supports storing responses from 40 attendees (19 questions each = 760 responses minimum)
- [ ] Security: Sensitive data encrypted at rest in database
- [ ] Security: Database access requires authentication (not publicly accessible)
- [ ] Data integrity: ACID compliance for response saves (no partial saves)
- [ ] Data integrity: Foreign key constraints maintain session-response relationships
- [ ] Reliability: Automated backups configured (daily minimum)
- [ ] Reliability: Point-in-time recovery possible in case of data corruption

### Quality Checklist
- [ ] Database schema designed and reviewed (supports all question types)
- [ ] Session ID generation tested (uniqueness guaranteed)
- [ ] All question types tested for storage (Likert, multiple select, ranking, text, dropdown)
- [ ] Concurrent save testing completed (40 simultaneous users)
- [ ] Optional comment storage tested for all applicable questions
- [ ] Null/empty value handling verified (skipped questions stored correctly)
- [ ] UTF-8 encoding verified (international characters, special symbols)
- [ ] Timestamp storage verified (timezone handling confirmed)
- [ ] Database indexes created for efficient querying (session ID, question ID)
- [ ] Backup and recovery procedures tested
- [ ] Database connection pooling configured for concurrent access
- [ ] Migration scripts created for schema deployment

## Technical Notes
**Recommended Schema Structure**:

**Table: sessions**
- session_id (UUID, primary key)
- start_timestamp (timestamp)
- completion_timestamp (timestamp, nullable)
- status (enum: 'incomplete', 'complete')
- created_at (timestamp)

**Table: responses**
- response_id (auto-increment, primary key)
- session_id (UUID, foreign key to sessions)
- question_id (varchar, e.g., 'Q1', 'Q2')
- response_type (enum: 'likert', 'multiple_select', 'ranking', 'text', 'dropdown')
- response_value (JSON or text field - flexible storage for different response types)
- optional_comment (text, nullable)
- submitted_at (timestamp)

**Alternative: One table per question type** (if preferred for query optimization)
- Separate tables for likert_responses, multiple_select_responses, text_responses, etc.
- Trade-off: More complex schema but potentially better query performance

**Response Value Storage**:
- Likert: Store as integer (1-5)
- Multiple select: Store as JSON array (["Option A", "Option B"]) or comma-separated values
- Ranking: Store as JSON array with ordered items ([{"rank": 1, "option": "Workshop"}, {"rank": 2, "option": "Lightning Talks"}])
- Text: Store as text string (UTF-8)
- Dropdown: Store as selected string value

**Indexes**:
- Index on session_id for fast response grouping
- Index on question_id for question-specific queries
- Index on submitted_at for time-based filtering

**Database Options**:
- PostgreSQL (recommended - excellent JSON support, ACID compliant, good performance)
- MySQL (alternative - widely supported)
- SQLite (acceptable for MVP if hosting constraints exist, but consider migration path)

## Open Questions
- Should we store IP address or user agent for fraud detection / duplicate response prevention?
- How long should response data be retained? (GDPR considerations if international attendees)
- Should we implement soft deletes (retain deleted data) or hard deletes?
- Do we need separate table for survey metadata (survey_id, conference_date, etc.) if supporting multiple conferences in future?
- Should we store checksum or hash of responses to verify data integrity?

## Estimate
**Size**: M (3-5 days)
**Confidence**: High

**Reasoning**: Database schema design, implementation, migration scripts, and thorough testing of all question types and concurrent access. Testing under load adds time.

**Breakdown**:
- Schema design and review: 1 day
- Database setup and migrations: 1 day
- API implementation for save operations: 1 day
- Testing all question types: 1 day
- Concurrent user testing: 0.5 day
- Backup/recovery setup: 0.5 day

## Dependencies
- Hosting environment decision (determines database options)
- Backend framework selection (affects ORM and migration tools)
- Story 020 (Survey Question Screens) - defines all question types that must be stored
