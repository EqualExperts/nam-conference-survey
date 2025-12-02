# User Story: Zero Mandatory Fields Design

**Story ID**: STORY-002
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, completion-optimization, conference-attendee, critical-requirement

## User Story

As a conference attendee (Sarah Aslanifar persona),
I want complete freedom to skip any question that doesn't apply to me or that I don't want to answer,
So that I can provide authentic feedback without being forced to fabricate responses or abandon the survey entirely.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Theme 2 (Completion Barriers Drive Abandonment), Pain Point #2
**User Need**: "When answering survey questions, I want complete control over what I share, so I can provide authentic feedback without feeling forced"
**Supporting Evidence**:
- Sarah Aslanifar interview: "There are sometimes fields that it's like you must enter something and if you don't have any feedback on that, it doesn't let you proceed. Those are frustrating because at this point, things should be optional" - **Abandons surveys with mandatory fields**
- Andrew Shawcare: "I would potentially want to just not do that question" when personal values conflict
- PM follow-up interview: "Same questions for everyone, and ideally all questions are applicable to everyone" via N/A options and skip capability

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Survey Submission with Zero Answers - Critical Test**
- **Given** I have opened the survey but not answered any questions
- **When** I click the "Submit" button
- **Then** the survey successfully submits to the database
- **And** I see the acknowledgment page "Thank you - your feedback has been received"
- **And** no validation errors or warnings appear
- **And** my submission is saved with all fields null/empty

**Scenario 2: Partial Completion Accepted**
- **Given** I have answered 5 of 19 questions
- **When** I submit the survey
- **Then** only my 5 answered questions save to database
- **And** the remaining 14 questions save as null/empty
- **And** no error messages about incomplete survey
- **And** I receive the same acknowledgment as complete submissions

**Scenario 3: Skipping High-Priority Questions Allowed**
- **Given** I choose to skip Q1 (Overall Conference Rating) - a key metric question
- **When** I attempt to move to the next question or submit
- **Then** no validation prevents me from proceeding
- **And** no warning message suggests I "should" answer this question
- **And** the question remains unanswered in my submission

**Scenario 4: No Client-Side Validation Errors**
- **Given** I am progressing through the survey
- **When** I skip any combination of questions (Likert, multi-select, ranking, text, demographics)
- **Then** no red text, asterisks, or error states appear
- **And** no browser-level "required field" warnings trigger
- **And** no JavaScript validation blocks submission

**Scenario 5: No Server-Side Validation Rejection**
- **Given** I submit a survey with random questions answered
- **When** the server receives my submission
- **Then** no HTTP 400 Bad Request errors occur
- **And** no API validation rejects submission for missing fields
- **And** database insert succeeds regardless of which fields are populated

### Non-Functional Requirements

- [ ] **Data Integrity**: Database schema allows null values for all 19 question fields
- [ ] **Performance**: Lack of validation doesn't slow submission (validation removal = faster)
- [ ] **Usability**: No confusing "required" markers that might mislead users
- [ ] **Documentation**: Implementation notes clearly state "CRITICAL - Zero mandatory fields. All 19 questions must be skippable."

### Quality Checklist

- [ ] Database schema verified: all question columns allow NULL
- [ ] Frontend code reviewed: no `required` attributes on any form inputs
- [ ] Backend API tested: accepts empty submission successfully
- [ ] All question types tested individually (Likert, multi-select, ranking, open-text, demographics)
- [ ] Edge case tested: Skip all questions, submit successfully
- [ ] User testing confirms no confusion about optionality
- [ ] proposed-survey-questions.md specification verified: all 19 questions marked "Required: No"

## Technical Notes

**Database Schema Requirements:**
```sql
-- All question columns must allow NULL
CREATE TABLE survey_responses (
  id SERIAL PRIMARY KEY,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- All questions nullable
  q1_overall_rating INTEGER,  -- NULL allowed
  q2_return_intent INTEGER,   -- NULL allowed
  q3_coworking_value INTEGER, -- NULL allowed
  -- ... all 19 questions + 12 optional comments

  -- Demographics nullable
  q18_employment_status VARCHAR(50),  -- NULL allowed
  q19_name TEXT,                       -- NULL allowed
  q19_location TEXT                    -- NULL allowed
);
```

**Frontend Implementation:**
- Remove all `required` HTML attributes from form inputs
- Remove all client-side validation for question fields
- Do NOT use asterisks (*) or "required" labels
- Submit button always enabled (never conditional on completion)

