# Stories Index: Question Numbers Iteration

**Iteration**: 2025-12-06-question-numbers
**Created**: 2025-12-06
**Status**: Draft

---

## Summary

**Total Stories**: 1
**Total Effort**: S (1-2 days estimated)

### By Priority
- **Must Have**: 1
- **Should Have**: 0
- **Could Have**: 0
- **Won't Have**: 0

### By Size
- **XS**: 0
- **S**: 1
- **M**: 0
- **L**: 0
- **XL**: 0

---

## Stories

| ID | Title | Priority | Size | Status |
|----|-------|----------|------|--------|
| STORY-052 | Survey Question Numbering | Must have | S | Draft |

---

## Story Details

### STORY-052: Survey Question Numbering
**File**: `story-052-survey-question-numbering.md`
**Priority**: Must have
**Size**: S
**Persona**: Conference Attendee
**Feature Area**: Survey Experience

**Summary**: Add sequential question numbering ("Question X of 19") to all 19 survey questions to help users track their position and reduce confusion. Numbering appears to the left on desktop, stacked above on mobile, with consistent styling across all question types.

**Key Requirements**:
- Format: "Question 1 of 19" through "Question 19 of 19"
- Desktop: Left of question text
- Mobile (<375px): Above question text
- Styling: Regular weight, muted gray color
- Accessibility: ARIA labels include position
- Consistency: All 6 question types

**Dependencies**:
- Existing question components (STORY-020 through STORY-038)
- Mantine UI component library

---

## Iteration Context

**Business Driver**: User complaints about inability to track position in survey, causing confusion and potentially impacting completion rates.

**User Need**: Conference attendees need to understand their current position (1-19) and remaining questions to manage their time and feel oriented within the survey experience.

**Success Metric**: Reduction in user complaints about navigation/orientation. Potential improvement in survey completion rates (measurable via admin dashboard).

**Scope Boundaries**:
- **In scope**: Question numbering with clear format, responsive layout, accessibility
- **Out of scope**: Progress bars, percentage indicators, section headers, conditional logic

---

## Notes

- This iteration has tight, focused scope - single story addresses the entire user need
- Standard granularity: Logical user-facing capability (survey numbering) as one story
- LLM Developer template: Streamlined for AI-assisted implementation
- High confidence estimate due to clear requirements and additive nature of change
- No design artifacts provided - visual requirements documented in synthesis
- All open questions from synthesis have been resolved via follow-up interview
