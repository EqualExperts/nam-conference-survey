---
name: LLM Developer
description: Streamlined stories with high-level acceptance criteria. Best for LLM-assisted development where the AI infers implementation details from context.
---

# User Story: Survey Question Numbering

**Story ID**: STORY-052
**Iteration**: 2025-12-06-question-numbers
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-12-06-question-numbers, conference-attendee, survey-experience, llm-dev

## User Story
As a Conference Attendee,
I want to see "Question X of 19" displayed for each survey question,
So that I can track my position in the survey and understand how many questions remain.

## Context
Users are experiencing confusion and disorientation while completing the 19-question survey because there is no indication of their current position or total survey length. This is driving user complaints and potentially impacting completion rates. The solution adds sequential numbering in a clear, consistent format across all question types and devices.

## Source
**Discovery Cycle**: 2025-12-06-question-numbers
**Synthesis Reference**: `product/iterations/2025-12-06-question-numbers/discovery/synthesis/synthesis-2025-12-06.md`
**User Need**: When completing the survey, attendees need to understand their current position and total remaining questions so they can manage their time and feel oriented within the experience.
**Supporting Evidence**: Product Owner reported user confusion and complaints. Pain point affects 100% of attendees. No existing progress indication mechanism in place.

## Design Reference
*(No design artifacts exist for this iteration)*

**Visual Requirements**:
- Format: "Question X of 19" (full text, not abbreviated like "3/19")
- Desktop: Position to the left of question text
- Mobile (<375px): Stack above question text
- Styling: Regular font weight, muted gray color, subtle and unobtrusive
- Spacing: Determined during implementation (keep readable but not dominant)

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Question Numbering on Desktop**
- **Given** a Conference Attendee accesses the survey on a desktop browser
- **When** they view any of the 19 questions
- **Then** each question displays "Question X of 19" to the left of the question text
- **And** the numbering is sequential from 1 to 19

**Scenario 2: Question Numbering on Mobile**
- **Given** a Conference Attendee accesses the survey on a mobile device (<375px width)
- **When** they view any of the 19 questions
- **Then** each question displays "Question X of 19" stacked above the question text
- **And** the layout adapts responsively without horizontal scrolling

**Scenario 3: Consistent Numbering Across Question Types**
- **Given** a Conference Attendee is completing the survey
- **When** they encounter different question types (Likert, multi-select, ranking, single choice, open-ended)
- **Then** all question types display numbering in the same format and position
- **And** the styling is consistent across all question types

**Scenario 4: Screen Reader Accessibility**
- **Given** a Conference Attendee using a screen reader
- **When** they navigate to any question
- **Then** the screen reader announces the question position (e.g., "Question 3 of 19: Rate the conference atmosphere")
- **And** the ARIA label includes both the position and question text

### Non-Functional Requirements
- [ ] Performance: Numbering renders immediately with no layout shift or delay
- [ ] Accessibility: ARIA labels include position format `aria-label="Question 3 of 19: [question text]"`, keyboard navigation unaffected, screen reader announces position
- [ ] Mobile: Responsive layout works on smallest viewport (375px), no horizontal scroll, touch targets unaffected
- [ ] Usability: Numbering is subtle (muted gray, regular weight) and doesn't compete visually with question text

### Quality Checklist
- [ ] User experience: Attendees can easily track their position in the survey
- [ ] All acceptance criteria scenarios work as described
- [ ] Accessible to users with disabilities (WCAG 2.1 AA compliance maintained)
- [ ] Works across common browsers (Chrome, Safari, Firefox, Edge) and devices (iOS, Android, desktop)
- [ ] Mobile-first design: Numbering adapts gracefully on narrow screens
- [ ] Consistent appearance across all 6 question types (Likert, Likert with N/A, multi-select, ranking, single choice, open-ended)
- [ ] Visual hierarchy: Numbering is visible but secondary to question text

## Open Questions
- **Spacing**: Exact margin/padding between numbering and question text (resolve during implementation based on visual balance)
- **Color value**: Specific muted gray color code (should align with existing Mantine UI theme grays)
- **Breakpoint**: Exact pixel width for mobile stacking behavior (synthesis mentions <375px, confirm if this should be a standard Mantine breakpoint like `xs`)

## Dependencies
- Existing question components in `apps/frontend/src/components/questions/` directory
- Question components built in MVP iteration:
  - STORY-020 through STORY-038 (all 19 survey questions)
- Mantine UI component library (already integrated)

## Estimate
**Size**: S
**Confidence**: High

**Reasoning**: This is a straightforward UI enhancement affecting existing components. The scope is clear (add numbering to 19 questions), implementation is additive (doesn't change existing logic), and question components already exist. Main work involves:
1. Adding numbering display to each question component (or creating a shared wrapper)
2. Responsive CSS for mobile stacking
3. ARIA label updates for accessibility
4. Testing across all question types and devices

Small size assumes question components have consistent structure that allows for shared numbering logic. If each component requires individual modification, could expand toward Medium.

## Metadata
**Iteration**: 2025-12-06-question-numbers
**Created**: 2025-12-06
**Last Updated**: 2025-12-06
**Build Date**: [Populated when status changes to Built]
