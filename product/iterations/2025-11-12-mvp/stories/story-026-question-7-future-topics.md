# User Story: Question 7 - Future Learning Topics

**Story ID**: 026
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, open-text

## User Story
As a Conference Attendee,
I want to suggest topics I'd like to see at future conferences,
So that organizers can get ideas for future conference programming based on what I want to learn.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**Question Source**: `product/discovery/2025-11-12-mvp/observations/proposed-survey-questions.md` - Q7
**Design Reference**: `product/design/2025-11-12-mvp/screenshots/08-q07-open-ended.png`

## Question Details

### Question Text
"What topics would you like to see at future conferences?"

### Question Type
Open-ended text - Large text area

### Answer Options
Text area with placeholder: "Share your topic ideas..."

### Required
No - All questions are optional

### Transparency Note
"This gives us ideas for future conference programming based on what you want to learn."

### Optional Comment Box
No - The question itself is the text input

## Screen Layout
- Header: "Equal Experts NAM Conference 2025" / "Your feedback helps us improve"
- Progress: "Question 7 of 19" / "37% complete"
- Question card with large text area
- Transparency note below question
- Text area with placeholder text
- Back and Next buttons

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Attendee Views Question 7**
- **Given** a Conference Attendee has completed Question 6
- **When** Question 7 loads
- **Then** progress shows "Question 7 of 19" and "37% complete"
- **And** a large text area is visible with placeholder text
- **And** transparency note appears correctly

**Scenario 2: Attendee Enters Topic Ideas**
- **Given** an attendee is viewing Question 7
- **When** typing in the text area
- **Then** text is captured and displayed
- **And** text area expands for longer responses
- **And** no character limit prevents input (but reasonable limit enforced server-side)

**Scenario 3: Attendee Skips Question**
- **Given** an attendee is viewing Question 7
- **When** clicking Next without entering text
- **Then** null/empty value is saved
- **And** navigation to Q8 works correctly

**Scenario 4: Multi-line Text Support**
- **Given** an attendee is entering topics
- **When** pressing Enter to create new lines
- **Then** line breaks are preserved
- **And** formatted text is saved correctly

**Scenario 5: Mobile Text Entry**
- **Given** an attendee on mobile device
- **When** tapping the text area
- **Then** mobile keyboard appears
- **And** text area is large enough for comfortable typing
- **And** text remains visible while keyboard is open

### Non-Functional Requirements
- [ ] Performance: < 1 second load time
- [ ] Accessibility: Text area properly labeled, keyboard accessible
- [ ] Mobile-responsive: Text area usable on mobile
- [ ] Data limit: 2000 character limit (server-side enforcement)
- [ ] Formatting: Preserve line breaks

## Technical Notes

### Question ID
`q07_future_topics`

### Data Structure
```json
{
  "question_id": "q07_future_topics",
  "question_number": 7,
  "response_type": "open_text",
  "text_response": "string" or null,
  "timestamp": "ISO 8601"
}
```

### Validation
- No required validation
- Server-side: 2000 character limit
- Preserve line breaks/formatting

## Dependencies
- Questions 6 and 8 for navigation
- Database schema (STORY-040)

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Open text field with multi-line support, mobile keyboard handling.
