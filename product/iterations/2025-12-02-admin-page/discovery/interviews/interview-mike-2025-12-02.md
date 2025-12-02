# Discovery Interview: Admin Dashboard

**Date**: 2025-12-02
**Participant**: Mike
**Role**: Product Owner
**Duration**: ~10 minutes
**Interviewer**: Claude (AI-assisted)

---

## Context
Interview conducted to establish baseline discovery context for the admin-page iteration, focused on building an admin dashboard for the NAM Conference Survey application.

---

## Key Findings

### Business Drivers
- Need for easy visibility into survey responses
- Ability to access and download results
- Enabling NAM leadership team to monitor survey participation

### Target Users
- **Primary users**: NAM leadership team
- **Access model**: Open access, no authentication required
- **Rationale**: Low-stakes application, simplicity preferred

### Feature Requirements

#### Overview Page (Main Admin View)
- Number of respondents (completed submissions)
- Number of surveys currently in progress (not yet submitted)

#### Detail Views
1. **Single Respondent View**: See all responses from one participant
2. **Question Aggregate View**: Chart showing all responses to a single question
   - Pie charts for Likert scale questions
   - Bar charts for multi-select and ranking questions
   - Essay/open-ended questions excluded from charts

#### Export Functionality
1. **CSV Export**: Complete dataset, all responses
2. **PDF Export**: Charts for all non-essay questions

#### Access Pattern
- Route: `/admin` on main application URL
- No authentication barrier

### Success Metrics
- Usage by leadership team
- Anecdotal satisfaction evidence

### Scope Decisions
- **In MVP**: All discussed features (overview, detail views, both export formats)
- **Deferred**: Nothing explicitly deferred
- **Dependencies**: None identified

---

## Direct Quotes

> "We want an easy way to see who's answered the survey, and to access or download the results."

> "This is a low stakes application, so anyone can access this with no security needed. No authentication."

> "The main page should just have aggregated info--number of respondents, number currently in progress and not yet submitted."

> "See all of one respondent's responses, and see all respondents' responses to a single question in a chart (for non-essay answers only)."

> "Pie charts for likert scale, and bar charts for other questions seems to make sense."

---

## Insights

1. **Simplicity is key**: No authentication aligns with the anonymous survey philosophy and reduces implementation complexity
2. **Two consumption patterns**: Quick overview (counts) vs. detailed analysis (individual responses, aggregate charts)
3. **Export serves different needs**: CSV for data analysis, PDF for presentation/sharing
4. **Chart type mapping is logical**: Pie for proportional data (Likert), bar for categorical comparisons

---

## Open Questions

1. How should "in progress" surveys be tracked? (Need to understand current data model)
2. Should there be real-time updates or is page refresh sufficient?
3. What order should questions appear in the single-respondent view?

---

## Tags
`admin` `dashboard` `mvp` `export` `charts` `no-auth`
