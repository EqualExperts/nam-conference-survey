# User Story: Sentiment Analysis Tab

**Story ID**: STORY-049
**Iteration**: 2025-12-02-admin-page
**Priority**: Should Have
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, llm-dev, ai-feature

## User Story
As a Conference Organizer,
I want to see AI-generated sentiment summaries for open-ended survey questions,
So that I can quickly understand the collective feedback themes without reading every response.

## Context
The Analytics tab (STORY-048) covers questions with fixed answer options but excludes open-ended text questions. This story adds a Sentiment tab with AI-generated narrative summaries for each open-ended question, highlighting strong themes and overall sentiment.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Efficient review of qualitative feedback
**Supporting Evidence**: Large volume of text responses makes manual review time-consuming

## User Experience Design

### Navigation Update
- Add "Sentiment" tab to existing tab bar
- Tab order: **Overview**, **Responses**, **Analytics**, **Sentiment**

### Sentiment Tab Layout
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                                │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]  [Analytics] [Sentiment│
├─────────────────────────────────────────────────┤
│                                                 │
│  Q5: What did you enjoy most? (38 responses)    │
│  ┌─────────────────────────────────────────┐   │
│  │  Overall Sentiment: Positive             │   │
│  │                                          │   │
│  │  Attendees expressed strong appreciation │   │
│  │  for the networking opportunities and    │   │
│  │  the quality of technical sessions.      │   │
│  │                                          │   │
│  │  Key Themes:                             │   │
│  │  • Networking (mentioned 24 times)       │   │
│  │  • Technical depth (mentioned 18 times)  │   │
│  │  • Speaker quality (mentioned 12 times)  │   │
│  │                                          │   │
│  │  [View all 38 responses]                 │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Q12: What could be improved? (29 responses)    │
│  ┌─────────────────────────────────────────┐   │
│  │  Overall Sentiment: Mixed                │   │
│  │                                          │   │
│  │  Feedback focused on logistical aspects  │   │
│  │  with consistent requests for better     │   │
│  │  venue signage and more breaks between   │   │
│  │  sessions.                               │   │
│  │                                          │   │
│  │  Key Themes:                             │   │
│  │  • Venue navigation (mentioned 15 times) │   │
│  │  • Schedule pacing (mentioned 11 times)  │   │
│  │  • Food options (mentioned 8 times)      │   │
│  │                                          │   │
│  │  [View all 29 responses]                 │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ... (scrollable for all open-ended Qs)         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Page Structure:**
- Single scrolling page
- Each open-ended question displayed as a card
- Only open-ended text questions shown (complement to Analytics tab)

### Sentiment Card Structure
```
┌─────────────────────────────────────────────────┐
│  Q[N]: [Question Text] ([X] responses)          │
│  ───────────────────────────────────────────    │
│                                                 │
│  Overall Sentiment: [Positive/Mixed/Negative]   │
│                                                 │
│  [Narrative summary paragraph - 2-3 sentences   │
│   describing the collective feedback and        │
│   highlighting any strong patterns]             │
│                                                 │
│  Key Themes:                                    │
│  • [Theme 1] (mentioned [N] times)              │
│  • [Theme 2] (mentioned [N] times)              │
│  • [Theme 3] (mentioned [N] times)              │
│                                                 │
│  [View all X responses]                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Elements:**
- Question number and full text as header
- Response count in parentheses
- Sentiment label with visual indicator (color-coded badge)
  - Positive: Green badge
  - Mixed: Yellow badge
  - Negative: Red badge
- Narrative summary: 2-3 sentences synthesizing the feedback
- Key Themes: Top 3 themes with mention counts
- Expand link to view all raw responses

### Expanded Response View
```
┌─────────────────────────────────────────────────┐
│  Q5: What did you enjoy most? (38 responses)    │
│  ───────────────────────────────────────────    │
│                                                 │
│  Overall Sentiment: Positive                    │
│                                                 │
│  [Narrative summary...]                         │
│                                                 │
│  Key Themes: ...                                │
│                                                 │
│  [Hide responses]                               │
│                                                 │
│  All Responses:                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ "The networking was fantastic..."        │   │
│  │ "Loved the technical depth of talks"     │   │
│  │ "Great speakers this year"               │   │
│  │ ...                                      │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────┐
│  Q5: What did you enjoy most? (0 responses)     │
│  ┌─────────────────────────────────────────┐   │
│  │                                          │   │
│  │  No responses yet                        │   │
│  │                                          │   │
│  │  Sentiment analysis will appear once     │   │
│  │  responses are submitted.                │   │
│  │                                          │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Loading State
- Skeleton loaders for sentiment cards
- "Analyzing responses..." indicator during AI processing

### Minimum Response Threshold
- Sentiment analysis requires at least 3 responses to generate meaningful summary
- Below threshold: Show message "Need at least 3 responses for analysis"

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Navigate to Sentiment Tab**
- **Given** the organizer is on the admin dashboard
- **When** they click the "Sentiment" tab
- **Then** the Sentiment tab becomes active
- **And** they see sentiment cards for each open-ended question
- **And** the URL updates to include tab parameter

**Scenario 2: View Sentiment Summary**
- **Given** the organizer is on the Sentiment tab
- **When** they view a question with 3+ responses
- **Then** they see the overall sentiment label (Positive/Mixed/Negative)
- **And** they see a narrative summary paragraph
- **And** they see up to 3 key themes with mention counts

**Scenario 3: Sentiment Label Accuracy**
- **Given** responses are predominantly positive
- **When** the organizer views the sentiment card
- **Then** the sentiment label shows "Positive" with green badge
- **Given** responses are mixed positive and negative
- **When** the organizer views the sentiment card
- **Then** the sentiment label shows "Mixed" with yellow badge
- **Given** responses are predominantly negative
- **When** the organizer views the sentiment card
- **Then** the sentiment label shows "Negative" with red badge

**Scenario 4: View Key Themes**
- **Given** the organizer views a sentiment card
- **When** themes have been identified
- **Then** up to 3 key themes display with mention counts
- **And** themes are sorted by mention count (highest first)

**Scenario 5: Expand to View All Responses**
- **Given** the organizer is viewing a sentiment card
- **When** they click "View all X responses"
- **Then** the card expands to show all raw responses
- **And** the link text changes to "Hide responses"

**Scenario 6: Collapse Expanded Responses**
- **Given** a sentiment card is expanded showing all responses
- **When** the organizer clicks "Hide responses"
- **Then** the raw responses collapse
- **And** the card returns to summary view

**Scenario 7: Insufficient Responses**
- **Given** a question has fewer than 3 responses
- **When** the organizer views that question's card
- **Then** the card shows "Need at least 3 responses for analysis"
- **And** no sentiment or themes are displayed

**Scenario 8: No Responses**
- **Given** a question has 0 responses
- **When** the organizer views that question's card
- **Then** the card shows "No responses yet" message

**Scenario 9: Analysis Loading**
- **Given** the organizer navigates to the Sentiment tab
- **When** AI analysis is in progress
- **Then** an "Analyzing responses..." indicator displays
- **And** skeleton loaders show for content areas

### Non-Functional Requirements
- [ ] Performance: Sentiment analysis completes within 5 seconds per question
- [ ] Performance: Results are cached and only regenerated when new responses added
- [ ] Accuracy: Sentiment labels correctly reflect the overall tone of responses
- [ ] Accessibility: Sentiment badges have text labels (not color-only)
- [ ] Accessibility: Expanded response list is keyboard navigable

### Quality Checklist
- [ ] Tab bar shows all four tabs correctly
- [ ] Only open-ended text questions appear
- [ ] Sentiment labels are accurate to response content
- [ ] Narrative summaries are coherent and relevant
- [ ] Key themes accurately reflect common topics
- [ ] Theme mention counts are accurate
- [ ] Expand/collapse works correctly
- [ ] Threshold message shows for < 3 responses
- [ ] Empty states display appropriately
- [ ] Loading states display during AI processing

## Technical Notes
- AI sentiment analysis via LLM API call (implementation detail)
- Cache analysis results keyed by question + response hash
- Invalidate cache when new responses are submitted
- Consider rate limiting or background processing for large response sets

## Dependencies
- STORY-048: Analytics Tab (establishes pattern for question-based analysis)
- Survey submission functionality from MVP iteration (existing)
- LLM API access for sentiment analysis

## Estimate
**Size**: M
**Confidence**: Medium

**Reasoning**: AI integration adds complexity. Prompt engineering for consistent sentiment classification and theme extraction. Caching strategy needed for performance. Medium confidence due to AI output variability.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-05
**Last Updated**: 2025-12-05
**Build Date**:
