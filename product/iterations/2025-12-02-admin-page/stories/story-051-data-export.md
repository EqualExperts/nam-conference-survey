# User Story: Data Export

**Story ID**: STORY-051
**Iteration**: 2025-12-02-admin-page
**Priority**: Should Have
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, llm-dev, export

## User Story
As a Conference Organizer,
I want to export survey response data as CSV or PDF,
So that I can share results with stakeholders or perform additional analysis offline.

## Context
The admin dashboard provides read-only access to survey data. This story adds export buttons to the dashboard header so organizers can download data for sharing or offline analysis. CSV provides raw data for spreadsheet analysis; PDF provides a formatted report with chart visualizations suitable for presentations and sharing.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Data portability for stakeholder sharing
**Supporting Evidence**: Stakeholder interview specifying CSV for full dataset, PDF for charts

## User Experience Design

### Navigation Update
- Add export buttons to the existing dashboard header
- Buttons appear right-aligned in the header row
- Buttons remain visible regardless of which tab is active

### Export Button Placement
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
- Two buttons added to the page header, right-aligned
- "CSV" button: Downloads all response data as CSV file
- "PDF" button: Downloads formatted report as PDF file
- Buttons use secondary/outline style (not primary) to avoid competing with main content
- Buttons visible on all tabs

### CSV Export Format
- File name: `survey-responses-YYYY-MM-DD.csv`
- One row per response
- Columns:
  - `response_id`: Sequential ID
  - `submitted_at`: ISO 8601 timestamp
  - `status`: Complete or In Progress
  - One column per question (Q1, Q2, ... Q19)
- Likert responses: Numeric value (1-5)
- Multi-select answers: Comma-separated within cell
- Ranking answers: Pipe-separated in rank order (e.g., "Keynote|Workshop|Panel")
- Open-ended answers: Full text (escaped for CSV)
- Empty cells for unanswered questions
- UTF-8 encoding with BOM for Excel compatibility

**Example:**
```csv
response_id,submitted_at,status,Q1,Q2,Q3,...
42,2025-12-02T14:34:00Z,Complete,4,5,"AI/ML,Cloud",...
43,2025-12-02T15:21:00Z,Complete,5,4,"DevOps",...
```

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
│  Admin Dashboard           [Generating...] [PDF]│
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
- If no responses exist, export still works but:
  - CSV: Headers only, no data rows
  - PDF: Report with "No responses recorded" in summary

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Export CSV**
- **Given** the organizer is on any tab of the admin dashboard
- **When** they click the "CSV" button
- **Then** the button shows "Generating..." state
- **And** a CSV file downloads with all response data
- **And** the file name includes today's date

**Scenario 2: CSV Format Correctness**
- **Given** the organizer exports CSV
- **When** they open the downloaded file
- **Then** the first row contains column headers
- **And** each subsequent row represents one response
- **And** all 19 question columns are present
- **And** multi-select values are comma-separated
- **And** ranking values are pipe-separated in order

**Scenario 3: Export PDF**
- **Given** the organizer is on any tab of the admin dashboard
- **When** they click the "PDF" button
- **Then** the button shows "Generating..." state
- **And** a PDF file downloads with the formatted report
- **And** the file name includes today's date

**Scenario 4: PDF Content Correctness**
- **Given** the organizer exports PDF
- **When** they open the downloaded file
- **Then** the cover page shows title and generation date
- **And** the summary shows total response count
- **And** charts are rendered for fixed-answer questions
- **And** sentiment summaries appear for open-ended questions

**Scenario 5: Export with No Data**
- **Given** no survey responses exist
- **When** the organizer clicks "CSV"
- **Then** a CSV downloads with headers only
- **When** the organizer clicks "PDF"
- **Then** a PDF downloads with "No responses recorded" message

**Scenario 6: Export Error Handling**
- **Given** an error occurs during export generation
- **When** the export fails
- **Then** a toast notification shows "Export failed. Please try again."
- **And** the export button returns to normal state

**Scenario 7: Concurrent Export Prevention**
- **Given** an export is currently generating
- **When** the organizer clicks the same export button again
- **Then** the click is ignored (button is disabled)

### Non-Functional Requirements
- [ ] Performance: CSV export completes within 5 seconds for 500 responses
- [ ] Performance: PDF export completes within 10 seconds for 500 responses
- [ ] Security: No sensitive data exposed (responses are anonymous)
- [ ] Accessibility: Export buttons have accessible labels
- [ ] Accessibility: Loading state is announced to screen readers

### Quality Checklist
- [ ] CSV downloads with correct filename format
- [ ] CSV opens correctly in Microsoft Excel (Windows and Mac)
- [ ] CSV opens correctly in Google Sheets
- [ ] CSV opens correctly in Apple Numbers
- [ ] CSV handles special characters (quotes, commas, newlines) correctly
- [ ] CSV contains all response data accurately
- [ ] PDF downloads with correct filename format
- [ ] PDF renders correctly in Chrome, Safari, Firefox, Edge
- [ ] PDF charts are legible and professional
- [ ] PDF includes all sections (cover, summary, analytics, sentiment)
- [ ] Export buttons display correctly in header
- [ ] Loading states display during generation
- [ ] Error handling works correctly
- [ ] Empty data exports work without errors
- [ ] Export works with 1 response
- [ ] Export works with 500 responses

## Technical Notes
- CSV generation: Server-side streaming for large datasets
- PDF generation: Consider library like PDFKit or Puppeteer for chart rendering
- Charts in PDF should match Analytics tab visualizations

## Dependencies
- STORY-045: Admin Overview Page (provides header location for buttons)
- STORY-049: Analytics Tab (chart data for PDF)
- STORY-050: Sentiment Analysis Tab (optional - sentiment summaries for PDF)

## Estimate
**Size**: M
**Confidence**: Medium

**Reasoning**: CSV export is straightforward. PDF generation with charts requires library integration and layout work. Medium confidence due to PDF rendering complexity.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-05
**Last Updated**: 2025-12-05
**Build Date**:
