# User Story: Progress Indicator

**Story ID**: STORY-017
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Should have
**Status**: Draft
**Labels**: 2025-11-12-mvp, release-2, usability, conference-attendee, mobile

## User Story

As a conference attendee completing the survey during a conference break,
I want to see my progress through the questions (e.g., "Question 5 of 19"),
So that I know how much remains, can manage my limited time effectively, and can decide whether to continue or pause.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 13 (Progress Indicator)
**User Need**: Time management and expectation-setting during completion
**Supporting Evidence**:
- Feature 13 implementation notes: "Question X of 19" progress indicator specified
- Sarah Aslanifar: "More than five minutes" threshold for abandonment - needs to know survey length
- Lauren Kessler: 10-minute maximum completion window - progress helps users pace themselves
- Theme 3: Mobile device constraints during in-conference completion - users on tight schedule during break

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Progress Display on First Question**
- **Given** I start the survey and view Question 1
- **When** the question page loads
- **Then** I see "Question 1 of 19" displayed prominently
- **And** the indicator is visible without scrolling
- **And** the format is exactly "Question X of 19" (not "Page 1/19" or other variations)

**Scenario 2: Progress Updates as User Advances**
- **Given** I am on Question 7 and click Next
- **When** Question 8 loads
- **Then** the progress indicator updates to "Question 8 of 19"
- **And** the update happens immediately (no delay or flash of old value)
- **And** screen reader announces the new question number

**Scenario 3: Progress on Final Question**
- **Given** I advance to the final question (Q19: Demographics)
- **When** the page loads
- **Then** the indicator shows "Question 19 of 19"
- **And** user understands this is the last question before submission

**Scenario 4: Mobile Visibility**
- **Given** I am completing the survey on a mobile device (375px width)
- **When** viewing any question
- **Then** the progress indicator is visible on screen
- **And** it does not overlap with question text or answer options
- **And** it remains visible if I scroll down to read long questions or transparency notes
- **And** font size is readable on small screen (minimum 14px)

**Scenario 5: Progress Persistence Across Navigation**
- **Given** I am on Question 10 and click Back to review previous answer
- **When** I navigate back to Question 9
- **Then** the progress indicator correctly shows "Question 9 of 19"
- **And** if I click Next again, it returns to "Question 10 of 19"

### Non-Functional Requirements

- [ ] **Visibility**: Progress indicator visible throughout survey completion without requiring scroll
- [ ] **Accessibility**: Screen reader announces question number when navigating ("Question 5 of 19")
- [ ] **Performance**: Progress updates instantly (< 100ms) with no visible lag
- [ ] **Consistency**: Format remains "Question X of 19" across all questions and devices
- [ ] **Usability**: Users can quickly glance at indicator to assess remaining time commitment

### Quality Checklist

- [ ] Progress indicator implemented on all 19 question pages
- [ ] Format exactly matches "Question X of 19" specification
- [ ] Mobile testing confirms visibility on phones (375px width minimum)
- [ ] Screen reader testing confirms proper announcement
- [ ] Visual position does not interfere with question content
- [ ] Progress visible when questions have long transparency notes requiring scroll

## Technical Notes

**Implementation Approach:**
- Render progress indicator as fixed or sticky positioned element at top of question container
- Track current question number in application state
- Update indicator when question number changes (via navigation or pagination)

**HTML Structure Example:**
```html
<div class="survey-question">
  <div class="progress-indicator" aria-live="polite">
    Question <span class="current-question">5</span> of <span class="total-questions">19</span>
  </div>

  <h2 class="question-text">How would you rate the networking opportunities?</h2>
  <p class="transparency-note">This helps us understand...</p>

  <!-- Answer options -->
</div>
```

**CSS Styling Considerations:**
```css
.progress-indicator {
  font-size: 14px; /* Minimum for readability */
  color: #6B7280; /* Gray - secondary information */
  margin-bottom: 16px;
  font-weight: 500; /* Slightly bold for prominence */
}

/* Mobile optimization */
@media (max-width: 768px) {
  .progress-indicator {
    font-size: 14px; /* Maintain size on mobile */
    position: sticky; /* Stays visible on scroll */
    top: 0;
    background-color: white; /* Ensure readability over content */
    padding: 8px 0;
    z-index: 10;
  }
}
```

**Accessibility Implementation:**
- Use `aria-live="polite"` on progress container so screen readers announce updates
- Include semantic text (not just "5/19" which is ambiguous)
- Ensure sufficient color contrast for gray text on white background (WCAG AA)

**State Management:**
- Current question number stored in application state
- Total questions (19) stored as constant
- Progress calculation: `currentQuestion / totalQuestions` for potential percentage bar (future enhancement)

