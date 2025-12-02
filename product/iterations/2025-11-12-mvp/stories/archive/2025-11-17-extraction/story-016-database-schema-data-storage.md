# User Story: Database Schema & Data Storage

**Story ID**: STORY-016
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, foundation, system, data-integrity, backend

## User Story

As the survey application system,
I need a reliable database schema that properly stores all 19 survey questions and 12 optional comment fields,
So that all attendee responses are captured accurately and can be exported for analysis without data loss or corruption.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 5 (CSV Export), Feature 16 (Load Testing)
**User Need**: Foundational capability - all other features depend on reliable data persistence
**Supporting Evidence**:
- Mike Mitchell PM interview: "Data stored reliably" - explicit MVP requirement
- Feature 5 CSV Export: "Export all 19 questions + optional comments to CSV" requires proper schema
- Feature 16 Load Testing: "Database handles concurrent writes" from 40 simultaneous users
- Lauren Kessler: Needs raw data export capability for demographic segmentation analysis

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Complete Survey Response Storage - Happy Path**
- **Given** an attendee completes the survey and answers all 19 questions with all 12 optional comments
- **When** the survey is submitted
- **Then** all 19 question responses are stored in the database with correct data types
- **And** all 12 optional comment texts are stored in their respective fields
- **And** demographic data (Q18 employment status, Q19 name/location) is stored
- **And** a submission timestamp is recorded
- **And** a unique response ID is generated and stored

**Scenario 2: Partial Survey Response Storage (Zero Mandatory Fields)**
- **Given** an attendee submits the survey with only Q1 answered (skipping Q2-Q19)
- **When** the survey is submitted
- **Then** Q1 response is stored with correct value
- **And** Q2-Q19 are stored as NULL (not empty string, not default value)
- **And** all 12 optional comments are stored as NULL
- **And** the partial response is saved successfully without validation errors
- **And** the response can be exported to CSV with empty cells for unanswered questions

**Scenario 3: Multiple Select Question Storage (Q4, Q17)**
- **Given** an attendee selects 3 checkboxes in Q4 (Connection Quality) and 4 checkboxes in Q17 (Feedback Confidence)
- **When** the survey is submitted
- **Then** Q4 stores all 3 selected options (comma-separated string OR JSON array OR separate relational table)
- **And** Q17 stores all 4 selected options in same format
- **And** "Other (please specify)" text is stored separately if selected
- **And** CSV export properly represents multiple selections

**Scenario 4: Choice Ranking Storage (Q11)**
- **Given** an attendee ranks the 4 session types in Q11 (1=Workshops, 2=Main presentations, 3=Networking, 4=Co-working)
- **When** the survey is submitted
- **Then** each session type is stored with its assigned rank (1-4)
- **And** rank values are stored as integers, not text
- **And** CSV export shows rank for each option
- **And** data structure allows querying average rank per session type

**Scenario 5: N/A Option Storage (Q3, Q8, Q10, Q13)**
- **Given** an attendee selects "N/A" option for Q8 (Saturday worth)
- **When** the survey is submitted
- **Then** Q8 is stored as a distinct N/A value (not NULL, not 0, not empty string)
- **And** N/A is distinguishable from skipped questions in data analysis
- **And** CSV export clearly indicates N/A selection (e.g., "N/A" text value)

**Scenario 6: Concurrent Write Handling (Load Test Scenario)**
- **Given** 40 attendees are submitting the survey simultaneously during conference break
- **When** all 40 submissions occur within 30-second window
- **Then** all 40 responses are stored in database without data loss
- **And** no race conditions occur (no overwritten data, no failed transactions)
- **And** all 40 responses receive unique IDs
- **And** database remains responsive (< 2s write time per response)

### Non-Functional Requirements

- [ ] **Data Integrity**: All submissions persist correctly; no silent data loss; ACID transaction compliance
- [ ] **Performance**: Survey submission completes in < 2 seconds under normal load (1 user)
- [ ] **Concurrency**: Supports 40 concurrent writes without errors or delays > 5 seconds
- [ ] **Scalability**: Schema supports at least 100 responses (40 expected + growth buffer)
- [ ] **Backup**: Database backup mechanism in place (automatic daily backups or cloud provider backups)
- [ ] **Security**: No SQL injection vulnerabilities; parameterized queries only; no sensitive data logged

### Quality Checklist

