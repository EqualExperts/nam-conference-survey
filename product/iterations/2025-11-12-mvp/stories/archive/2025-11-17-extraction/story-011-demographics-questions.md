# User Story: Demographics Questions (2 Total)

**Story ID**: STORY-011
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, demographics, conference-planner, data-segmentation

## User Story

As a conference planner (Lauren Kessler persona),
I want to capture employment status and optional name/location demographics,
So that I can segment responses by different attendee groups and follow up with specific participants when needed while preserving anonymity for those who prefer it.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 11 (Demographics Questions)
**User Need**: "When planning future events, I want to analyze feedback by different demographic segments, so I can understand how different groups experience conferences differently"
**Supporting Evidence**:
- Lauren Kessler interview: "I can dice it the ways that I need to… based on who's active, clients, employees versus associates" - custom segmentation requirement
- Lauren Kessler: "I love the raw data. If you just send me the spreadsheet that Google Forms spits out, I can dice it the ways I need to" - raw export requirement
- PM follow-up interview: Optional name field acceptable for follow-up purposes (resolves anonymity vs identification tension)
- Chris Condo: Demographic screening and segmentation essential from Forrester survey experience

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Employment Status Selection - Happy Path**
- **Given** a conference attendee is completing demographics questions
- **When** Q18 (Employment Status) renders
- **Then** 5 radio button options are displayed: Employee, Active Associate, Alumni Associate, Client, Prefer not to answer
- **And** attendee can select exactly one option
- **And** a transparency note explains: "This helps us segment feedback by different groups to understand their unique experiences and needs"

**Scenario 2: Optional Name and Location - Happy Path**
- **Given** a conference attendee reaches Q19 (Name and Home Location)
- **When** the question renders
- **Then** two text input fields are displayed: "Name (optional)" and "Home Location (city, state) (optional)"
- **And** placeholder text states: "Leave blank to remain anonymous"
- **And** transparency note explains: "Providing your name and home location is completely optional. Anonymous responses are equally valuable. Names help us follow up on specific feedback if you'd like a response."

**Scenario 3: Skipping Demographics Questions**
- **Given** an attendee prefers to remain completely anonymous
- **When** they leave Q18 and Q19 completely blank
- **Then** survey submission succeeds without validation errors
- **And** CSV export shows blank cells for those demographic fields
- **And** no error messages or warnings appear

**Scenario 4: CSV Export with Demographics**
- **Given** multiple attendees have submitted surveys with varying demographic data
- **When** Lauren exports data to CSV
- **Then** column headers clearly identify: "Q18_Employment_Status", "Q19_Name", "Q19_Home_Location"
- **And** all demographic data exports cleanly to respective columns
- **And** blank responses show as empty cells (not "N/A" or error values)

**Scenario 5: Partial Demographics Completion**
- **Given** an attendee wants to provide employment status but remain anonymous
- **When** they answer Q18 but leave Q19 blank
- **Then** submission succeeds with Q18 data captured and Q19 blank
- **And** no validation errors or prompts to complete Q19

### Non-Functional Requirements

- [ ] **Privacy**: No demographic fields marked as required; all optional per zero mandatory fields principle
- [ ] **Security**: Name and location data stored securely in database with same protections as other response data
- [ ] **Accessibility**: Radio buttons and text fields fully keyboard-navigable; screen readers announce "optional" status
- [ ] **Usability**: Clear visual indication that both Q18 and Q19 are optional (not just noted in transparency text)

### Quality Checklist

- [ ] Q18 renders as single-select radio buttons (not dropdown)
- [ ] Q19 displays two separate text input fields (name and location)
- [ ] Both questions marked "Required: No" in form logic
- [ ] Transparency notes match proposed-survey-questions.md specifications exactly
- [ ] Mobile testing confirms usable text input fields on phones
- [ ] CSV export tested with various completion patterns (all demographics, partial, none)
- [ ] "Leave blank to remain anonymous" placeholder visible in both Q19 fields

## Technical Notes

**Question 18 Implementation:**
- Field type: Radio button group
- Options array: ["Employee", "Active Associate", "Alumni Associate", "Client", "Prefer not to answer"]
- Default state: No option selected
- Required: false
- CSV column: "Q18_Employment_Status"

**Question 19 Implementation:**
- Field type: Two text input fields (not textarea)
- Field 1: Name (single-line text input, maxlength=100)
- Field 2: Home Location (single-line text input, maxlength=100, placeholder="e.g., Austin, TX")
- Default state: Both fields empty
- Required: false (both fields)
- CSV columns: "Q19_Name", "Q19_Home_Location"

**Data Storage:**
- Store Q18 as selected option text (not numeric ID) for CSV export clarity
- Store Q19 name and location as separate database fields
- Allow null values for all demographic fields
- No default values - distinguish between "no answer" and "prefer not to answer"

**Privacy Considerations:**
- Q19 name/location stored in same table as other responses (not separate PII table for MVP scope)
- Lauren has access to all data for analysis (no role-based PII restrictions in MVP)
- Future enhancement: PII encryption at rest (not MVP scope per 7-day timeline)

## Design Notes

**Visual Layout for Q18:**
```
Q18. What is your employment status with Equal Experts?

○ Employee
○ Active Associate
○ Alumni Associate
○ Client
○ Prefer not to answer

[Transparency note in lighter gray italic text]
This helps us segment feedback by different groups to understand their unique experiences and needs.

[Optional comment box if implemented per Feature 6]
```

**Visual Layout for Q19:**
```
Q19. Name and Home Location (Optional)

Name (optional)
[___________________________________]
Leave blank to remain anonymous

Home Location (city, state) (optional)
[___________________________________]
e.g., Austin, TX

[Transparency note in lighter gray italic text]
Providing your name and home location is completely optional. Anonymous responses are equally valuable. Names help us follow up on specific feedback if you'd like a response.
```

**Mobile Considerations:**
- Radio buttons sized for touch targets (minimum 44x44px)
- Text input fields use native mobile keyboard (type="text")
- Placeholder text visible on narrow screens
- Adequate spacing between name and location fields

## Open Questions

- ✅ Should we capture email address for follow-up? **ANSWER**: No - name is sufficient identifier for North America team size; email adds friction
- ✅ Is "Alumni Associate" the correct term? **ANSWER**: Verify with Lauren/Katie during story refinement; adjust if needed
- ✅ Do we need country in addition to city/state? **ANSWER**: No - North America conference assumes US/Canada context; city/state sufficient

## Estimate

**Size**: S (1-2 days)
**Confidence**: High

**Breakdown:**
- Q18 radio button implementation: 2-3 hours
- Q19 dual text field implementation: 2-3 hours
- CSV export column headers: 1-2 hours
- Placeholder and transparency text: 1 hour
- Testing various completion patterns: 2-3 hours
- Accessibility verification: 1-2 hours

## Dependencies

- STORY-002 (Zero Mandatory Fields Design) - establishes pattern for optional questions
- STORY-004 (Mobile-First Responsive Design) - provides base question rendering
- STORY-005 (CSV Export with Demographic Headers) - exports demographic data
- proposed-survey-questions.md - defines Q18 options and Q19 field specifications

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Enables Core Use Case:**
- Lauren's #1 requirement: "I can dice it the ways that I need to"
- Without demographic segmentation, survey provides only aggregate data
- Employment status essential for comparing Employee vs Associate vs Client experiences
- Name enables follow-up on specific actionable feedback

**Supports Strategic Decisions:**
- Katie's ROI analysis: "These are expensive things. Do they still create the value?"
- Understanding different group experiences informs future event design
- Validates whether conference serves all attendee types equally

**Balances Privacy and Utility:**
- PM follow-up resolved tension: optional name acceptable
- "Prefer not to answer" option on employment status preserves privacy
- Completely skippable Q19 enables full anonymity if desired

### Design Decision Rationale

**Why Radio Buttons (Not Dropdown) for Q18:**
Lauren needs this data for segmentation - radio buttons make options immediately visible and reduce completion friction compared to dropdown requiring click-to-expand.

**Why Separate Name and Location Fields:**
Enables Lauren to filter by geographic distribution (East Coast vs West Coast vs other) independent of identity. Separate fields export to separate CSV columns for analysis flexibility.

**Why "Prefer not to answer" vs Skippable:**
Both mechanisms preserve privacy, but explicit "Prefer not to answer" provides signal that attendee saw question and chose not to disclose (vs missed question). Helps Lauren assess whether demographic distributions are representative.

**Why No Email Field:**
North America team is ~40 people - name is sufficient identifier for follow-up. Email adds perceived tracking and reduces completion likelihood per Andrew's authenticity concerns.

### Content Decisions

**Q18 Options Match EE Organizational Structure:**
- Employee: Full-time staff
- Active Associate: Currently engaged contractors/consultants
- Alumni Associate: Previously engaged, still in network
- Client: Attending as Equal Experts client representative
- Prefer not to answer: Privacy preservation

*Note: Confirm terminology with Lauren during refinement*

**Q19 Placeholder Examples:**
- "Leave blank to remain anonymous" - emphasizes choice
- "e.g., Austin, TX" - demonstrates expected format without requiring specific structure

---

## For Issue Tracker Import

**Title**: Demographics Questions (Employment Status and Optional Name/Location)

**Description**:
As a conference planner, I want to capture employment status and optional name/location demographics, so I can segment responses by different attendee groups and follow up with specific participants while preserving anonymity for those who prefer it.

**Source**: Discovery cycle 2025-11-12-mvp, addressing Lauren Kessler's segmentation analysis needs and PM-clarified optional name field approach.

**Acceptance Criteria**: See full criteria above - Q18 single-select employment status (5 options), Q19 dual optional text fields (name and location), both fully skippable, CSV export with clear demographic column headers.

**Labels**: 2025-11-12-mvp, demographics, must-have, data-segmentation
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 3 (S-sized, 1-2 days)
