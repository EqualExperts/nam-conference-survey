# User Story: Mobile-First Responsive Design

**Story ID**: STORY-004
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, mobile-optimization, conference-attendee, in-conference-completion

## User Story

As a conference attendee completing the survey during a conference break on my phone,
I want a fully functional mobile experience with touch-friendly controls and readable text,
So that I can provide feedback conveniently during the in-conference scheduled activity without waiting for computer access.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Theme 3 (Mobile Device Constraints), Feature 4
**User Need**: "When I provide conference feedback, I want to do it while experience is fresh and before I return to normal life, so my responses are authentic and completion doesn't become another post-conference task"
**Supporting Evidence**:
- Katie Coleman: Recognition that mobile targeting could improve "then and there" capture
- Sarah Aslanifar: "Ideally I do this frankly on my flights back" - comfortable with phone completion during travel
- Lauren Kessler: "I always prefer to fill it out, like, while I'm there at the end of the day" - in-conference completion preference
- Implementation notes: "Mobile-first responsive design (documented in testing checklist)"

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Survey Renders on Small Mobile Device - Happy Path**
- **Given** I access the survey on a mobile device with 375px screen width (iPhone SE)
- **When** the survey page loads
- **Then** all content is visible without horizontal scrolling
- **And** text is readable without zooming (minimum 16px base font)
- **And** all question types render properly (Likert scales, checkboxes, ranking, text areas)
- **And** the layout adapts to narrow screen width

**Scenario 2: Touch-Friendly Interaction - Likert Scale**
- **Given** I am viewing a Likert scale question (Q1-Q8) on a touchscreen device
- **When** I tap a radio button option (1-5 scale)
- **Then** the option selects reliably on first tap (no need for precise aiming)
- **And** the touch target is at least 44x44px (iOS accessibility minimum)
- **And** adequate spacing exists between options to prevent mis-taps
- **And** visual feedback confirms selection (color change, checkmark)

**Scenario 3: Multiple Select Checkboxes - Touch Interaction**
- **Given** I am viewing Q4 (Connection Quality) with 7 checkbox options
- **When** I tap multiple checkboxes on mobile
- **Then** each checkbox selects/deselects reliably
- **And** touch targets are large enough for thumb-based interaction
- **And** vertical stacking provides clear separation between options
- **And** I can select multiple options without scrolling issues

**Scenario 4: Ranking Question - Mobile Drag-to-Reorder**
- **Given** I am viewing Q11 (Session Format Preferences) on mobile
- **When** I attempt to reorder the 4 session types
- **Then** drag-to-reorder works with touch gestures (long-press + drag)
- **Or** dropdown selection (rank 1-4) works as fallback if drag problematic
- **And** the interaction is intuitive without desktop-specific instructions
- **And** visual feedback shows dragging state (item lifts, reorder preview)

**Scenario 5: Text Input Fields - Mobile Keyboard**
- **Given** I am viewing an open-ended question (Q7, Q14, Q15) on mobile
- **When** I tap the text area to provide feedback
- **Then** the mobile keyboard appears smoothly
- **And** the text area expands to accommodate multi-line input
- **And** the viewport adjusts so keyboard doesn't cover my typing
- **And** I can see what I'm typing without scrolling

**Scenario 6: Optional Comment Boxes - Mobile Text Entry**
- **Given** I want to add a comment beneath Q1 (optional comment box)
- **When** I tap the comment field on mobile
- **Then** the text area is large enough to see 2-3 lines of text
- **And** typing feels natural with mobile keyboard
- **And** no horizontal scrolling required within text area
- **And** field clearly labeled as "Optional"

**Scenario 7: Progress Through Survey - Mobile Navigation**
- **Given** I am completing the survey on mobile (single-page form)
- **When** I scroll down through the 19 questions
- **Then** scrolling is smooth without jumpy behavior
- **And** the "Submit" button is clearly visible at bottom
- **And** I can scroll back up to review/change answers easily
- **And** no elements overflow or create horizontal scroll

**Scenario 8: Landscape Orientation Support**
- **Given** I rotate my phone to landscape mode
- **When** the survey re-renders
- **Then** the layout adapts to wider viewport (667px width)
- **And** all controls remain functional and visible
- **And** no content is cut off or hidden

**Scenario 9: Tablet Display (768px - 1024px)**
- **Given** I access the survey on an iPad (768px width)
- **When** the survey loads
- **Then** the layout uses available width effectively (not stretched phone view)
- **And** question spacing increases for comfortable reading
- **And** touch targets remain appropriately sized
- **And** multi-column layouts (if used) work properly

**Scenario 10: Desktop Display (1920px)**
- **Given** I access the survey on a desktop computer (1920px width)
- **When** the survey loads
- **Then** the content is centered with max-width constraint (e.g., 800px)
- **And** the layout doesn't stretch uncomfortably wide
- **And** all mobile-optimized interactions also work with mouse/keyboard
- **And** hover states provide visual feedback for clickable elements

### Non-Functional Requirements

- [ ] **Performance**: Survey loads in <3 seconds on 4G mobile connection
- [ ] **Accessibility**: Touch targets minimum 44x44px (iOS guidelines); WCAG 2.1 AA compliant
- [ ] **Browser Support**: Works on iOS Safari (last 2 versions), Android Chrome (last 2 versions)
- [ ] **Orientation**: Supports both portrait and landscape orientations
- [ ] **Font Sizing**: Minimum 16px base font to prevent iOS auto-zoom on input focus

### Quality Checklist

- [ ] Tested on actual iOS device (iPhone 12 or newer)
- [ ] Tested on actual Android device (Pixel or Samsung)
- [ ] Tested on tablet (iPad or Android tablet)
- [ ] All question types functional on mobile (Likert, multi-select, ranking, text)
- [ ] No horizontal scrolling at any supported width (375px - 1920px)
- [ ] Touch targets meet accessibility minimum (44x44px)
- [ ] Text remains readable without zooming
- [ ] Mobile keyboard interactions smooth (no viewport jumping)
- [ ] Testing checklist item verified: "Mobile responsive - Works on screen sizes 375px - 1920px width"

## Technical Notes

**Responsive Breakpoints:**
```css
/* Mobile-first approach */
:root {
  --base-font-size: 16px;
  --touch-target-min: 44px;
}

/* Small mobile: 375px - 639px */
@media (min-width: 375px) {
  /* Base styles - mobile-first */
}

/* Tablet: 640px - 1023px */
@media (min-width: 640px) {
  /* Tablet adjustments */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* Desktop layout with max-width constraint */
  .survey-container {
    max-width: 800px;
    margin: 0 auto;
  }
}
```

**Touch Target Sizing:**
- Radio buttons: Expand clickable area beyond visible circle (44x44px minimum)
- Checkboxes: Same 44x44px touch target
- Text inputs: Minimum 44px height
- Buttons: Minimum 44px height, full-width on mobile
- Spacing: 8-12px between interactive elements to prevent mis-taps

**Viewport Configuration:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```
- Allow zoom up to 5x for accessibility
- Prevent iOS auto-zoom with 16px minimum font size

**Input Handling:**
- Use `inputmode="text"` for text fields (appropriate mobile keyboard)
- Avoid triggering zoom on input focus (16px minimum font)
- `autocomplete="off"` for survey questions (not form data)
- Disable autocorrect/autocapitalize for name/location fields if applicable

**Ranking Question - Mobile Implementation:**
Option 1 (Preferred): Drag-to-reorder with touch support
- Library: SortableJS or react-beautiful-dnd (if React)
- Touch gesture: Long-press (500ms) + drag
- Visual feedback: Item lifts, drop zones highlight

Option 2 (Fallback): Dropdown rank selection
- 4 dropdowns, each with options 1-4
- Ensure no duplicates (JavaScript validation)
- Clearer instruction: "Assign rank 1-4 to each session type"

**Responsive Typography:**
```css
body {
  font-size: 16px; /* Prevent iOS auto-zoom */
}

h1 {
  font-size: 24px; /* Mobile */
}

@media (min-width: 640px) {
  h1 {
    font-size: 32px; /* Tablet/Desktop */
  }
}
```

**Testing Tools:**
- Chrome DevTools device emulation (development)
- BrowserStack or similar (cross-device testing)
- Real devices: iPhone, Android, iPad (mandatory before deployment)

## Design Notes

**Mobile-First Philosophy:**
Design for mobile first, enhance for larger screens. This ensures:
- Core functionality works on smallest supported device (375px)
- Progressive enhancement for tablet/desktop
- Performance optimization (mobile assets load first)

**Single-Page Form on Mobile:**
- All 19 questions on one scrollable page (no pagination)
- Reduces cognitive load (see all questions at once)
- Simplifies navigation (scroll vs button clicks)
- Works better for in-conference break completion (5-10 minute window)

**Likert Scale Mobile Design:**
```
Question Text (16px, bold)
Transparency note (14px, gray, italic)

[Radio Buttons - Vertical Stack on Mobile]
○ 5 - Excellent
○ 4 - Good
○ 3 - Neutral
○ 2 - Fair
○ 1 - Poor
○ N/A (if applicable)

Optional comment (14px)
[Text area - full width, 3 rows visible]
```

**Touch Target Example:**
```css
.radio-option {
  display: flex;
  align-items: center;
  padding: 12px;
  min-height: 44px; /* iOS accessibility minimum */
  cursor: pointer;
}

.radio-option input[type="radio"] {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.radio-option label {
  flex: 1;
  font-size: 16px;
  cursor: pointer;
}
```

**Visual Feedback:**
- Active state: Highlight on tap (background color change)
- Selected state: Filled radio/checkbox + label color
- Focus state: Outline for keyboard navigation (desktop)
- Loading state: Spinner during submission

## Open Questions

- ✅ Should we support very old mobile devices (iPhone 6, Android 5)? **ANSWER**: No - target last 2 years of devices. Equal Experts attendees likely have modern phones.
- ✅ Do we need offline support (PWA)? **ANSWER**: No - out of MVP scope. Assume conference venue has WiFi.
- ✅ Should ranking question use drag-to-reorder or dropdown on mobile? **ANSWER**: Implement drag-to-reorder if time permits, otherwise dropdown is acceptable. Test usability.

## Estimate

**Size**: M (3-5 days)
**Confidence**: Medium (ranking question mobile UX adds complexity)

**Breakdown:**
- Responsive CSS framework setup: 4-6 hours
- Mobile typography and spacing: 2-4 hours
- Touch-friendly input controls: 6-8 hours
- Ranking question mobile interaction: 6-10 hours (drag-to-reorder complex)
- Mobile keyboard handling: 2-4 hours
- Cross-device testing and fixes: 8-12 hours
- Accessibility testing (touch targets, screen reader): 4-6 hours

**Total**: ~32-50 hours (4-6 days)

## Dependencies

- All question type stories (STORY-007 through STORY-011) - must render responsively
- STORY-001 (Transparency Notes) - must render properly on mobile
- STORY-006 (Optional Comment Boxes) - must handle mobile text input
- Testing environment with mobile device access

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Primary Use Case:**
- In-conference scheduled activity means attendees complete on phones during break
- Synthesis Theme 3: "Mobile Device Constraints Shape In-Conference Survey Design"
- Lauren's timing: "5-6pm conference break completion" - no computer access

**90-95% Response Rate Dependency:**
- If mobile experience is poor, attendees will defer to "later" (then forget)
- Katie's insight: "Once people leave, back to their lives, back to work, it's another thing to do"
- Mobile-first design enables in-conference completion = higher response rate

**Demographic Reality:**
- Sarah: Completes surveys on phone during travel
- Andrew: Prefers computer for long-form, mobile for multiple choice
- Synthesis: "Attendees will complete on phones during conference break"

### Design Decision Rationale

**Why Single-Page Form (Not Multi-Step):**
- Reduces navigation complexity on mobile
- Allows scrolling back to review answers easily
- Fewer page loads = better mobile performance
- Transparency notes visible in context (not on separate screens)

**Why Minimum 16px Base Font:**
- Prevents iOS auto-zoom on input focus (jarring experience)
- Improves readability for users 40+ (conference demographic)
- WCAG accessibility recommendation

**Why 44x44px Touch Targets:**
- iOS Human Interface Guidelines minimum
- Prevents frustration from missed taps
- Accessibility requirement for motor impairment
- Better experience for thumb-based interaction

### Testing Strategy

**Critical Test Devices:**
1. iPhone (iOS Safari) - largest user segment likely
2. Android phone (Chrome) - secondary segment
3. iPad (Safari) - some attendees may use tablet
4. Desktop (Chrome/Firefox) - backup for those with laptops

**Test Scenarios:**
1. Complete survey entirely on iPhone in portrait mode
2. Complete survey entirely on Android in landscape mode
3. Switch orientations mid-survey (ensure no data loss)
4. Test with iOS VoiceOver enabled (accessibility)
5. Test with slow 3G connection (performance)

**Regression Prevention:**
- Automated responsive design tests (Playwright or similar)
- Visual regression testing (Percy, Chromatic)
- Manual QA checklist before each deployment

---

## For Issue Tracker Import

**Title**: Mobile-First Responsive Design
**Description**:
As a conference attendee completing the survey during a break on my phone, I want a fully functional mobile experience with touch-friendly controls, so I can provide feedback conveniently during the in-conference scheduled activity.

**Source**: Discovery cycle 2025-11-12-mvp, addressing in-conference completion requirement from Katie Coleman, Lauren Kessler, and Sarah Aslanifar interviews. Theme 3: Mobile Device Constraints.

**Acceptance Criteria**: Works on screen sizes 375px - 1920px width; all question types functional on mobile (Likert scales, checkboxes, ranking, text); touch targets minimum 44x44px; no horizontal scrolling; tested on iOS and Android devices.

**Labels**: 2025-11-12-mvp, mobile-optimization, must-have, accessibility
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 5 (M-sized, 3-5 days)