- [ ] Schema design reviewed for normalization vs query performance trade-offs
- [ ] All 19 question types properly mapped to appropriate data types
- [ ] NULL handling tested for all optional fields (19 questions + 12 comments)
- [ ] Multi-select storage strategy decided and implemented consistently
- [ ] Ranking storage allows proper aggregation/analysis queries
- [ ] Database indexes added for common query patterns (e.g., export all responses)
- [ ] Load testing confirms 40 concurrent writes succeed
- [ ] CSV export accurately reflects all stored data (no data type conversion errors)
- [ ] Migration scripts created for schema deployment
- [ ] Database connection pooling configured for concurrent access

## Technical Notes

**Schema Design Options:**

**Option 1: Wide Table (Single table with all questions as columns)**
```sql
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY,
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),

  -- Questions 1-19 (various types)
  q1_overall_rating INT,  -- 1-5 scale
  q1_comment TEXT,        -- Optional comment
  q2_return_intent INT,   -- 1-5 scale
  q2_comment TEXT,
  q3_coworking_value VARCHAR(10),  -- '1', '2', '3', '4', '5', 'N/A', or NULL
  q3_comment TEXT,
  q4_connection_types TEXT[],  -- PostgreSQL array for multi-select
  q4_connection_other TEXT,    -- "Other" specification
  -- ... continue for all 19 questions

  -- Demographics
  q18_employment_status VARCHAR(50),
  q19_name VARCHAR(255),
  q19_home_location VARCHAR(255),

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);
```

**Option 2: Entity-Attribute-Value (Flexible but complex queries)**
```sql
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY,
  submitted_at TIMESTAMP NOT NULL
);

CREATE TABLE response_values (
  id UUID PRIMARY KEY,
  response_id UUID REFERENCES survey_responses(id),
  question_id VARCHAR(10),  -- 'q1', 'q2', etc.
  value TEXT,               -- All values stored as text, converted on export
  rank INT,                 -- For ranking questions (Q11)
  created_at TIMESTAMP
);
```

**Recommended Approach: Wide Table (Option 1)**
- Simpler queries for CSV export (single SELECT * FROM survey_responses)
- Better performance for small dataset (40-100 responses)
- Easier to understand and maintain for future developers
- Trade-off: Less flexible if questions change, but acceptable for MVP with fixed question set

**Data Type Mapping:**
- Likert scales (Q1, Q2, Q3, Q5, Q6, Q8, Q10, Q13): INT (stores 1-5, or NULL, or special N/A value like -1)
- Multiple choice single select (Q9, Q12): VARCHAR or ENUM
- Multiple select checkboxes (Q4, Q17): TEXT[] array (PostgreSQL) or JSON or comma-separated VARCHAR
- Choice ranking (Q11): 4 INT columns (q11_rank_presentations, q11_rank_workshops, etc.)
- Open-ended text (Q7, Q14, Q15): TEXT (unlimited length)
- Demographics (Q18, Q19): VARCHAR(255)
- Optional comments (12 total): TEXT

**N/A Handling Strategy:**
- Store N/A as distinct value (e.g., -1 for INT fields, 'N/A' string for VARCHAR)
- NULL represents "skipped/unanswered"
- This allows analysis to distinguish "does not apply" from "chose not to answer"

**Concurrency Handling:**
- Use database connection pooling (minimum 10 connections for 40 concurrent users)
- PostgreSQL default isolation level (READ COMMITTED) sufficient
- No row-level locking needed (each submission is independent INSERT)
- If using SQLite (discouraged): enable WAL mode for better concurrent writes

**Technology Recommendations:**
- **PostgreSQL**: Preferred - robust concurrency, array data types, mature, cloud-hosted options (RDS, Cloud SQL)
- **MySQL**: Acceptable alternative - good concurrency, widely supported
- **SQLite**: NOT recommended - poor concurrent write performance, would fail load test with 40 users

## Design Notes

**Schema Documentation:**
Create schema documentation that maps each database column to:
- Survey question number (Q1-Q19)
- Question text from proposed-survey-questions.md
- Data type and constraints
- NULL handling (what NULL means vs N/A vs empty string)

**Example Documentation Entry:**
```
Column: q8_saturday_worth
Question: Q8 - How worth it was your Saturday personal time investment?
Type: INT
Values: 1-5 (Likert scale), -1 (N/A - Did not attend Saturday), NULL (skipped)
Transparency: "This helps us validate that asking for personal time on weekends creates genuine value"
```

**CSV Export Mapping:**
Document how each database field maps to CSV column headers:
- Database `q1_overall_rating` → CSV header `Q1: Overall Conference Rating (1-5)`
- Include both numeric value and label in export (e.g., "5 - Excellent" not just "5")

## Open Questions

