# User Story: Admin Dashboard

**Story ID**: STORY-045
**Iteration**: 2025-12-02-admin-page
**Priority**: Must Have
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, llm-dev

## User Story
As a Conference Organizer,
I want to view survey response data through a web dashboard,
So that I can understand attendee feedback without needing database access.

## Context
Conference organizers currently have no way to view survey responses without direct database queries. This dashboard provides a complete read-only interface at `/admin` with tab-based navigation between three views: Overview, Responses, and Analytics.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Data visibility for non-technical stakeholders
**Supporting Evidence**: Stakeholder interview identifying need for respondent counts, individual response review, and aggregate analytics

## User Experience Design

### Navigation Structure
- Horizontal tab bar with three tabs: **Overview** (default), **Responses**, **Analytics**
- Header shows "Admin Dashboard" title with export buttons (CSV, PDF) always visible
- No authentication required - dashboard accessible directly at `/admin`

### Overview Tab (Default View)
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                    [CSV] [PDF] │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]  [Analytics]           │
├─────────────────────────────────────────────────┤
│   ┌──────────────┐  ┌──────────────┐           │
│   │     47       │  │      3       │           │
│   │  Completed   │  │  In Progress │           │
│   └──────────────┘  └──────────────┘           │
│                                                 │
│   Latest Responses                              │
│   ┌─────────────────────────────────────────┐  │
│   │ #47  Dec 3, 2025 2:34pm    [View →]     │  │
│   │ #46  Dec 3, 2025 1:12pm    [View →]     │  │
│   │ #45  Dec 2, 2025 4:45pm    [View →]     │  │
│   └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Elements:**
- Two large metric cards showing completed and in-progress counts
- "Latest Responses" section showing 5 most recent submissions
- Each response row shows: ID number, formatted timestamp, "View" link
- Clicking "View" navigates to Responses tab with that respondent selected

### Responses Tab (Master-Detail)
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                    [CSV] [PDF] │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]  [Analytics]           │
├──────────────────┬──────────────────────────────┤
│  Responses (47)  │  Response #42                │
│  ──────────────  │  Submitted: Dec 2, 2:34pm    │
│    #47 Dec 3     │  ────────────────────────    │
│    #46 Dec 3     │                              │
│    #45 Dec 2     │  Q1: Overall Satisfaction    │
│    #44 Dec 2     │  ★★★★☆ (4 - Satisfied)      │
│    #43 Dec 2     │                              │
│    #42 Dec 2  ◀  │  Q2: Session Quality         │
│    #41 Dec 1     │  ★★★★★ (5 - Very Satisfied) │
│    #40 Dec 1     │                              │
│    ...           │  Q3: Topics Selected         │
│                  │  • AI/ML                     │
│  [Load More]     │  • Cloud Architecture        │
│                  │                              │
│                  │  Q4: Open Feedback           │
│                  │  "Great conference!"         │
│                  │                              │
│                  │  ... (all 19 questions)      │
└──────────────────┴──────────────────────────────┘
```

**Elements:**
- Master-detail layout: respondent list on left (approx 30% width), detail pane on right (70%)
- List header shows total count: "Responses (47)"
- List items show: ID number, abbreviated date
- List sorted by most recent first
- Selected item highlighted with visual indicator
- "Load More" button at bottom for pagination (not page numbers)
- Detail pane header: "Response #[ID]" and full formatted timestamp
- Detail pane body: all 19 questions with answers
- Question display varies by type:
  - Likert: Star rating with numeric value and label (e.g., "★★★★☆ (4 - Satisfied)")
  - Multi-select: Bulleted list of selected options
  - Ranking: Numbered list in rank order
  - Open-ended: Quoted text block

### Analytics Tab (Scrolling Charts)
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                    [CSV] [PDF] │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]  [Analytics]           │
├─────────────────────────────────────────────────┤
│  Q1: Overall Satisfaction (47 responses)        │
│  ┌────────────────────────────┐                │
│  │      [PIE CHART]           │                │
│  │   Very Satisfied: 45%      │                │
│  │   Satisfied: 35%           │                │
│  │   Neutral: 15%             │                │
│  │   Dissatisfied: 5%         │                │
│  └────────────────────────────┘                │
│                                                 │
│  Q3: Topics of Interest (47 responses)          │
│  ┌────────────────────────────┐                │
│  │      [BAR CHART]           │                │
│  │   AI/ML          ████████ 32                │
│  │   Cloud          ██████ 28                  │
│  │   DevOps         █████ 24                   │
│  └────────────────────────────┘                │
│                                                 │
│  Q15: Additional Comments (23 responses)        │
│  ┌────────────────────────────┐                │
│  │ "Great conference!"         │                │
│  │ "More hands-on workshops"   │                │
│  │ [Show all 23 responses]     │                │
│  └────────────────────────────┘                │
└─────────────────────────────────────────────────┘
```

**Elements:**
- Single scrolling page containing all 19 questions
- Each question displayed as a card with:
  - Question number and text as header
  - Response count in parentheses
  - Visualization appropriate to question type
- Chart types by question type:
  - **Pie chart**: Likert-scale questions (5-point satisfaction, agreement scales)
  - **Bar chart**: Multi-select questions, ranking questions
  - **Text list**: Open-ended/essay questions
- Pie charts include legend with percentages
- Bar charts show category labels with count values
- Essay questions show first 3 responses with "Show all N responses" expand link

### Empty States
- **No responses**: Metric cards show "0", list shows "No responses yet" message, charts show "No data to display"
- **Loading**: Skeleton loaders for metric cards, list items, and chart areas

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: View Overview Tab**
- **Given** the organizer navigates to `/admin`
- **When** the page loads
- **Then** the Overview tab is selected by default
- **And** they see two metric cards with completed and in-progress counts
- **And** they see a "Latest Responses" section with the 5 most recent submissions
- **And** each response row shows ID, formatted timestamp, and View link

**Scenario 2: Navigate from Overview to Response Detail**
- **Given** the organizer is on the Overview tab
- **When** they click "View" on a response in the Latest Responses list
- **Then** the Responses tab becomes active
- **And** that specific response is selected in the list
- **And** the detail pane shows that response's answers

**Scenario 3: Browse Responses List**
- **Given** the organizer is on the Responses tab
- **When** the tab loads
- **Then** they see a master-detail layout
- **And** the list shows response IDs sorted by most recent first
- **And** the first response is selected by default
- **And** the detail pane shows all 19 questions with that respondent's answers

**Scenario 4: Select Different Response**
- **Given** the organizer is viewing the Responses tab
- **When** they click on a different response in the list
- **Then** that response becomes selected (visually highlighted)
- **And** the detail pane updates to show that response's answers

**Scenario 5: Load More Responses**
- **Given** more than the initial batch of responses exist
- **When** the organizer clicks "Load More"
- **Then** additional responses are appended to the list
- **And** the currently selected response remains selected

**Scenario 6: View Analytics Charts**
- **Given** the organizer clicks the Analytics tab
- **When** the tab loads
- **Then** they see a scrolling page with all 19 questions
- **And** Likert questions display as pie charts with percentage legends
- **And** multi-select and ranking questions display as bar charts with counts
- **And** open-ended questions display as text lists with expand option

**Scenario 7: Expand Essay Responses**
- **Given** the organizer is viewing an essay question in Analytics
- **When** they click "Show all N responses"
- **Then** all responses for that question are displayed
- **And** the link text changes to "Show less"

**Scenario 8: No Data Available**
- **Given** no survey responses exist
- **When** the organizer views the dashboard
- **Then** metric cards show "0" for both counts
- **And** Latest Responses shows "No responses yet"
- **And** Responses list shows empty state message
- **And** Analytics charts show "No data to display"

### Non-Functional Requirements
- [ ] Performance: Dashboard loads within 2 seconds for up to 500 responses
- [ ] Accessibility: Tab navigation works via keyboard (arrow keys, Enter)
- [ ] Accessibility: Charts have text alternatives (legends, screen reader labels)
- [ ] Accessibility: All interactive elements have visible focus states
- [ ] Responsive: Dashboard is usable on tablet and desktop (minimum 768px width)
- [ ] Responsive: Mobile optimization not required

### Quality Checklist
- [ ] Tab navigation works correctly (URL updates, browser back works)
- [ ] Overview metrics match actual database counts
- [ ] Responses list pagination works without losing selection
- [ ] All 19 questions render correctly in detail pane
- [ ] Pie charts render with correct percentages summing to 100%
- [ ] Bar charts render with correct counts
- [ ] Essay expand/collapse works correctly
- [ ] Empty states display appropriately when no data exists
- [ ] Loading states show during data fetch

## Open Questions
- Respondent identification: Using sequential submission ID (e.g., #42) - confirm acceptable
- Chart library selection: Implementation decision (Recharts recommended for React/Mantine compatibility)

## Dependencies
- Survey submission functionality from MVP iteration (existing)
- Database schema with response data (existing)

## Estimate
**Size**: L
**Confidence**: High

**Reasoning**: Three distinct views with charting functionality and master-detail interaction. Clear UX requirements. Main complexity is chart integration and state management for tab/selection navigation.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-02
**Last Updated**: 2025-12-03
**Build Date**:
