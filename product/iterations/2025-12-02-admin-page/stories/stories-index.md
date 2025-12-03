# Stories Index: 2025-12-02-admin-page

**Iteration**: Admin Dashboard
**Created**: 2025-12-02
**Last Updated**: 2025-12-03
**Total Stories**: 2
**Total Effort**: L + M

## Stories

| ID | Title | Priority | Size | Status |
|----|-------|----------|------|--------|
| STORY-045 | Admin Dashboard | Must Have | L | Ready |
| STORY-046 | Admin Data Export | Must Have | M | Ready |

## Priority Summary

| Priority | Count |
|----------|-------|
| Must Have | 2 |

## Story Details

### STORY-045: Admin Dashboard
**File**: `story-045-admin-dashboard.md`

Complete admin interface at `/admin` with tab-based navigation:
- **Overview tab**: Metric cards (completed/in-progress counts), latest 5 responses with "View" links
- **Responses tab**: Master-detail layout with respondent list (left) and full answer detail (right)
- **Analytics tab**: Scrolling page with charts for all 19 questions (pie for Likert, bar for categorical, text list for essays)

UX specifications include ASCII wireframes, navigation patterns, empty states, and loading behavior.

### STORY-046: Admin Data Export
**File**: `story-046-admin-export.md`

Export functionality accessible from dashboard header on all tabs:
- **CSV export**: Full dataset download (all responses, all questions), opens in Excel/Sheets/Numbers
- **PDF export**: Chart visualizations for non-essay questions with title page and Equal Experts branding

UX specifications include button placement, loading states, file naming conventions, error handling.

## Dependencies

```
STORY-045 (Admin Dashboard)
    └── STORY-046 (Admin Export) - depends on charts from 045
```

## Notes

- Stories updated 2025-12-03 with detailed UX specifications including wireframes
- Open questions flagged as implementation decisions (chart library, PDF generation approach)
- Respondent identification uses sequential submission ID (e.g., #42)
- No authentication required per stakeholder decision
