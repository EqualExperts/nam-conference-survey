# User Story: CSV Export with Demographic Headers

**Story ID**: STORY-005
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, data-export, conference-planner, demographic-analysis

## User Story

As a conference planner (Lauren Kessler persona),
I want to export raw survey data to CSV format with properly labeled demographic columns,
So that I can perform custom segmentation analysis based on employment status, location, and other factors to inform future event planning decisions.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Theme 4 (Strategic Demographic Segmentation), Feature 5
**User Need**: "When planning future events, I want to analyze feedback by different demographic segments, so I can understand how different groups experience conferences differently"
**Supporting Evidence**:
- Lauren Kessler: "I love the raw data. If you just send me the spreadsheet that Google Forms spits out, I can dice it the ways that I need to… based on who's active, clients, employees versus associates"
- Lauren Kessler: "95% completion or completion from all of our active team members" - statistical validity requires near-universal participation
- Chris Condo: Target "at least 30 people to fill it out" (75% of 40 attendees) for meaningful segmentation

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Export All Survey Data - Happy Path**
- **Given** at least 1 survey response has been submitted to the database
- **When** I (conference planner) trigger the CSV export function
- **Then** a CSV file downloads to my computer
- **And** the file includes all 19 questions as columns
- **And** the file includes all 12 optional comment fields as columns
- **And** each row represents one survey response
- **And** all submitted responses are included in the export

**Scenario 2: Proper Column Headers for Questions**
- **Given** I open the exported CSV file
- **When** I view the header row
- **Then** each question has a clear, descriptive column header
- **And** Q1 header: "Q1 - Overall Conference Rating (1-5)"
- **And** Q2 header: "Q2 - Return Intent (1-5)"
- **And** all 19 questions follow consistent naming pattern: "Q[number] - [Short Description]"
- **And** headers are human-readable (not database column names like "q1_overall_rating")

**Scenario 3: Demographic Fields Clearly Labeled**
- **Given** I open the exported CSV file
- **When** I view the demographic columns
- **Then** Q18 header: "Q18 - Employment Status"
- **And** Q19 name header: "Q19 - Name (Optional)"
- **And** Q19 location header: "Q19 - Home Location (Optional)"
- **And** demographic fields are at the end of the CSV (columns 32-34 after all questions/comments)

**Scenario 4: Optional Comment Boxes Export to Dedicated Columns**
- **Given** I open the exported CSV file
- **When** I view the columns
- **Then** each of the 12 optional comment boxes has a dedicated column
- **And** comment column headers: "Q1 - Comment", "Q2 - Comment", etc.
- **And** empty comments export as empty cells (not "null" or "N/A")
- **And** comment text preserves line breaks (quoted CSV format)

**Scenario 5: Multi-Select Question Format**
- **Given** I open the exported CSV file
- **When** I view Q4 (Connection Quality - multiple select)
- **Then** selected options export in one cell, comma-separated (e.g., "Reconnecting with colleagues, Meeting new people")
- **Or** each option exports to a separate boolean column (Q4_Option1, Q4_Option2, etc.)
- **And** the format is consistent and documented (whichever approach chosen)
- **And** I can easily filter/analyze the multi-select data in Excel/Google Sheets

**Scenario 6: Ranking Question Format**
- **Given** I open the exported CSV file
- **When** I view Q11 (Session Format Preferences - ranking)
- **Then** each session type has a column showing its rank (1-4)
- **And** Q11 columns: "Q11 - Main Presentations Rank", "Q11 - Interactive Workshops Rank", "Q11 - Co-working Time Rank", "Q11 - Networking/Social Time Rank"
- **And** rank values (1, 2, 3, 4) are numeric for sorting/analysis
- **And** empty ranks export as empty cells if question skipped

**Scenario 7: Handling Null/Skipped Questions**
- **Given** a survey response where attendee skipped 10 of 19 questions
- **When** I export the CSV
- **Then** skipped questions export as empty cells
- **And** no placeholder text like "Not Answered" or "N/A" appears
- **And** Excel/Google Sheets treats empty cells as null for calculation purposes
- **And** I can easily identify completion patterns (count non-empty cells per row)

**Scenario 8: N/A Option Handling**
- **Given** an attendee selected "N/A" for Q8 (Saturday - Did not attend)
- **When** I export the CSV
- **Then** Q8 cell shows "N/A" text (distinguishes from skipped question)
- **And** I can filter to see who selected N/A vs who skipped vs who rated 1-5
- **And** N/A is consistent format across Q3, Q8, Q10, Q13

