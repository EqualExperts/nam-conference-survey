# User Story: Responses Tab

**Story ID**: STORY-048
**Iteration**: 2025-12-02-admin-page
**Priority**: Must Have
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, llm-dev

## User Story
As a Conference Organizer,
I want to browse all survey responses in a master-detail view on a dedicated Responses tab,
So that I can systematically review individual feedback across all submissions.

## Context
The admin overview page (STORY-045) shows only the 5 most recent responses. This story adds a dedicated Responses tab with a full master-detail interface for browsing all responses. This story also introduces tab navigation to the admin dashboard.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Complete response review capability
**Supporting Evidence**: Stakeholder interview identifying need for individual response review

## User Experience Design

### Navigation Structure
- Add horizontal tab bar below the "Admin Dashboard" header
- Two tabs: **Overview** (default), **Responses**
- Tab selection persists in URL (e.g., `/admin?tab=responses`)
- Browser back/forward navigation works with tabs

### Updated Page Layout with Tabs
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                                │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]                        │
├─────────────────────────────────────────────────┤
│  (tab content below)                            │
└─────────────────────────────────────────────────┘
```

### Responses Tab (Master-Detail)
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                                │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]                        │
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

**Master List (Left Panel - 30% width):**
- Header: "Responses (47)" showing total count
- List items: ID number and abbreviated date
- Sorted by most recent first
- Selected item highlighted with visual indicator (arrow or background)
- "Load More" button at bottom for pagination
- Initial load: 20 responses

**Detail Panel (Right Panel - 70% width):**
- Header: "Response #[ID]" with full formatted timestamp
- Scrollable body with all 19 questions and answers
- Same question display format as STORY-046 modal:
  - Likert: Star rating with numeric value and label
  - Multi-select: Bulleted list
  - Ranking: Numbered list
  - Open-ended: Quoted text block
  - Unanswered: "No response" in italic

### Empty State (Responses Tab)
```
┌──────────────────┬──────────────────────────────┐
│  Responses (0)   │                              │
│  ──────────────  │   No responses yet           │
│                  │                              │
│  No responses    │   Survey responses will      │
│                  │   appear here once           │
│                  │   submitted.                 │
└──────────────────┴──────────────────────────────┘
```

### Loading State
- Skeleton loaders for list items
- Skeleton loader for detail panel content

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Navigate to Responses Tab**
- **Given** the organizer is on the admin overview page
- **When** they click the "Responses" tab
- **Then** the Responses tab becomes active
- **And** they see the master-detail layout
- **And** the URL updates to include tab parameter

**Scenario 2: View Response List**
- **Given** the organizer is on the Responses tab
- **When** the tab loads
- **Then** they see a list of responses on the left panel
- **And** the list header shows total count
- **And** responses are sorted by most recent first
- **And** the first response is selected by default

**Scenario 3: View Response Detail**
- **Given** the organizer is on the Responses tab
- **When** the first response is selected by default
- **Then** the detail panel shows that response's header
- **And** all 19 questions display with answers

**Scenario 4: Select Different Response**
- **Given** the organizer is viewing the Responses tab
- **When** they click on a different response in the list
- **Then** that response becomes selected (visually highlighted)
- **And** the detail panel updates to show that response's answers

**Scenario 5: Load More Responses**
- **Given** more than 20 responses exist
- **When** the organizer clicks "Load More"
- **Then** additional responses are appended to the list
- **And** the currently selected response remains selected
- **And** the button disappears when all responses are loaded

**Scenario 6: Navigate via Overview View Link**
- **Given** the organizer is on the Overview tab
- **When** they click "View" on a response in Recent Responses
- **Then** the Responses tab becomes active
- **And** that specific response is selected in the list
- **And** the detail panel shows that response's answers

**Scenario 7: Tab Navigation via URL**
- **Given** the organizer directly navigates to `/admin?tab=responses`
- **When** the page loads
- **Then** the Responses tab is active
- **And** the master-detail layout displays

**Scenario 8: Browser Back/Forward**
- **Given** the organizer navigates from Overview to Responses tab
- **When** they click the browser back button
- **Then** the Overview tab becomes active
- **And** clicking forward returns to Responses tab

**Scenario 9: Empty Responses**
- **Given** no survey responses exist
- **When** the organizer views the Responses tab
- **Then** the list shows "No responses" message
- **And** the detail panel shows empty state message

### Non-Functional Requirements
- [ ] Performance: Tab switch is instantaneous (no full page reload)
- [ ] Performance: Initial list loads within 1 second
- [ ] Performance: "Load More" fetches within 500ms
- [ ] Accessibility: Tab navigation works via keyboard (arrow keys between tabs, Enter to select)
- [ ] Accessibility: List items are keyboard navigable
- [ ] Accessibility: Selected item is announced to screen readers
- [ ] Responsive: Master-detail layout stacks on smaller screens (< 900px)

### Quality Checklist
- [ ] Tab bar displays correctly with both tabs
- [ ] Tab selection updates URL parameter
- [ ] Browser history works correctly with tab navigation
- [ ] Response list shows correct total count
- [ ] List pagination works without losing selection
- [ ] All 19 questions render correctly in detail pane
- [ ] Empty states display appropriately
- [ ] Loading states display during data fetch
- [ ] View link from Overview navigates to correct response

## Dependencies
- STORY-045: Admin Overview Page (provides base page structure)
- STORY-046: Response Detail Modal (shares question display component)

Note: STORY-048 adds the Responses tab and updates the Overview "View" links to navigate to it.

## Estimate
**Size**: M
**Confidence**: High

**Reasoning**: Introduces tab navigation and master-detail layout. Question display can reuse component from STORY-046. Main complexity is state management for list selection and pagination.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-05
**Last Updated**: 2025-12-05
**Build Date**:
