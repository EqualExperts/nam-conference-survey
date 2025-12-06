# Task: Make Equal Experts logo visible in both light and dark modes

The Equal Experts logo SVG (`https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg`) has white text with a cyan accent - it's designed for dark backgrounds. Currently it's invisible on light backgrounds.

## Requirements

- In light mode: Apply a CSS filter to invert/adjust the logo so the text appears dark
- In dark mode: Display the logo as-is (white text works on dark backgrounds)
- The filter should preserve the cyan brand color (`#1795d4`) as much as possible

## Implementation location

- `apps/frontend/src/components/Layout.tsx:24-29` - where the logo `<Image>` component is rendered

## Suggested approach

1. Use Mantine's `useComputedColorScheme` hook to detect current theme
2. Apply a CSS filter conditionally via the `style` prop or Mantine's `lightHidden`/`darkHidden` props
3. Filter options to consider:
   - `filter: invert(1)` - simple but changes cyan color
   - `filter: brightness(0)` - makes everything black (loses cyan)
   - Use two separate Image components with `lightHidden`/`darkHidden` props and different filters

## Acceptance criteria

- [ ] Logo text is visible and readable in light mode
- [ ] Logo displays correctly in dark mode
- [ ] Transition between themes doesn't cause layout shift
