# User Story: Question 8 - Saturday Personal Time Worth

**Story ID**: 027
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, likert-scale, na-option

## User Story
As a Conference Attendee, I want to indicate whether the Saturday time commitment was worth it for me (or indicate I didn't attend Saturday), so that leadership can understand if the Saturday format is working for attendees and worth continuing.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q8
**Design**: screenshots/09-q08-networking.png

## Question Details

**Text**: "The conference asks you to use personal time on a Saturday. Was this time commitment worth it for you?"

**Type**: Likert scale (1-5) with N/A - Radio buttons

**Options**:
- 5 - Absolutely worth it
- 4 - Mostly worth it
- 3 - Neutral
- 2 - Questionable value for my time
- 1 - Not worth my Saturday
- N/A - Did not attend Saturday

**Required**: No

**Transparency Note**: "We're conscious this uses your personal Saturday time. This feedback helps leadership understand if the Saturday format is working for attendees and worth continuing."

**Optional Comment**: Yes - text area for context about Saturday time commitment

## Screen Layout
- Progress: "Question 8 of 19" / "42% complete"
- 6 radio options (including N/A)
- N/A option visually distinguished
- Optional comment box
- Back and Next buttons

## Acceptance Criteria

**Key Scenarios**:
1. Progress shows 42% (8/19)
2. All 6 options including N/A display correctly
3. N/A selection stored as boolean flag (same as Q3)
4. Standard navigation to Q7/Q9 works
5. Mobile and accessibility requirements met

## Technical Notes

**Question ID**: `q08_saturday_worth`

**Data Structure**:
```json
{
  "question_id": "q08_saturday_worth",
  "question_number": 8,
  "response_type": "likert_scale_with_na",
  "rating_value": 1-5 or null,
  "na_selected": boolean,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

**N/A Handling**: Same as Q3 - separate boolean flag for filtering analysis

## Dependencies
- Questions 7 and 9 for navigation
- Database schema (STORY-040) supports N/A boolean

## Estimate
**Size**: XS (< 1 day)
**Confidence**: High

**Reasoning**: Likert with N/A - same pattern as Q3.
