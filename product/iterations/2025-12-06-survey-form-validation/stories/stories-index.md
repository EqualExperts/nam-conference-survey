# Stories Index: Survey Form Validation

**Iteration**: 2025-12-06-survey-form-validation
**Created**: 2025-12-06
**Template**: LLM Developer
**Granularity**: Standard

---

## Summary

**Total Stories**: 1
**Total Estimated Effort**: S (1-2 days)

### Priority Breakdown
- **Must Have**: 0 stories
- **Should Have**: 1 story
- **Could Have**: 0 stories
- **Won't Have**: 0 stories

### Size Distribution
- **XS**: 0 stories
- **S**: 1 story
- **M**: 0 stories
- **L**: 0 stories
- **XL**: 0 stories

---

## Stories

| ID | Title | Priority | Size | Status |
|----|-------|----------|------|--------|
| STORY-052 | Character Counter for Q15 Additional Feedback Field | Should have | S | Draft |

---

## Story Details

### STORY-052: Character Counter for Q15 Additional Feedback Field
**File**: `story-052-character-counter-q15.md`
**Priority**: Should have
**Size**: S
**Status**: Draft

**Summary**: Add real-time character counter to Q15 additional feedback field with 250 character limit, dual display format (remaining + ratio), three visual states (normal/warning/error), and form submission validation.

**Addresses**:
- User Uncertainty About Content Limits
- Progressive Disclosure and Graceful Degradation
- Mobile-First User Experience

**Key Features**:
- Always-on character counter display
- Visual state changes (normal/warning/error)
- Allow typing beyond limit but block submission
- Mobile-responsive design
- Frontend-only validation

**Dependencies**:
- STORY-034 (Q15 Additional Feedback field from MVP)
- Mantine UI v7
- @mantine/form

---

## Open Questions (Iteration Level)

These questions apply across the iteration and should be resolved before development:

1. **Color specifications**: Determine exact color codes for normal/warning/error states (Equal Experts brand vs Mantine defaults)
2. **Warning threshold**: Confirm percentage/count for warning state trigger (suggested: 90% = 225 chars)
3. **Mobile layout**: Define mobile-specific positioning for character counter
4. **Screen reader behavior**: Specify announcement frequency for accessibility

---

## Notes

**Iteration Focus**: This iteration addresses a focused UX enhancement based on user feedback post-MVP launch. The single story reflects the narrow scope (one field) and clear requirements gathered during discovery.

**Template Choice**: LLM Developer template selected for streamlined development with Claude Code or similar AI-assisted workflows.

**Granularity**: Standard granularity appropriate for this focused enhancement—one logical user-facing capability becomes one story.

**Risk Assessment**: Frontend-only validation is acceptable for this cooperative use case (conference survey). Future iterations could add backend validation for defense-in-depth if needed.
