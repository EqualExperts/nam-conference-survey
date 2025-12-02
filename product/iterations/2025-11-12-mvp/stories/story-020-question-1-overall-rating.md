# User Story: Question 1 - Overall Conference Rating

**Story ID**: 020
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, likert-scale

## User Story
As a Conference Attendee,
I want to rate my overall NAM Conference experience on a 5-point scale,
So that I can provide leadership with clear feedback about event quality and help justify future investment in conferences.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**Question Source**: `product/discovery/2025-11-12-mvp/observations/proposed-survey-questions.md` - Q1
**Design Reference**: `product/design/2025-11-12-mvp/screenshots/02-q01-conference-atmosphere.png`

## Question Details

### Question Text
"How would you rate your overall NAM Conference experience?"

### Question Type
Likert scale (1-5) - Single select radio buttons

### Answer Options
- 5 - Excellent
- 4 - Good
- 3 - Neutral
- 2 - Fair
- 1 - Poor

### Required
No - All questions are optional

### Transparency Note
"This helps leadership understand overall event quality and justify future investment in conferences."

### Optional Comment Box
Yes - "Optional comments about your answer:" with text area for additional context about rating

## Screen Layout

### Header
- Teal background (#00BCD4)
- "Equal Experts NAM Conference 2025"
- "Your feedback helps us improve"

### Progress Indicator
- "Question 1 of 19"
- Progress bar showing 5% complete

### Question Card
- White card with rounded corners
- Question text in bold, larger font
- Transparency note in smaller, lighter text below question
- 5 radio button options in vertical stack
- Each option in bordered rectangle with hover state
- Optional comment box below options
- Placeholder text: "Share your thoughts..."

### Navigation
- "Next" button (teal) bottom right
- No "Back" button (first question)

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Attendee Views Question 1**
- **Given** a Conference Attendee has clicked "Start Survey" from the welcome screen
- **When** Question 1 loads
- **Then** the header displays "Equal Experts NAM Conference 2025"
- **And** the progress indicator shows "Question 1 of 19" and "5% complete"
- **And** the question text reads "How would you rate your overall NAM Conference experience?"
- **And** the transparency note appears below: "This helps leadership understand overall event quality and justify future investment in conferences."
- **And** all 5 answer options (5-Excellent through 1-Poor) are displayed as radio buttons
- **And** an optional comment text area is visible with placeholder text
- **And** the "Next" button is enabled and visible

**Scenario 2: Attendee Selects Rating**
- **Given** a Conference Attendee is viewing Question 1
- **When** the attendee clicks any rating option (1-5)
- **Then** that option is visually selected (radio button filled)
- **And** any previously selected option is deselected
- **And** the "Next" button remains enabled (no change needed)

**Scenario 3: Attendee Adds Optional Comment**
- **Given** a Conference Attendee has selected a rating
- **When** the attendee types text in the optional comment box
- **Then** the text is captured and displayed in the text area
- **And** the text area expands if needed for longer comments
- **And** the character input is smooth without lag

**Scenario 4: Attendee Proceeds Without Answering**
- **Given** a Conference Attendee is viewing Question 1
- **When** the attendee clicks "Next" without selecting any rating or adding comments
- **Then** the system saves null/empty values for this question
- **And** the system navigates to Question 2 (Return Intent)
- **And** no error or warning message is displayed

**Scenario 5: Attendee Proceeds With Answer**
- **Given** a Conference Attendee has selected a rating (with or without comments)
- **When** the attendee clicks "Next"
- **Then** the system saves the selected rating and optional comment
- **And** the system navigates to Question 2 (Return Intent)
- **And** the progress updates accordingly

**Scenario 6: Mobile Experience**
- **Given** a Conference Attendee accesses Question 1 on a mobile device
- **When** the question loads
- **Then** all radio buttons are at least 44x44px for easy tapping
- **And** the text is readable without zooming
- **And** the layout adapts to screen width without horizontal scrolling
- **And** the optional comment text area is easily tappable and expandable

**Scenario 7: Keyboard Navigation**
- **Given** a Conference Attendee uses keyboard navigation
- **When** tabbing through Question 1
- **Then** focus moves through radio buttons in logical order (5 to 1)
- **And** the selected option is clearly indicated with focus state
- **And** Enter/Space key selects the focused radio button
- **And** Tab reaches the comment box and then the "Next" button
- **And** all interactive elements have visible focus indicators

### Non-Functional Requirements
- [ ] Performance: Question loads in < 1 second
- [ ] Accessibility: WCAG 2.1 AA compliant (radio button labels, focus management, color contrast)
- [ ] Mobile-responsive: Optimized for 320px minimum width
- [ ] Data persistence: Selection saved immediately on change
- [ ] Progress tracking: Accurate percentage calculation (5% for Q1)

### Quality Checklist
- [ ] Screen layout matches design screenshot exactly
- [ ] All 5 rating options display correctly in order (5 to 1)
- [ ] Transparency note text is accurate word-for-word
- [ ] Optional comment box is clearly marked as optional
- [ ] Radio buttons work correctly (single selection only)
- [ ] Progress bar shows exactly 5% (1/19 questions)
- [ ] Mobile view tested on actual devices
- [ ] Keyboard navigation tested completely
- [ ] Screen reader announces question, options, and transparency note correctly

## Technical Notes

### Question ID
`q01_overall_rating`

### Data Structure
```json
{
  "question_id": "q01_overall_rating",
  "question_number": 1,
  "response_type": "likert_scale",
  "rating_value": 1-5 or null,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

### Validation
- No validation required (question is optional)
- Accept null values for both rating and comment
- Comment field should accept reasonable text length (suggest 500 char limit)

## Dependencies
- Welcome screen (STORY-019) must route to this question
- Database schema (STORY-022) must support Likert scale data type
- Mobile responsive design (STORY-024) must apply to this screen
- Accessibility compliance (STORY-025) must include proper radio button implementation

## Estimate
**Size**: XS (< 1 day)
**Confidence**: High

**Reasoning**: Simple Likert scale question with standard radio button UI pattern. Similar to Q2, Q6, Q9, Q10.
