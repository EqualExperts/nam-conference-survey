# User Story: Admin Overview Page

**Story ID**: STORY-045
**Iteration**: 2025-12-02-admin-page
**Priority**: Must Have
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, llm-dev

## User Story
As a Conference Organizer,
I want to see a dashboard overview at `/admin` with response counts and recent submissions,
So that I can quickly assess survey participation without needing database access.

## Context
Conference organizers currently have no way to view survey responses without direct database queries. This story delivers the foundational admin page at `/admin` with key metrics and a list of recent responses. This is the first admin page - no tab navigation yet.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Data visibility for non-technical stakeholders
**Supporting Evidence**: Stakeholder interview identifying need for respondent counts

## User Experience Design

### Page Layout
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                                │
├─────────────────────────────────────────────────┤
│   ┌──────────────┐  ┌──────────────┐           │
│   │     47       │  │      3       │           │
│   │  Completed   │  │  In Progress │           │
│   └──────────────┘  └──────────────┘           │
│                                                 │
│   Recent Responses                              │
│   ┌─────────────────────────────────────────┐  │
│   │ #47  Dec 3, 2025 2:34pm    [View →]     │  │
│   │ #46  Dec 3, 2025 1:12pm    [View →]     │  │
│   │ #45  Dec 2, 2025 4:45pm    [View →]     │  │
│   │ #44  Dec 2, 2025 3:21pm    [View →]     │  │
│   │ #43  Dec 2, 2025 2:15pm    [View →]     │  │
│   └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Elements:**
- Page header: "Admin Dashboard"
- Two large metric cards showing completed and in-progress counts
- "Recent Responses" section showing 5 most recent submissions
- Each response row shows: ID number, formatted timestamp, "View" link
- Clicking "View" opens a modal (see STORY-046)

### Empty State
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                                │
├─────────────────────────────────────────────────┤
│   ┌──────────────┐  ┌──────────────┐           │
│   │      0       │  │      0       │           │
│   │  Completed   │  │  In Progress │           │
│   └──────────────┘  └──────────────┘           │
│                                                 │
│   Recent Responses                              │
│   ┌─────────────────────────────────────────┐  │
│   │                                         │  │
│   │      No responses yet                   │  │
│   │                                         │  │
│   └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Loading State
- Skeleton loaders for metric cards (rectangular placeholder with pulse animation)
- Skeleton loaders for response list rows

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: View Overview Page**
- **Given** the organizer navigates to `/admin`
- **When** the page loads
- **Then** they see the "Admin Dashboard" header
- **And** they see two metric cards with completed and in-progress counts
- **And** they see a "Recent Responses" section with the 5 most recent submissions
- **And** each response row shows ID, formatted timestamp, and View link

**Scenario 2: Metric Card Accuracy**
- **Given** the database contains survey responses
- **When** the organizer views the dashboard
- **Then** the "Completed" count matches the number of fully submitted responses
- **And** the "In Progress" count matches partial submissions (if tracked)

**Scenario 3: Recent Responses Ordering**
- **Given** multiple survey responses exist
- **When** the organizer views the Recent Responses list
- **Then** responses are sorted by submission time, most recent first
- **And** only the 5 most recent are shown

**Scenario 4: No Data Available**
- **Given** no survey responses exist
- **When** the organizer views the dashboard
- **Then** metric cards show "0" for both counts
- **And** Recent Responses shows "No responses yet" message

**Scenario 5: Loading State**
- **Given** the organizer navigates to `/admin`
- **When** data is being fetched
- **Then** skeleton loaders are displayed for metric cards
- **And** skeleton loaders are displayed for the response list

### Non-Functional Requirements
- [ ] Performance: Page loads within 2 seconds for up to 500 responses
- [ ] Accessibility: All elements are keyboard navigable
- [ ] Accessibility: Metric cards have appropriate ARIA labels
- [ ] Responsive: Page is usable on tablet and desktop (minimum 768px width)
- [ ] Responsive: Mobile optimization not required

### Quality Checklist
- [ ] Page accessible at `/admin` route
- [ ] Metric counts match actual database values
- [ ] Recent responses show correct 5 most recent
- [ ] Timestamps are formatted in user-friendly format (e.g., "Dec 3, 2025 2:34pm")
- [ ] Empty states display appropriately
- [ ] Loading states display during data fetch

## Open Questions
- Respondent identification: Using sequential submission ID (e.g., #42) - confirm acceptable

## Dependencies
- Survey submission functionality from MVP iteration (existing)
- Database schema with response data (existing)

## Estimate
**Size**: S
**Confidence**: High

**Reasoning**: Single page with two API calls (counts and recent list). No complex interactions beyond the View link which triggers modal from STORY-046.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-05
**Last Updated**: 2025-12-05
**Build Date**:
