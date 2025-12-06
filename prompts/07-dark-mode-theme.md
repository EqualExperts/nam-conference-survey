# Dark Mode Theme Support

This feature enables users to view the survey application in dark mode, reducing eye strain during low-light conditions such as evening conference sessions or dimly lit venues. Users can toggle between light and dark themes manually or have the application automatically respect their operating system preference. The theme preference persists across sessions, providing a consistent experience for returning users.

## Requirements

- Application must detect and respect the user's OS dark mode preference (`prefers-color-scheme`) on first visit
- A clearly visible theme toggle must be present in the header area on all pages
- Theme toggle must switch between light and dark modes instantly without page reload or layout shift
- User's manual theme preference must persist in localStorage across sessions
- Dark mode must apply consistently across all pages: Survey, Thank You page, and Admin Dashboard
- All text must meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text) in dark mode
- Focus indicators must be clearly visible in dark mode (distinct from background)
- Theme toggle must be keyboard accessible (Enter/Space to activate)
- Theme toggle must announce state changes to screen readers
- No flash of incorrect theme on page load (prevent FOUC - Flash of Unstyled Content)
- Theme switching must work correctly across Chrome, Safari, Firefox, and Edge

## Rules

- rules/react-rules.md
- rules/typescript-rules.md
- rules/design-rules.md
- rules/state-management-rules.md

## Component Architecture

```typescript
// Theme types
type ColorScheme = 'light' | 'dark' | 'auto';

interface ThemeContextValue {
  colorScheme: 'light' | 'dark';     // Resolved scheme (never 'auto')
  preference: ColorScheme;            // User's preference (includes 'auto')
  toggleColorScheme: () => void;      // Toggle between light/dark
  setColorScheme: (scheme: ColorScheme) => void;  // Set specific scheme
}

// Local storage key
const THEME_STORAGE_KEY = 'nam-survey-color-scheme';

// Component structure
App
├── ThemeProvider (wraps MantineProvider)
│   ├── ThemeToggle (in header/layout)
│   └── [All page content]
│       ├── SurveyPage
│       ├── ThankYouPage
│       └── AdminDashboardPage

// ThemeToggle component
interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}
```

## Extra Considerations

- **Theme Detection Priority**:
  1. Check localStorage for saved preference
  2. If localStorage value is 'auto' or missing, detect OS preference via `prefers-color-scheme`
  3. Apply resolved theme before first paint to prevent flash

- **Mantine Integration**:
  - Use Mantine's built-in `MantineProvider` with `colorScheme` prop
  - Leverage Mantine's `useMantineColorScheme` hook if available
  - Ensure all Mantine components automatically adapt (Cards, Buttons, Inputs, etc.)

- **Dark Mode Color Palette** (derived from Equal Experts brand):
  - Background: `#1a1b1e` (dark charcoal)
  - Surface/Cards: `#25262b` (elevated surfaces)
  - Primary: `#1795d4` (Equal Experts Blue - unchanged)
  - Text Primary: `#c1c2c5` (light gray)
  - Text Secondary: `#909296` (muted gray)
  - Border: `#373a40` (subtle borders)
  - Focus Ring: `#1795d4` (primary blue for accessibility)

- **FOUC Prevention**:
  - Add inline script in `index.html` to set theme class before React hydration
  - Script reads localStorage and sets `data-mantine-color-scheme` attribute on `<html>`
  - This ensures correct theme is applied before first paint

- **Accessibility**:
  - Toggle button must have `aria-label` describing action: "Switch to dark mode" / "Switch to light mode"
  - Use `aria-pressed` or `role="switch"` with `aria-checked` for toggle state
  - Announce theme change via `aria-live` region or screen reader announcement
  - Ensure focus outline is visible against both light and dark backgrounds

- **Icon Treatment**:
  - Use sun icon for light mode indicator
  - Use moon icon for dark mode indicator
  - Consider using Mantine's `ActionIcon` for consistent styling

- **Edge Cases**:
  - Handle case where localStorage contains invalid value (fallback to 'auto')
  - Handle case where `matchMedia` is not supported (fallback to 'light')
  - Ensure theme persists correctly when multiple tabs are open

## Testing Considerations

- **Unit Tests**:
  - Test theme context provides correct initial value from localStorage
  - Test theme context provides correct initial value from OS preference when no localStorage
  - Test `toggleColorScheme` correctly alternates between light and dark
  - Test localStorage is updated when theme changes
  - Test ThemeToggle renders correct icon for each state
  - Test ThemeToggle has correct ARIA attributes

- **Integration Tests**:
  - Test theme applies to survey page components
  - Test theme applies to admin dashboard components
  - Test theme persists after page navigation
  - Test theme persists after page refresh

- **E2E Tests (Playwright)**:
  - Test default theme matches OS preference (use `page.emulateMedia({ colorScheme: 'dark' })`)
  - Test clicking toggle switches visual theme
  - Test theme persists across page refresh
  - Test theme persists across navigation to different pages
  - Test no flash of incorrect theme on load
  - Test keyboard accessibility of toggle (Tab to focus, Enter to activate)

- **Visual/Contrast Testing**:
  - Verify all text meets WCAG AA contrast in dark mode
  - Verify focus indicators are visible on dark backgrounds
  - Verify all Mantine components render correctly in dark mode
  - Screenshot comparison between light and dark modes

## Implementation Notes

- **File Locations**:
  - Theme provider: `apps/frontend/src/providers/ThemeProvider.tsx`
  - Theme toggle: `apps/frontend/src/components/ThemeToggle.tsx`
  - Theme hook: `apps/frontend/src/hooks/useTheme.ts` (optional if using Mantine's built-in)
  - FOUC prevention script: inline in `apps/frontend/index.html`

- **Mantine v7 Approach**:
  - Use `MantineProvider` with `defaultColorScheme="auto"` for initial OS detection
  - Use `useMantineColorScheme()` hook for getting/setting color scheme
  - Mantine handles localStorage persistence automatically with `colorSchemeManager`

- **CSS Custom Properties**:
  - Mantine v7 uses CSS custom properties (variables) for theming
  - Custom styles should use Mantine's theme variables: `var(--mantine-color-body)`
  - Avoid hardcoded colors in component styles

- **Header Integration**:
  - Add ThemeToggle to existing header/layout component
  - Position on right side of header, near any existing controls
  - Ensure it doesn't interfere with survey flow or distract from questions

- **Bundle Size**:
  - Theme functionality should add minimal bundle size
  - Mantine's dark mode support is already included
  - Only new code is ThemeToggle component (~1-2KB)

## Specification by Example

### User Journey: First-Time Visit with OS Dark Mode

**Scenario**: User with OS dark mode enabled opens survey for first time

1. User navigates to survey URL
2. Page renders immediately in dark mode (no flash of light theme)
3. Survey background is dark charcoal (`#1a1b1e`)
4. Question cards have slightly elevated dark surface (`#25262b`)
5. Text is readable light gray (`#c1c2c5`)
6. Equal Experts blue (`#1795d4`) is used for interactive elements
7. Theme toggle in header shows sun icon (indicating click will switch to light)
8. User clicks toggle → theme instantly switches to light mode
9. Toggle now shows moon icon
10. User refreshes page → light mode persists

### User Journey: Keyboard Navigation of Toggle

1. User presses Tab to focus on theme toggle
2. Visible focus ring appears around toggle button
3. Screen reader announces: "Switch to dark mode, button"
4. User presses Enter
5. Theme switches to dark mode instantly
6. Screen reader announces: "Dark mode enabled" (via aria-live)
7. Focus remains on toggle button

### API: localStorage Schema

```javascript
// Key: 'nam-survey-color-scheme'
// Values: 'light' | 'dark' | 'auto'

// Examples:
localStorage.setItem('nam-survey-color-scheme', 'dark');  // User prefers dark
localStorage.setItem('nam-survey-color-scheme', 'light'); // User prefers light
localStorage.setItem('nam-survey-color-scheme', 'auto');  // Follow OS preference
```

## Verification

- [ ] Theme toggle is visible in header on Survey page
- [ ] Theme toggle is visible in header on Thank You page
- [ ] Theme toggle is visible in header on Admin Dashboard page
- [ ] Clicking toggle switches between light and dark modes instantly
- [ ] No layout shift or flicker during theme switch
- [ ] Theme persists after page refresh (localStorage)
- [ ] Theme persists when navigating between pages
- [ ] First visit respects OS dark mode preference
- [ ] First visit respects OS light mode preference
- [ ] No flash of wrong theme on page load (FOUC prevention works)
- [ ] All text meets WCAG AA contrast in dark mode (verify with contrast checker)
- [ ] Focus indicators visible on all interactive elements in dark mode
- [ ] Theme toggle is keyboard accessible (Tab → Enter works)
- [ ] Theme toggle has proper ARIA label ("Switch to dark mode" / "Switch to light mode")
- [ ] Screen reader announces theme state change
- [ ] Works correctly in Chrome
- [ ] Works correctly in Safari
- [ ] Works correctly in Firefox
- [ ] Works correctly in Edge
- [ ] All Mantine components (Cards, Buttons, Inputs, etc.) render correctly in dark mode
- [ ] Survey question components render correctly in dark mode
- [ ] Admin dashboard metrics cards render correctly in dark mode
- [ ] Equal Experts logo is visible in both modes (or has appropriate dark mode variant)
- [ ] Unit tests cover theme context and toggle component
- [ ] E2E tests verify theme persistence and toggle functionality
- [ ] No console errors or warnings related to theming
- [ ] Bundle size increase is minimal (<5KB)
