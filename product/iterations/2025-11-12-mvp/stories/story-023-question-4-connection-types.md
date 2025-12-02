# User Story: Question 4 - Connection Types

**Story ID**: 023
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, multiple-select

## User Story
As a Conference Attendee,
I want to select all the types of people I valued connecting with at the conference,
So that organizers can understand what types of connections attendees value most and design networking opportunities accordingly.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**Question Source**: `product/discovery/2025-11-12-mvp/observations/proposed-survey-questions.md` - Q4
**Design Reference**: `product/design/2025-11-12-mvp/screenshots/05-q04-connections-type.png`

## Question Details

### Question Text
"Who did you most value connecting with at this conference? (Select all that apply)"

### Question Type
Multiple select checkboxes - Allows selecting multiple options

### Answer Options
- [ ] EE leadership team
- [ ] Fellow associates in general
- [ ] Technical experts in specific areas
- [ ] People working on similar challenges
- [ ] People I wouldn't normally interact with in day-to-day work
- [ ] Other (please specify)

### Required
No - All questions are optional

### Transparency Note
"This helps us understand what types of connections attendees value most, so we can design networking opportunities accordingly."

### Optional Comment Box
Yes - "Optional comments about your answer:" with text area for additional context about connections made

## Screen Layout

### Header
- Teal background (#00BCD4)
- "Equal Experts NAM Conference 2025"
- "Your feedback helps us improve"

### Progress Indicator
- "Question 4 of 19"
- Progress bar showing 21% complete

### Question Card
- White card with rounded corners
- Question text in bold, larger font (including "Select all that apply")
- Transparency note in smaller, lighter text below question
- 6 checkbox options in vertical stack
- Each option in bordered rectangle with hover state
- "Other (please specify)" checkbox with accompanying text input field
- Optional comment box below options
- Placeholder text: "Share your thoughts..."

### Navigation
- "Back" button (gray/outline) bottom left
- "Next" button (teal) bottom right

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Attendee Views Question 4**
- **Given** a Conference Attendee has completed Question 3
- **When** Question 4 loads
- **Then** the progress indicator shows "Question 4 of 19" and "21% complete"
- **And** the question text includes "(Select all that apply)" instruction
- **And** the transparency note appears correctly
- **And** all 6 checkbox options are displayed and unchecked
- **And** the "Other" option includes a text input field (initially disabled or hidden)

**Scenario 2: Attendee Selects Multiple Connection Types**
- **Given** a Conference Attendee is viewing Question 4
- **When** the attendee checks multiple checkboxes (e.g., "EE leadership team" and "Technical experts")
- **Then** all selected checkboxes show checked state
- **And** previously selected checkboxes remain checked
- **And** the attendee can select as many options as desired
- **And** all selections are saved immediately

**Scenario 3: Attendee Selects "Other" Option**
- **Given** a Conference Attendee is viewing Question 4
- **When** the attendee checks the "Other (please specify)" checkbox
- **Then** the checkbox is marked as checked
- **And** a text input field appears or becomes enabled
- **And** the cursor focuses in the text input field automatically
- **And** the attendee can type their custom connection type

**Scenario 4: Attendee Unchecks "Other" Option**
- **Given** a Conference Attendee has checked "Other" and entered text
- **When** the attendee unchecks the "Other" checkbox
- **Then** the checkbox becomes unchecked
- **And** the text input field is cleared or hidden
- **And** the custom text is not saved

**Scenario 5: Attendee Selects No Options**
- **Given** a Conference Attendee is viewing Question 4
- **When** the attendee clicks "Next" without selecting any checkboxes
- **Then** the system saves an empty array for this question
- **And** the system navigates to Question 5 (Connection Depth)
- **And** no error or warning is displayed

**Scenario 6: Multiple Selection Data Handling**
- **Given** a Conference Attendee has checked 3 options (e.g., "EE leadership", "Technical experts", "Similar challenges")
- **When** the response is saved
- **Then** all 3 selections are stored as an array
- **And** the order of selection is preserved
- **And** the data can be analyzed to show frequency of each option
- **And** the data supports cross-tabulation (e.g., "People who selected X also selected Y")

**Scenario 7: Mobile and Accessibility**
- **Given** a Conference Attendee uses mobile or assistive technology
- **When** interacting with Question 4
- **Then** all checkboxes meet 44x44px touch target minimum
- **And** screen reader announces "Select all that apply"
- **And** each checkbox is independently selectable via keyboard
- **And** "Other" text field is accessible and announced correctly

### Non-Functional Requirements
- [ ] Performance: Question loads in < 1 second
- [ ] Accessibility: WCAG 2.1 AA compliant, checkboxes properly labeled
- [ ] Mobile-responsive: Works on 320px minimum width
- [ ] Data structure: Store as array for multi-select responses
- [ ] Analysis support: Enable frequency counts and cross-tabulation

### Quality Checklist
- [ ] Screen layout matches design screenshot
- [ ] All 6 checkbox options display correctly
- [ ] "Select all that apply" instruction is clear
- [ ] "Other" text field appears/enables when checkbox checked
- [ ] Multiple selections work correctly
- [ ] Transparency note text is accurate
- [ ] Progress shows exactly 21% (4/19)
- [ ] Mobile checkboxes are easily tappable
- [ ] Screen reader announces multi-select nature

## Technical Notes

### Question ID
`q04_connection_types`

### Data Structure
```json
{
  "question_id": "q04_connection_types",
  "question_number": 4,
  "response_type": "multiple_select",
  "selected_options": [
    "ee_leadership_team",
    "fellow_associates",
    "technical_experts",
    "similar_challenges",
    "people_not_normally_interact",
    "other"
  ] or [],
  "other_text": "string" or null,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

### Validation
- No validation required (question is optional)
- Accept empty array if no options selected
- If "other" is in selected_options array, other_text should contain value
- If "other" is not selected, other_text should be null
- Comment field: 500 char limit suggested

### Analysis Considerations
- Store each option as array element for frequency analysis
- Support queries like "How many people selected 'EE leadership team'?"
- Enable cross-tabulation: "Of people who selected X, what % also selected Y?"
- Other responses should be reviewable as qualitative data

## Dependencies
- Question 3 (STORY-022) must exist for "Back" navigation
- Question 5 (STORY-024) must exist for "Next" navigation
- Database schema (STORY-040) must support array/multi-select storage
- CSV export (STORY-041) must handle multi-select data (possibly comma-separated or multiple columns)

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Multiple select checkboxes with "Other" text field. Moderate complexity for data structure but standard UI pattern.
