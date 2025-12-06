# Implementation Prompt: Dark Mode for Reduced Eye Strain

**Story ID**: STORY-047
**Status**: Ready for Implementation

## Task Description

Implement dark mode functionality for the NAM Conference Survey application with automatic system preference detection, manual toggle, and persistent user preferences.

## Implementation Prompt

Implement a complete dark mode feature for the survey application that allows users to view the survey in a dark color scheme. The implementation must:

1. **Detect System Preferences**: Automatically detect and apply the user's system-level dark mode preference on first visit using `prefers-color-scheme` media query.

2. **Manual Toggle**: Provide a theme toggle button/switch that allows users to manually switch between light and dark modes. The toggle should:
   - Be accessible via keyboard navigation
   - Include proper ARIA labels for screen readers
   - Be visually distinct and easy to find
   - Show the current theme state clearly

3. **Persistent Preferences**: Store the user's theme preference in localStorage and apply it on subsequent visits, overriding system preferences if manually set.

4. **No Flash on Load**: Implement theme loading in a way that prevents the "flash of wrong theme" on page load. This typically requires:
   - Inline script in the HTML head to apply theme before React renders
   - Or use Mantine's ColorSchemeScript component

5. **Dark Mode Color Palette**: Define a dark mode color palette that:
   - Uses Equal Experts brand colors where appropriate (Primary Blue: #1795d4, Navy: #22567c, Charcoal: #2c3234)
   - Meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
   - Provides clear focus indicators
   - Works well with the existing Mantine component library

6. **Apply Theme Across All Components**: Ensure all UI components adapt to dark mode:
   - Survey form pages
   - Thank you page
   - Admin dashboard page
   - All question components (Likert, Multiple Select, Ranking, Open-ended, etc.)
   - Progress indicators
   - Buttons and interactive elements
   - Cards and containers

7. **Accessibility Requirements**:
   - All text must meet WCAG AA contrast requirements in dark mode
   - Focus indicators must be clearly visible in dark mode
   - Theme toggle must announce state changes to screen readers
   - Theme switching must be instant without layout shift

8. **Testing**: Verify the implementation works correctly across:
   - Chrome, Safari, Firefox, Edge
   - Light mode, dark mode, and system preference auto-detection
   - Page refreshes and navigation between pages
   - Keyboard-only navigation

## Technical Approach

Since the application uses Mantine UI v7, leverage Mantine's built-in dark mode support:

1. Use `MantineProvider` with `theme` and `defaultColorScheme` props
2. Implement `ColorSchemeScript` in the HTML head to prevent flash
3. Use `useMantineColorScheme()` hook to manage theme state
4. Create a theme toggle component using `ActionIcon` or `Switch` from Mantine
5. Use Mantine's color scheme utilities (`c`, `lighten`, `darken`) for dynamic colors
6. Define custom dark mode colors in the theme override if needed

## Acceptance Criteria

**Scenario 1: System Preference Detection (Happy Path)**
- Given a user has dark mode enabled in their device settings
- When they open the survey for the first time
- Then the survey automatically displays in dark mode
- And all screens use consistent dark mode styling

**Scenario 2: Manual Theme Toggle**
- Given a user is viewing the survey
- When they click the theme toggle
- Then the theme switches between light and dark mode
- And the preference persists across page loads

**Scenario 3: No Flash on Load**
- Given a user has dark mode preference saved
- When they load any survey page
- Then the page renders in dark mode immediately without flashing light theme first

## Quality Checklist

- [ ] Dark mode colors have sufficient contrast for readability
- [ ] All UI components work correctly in both modes
- [ ] Theme toggle announces state change to screen readers
- [ ] Works across Chrome, Safari, Firefox, Edge
- [ ] Accessibility: All text meets WCAG AA contrast requirements in dark mode
- [ ] Accessibility: Focus indicators clearly visible in dark mode
- [ ] Performance: Theme switching is instant without layout shift
- [ ] Usability: Theme toggle is keyboard accessible and screen reader friendly

## Files Affected

**Core Theme Configuration**:
- `apps/frontend/src/theme/theme.ts` - Add dark mode color overrides
- `apps/frontend/src/main.tsx` - Configure MantineProvider with color scheme support
- `apps/frontend/index.html` - Add ColorSchemeScript to prevent flash

**New Components**:
- `apps/frontend/src/components/ThemeToggle.tsx` - Create theme toggle component (NEW)

**Updated Components** (ensure dark mode compatibility):
- `apps/frontend/src/pages/SurveyPage.tsx`
- `apps/frontend/src/pages/ThankYouPage.tsx`
- `apps/frontend/src/pages/AdminDashboardPage.tsx`
- `apps/frontend/src/components/ProgressIndicator.tsx`
- `apps/frontend/src/components/QuestionRenderer.tsx`
- `apps/frontend/src/components/MetricCard.tsx`
- `apps/frontend/src/components/RecentResponsesSection.tsx`
- All question components in `apps/frontend/src/components/questions/`

## Important Implementation Notes

1. Follow the project's development guidelines:
   - Use TypeScript with explicit types
   - Follow React rules (functional components, proper hooks usage)
   - Use Mantine UI components exclusively
   - Maintain mobile-first responsive design

2. Consider adding these color scheme options:
   - `'light'` - Light mode
   - `'dark'` - Dark mode
   - `'auto'` - Follow system preference (optional enhancement)

3. Equal Experts branding must remain consistent:
   - Use the same logo URL: `https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg`
   - Logo may need different styling/filters in dark mode for visibility

4. The theme toggle should be placed in a consistent location across all pages (e.g., top-right corner)

## Open Questions to Address

- Should we provide an "auto" option that always follows system preference?
- Does Equal Experts have dark mode logo variants to use? (If not, use CSS filters for logo visibility)

## Dependencies

- MVP survey UI must be complete (stories 019-039) ✓
- Mantine UI v7.17.8+ installed ✓

## Execution Workflow

When implementing this story:
1. Read all files listed in "Files Affected" to understand current implementation
2. Start with core theme configuration and ColorSchemeScript
3. Create the ThemeToggle component
4. Test theme switching works without flash
5. Update each page and component to ensure dark mode compatibility
6. Run the application and verify all acceptance criteria
7. Test accessibility with keyboard navigation and screen reader
8. Test across different browsers
9. Ask for review before committing

## Rules to Follow

Consider the following rules during implementation:
- `rules/react-rules.md`
- `rules/typescript-rules.md`
- `CLAUDE.md` (Equal Experts branding guidelines)
