# Iteration Discovery: 2025-12-06-survey-form-validation

**Started**: 2025-12-06
**Focus**: Describing the total number characters applicable for additional comments field
**Status**: Active

## Goals
Add character count display and validation for the additional comments field in the survey form to improve user experience and set clear expectations.

**Specific objectives:**
- Implement 250 character limit with real-time feedback
- Provide clear visual indicators (remaining count + ratio)
- Block form submission when limit is exceeded
- Ensure mobile-friendly implementation

## Research Methods
- [x] AI-guided stakeholder interview (Paolo Maralit, 2025-12-06)
- [ ] Technical observations (current form implementation)
- [ ] Additional research as needed

## Timeline
- **Start**: 2025-12-06
- **Target synthesis**: TBD
- **Interview completed**: 2025-12-06

## Key Decisions

### Scope
- **Field**: q15AdditionalFeedback (additional comments) only
- **Limit**: 250 characters
- **Validation**: Frontend only (UX enhancement, not security enforcement)

### UX Behavior
- **Display**: Always-on counter showing both "X characters remaining" and "(Y / 250)" format
- **Visual states**: Color changes for normal/warning/error states
- **Over-limit behavior**: Allow typing but show error message
- **Submission**: Block until character count ≤ 250

### Implementation Constraints
- Frontend validation only
- Mobile-specific design considerations required
- No backend enforcement needed

## Notes

**Drivers**: Multi-faceted requirement driven by user feedback, technical requirements, and business needs.

**Risk**: Frontend-only validation can be bypassed by technical users, but this is acceptable for the conference survey use case.

**Open questions**:
- Exact color codes for visual states
- Mobile layout specifics
- Warning threshold percentage
- Success metrics
- Priority/timeline
