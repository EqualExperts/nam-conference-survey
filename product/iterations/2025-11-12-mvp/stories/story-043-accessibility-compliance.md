# User Story: Accessibility Compliance (WCAG 2.1 AA)

**Story ID**: 043
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, accessibility, inclusive-design

## User Story
As a Conference Attendee with disabilities,
I want the survey to be fully accessible using screen readers, keyboard navigation, and assistive technologies,
So that I can independently complete the survey and provide feedback without barriers.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**User Need**: Not explicitly stated in synthesis, but foundational requirement for inclusive conference experience
**Supporting Evidence**:
- Required System Capabilities (all areas) mention accessibility as non-functional requirement
- Equal Experts values inclusive practices across all organizational activities
- Legal compliance requirement in many jurisdictions (ADA, Section 508, European Accessibility Act)

## Design Reference
**Screenshots**: All 21 screenshots must be implemented accessibly
- Accessibility considerations apply to all screens from welcome through completion

**Design Notes**:
- Clean, high-contrast design supports visual accessibility
- Teal (#00BCD4) on white background must meet color contrast requirements
- Logical visual hierarchy supports screen reader navigation
- Form inputs have clear labels and purpose

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Screen Reader - Complete Survey Flow (VoiceOver iOS)**
- **Given** a Conference Attendee using VoiceOver on iPhone
- **When** navigating through entire survey from welcome to completion
- **Then** all page structure is announced logically (headings, lists, forms, buttons)
- **And** question text is announced as heading at appropriate level
- **And** transparency notes are announced as supplementary information
- **And** form inputs announce their labels, types, and current states
- **And** progress indicator announces current question number and percentage
- **And** "Next" button is clearly identified as interactive element
- **And** error messages (if any) are announced immediately

**Scenario 2: Screen Reader - Radio Button Question**
- **Given** a Conference Attendee using screen reader on Likert scale question
- **When** navigating radio button options
- **Then** each option announces its label (e.g., "5 - Excellent")
- **And** current selection state is announced ("selected" or "not selected")
- **And** radio button group is announced as group with total count
- **And** attendee can navigate options with arrow keys
- **And** Space bar selects focused option

**Scenario 3: Screen Reader - Checkbox Question**
- **Given** a Conference Attendee using screen reader on multiple select question
- **When** navigating checkboxes
- **Then** each checkbox announces its label
- **And** checked/unchecked state is announced
- **And** attendee can select/deselect with Space bar
- **And** multiple selections are clearly indicated

**Scenario 4: Keyboard Navigation - Full Survey**
- **Given** a Conference Attendee using only keyboard (no mouse)
- **When** completing survey from welcome to completion
- **Then** Tab key moves focus through all interactive elements in logical order
- **And** Shift+Tab moves focus backward
- **And** focus indicators are clearly visible on all elements (2px outline minimum)
- **And** Enter key activates buttons ("Start Survey", "Next")
- **And** Arrow keys navigate radio button options
- **And** Space bar selects checkboxes and radio buttons
- **And** no keyboard traps exist (focus can always move away from elements)

**Scenario 5: Focus Indicators Visibility**
- **Given** a Conference Attendee navigating with keyboard
- **When** Tab moves focus to any interactive element
- **Then** a visible focus indicator appears (outline or border)
- **And** focus indicator has minimum 2px width
- **And** focus indicator color has sufficient contrast with background (3:1 minimum)
- **And** focus indicator is not removed via CSS (`:focus { outline: none }` only if custom indicator provided)
- **And** focus remains visible during entire interaction

**Scenario 6: Color Contrast - Text Readability**
- **Given** a Conference Attendee with low vision or color blindness
- **When** viewing any survey page
- **Then** all body text meets WCAG AA contrast ratio (4.5:1 minimum)
- **And** large text (18pt+) meets WCAG AA contrast ratio (3:1 minimum)
- **And** teal header text on white background meets requirements
- **And** transparency notes (lighter text) still meet 4.5:1 ratio
- **And** interactive elements (buttons) meet 3:1 contrast with adjacent colors

**Scenario 7: Color Contrast - Interactive Elements**
- **Given** a Conference Attendee viewing form inputs and buttons
- **When** examining visual design
- **Then** button text meets 4.5:1 contrast with button background
- **And** button border (if used) meets 3:1 contrast with adjacent background
- **And** radio buttons and checkboxes visible against background (3:1 minimum)
- **And** focus indicators meet 3:1 contrast requirement
- **And** disabled states (if any) still meet contrast requirements or are clearly marked

**Scenario 8: Heading Hierarchy and Structure**
- **Given** a Conference Attendee using screen reader
- **When** navigating page structure
- **Then** each page has single h1 element (page title)
- **And** heading levels follow logical hierarchy (h1 > h2 > h3, no skipped levels)
- **And** question text uses appropriate heading level (h2 or h3)
- **And** headings provide clear page structure for screen reader navigation
- **And** "jump to heading" screen reader function works correctly

**Scenario 9: Form Labels and Instructions**
- **Given** a Conference Attendee using assistive technology
- **When** encountering form inputs
- **Then** all inputs have associated labels (using `<label for="">` or `aria-label`)
- **And** labels are programmatically associated (not just visual proximity)
- **And** placeholder text is not sole method of labeling
- **And** instructions and transparency notes are associated with inputs (aria-describedby)
- **And** required fields (if any) are clearly marked with visual and programmatic indicators

**Scenario 10: Alternative Text for Images and Icons**
- **Given** a Conference Attendee using screen reader
- **When** encountering images or icons (clipboard icon, checkmark icon)
- **Then** decorative images have empty alt text (alt="") to prevent announcement
- **And** functional images have descriptive alt text explaining purpose
- **And** icons conveying meaning have text alternatives
- **And** Equal Experts logo has appropriate alt text

**Scenario 11: Error Identification and Suggestions**
- **Given** a Conference Attendee encounters error (network failure, invalid input)
- **When** error occurs
- **Then** error message is announced immediately to screen readers (aria-live)
- **And** error message is visually distinct (color + icon, not color alone)
- **And** error text clearly identifies problem
- **And** error message suggests how to fix problem
- **And** focus moves to error message or problematic field

**Scenario 12: Skip Navigation Links**
- **Given** a Conference Attendee using keyboard navigation
- **When** survey page loads
- **Then** "Skip to main content" link is available as first focusable element
- **And** skip link is visually hidden but appears on focus
- **And** activating skip link moves focus past header to main content
- **And** this reduces navigation burden for keyboard users

**Scenario 13: Accessible Name for Interactive Elements**
- **Given** a Conference Attendee using screen reader
- **When** navigating to buttons, links, or form controls
- **Then** each element has clear, descriptive accessible name
- **And** "Next" button announces as "Next button" or "Continue to next question"
- **And** "Start Survey" button announces purpose clearly
- **And** radio buttons announce both option label and question context

**Scenario 14: Text Resize and Zoom**
- **Given** a Conference Attendee needs larger text for readability
- **When** increasing browser zoom to 200%
- **Then** all text remains visible and readable
- **And** no content is cut off or overlaps
- **And** horizontal scrolling is minimized
- **And** all functionality remains available
- **And** layout adapts gracefully to zoomed state

**Scenario 15: Screen Reader - Progress Indicator**
- **Given** a Conference Attendee using screen reader
- **When** navigating to new question
- **Then** progress indicator announces current position ("Question 5 of 19, 26% complete")
- **And** progress is announced without requiring explicit navigation to element
- **And** aria-live region provides automatic update announcements
- **And** progress information is available on demand

### Non-Functional Requirements
- [ ] Accessibility: WCAG 2.1 Level AA compliance (target: AAA where feasible)
- [ ] Accessibility: Color contrast ratios meet AA standards (4.5:1 for text, 3:1 for UI components)
- [ ] Accessibility: All functionality available via keyboard only
- [ ] Accessibility: Screen reader support (VoiceOver iOS, TalkBack Android, NVDA/JAWS Windows)
- [ ] Accessibility: Focus indicators visible and meet contrast requirements (3:1)
- [ ] Accessibility: Semantic HTML used throughout (proper headings, labels, landmarks)
- [ ] Accessibility: ARIA attributes used appropriately (not overused)
- [ ] Accessibility: No keyboard traps exist
- [ ] Legal compliance: Meets ADA, Section 508, European Accessibility Act requirements

### Quality Checklist
- [ ] Automated accessibility testing passed (axe DevTools, WAVE, Lighthouse)
- [ ] Manual screen reader testing completed (VoiceOver iOS/Mac, TalkBack Android, NVDA Windows)
- [ ] Keyboard navigation tested on all pages and interactions
- [ ] Color contrast verified using contrast checker tool (WebAIM Contrast Checker)
- [ ] Focus indicators verified visible and distinct on all interactive elements
- [ ] Heading hierarchy validated (no skipped levels, logical structure)
- [ ] Form labels programmatically associated with inputs
- [ ] Alternative text reviewed for all images and icons
- [ ] Text resize tested up to 200% zoom
- [ ] Error states tested with screen reader
- [ ] Skip navigation link tested
- [ ] ARIA attributes validated (no invalid or unnecessary ARIA)
- [ ] Semantic HTML validated (proper use of nav, main, article, section, etc.)
- [ ] Accessibility audit passed (internal or third-party review)

## Technical Notes
**WCAG 2.1 AA Key Requirements**:
1. **Perceivable**:
   - Text alternatives for non-text content (alt text)
   - Color contrast: 4.5:1 for normal text, 3:1 for large text
   - Text can be resized up to 200% without assistive technology

2. **Operable**:
   - All functionality available via keyboard
   - No keyboard traps
   - Focus indicators visible (3:1 contrast)
   - Skip navigation links

3. **Understandable**:
   - Reading level appropriate for general audience
   - Clear error messages with suggestions
   - Consistent navigation and labeling

4. **Robust**:
   - Valid HTML
   - Properly used ARIA
   - Compatible with assistive technologies

**Implementation Checklist**:
- Use semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, `<section>`, `<h1>-<h6>`, `<label>`, `<button>`)
- Add `lang` attribute to `<html>` element
- Use `<label>` elements for form inputs (not just placeholder text)
- Add `aria-describedby` for transparency notes
- Use `aria-live="polite"` for progress updates
- Use `aria-live="assertive"` for error messages
- Provide `role="alert"` for critical error messages
- Use `aria-label` or `aria-labelledby` for additional context
- Ensure focus order matches visual order
- Use `:focus-visible` for modern focus indicator styling
- Test with real assistive technology, not just automated tools

**Color Contrast Tool Recommendations**:
- WebAIM Contrast Checker
- Colour Contrast Analyser (CCA)
- Chrome DevTools Accessibility panel

**Screen Reader Testing**:
- iOS: VoiceOver (Settings > Accessibility > VoiceOver)
- Android: TalkBack (Settings > Accessibility > TalkBack)
- Windows: NVDA (free, open source)
- Mac: VoiceOver (Command + F5)

## Open Questions
- Should we provide a text-only version of survey for maximum compatibility?
- Should we add high-contrast mode toggle for users with severe visual impairments?
- Should we support alternate input methods (voice input, switch controls)?
- Should we provide survey in multiple languages for international attendees?

## Estimate
**Size**: M (3-5 days)
**Confidence**: High

**Reasoning**: Accessibility requires careful implementation during development plus significant testing with assistive technologies. Automated tools catch only ~30% of issues; manual testing essential.

**Breakdown**:
- Semantic HTML implementation and ARIA attributes: 1 day
- Focus indicator styling and keyboard navigation: 1 day
- Color contrast analysis and fixes: 0.5 day
- Screen reader testing and fixes (VoiceOver, TalkBack, NVDA): 2 days
- Automated testing and validation: 0.5 day
- Documentation of accessibility features: 0.5 day

## Dependencies
- Stories 019, 020, 021 (Welcome, Question, Completion screens) - provide base UI to make accessible
- Access to devices/software for screen reader testing (iPhone with VoiceOver, Android with TalkBack, Windows with NVDA)
- Color palette confirmation (Equal Experts brand colors meet contrast requirements)