- ✅ Which database technology to use? **ANSWER**: PostgreSQL recommended for array support and concurrency; confirm in technical architecture decision
- ✅ How to store multiple select questions - array, JSON, or normalized table? **ANSWER**: PostgreSQL array preferred for simplicity; JSON acceptable fallback
- ✅ Should we store audit trail (created_at, updated_at, IP address)? **ANSWER**: created_at and submitted_at yes; updated_at if draft functionality added; IP address not needed for MVP
- ✅ Do we need soft deletes or is hard delete acceptable? **ANSWER**: Hard delete acceptable for MVP; unlikely to need delete functionality at all

## Estimate

**Size**: M (3-5 days)
**Confidence**: High

**Breakdown:**
- Schema design and documentation: 4-6 hours
- Migration script creation: 2-3 hours
- Database setup and configuration: 2-4 hours
- Connection pooling setup: 2-3 hours
- Insert logic implementation: 4-6 hours
- NULL and N/A handling implementation: 2-3 hours
- Load testing setup and execution: 4-6 hours
- CSV export query optimization: 2-4 hours
- Documentation and schema review: 2-3 hours

## Dependencies

- Technology stack decision (PostgreSQL vs MySQL vs other)
- Hosting environment decision (local, cloud SQL, etc.)
- STORY-005 (CSV Export) - depends on schema being queryable
- STORY-002 (Zero Mandatory Fields) - requires NULL-handling design
- All question type stories (STORY-007 through STORY-011) - define data structure needs

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Foundation Story:**
- Every other feature depends on data storage
- No survey functionality works without database
- Blocking story for STORY-005 (CSV Export), STORY-016 (Load Testing), all question rendering

**Data Integrity is Non-Negotiable:**
- Losing survey responses from 40 conference attendees is catastrophic failure
- Single data loss incident destroys trust and survey credibility
- Lauren needs complete raw data for demographic analysis - partial data useless

**Concurrency Requirement Unique to In-Conference Completion:**
- Traditional post-conference surveys have distributed submission times
- In-conference scheduled activity means 40 simultaneous submissions in 5-minute window
- Database must handle this load or survey becomes unusable during scheduled time

### Design Decision Rationale

**Why Wide Table vs EAV:**
- Fixed question set (19 questions) means wide table schema is stable
- CSV export significantly simpler with wide table (single SELECT vs complex joins)
- Performance better for aggregation queries with small dataset
- EAV only beneficial if questions frequently change (not the case for MVP)

**Why PostgreSQL Over SQLite:**
- SQLite concurrent write performance inadequate for 40 simultaneous users
- PostgreSQL array data type ideal for multi-select questions
- Cloud-hosted PostgreSQL (Cloud SQL, RDS) provides automatic backups
- SQLite appropriate for single-user applications, not multi-user web apps

**Why Store N/A Separately from NULL:**
- NULL = "User skipped this question" (chose not to answer)
- N/A = "Question does not apply to user" (explicit selection)
- Analytics treats these differently: N/A excluded from average calculations, NULL might indicate survey abandonment

### Testing Strategy

**Load Testing Approach:**
1. Use load testing tool (k6, Artillery, JMeter) to simulate 40 concurrent users
2. Each simulated user submits complete survey response
3. Configure 30-second submission window (realistic conference break scenario)
4. Measure: success rate (should be 100%), response time (should be < 5s), database errors (should be 0)
5. Verify: All 40 responses stored correctly, no data corruption, no duplicate IDs

**Data Integrity Testing:**
1. Submit survey with all fields populated → verify all stored correctly
2. Submit survey with only Q1 → verify Q2-Q19 are NULL
3. Submit survey with N/A selections → verify N/A distinguishable from NULL
4. Submit survey with multi-select → verify all selections stored
5. Submit survey with ranking → verify ranks stored as integers
6. Export to CSV after each test → verify export matches stored data

---

## For Issue Tracker Import

**Title**: Database Schema & Data Storage
**Description**:
As the survey application system, I need a reliable database schema that properly stores all 19 survey questions and 12 optional comment fields, so that all attendee responses are captured accurately and can be exported for analysis without data loss or corruption.

**Source**: Discovery cycle 2025-11-12-mvp, foundation requirement for all survey functionality.

**Acceptance Criteria**: Schema supports all 19 questions with proper data types, handles NULL values for optional fields, stores multi-select and ranking data, supports 40 concurrent writes, enables CSV export without data loss.

**Labels**: 2025-11-12-mvp, foundation, backend, must-have, database
**Priority**: Must Have (Walking Skeleton - Foundation)
**Story Points**: 5 (M-sized, 3-5 days)
