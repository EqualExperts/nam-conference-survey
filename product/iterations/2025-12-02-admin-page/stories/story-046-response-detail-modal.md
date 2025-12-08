# User Story: Response Detail Modal

**Story ID**: STORY-046
**Iteration**: 2025-12-02-admin-page
**Priority**: Medium
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, llm-dev

## User Story
As a Conference Organizer,
I want to click on a response in the Recent Responses list to see all answers in a modal,
So that I can review individual feedback without leaving the overview page.

## Context
The admin overview page (STORY-045) shows recent responses but only displays IDs and timestamps. This story adds the ability to view the complete response by clicking "View", which opens a modal overlay showing all 19 questions and answers.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Individual response review capability
**Supporting Evidence**: Stakeholder interview identifying need for individual response review

## User Experience Design

### Modal Trigger
- User clicks "View" link on any response row in Recent Responses list
- Modal opens with smooth animation (Mantine default)
- Background is dimmed with overlay

### Modal Layout
```
┌─────────────────────────────────────────────────┐
│  Response #42                            [✕]   │
│  Submitted: Dec 2, 2025 2:34pm                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Q1: Overall Satisfaction                       │
│  ★★★★☆ (4 - Satisfied)                         │
│                                                 │
│  Q2: Session Quality                            │
│  ★★★★★ (5 - Very Satisfied)                    │
│                                                 │
│  Q3: Topics of Interest                         │
│  • AI/ML                                        │
│  • Cloud Architecture                           │
│  • DevOps Practices                             │
│                                                 │
│  Q4: Session Ranking                            │
│  1. Keynote                                     │
│  2. Workshop A                                  │
│  3. Panel Discussion                            │
│                                                 │
│  Q5: Additional Comments                        │
│  "Great conference! Would love more hands-on    │
│   workshops next year."                         │
│                                                 │
│  ... (scrollable for all 19 questions)          │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Elements:**
- Modal header: "Response #[ID]" with close button (X)
- Subheader: "Submitted: [formatted timestamp]"
- Scrollable body containing all 19 questions with answers
- Modal width: approximately 600px (centered)
- Modal max-height: 80vh with internal scroll

### Question Display by Type
- **Likert**: Star rating with numeric value and label
  - Example: `★★★★☆ (4 - Satisfied)`
  - Empty stars for unfilled portion
- **Multi-select**: Bulleted list of selected options
  - Example: `• AI/ML` (one per line)
- **Ranking**: Numbered list in rank order
  - Example: `1. Keynote` (one per line)
- **Open-ended**: Quoted text block
  - Example: `"Great conference!"`
  - Preserve line breaks in original response

### Unanswered Questions
- Display question text followed by italic "No response" text
- Example: `Q15: Additional Comments` followed by `No response`

### Close Behavior
- Click X button to close
- Click outside modal (on overlay) to close
- Press Escape key to close
- Focus returns to the "View" link that triggered the modal

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Open Response Modal**
- **Given** the organizer is on the admin overview page
- **When** they click "View" on a response in the Recent Responses list
- **Then** a modal opens with the response header showing ID and timestamp
- **And** the modal body shows all 19 questions with that respondent's answers

**Scenario 2: View Likert Response**
- **Given** the modal is open for a response
- **When** the organizer views a Likert-scale question
- **Then** the answer displays as star rating with numeric value and label
- **And** the star rating visually represents the selected value (e.g., 4 of 5 stars filled)

**Scenario 3: View Multi-Select Response**
- **Given** the modal is open for a response
- **When** the organizer views a multi-select question
- **Then** all selected options display as a bulleted list

**Scenario 4: View Ranking Response**
- **Given** the modal is open for a response
- **When** the organizer views a ranking question
- **Then** items display as a numbered list in the respondent's rank order

**Scenario 5: View Open-Ended Response**
- **Given** the modal is open for a response
- **When** the organizer views an open-ended question
- **Then** the full text response displays in a quoted block
- **And** line breaks from the original response are preserved

**Scenario 6: View Unanswered Question**
- **Given** the modal is open for a response
- **When** a question was not answered by the respondent
- **Then** the question displays with "No response" in italic text

**Scenario 7: Close Modal**
- **Given** the response modal is open
- **When** the organizer clicks the X button
- **Then** the modal closes
- **And** focus returns to the "View" link that opened the modal

**Scenario 8: Close Modal via Overlay**
- **Given** the response modal is open
- **When** the organizer clicks outside the modal (on the dimmed overlay)
- **Then** the modal closes

**Scenario 9: Close Modal via Escape**
- **Given** the response modal is open
- **When** the organizer presses the Escape key
- **Then** the modal closes

**Scenario 10: Scroll Long Response**
- **Given** the response has answers to all 19 questions
- **When** the modal content exceeds viewport height
- **Then** the modal body scrolls internally
- **And** the header remains fixed at top

### Non-Functional Requirements
- [ ] Performance: Modal opens within 500ms including data fetch
- [ ] Accessibility: Modal traps focus while open
- [ ] Accessibility: Close button has accessible label
- [ ] Accessibility: Screen reader announces modal opening
- [ ] Accessibility: Star ratings have text alternatives

### Quality Checklist
- [ ] All 19 questions render in correct order
- [ ] Each question type displays correctly (Likert, multi-select, ranking, open-ended)
- [ ] Unanswered questions show "No response"
- [ ] Modal scrolls correctly when content is long
- [ ] All three close methods work (X, overlay click, Escape)
- [ ] Focus management works correctly (trap while open, restore on close)

## Dependencies
- STORY-045: Admin Overview Page (provides the trigger location)
- Survey submission functionality from MVP iteration (existing)
- Database schema with response data (existing)

## Estimate
**Size**: S
**Confidence**: High

**Reasoning**: Single modal component with data fetch. Question display formatting is straightforward. Mantine modal component handles most interaction patterns.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-05
**Last Updated**: 2025-12-05
**Build Date**:
