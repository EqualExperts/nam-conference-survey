# User Story: Question 17 - Feedback Loop Confidence

**Story ID**: 036
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, multiple-select

## User Story
As a Conference Attendee, I want to select what would make me most confident that my feedback will be acted upon, so that organizers can design a feedback loop that builds trust and shows we take input seriously.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q17
**Design**: screenshots/18-q17-confidence.png

## Question Details

**Text**: "What would make you most confident that your feedback will be acted upon? (Select all that apply)"

**Type**: Multiple select checkboxes

**Options**:
- [ ] Public summary of all feedback shared with attendees
- [ ] Action plan showing what will change based on feedback
- [ ] Visible changes at next conference addressing this year's issues
- [ ] Direct response acknowledging my specific feedback
- [ ] Conference organizers explaining decisions and trade-offs
- [ ] Nothing - I already feel confident feedback is valued
- [ ] Other (please specify)

**Required**: No

**Transparency Note**: "This helps us design a feedback loop that builds trust and shows we take your input seriously."

**Optional Comment**: Yes - text area for additional thoughts about feedback loop

## Screen Layout
- Progress: "Question 17 of 19" / "89% complete"
- 7 checkbox options (including "Other")
- "Other" checkbox with text input field
- "Select all that apply" instruction
- Optional comment box

## Acceptance Criteria

1. Progress shows 89% (17/19)
2. All 7 checkboxes display (including Other with text field)
3. Multiple selection works (checkboxes)
4. "Other" text field appears when checked
5. Navigation to Q16/Q18 works
6. Data stored as array of selected options

## Technical Notes

**Question ID**: `q17_feedback_loop_confidence`

**Data Structure**: Same as Q4 (multiple select with Other option)

```json
{
  "question_id": "q17_feedback_loop_confidence",
  "question_number": 17,
  "response_type": "multiple_select",
  "selected_options": [
    "public_summary",
    "action_plan",
    "visible_changes",
    "direct_response",
    "explain_decisions",
    "already_confident",
    "other"
  ] or [],
  "other_text": "string" or null,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

## Dependencies
- Questions 16 and 18 for navigation
- Database schema (STORY-040) supports array storage

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Multiple select with Other option - same pattern as Q4.
