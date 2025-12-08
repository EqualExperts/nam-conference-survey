# User Story: Question 12 - Conference Length Appropriateness

**Story ID**: 031
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, multiple-choice

## User Story
As a Conference Attendee, I want to indicate whether the overall conference length was appropriate, so that organizers can determine the optimal conference duration that provides value without overwhelming attendees.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q12
**Design**: screenshots/13-q12-venue.png

## Question Details

**Text**: "Was the overall conference length appropriate?"

**Type**: Multiple choice - Single select radio buttons

**Options**:
- Too short - wanted more time
- Just right
- Too long - felt too much time commitment
- Unsure

**Required**: No

**Transparency Note**: "This helps us determine the optimal conference duration that provides value without overwhelming attendees."

**Optional Comment**: Yes - text area for context about conference length

## Screen Layout
- Progress: "Question 12 of 19" / "63% complete"
- 4 radio button options
- Standard layout with transparency note
- Optional comment box

## Acceptance Criteria

1. Progress shows 63% (12/19)
2. All 4 length options display
3. Single selection radio button behavior
4. Navigation to Q11/Q13 works
5. Optional comment captured

## Technical Notes

**Question ID**: `q12_conference_length`

**Data Structure**:
```json
{
  "question_id": "q12_conference_length",
  "question_number": 12,
  "response_type": "multiple_choice",
  "selected_option": "too_short" | "just_right" | "too_long" | "unsure" | null,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

## Dependencies
- Questions 11 and 13 for navigation
- Database schema (STORY-040)

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Simple multiple choice with 4 options.
