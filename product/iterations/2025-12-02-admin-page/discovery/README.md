# Iteration Discovery: 2025-12-02-admin-page

**Started**: 2025-12-02
**Focus**: Build admin dashboard for NAM leadership team to view and manage survey responses
**Status**: Active

## Goals

Build an admin dashboard that enables the NAM leadership team to:
1. Monitor survey participation (completed and in-progress counts)
2. View individual respondent details
3. Analyze aggregate responses per question with charts
4. Export data in CSV and PDF formats

## Research Methods

- [x] AI-guided stakeholder interview (Mike, 2025-12-02)
- [ ] Technical observations
- [ ] Additional research as needed

## Timeline

- **Start**: 2025-12-02
- **Target synthesis**: Ready for synthesis

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| No authentication | Low-stakes app, simplicity preferred |
| Route at `/admin` | Simple, direct access pattern |
| Pie charts for Likert | Shows proportional distribution |
| Bar charts for multi-select/ranking | Better for categorical comparison |
| Exclude essays from charts | Text data not suitable for visualization |
| All features in MVP | Cohesive, complete package |

## MVP Scope

### In Scope
- Overview page with respondent counts (completed + in-progress)
- Single respondent detail view
- Question aggregate view with charts
- CSV export (full dataset)
- PDF export (charts for non-essay questions)

### Out of Scope
- Authentication/authorization
- Real-time updates (page refresh sufficient)
- Essay question visualization

## Notes

Interview conducted 2025-12-02. See `interviews/interview-mike-2025-12-02.md` for full notes.

### Open Questions for Technical Discovery
1. How to track "in progress" surveys (current data model review needed)
2. Question ordering in respondent detail view
