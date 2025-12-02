# User Story: Welcome Screen with Survey Expectations

**Story ID**: 019
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Must have
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-ui

## User Story
As a Conference Attendee,
I want to see a clear welcome screen explaining what the survey involves before I start,
So that I can understand the time commitment, optional nature of questions, and how my feedback will be used before deciding to participate.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**User Need**: Need 2 (Efficiency need) - "When I complete a survey, I want to provide authentic feedback efficiently, so I can contribute honest insights without excessive time investment"
**Supporting Evidence**:
- Principal Engineer: "More than five minutes" exceeds tolerance threshold
- Conference Planner: Prefers completing during conference, not as post-event task
- Managing Director: Survey introduction must communicate respect for Saturday personal time

## Design Reference
**Screenshots**:
- `product/design/2025-11-12-mvp/screenshots/01-welcome-screen.png`

**Design Notes**:
- Teal header with "Equal Experts NAM Conference 2025" branding
- Centered white card with clipboard icon
- "Welcome to the Conference Survey" heading
- Explanatory text: "Your feedback helps us improve future conferences and create better experiences for everyone"
- "About this survey:" section with 5 bullet points:
  - 19 questions covering your conference experience
  - Takes approximately 10 minutes to complete
  - All questions are optional - answer what feels comfortable
  - Each question includes a transparency note explaining how we'll use your feedback
  - You can remain anonymous if you prefer
- "Start Survey" button in teal

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Attendee Views Welcome Screen**
- **Given** a Conference Attendee receives the survey link
- **When** the attendee navigates to the survey URL
- **Then** the welcome screen displays with Equal Experts branding header
- **And** the welcome message clearly states "Welcome to the Conference Survey"
- **And** the explanatory text emphasizes how feedback helps improve future conferences
- **And** the "About this survey" section lists all 5 key points about the survey
- **And** a "Start Survey" button is visible and accessible

**Scenario 2: Attendee Reads Survey Expectations**
- **Given** a Conference Attendee is viewing the welcome screen
- **When** the attendee reads the "About this survey" section
- **Then** the survey clearly states "19 questions"
- **And** the estimated time is clearly stated as "approximately 10 minutes"
- **And** the optional nature is emphasized: "All questions are optional"
- **And** transparency is communicated: "Each question includes a transparency note"
- **And** anonymity option is mentioned: "You can remain anonymous if you prefer"

**Scenario 3: Attendee Starts Survey**
- **Given** a Conference Attendee has reviewed the welcome screen
- **When** the attendee clicks the "Start Survey" button
- **Then** the system navigates to Question 1 (Conference Atmosphere rating)
- **And** the URL updates to reflect survey progress
- **And** the page transition is smooth without jarring loading states

**Scenario 4: Mobile View - Welcome Screen**
- **Given** a Conference Attendee accesses the survey on a mobile phone
- **When** the welcome screen loads
- **Then** the layout adapts to mobile screen size
- **And** all text remains readable without horizontal scrolling
- **And** the "Start Survey" button is easily tappable (minimum 44x44px touch target)
- **And** the Equal Experts header scales appropriately

**Scenario 5: Screen Reader Access**
- **Given** a Conference Attendee using a screen reader
- **When** the welcome screen loads
- **Then** the heading hierarchy is logical (h1 for "Welcome to the Conference Survey")
- **And** the bullet points are announced as a list
- **And** the "Start Survey" button is clearly identified as an actionable element
- **And** alt text is provided for the clipboard icon

### Non-Functional Requirements
- [ ] Performance: Welcome screen loads in < 2 seconds on mobile connection
- [ ] Security: Survey URL uses HTTPS only
- [ ] Accessibility: WCAG 2.1 AA compliant (heading hierarchy, color contrast, keyboard navigation)
- [ ] Usability: Clear, friendly tone that respects attendee time
- [ ] Mobile-responsive: Optimized for phones (320px minimum width)
- [ ] Browser compatibility: Works on Chrome, Safari, Firefox, Edge (latest 2 versions)

### Quality Checklist
- [ ] Welcome screen matches design screenshot exactly
- [ ] All 5 bullet points about survey are present and accurate
- [ ] Equal Experts branding (teal color #00BCD4, correct logo) applied
- [ ] Mobile view tested on actual devices (iPhone, Android)
- [ ] Screen reader navigation tested (VoiceOver on iOS, TalkBack on Android)
- [ ] "Start Survey" button has proper focus state for keyboard navigation
- [ ] Text content reviewed for tone and clarity
- [ ] Link sharing tested (URL preview shows appropriate title/description)

## Technical Notes
- Welcome screen is a static page (no database interaction required)
- "Start Survey" button should route to first question (/survey/q1 or similar)
- Consider session/tracking mechanism to support progress tracking in future (even if not implemented in MVP)
- Equal Experts teal brand color: #00BCD4
- Font family should match Equal Experts brand guidelines

## Open Questions
- Should we include estimated completion time as "approximately 10 minutes" or "5-10 minutes" based on synthesis finding that baseline completion is 5 minutes?
- Do we need analytics tracking on the welcome screen to measure abandonment before starting?

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Static screen with clear design; main complexity is ensuring responsive behavior and accessibility compliance.

## Dependencies
- Equal Experts branding assets (logo, color palette, fonts)
- Routing framework decision (how to navigate from welcome to Q1)
