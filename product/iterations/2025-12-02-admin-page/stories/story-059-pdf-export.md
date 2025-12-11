# User Story: PDF Export

**Story ID**: STORY-059
**Iteration**: 2025-12-02-admin-page
**Priority**: High
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, llm-dev, export

## User Story
As a Conference Organizer,
I want to export survey results as a formatted PDF report,
So that I can share professional-looking results with stakeholders.

## Context
While CSV export (STORY-051) provides raw data for analysis, stakeholders often need a polished report format for presentations and sharing. This story adds PDF export with visualizations and summaries suitable for non-technical audiences.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Shareable reports for stakeholders
**Supporting Evidence**: Stakeholder interview specifying PDF for charts and summaries

## User Experience Design

### Export Button Placement
- Add PDF button to dashboard header alongside CSV button (from STORY-051)
- Button appears right-aligned in the header row
- Button remains visible regardless of which tab is active

```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                    [CSV] [PDF] │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]  [Analytics] [Sentiment│
├─────────────────────────────────────────────────┤
│  (tab content)                                  │
└─────────────────────────────────────────────────┘
```

**Elements:**
- "PDF" button: Downloads formatted report as PDF file
- Button uses secondary/outline style (not primary) to avoid competing with main content
- Button visible on all tabs

### PDF Export Format
- File name: `survey-report-YYYY-MM-DD.pdf`
- Cover page with title and generation date
- Summary section:
  - Total responses count
  - Date range of responses
- Analytics section:
  - One page per question type grouping
  - Pie charts for Likert questions
  - Bar charts for multi-select and ranking questions
- Sentiment section (if STORY-050 implemented):
  - Narrative summaries for each open-ended question
  - Key themes listed

### Export States

**Generating:**
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard           [CSV] [Generating...]│
└─────────────────────────────────────────────────┘
```
- Button shows "Generating..." with spinner while processing
- Button is disabled during generation

**Success:**
- Browser download dialog appears
- Button returns to normal state

**Error:**
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                    [CSV] [PDF] │
├─────────────────────────────────────────────────┤
│  ⚠ Export failed. Please try again.            │
└─────────────────────────────────────────────────┘
```
- Toast notification appears with error message
- Button returns to normal state

### Empty Data
- If no responses exist, PDF downloads with "No responses recorded" message in summary

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Export PDF**
- **Given** the organizer is on any tab of the admin dashboard
- **When** they click the "PDF" button
- **Then** the button shows "Generating..." state
- **And** a PDF file downloads with the formatted report
- **And** the file name includes today's date

**Scenario 2: PDF Content Correctness**
- **Given** the organizer exports PDF
- **When** they open the downloaded file
- **Then** the cover page shows title and generation date
- **And** the summary shows total response count
- **And** charts are rendered for fixed-answer questions
- **And** sentiment summaries appear for open-ended questions (if STORY-050 implemented)

**Scenario 3: Export with No Data**
- **Given** no survey responses exist
- **When** the organizer clicks "PDF"
- **Then** a PDF downloads with "No responses recorded" message

**Scenario 4: Export Error Handling**
- **Given** an error occurs during export generation
- **When** the export fails
- **Then** a toast notification shows "Export failed. Please try again."
- **And** the export button returns to normal state

**Scenario 5: Concurrent Export Prevention**
- **Given** an export is currently generating
- **When** the organizer clicks the PDF button again
- **Then** the click is ignored (button is disabled)

### Non-Functional Requirements
- [ ] Performance: PDF export completes within 10 seconds for 500 responses
- [ ] Security: No sensitive data exposed (responses are anonymous)
- [ ] Accessibility: Export button has accessible label
- [ ] Accessibility: Loading state is announced to screen readers

### Quality Checklist
- [ ] PDF downloads with correct filename format
- [ ] PDF renders correctly in Chrome, Safari, Firefox, Edge
- [ ] PDF charts are legible and professional
- [ ] PDF includes all sections (cover, summary, analytics, sentiment if available)
- [ ] Export button displays correctly in header
- [ ] Loading state displays during generation
- [ ] Error handling works correctly
- [ ] Empty data export works without errors
- [ ] Export works with 1 response
- [ ] Export works with 500 responses

## Technical Notes
- PDF generation: Consider library like PDFKit or Puppeteer for chart rendering
- Charts in PDF should match Analytics tab visualizations

## Dependencies
- STORY-045: Admin Overview Page (provides header location for button)
- STORY-051: CSV Export (establishes export button pattern in header)
- STORY-049: Analytics Tab (chart data for PDF)
- STORY-050: Sentiment Analysis Tab (optional - sentiment summaries for PDF)

## Estimate
**Size**: M
**Confidence**: Medium

**Reasoning**: PDF generation with charts requires library integration and layout work. Medium confidence due to PDF rendering complexity and need to match Analytics tab visualizations.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-11
**Last Updated**: 2025-12-11
**Build Date**:
