# User Story: CSV Export with Demographic Headers and Raw Data

**Story ID**: 041
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-organizer, data-export, analysis

## User Story
As a Conference Organizer,
I want to export all survey responses to a CSV file with properly structured demographic headers,
So that I can perform custom segmentation analysis in Excel or other tools to inform strategic conference planning decisions.

## Source
**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: `product/discovery/2025-11-12-mvp/synthesis-2025-11-19.md`
**User Need**:
- Need 5 (Strategic planning need) - "When I plan future conferences, I want demographic-segmented data showing how different groups experienced the event, so I can make evidence-based decisions"
**Supporting Evidence**:
- Conference Planner: "I love the raw data… it's more helpful for me to get all of it"; needs "to dice it the ways that I need to… based on who's active, clients, employees versus associates"
- Client Partner: "There's two ways I wanted… the raw excel of all the questions, all the answers, all the numbers… I want to create some very interesting slides based on each question"
- Conference Planner: "My biggest fear is that we go after something and nobody's interested"—needs data to make evidence-based planning decisions

## Design Reference
Not applicable - admin/organizer functionality (no attendee-facing UI)

**Related Screenshots**: None - backend export functionality

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Conference Organizer Exports Full Dataset**
- **Given** a Conference Organizer has access to survey data export function
- **When** the organizer triggers CSV export (via admin interface, API call, or command line)
- **Then** a CSV file is generated containing all survey responses
- **And** the filename includes conference identifier and timestamp (e.g., "NAM-Conference-2025-Responses-20251206.csv")
- **And** the file downloads automatically or provides download link
- **And** the file opens correctly in Excel, Google Sheets, and Numbers

**Scenario 2: CSV Header Structure - Column Names**
- **Given** a CSV export file is generated
- **When** the file is opened in spreadsheet software
- **Then** the first row contains clear, descriptive column headers
- **And** headers include: Session_ID, Start_Time, Completion_Time, Status, Q1_Rating, Q1_Comment, Q2_Rating, Q2_Comment, ... Q19_Value
- **And** demographic fields have clear headers: Role, Years_At_Company
- **And** headers use consistent naming convention (no spaces or special characters that break import)
- **And** column order is logical (demographics first, then questions Q1-Q19 in order)

**Scenario 3: Response Data Format - Likert Scale Questions**
- **Given** responses include Likert scale ratings
- **When** exported to CSV
- **Then** rating values appear as numbers (1, 2, 3, 4, 5)
- **And** optional comments for Likert questions appear in separate columns
- **And** skipped Likert questions show empty cell or "N/A"
- **And** format enables easy filtering and averaging in Excel

**Scenario 4: Response Data Format - Multiple Select Questions**
- **Given** responses include multiple select checkbox answers (Q4, Q16, Q17)
- **When** exported to CSV
- **Then** selected options are comma-separated in single cell OR separate boolean columns for each option
- **And** format is consistent for all multiple select questions
- **And** empty selections show as blank or "None selected"
- **And** Excel can parse the data for pivot table analysis

**Scenario 5: Response Data Format - Choice Ranking Question**
- **Given** responses include choice ranking data (Q11)
- **When** exported to CSV
- **Then** ranking is preserved in readable format (e.g., "1: Workshop, 2: Lightning Talks, 3: Panel Discussion")
- **And** alternative: separate columns for Rank_1, Rank_2, Rank_3 showing which option was ranked at each position
- **And** incomplete rankings are handled gracefully (blank cells for unranked options)
- **And** format enables analysis of preference patterns

**Scenario 6: Response Data Format - Open-Ended Text Questions**
- **Given** responses include open-ended text (Q7, Q14, Q15)
- **When** exported to CSV
- **Then** full text is preserved without truncation
- **And** special characters (commas, quotes, line breaks) are properly escaped for CSV format
- **And** line breaks within text are preserved or converted to space/semicolon
- **And** Excel displays text correctly without breaking CSV structure

**Scenario 7: Demographic Segmentation Fields**
- **Given** responses include demographic data (Q18 Role, Q19 Years)
- **When** exported to CSV
- **Then** demographic fields appear in dedicated columns
- **And** Role column contains values: "Employee", "Active Associate", "Alumni Associate", "Client", "Prefer not to say"
- **And** Years column contains selected range or "Prefer not to say"
- **And** demographic columns enable Excel pivot tables for segmentation analysis

**Scenario 8: Handling Incomplete Responses**
- **Given** some attendees abandoned survey mid-way
- **When** exported to CSV
- **Then** partial responses are included in export
- **And** answered questions show response values
- **And** unanswered questions show empty cells or "N/A"
- **And** Status column indicates "Incomplete" for partial responses
- **And** organizers can filter by Status to analyze abandonment patterns

**Scenario 9: UTF-8 Encoding for Special Characters**
- **Given** responses contain international characters, accents, or special symbols
- **When** exported to CSV
- **Then** file uses UTF-8 encoding
- **And** special characters display correctly when opened in Excel
- **And** emoji (if present in comments) are preserved
- **And** no character corruption occurs

**Scenario 10: Timestamp Formatting**
- **Given** each response has timestamps
- **When** exported to CSV
- **Then** Start_Time and Completion_Time columns show timestamps in ISO 8601 format (YYYY-MM-DD HH:MM:SS)
- **And** timezone is consistent (UTC or local conference timezone)
- **And** Excel recognizes timestamps as datetime values for calculations
- **And** completion duration can be calculated (Completion_Time - Start_Time)

**Scenario 11: Session ID for Response Grouping**
- **Given** multiple responses belong to same attendee
- **When** exported to CSV
- **Then** each row represents one attendee's complete response set
- **And** Session_ID appears in first column for tracking
- **And** all 19 questions for same session appear in same row
- **And** format enables row-level analysis per attendee

**Scenario 12: Data Validation After Export**
- **Given** CSV file has been generated
- **When** conference organizer opens file
- **Then** row count matches expected number of survey submissions (e.g., 38 rows for 38 complete responses + header)
- **And** no duplicate Session_IDs exist
- **And** all question columns are present (19 questions minimum)
- **And** data spot-check confirms accuracy (sample responses match database)

**Scenario 13: Export Performance with Full Dataset**
- **Given** 40 complete survey responses exist
- **When** conference organizer triggers export
- **Then** CSV generation completes within 10 seconds
- **And** file size is manageable (< 5MB for 40 responses)
- **And** Excel opens file without performance issues

### Non-Functional Requirements
- [ ] Performance: CSV export completes in < 10 seconds for 40 responses
- [ ] Performance: File size remains manageable (< 5MB) for typical response volume
- [ ] Security: Export function requires authentication (only authorized organizers can export)
- [ ] Security: Exported data contains sensitive feedback - access control required
- [ ] Usability: Column headers are clear and self-explanatory
- [ ] Usability: Format works seamlessly with Excel, Google Sheets, Numbers
- [ ] Data integrity: Export accurately reflects database contents (no data loss)
- [ ] Compatibility: UTF-8 encoding prevents character corruption
- [ ] Maintainability: Export function handles schema changes gracefully

### Quality Checklist
- [ ] CSV export tested with complete dataset (40 responses)
- [ ] All question types export correctly (Likert, multiple select, ranking, text, dropdown)
- [ ] Demographic fields export with proper headers and values
- [ ] Special characters tested (commas, quotes, line breaks, international characters)
- [ ] File opens correctly in Excel (Windows and Mac)
- [ ] File opens correctly in Google Sheets
- [ ] File opens correctly in Numbers (Mac)
- [ ] Column headers reviewed for clarity and consistency
- [ ] UTF-8 encoding verified (special characters display correctly)
- [ ] Incomplete responses export correctly (partial data + status indicator)
- [ ] Session ID uniqueness verified in export
- [ ] Timestamp format tested (Excel recognizes as datetime)
- [ ] Export performance tested with full dataset (< 10 seconds)
- [ ] Access control tested (only authorized organizers can export)

## Technical Notes
**CSV Structure Example**:
```
Session_ID,Start_Time,Completion_Time,Status,Role,Years_At_Company,Q1_Rating,Q1_Comment,Q2_Rating,Q2_Comment,...,Q19_Value
abc-123,2025-12-06 14:30:00,2025-12-06 14:38:15,Complete,Employee,3-5 years,5,"Excellent atmosphere!",4,"",...,Active Associate
def-456,2025-12-06 14:31:22,2025-12-06 14:39:45,Complete,Client,This is my first NAM Conference,4,"",5,"Great connections",...,Client
```

**Implementation Options**:
1. **Server-side generation**: Generate CSV on backend when organizer clicks "Export" button
2. **Scheduled export**: Automated daily export uploaded to secure location
3. **API endpoint**: RESTful API endpoint that returns CSV file (requires authentication)
4. **Command-line tool**: Script that database admin can run to generate export

**Recommended: Server-side generation via authenticated admin interface**

**CSV Generation Libraries**:
- Python: `csv` module (standard library) or `pandas.to_csv()`
- Node.js: `csv-writer` or `json2csv`
- Ruby: `CSV` class (standard library)

**Handling Special Characters**:
- Escape commas in text with quotes: `"This text, has commas"`
- Escape quotes by doubling: `"He said ""hello"""`
- Convert line breaks to space or use quoted multi-line cells
- Use UTF-8 BOM (Byte Order Mark) for Excel compatibility on Windows

**Column Ordering Recommendation**:
1. Metadata: Session_ID, Start_Time, Completion_Time, Status
2. Demographics: Role, Years_At_Company
3. Questions in order: Q1_Rating, Q1_Comment, Q2_Rating, Q2_Comment, ..., Q19_Value

## Open Questions
- Should multiple select responses use comma-separated values in one column or separate boolean columns for each option?
- Should we include additional metadata columns (IP address, browser type, device type) for fraud detection?
- Should we provide multiple export formats (CSV, Excel XLSX, JSON) or CSV only for MVP?
- Should export be accessible via admin web interface, API, or both?
- Should we include column for "Completion Duration" (calculated field) or expect organizers to calculate in Excel?

## Estimate
**Size**: M (3-5 days)
**Confidence**: High

**Reasoning**: CSV generation with proper formatting, encoding, and special character handling requires careful implementation and thorough testing across multiple spreadsheet applications. Access control and admin interface add complexity.

**Breakdown**:
- CSV generation logic implementation: 2 days
- Admin interface for triggering export: 1 day
- Testing all question types in export: 1 day
- Testing across spreadsheet applications (Excel, Sheets, Numbers): 1 day
- UTF-8 encoding and special character testing: 0.5 day
- Access control implementation: 0.5 day

## Dependencies
- Story 022 (Database Storage) - must have response data to export
- Admin authentication system (or decision to use command-line export for MVP)
- Decision on export trigger mechanism (web UI, API, or script)
