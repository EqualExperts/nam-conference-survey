# Stories Index: 2025-12-02-admin-page

**Iteration**: Admin Dashboard
**Created**: 2025-12-02
**Total Stories**: 2
**Total Effort**: L + M (approximately 1.5-2 weeks)

## Stories

| ID | Title | Priority | Size | Status |
|----|-------|----------|------|--------|
| STORY-045 | Admin Dashboard | Must have | L | Ready |
| STORY-046 | Admin Data Export | Must have | M | Ready |

## Priority Summary

| Priority | Count |
|----------|-------|
| Must have | 2 |
| Should have | 0 |
| Could have | 0 |

## Story Details

### STORY-045: Admin Dashboard
**File**: `story-045-admin-dashboard.md`

Core admin interface with three views:
- Overview page with respondent counts (completed + in-progress)
- Individual respondent detail view (all 19 questions)
- Question aggregate view with charts (pie for Likert, bar for categorical)

Accessible at `/admin` with no authentication required.

### STORY-046: Admin Data Export
**File**: `story-046-admin-export.md`

Export functionality:
- CSV export of full dataset (all responses, all questions)
- PDF export with chart visualizations (excludes essay questions)

Depends on STORY-045 for chart rendering.

## Dependencies

```
STORY-045 (Admin Dashboard)
    └── STORY-046 (Admin Export) - depends on charts from 045
```

## Notes

- Coarse granularity applied per user request ("as few stories as possible")
- Technical decisions (chart library, PDF generation approach) left to implementation
- No authentication required per stakeholder decision
