# User Story: Question 10 - Accommodations, Venue & Catering

**Story ID**: 029
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, likert-scale, na-option

## User Story
As a Conference Attendee, I want to rate the hotel accommodations, conference venue, and catered meals and snacks (or indicate I didn't stay at the conference hotel), so that organizers can evaluate hotel quality, choose appropriate venues, and ensure food meets dietary needs.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q10
**Design**: screenshots/11-q10-social-events.png

## Question Details

**Text**: "How would you rate the hotel accommodations, conference venue, and catered meals and snacks?"

**Type**: Likert scale (1-5) with N/A - Radio buttons

**Options**:
- 5 - Excellent
- 4 - Good
- 3 - Neutral
- 2 - Fair
- 1 - Poor
- N/A - Did not stay at conference hotel

**Required**: No

**Transparency Note**: "This helps us evaluate hotel quality, choose appropriate venues, and ensure food meets dietary needs and preferences."

**Optional Comment**: "Please comment if you answered Neutral or below:" - text area

## Screen Layout
- Progress: "Question 10 of 19" / "53% complete"
- 6 radio options (including N/A)
- Special optional comment prompt (conditional suggestion)

## Acceptance Criteria

**Key Scenarios**:
1. Progress shows 53% (10/19)
2. All 6 options including N/A display
3. N/A stored as separate boolean (same as Q3, Q8)
4. Comment box suggests providing feedback if rating ≤ 3
5. Navigation to Q9/Q11 works

## Technical Notes

**Question ID**: `q10_accommodations_venue_catering`

**Data Structure**: Likert with N/A (same as Q3, Q8)

**Comment Note**: While comment box suggests "if you answered Neutral or below," it's not enforced - attendees can comment on any rating.

## Dependencies
- Questions 9 and 11 for navigation
- Database schema (STORY-040) supports N/A

## Estimate
**Size**: XS (< 1 day)
**Confidence**: High

**Reasoning**: Standard Likert with N/A pattern.
