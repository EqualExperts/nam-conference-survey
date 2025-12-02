# User Story: Question 14 - What You Liked Most

**Story ID**: 033
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, open-text

## User Story
As a Conference Attendee, I want to share what I enjoyed most about the conference, so that organizers can understand what's working well and preserve and enhance those elements.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q14
**Design**: screenshots/15-q14-improvements.png

## Question Details

**Text**: "What did you like most about the conference?"

**Type**: Open-ended text - Large text area

**Answer Options**: Text area with placeholder: "Share what you enjoyed most..."

**Required**: No

**Transparency Note**: "This helps us understand what's working well so we can preserve and enhance those elements."

**Optional Comment**: No - the question itself is the text input

## Screen Layout
- Progress: "Question 14 of 19" / "74% complete"
- Large text area for open-ended response
- Transparency note
- Back and Next buttons

## Acceptance Criteria

1. Progress shows 74% (14/19)
2. Large text area displays with placeholder text
3. Multi-line text input supported
4. Line breaks preserved in saved data
5. Attendee can skip question (null value saved)
6. Navigation to Q13/Q15 works
7. Mobile keyboard handling works smoothly

## Technical Notes

**Question ID**: `q14_what_liked_most`

**Data Structure**:
```json
{
  "question_id": "q14_what_liked_most",
  "question_number": 14,
  "response_type": "open_text",
  "text_response": "string" or null,
  "timestamp": "ISO 8601"
}
```

**Validation**:
- No required validation
- Server-side: 2000 character limit
- Preserve line breaks

## Dependencies
- Questions 13 and 15 for navigation
- Database schema (STORY-040) supports open text

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Open text field, same pattern as Q7.