**Backend API Validation:**
- Accept requests with empty body: `{}`
- Accept requests with partial data: `{"q1_overall_rating": 4}`
- Do NOT validate presence of any question fields
- Only validate data types when provided (e.g., if q1 provided, must be 1-5)

**Critical Implementation Note:**
The implementation notes in proposed-survey-questions.md state:
> "**All questions optional**: CRITICAL - Zero mandatory fields. All 19 questions must be skippable to prevent abandonment. This is a hard requirement from attendee interviews."

## Design Notes

**No Visual "Required" Indicators:**
- No asterisks (*) next to question text
- No red text saying "Required"
- No different styling for "important" questions

**Positive Framing:**
The proposed-survey-questions.md uses "Required: No" documentation to be explicit, but the UI should not emphasize optionality prominently (avoid "Optional" labels on every question - creates visual clutter). The absence of "required" indicators is sufficient.

**Submit Button State:**
- Always enabled (never grayed out)
- Text: "Submit Survey" or "Submit Feedback"
- No conditional messaging like "Complete X more questions to submit"

## Open Questions

- ✅ Should we show completion percentage to encourage more answers? **ANSWER**: No - STORY-017 (Progress Indicator) is "Should Have" priority, not must-have. Avoid any pressure to complete.
- ✅ Do we need minimum response threshold for data quality? **ANSWER**: No - Lauren and Katie indicated even partial responses provide value. Statistical analysis can filter by completeness.

## Estimate

**Size**: XS (< 1 day)
**Confidence**: High

**Breakdown:**
- Database schema review/update: 1-2 hours
- Remove frontend validation: 1 hour
- Remove backend validation: 1 hour
- Testing all question types skippable: 2-3 hours
- Edge case testing (zero answers): 1 hour

**Total**: ~6-8 hours

## Dependencies

- STORY-016 (Database Schema & Data Storage) - must ensure nullable columns
- All question type stories (STORY-007 through STORY-011) - verification that no required attributes added

## Notes

### Why This Story is Must-Have (Absolutely Critical)

**Primary Abandonment Driver:**
- Synthesis identified mandatory fields as Pain Point #2
- Sarah Aslanifar explicitly states she abandons surveys with required fields
- "Better to get 35 complete responses to 12 questions than 20 partial responses to 18 questions" - prioritization framework

**Non-Negotiable Requirement:**
- Labeled "CRITICAL" in implementation notes
- "Hard requirement from attendee interviews"
- Directly prevents achievement of 90-95% response rate target if violated

**Cultural Alignment:**
- Respects attendee autonomy
- Demonstrates Equal Experts values (trust, transparency)
- Differentiator from traditional survey tools (Google Forms allows required fields)

### Testing Strategy

**Critical Test Cases:**
1. Submit with zero answers - must succeed
2. Submit with only Q19 (demographics) answered - must succeed
3. Skip Q1 (overall rating - key metric) - must succeed
4. Skip Q8 (Saturday worth - Katie's critical question) - must succeed
5. Mobile device submission with partial answers - must succeed

**Regression Prevention:**
- Add automated test: "Empty submission succeeds"
- Code review checklist: "No required attributes added"
- QA checklist item: "Verify all questions optional"

### Implementation Warning

**Common Anti-Pattern to Avoid:**
Do NOT add "soft" requirements like:
- "Are you sure you want to skip this question?" confirmations
- "We recommend answering at least X questions" messaging
- Conditional visibility of submit button based on completion

All of these create psychological pressure that contradicts the zero-mandatory design principle.

---

## For Issue Tracker Import

**Title**: Zero Mandatory Fields Design
**Description**:
As a conference attendee, I want complete freedom to skip any question without barriers, so I can provide authentic feedback without forced fabrication or survey abandonment.

**CRITICAL REQUIREMENT**: All 19 questions must be optional. This is non-negotiable per Sarah Aslanifar interview - she abandons surveys with mandatory fields.

**Acceptance Criteria**: Survey submits successfully with zero answers; no client-side or server-side validation errors for skipped questions; database accepts null values for all fields.

**Labels**: 2025-11-12-mvp, critical-requirement, must-have, completion-optimization
**Priority**: Must Have (Walking Skeleton) - CRITICAL
**Story Points**: 1 (XS-sized, <1 day)
