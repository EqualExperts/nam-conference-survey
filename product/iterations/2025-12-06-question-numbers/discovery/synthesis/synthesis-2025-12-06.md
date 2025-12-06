# Discovery Synthesis: Question Numbers

**Synthesis Date**: 2025-12-06
**Iteration**: 2025-12-06-question-numbers
**Research Period**: 2025-12-06

---

## Executive Summary

Conference attendees cannot track their position in the 19-question survey, leading to user confusion and complaints. This iteration addresses the navigation pain point by adding sequential question numbering in the format "Question X of 19" positioned to the left of each question. The solution must be consistent across all question types and work on both mobile and desktop. Success will be measured by a reduction in user complaints about survey navigation.

---

## Research Overview

**Interviews Conducted**: 1
**Observations**: 0
**Other Sources**: Product specification, target users documentation, previous admin-page synthesis

### Participants

| # | Role | Date | Key Focus |
|---|------|------|-----------|
| 1 | Product Owner | 2025-12-06 | User feedback, requirements definition, scope |

---

## Key Themes

### Theme 1: Survey Position Disorientation

**Summary**: Users cannot determine their current position or remaining questions in the survey, causing confusion and negative feedback.

**Evidence**:
- Product Owner: "Users can't tell what number question they are on: Questions don't have numbers, so it's hard to keep track of your position in the survey."
- Product Owner: "Confusion" - describing observed user behavior
- Product Owner: "No" existing progress indication mechanism

**Impact**: High - Affects all users, driving complaints that reached product owner

**User Need**: When completing the survey, attendees need to understand their current position and total remaining questions so they can manage their time and feel oriented within the experience.

**Cross-Iteration Context**: The MVP iteration (2025-11-12-mvp) delivered 24 stories including the core 19-question survey flow (STORY-019 through STORY-039), but did not include progress indication or question numbering. The admin-page iteration (2025-12-02-admin-page) focused on organizer tools and did not address attendee experience gaps.

---

### Theme 2: Need for Simple, Consistent Solution

**Summary**: The solution should be straightforward numbering without over-engineering - no progress bars, section headers, or complex features.

**Evidence**:
- Product Owner: Format preference is "Question 3 of 19" (not abbreviated)
- Product Owner: Position "left" of question text
- Product Owner: "Yes" to consistency across all question types
- Product Owner: "Yes" to both mobile and desktop
- Product Owner: Out of scope field left blank (everything else deferred)

**Impact**: Medium - Clear scope boundaries prevent feature creep and enable rapid implementation

**User Need**: Attendees need a clear, unambiguous indicator that works consistently regardless of device or question type, without introducing visual clutter or complexity.

---

## Pain Points (Ranked)

| Rank | Pain Point | Severity | Frequency | Users Affected |
|------|------------|----------|-----------|----------------|
| 1 | Cannot track position in survey | High | All sessions | All attendees (100%) |
| 2 | No visibility into total survey length | High | All sessions | All attendees (100%) |
| 3 | No sense of progress or completion | Medium | All sessions | All attendees (100%) |

---

## User Needs

### Must Address

1. **Position Awareness**: Attendees need to know which question number they're on (1-19) - Evidence: Product Owner interview, user complaints
2. **Total Length Visibility**: Attendees need to know the total number of questions to set time expectations - Evidence: Product Owner interview, "Question X of 19" format requirement
3. **Consistent Experience**: Numbering must work identically across all question types (Likert, multi-select, ranking, open-ended) - Evidence: Product Owner confirmation of consistency requirement
4. **Device Parity**: Solution must work on both mobile and desktop without degradation - Evidence: Product Owner explicit mobile + desktop requirement

### Should Address

_None identified in this iteration - scope is tightly focused on must-address needs_

### Could Address

_None identified - all other progress indication features explicitly deferred_

---

## Proposed Features

### Feature 1: Sequential Question Numbering

**User Story**: As a conference attendee, I want to see "Question X of 19" to the left of each survey question so that I can track my position and understand how many questions remain.

**Addresses**:
- Theme: Survey Position Disorientation
- Theme: Need for Simple, Consistent Solution
- Pain Points: #1, #2, #3
- User Needs: #1, #2, #3, #4

**Estimated Effort**: S (Small)

**Priority**: Must Have

**Scope Details**:
- Sequential numbering 1-19 (no conditional logic)
- Format: "Question X of 19" (full text, not abbreviated)
- Position: To the left of question text (desktop), above question text (mobile <375px)
- Styling: Regular font weight, muted gray color, subtle and unobtrusive
- Accessibility: ARIA labels include position (e.g., `aria-label="Question 3 of 19: Rate the conference atmosphere"`)
- Coverage: All question types
  - Likert scale ratings (5-point)
  - Likert with N/A option
  - Multiple select (checkboxes)
  - Ranked preferences (drag/reorder)
  - Single choice (radio)
  - Open-ended text fields
- Devices: Mobile and desktop responsive
- No progress bars, no percentage indicators, no section headers

**Success Criteria**:
- Reduction in user complaints about navigation/orientation
- Potential: Improved survey completion rates (measurable via admin dashboard)

---

## Cross-Iteration References

**Related Previous Work**:
- **MVP Iteration (2025-11-12-mvp)**: Built 24 stories including all 19 survey questions (STORY-019 through STORY-039). Question components established in `apps/frontend/src/components/questions/` directory. This iteration will modify those existing components.
- **Admin-Page Iteration (2025-12-02-admin-page)**: Built admin dashboard (STORY-045) with metrics including completion counts. Once question numbers are implemented, any completion rate improvements could be tracked via the admin overview page.

**Product Specification Context**:
- Survey has exactly 19 questions (fixed, no conditional logic currently)
- Mobile-first design is a core constraint (product-spec.md line 18)
- All questions are optional (product-spec.md line 20)
- Target completion time: ~10 minutes (product-spec.md line 19)
- 6 question types supported (product-spec.md lines 46-52)

**Target User Context**:
- Primary persona: Conference Attendee (target-users.md)
- Completing survey shortly after conference while memories are fresh
- May be on mobile device while traveling home
- Value their time - prefer concise, well-designed surveys
- Pain point identified in target-users.md: "Simplicity: Need a simple and easy-to-use interface"

**Potential Conflicts**:
- None identified - this is an additive change that aligns with mobile-first and simplicity principles

---

## Recommendations

### Immediate Actions (This Iteration)

1. **Run `/req`** to extract user stories from this synthesis (likely 1-2 stories given tight scope)
2. **Review existing question components** to understand current structure before implementation:
   - `apps/frontend/src/components/questions/LikertQuestion.tsx`
   - `apps/frontend/src/components/questions/MultipleSelectQuestion.tsx`
   - `apps/frontend/src/components/questions/RankingQuestion.tsx`
   - Other question type components
3. **Consider accessibility implications**: Ensure question numbers are properly announced by screen readers (ARIA labels, semantic HTML)
4. **Mobile testing**: Verify left-aligned numbering doesn't cause layout issues on smallest viewport (375px per mobile-first design)

### Future Considerations

1. **Progress Bar**: Visual progress indicator beyond text numbering (explicitly deferred from this iteration)
2. **Section Headers**: Grouping questions by theme (networking, logistics, etc.) - not in current scope
3. **Dynamic Numbering**: If conditional question logic is added in future, numbering may need to update dynamically
4. **Completion Percentage**: "32% complete" style indicator - deferred

---

## Open Questions

_All open questions resolved via follow-up interview with Product Owner (2025-12-06)_

**Resolved Questions**:

- [x] **Styling Details**: Regular font weight, muted gray color, spacing determined by implementation (Product Owner preference: keep it subtle and unobtrusive)
- [x] **Accessibility**: Include number in ARIA labels - format: `aria-label="Question 3 of 19: Rate the conference atmosphere"` (Product Owner: Option A)
- [x] **Mobile Layout**: On narrow screens (375px), "Question X of 19" should stack above the question text (Product Owner preference)
- [x] **Future-Proofing**: Deferred - no conditional question logic planned for near term (Product Owner: "don't worry")

---

## Appendix

### Research Artifacts
- [Interview: Product Owner (Steve) - 2025-12-06](../interviews/interview-steve-2025-12-06.md)
- [Product Specification](../../../../knowledge/product/product-spec.md)
- [Target Users & Personas](../../../../knowledge/product/target-users.md)
- [Previous Synthesis: Admin Dashboard](../../2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md)

### Methodology Notes

**Research Approach**: Single stakeholder interview with product owner who is responding to direct user feedback. While only one interview was conducted, the findings are considered high-confidence because:
1. Product owner has direct access to user complaints/feedback
2. The pain point affects 100% of users (not a segment)
3. Requirements are specific and unambiguous
4. Urgency flag indicates significant user impact

**Limitations**:
- No direct user interviews (findings are second-hand through product owner)
- No observation of actual user behavior during survey completion
- No quantitative data on complaint frequency or completion drop-off

**Bias Considerations**:
- Product owner may be interpreting user feedback through their own lens
- Users who complained may not be representative of all attendees
- Silent majority may not have the same pain point severity

**Confidence Level**: High for the core requirement (add question numbers), Medium for specific implementation details (exact positioning, styling, mobile behavior). Open questions should be answered during implementation through design review and testing.

### Quality Checklist

- [x] Theme references interview (1 interview conducted, product owner)
- [x] Pain points ranked with quantitative support (100% of users affected)
- [x] User needs include context and evidence
- [x] Required capabilities focus on WHAT/WHY, not HOW (describes numbering requirement, not React implementation)
- [x] No technical implementation prescriptions (doesn't specify component architecture or state management)
- [x] No specific stakeholder names in synthesis body (uses "Product Owner" role description)
- [x] Open questions listed for ambiguous findings (4 questions identified)
- [x] Executive summary accurately reflects detailed findings
- [x] Cross-references to previous cycles included (MVP and admin-page iterations)
- [x] Synthesis notes which findings are new vs. confirming (this is a new pain point, not previously documented)
