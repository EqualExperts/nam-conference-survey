# Dark Mode for Reduced Eye Strain

**Story Reference**: STORY-047 (iterations/2025-12-02-dark-mode/stories/story-047-dark-mode.md)

Many conference attendees complete surveys during evening sessions or in dimly lit conference venues. Implementing dark mode reduces eye strain, improves readability in low-light conditions, and extends battery life on OLED devices. This feature provides automatic detection of system preferences and allows users to manually toggle between light, dark, and auto modes with persistence across sessions. Dark mode has become a standard accessibility expectation for modern web applications.

## Requirements

- User sees dark mode automatically when their device settings have dark mode enabled
- User can manually toggle between light mode, dark mode, and auto mode (follows system preference)
- User's theme preference persists across page loads and browser sessions
- Page renders in the correct theme immediately without flashing the wrong theme first (no FOUC)
- All survey pages and components use consistent dark mode styling
- All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text) in dark mode
- Focus indicators are clearly visible in dark mode
- Theme switching happens instantly without layout shift or flicker
- Theme toggle is keyboard accessible and announces state changes to screen readers
- Theme toggle works correctly across Chrome, Safari, Firefox, and Edge

## Rules

- rules/react-rules.md
- rules/typescript-rules.md
- rules/clean-code.md

## Component Architecture

```typescript
// Theme types
type Theme = 'light' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dark';

// Theme context and hook
interface ThemeContextValue {
  theme: Theme;                    // User preference: light, dark, or auto
  resolvedTheme: ResolvedTheme;    // Actual theme applied: light or dark
  setTheme: (theme: Theme) => void;
}

// Provider component
<ThemeProvider>
  {/* Entire app wrapped */}
</ThemeProvider>

// Theme toggle component
interface ThemeToggleProps {
  variant?: 'button' | 'switch';
  size?: 'sm' | 'md' | 'lg';
}

<ThemeToggle variant="button" size="md" />

// Usage in components
const { theme, resolvedTheme, setTheme } = useTheme();

// Component hierarchy
App
├── ThemeProvider (context provider)
│   ├── ThemeScript (prevents FOUC, inlined in HTML head)
│   └── App content
│       ├── SurveyPage
│       │   └── ThemeToggle
│       └── ThankYouPage
│           └── ThemeToggle
```

## Extra Considerations

- **Contrast**: Ensure that grey outlines, bullets and checkboxes have enough contrast against dark background
- **No Flash of Unstyled Content (FOUC)**: Theme must be applied before React hydrates. Use an inline script in the HTML head that reads localStorage and sets the data-theme attribute on the root element before first paint
- **System preference detection**: Use `window.matchMedia('(prefers-color-scheme: dark)')` to detect system preference for auto mode
- **System preference changes**: Listen for changes to system preference when in auto mode and update theme accordingly
- **LocalStorage persistence**: Store user's theme preference (light/dark/auto) in localStorage with key like `survey-theme-preference`
- **Mantine integration**: Leverage Mantine's ColorSchemeProvider and theme system for consistent styling across all components
- **Equal Experts branding**: Ensure dark mode colors align with brand identity (Primary Blue: #1795d4, Navy: #22567c, Charcoal: #2c3234)
- **Dark mode color palette**: Define a complete dark mode palette for backgrounds, surfaces, borders, text, and interactive elements
- **Logo considerations**: Check if Equal Experts has a dark mode logo variant (mentioned in open questions). If not, ensure current logo has adequate contrast on dark backgrounds
- **Focus indicators**: Ensure focus rings use colors with sufficient contrast against dark backgrounds (e.g., light blue or white ring)
- **Form inputs**: All form elements (text inputs, selects, checkboxes, radio buttons) must be styled appropriately for dark mode
- **Hover and active states**: Define distinct hover and active states that work in dark mode
- **Loading indicators**: Ensure spinners and loading states are visible in dark mode
- **Accessibility**: Theme toggle must have proper ARIA labels (e.g., `aria-label="Toggle theme"`) and announce current state to screen readers
- **Keyboard navigation**: Theme toggle accessible via Tab and activated via Enter/Space
- **Performance**: Theme detection and application should add minimal JavaScript to the initial bundle. Consider inlining critical theme script

## Testing Considerations

- **Unit tests**: Test ThemeProvider context, useTheme hook, and theme persistence logic
- **Component tests**: Test ThemeToggle component renders correctly and cycles through themes (light → dark → auto → light)
- **Integration tests**: Test theme preference persists after page reload
- **Visual tests**: Manually verify all survey pages render correctly in both light and dark modes
- **Accessibility tests**: Verify keyboard navigation works, screen readers announce theme changes, and contrast ratios meet WCAG AA
- **System preference tests**: Test auto mode correctly follows system preference and updates when system preference changes

## Implementation Notes

- **Mantine ColorScheme**: Use Mantine's built-in `MantineProvider` with `colorScheme` prop and `ColorSchemeProvider` for theme management
- **CSS custom properties**: Define CSS custom properties (CSS variables) for colors that change between themes
- **data-theme attribute**: Apply `data-theme="light"` or `data-theme="dark"` to root element (html or body) for CSS targeting
- **Theme toggle placement**: Place theme toggle in a consistent location across all pages (e.g., top-right corner or footer)
- **Three-state toggle**: Implement toggle that cycles through three states: light → dark → auto → light. Consider using icons (sun, moon, auto)
- **localStorage key**: Use a descriptive key like `survey-theme-preference` to avoid conflicts
- **SSR considerations**: Since this is a client-side app (Vite/React), SSR isn't a concern, but still use inline script to prevent FOUC
- **Performance target**: Theme switching should complete in <50ms without layout shift
- **Reduced motion**: Respect `prefers-reduced-motion` media query when animating theme transitions
- **Script blocks**: Ensure that no `<script>` blocks are generated in markup, but that JS scripts are imported on the page

## Specification by Example

### Example 1: User with dark mode system preference visits survey
```gherkin
Given the user has dark mode enabled in their device settings
And the user has never visited the survey before (no saved preference)
When the user navigates to the survey
Then the survey displays in dark mode immediately
And the theme toggle shows "auto" state
And all survey questions use dark mode styling
```

### Example 2: User manually toggles theme
```gherkin
Given the user is viewing the survey in light mode
When the user clicks the theme toggle
Then the theme switches to dark mode instantly
And the page doesn't flash or shift layout
And the theme toggle shows "dark mode" state
When the user clicks the theme toggle again
Then the theme switches to auto mode
And the theme matches the system preference
```

### Example 3: Theme preference persists
```gherkin
Given the user has set their theme preference to dark mode
When the user completes the survey and sees the thank you page
Then the thank you page displays in dark mode
When the user closes the browser and returns later
Then the survey still displays in dark mode
```

### Example 4: No flash on load
```gherkin
Given the user has dark mode preference saved in localStorage
When the user refreshes the page or navigates to a new survey page
Then the page renders in dark mode from the very first paint
And there is no flash of light mode content
```

### Example 5: Auto mode follows system preference changes
```gherkin
Given the user has theme set to "auto" mode
And their system is currently in light mode
When the user changes their system preference to dark mode
Then the survey automatically switches to dark mode
And the theme toggle still shows "auto" state
```

### Theme Toggle Icon States
- **Light mode**: Sun icon
- **Dark mode**: Moon icon
- **Auto mode**: System/monitor icon or "A" badge

### Keyboard Interaction
```
Tab → Focus theme toggle
Enter/Space → Cycle to next theme (light → dark → auto → light)
Screen reader announces: "Theme toggle, currently [light/dark/auto] mode"
```

## Verification

- [ ] Theme toggle component appears on all survey pages (survey page, thank you page)
- [ ] Theme toggle cycles through three states: light → dark → auto → light
- [ ] User's theme preference persists in localStorage across page loads
- [ ] Page renders in correct theme on first paint without FOUC
- [ ] Auto mode correctly detects and follows system preference
- [ ] Auto mode updates when system preference changes while page is open
- [ ] All text meets WCAG AA contrast requirements in dark mode (verify with contrast checker)
- [ ] Focus indicators are clearly visible in dark mode
- [ ] All form inputs (text, select, checkbox, radio) styled correctly in dark mode
- [ ] All interactive elements (buttons, links) have appropriate hover states in dark mode
- [ ] Equal Experts logo has adequate contrast on dark background
- [ ] Theme toggle is keyboard accessible (Tab to focus, Enter/Space to activate)
- [ ] Theme toggle announces state changes to screen readers
- [ ] No layout shift occurs when switching themes
- [ ] Theme switching completes in under 50ms
- [ ] Works correctly in Chrome, Safari, Firefox, and Edge
- [ ] All Mantine components adapt correctly to dark mode
- [ ] Loading indicators are visible in dark mode
- [ ] Survey questions (Likert scales, multi-select, ranking) render correctly in dark mode
