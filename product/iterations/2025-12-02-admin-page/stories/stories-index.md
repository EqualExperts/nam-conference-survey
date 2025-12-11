# Stories Index: 2025-12-02-admin-page

**Iteration**: Admin Dashboard
**Created**: 2025-12-02
**Last Updated**: 2025-12-11
**Total Stories**: 7
**Total Effort**: S + S + M + M + M + S + M

## Stories

| ID | Title | Priority | Size | Status |
|----|-------|----------|------|--------|
| STORY-045 | Admin Overview Page | Must Have | S | Ready |
| STORY-046 | Response Detail Modal | Must Have | S | Ready |
| STORY-048 | Responses Tab | Must Have | M | Ready |
| STORY-049 | Analytics Tab | Must Have | M | Ready |
| STORY-050 | Sentiment Analysis Tab | Should Have | M | Ready |
| STORY-051 | CSV Export | Should Have | S | Ready |
| STORY-059 | PDF Export | Should Have | M | Ready |

## Priority Summary

| Priority | Count |
|----------|-------|
| Must Have | 4 |
| Should Have | 3 |

## Story Details

### STORY-045: Admin Overview Page
**File**: `story-045-admin-overview.md`

Foundational admin page at `/admin` with:
- Page header: "Admin Dashboard"
- Two metric cards (completed/in-progress counts)
- Recent Responses list showing 5 most recent submissions with "View" links

No tab navigation yet - this is the base page.

### STORY-046: Response Detail Modal
**File**: `story-046-response-detail-modal.md`

Modal overlay triggered by "View" links on Overview page:
- Shows all 19 questions with respondent's answers
- Question display varies by type (stars for Likert, bullets for multi-select, numbered list for ranking, quoted text for open-ended)
- Close via X button, overlay click, or Escape key

### STORY-048: Responses Tab
**File**: `story-048-responses-tab.md`

Introduces tab navigation and adds Responses tab:
- Tab bar with Overview and Responses tabs
- Master-detail layout for browsing all responses
- List pagination with "Load More"
- Updates Overview "View" links to navigate to Responses tab with item selected

### STORY-049: Analytics Tab
**File**: `story-049-analytics-tab.md`

Adds Analytics tab to navigation:
- Scrolling page with charts for fixed-answer questions only
- Pie charts for Likert-scale questions
- Bar charts for multi-select and ranking questions
- Open-ended text questions excluded (covered in STORY-050)

### STORY-050: Sentiment Analysis Tab
**File**: `story-050-sentiment-tab.md`

Adds Sentiment tab to navigation:
- AI-generated narrative summaries for each open-ended question
- Overall sentiment label (Positive/Mixed/Negative)
- Key themes with mention counts
- Expandable view to see all raw responses
- Minimum 3 responses required for analysis

### STORY-051: CSV Export
**File**: `story-051-data-export.md`

Adds CSV export button to dashboard header:
- Full dataset download, all responses and questions
- Button visible on all tabs

### STORY-059: PDF Export
**File**: `story-059-pdf-export.md`

Adds PDF export button to dashboard header:
- Formatted report with charts and sentiment summaries
- Button visible on all tabs

## Dependencies

```
STORY-045 (Admin Overview)
    └── STORY-046 (Response Detail Modal)
    └── STORY-048 (Responses Tab)
            └── STORY-049 (Analytics Tab)
                    └── STORY-050 (Sentiment Tab)
    └── STORY-051 (CSV Export)
            └── STORY-059 (PDF Export)
```

## Notes

- Stories split from original combined STORY-045 on 2025-12-05
- STORY-047 reserved for Dark Mode iteration
- Each story that adds a tab explicitly includes adding the tab to navigation
- Open questions flagged as implementation decisions (chart library, PDF generation approach, sentiment LLM)
- Respondent identification uses sequential submission ID (e.g., #42)
- No authentication required per stakeholder decision
