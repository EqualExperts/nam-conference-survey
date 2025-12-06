---
name: LLM Developer
description: Streamlined stories with high-level acceptance criteria. Best for LLM-assisted development where the AI infers implementation details from context.
---

# User Story: Character Counter for Q15 Additional Feedback Field

**Story ID**: STORY-052
**Iteration**: 2025-12-06-survey-form-validation
**Priority**: Should have
**Status**: Draft
**Labels**: 2025-12-06-survey-form-validation, conference-attendee, form-validation, llm-dev

## User Story
As a Conference Attendee providing detailed feedback,
I want to see a real-time character counter on the additional comments field (Q15),
So that I can structure my response to fit within the 250 character limit and avoid submission errors.

## Context
Survey respondents currently have no visibility into character limits for the Q15 additional feedback field, creating uncertainty and potential frustration. This enhancement addresses user feedback, technical requirements, and business needs by implementing a 250-character limit with progressive visual feedback. Users need to know how much space they have available as they type, with clear warnings before hitting the limit, not just at the point of failure.

## Source
**Discovery Cycle**: 2025-12-06-survey-form-validation
**Synthesis Reference**: `product/iterations/2025-12-06-survey-form-validation/discovery/synthesis/synthesis-2025-12-06.md`
**User Need**: When I'm providing detailed feedback in an open-ended field, I want to know how much space I have available so that I can structure my response appropriately without hitting unexpected limits.
**Supporting Evidence**: Product Owner interview identified this as driven by user feedback, technical requirements, and business needs. Current database uses PostgreSQL TEXT type with no inherent limits.

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Character Counter Display (Under Limit)**
- **Given** the Conference Attendee is on the survey page with Q15 additional feedback field
- **When** they begin typing or the field contains text under 250 characters
- **Then** the character counter displays both remaining characters and ratio (e.g., "200 characters remaining (50 / 250)")
- **And** the counter is always visible (not dependent on focus or typing state)
- **And** the counter displays in a normal/default color state

**Scenario 2: Warning State (Approaching Limit)**
- **Given** the Conference Attendee has typed text in Q15
- **When** the character count approaches the 250 limit (e.g., 225+ characters or 90%+)
- **Then** the character counter changes color to indicate a warning state
- **And** the counter continues to show remaining characters and ratio
- **And** typing is still allowed

**Scenario 3: Error State (Over Limit)**
- **Given** the Conference Attendee has typed text in Q15
- **When** the character count exceeds 250 characters
- **Then** the character counter changes color to indicate an error state
- **And** the counter shows negative remaining characters (e.g., "-5 characters remaining (255 / 250)")
- **And** typing is still allowed (no hard blocking during input)
- **And** an error message is displayed indicating the limit has been exceeded

**Scenario 4: Form Submission Validation (Over Limit)**
- **Given** the Conference Attendee has completed the survey
- **When** they attempt to submit the form while Q15 contains more than 250 characters
- **Then** form submission is blocked
- **And** a clear validation error is shown near the Q15 field
- **And** the character counter remains in error state
- **And** the user must reduce the character count to ≤ 250 to proceed

**Scenario 5: Form Submission Validation (Within Limit)**
- **Given** the Conference Attendee has completed the survey
- **When** they attempt to submit the form while Q15 contains ≤ 250 characters
- **Then** the form submits successfully
- **And** no validation errors are shown related to Q15

**Scenario 6: Empty Field**
- **Given** the Conference Attendee has not entered text in Q15
- **When** the field is empty
- **Then** the character counter displays "250 characters remaining (0 / 250)"
- **And** the counter is in normal state
- **And** the field remains optional (no requirement to fill)

### Non-Functional Requirements
- [ ] Performance: Counter updates in real-time as user types with no noticeable lag
- [ ] Accessibility: Counter is keyboard navigable and screen reader friendly (announces character count appropriately)
- [ ] Mobile: Counter is clearly visible and appropriately positioned on phone screens (375px+) without interfering with typing
- [ ] Usability: Visual states (normal/warning/error) use clear color differentiation and maintain sufficient contrast
- [ ] Usability: Error messages are clear and actionable ("Please reduce your comment to 250 characters or fewer")
- [ ] Browser Compatibility: Works across common browsers (Chrome, Firefox, Safari, Edge)

### Quality Checklist
- [ ] User experience matches design intent (always-on visibility, dual display format)
- [ ] All acceptance criteria scenarios work as described
- [ ] Character count is accurate (counts actual characters, not bytes)
- [ ] Visual states transition smoothly between normal/warning/error
- [ ] Accessible to users with disabilities (WCAG 2.1 AA compliance maintained)
- [ ] Works across common browsers and devices
- [ ] Mobile responsive design verified on small screens
- [ ] Form submission validation prevents over-limit submissions
- [ ] Error messages are helpful and user-friendly
- [ ] Integration with existing Mantine UI form components

## Open Questions
- **Color codes for visual states**: Should we use Equal Experts brand colors (#1795d4, #22567c) or Mantine's default color system for normal/warning/error states?
- **Warning threshold**: At what character count should the warning state trigger? (Synthesis suggests 90% = 225 characters, but not confirmed)
- **Mobile layout specifics**: Should the counter be positioned differently on mobile vs desktop? (e.g., below field vs to the right)
- **Screen reader announcements**: How frequently should screen readers announce character count updates? (every keystroke, every 10 characters, only at thresholds?)

## Dependencies
- Existing Q15 Additional Feedback field (STORY-034 from MVP iteration)
- @mantine/form form handling library
- Mantine UI v7 component library

## Estimate
**Size**: S
**Confidence**: High

**Reasoning**: This is a focused, single-field enhancement with clear requirements. Frontend-only validation reduces complexity. Mantine UI likely has built-in components or utilities for character counters. Main work involves:
- Implementing character count logic and state management
- Styling three visual states (normal/warning/error)
- Adding form submission validation
- Mobile responsive adjustments
- Accessibility testing

Estimate assumes familiarity with React, Mantine UI, and existing codebase patterns. The scope is well-defined and isolated to one field, making it a straightforward 1-2 day task.

## Metadata
**Iteration**: 2025-12-06-survey-form-validation
**Created**: 2025-12-06
**Last Updated**: 2025-12-06
**Build Date**: [YYYY-MM-DD - populated when status changes to Built]
