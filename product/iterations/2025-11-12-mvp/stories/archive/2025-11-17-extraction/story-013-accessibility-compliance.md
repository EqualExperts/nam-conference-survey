# User Story: Accessibility Compliance (WCAG 2.1 AA)

**Story ID**: STORY-013
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, accessibility, wcag, inclusive-design

## User Story

As a conference attendee using assistive technology,
I want the survey to be fully accessible via screen reader and keyboard navigation,
So that I can provide feedback independently without barriers or requiring assistance from others.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 15 (Accessibility Compliance)
**User Need**: Implicit requirement from Equal Experts values of inclusivity and professional standards
**Supporting Evidence**:
- Implementation notes: "Ensure accessibility - Screen reader compatibility, keyboard navigation"
- Testing checklist item: "Accessibility - Screen reader compatibility, keyboard navigation"
- Industry standard: WCAG 2.1 AA compliance is baseline for enterprise applications
- Equal Experts reputation: Demonstrating technical excellence and inclusive design values

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Screen Reader Announces All Content - Happy Path**
- **Given** a screen reader user (NVDA, JAWS, or VoiceOver) navigates to the survey
- **When** they progress through each question
- **Then** screen reader announces question text, question number, transparency note, and all answer options
- **And** required/optional status is announced for each question ("optional")
- **And** current progress is announced ("Question 5 of 19")

**Scenario 2: Keyboard Navigation Without Mouse**
- **Given** a user relies solely on keyboard navigation
- **When** they use Tab key to navigate through the survey
- **Then** all interactive elements receive focus in logical order (question 1 → answers → comment box → next button → question 2...)
- **And** focus indicators are clearly visible on all focused elements
- **And** Shift+Tab navigates backward through elements
- **And** Enter/Space key activates buttons and selections

**Scenario 3: Radio Button and Checkbox Navigation**
- **Given** a keyboard user is on a Likert scale question (radio buttons)
- **When** they Tab to the radio button group
- **Then** arrow keys navigate between radio options within the group
- **And** Space key selects the focused radio button
- **And** screen reader announces currently focused option and its state (selected/not selected)

**Scenario 4: Text Input Field Accessibility**
- **Given** a screen reader user encounters an optional comment box
- **When** they Tab to the text field
- **Then** screen reader announces field label, field type (text area), and optional status
- **And** placeholder text is announced (if present)
- **And** user can type and hear character echo/word echo based on screen reader settings

**Scenario 5: Error Message Accessibility (if validation errors exist)**
- **Given** a user encounters a validation error (edge case - should be rare with zero mandatory fields)
- **When** the error message appears
- **Then** screen reader immediately announces the error via ARIA live region
- **And** focus moves to the first field with an error
- **And** error message is programmatically associated with the field (aria-describedby)

**Scenario 6: Color Contrast Compliance**
- **Given** a user with low vision or color blindness
- **When** they view any survey element (text, buttons, focus indicators)
- **Then** all text meets minimum 4.5:1 contrast ratio (WCAG AA for normal text)
- **And** large text (18pt+) meets minimum 3:1 contrast ratio
- **And** focus indicators meet minimum 3:1 contrast against adjacent colors
- **And** information is never conveyed by color alone (e.g., required fields not just red)

**Scenario 7: Mobile Screen Reader (iOS VoiceOver)**
- **Given** a mobile screen reader user on iPhone
- **When** they swipe through survey questions
- **Then** VoiceOver announces all content in logical order
- **And** double-tap gesture activates selections
- **And** rotor navigation allows jumping between headings/form elements

### Non-Functional Requirements

- [ ] **WCAG 2.1 Level AA Compliance**: All Level A and AA success criteria met
- [ ] **Screen Reader Compatibility**: Tested with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)
- [ ] **Keyboard Navigation**: All functionality available via keyboard (no mouse-only actions)
- [ ] **Focus Management**: Visible focus indicators on all interactive elements (minimum 2px border, 3:1 contrast)
- [ ] **Semantic HTML**: Proper use of headings, landmarks, form labels, fieldsets

### Quality Checklist

- [ ] All form fields have associated `<label>` elements (explicit or implicit)
- [ ] Radio button groups wrapped in `<fieldset>` with `<legend>` for group label
- [ ] ARIA labels used where HTML labels insufficient (e.g., icon-only buttons)
- [ ] Logical heading structure (h1 → h2 → h3, no skipped levels)
- [ ] Landmark regions defined (navigation, main, form)
- [ ] Color contrast tested with tool (e.g., WebAIM Contrast Checker)
- [ ] Keyboard-only testing completed (unplug mouse, Tab through entire survey)
- [ ] Screen reader testing completed on desktop and mobile
- [ ] Focus indicators visible on all interactive elements
- [ ] No keyboard traps (user can Tab forward and backward freely)
- [ ] Skip links provided if header/navigation present ("Skip to survey questions")

## Technical Notes

**Semantic HTML Examples:**

```html
<!-- Question with fieldset/legend -->
<fieldset>
  <legend>
    <span class="question-number">Question 1 of 19</span>
    How would you rate your overall NAM Conference experience?
  </legend>
  <p class="transparency-note" aria-label="Data usage explanation">
    This helps leadership understand overall event quality and justify future investment.
  </p>

  <div role="radiogroup" aria-required="false">
    <label>
      <input type="radio" name="q1" value="5">
      <span>5 - Excellent</span>
    </label>
    <!-- ... other options -->
  </div>
</fieldset>

<!-- Optional comment box -->
<label for="q1-comment">
  Additional comments (optional)
  <textarea id="q1-comment" name="q1_comment" aria-required="false"></textarea>
</label>
```

**ARIA Attributes to Use:**
- `aria-required="false"` on all form fields (explicit optional status)
- `aria-label` or `aria-labelledby` for complex components
- `aria-describedby` to associate help text/errors with inputs
- `aria-live="polite"` for dynamic content updates (e.g., "Survey submitted successfully")
- `role="radiogroup"` for radio button collections
- `role="group"` for related form sections

**Focus Indicator Styles:**
```css
/* Visible focus indicator */
*:focus {
  outline: 2px solid #0066CC; /* Blue outline */
  outline-offset: 2px;
}

/* Enhanced focus for better visibility */
input:focus, textarea:focus, button:focus {
  outline: 3px solid #0066CC;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2);
}
```

**Color Contrast Requirements:**
- Question text (16px): Minimum 4.5:1 contrast against background
- Transparency note (14px): Minimum 4.5:1 contrast (gray must be dark enough)
- Button text: Minimum 4.5:1 contrast against button background
- Focus indicators: Minimum 3:1 contrast against adjacent colors
- Error messages: Must not rely on color alone (use icon + text)

**Skip Navigation Pattern:**
```html
<!-- At top of page, before header -->
<a href="#survey-start" class="skip-link">Skip to survey questions</a>

<!-- Target anchor -->
<main id="survey-start">
  <!-- Survey questions begin -->
</main>
```

**Keyboard Navigation Tab Order:**
1. Skip link (if present)
2. Survey header/title
3. Introduction text
4. Question 1 radio buttons (arrow keys navigate within group)
5. Question 1 comment box (if present)
6. Question 2 radio buttons...
7. Submit button
8. (After submission) Acknowledgment page content

## Design Notes

**Visual Focus Indicators:**
- Blue outline (brand color if available, otherwise standard blue #0066CC)
- 2-3px thickness for visibility
- Offset from element to avoid overlap with element border
- Sufficient contrast against both element and background

**Screen Reader Text Patterns:**
```
Question 1 of 19
How would you rate your overall NAM Conference experience?
Optional question
Data usage explanation: This helps leadership understand overall event quality...
5 - Excellent, radio button, not checked
4 - Good, radio button, not checked
[etc.]
```

**Mobile Touch Target Sizes:**
- Minimum 44x44px touch targets for radio buttons and checkboxes (WCAG 2.5.5)
- Adequate spacing between touch targets (minimum 8px)
- Button tap areas extend beyond visual button for easier activation

## Open Questions

- ✅ Do we need to support specific assistive technologies beyond screen readers? **ANSWER**: No - screen readers, keyboard navigation, and color contrast cover primary needs for MVP
- ✅ Should we provide a text-only version of survey? **ANSWER**: No - proper accessibility makes separate version unnecessary
- ✅ What WCAG level are we targeting? **ANSWER**: AA (industry standard for enterprise apps; AAA is aspirational but not required)

## Estimate

**Size**: M (3-5 days)
**Confidence**: Medium

**Breakdown:**
- Semantic HTML review and updates: 1 day (integrated into component development)
- ARIA attribute implementation: 1 day
- Focus indicator styling: 0.5 day
- Color contrast audit and fixes: 0.5 day
- Keyboard navigation testing and fixes: 1 day
- Screen reader testing (NVDA, JAWS, VoiceOver): 1 day
- Mobile accessibility testing (iOS VoiceOver): 0.5 day
- Documentation of accessibility features: 0.5 day

**Note:** Accessibility is integrated into all feature development, not a separate phase. This estimate represents dedicated accessibility review, testing, and fixes after initial implementation.

## Dependencies

- All UI stories (STORY-001 through STORY-010) - accessibility applies to all components
- STORY-004 (Mobile-First Responsive Design) - touch target sizes and mobile screen reader support
- Equal Experts brand guidelines (if exist) - may specify accessible color palette

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Legal and Ethical Obligation:**
- ADA compliance increasingly enforced for digital properties
- Equal Experts values inclusivity - inaccessible survey contradicts brand
- Conference attendees may use assistive technology - cannot exclude participation

**Professional Credibility:**
- Equal Experts consultants expect high technical standards
- Inaccessible survey reflects poorly on technical capabilities
- Demonstrates "practice what we preach" for client engagements

**Better User Experience for All:**
- Keyboard navigation benefits power users (faster than mouse for some tasks)
- Clear focus indicators help all users track position
- Semantic HTML improves SEO and discoverability
- High color contrast benefits users in bright environments or with aging vision

### Design Decision Rationale

**Why WCAG 2.1 AA (Not AAA):**
AA is industry standard and achievable within MVP timeline. AAA has stricter requirements (7:1 contrast) that may conflict with brand colors. AA provides meaningful accessibility without unrealistic constraints.

**Why Integrated (Not Retrofit):**
Building accessibility into initial development is more efficient than retrofitting. Semantic HTML and ARIA attributes are easier to implement from the start. Separate "accessibility pass" catches issues but creates rework.

**Why Screen Reader Focus (Not Just Visual):**
Screen reader users are most significantly impacted by inaccessible web apps. Visual-only accessibility (color contrast) is necessary but not sufficient. Screen reader compatibility requires programmatic structure (ARIA, semantic HTML).

**Why Manual Testing (Not Just Automated Tools):**
Automated tools (aXe, Lighthouse) catch ~30-40% of accessibility issues. Actual screen reader testing reveals usability issues that tools miss (e.g., verbose announcements, illogical navigation). Manual testing with real assistive technology is essential.

### Testing Strategy

**Automated Testing Tools:**
- aXe DevTools (browser extension) - catches common WCAG violations
- Lighthouse (Chrome DevTools) - accessibility score and specific issues
- WAVE (WebAIM) - visual feedback on accessibility issues

**Manual Testing Checklist:**
1. Keyboard navigation: Unplug mouse, Tab through entire survey
2. Screen reader (desktop): Test with NVDA or JAWS on Windows, VoiceOver on macOS
3. Screen reader (mobile): Test with VoiceOver on iOS
4. Color contrast: Use WebAIM Contrast Checker on all text/background combinations
5. Zoom: Test at 200% zoom (WCAG requirement for low vision users)
6. Focus indicators: Verify visible on all interactive elements

**Screen Reader Test Script:**
1. Navigate to survey homepage with screen reader enabled
2. Progress through all 19 questions using only keyboard
3. Verify question text, transparency notes, and options are announced
4. Select answers using keyboard and verify announcements
5. Submit survey and verify acknowledgment page is accessible
6. Document any confusing announcements or navigation issues

---

## For Issue Tracker Import

**Title**: Accessibility Compliance (WCAG 2.1 AA)

**Description**:
As a conference attendee using assistive technology, I want the survey to be fully accessible via screen reader and keyboard navigation, so I can provide feedback independently without barriers.

**Source**: Discovery cycle 2025-11-12-mvp, addressing implementation requirements for inclusive design and Equal Experts values.

**Acceptance Criteria**: See full criteria above - screen reader compatibility (NVDA, JAWS, VoiceOver), full keyboard navigation, WCAG 2.1 AA color contrast, ARIA labels, visible focus indicators, semantic HTML structure.

**Labels**: 2025-11-12-mvp, accessibility, wcag, must-have
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 5 (M-sized, 3-5 days integrated into component development)
