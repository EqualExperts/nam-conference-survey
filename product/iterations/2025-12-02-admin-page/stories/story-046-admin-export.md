# User Story: Admin Data Export

**Story ID**: STORY-046
**Iteration**: 2025-12-02-admin-page
**Priority**: Must Have
**Status**: Ready
**Labels**: 2025-12-02-admin-page, conference-organizer, admin, export, llm-dev

## User Story
As a Conference Organizer,
I want to export survey data in CSV and PDF formats,
So that I can analyze data externally and share visual summaries with stakeholders.

## Context
Organizers need to extract survey data for further analysis in spreadsheets and to create shareable reports with visualizations. CSV provides raw data for analysis; PDF provides chart visualizations suitable for presentations and sharing.

## Source
**Discovery Cycle**: 2025-12-02-admin-page
**Synthesis Reference**: `product/iterations/2025-12-02-admin-page/discovery/synthesis/synthesis-2025-12-02.md`
**User Need**: Data export for analysis and sharing
**Supporting Evidence**: Stakeholder interview specifying CSV for full dataset, PDF for charts

## User Experience Design

### Export Button Placement
Export buttons are always visible in the dashboard header, regardless of active tab:
```
┌─────────────────────────────────────────────────┐
│  Admin Dashboard                    [CSV] [PDF] │
├─────────────────────────────────────────────────┤
│  [Overview]  [Responses]  [Analytics]           │
```

**Button Design:**
- Two separate buttons: "CSV" and "PDF"
- Buttons use secondary/outline style (not primary) to avoid competing with main content
- Icon + text label for clarity (download icon recommended)

### CSV Export Behavior
```
User clicks [CSV]
    ↓
Button shows brief loading state (spinner or "Exporting...")
    ↓
Browser downloads: survey-responses-2025-12-03.csv
    ↓
Button returns to normal state
```

**CSV Content:**
- All survey responses (complete and in-progress)
- One row per respondent
- Columns: Response ID, Submission Timestamp, Status, Q1, Q2, ... Q19
- Question columns use question number as header (Q1, Q2, etc.)
- Multi-select answers comma-separated within cell
- Ranking answers shown as ordered list (e.g., "1. AI/ML, 2. Cloud, 3. DevOps")
- Open-ended answers as plain text (escaped for CSV)
- UTF-8 encoding with BOM for Excel compatibility

### PDF Export Behavior
```
User clicks [PDF]
    ↓
Button shows loading state with "Generating..." text
    ↓
PDF generation (may take 2-5 seconds)
    ↓
Browser downloads: survey-charts-2025-12-03.pdf
    ↓
Button returns to normal state
```

**PDF Content:**
- Title page: "NAM Conference Survey Results" with export date
- One page per chart-compatible question (not essay questions)
- Each page contains:
  - Question number and full text
  - Response count
  - Chart visualization (pie for Likert, bar for categorical)
  - Legend with values/percentages
- Essay/open-ended questions excluded from PDF
- Professional styling consistent with Equal Experts branding

### Empty State Export
- **CSV with no data**: Downloads file with header row only, no data rows
- **PDF with no data**: Shows message "No survey responses to export" instead of downloading

### Error Handling
- Network error: Show toast notification "Export failed. Please try again."
- Button returns to normal state after error
- User can retry immediately

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Export Full Dataset as CSV**
- **Given** survey responses exist in the database
- **When** the organizer clicks the CSV export button
- **Then** a CSV file downloads to their device
- **And** the filename is `survey-responses-YYYY-MM-DD.csv` with current date
- **And** the file contains all survey responses (one row per respondent)
- **And** all 19 question answers are included as columns
- **And** the file opens correctly in Excel, Google Sheets, and Numbers

**Scenario 2: CSV Column Format**
- **Given** the organizer exports CSV
- **When** they open the file in a spreadsheet application
- **Then** the first row contains headers: Response ID, Submitted, Status, Q1-Q19
- **And** Likert responses show the numeric value (1-5)
- **And** multi-select responses show comma-separated values
- **And** ranking responses show ordered values
- **And** open-ended responses show full text

**Scenario 3: Export Charts as PDF**
- **Given** survey responses exist in the database
- **When** the organizer clicks the PDF export button
- **Then** a loading indicator appears on the button
- **And** after generation completes, a PDF file downloads
- **And** the filename is `survey-charts-YYYY-MM-DD.pdf` with current date

**Scenario 4: PDF Content Structure**
- **Given** the organizer opens the exported PDF
- **Then** it contains a title page with "NAM Conference Survey Results" and export date
- **And** each chart-compatible question has its own page
- **And** Likert questions appear as pie charts with percentage legends
- **And** multi-select/ranking questions appear as bar charts with count labels
- **And** essay/open-ended questions are not included

**Scenario 5: Export with No Data (CSV)**
- **Given** no survey responses exist
- **When** the organizer clicks the CSV export button
- **Then** a CSV file downloads containing only the header row
- **And** no error is shown

**Scenario 6: Export with No Data (PDF)**
- **Given** no survey responses exist
- **When** the organizer clicks the PDF export button
- **Then** a toast notification shows "No survey responses to export"
- **And** no file is downloaded

**Scenario 7: Export Loading State**
- **Given** the organizer clicks an export button
- **When** the export is processing
- **Then** the clicked button shows a loading indicator
- **And** both export buttons are disabled until complete
- **And** the user cannot trigger duplicate exports

**Scenario 8: Export Error Recovery**
- **Given** an export fails due to network or server error
- **When** the error occurs
- **Then** a toast notification shows "Export failed. Please try again."
- **And** the export buttons return to normal state
- **And** the user can retry the export

### Non-Functional Requirements
- [ ] Performance: CSV export completes within 3 seconds for up to 500 responses
- [ ] Performance: PDF export completes within 10 seconds for up to 500 responses
- [ ] Usability: Export buttons are clearly labeled and discoverable
- [ ] Usability: Loading state provides feedback that export is in progress
- [ ] Accessibility: Export buttons are keyboard accessible
- [ ] Accessibility: Loading and success states announced to screen readers

### Quality Checklist
- [ ] CSV opens correctly in Microsoft Excel (Windows and Mac)
- [ ] CSV opens correctly in Google Sheets
- [ ] CSV opens correctly in Apple Numbers
- [ ] CSV handles special characters (quotes, commas, newlines) correctly
- [ ] PDF renders correctly in Chrome, Safari, Firefox, Edge
- [ ] PDF charts are legible and professional
- [ ] PDF uses Equal Experts brand colors where appropriate
- [ ] Export works when dashboard has 1 response
- [ ] Export works when dashboard has 500 responses
- [ ] Concurrent exports don't cause issues

## Open Questions
- PDF generation approach: Client-side (html2canvas + jsPDF) vs server-side (Puppeteer) - implementation decision
- Should PDF include Equal Experts logo? Need to confirm brand assets available

## Dependencies
- STORY-045: Admin Dashboard (charts must exist for PDF to capture them)

## Estimate
**Size**: M
**Confidence**: Medium

**Reasoning**: CSV export is straightforward data serialization. PDF generation with charts adds complexity depending on approach chosen (client-side vs server-side rendering). Medium confidence due to PDF library integration.

## Metadata
**Iteration**: 2025-12-02-admin-page
**Created**: 2025-12-02
**Last Updated**: 2025-12-03
**Build Date**:
