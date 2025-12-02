# User Story: Question 13 - Professional Development Comparison

**Story ID**: 032
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, likert-scale, na-option

## User Story
As a Conference Attendee, I want to compare NAM Conference to other professional development opportunities I've experienced, so that organizers can understand how the conference stacks up against other learning and networking opportunities available to me.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q13
**Design**: screenshots/14-q13-speaking-opportunity.png

## Question Details

**Text**: "How does NAM Conference compare to other professional development opportunities you've experienced?"

**Type**: Likert scale (1-5) with N/A - Radio buttons

**Options**:
- 5 - Much better than other opportunities
- 4 - Somewhat better
- 3 - About the same
- 2 - Somewhat worse
- 1 - Much worse
- N/A - Have not attended other conferences

**Required**: No

**Transparency Note**: "This helps us understand how the conference stacks up against other learning and networking opportunities available to you."

**Optional Comment**: Yes - text area for context about comparison

## Screen Layout
- Progress: "Question 13 of 19" / "68% complete"
- 6 radio options (including N/A)
- N/A option visually distinguished

## Acceptance Criteria

1. Progress shows 68% (13/19)
2. All 6 options including N/A display
3. N/A stored as boolean flag (same pattern as Q3, Q8, Q10)
4. Navigation to Q12/Q14 works
5. Mobile and accessibility requirements met

## Technical Notes

**Question ID**: `q13_professional_development_comparison`

**Data Structure**: Likert with N/A (same pattern as Q3, Q8, Q10)

**N/A Handling**: Separate boolean flag for filtering - attendees who haven't attended other conferences

## Dependencies
- Questions 12 and 14 for navigation
- Database schema (STORY-040) supports N/A

## Estimate
**Size**: XS (< 1 day)
**Confidence**: High

**Reasoning**: Standard Likert with N/A pattern.
