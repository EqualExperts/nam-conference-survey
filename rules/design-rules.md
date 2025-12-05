# UI/UX Design & Implementation Rules

Governance rules for maintaining design consistency, accessibility, and user experience quality across the NAM Conference Survey application. These rules ensure proper usage of the design system and adherence to Equal Experts branding standards.

## Context

Provide consistent, accessible, and brand-aligned user interfaces across all application touchpoints.

*Applies to:* All frontend components, pages, and user-facing interfaces
*Level:* Tactical - Implementation and code review standards
*Audience:* Frontend developers, UI/UX designers, code reviewers

## Core Principles

1. **Design System First:** Always use components and patterns from the design system (`knowledge/design-system.md`) before creating custom solutions. Consistency trumps novelty.
2. **Accessibility is Non-Negotiable:** WCAG 2.1 AA compliance is a requirement, not a feature. Every user must be able to complete the survey regardless of ability.
3. **Mobile-First Implementation:** Design and build for the smallest screen first (375px), then enhance for larger viewports. Most users will access the survey on mobile devices.
4. **Brand Consistency:** Equal Experts branding (colors, typography, visual identity) must be maintained across all interfaces to build trust and recognition.
5. **Progressive Enhancement:** Core survey functionality must work without JavaScript. Enhanced interactions are acceptable but never required for completion.

## Rules

### Must Have (Critical)

- **RULE-001:** All UI components MUST use Mantine UI v7 components as defined in the design system. No custom UI libraries or frameworks.
- **RULE-002:** All color usage MUST come from the defined theme palette (equalBlue, equalNavy, equalCharcoal). No hardcoded hex values outside the theme.
- **RULE-003:** Color contrast MUST meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text). Use the design system's pre-validated color combinations.
- **RULE-004:** Interactive elements MUST have minimum touch target size of 44x44px for mobile accessibility.
- **RULE-005:** All forms MUST include proper labels, error messages, and ARIA attributes for screen reader support.
- **RULE-006:** Typography MUST use Lexend font family as specified in the theme. Font sizes MUST come from the theme's type scale.
- **RULE-007:** Survey questions MUST include transparency notes explaining why data is collected and how it will be used.
- **RULE-008:** All pages MUST be responsive and fully functional from 375px to 1920px viewport widths.

### Should Have (Important)

- **RULE-101:** Components SHOULD reuse existing patterns from `design-system.md` (LikertQuestion, MultipleSelectQuestion, etc.) before creating new patterns.
- **RULE-102:** Spacing SHOULD use the theme's spacing scale (xs, sm, md, lg, xl) rather than arbitrary pixel values.
- **RULE-103:** Navigation SHOULD provide clear progress indicators showing question completion percentage.
- **RULE-104:** Form inputs SHOULD include placeholder text and helper text to guide users.
- **RULE-105:** Error states SHOULD be specific and actionable ("Please select at least one option" vs "Error occurred").
- **RULE-106:** Loading states SHOULD provide feedback for operations taking longer than 300ms.
- **RULE-107:** Button labels SHOULD be action-oriented and specific ("Submit Survey" vs "Submit", "Save Progress" vs "Save").
- **RULE-108:** Cards SHOULD use consistent padding, shadows, and borders as defined in the Card component defaults.

### Could Have (Preferred)

- **RULE-201:** Animations and transitions COULD enhance user experience but must not interfere with functionality or cause motion sickness (respect `prefers-reduced-motion`).
- **RULE-202:** Custom illustrations COULD be added to enhance visual interest but must not distract from survey completion.
- **RULE-203:** Tooltips COULD provide additional context for complex questions but must not contain essential information.
- **RULE-204:** Keyboard shortcuts COULD improve power-user efficiency but must be discoverable and documented.

## Patterns & Anti-Patterns

### ✅ Do This

```typescript
// Use theme colors
import { Button } from '@mantine/core';

<Button variant="filled" color="equalBlue">
  Submit Survey
</Button>

// Use theme spacing
<Stack gap="md">
  <Text>Question text</Text>
  <Radio.Group>...</Radio.Group>
</Stack>

// Accessible form with proper labels
<Radio.Group
  label="Overall conference rating"
  description="Rate from 1 (poor) to 5 (excellent)"
  aria-required="true"
>
  <Radio value="1" label="1 - Strongly Disagree" />
  <Radio value="2" label="2 - Disagree" />
</Radio.Group>

// Responsive sizing
<Title order={1} size={{ base: '28px', sm: '36px', md: '44px' }}>
  Welcome to the Survey
</Title>
```

### ❌ Don't Do This

```typescript
// Don't hardcode colors
<Button style={{ backgroundColor: '#1795d4' }}>
  Submit
</Button>

// Don't use arbitrary spacing
<div style={{ marginTop: '23px' }}>
  <Text>Question text</Text>
</div>

// Don't omit accessibility attributes
<input type="radio" value="1" />  // No label!

// Don't use fixed sizes for responsive elements
<Title style={{ fontSize: '44px' }}>  // Won't scale on mobile
  Welcome to the Survey
</Title>

// Don't create custom UI components when Mantine provides them
const CustomButton = styled.button`
  background: blue;
  padding: 10px;
`;
```

## Decision Framework

*When rules conflict:*
1. Accessibility rules (RULE-003, RULE-004, RULE-005) always take precedence over visual design preferences
2. If a design system component doesn't meet accessibility standards, fix the design system first
3. Consult with the team before creating exceptions to critical rules

*When facing edge cases:*
- If the design system doesn't cover a use case, document the gap and propose an addition to the design system
- If a third-party component is needed, ensure it's compatible with Mantine theming and meets accessibility standards
- When in doubt about color contrast, use a contrast checker tool (WebAIM, Stark, etc.)

*When client requests conflict with rules:*
1. Explain the rationale behind the rule (accessibility, usability, brand consistency)
2. Propose alternative solutions that meet both the request and the rule
3. Escalate to product/design lead if compromise cannot be reached

## Exceptions & Waivers

*Valid reasons for exceptions:*
- **Technical limitations:** Browser compatibility issues prevent standard implementation (document the affected browsers and fallback)
- **Third-party integrations:** External embeds (analytics, monitoring) that cannot be styled according to design system (isolate in dedicated components)
- **Performance optimization:** Design system component causes measurable performance degradation (profile and document the issue)

*Process for exceptions:*
1. Document the exception in code comments with rationale and ticket reference
2. Get approval from frontend lead and design lead for critical rule exceptions (RULE-001 through RULE-008)
3. Create a technical debt ticket to address the exception in a future sprint
4. Add the exception to a shared exceptions log for transparency

## Quality Gates

*Automated checks:*
- ESLint rules enforce Mantine component usage and theme value usage
- axe-core accessibility tests run in CI/CD pipeline
- Visual regression tests catch unintended design system changes
- Bundle size monitoring ensures theme isn't duplicated

*Code review focus:*
- All interactive elements have proper ARIA labels and keyboard navigation
- Colors and spacing come from theme, not hardcoded values
- Components match design system patterns for their question type
- Mobile responsiveness tested at 375px, 768px, and 1024px breakpoints
- Transparency notes are present and meaningful for data collection questions

*Testing requirements:*
- Manual screen reader testing for new question types
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Touch device testing for interactive elements
- Keyboard-only navigation testing for entire user flow

## Related Rules

- `.rules/design-system.md` - Complete design system specification (implementation reference)
- `.rules/accessibility.md` - Detailed accessibility standards (if exists)
- `.rules/frontend-architecture.md` - Frontend component structure and patterns (if exists)

## References

- [Mantine UI Documentation](https://mantine.dev) - Component API and theming
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [Equal Experts Website](https://www.equalexperts.com) - Brand reference
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast validation
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) - Touch target sizing

---

## TL;DR

Ultra-concise summary for quick reference during development and code review.

*Key Principles:*
- Always use the design system before creating custom solutions
- Accessibility (WCAG 2.1 AA) is mandatory, not optional
- Mobile-first design starting at 375px width

*Critical Rules:*
- Must use Mantine UI v7 components from design system
- Must use theme colors/spacing (no hardcoded values)
- Must meet WCAG 2.1 AA color contrast standards (4.5:1 normal text, 3:1 large text)
- Must provide 44x44px minimum touch targets
- Must include proper labels and ARIA attributes for screen readers
- Must be responsive from 375px to 1920px

*Quick Decision Guide:*
When in doubt: **Can a user with a screen reader, using only a keyboard, on a 375px mobile device, complete this action?** If no, fix it before merging.
