# User Story: Question 15 - Additional Feedback

**Story ID**: 034
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, open-text

## User Story
As a Conference Attendee, I want to share anything else about my conference experience that wasn't specifically asked, so that organizers get additional feedback we didn't specifically ask about.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q15
**Design**: screenshots/16-q15-highlights.png

## Question Details

**Text**: "Is there anything else you'd like us to know about your conference experience?"

**Type**: Open-ended text - Large text area

**Answer Options**: Text area with placeholder: "Share any additional feedback..."

**Required**: No

**Transparency Note**: "This gives you space to share anything we didn't specifically ask about."

**Optional Comment**: No - the question itself is the text input

## Screen Layout
- Progress: "Question 15 of 19" / "79% complete"
- Large text area
- Transparency note
- Back and Next buttons

## Acceptance Criteria

1. Progress shows 79% (15/19)
2. Standard open text behavior (same as Q7, Q14)
3. Multi-line support, line breaks preserved
4. 2000 char limit (server-side)
5. Navigation to Q14/Q16 works

## Technical Notes

**Question ID**: `q15_additional_feedback`

**Data Structure**: Same as Q7 and Q14 (open text)

## Dependencies
- Questions 14 and 16 for navigation
- Database schema (STORY-040)

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Open text, same pattern as Q7 and Q14.
