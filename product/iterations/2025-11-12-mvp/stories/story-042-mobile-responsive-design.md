# User Story: Mobile-Responsive Design for In-Conference Completion

**Story ID**: 042
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, mobile-optimization, accessibility

## User Story
As a Conference Attendee,
I want the survey to work seamlessly on my mobile phone during conference breaks,
So that I can complete it quickly and comfortably without struggling with tiny text, awkward layouts, or difficult touch targets.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**User Need**:
- Need 2 (Efficiency need) - "When I complete a survey, I want to provide authentic feedback efficiently"
**Supporting Evidence**:
- Conference Planner: "I always prefer to fill it out, like, while I'm there at the end of the day" - indicates in-conference completion on mobile
- Senior Consultant: Prefers computer for long-form but mobile acceptable for multiple choice
- Product Manager: Target 90-95% response rate achievable through "in-conference scheduled activity" - implies mobile completion during breaks
- Capability Area 7: "Mobile-first responsive design optimizing for phone completion during breaks"

## Design Reference
**Screenshots**: All screenshots show mobile-optimized layout
- `product/design/2025-11-12-mvp/screenshots/01-welcome-screen.png` through `21-completion-screen.png`

**Design Notes**:
- Mobile-first design visible across all 21 screenshots
- Single-column layout with centered content cards
- Large touch targets for buttons and input elements
- Readable font sizes without zoom required
- Minimal scrolling per question screen
- Responsive teal header that scales appropriately
- White space ensures clean, uncluttered mobile experience

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Survey Loads on Mobile Phone (320px width)**
- **Given** a Conference Attendee opens survey link on mobile phone (iPhone SE 320px width)
- **When** any survey page loads (welcome, question, completion)
- **Then** all content fits within viewport width without horizontal scrolling
- **And** text remains readable at default zoom level (no pinch-zoom required)
- **And** images and icons scale appropriately
- **And** layout adapts to narrow width with single-column design

**Scenario 2: Touch Targets Meet Accessibility Standards**
- **Given** a Conference Attendee is completing survey on mobile phone
- **When** interacting with any input element (button, radio button, checkbox, text field)
- **Then** all touch targets are minimum 44x44px (iOS Human Interface Guidelines)
- **And** adequate spacing exists between adjacent touch targets (8px minimum)
- **And** attendee can accurately tap intended element without accidental adjacent taps
- **And** buttons provide visual feedback on touch (pressed state)

**Scenario 3: Text Readability on Mobile**
- **Given** a Conference Attendee views survey on mobile phone
- **When** reading question text, transparency notes, and instructions
- **Then** body text is minimum 16px font size (prevents auto-zoom on iOS)
- **And** heading text is proportionally larger (20-24px)
- **And** transparency notes in italics remain readable (14-16px minimum)
- **And** line height provides comfortable reading (1.5-1.6 line spacing)
- **And** line length does not exceed 70 characters for readability

**Scenario 4: Keyboard Display for Text Input**
- **Given** a Conference Attendee taps into text area or text field on mobile
- **When** the input field receives focus
- **Then** mobile keyboard appears automatically
- **And** viewport adjusts so focused field remains visible above keyboard
- **And** attendee can see what they're typing without keyboard obscuring field
- **And** "Done" or "Next" keyboard action button navigates appropriately

**Scenario 5: Portrait and Landscape Orientation**
- **Given** a Conference Attendee rotates phone between portrait and landscape
- **When** orientation changes
- **Then** layout adapts smoothly without breaking or requiring reload
- **And** content remains accessible and readable in both orientations
- **And** touch targets remain appropriate size
- **And** no content is cut off or hidden

**Scenario 6: Tablet View (768px - 1024px width)**
- **Given** a Conference Attendee uses iPad or Android tablet
- **When** survey loads
- **Then** layout scales appropriately for larger screen
- **And** content cards have maximum width (e.g., 600-800px) and center on screen
- **And** white space on sides prevents overly wide text lines
- **And** touch targets remain appropriate for tablet use

**Scenario 7: Desktop View (> 1024px width)**
- **Given** a Conference Attendee accesses survey on laptop or desktop
- **When** survey loads
- **Then** content cards have maximum width and center on screen
- **And** layout remains clean and focused (not stretched to full width)
- **And** mouse hover states work for buttons and interactive elements
- **And** keyboard navigation works (Tab, Enter, Arrow keys)

**Scenario 8: Progress Bar on Mobile**
- **Given** a Conference Attendee views progress indicator on mobile
- **When** navigating through questions
- **Then** progress bar adapts to mobile width
- **And** "Question X of 19" text remains legible
- **And** percentage complete is visible
- **And** progress bar fills proportionally

**Scenario 9: Next Button Accessibility on Mobile**
- **Given** a Conference Attendee reaches end of question content on mobile
- **When** ready to proceed to next question
- **Then** "Next" button is visible without scrolling down
- **And** button is positioned within comfortable thumb reach (bottom third of screen)
- **And** button is large enough to tap easily (minimum 44x44px)
- **And** button provides clear visual feedback on tap

