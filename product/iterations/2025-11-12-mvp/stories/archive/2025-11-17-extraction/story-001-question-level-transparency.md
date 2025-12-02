# User Story: Question-Level Transparency System

**Story ID**: STORY-001
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, transparency, conference-attendee, trust-building

## User Story

As a conference attendee (Andrew Shawcare persona),
I want to see a transparency note beneath each survey question explaining how that specific data will be used,
So that I understand the purpose and can provide appropriately contextualized feedback without feeling like my responses disappear into a "black hole."

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Theme 6 (Transparency Builds Trust)
**User Need**: "When I answer survey questions, I want to know how my specific response data will be used, so I understand the purpose and can provide appropriately contextualized answers"
**Supporting Evidence**:
- Andrew Shawcare interview: "For each question, there was, let's say, subtext underneath saying, what the data will be used for" (must-have requirement)
- Andrew Shawcare: Black hole effect - "It's just a black hole. You send it down the pipe. And it's unclear what happens to the survey or whether it was worth your time filling it out"
- Chris Condo: "Having a strategy for the survey is the most important thing" - understanding intended use shapes response quality

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Transparency Note Displayed - Happy Path**
- **Given** a conference attendee is viewing any survey question (Q1-Q19)
- **When** the question renders on screen
- **Then** a transparency note appears beneath the question text
- **And** the note explains specifically how that question's data will be used
- **And** the note is visually distinct (smaller text, lighter color) from the question itself

**Scenario 2: Transparency Note Content Accuracy**
- **Given** the survey is displaying Q1 (Overall Conference Rating)
- **When** I read the transparency note beneath Q1
- **Then** it states: "This helps leadership understand overall event quality and justify future investment in conferences"
- **And** the note accurately reflects the data usage per proposed-survey-questions.md specification

**Scenario 3: Mobile Rendering Preserves Readability**
- **Given** I am viewing the survey on a mobile device (375px width)
- **When** any question renders with its transparency note
- **Then** the transparency text remains readable (minimum 12px font)
- **And** no horizontal scrolling is required
- **And** adequate spacing exists between question and note

**Scenario 4: All Questions Include Transparency**
- **Given** I complete the entire 19-question survey
- **When** I progress through each question
- **Then** every single question (Q1-Q19) displays a transparency note
- **And** no question lacks the explanation of data usage

### Non-Functional Requirements

- [ ] **Performance**: Transparency notes load with question (no separate fetch), no perceptible delay
- [ ] **Accessibility**: Screen readers announce transparency text after question; marked with appropriate ARIA labels
- [ ] **Consistency**: All 19 transparency notes follow same visual pattern (font size, color, spacing)
- [ ] **Content Quality**: Notes use clear, jargon-free language; avoid corporate speak; match Equal Experts tone

### Quality Checklist

- [ ] All 19 questions display transparency note per proposed-survey-questions.md
- [ ] Transparency text matches specifications exactly (no improvisation)
- [ ] Visual hierarchy clear (question text primary, transparency text secondary)
- [ ] Mobile testing confirms readability on phones (iOS Safari, Android Chrome)
- [ ] Screen reader testing confirms accessibility
- [ ] Content reviewed by Katie Coleman for tone/accuracy

## Technical Notes

**Implementation Approach:**
- Transparency text stored in question data structure (not separate database table)
- Render as styled div/p tag beneath question element
- CSS class: `.transparency-note` with consistent styling

**Styling Specifications:**
- Font size: 85% of question text (e.g., 14px if question is 16px)
- Color: Gray (#6B7280 or similar) for visual de-emphasis
- Style: Italic or regular (test for readability)
- Margin: 8px top spacing from question, 16px bottom spacing to next element
- Max-width: Match question container width

**Content Source:**
- All transparency text defined in `/product/discovery/2025-11-12-mvp/observations/proposed-survey-questions.md`
- Copy exactly as specified - no paraphrasing
- Example Q1: "This helps leadership understand overall event quality and justify future investment in conferences."

**Accessibility Considerations:**
- Use `<p class="transparency-note" aria-label="Data usage explanation">` or similar semantic HTML
- Ensure screen readers announce after question text but before answer options
- Sufficient color contrast (gray on white must meet WCAG AA standards)

## Design Notes

**Visual Hierarchy:**
```
[Question Text - Bold, 16px, Dark Gray]
How would you rate your overall NAM Conference experience?

[Transparency Note - Regular, 14px, Medium Gray, Italic]
This helps leadership understand overall event quality and justify future investment in conferences.

[Answer Options - Radio buttons, 16px]
○ 5 - Excellent
○ 4 - Good
...
```

**Mobile Considerations:**
- Transparency text may wrap to multiple lines on narrow screens - acceptable
- Maintain minimum 12px font size even on smallest supported device (375px)
- Test on actual devices, not just browser resize

## Open Questions

- ✅ Should transparency text be collapsible to reduce visual clutter? **ANSWER**: No - always visible is critical per Andrew's requirement for upfront clarity
- ✅ Do we need translations for international attendees? **ANSWER**: No - North America conference is English-only per conference context

## Estimate

**Size**: S (1-2 days)
**Confidence**: High

**Breakdown:**
- Question data structure update: 2-4 hours
- Styling implementation: 2-4 hours
- Mobile responsive adjustments: 2-4 hours
- Accessibility testing and fixes: 2-4 hours
- Content verification (all 19 questions): 1-2 hours

## Dependencies

- STORY-004 (Mobile-First Responsive Design) - provides base question rendering system
- proposed-survey-questions.md - source of truth for transparency text content
- Equal Experts brand guidelines (if exist) for color/typography decisions

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Addresses Primary Pain Point:**
- Synthesis ranked "Survey Black Hole Effect" as #1 pain point (3 of 5 interviews)
- Andrew will skip surveys without transparency - this is a participation blocker
- Question-level (not just survey-level) transparency is the unique requirement

**Cultural Fit:**
- Aligns with Equal Experts values of openness and transparency
- Demonstrates genuine interest in improvement vs performative data collection
- Differentiator from Google Forms and other generic survey tools

**High-Value, Low-Effort:**
- S-sized effort (1-2 days) for significant trust-building impact
- No complex logic - primarily content display
- Reusable pattern across all 19 questions

### Design Decision Rationale

**Why Not Collapsible/Expandable:**
Andrew's requirement is for upfront clarity - "I want to know before I answer." Requiring interaction to reveal transparency undermines the trust-building goal.

**Why Smaller/Lighter Text:**
Balance between visibility and hierarchy - transparency is important but secondary to the question itself. Users should see it without it dominating the visual space.

**Why Beneath Question (Not Tooltip/Modal):**
Tooltips require hover (doesn't work on mobile). Modals require interaction (friction). Beneath-question placement is always visible, mobile-friendly, and low-friction.

---

## For Issue Tracker Import

**Title**: Question-Level Transparency System
**Description**:
As a conference attendee, I want to see a transparency note beneath each survey question explaining how that specific data will be used, so I understand the purpose and can provide appropriately contextualized feedback.

**Source**: Discovery cycle 2025-11-12-mvp, addressing "black hole effect" pain point from Andrew Shawcare and Sarah Aslanifar interviews.

**Acceptance Criteria**: See full criteria above - all 19 questions display transparency notes matching proposed-survey-questions.md specifications, with proper mobile rendering and accessibility compliance.

**Labels**: 2025-11-12-mvp, transparency, must-have, accessibility
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 3 (S-sized, 1-2 days)
