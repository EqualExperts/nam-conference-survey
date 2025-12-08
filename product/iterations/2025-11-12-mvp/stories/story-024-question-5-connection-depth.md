# User Story: Question 5 - Connection Depth

**Story ID**: 024
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, likert-scale

## User Story
As a Conference Attendee,
I want to describe the quality of connections I made at the conference,
So that organizers can understand whether the conference format supports deep connection-building versus just surface-level networking.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**Question Source**: `product/discovery/2025-11-12-mvp/observations/proposed-survey-questions.md` - Q5
**Design Reference**: `product/design/2025-11-12-mvp/screenshots/06-q05-learning-outcomes.png`

## Question Details

### Question Text
"How would you describe the quality of connections you made at this conference?"

### Question Type
Likert scale (1-5) - Single select radio buttons

### Answer Options
- 5 - Deep, meaningful professional relationships
- 4 - Strong connections with potential for follow-up
- 3 - Good conversations and exchanges
- 2 - Mostly surface-level introductions
- 1 - Minimal meaningful interaction

### Required
No - All questions are optional

### Transparency Note
"This helps us understand whether the conference format supports deep connection-building versus just surface-level networking."

### Optional Comment Box
Yes - "Optional comments about your answer:" with text area for additional context about connection quality

## Screen Layout
- Header: "Equal Experts NAM Conference 2025" / "Your feedback helps us improve"
- Progress: "Question 5 of 19" / "26% complete"
- Question card with 5 radio buttons
- Transparency note below question
- Optional comment box
- Back and Next buttons

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Attendee Views Question 5**
- **Given** a Conference Attendee has completed Question 4
- **When** Question 5 loads
- **Then** progress shows "Question 5 of 19" and "26% complete"
- **And** question text and all 5 connection depth options display
- **And** transparency note appears correctly

**Scenario 2: Attendee Selects Connection Quality**
- **Given** an attendee is viewing Question 5
- **When** selecting any quality level (1-5)
- **Then** that option is selected and others deselected
- **And** selection is saved immediately

**Scenario 3: Navigation Works Correctly**
- **Given** an attendee is viewing Question 5
- **When** clicking Next or Back
- **Then** navigation to Q6 or Q4 works correctly
- **And** responses are preserved

**Scenario 4: Mobile and Accessibility**
- **Then** all requirements from STORY-024 (mobile-responsive) and STORY-025 (accessibility) apply

### Non-Functional Requirements
- [ ] Performance: < 1 second load time
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Mobile-responsive: 320px minimum width
- [ ] Data persistence: Auto-save on selection

## Technical Notes

### Question ID
`q05_connection_depth`

### Data Structure
```json
{
  "question_id": "q05_connection_depth",
  "question_number": 5,
  "response_type": "likert_scale",
  "rating_value": 1-5 or null,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

## Dependencies
- Questions 4 and 6 for navigation
- Database schema (STORY-040)
- Mobile responsive (STORY-042)

## Estimate
**Size**: XS (< 1 day)
**Confidence**: High

**Reasoning**: Standard Likert scale, same pattern as Q1, Q2.