**Scenario 10: Loading States on Mobile Connection**
- **Given** a Conference Attendee is on mobile cellular or conference WiFi
- **When** navigating between questions or submitting responses
- **Then** loading indicators appear if operation takes > 500ms
- **And** loading indicators are visible and clear
- **And** buttons disable during loading to prevent double-submission
- **And** page remains responsive during background saves

**Scenario 11: Error Handling on Mobile**
- **Given** a Conference Attendee encounters network error on mobile
- **When** error occurs (lost connection, server timeout)
- **Then** error message displays clearly on mobile screen
- **And** message is readable and actionable (e.g., "Connection lost. Please try again.")
- **And** retry action is available via touch-friendly button
- **And** partially completed responses are preserved if possible

**Scenario 12: Zooming and Accessibility**
- **Given** a Conference Attendee needs to zoom text for readability
- **When** using pinch-to-zoom on mobile
- **Then** zoom is enabled (not disabled via viewport meta tag)
- **And** content reflows appropriately when zoomed
- **And** horizontal scrolling minimized even when zoomed
- **And** attendee can access all functionality while zoomed

### Non-Functional Requirements
- [ ] Performance: Survey loads in < 3 seconds on 3G mobile connection
- [ ] Performance: Page transitions (Next button) respond in < 500ms
- [ ] Accessibility: Minimum 44x44px touch targets (iOS HIG, Android Material Design)
- [ ] Accessibility: Minimum 16px body text prevents auto-zoom on iOS
- [ ] Accessibility: Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Usability: Single-column layout prevents horizontal scrolling
- [ ] Usability: Comfortable thumb-reach positioning for primary actions
- [ ] Compatibility: Works on iOS Safari, Chrome Android, Firefox Mobile
- [ ] Responsive: Breakpoints at 320px, 375px, 414px (phones), 768px, 1024px (tablets), 1280px+ (desktop)

### Quality Checklist
- [ ] Tested on actual mobile devices (iPhone 13/14, iPhone SE, Android phones)
- [ ] Tested on tablets (iPad, Android tablets)
- [ ] Tested on desktop browsers (Chrome, Safari, Firefox, Edge)
- [ ] All touch targets verified as 44x44px minimum
- [ ] Text readability confirmed across screen sizes
- [ ] Progress indicator tested on mobile widths
- [ ] Keyboard display tested with text inputs
- [ ] Portrait and landscape orientation tested
- [ ] Loading states tested on simulated slow connection
- [ ] Error states tested on mobile displays
- [ ] Zoom functionality verified (not disabled)
- [ ] Screenshot comparison with design mockups (mobile views)
- [ ] CSS breakpoints tested at boundary conditions (319px, 320px, 321px, etc.)

## Technical Notes
**Responsive Design Approach**:
- Mobile-first CSS (base styles for mobile, progressive enhancement for larger screens)
- CSS Grid or Flexbox for flexible layouts
- Media queries for breakpoint adjustments
- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

**Breakpoints Recommendation**:
```css
/* Mobile (default) */
/* 320px - 767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

**Touch Target Implementation**:
- Buttons: `min-height: 44px; min-width: 44px; padding: 12px 24px;`
- Radio buttons: Increase clickable area with padding on label
- Checkboxes: Same approach as radio buttons
- Links: Ensure adequate padding around text

**Font Sizes**:
- Base: 16px (prevents auto-zoom on iOS)
- Headings: 20-24px
- Transparency notes: 14-16px (italic, lighter color)
- Small text (if any): 14px minimum

**Content Card Max Width**:
- Mobile: 100% (minus 16-20px padding on sides)
- Tablet: 700px max-width, centered
- Desktop: 800px max-width, centered

**Testing Tools**:
- Chrome DevTools device emulation
- Safari Responsive Design Mode
- BrowserStack or similar for real device testing
- Lighthouse mobile performance audit

## Open Questions
- Should we implement swipe gestures for navigation (swipe left for "Next")?
- Should we add "Back" button for attendees who want to review previous answers?
- Should we optimize for specific conference WiFi bandwidth limitations?
- Should we implement progressive web app (PWA) features for offline support?

## Estimate
**Size**: M (3-5 days)
**Confidence**: High

**Reasoning**: Responsive design requires careful implementation across multiple breakpoints and thorough testing on real devices. Touch target optimization and mobile-specific interactions add complexity.

**Breakdown**:
- CSS responsive framework setup: 1 day
- Mobile-first styling for all screens (welcome, questions, completion): 2 days
- Touch target optimization and testing: 1 day
- Device testing (phones, tablets, desktop): 1 day
- Performance optimization for mobile: 0.5 day
- Accessibility testing and fixes: 0.5 day

## Dependencies
- Stories 019, 020, 021 (Welcome, Question, Completion screens) - provide base UI to make responsive
- Decision on CSS framework (if any) vs. custom CSS
- Access to real devices for testing (iPhones, Android phones, tablets)
