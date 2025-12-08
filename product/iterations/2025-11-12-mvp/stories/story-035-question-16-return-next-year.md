# User Story: Question 16 - Return Next Year

**Story ID**: 035
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, multiple-choice

## User Story
As a Conference Attendee, I want to indicate whether I would attend next year's conference if invited, so that organizers can understand attendee interest and whether feedback is being acted upon year over year.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q16
**Design**: screenshots/17-q16-recommend.png

## Question Details

**Text**: "If you attended the last NAM Conference, did you notice improvements based on previous feedback?"

**Type**: Multiple choice - Single select radio buttons

**Options**:
- Yes - clear improvements
- Some improvements noticed
- No noticeable changes
- Not sure / can't remember specific improvements
- Did not attend last conference
- This is my first NAM Conference

**Required**: No

**Transparency Note**: "This helps us understand whether attendees see their feedback being acted upon year over year."

**Optional Comment**: Yes - text area for context about improvements noticed

## Screen Layout
- Progress: "Question 16 of 19" / "84% complete"
- 6 radio button options
- Standard layout

## Acceptance Criteria

1. Progress shows 84% (16/19)
2. All 6 improvement options display
3. Single selection works
4. Navigation to Q15/Q17 works
5. Optional comment captured

## Technical Notes

**Question ID**: `q16_return_next_year`

**Data Structure**:
```json
{
  "question_id": "q16_return_next_year",
  "question_number": 16,
  "response_type": "multiple_choice",
  "selected_option": "clear_improvements" | "some_improvements" | "no_changes" | "not_sure" | "did_not_attend_last" | "first_conference" | null,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

## Dependencies
- Questions 15 and 17 for navigation
- Database schema (STORY-040)

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Multiple choice with 6 options.
