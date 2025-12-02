# User Story: Equal Experts Branding

**Story ID**: STORY-015
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, branding, conference-organizer, visual-design

## User Story

As a conference organizer (Katie Coleman persona),
I want Equal Experts branding applied throughout the survey interface,
So that attendees experience a professional, on-brand survey that reflects the quality and culture of Equal Experts events.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Executive Summary (MVP scope)
**User Need**: Professional presentation that reflects Equal Experts quality standards and cultural values
**Supporting Evidence**:
- Mike Mitchell PM interview: "EE branding applied throughout" - explicit MVP requirement
- Executive Summary: "EE branding throughout" listed in MVP scope requirements
- Competitive insight: Custom solution allows "tight integration with Equal Experts branding" vs generic Google Forms

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Logo Display - Happy Path**
- **Given** I am viewing the survey on any page (question pages, acknowledgment page)
- **When** the page loads
- **Then** the Equal Experts logo appears prominently at the top
- **And** the logo is the official EE logo in correct dimensions and format
- **And** the logo is visible and properly sized on mobile devices (minimum 120px width)

**Scenario 2: Color Palette Consistency**
- **Given** I am navigating through the survey from first question to submission
- **When** I view any survey element (buttons, links, headers, form controls)
- **Then** all interactive elements use Equal Experts brand colors
- **And** primary actions use EE primary brand color
- **And** color usage is consistent across all 19 questions
- **And** color contrast meets WCAG AA accessibility standards

**Scenario 3: Typography Application**
- **Given** I am reading any text in the survey (questions, transparency notes, instructions)
- **When** text renders on screen
- **Then** all text uses Equal Experts brand typography (font family per brand guidelines)
- **And** heading hierarchy follows EE style guide
- **And** body text uses EE-specified font weights and sizes
- **And** mobile rendering maintains typography readability

**Scenario 4: Professional Appearance Validation**
- **Given** I am a conference attendee completing the survey
- **When** I view the overall survey presentation
- **Then** the design feels professional and consistent with Equal Experts quality standards
- **And** no generic "survey tool" branding appears (no Google Forms branding, etc.)
- **And** visual design reflects EE culture of transparency and openness

### Non-Functional Requirements

- [ ] **Brand Compliance**: All visual elements match Equal Experts brand guidelines (logo, colors, typography)
- [ ] **Consistency**: Branding applied uniformly across all survey pages and states
- [ ] **Performance**: Logo and brand assets load quickly (< 500ms), no performance degradation from brand assets
- [ ] **Accessibility**: Color choices maintain sufficient contrast ratios (WCAG 2.1 AA minimum 4.5:1 for text)
- [ ] **Responsiveness**: All brand elements scale appropriately on mobile devices (375px - 1920px width)

### Quality Checklist

- [ ] Equal Experts logo obtained in correct format (SVG preferred, PNG fallback)
- [ ] Brand colors defined in CSS variables or design system
- [ ] Typography fonts loaded correctly (web fonts or system font stack)
- [ ] Visual review by Katie Coleman or designated brand authority
- [ ] Mobile testing confirms logo visibility and readability
- [ ] Accessibility audit confirms color contrast compliance

## Technical Notes

**Brand Asset Sources:**
- Logo: Obtain official Equal Experts logo from Katie Coleman or EE brand resources
- Colors: Request EE brand color palette (primary, secondary, accent colors with hex codes)
- Typography: Request EE font family specifications (web-safe or web font links)

**Implementation Approach:**
- Create CSS custom properties (variables) for EE brand colors
- Example: `--ee-primary: #[hex-code]`, `--ee-secondary: #[hex-code]`
- Load web fonts via Google Fonts or similar if EE uses custom fonts
- Use SVG logo for scalability and performance

**File Organization:**
- Store brand assets in `/assets/branding/` directory
- Logo files: `ee-logo.svg`, `ee-logo.png` (fallback)
- CSS: Create `brand-colors.css` or include in main stylesheet
- Fonts: Link in HTML `<head>` or bundle with application

**Accessibility Considerations:**
- Logo alt text: "Equal Experts" for screen readers
- Ensure color is not the only indicator (use text labels, icons, or patterns)
- Test color contrast for all text on colored backgrounds
- Provide focus indicators that work with brand colors

## Design Notes

**Visual Hierarchy with Branding:**
```
[Page Header]
  [Equal Experts Logo - Left aligned or centered]
  [Survey Title - EE Typography]

[Question Section]
  [Question Text - EE Font, EE Dark Color]
  [Transparency Note - EE Gray Color]
  [Answer Options - EE Interactive Color on selection]

[Navigation]
  [Primary Button - EE Primary Color]
  [Secondary Button - EE Secondary Color or outline]
```

**Color Application Examples:**
- Primary buttons (Next, Submit): EE primary brand color
- Selected radio buttons/checkboxes: EE accent color
- Links and interactive text: EE link color
- Headers and important text: EE dark neutral
- Transparency notes and helper text: EE light neutral

**Mobile Branding Considerations:**
- Logo may scale down to maintain visibility without dominating small screens
- Minimum logo width: 120px (readable on phones)
- Consider logo-only (without tagline) on very narrow screens if full logo too large

## Open Questions

- ✅ Where to obtain official Equal Experts brand guidelines? **ANSWER**: Request from Katie Coleman
- ✅ Are there specific font licensing requirements for web use? **ANSWER**: Confirm with brand resource provider
- ✅ Does EE have a preferred survey/form design pattern? **ANSWER**: Use standard EE web patterns if documented, otherwise adapt brand to survey context

## Estimate

**Size**: XS (< 1 day)
**Confidence**: High

**Breakdown:**
- Obtain brand assets and guidelines: 1-2 hours
- Implement logo and layout: 1-2 hours
- Apply color palette CSS: 2-3 hours
- Implement typography: 1-2 hours
- Visual QA and adjustments: 1-2 hours

## Dependencies

- STORY-004 (Mobile-First Responsive Design) - provides base layout for brand application
- Equal Experts brand guidelines and asset package
- Katie Coleman or brand authority for approval

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Professional Credibility:**
- Survey represents Equal Experts at formal conference event
- Generic or poorly branded survey undermines professional credibility
- Attendees expect quality consistent with EE's consulting brand

**Cultural Alignment:**
- Equal Experts transparency values should be reflected in visual design
- Brand consistency across events builds trust and recognition
- Professional appearance supports Katie's ROI justification for conference investment

**Competitive Differentiation:**
- Custom branding unavailable in Google Forms (previous tool)
- Demonstrates value of purpose-built solution vs generic tools
- Reinforces conference quality standards

### Design Decision Rationale

**Why Logo at Top:**
Standard web pattern establishes brand context immediately. Attendees know they're in an official EE survey, not a third-party tool.

**Why Brand Colors Throughout:**
Consistent color application creates cohesive experience. Helps users recognize interactive elements and navigation patterns.

**Why EE Typography:**
Typography is subtle but powerful brand differentiator. Using EE fonts (vs generic system fonts) elevates professionalism and brand consistency.

### Brand Compliance Notes

**Required from Katie Coleman or EE Brand Team:**
1. Official Equal Experts logo file (SVG and PNG)
2. Brand color palette with hex codes (primary, secondary, neutrals)
3. Typography specifications (font families, weights, sizes)
4. Any specific do's and don'ts for logo usage (minimum sizes, clear space, etc.)

**Brand Application Checklist:**
- [ ] Logo meets minimum size requirements
- [ ] Logo has proper clear space around it
- [ ] Colors used correctly (not inverted or modified)
- [ ] Typography maintains brand hierarchy
- [ ] Overall design aligns with EE's professional, transparent culture

---

## For Issue Tracker Import

**Title**: Equal Experts Branding
**Description**:
As a conference organizer, I want Equal Experts branding applied throughout the survey interface, so that attendees experience a professional, on-brand survey that reflects the quality and culture of Equal Experts events.

**Source**: Discovery cycle 2025-11-12-mvp, MVP scope requirement from PM interview.

**Acceptance Criteria**: EE logo, brand colors, and typography applied consistently across all survey pages and elements, with mobile optimization and accessibility compliance.

**Labels**: 2025-11-12-mvp, branding, must-have, visual-design
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 1 (XS-sized, < 1 day)
