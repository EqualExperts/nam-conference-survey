# User Story: Question 3 - Coworking Day Effectiveness

**Story ID**: 022
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, likert-scale, na-option

## User Story
As a Conference Attendee,
I want to rate how valuable the coworking day was for networking and collaboration (or indicate I didn't attend),
So that organizers can evaluate whether structured coworking time is an effective networking format for future conferences.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**Question Source**: `product/discovery/2025-11-12-mvp/observations/proposed-survey-questions.md` - Q3
**Design Reference**: `product/design/2025-11-12-mvp/screenshots/04-q03-logistics.png`

## Question Details

### Question Text
"How valuable was the coworking day for networking and collaboration?"

### Question Type
Likert scale (1-5) with N/A option - Single select radio buttons

### Answer Options
- 5 - Extremely valuable
- 4 - Very valuable
- 3 - Moderately valuable
- 2 - Slightly valuable
- 1 - Not at all valuable
- N/A - Did not attend coworking day

### Required
No - All questions are optional

### Transparency Note
"This helps us evaluate whether structured coworking time is an effective networking format for future conferences."

### Optional Comment Box
Yes - "Optional comments about your answer:" with text area for additional context about the coworking day

## Screen Layout

### Header
- Teal background (#00BCD4)
- "Equal Experts NAM Conference 2025"
- "Your feedback helps us improve"

### Progress Indicator
- "Question 3 of 19"
- Progress bar showing 16% complete

### Question Card
- White card with rounded corners
- Question text in bold, larger font
- Transparency note in smaller, lighter text below question
- 6 radio button options in vertical stack (including N/A)
- N/A option visually distinguished (slightly separated or different styling)
- Each option in bordered rectangle with hover state
- Optional comment box below options
- Placeholder text: "Share your thoughts..."

### Navigation
- "Back" button (gray/outline) bottom left
- "Next" button (teal) bottom right

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Attendee Views Question 3**
- **Given** a Conference Attendee has completed Question 2
- **When** Question 3 loads
- **Then** the progress indicator shows "Question 3 of 19" and "16% complete"
- **And** the question text reads "How valuable was the coworking day for networking and collaboration?"
- **And** the transparency note appears correctly
- **And** all 6 answer options are displayed (5 value ratings plus N/A)
- **And** the N/A option is clearly identifiable
- **And** optional comment box is visible

**Scenario 2: Attendee Selects N/A Option**
- **Given** a Conference Attendee did not attend the coworking day
- **When** the attendee selects "N/A - Did not attend coworking day"
- **Then** that option is visually selected
- **And** all other options are deselected
- **And** the selection is saved immediately
- **And** the attendee can still add an optional comment if desired

**Scenario 3: Attendee Selects Value Rating**
- **Given** a Conference Attendee attended the coworking day
- **When** the attendee selects any value rating (1-5)
- **Then** that rating is selected
- **And** the N/A option remains unselected
- **And** the selection is saved immediately

**Scenario 4: Attendee Switches from N/A to Rating**
- **Given** a Conference Attendee initially selected "N/A"
- **When** the attendee changes their mind and selects a value rating (1-5)
- **Then** the N/A selection is cleared
- **And** the new rating is selected
- **And** the updated response is saved

**Scenario 5: N/A Data Handling**
- **Given** a Conference Attendee has selected "N/A"
- **When** the response is saved to the database
- **Then** the N/A selection is stored distinctly from numeric ratings
- **And** the N/A response can be filtered separately in data analysis
- **And** N/A does not skew numeric rating averages

**Scenario 6: Navigation and Progress**
- **Given** a Conference Attendee is viewing Question 3
- **When** the attendee clicks "Next" or "Back"
- **Then** navigation works correctly (to Q4 or Q2)
- **And** responses are preserved
- **And** progress updates appropriately

### Non-Functional Requirements
- [ ] Performance: Question loads in < 1 second
- [ ] Accessibility: WCAG 2.1 AA compliant, N/A option clearly announced by screen readers
- [ ] Mobile-responsive: All options including N/A meet 44x44px touch target
- [ ] Data integrity: N/A stored as distinct value, not as 0 or null
- [ ] Analysis support: N/A responses filterable for demographic analysis

### Quality Checklist
- [ ] Screen layout matches design screenshot
- [ ] All 6 options display correctly (5 ratings + N/A)
- [ ] N/A option is visually distinguishable from ratings
- [ ] Transparency note text is accurate
- [ ] Progress shows exactly 16% (3/19)
- [ ] N/A selection properly stored and retrievable
- [ ] Mobile and keyboard navigation tested
- [ ] Screen reader correctly announces N/A as separate option

## Technical Notes

### Question ID
`q03_coworking_effectiveness`

### Data Structure
```json
{
  "question_id": "q03_coworking_effectiveness",
  "question_number": 3,
  "response_type": "likert_scale_with_na",
  "rating_value": 1-5 or null,
  "na_selected": boolean,
  "optional_comment": "string" or null,
  "timestamp": "ISO 8601"
}
```

### Validation
- No validation required (question is optional)
- If na_selected = true, rating_value should be null
- If rating_value is 1-5, na_selected should be false
- Comment field: 500 char limit suggested

### N/A Implementation Note
Store N/A as a boolean flag separate from rating value to enable:
- Filtering out N/A responses from average calculations
- Demographic analysis of N/A responses (e.g., "What % of first-time attendees selected N/A?")
- Clear distinction between "skipped question" (null) and "didn't attend" (N/A)

## Dependencies
- Question 2 (STORY-021) must exist for "Back" navigation
- Question 4 (STORY-023) must exist for "Next" navigation
- Database schema (STORY-040) must support N/A boolean flag
- CSV export (STORY-041) must handle N/A responses correctly

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Likert scale with added N/A complexity. Requires special data handling for N/A option to support proper analysis filtering.
