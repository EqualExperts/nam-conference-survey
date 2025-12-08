# User Story: Question 18 - Employment Status

**Story ID**: 037
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, demographic, multiple-choice

## User Story
As a Conference Attendee, I want to indicate my current status with Equal Experts, so that organizers can understand experience differences between employees and associates.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q18
**Design**: screenshots/19-q18-role.png

## Question Details

**Text**: "What is your current status with Equal Experts?"

**Type**: Multiple choice - Single select radio buttons

**Options**:
- Employee
- Active Associate
- Alumni Associate
- Client
- Prefer not to answer

**Required**: No

**Transparency Note**: "This helps us understand experience differences between employees and associates."

**Optional Comment**: No - demographic question without comment box

## Screen Layout
- Progress: "Question 18 of 19" / "95% complete"
- 5 radio button options
- No optional comment box (demographic question)
- Back and Next buttons

## Acceptance Criteria

1. Progress shows 95% (18/19)
2. All 5 status options display
3. Single selection works
4. "Prefer not to answer" option available for privacy
5. Navigation to Q17/Q19 works
6. No comment box (demographic data point)

## Technical Notes

**Question ID**: `q18_employment_status`

**Data Structure**:
```json
{
  "question_id": "q18_employment_status",
  "question_number": 18,
  "response_type": "demographic_choice",
  "selected_option": "employee" | "active_associate" | "alumni_associate" | "client" | "prefer_not_answer" | null,
  "timestamp": "ISO 8601"
}
```

**Privacy Note**: "Prefer not to answer" option respects privacy while still allowing completion

**Analysis Use**: Enable segmentation of feedback by employment status for targeted improvements

## Dependencies
- Questions 17 and 19 for navigation
- Database schema (STORY-040)
- CSV export (STORY-041) includes demographic columns

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Simple demographic multiple choice question.
