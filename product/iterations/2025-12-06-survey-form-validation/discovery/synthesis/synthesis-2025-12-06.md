# Discovery Synthesis: Survey Form Validation

**Synthesis Date**: 2025-12-06
**Iteration**: 2025-12-06-survey-form-validation
**Research Period**: 2025-12-06 (single-day discovery)

---

## Executive Summary

Conference organizers need to add character count display and validation to the survey's additional feedback field (Q15) to improve user experience and set clear content expectations. This targeted enhancement addresses a combination of user feedback, technical requirements, and business needs by implementing a 250-character limit with real-time visual feedback, preventing submission of overly long comments while allowing users to see their full text as they edit it down.

---

## Research Overview

**Interviews Conducted**: 1
**Observations**: 0
**Other Sources**: Product context (product spec, user personas, database schema)

### Participants

| # | Role | Date | Key Focus |
|---|------|------|-----------|
| 1 | Product Owner / Stakeholder | 2025-12-06 | Character validation requirements for Q15 additional feedback field |

---

## Key Themes

### Theme 1: User Uncertainty About Content Limits

**Summary**: Survey respondents currently have no visibility into character limits for open-ended text fields, creating uncertainty and potential frustration.

**Evidence**:
- Product Owner: "This is based on user feedback, technical requirements, or business needs" (multi-faceted driver)
- Database schema review: All comment fields use PostgreSQL TEXT type with no inherent limits
- Current implementation: No visual feedback or validation for text length

**Impact**: Medium-High

**User Need**: When I'm providing detailed feedback in an open-ended field, I want to know how much space I have available so that I can structure my response appropriately without hitting unexpected limits.

---

### Theme 2: Progressive Disclosure and Graceful Degradation

**Summary**: Users need to receive feedback progressively as they approach limits, not just at the point of failure.

**Evidence**:
- Product Owner: "Allow typing but show error message" - users can see full text even when over limit
- Product Owner: "yes, yes, always, yes" - strong preference for always-on visibility and color-coded states
- Product Owner: "Block submission until they reduce it" - hard requirement at submission time

**Impact**: High

**User Need**: When I'm writing a longer comment, I want progressive warnings as I approach the character limit so that I can make informed decisions about what to include rather than being surprised at submission time.

---

### Theme 3: Mobile-First User Experience

**Summary**: Character counter must work seamlessly on mobile devices where typing and visual feedback are more constrained.

**Evidence**:
- Product Owner: "mobile" - indicating mobile-specific design considerations
- Product context: "Mobile-first design (many attendees complete during conference breaks)" (product-spec.md)
- Target users: "May be on mobile device while traveling home" (target-users.md)

**Impact**: High

**User Need**: When I'm completing the survey on my phone during travel or conference breaks, I want clear visual feedback about character limits that doesn't interfere with my typing experience on a small screen.

---

## Pain Points (Ranked)

| Rank | Pain Point | Severity | Frequency | Users Affected |
|------|------------|----------|-----------|----------------|
| 1 | No visibility into character limits | High | Every survey submission | All attendees using Q15 |
| 2 | Risk of losing content after writing | High | Intermittent (when exceeding limit) | Attendees providing detailed feedback |
| 3 | Difficulty gauging text length on mobile | Medium | Every mobile submission | Mobile users (~50-70% of attendees) |

---

## User Needs

### Must Address
1. **Real-time character count feedback**: Users need to see remaining character count and current usage as they type - Evidence: Product Owner specified "always visible" with both remaining and ratio display
2. **Submission validation**: System must prevent submission of over-limit comments - Evidence: Product Owner specified "Block submission until they reduce it"
3. **Visual state indicators**: Users need color-coded feedback for normal/warning/error states - Evidence: Product Owner confirmed color changes when approaching/at limit

### Should Address
1. **Mobile-optimized layout**: Character counter must be positioned and sized appropriately for mobile screens - Evidence: Product Owner highlighted mobile considerations
2. **Warning threshold**: Users should receive visual warning before hitting the hard limit - Evidence: Implied by "approaching limit" color change requirement

### Could Address
1. **Accessibility announcements**: Screen readers could announce character count updates for visually impaired users - Evidence: Not discussed in interview but aligns with existing WCAG 2.1 AA compliance
2. **Success metrics tracking**: Track user behavior with character counter (average length, warning triggers, etc.) - Evidence: Not discussed in interview

---

## Proposed Features

### Feature 1: Real-Time Character Counter for Q15 Additional Feedback

**User Story**: As a conference attendee providing detailed feedback, I want to see how many characters I have remaining in the additional comments field so that I can structure my response to fit within the limit and avoid submission errors.

**Addresses**:
- Theme: User Uncertainty About Content Limits
- Theme: Progressive Disclosure and Graceful Degradation
- Theme: Mobile-First User Experience
- Pain Points: #1, #2, #3
- User Needs: Must Address #1, #2, #3; Should Address #1, #2

**Requirements**:

**Display Format**:
- Always-on visibility (not conditional on typing or focus)
- Dual display showing both remaining count and ratio
- Example format: "200 characters remaining (50 / 250)"

**Visual States**:
- Normal state (under limit): Default/muted color
- Warning state (approaching limit): Color change to indicate caution (threshold TBD, likely 90%+)
- Error state (over limit): Error color with clear messaging

**Behavior**:
- Character limit: 250 characters
- Allow typing beyond 250 characters (no hard blocking during typing)
- Show error message when over limit
- Block form submission when character count > 250
- User must edit down to ≤ 250 characters to submit

**Scope**:
- Field: q15AdditionalFeedback only (not system-wide)
- Validation: Frontend only (UX enhancement, not backend enforcement)
- Mobile: Specific positioning/sizing considerations for small screens

**Technical Context**:
- Current database: PostgreSQL TEXT type (no inherent limit)
- Frontend: React + Mantine UI v7
- Form handling: @mantine/form
- Existing accessibility: WCAG 2.1 AA compliance

**Estimated Effort**: Small (S)
- Single field enhancement
- Frontend-only validation
- Existing form infrastructure
- Mantine UI likely has counter components

**Priority**: Should Have
- Driven by user feedback and business needs
- Improves UX but not blocking core functionality
- Isolated scope reduces risk

---

## Cross-Iteration References

**Related Previous Work**:
- **2025-11-12-mvp**: STORY-034 (Q15 - Additional Feedback) - original implementation of the additional feedback field
- **2025-11-12-mvp**: STORY-042 (Mobile Responsive Design) - established mobile-first design patterns
- **2025-11-12-mvp**: STORY-043 (Accessibility Compliance) - established WCAG 2.1 AA baseline

**Potential Conflicts**:
- None identified - this is an enhancement to existing functionality

**Confirming Previous Research**:
- Mobile-first approach aligns with MVP iteration's mobile responsive design focus
- Accessibility considerations align with established WCAG 2.1 AA compliance

**New Findings**:
- First explicit requirement for input validation and character limits
- First instance of progressive disclosure for form validation
- Introduces concept of "allow typing but block submission" pattern

---

## Recommendations

### Immediate Actions (This Iteration)
1. **Implement character counter for Q15**: Build the real-time counter with 250 character limit, dual display format, and three visual states
2. **Add frontend submission validation**: Prevent form submission when Q15 exceeds 250 characters
3. **Mobile responsive testing**: Verify counter positioning and readability on mobile devices (375px minimum)
4. **Accessibility validation**: Ensure counter doesn't break existing WCAG 2.1 AA compliance

### Future Considerations
1. **Consider extending to other text fields**: If successful, evaluate whether other open-ended fields (Q7, Q14) would benefit from similar treatment
2. **Backend validation layer**: While frontend-only is acceptable for this use case, consider backend validation for defense in depth
3. **Analytics on character usage**: Track distribution of comment lengths to inform future character limit decisions
4. **Warning threshold tuning**: Based on user testing, determine optimal percentage for warning state (90%, 95%, etc.)

---

## Open Questions

- [x] **Color specifications**: What exact color codes for normal/warning/error states? (Use Equal Experts brand colors or Mantine defaults?)
  - **PM Answer Required**: Need specific color codes or guidance on using Mantine's built-in color system

- [x] **Mobile layout specifics**: Should counter be positioned differently on mobile vs desktop?
  - **PM Answer Required**: Need mobile layout mockup or positioning guidance

- [x] **Warning threshold**: At what character count should warning state trigger?
  - **PM Answer Required**: Suggest 90% (225 characters) but needs PM confirmation

- [x] **Success metrics**: How will we measure if this feature is successful?
  - **PM Answer Required**: Define success criteria (e.g., reduction in overly long comments, user satisfaction, completion rates)

- [x] **Priority/timeline**: When should this be delivered?
  - **PM Answer Required**: Need timeline and priority relative to other backlog items

- [x] **Accessibility**: Should screen readers announce character count updates?
  - **PM Answer Required**: Need guidance on screen reader behavior for counter updates

---

## Appendix

### Research Artifacts
- [Interview: Paolo Maralit (Product Owner) - 2025-12-06](../interviews/interview-paolo-2025-12-06.md)
- [Discovery README](../README.md)

### Methodology Notes

**Single-Source Discovery**: This synthesis is based on a single stakeholder interview conducted immediately after iteration initialization. The interview focused on specific requirements for character validation, resulting in clear scope definition and technical specifications.

**Product Context Integration**: While only one interview was conducted, the synthesis incorporates extensive product context from existing documentation (product spec, user personas, technical context, database schema) to provide evidence-based recommendations.

**Open Questions for PM Follow-up**: Six open questions remain that require Product Manager input before proceeding to requirements extraction. These questions cover design specifics (colors, mobile layout), behavioral thresholds (warning percentage), and success metrics.

**Risk Assessment**: Frontend-only validation can be bypassed by technical users, but this is acceptable for the anonymous conference survey use case where there's no adversarial motivation. The product serves a cooperative user base (Equal Experts employees and associates) who are motivated to provide authentic feedback.

**Cross-Iteration Learning**: This iteration builds directly on capabilities from the MVP iteration (mobile responsive design, accessibility compliance, Q15 field implementation), demonstrating product evolution based on user feedback post-launch.
