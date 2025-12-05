# User Story: Analytics Tab

**Story ID**: STORY-049
**Iteration**: 2025-12-02-admin-page
**Priority**: Must Have
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, llm-dev

## User Story
As a Conference Organizer,
I want to view aggregate charts for questions with fixed answer options,
So that I can understand overall trends in attendee feedback at a glance.

## Context
Individual response review (STORY-046, STORY-048) shows one respondent at a time. This story adds an Analytics tab with aggregate visualizations for questions that have fixed answer options (Likert scales, multi-select, ranking). Open-ended text questions are excluded from this tab - they will be covered in STORY-050.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Aggregate analytics for non-technical stakeholders
**Supporting Evidence**: Stakeholder interview identifying need for aggregate analytics

## User Experience Design

### Navigation Update
- Add "Analytics" tab to existing tab bar
- Tab order: **Overview**, **Responses**, **Analytics**

### Analytics Tab Layout
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                                │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]  [Analytics]           │
├─────────────────────────────────────────────────┤
│                                                 │
│  Q1: Overall Satisfaction (47 responses)        │
│  ┌────────────────────────────┐                │
│  │      [PIE CHART]           │                │
│  │   Very Satisfied: 45%      │                │
│  │   Satisfied: 35%           │                │
│  │   Neutral: 15%             │                │
│  │   Dissatisfied: 5%         │                │
│  │   Very Dissatisfied: 0%    │                │
│  └────────────────────────────┘                │
│                                                 │
│  Q3: Topics of Interest (47 responses)          │
│  ┌────────────────────────────┐                │
│  │      [BAR CHART]           │                │
│  │   AI/ML          ████████ 32                │
│  │   Cloud          ██████ 28                  │
│  │   DevOps         █████ 24                   │
│  │   Security       ████ 18                    │
│  └────────────────────────────┘                │
│                                                 │
│  Q7: Session Ranking (Average Position)         │
│  ┌────────────────────────────┐                │
│  │      [BAR CHART]           │                │
│  │   Keynote        ████████ 1.2               │
│  │   Workshop A     ██████ 2.4                 │
│  │   Panel          █████ 2.8                  │
│  └────────────────────────────┘                │
│                                                 │
│  ... (scrollable for all fixed-answer Qs)       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Page Structure:**
- Single scrolling page
- Each question displayed as a card
- Only questions with fixed answer options shown (excludes open-ended text)

### Chart Types by Question Type

**Likert Scale Questions (Pie Chart):**
- 5-point scale questions display as pie charts
- Legend shows each option with percentage
- Percentages sum to 100%
- Colors: consistent palette (e.g., green for positive, yellow for neutral, red for negative)

**Multi-Select Questions (Horizontal Bar Chart):**
- Each option shown as a bar
- Bar length proportional to selection count
- Count displayed at end of bar
- Sorted by count (highest first)

**Ranking Questions (Horizontal Bar Chart):**
- Each option shown as a bar
- Bar represents average position (1 = first, lower is better)
- Average position displayed at end of bar
- Sorted by average position (best first)

### Question Card Structure
```
┌─────────────────────────────────────────────────┐
│  Q[N]: [Question Text] ([X] responses)          │
│  ───────────────────────────────────────────    │
│                                                 │
│  [Chart Visualization]                          │
│                                                 │
│  [Legend if applicable]                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Elements:**
- Question number and full text as header
- Response count in parentheses (counts only non-null responses)
- Chart appropriate to question type
- Legend for pie charts (inline or below)

### Empty State
```
┌─────────────────────────────────────────────────┐
│  Q1: Overall Satisfaction (0 responses)         │
│  ┌────────────────────────────┐                │
│  │                            │                │
│  │    No data to display      │                │
│  │                            │                │
│  └────────────────────────────┘                │
└─────────────────────────────────────────────────┘
```

### Loading State
- Skeleton loaders for each chart card area

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Navigate to Analytics Tab**
- **Given** the organizer is on the admin dashboard
- **When** they click the "Analytics" tab
- **Then** the Analytics tab becomes active
- **And** they see a scrolling page with chart cards
- **And** the URL updates to include tab parameter

**Scenario 2: View Likert Question Chart**
- **Given** the organizer is on the Analytics tab
- **When** they view a Likert-scale question
- **Then** a pie chart displays with all 5 response options
- **And** each slice shows the percentage of responses
- **And** percentages sum to 100%
- **And** the legend identifies each slice by label

**Scenario 3: View Multi-Select Question Chart**
- **Given** the organizer is on the Analytics tab
- **When** they view a multi-select question
- **Then** a horizontal bar chart displays
- **And** each option shows as a bar with count
- **And** options are sorted by count (highest first)

**Scenario 4: View Ranking Question Chart**
- **Given** the organizer is on the Analytics tab
- **When** they view a ranking question
- **Then** a horizontal bar chart displays
- **And** each option shows with average position
- **And** options are sorted by average position (best first)

**Scenario 5: Response Count Accuracy**
- **Given** some respondents skipped certain questions
- **When** the organizer views the Analytics tab
- **Then** each question card shows the count of non-null responses
- **And** percentages are calculated from responses to that specific question

**Scenario 6: No Data for Question**
- **Given** no responses exist for a particular question
- **When** the organizer views that question's card
- **Then** the chart area shows "No data to display"

**Scenario 7: All Empty**
- **Given** no survey responses exist
- **When** the organizer views the Analytics tab
- **Then** all question cards show 0 responses
- **And** all chart areas show "No data to display"

### Non-Functional Requirements
- [ ] Performance: Analytics tab loads within 2 seconds for up to 500 responses
- [ ] Accessibility: Charts have text alternatives (data tables or ARIA descriptions)
- [ ] Accessibility: Color choices meet contrast requirements
- [ ] Accessibility: Charts are not the only means of conveying data (legends include values)
- [ ] Responsive: Charts resize appropriately on tablet and desktop

### Quality Checklist
- [ ] Tab bar shows all three tabs correctly
- [ ] Only fixed-answer questions appear (no open-ended text questions)
- [ ] Pie charts show correct percentages summing to 100%
- [ ] Bar charts show correct counts/averages
- [ ] Charts are sorted correctly (by count or position)
- [ ] Response counts per question are accurate
- [ ] Empty states display appropriately
- [ ] Loading states display during data fetch

## Open Questions
- Chart library selection: Implementation decision (Recharts recommended for React/Mantine compatibility)

## Dependencies
- STORY-048: Responses Tab (establishes tab navigation pattern)
- Survey submission functionality from MVP iteration (existing)

## Estimate
**Size**: M
**Confidence**: High

**Reasoning**: Chart library integration required. Multiple chart types but all standard visualizations. Data aggregation logic is straightforward.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-05
**Last Updated**: 2025-12-05
**Build Date**:
