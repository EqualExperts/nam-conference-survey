# Admin Dashboard Overview Page

This page provides conference organizers with a visual dashboard at `/admin` showing survey participation metrics and recent response activity. The page enables non-technical stakeholders to assess survey engagement without requiring database access, displaying completed/in-progress counts and the 5 most recent submissions.

## Requirements

- Page must be accessible at `/admin` route
- Display two prominent metric cards showing counts for "Completed" and "In Progress" survey responses
- Display a "Recent Responses" section showing the 5 most recent submitted surveys
- Each response row must show: submission ID, formatted timestamp, and a "View" link
- Implement skeleton loading states while data is being fetched
- Implement empty states when no data exists (0 counts, no responses)
- Page must load and render within 2 seconds for datasets up to 500 responses
- All interactive elements must be keyboard accessible with proper ARIA labels
- Page must be responsive from 768px width minimum (tablet/desktop, mobile not required)
- Fetch data from two existing API endpoints concurrently for optimal performance

## Rules

- rules/react-rules.md
- rules/typescript-rules.md
- rules/code-quality-rules.md

## Component Architecture

```typescript
// API response types (from backend endpoints)
interface AdminMetricsResponse {
  completed: number;
  inProgress: number;
}

interface RecentResponseItem {
  id: string;           // UUID of the survey response
  submittedAt: string;  // ISO 8601 timestamp
}

interface AdminRecentResponsesResponse {
  responses: RecentResponseItem[];
}

// Component state
interface AdminDashboardState {
  metrics: AdminMetricsResponse | null;
  recentResponses: AdminRecentResponsesResponse | null;
  loading: boolean;
  error: string | null;
}

// Component structure
AdminDashboardPage
├── MetricsSection
│   ├── MetricCard (Completed)
│   └── MetricCard (In Progress)
└── RecentResponsesSection
    └── ResponseList
        └── ResponseRow (x5)
            ├── Response ID
            ├── Formatted Timestamp
            └── View Link → Opens modal (STORY-046)
```

## Extra Considerations

- **API Integration**:
  - Consume `/api/admin/metrics` endpoint (returns `{ completed, inProgress }`)
  - Consume `/api/admin/recent-responses` endpoint (returns `{ responses: [] }`)
  - Fetch both endpoints concurrently using `Promise.all()` or parallel hooks
  - Base URL should be configurable (environment variable)

- **Timestamp Formatting**:
  - Display timestamps in user-friendly format: "Dec 3, 2025 2:34pm"
  - Parse ISO 8601 timestamps from API
  - Use locale-aware date formatting

- **Empty States**:
  - When metrics are `{ completed: 0, inProgress: 0 }`, still show cards with "0"
  - When responses array is empty, display "No responses yet" message in responses section
  - Empty state should be visually centered and clearly communicate no data exists

- **Accessibility**:
  - Metric cards must have ARIA labels (e.g., "Completed responses count")
  - Response list should be semantic HTML (`<table>` or `<ul>` with proper structure)
  - "View" links must have accessible labels (e.g., "View response #47")
  - Ensure all content is keyboard navigable

- **Responsive Design**:
  - Minimum width: 768px (tablet landscape)
  - Metric cards should be side-by-side on desktop, may stack on tablet
  - Recent responses list should remain readable at minimum width
  - Use Mantine's Grid or Flex for responsive layout

- **Error Handling**:
  - Display user-friendly error message if API calls fail
  - Provide retry mechanism or instructions
  - Don't expose technical error details to users

## Testing Considerations

- **Unit Tests**:
  - Test component renders correctly with mock data
  - Test loading states display skeleton loaders
  - Test empty states display appropriate messages
  - Test timestamp formatting function
  - Test error handling displays error message

- **Integration Tests**:
  - Test component fetches from both endpoints on mount
  - Test component handles successful API responses
  - Test component handles API errors gracefully
  - Test concurrent API calls complete correctly

- **E2E Tests** (Playwright):
  - Navigate to `/admin` and verify page loads
  - Verify metrics display correct counts (with seeded data)
  - Verify recent responses list shows 5 items
  - Verify "View" links are clickable (modal interaction tested in STORY-046)

## Implementation Notes

- **Component Location**: `apps/frontend/src/pages/AdminDashboardPage.tsx`
- **Route Configuration**: Add `/admin` route to router configuration
- **Styling**: Use Mantine UI components (Grid, Card, Skeleton, Text, Stack)
- **HTTP Client**: Use existing fetch/axios setup from frontend app
- **State Management**: Local component state with `useState` and `useEffect` hooks (no global state needed)
- **Date Formatting**: Use `date-fns` or built-in `Intl.DateTimeFormat` for timestamp formatting
- **Component Pattern**: Functional component with hooks (no class components)
- **TypeScript**: Explicit interfaces for all props and state
- **Error Boundaries**: Consider wrapping in error boundary for graceful failure

- **Mantine Components to Use**:
  - `Card` for metric cards
  - `Grid` or `SimpleGrid` for metric card layout
  - `Stack` for vertical spacing
  - `Text` with size/weight props for typography
  - `Skeleton` for loading states
  - `Table` or custom list for response rows
  - `Anchor` or `Button` for "View" links

- **API Base URL**:
  - Use environment variable `VITE_API_BASE_URL` (defaults to `http://localhost:3001` in dev)
  - Construct full URLs: `${baseUrl}/api/admin/metrics`

## Specification by Example

### User Journey: View Dashboard with Data

**Scenario**: Conference organizer navigates to admin dashboard after 50 surveys submitted

1. User navigates to `/admin`
2. Page displays skeleton loaders for ~500ms while fetching data
3. Metrics section appears with two cards:
   - Left card: "47" with label "Completed"
   - Right card: "3" with label "In Progress"
4. Recent Responses section shows 5 rows:
   ```
   #47  Dec 3, 2025 2:34pm    [View →]
   #46  Dec 3, 2025 1:12pm    [View →]
   #45  Dec 2, 2025 4:45pm    [View →]
   #44  Dec 2, 2025 3:21pm    [View →]
   #43  Dec 2, 2025 2:15pm    [View →]
   ```
5. User can click any "View" link to open response modal (STORY-046)

### Responsive Breakpoint Behavior

- **Desktop (1920px)**: Metric cards side-by-side with generous spacing, response list full width
- **Laptop (1024px)**: Metric cards side-by-side with moderate spacing
- **Tablet (768px)**: Metric cards may stack vertically or remain side-by-side (narrower), response list adjusts

### Keyboard Navigation Flow

1. Tab to first metric card (focus visible)
2. Tab to second metric card (focus visible)
3. Tab to "Recent Responses" heading (if focusable)
4. Tab to first "View" link
5. Tab through remaining "View" links
6. Enter key activates "View" link to open modal

## Verification

- [ ] Page is accessible at `/admin` route
- [ ] Both API endpoints are called concurrently on page load
- [ ] Metric cards display "Completed" and "In Progress" labels with counts
- [ ] Metric cards show "0" values when no responses exist
- [ ] Recent Responses section displays 5 most recent submissions (when available)
- [ ] Recent Responses section shows "No responses yet" when empty
- [ ] Response rows display ID (formatted as "#47"), timestamp, and "View" link
- [ ] Timestamps are formatted as "Dec 3, 2025 2:34pm" (locale-aware)
- [ ] Skeleton loaders display during data fetch for metrics and response list
- [ ] All interactive elements (View links) are keyboard accessible
- [ ] Metric cards have appropriate ARIA labels for screen readers
- [ ] Page is responsive and usable at 768px minimum width
- [ ] Error states display user-friendly message when API calls fail
- [ ] Page loads and renders within 2 seconds with 500+ responses in database
- [ ] No console errors or warnings in browser dev tools
- [ ] TypeScript types are explicit for all props, state, and API responses
- [ ] Component follows React hooks best practices (proper dependency arrays)
- [ ] Unit tests cover loading, empty, error, and success states
- [ ] E2E test verifies complete user journey from navigation to data display
