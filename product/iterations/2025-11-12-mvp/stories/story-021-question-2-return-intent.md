# User Story: Question 2 - Return Attendance Intent

**Story ID**: 021
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, likert-scale

## User Story
As a Conference Attendee,
I want to indicate whether I would attend NAM Conference again next year,
So that organizers can gauge sustained interest and plan future conference capacity.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**Question Source**: `product/discovery/2025-11-12-mvp/observations/proposed-survey-questions.md` - Q2
**Design Reference**: `product/design/2025-11-12-mvp/screenshots/03-q02-connections.png`

## Question Details

### Question Text
"Would you want to attend NAM Conference again next year?"

### Question Type
Likert scale (1-5) - Single select radio buttons

### Answer Options
- 5 - Definitely yes
- 4 - Probably yes
- 3 - Unsure
- 2 - Probably not
- 1 - Definitely not

### Required
No - All questions are optional

### Transparency Note
"This helps us gauge sustained interest and plan future conference capacity."

### Optional Comment Box
Yes - "Optional comments about your answer:" with text area for additional context about response

## Screen Layout

### Header
- Teal background (#00BCD4)
- "Equal Experts NAM Conference 2025"
- "Your feedback helps us improve"

### Progress Indicator
- "Question 2 of 19"
- Progress bar showing 11% complete

### Question Card
- White card with rounded corners
- Question text in bold, larger font
- Transparency note in smaller, lighter text below question
- 5 radio button options in vertical stack
- Each option in bordered rectangle with hover state
- Optional comment box below options
- Placeholder text: "Share your thoughts..."

### Navigation
- "Back" button (gray/outline) bottom left
- "Next" button (teal) bottom right

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Attendee Views Question 2**
- **Given** a Conference Attendee has completed Question 1
- **When** Question 2 loads
- **Then** the progress indicator shows "Question 2 of 19" and "11% complete"
- **And** the question text reads "Would you want to attend NAM Conference again next year?"
- **And** the transparency note appears: "This helps us gauge sustained interest and plan future conference capacity."
- **And** all 5 answer options (5-Definitely yes through 1-Definitely not) are displayed
- **And** an optional comment text area is visible
- **And** both "Back" and "Next" buttons are visible

**Scenario 2: Attendee Selects Intent Level**
- **Given** a Conference Attendee is viewing Question 2
- **When** the attendee clicks any intent option (1-5)
- **Then** that option is visually selected
- **And** any previously selected option is deselected
- **And** the selection is saved immediately

**Scenario 3: Attendee Goes Back to Question 1**
- **Given** a Conference Attendee is viewing Question 2
- **When** the attendee clicks "Back"
- **Then** the system navigates to Question 1
- **And** Question 1 displays the attendee's previous answer (if any)
- **And** no data is lost from Question 2

**Scenario 4: Attendee Proceeds to Question 3**
- **Given** a Conference Attendee is viewing Question 2
- **When** the attendee clicks "Next" (with or without answering)
- **Then** the system saves the response (or null if skipped)
- **And** the system navigates to Question 3 (Coworking Effectiveness)
- **And** the progress updates to 16% complete

**Scenario 5: Mobile and Accessibility**
- **Given** a Conference Attendee accesses Question 2 on mobile or with assistive technology
- **When** interacting with the question
- **Then** all radio buttons meet 44x44px touch target minimum
- **And** screen reader announces all options clearly
- **And** keyboard navigation works in logical order

### Non-Functional Requirements
- [ ] Performance: Question loads in < 1 second
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Mobile-responsive: Works on 320px minimum width
- [ ] Data persistence: Auto-save on selection
- [ ] Navigation: Smooth transitions between questions

### Quality Checklist
- [ ] Screen layout matches design screenshot
- [ ] All 5 intent options display in correct order
- [ ] Transparency note text is accurate
- [ ] Back button navigates to Q1 correctly
- [ ] Progress shows exactly 11% (2/19)
- [ ] Previous answers preserved when navigating back
- [ ] Mobile and keyboard navigation tested

## Technical Notes

### Question ID
`q02_return_intent`

### Data Structure
```json
{
  "question_id": "q02_return_intent",
  "question_number": 2,
  "response_type": "likert_scale",
  "rating_value": 1-5 or null,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

### Validation
- No validation required (question is optional)
- Accept null values
- Comment field: 500 char limit suggested

## Dependencies
- Question 1 (STORY-020) must exist for "Back" navigation
- Question 3 (STORY-022) must exist for "Next" navigation
- Database schema (STORY-022) must support answer preservation

## Estimate
**Size**: XS (< 1 day)
**Confidence**: High

**Reasoning**: Standard Likert scale question, identical pattern to Q1 but with navigation in both directions.
