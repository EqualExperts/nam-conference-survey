# Discovery Synthesis: Admin Dashboard

**Iteration**: 2025-12-02-admin-page
**Synthesis Date**: 2025-12-02
**Discovery Period**: 2025-12-02
**Status**: Complete

---

## Executive Summary

The admin dashboard iteration addresses the need for conference organizers to view and analyze survey responses without direct database access. The MVP focuses on read-only data visualization and export capabilities, with no authentication required given the demo context. Key deliverables include an overview page with respondent counts, detailed response views, aggregate question analytics with appropriate chart types, and export functionality (CSV and PDF).

---

## Key Themes

### 1. Data Visibility for Organizers
**Evidence**: Interview revealed that organizers currently have no way to view survey responses without database access.

**Insight**: The primary driver is enabling non-technical stakeholders to access survey data through a web interface.

**Implications**:
- Dashboard must be accessible at a predictable route (`/admin`)
- No authentication barrier for this demo application
- Read-only interface (no data modification needed)

### 2. Response Tracking and Status
**Evidence**: Stakeholder emphasized need to see both completed and in-progress respondent counts.

**Insight**: Understanding survey completion rates is valuable for assessing response quality and engagement.

**Implications**:
- Overview page should prominently display respondent metrics
- Need to distinguish between completed and partial submissions
- Count display should be immediately visible upon dashboard access

### 3. Individual Response Review
**Evidence**: Stakeholder wants ability to view "what a single respondent said across all questions."

**Insight**: Individual response review supports both data validation and understanding the complete picture from each participant.

**Implications**:
- Need a respondent list with navigation to detail views
- Detail view should show all 19 questions with that respondent's answers
- Consider how to identify anonymous respondents (ID, timestamp, etc.)

### 4. Aggregate Analytics by Question
**Evidence**: Stakeholder specified pie charts for Likert-scale questions and bar charts for other question types.

**Insight**: Different question types require different visualization approaches for effective data communication.

**Implications**:
- Question aggregate view as a distinct page/section
- Chart type selection based on question metadata
- Pie charts: 5-point Likert scales (satisfaction, agreement, etc.)
- Bar charts: multi-select, ranking, and other categorical questions
- Essay/open-ended questions need different treatment (likely text display, not charts)

### 5. Data Export Requirements
**Evidence**: Two export formats requested - CSV for full dataset, PDF for visual charts.

**Insight**: Different export formats serve different use cases - CSV for further analysis, PDF for sharing/presentation.

**Implications**:
- CSV export: all responses, all questions, raw data format
- PDF export: chart visualizations for non-essay questions
- Essay questions excluded from PDF (would require different treatment)

---

## User Needs

### Primary Persona: Conference Organizer (Admin)

| Need | Priority | Evidence |
|------|----------|----------|
| View respondent completion metrics | High | "Overview page showing how many respondents, completed + in-progress" |
| View individual survey responses | High | "Drill down and see what a single respondent said" |
| View aggregate data by question | High | "See all answers to a question in aggregate" |
| Export raw data to CSV | Medium | "CSV export - full dataset" |
| Export charts to PDF | Medium | "PDF export - charts for all non-essay questions" |
| Access dashboard without login | High | "No authentication... this is a demo app" |

---

## Opportunities

### Validated Opportunities

1. **Admin Dashboard MVP**
   - Clear route at `/admin`
   - Three main views: Overview, Respondent Detail, Question Aggregate
   - Export capabilities (CSV, PDF)
   - Evidence: Direct stakeholder interview with clear requirements

2. **Chart-Based Visualization**
   - Pie charts for Likert-scale questions
   - Bar charts for multi-select and ranking questions
   - Text display for open-ended/essay questions
   - Evidence: Explicit chart type preferences from stakeholder

### Opportunities Requiring Validation

1. **Respondent Identification**
   - How to identify/list anonymous respondents (timestamp? sequential ID?)
   - Need to determine display approach for respondent list

2. **In-Progress Response Handling**
   - How are partial submissions stored and identified?
   - Should partial responses be viewable in detail view?

---

## Risks and Concerns

| Risk | Severity | Mitigation |
|------|----------|------------|
| No authentication exposes survey data | Low | Acceptable for demo context per stakeholder |
| Chart library selection | Medium | Need to evaluate React-compatible charting options |
| PDF generation complexity | Medium | May require server-side rendering or specialized library |
| Performance with large datasets | Low | Demo context limits expected data volume |

---

## Constraints

### Technical Constraints
- Must integrate with existing React + NestJS + PostgreSQL stack
- Frontend uses Mantine UI components
- No additional authentication infrastructure
- Route must be `/admin`

### Business Constraints
- Demo application context (not production security requirements)
- MVP scope only - no editing/deletion capabilities

### Timeline Constraints
- None specified

---

## Open Questions

1. **Respondent Listing**: How should anonymous respondents be identified in the list view? Options:
   - Sequential submission ID
   - Timestamp of submission
   - Combination (ID + timestamp)

2. **Partial Responses**: Are in-progress/partial responses currently stored? If so, how are they identified?

3. **Chart Library**: Which React charting library should be used? Candidates:
   - Recharts
   - Chart.js with react-chartjs-2
   - Victory
   - Nivo

4. **PDF Generation**: Client-side or server-side PDF generation? Options:
   - Client-side: html2canvas + jsPDF
   - Server-side: Puppeteer, PDFKit

---

## Recommendations

### Immediate Next Steps

1. **Run `/req` to extract user stories** with appropriate granularity for the admin dashboard features
2. **Validate technical approach** for charting and PDF generation before implementation
3. **Clarify respondent identification** approach before building list view

### Story Candidates

Based on discovery, likely stories include:
- Admin overview page with respondent counts
- Respondent list view with navigation
- Single respondent detail view
- Question aggregate view with charts
- Pie chart component for Likert questions
- Bar chart component for categorical questions
- CSV export functionality
- PDF export with charts

### Deferred Items

- Authentication (explicitly out of scope)
- Response editing/deletion
- Real-time updates
- Advanced filtering/search

---

## Cross-Iteration References

### MVP Iteration (2025-11-12-mvp)
- Survey submission flow established
- 19-question structure defined
- Anonymous submission model in place
- Frontend component patterns established (can reference for admin components)

---

## Appendix

### Discovery Sources
- Stakeholder Interview: Mike (2025-12-02) - Primary requirements gathering
- Product Overview: NAM Conference Survey context
- Target Users: Conference Organizer persona

### Key Quotes

> "Overview page showing how many respondents - not individual respondents - count of people who have completed and in-progress."

> "Drill down and see what a single respondent said. All 19 questions, what did respondent 42 say."

> "Pie charts for Likert-scale questions, bar charts for other questions."

> "CSV export - full dataset. PDF export - charts for all non-essay questions."

> "No authentication required. This is a demo app."