## Design Notes

**Visual Positioning Options:**

**Option 1: Above Question Text (Recommended)**
```
[Question 5 of 19]  ← Progress indicator

How would you rate the networking opportunities?
This helps us understand what connection types matter most...

○ Option 1
○ Option 2
```

**Option 2: Header/Title Area**
```
[Survey Header with Logo]
[Question 5 of 19]  ← Progress in header

How would you rate...
```

**Recommended: Option 1**
- Tighter proximity to question content
- Easier to implement with sticky positioning on mobile
- Does not require header redesign

**Color and Typography:**
- Gray color (#6B7280 or similar) to indicate secondary information
- Font size: 14px (readable but not dominant)
- Font weight: 500 (medium) for slight prominence without overwhelming
- Margin: 8-16px bottom spacing from progress to question text

**Mobile Sticky Behavior:**
- Consider `position: sticky` so progress remains visible when scrolling long questions
- Ensures users always know their position even on small screens with scrolling

## Open Questions

- ✅ Should progress be sticky/fixed on scroll? **ANSWER**: Yes, sticky positioning preferred for mobile to maintain visibility
- ✅ Should we show percentage bar in addition to text? **ANSWER**: No, text-only for MVP; percentage bar is Release 3 or later enhancement
- ✅ Should progress include estimated time remaining (e.g., "~3 minutes left")? **ANSWER**: No, adds complexity and varies by user; simple question count sufficient for MVP

## Estimate

**Size**: XS (< 1 day)
**Confidence**: High

**Breakdown:**
- HTML/CSS implementation: 1-2 hours
- State management integration: 1-2 hours
- Accessibility testing (screen reader): 1 hour
- Mobile responsive testing: 1-2 hours
- Cross-browser testing: 1 hour

## Dependencies

- STORY-004 (Mobile-First Responsive Design) - provides base question rendering system
- Survey navigation/pagination system - need to track current question number

## Notes

### Why This Story is Should-Have (Release 2 Priority)

**Not Walking Skeleton (But High Value):**
- Survey functions completely without progress indicator
- Core data collection works fine without this feature
- However, significantly improves user experience and reduces anxiety

**High Value for Time-Sensitive Users:**
- Sarah's 5-minute abandonment threshold makes progress critical
- In-conference completion means users on tight break schedule
- Knowing "5 more questions" helps users decide to continue vs pause

**Low Implementation Effort:**
- XS-sized story (< 1 day)
- Simple state tracking and display logic
- No complex calculations or database changes

**Why Not Must-Have:**
- Survey works without it
- Other features (zero mandatory fields, transparency) more critical for completion
- Can be added quickly after walking skeleton if time permits

**Why Not Could-Have:**
- Significant usability improvement for legitimate use case (time management)
- Mobile completion amplifies need (smaller screen, harder to estimate length)
- Small effort for measurable UX benefit justifies Should-Have tier

### Design Decision Rationale

**Why "Question X of 19" Format:**
- Clear, unambiguous language (not "Page X" which could confuse)
- Provides both current position and total context
- Allows mental math for remaining time (if ~30 seconds per question, 10 remaining = ~5 minutes)

**Why Sticky Positioning on Mobile:**
- Mobile users more likely to scroll due to smaller viewport
- Progress info most valuable when user is mid-survey and uncertain about length
- Sticky position ensures always visible without requiring interaction

**Why No Percentage Bar for MVP:**
- Text-only simpler to implement and test
- Bar adds visual complexity without adding information value
- Can be added later as enhancement if user feedback indicates desire

### Future Enhancements (Post-MVP)

**Release 3 or Later:**
- Visual progress bar (e.g., 30% complete) in addition to text
- Estimated time remaining based on average completion rate
- Section indicators (e.g., "Networking Questions - 3 of 5")
- Option to jump to specific questions (requires save/edit functionality)

---

## For Issue Tracker Import

**Title**: Progress Indicator
**Description**:
As a conference attendee completing the survey during a conference break, I want to see my progress through the questions (e.g., "Question 5 of 19"), so that I know how much remains, can manage my limited time effectively, and can decide whether to continue or pause.

**Source**: Discovery cycle 2025-11-12-mvp, Feature 13 from synthesis; addresses time management need for completion-sensitive users like Sarah Aslanifar.

**Acceptance Criteria**: "Question X of 19" indicator visible on all questions, updates accurately as user navigates, mobile-friendly with sticky positioning, screen reader accessible.

**Labels**: 2025-11-12-mvp, release-2, usability, should-have
**Priority**: Should Have (Release 2)
**Story Points**: 1 (XS-sized, < 1 day)
