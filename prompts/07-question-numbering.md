# Implementation Prompt: STORY-052 - Survey Question Numbering

## Objective

Implement sequential question numbering for all 19 survey questions to help conference attendees track their position and understand how many questions remain.

## User Story

**As a** Conference Attendee,
**I want to** see "Question X of 19" displayed for each survey question,
**So that** I can track my position in the survey and understand how many questions remain.

## Context

Users are experiencing confusion while completing the 19-question survey because there's no indication of their current position or total survey length. This is driving complaints and potentially impacting completion rates. This implementation adds sequential numbering in a clear, consistent format across all question types and devices.

## Technical Requirements

### Visual Design
- **Format**: "Question X of 19" (full text, not abbreviated like "3/19")
- **Desktop Layout**: Position to the left of question text
- **Mobile Layout** (<375px): Stack above question text
- **Styling**: Regular font weight, muted gray color, subtle and unobtrusive
- **Spacing**: Determined during implementation (keep readable but not dominant)

### Functional Requirements

1. **Sequential Numbering**: Display "Question 1 of 19" through "Question 19 of 19" for all questions
2. **Responsive Behavior**:
   - Desktop: Numbering appears to the left of question text
   - Mobile (<375px): Numbering stacks above question text
   - No horizontal scrolling on any viewport
3. **Consistency**: Same format and styling across all 6 question types:
   - Likert scale ratings (5-point)
   - Likert with N/A option
   - Multiple select (checkboxes)
   - Ranked preferences (drag/reorder)
   - Single choice (radio)
   - Open-ended text fields
4. **Accessibility**:
   - ARIA labels must include position: `aria-label="Question 3 of 19: [question text]"`
   - Screen readers should announce the question position
   - Keyboard navigation must remain unaffected

## Acceptance Criteria

### Scenario 1: Desktop Question Numbering
- **Given** a Conference Attendee accesses the survey on desktop
- **When** they view any of the 19 questions
- **Then** each question displays "Question X of 19" to the left of the question text
- **And** the numbering is sequential from 1 to 19

### Scenario 2: Mobile Question Numbering
- **Given** a Conference Attendee accesses the survey on mobile (<375px)
- **When** they view any of the 19 questions
- **Then** each question displays "Question X of 19" stacked above the question text
- **And** the layout adapts responsively without horizontal scrolling

### Scenario 3: Consistent Across Question Types
- **Given** a Conference Attendee is completing the survey
- **When** they encounter different question types
- **Then** all question types display numbering in the same format and position
- **And** the styling is consistent across all types

### Scenario 4: Screen Reader Accessibility
- **Given** a Conference Attendee using a screen reader
- **When** they navigate to any question
- **Then** the screen reader announces the position (e.g., "Question 3 of 19: Rate the conference atmosphere")
- **And** the ARIA label includes both position and question text

## Non-Functional Requirements

- **Performance**: Numbering renders immediately with no layout shift or delay
- **Accessibility**: WCAG 2.1 AA compliance maintained, keyboard navigation unaffected
- **Mobile**: Works on smallest viewport (375px), no horizontal scroll, touch targets unaffected
- **Usability**: Numbering is subtle and doesn't compete visually with question text

## Implementation Guidance

### Codebase Context
- **Location**: `apps/frontend/src/components/questions/` directory
- **Framework**: React 18 + TypeScript + Mantine UI v7
- **Existing Components**: Question components from STORY-020 through STORY-038
- **Tech Stack**: Vite, TypeScript, Mantine UI

### Suggested Approach
1. **Explore existing question components** to understand current structure
2. **Determine best implementation pattern**:
   - Option A: Create a shared wrapper component for all questions
   - Option B: Add numbering logic directly to each question component
   - Option C: Create a higher-order component or hook for numbering
3. **Implement responsive CSS** using Mantine's breakpoint system
4. **Update ARIA labels** to include position information
5. **Select appropriate Mantine gray color** from theme (e.g., `gray.6` or `gray.7`)
6. **Test across all question types** to ensure consistency

### Open Questions to Resolve During Implementation
- **Spacing**: Exact margin/padding between numbering and question text (use visual balance)
- **Color value**: Specific muted gray from Mantine theme (review theme.colors.gray)
- **Breakpoint**: Use Mantine's `xs` breakpoint or custom 375px media query

## Quality Checklist

Before marking complete, verify:
- [ ] Attendees can easily track their position in the survey
- [ ] All acceptance criteria scenarios work as described
- [ ] WCAG 2.1 AA compliance maintained (test with screen reader)
- [ ] Works across Chrome, Safari, Firefox, Edge
- [ ] Works on iOS, Android, desktop
- [ ] Numbering adapts gracefully on narrow screens (test at 375px)
- [ ] Consistent appearance across all 6 question types
- [ ] Visual hierarchy: Numbering is visible but secondary to question text
- [ ] No layout shift when numbering renders
- [ ] Keyboard navigation still works correctly

## Dependencies

- Existing question components in `apps/frontend/src/components/questions/`
- Mantine UI component library (already integrated)
- Question components from STORY-020 through STORY-038

## Success Criteria

The implementation is successful when:
1. All 19 questions show "Question X of 19" numbering
2. Desktop shows numbering to the left, mobile stacks above
3. All question types have consistent styling
4. Screen readers announce position with question text
5. No accessibility, performance, or responsive design regressions

---

**Story ID**: STORY-052
**Iteration**: 2025-12-06-question-numbers
**Estimated Size**: S (1-2 days)
**Story File**: `product/iterations/2025-12-06-question-numbers/stories/story-052-survey-question-numbering.md`