**Scenario 9: Special Characters and Commas in Text**
- **Given** an attendee entered comment: "Great conference, but too short"
- **When** I export the CSV
- **Then** the comma in the comment doesn't break the CSV format
- **And** the cell is properly quoted: `"Great conference, but too short"`
- **And** line breaks in long comments are preserved within quoted cells
- **And** Excel/Google Sheets parses the file correctly

**Scenario 10: Timestamp Metadata**
- **Given** I export the CSV file
- **When** I view the columns
- **Then** a "Submitted At" column shows timestamp for each response
- **And** timestamp format: "YYYY-MM-DD HH:MM:SS" (sortable)
- **And** timezone is consistent (e.g., all EST or all UTC)
- **And** I can sort responses by submission time to identify early vs late responders

### Non-Functional Requirements

- [ ] **Performance**: CSV export completes in <5 seconds for 40 responses
- [ ] **Compatibility**: CSV opens correctly in Excel (Windows/Mac) and Google Sheets
- [ ] **Encoding**: UTF-8 encoding to support special characters (accented names, etc.)
- [ ] **File Size**: Reasonable size (<1 MB for 40 responses)

### Quality Checklist

- [ ] All 19 questions export with proper headers
- [ ] All 12 optional comment boxes export to dedicated columns
- [ ] Demographic fields (Q18, Q19 name, Q19 location) clearly labeled
- [ ] Multi-select format documented and consistent (Q4, Q17)
- [ ] Ranking format shows individual rank values (Q11)
- [ ] Tested: CSV opens correctly in Excel (Windows)
- [ ] Tested: CSV opens correctly in Excel (Mac)
- [ ] Tested: CSV opens correctly in Google Sheets
- [ ] Special characters (commas, quotes, line breaks) handled properly
- [ ] Empty/skipped questions export as empty cells (not "null")
- [ ] Timestamp column included with sortable format
- [ ] Implementation notes verified: "CSV export with proper column headers"

## Technical Notes

**Export Implementation Options:**

**Option 1: Server-Side CSV Generation (Recommended)**
```python
# Example: Python/Flask backend
import csv
from io import StringIO

def export_csv():
    output = StringIO()
    writer = csv.writer(output)

    # Header row
    writer.writerow([
        'Submitted At',
        'Q1 - Overall Conference Rating (1-5)',
        'Q1 - Comment',
        'Q2 - Return Intent (1-5)',
        'Q2 - Comment',
        # ... all 19 questions + 12 comments
        'Q18 - Employment Status',
        'Q19 - Name (Optional)',
        'Q19 - Home Location (Optional)'
    ])

    # Data rows
    responses = get_all_survey_responses()
    for response in responses:
        writer.writerow([
            response.submitted_at.strftime('%Y-%m-%d %H:%M:%S'),
            response.q1_overall_rating or '',
            response.q1_comment or '',
            # ... all fields
        ])

    return output.getvalue()
```

**Option 2: Client-Side CSV Generation**
- JavaScript library: PapaParse or similar
- Fetch JSON data from API, convert to CSV client-side
- Download via `<a download>` element
- Pros: Reduces server load; Cons: Large datasets may be slow

**Column Order (34 columns total):**
1. Submitted At (timestamp)
2-20. Q1-Q19 (question responses)
21-32. Q1 Comment, Q2 Comment, ... (12 optional comments)
33-35. Q18 Employment Status, Q19 Name, Q19 Location (demographics)

**Multi-Select Handling (Q4, Q17):**
Recommended approach: Comma-separated in single cell
```
"Reconnecting with colleagues, Meeting new people, Learning from peers"
```
Alternative: Separate boolean columns (more complex but easier for pivot tables)
```
Q4_Reconnecting: TRUE
Q4_MeetingNew: TRUE
Q4_LearningPeers: TRUE
Q4_Mentoring: FALSE
```

**Ranking Handling (Q11):**
Four separate columns with numeric rank values:
```
Q11_MainPresentations: 1
Q11_InteractiveWorkshops: 3
Q11_CoworkingTime: 4
Q11_NetworkingSocial: 2
```

**CSV Special Characters:**
```python
# Proper quoting for commas, quotes, newlines
csv.writer(output, quoting=csv.QUOTE_MINIMAL)
# Handles: "Text with, comma" and "Text with ""quote"" "
```

**Encoding:**
```python
# UTF-8 BOM for Excel compatibility
output = '\ufeff' + csv_content  # BOM marker
```

**Access Control:**
- Export endpoint requires authentication (Lauren/Katie access only)
- Consider password-protected download link
- Log export events for audit trail

## Design Notes

**Export Trigger UI:**
- Admin dashboard with "Export to CSV" button
- Or: Email link to Lauren with authenticated download URL
- Simple, one-click export (no configuration options in MVP)

