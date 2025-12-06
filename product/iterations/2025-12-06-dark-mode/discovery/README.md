# Iteration Discovery: 2025-12-06-dark-mode

**Started**: 2025-12-06
**Focus**: Enable conference attendees to use the survey in dark mode for comfortable completion in low-light conditions without eye strain
**Status**: Active

## Goals

- Reduce eye strain for users in low-light conditions
- Provide both automatic (OS preference) and manual theme switching
- Ensure WCAG AA accessibility compliance in dark mode
- Deliver consistent dark mode experience across survey and admin areas

## Research Methods

- [x] AI-guided stakeholder interview (Dan, 2025-12-06)
- [ ] Technical observations
- [ ] Additional research as needed

## Timeline

- **Start**: 2025-12-06
- **Target synthesis**: Ready for `/synth`

## Key Decisions

1. **Scope**: Dark mode applies to entire application (survey, thank you page, admin dashboard)
2. **Toggle behavior**: Both automatic (OS preference detection) AND manual toggle
3. **Persistence**: User preference stored in localStorage across sessions
4. **Toggle location**: Prominent/obvious location (header area)
5. **Shared state**: Admin and survey share the same toggle/preference

## Technical Requirements

- Theme switching instant without layout shift
- Cross-browser: Chrome, Safari, Firefox, Edge
- Keyboard accessible toggle
- Screen reader announces state changes
- WCAG AA contrast for all text
- Visible focus indicators in dark mode

## Notes

Interview conducted with Dan (stakeholder) on 2025-12-06. Clear emphasis on accessibility and polish. No existing dark mode brand guidelines - colors to be derived from existing brand palette (Primary Blue #1795d4, Navy #22567c, Charcoal #2c3234).