**User Experience:**
```
[Export Survey Data] button
  ↓
File downloads: NAM_Conference_Survey_2025-11-17.csv
  ↓
Lauren opens in Excel/Google Sheets
  ↓
Performs custom analysis (pivot tables, filters, charts)
```

**CSV vs Other Formats:**
Why not Excel (.xlsx)?
- CSV is simpler, more universal
- Google Sheets imports CSV more reliably
- Lauren specifically requested "raw data" (CSV is rawest)
- MVP scope: CSV sufficient

Why not JSON?
- Lauren is not technical - needs Excel-compatible format
- CSV enables immediate analysis without conversion

**Header Naming Convention:**
- "Q[number] - [Short Description]" pattern
- Keeps headers concise for Excel column width
- Sortable by question number
- Descriptive enough to understand without reference doc

## Open Questions

- ✅ Should export be real-time or scheduled (e.g., nightly batch)? **ANSWER**: Real-time export via admin dashboard. 40 responses = small dataset, no performance concern.
- ✅ Who has access to export function? **ANSWER**: Katie Coleman and Lauren Kessler only. Authentication required.
- ✅ Multi-select format: single cell or separate columns? **ANSWER**: Single cell, comma-separated. Simpler for MVP; Lauren can split in Excel if needed.

## Estimate

**Size**: M (3-5 days)
**Confidence**: Medium (multi-select and ranking export adds complexity)

**Breakdown:**
- CSV generation logic: 6-8 hours
- Header naming and column ordering: 2-3 hours
- Multi-select format implementation: 3-4 hours
- Ranking format implementation: 2-3 hours
- Special character handling (quotes, commas): 2-3 hours
- Admin dashboard export button: 3-4 hours
- Authentication/access control: 3-4 hours
- Cross-platform testing (Excel, Google Sheets): 4-6 hours
- Edge case testing (null values, special chars): 3-4 hours

**Total**: ~28-43 hours (3.5-5 days)

## Dependencies

- STORY-016 (Database Schema & Data Storage) - all responses stored in database
- STORY-007 through STORY-011 (All Question Types) - ensures all data types captured
- Admin authentication system (if not exists, add to dependencies)
- Access to Windows Excel and Google Sheets for testing

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Lauren's Primary Requirement:**
- "I love the raw data" - CSV export is her must-have tool
- Google Forms export was baseline expectation - custom solution must match/exceed
- Demographic segmentation is core value proposition of survey

**Business Value:**
- Enables data-driven event planning decisions
- Justifies future conference investment per Katie's ROI question
- Supports custom analysis without technical barriers

**Differentiator:**
- Proper headers (not "q1_overall_rating" database columns)
- Demographic fields designed for segmentation
- Multi-select and ranking formats optimized for analysis

### Design Decision Rationale

**Why Comma-Separated Multi-Select (Not Separate Columns):**
- Simpler implementation
- Easier to read in CSV preview
- Lauren can split in Excel: `Text to Columns` feature
- Reduces column count (34 vs 50+ with all boolean options)

**Why Individual Rank Columns (Not Comma-Separated):**
- Ranking data is numeric - needs separate columns for sorting
- Pivot tables require numeric columns
- Lauren can easily calculate average rank per session type

**Why UTF-8 with BOM:**
- Excel on Windows requires BOM to detect UTF-8
- Prevents garbled characters in names with accents
- Google Sheets handles UTF-8 natively

### Testing Strategy

**Critical Test Cases:**
1. Export with 5 complete responses - verify all 34 columns
2. Export with 3 partial responses (skipped questions) - verify empty cells
3. Export with special characters in comments - verify no CSV breakage
4. Export with all N/A selections - verify distinct from empty
5. Open in Excel (Windows) - verify proper column separation
6. Open in Excel (Mac) - verify proper encoding
7. Open in Google Sheets - verify all features work

**Data Validation:**
- Row count = response count in database
- No data loss (compare exported data to database)
- Timestamps match database timezone
- Multi-select preserves all selections
- Ranking preserves all rank values

---

## For Issue Tracker Import

**Title**: CSV Export with Demographic Headers
**Description**:
As a conference planner (Lauren), I want to export raw survey data to CSV with properly labeled demographic columns, so I can perform custom segmentation analysis based on employment status and location.

**Source**: Discovery cycle 2025-11-12-mvp, addressing Lauren Kessler's primary data analysis requirement. Theme 4: Strategic Demographic Segmentation.

**Acceptance Criteria**: All 19 questions + 12 comments export to CSV with clear headers; demographic fields (Q18, Q19) clearly labeled; multi-select and ranking formats documented; opens correctly in Excel and Google Sheets; special characters handled properly.

**Labels**: 2025-11-12-mvp, data-export, must-have, demographic-analysis
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 5 (M-sized, 3-5 days)
