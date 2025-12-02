# User Story: N/A Option Handling (4 Questions)

**Story ID**: STORY-012
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, n-a-handling, conference-attendee, data-quality

## User Story

As a conference attendee,
I want N/A options on questions that might not apply to my situation,
So that I can accurately indicate non-applicability without being forced to choose an inaccurate rating or skip questions where I have valid context to share.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 12 (N/A Option Handling)
**User Need**: "When answering survey questions, I want complete control over what I share, so I can provide authentic feedback without feeling forced"
**Supporting Evidence**:
- PM follow-up interview: "All questions are applicable to everyone via N/A options" - resolves first-time vs repeat attendee question applicability
- Sarah Aslanifar: Abandons surveys with mandatory fields or forced inaccurate responses
- Andrew Shawcare: Needs ability to skip questions where personal values conflict or question doesn't apply
- Synthesis Theme 2: Completion barriers drive abandonment more than survey length

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: N/A Selection on Coworking Day (Q3)**
- **Given** an attendee did not participate in the optional coworking day
- **When** Q3 (Coworking Day Value) renders
- **Then** a distinct N/A option is displayed alongside the 1-5 Likert scale
- **And** N/A option labeled: "I did not attend the coworking day"
- **And** selecting N/A excludes selection of any 1-5 rating
- **And** CSV export shows "N/A" or "Did not attend" (not blank, not numeric value)

**Scenario 2: N/A Selection on Saturday Attendance (Q8)**
- **Given** an attendee only attended Friday sessions
- **When** Q8 (Saturday Personal Time Worth) renders
- **Then** N/A option is displayed: "I did not attend Saturday sessions"
- **And** selecting N/A prevents rating selection
- **And** optional comment box still available if attendee wants to explain non-attendance

**Scenario 3: N/A Selection on Accommodations (Q10)**
- **Given** an attendee stayed off-site or is a local resident
- **When** Q10 (Accommodations/Venue/Catering) renders
- **Then** N/A option is displayed: "I did not stay at the conference hotel"
- **And** N/A selection indicates inapplicability of accommodations rating
- **And** venue and catering ratings may still be relevant (implementation note: Q10 has sub-questions)

**Scenario 4: N/A Selection on Professional Development Comparison (Q13)**
- **Given** an attendee has never attended other professional development events
- **When** Q13 (Comparison to Other PD Events) renders
- **Then** N/A option is displayed: "I haven't attended other professional development events"
- **And** N/A distinguishes between "no comparison available" vs "equal to others" (rating 3)

**Scenario 5: CSV Export Distinguishes N/A from Blank**
- **Given** multiple attendees have submitted with various N/A selections
- **When** Lauren exports to CSV
- **Then** N/A selections show as "N/A" or descriptive text (not empty cell)
- **And** N/A is distinguishable from skipped questions (blank cells)
- **And** Lauren can filter/segment on N/A responses in her analysis

**Scenario 6: N/A Selection Mutually Exclusive with Ratings**
- **Given** an attendee selects N/A on Q3 (coworking day)
- **When** they then attempt to select a 1-5 rating
- **Then** the N/A selection is cleared (radio button behavior)
- **And** vice versa: selecting a rating clears previously selected N/A
- **And** only one selection (N/A or 1-5) is possible at a time

### Non-Functional Requirements

- [ ] **Data Quality**: N/A selections stored distinctly from numeric ratings and blank responses
- [ ] **Usability**: N/A option visually distinct from 1-5 scale (separate radio button, not part of scale)
- [ ] **Accessibility**: Screen readers announce N/A option with full descriptive label
- [ ] **Analytics**: CSV export preserves N/A semantic meaning for Lauren's segmentation analysis

### Quality Checklist

- [ ] All 4 questions (Q3, Q8, Q10, Q13) include appropriate N/A option
- [ ] N/A labels match proposed-survey-questions.md specifications
- [ ] N/A rendered as separate radio button (not dropdown or checkbox)
- [ ] Mutual exclusivity enforced: N/A selection clears ratings, rating selection clears N/A
- [ ] CSV export tested: N/A shows as text identifier (not 0, not blank)
- [ ] Mobile rendering: N/A option touch-friendly and clearly separated from scale
- [ ] Screen reader testing: N/A announced with full descriptive label

## Technical Notes

**Data Model for N/A:**
- Store N/A selections as string value: "N/A" or "Did not attend" (consistent across questions)
- Database schema: Same column as numeric rating (store as text) OR separate boolean flag
- Recommended approach: Text column that accepts "1", "2", "3", "4", "5", or "N/A"
- CSV export: Output N/A text directly (no translation to numeric)

**N/A Option Labels (per proposed-survey-questions.md):**
- Q3: "I did not attend the coworking day"
- Q8: "I did not attend Saturday sessions"
- Q10: "I did not stay at the conference hotel"
- Q13: "I haven't attended other professional development events"

**UI Implementation Pattern:**
```html
<fieldset>
  <legend>Q3. How valuable was the coworking day?</legend>
  <label><input type="radio" name="q3" value="5"> 5 - Extremely valuable</label>
  <label><input type="radio" name="q3" value="4"> 4 - Very valuable</label>
  <label><input type="radio" name="q3" value="3"> 3 - Moderately valuable</label>
  <label><input type="radio" name="q3" value="2"> 2 - Slightly valuable</label>
  <label><input type="radio" name="q3" value="1"> 1 - Not at all valuable</label>
  <label><input type="radio" name="q3" value="N/A"> I did not attend the coworking day</label>
</fieldset>
```

**CSV Export Format:**
- Column: Q3_Coworking_Day_Value
- Possible values: "5", "4", "3", "2", "1", "N/A", "" (blank if skipped)
- N/A value exported as text "N/A" for clarity in Excel/spreadsheet analysis

**Special Case: Q10 Sub-Questions**
- Q10 asks about accommodations, venue, AND catering in one question
- N/A applies to accommodations rating only (not venue/catering)
- Implementation decision: If Q10 has separate sub-ratings, N/A option applies to accommodations sub-question
- If Q10 is single combined rating, N/A label: "I did not stay at the conference hotel (rate venue/catering only)"
- Verify Q10 structure in proposed-survey-questions.md during implementation

## Design Notes

**Visual Separation of N/A Option:**
```
Q3. How valuable was the coworking day for building connections?

Rating Scale:
○ 5 - Extremely valuable
○ 4 - Very valuable
○ 3 - Moderately valuable
○ 2 - Slightly valuable
○ 1 - Not at all valuable

OR:
○ I did not attend the coworking day

[Transparency note]
This helps us assess the value of pre-conference networking activities.

[Optional comment box]
```

**Alternative: Horizontal Separator**
Use visual separator (horizontal line or spacing) between 1-5 scale and N/A option to emphasize "this is different from low rating."

**Mobile Considerations:**
- N/A option on its own line (not inline with scale to avoid cramping)
- Adequate touch target size (44x44px minimum)
- Clear visual distinction on narrow screens (color/border/spacing)

## Open Questions

- ✅ Should N/A options have associated comment boxes? **ANSWER**: Yes if Q3/Q8/Q10/Q13 already have optional comment boxes per Feature 6; N/A selection doesn't disable comment
- ✅ What if someone attended half of Saturday - how do they rate? **ANSWER**: They can rate based on partial attendance; N/A is only for complete non-attendance
- ✅ Does Q10 need multiple N/A options for different sub-questions? **ANSWER**: Depends on Q10 structure - verify during implementation

## Estimate

**Size**: XS (< 1 day)
**Confidence**: High

**Breakdown:**
- Add N/A radio button to 4 questions: 2-3 hours
- Update data model to accept N/A values: 1-2 hours
- CSV export logic for N/A text output: 1-2 hours
- Mutual exclusivity validation (N/A vs ratings): 1 hour
- Testing all 4 N/A selections and export: 2 hours
- Accessibility verification: 1 hour

## Dependencies

- STORY-007 (Likert Scale Questions) - provides base 1-5 scale rendering that N/A extends
- STORY-005 (CSV Export with Demographic Headers) - exports N/A values correctly
- proposed-survey-questions.md - specifies which questions need N/A and exact label text

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Prevents Data Quality Issues:**
- Without N/A, non-attendees forced to either skip question or provide meaningless rating
- Skipped questions lose valuable data (e.g., why someone didn't attend Saturday)
- False ratings (rating 3 when didn't attend) corrupt data analysis

**Enables Applicability Without Barriers:**
- PM follow-up clarified: "all questions applicable via N/A options"
- Addresses first-time vs repeat attendee concern - N/A makes comparison question applicable to all
- Maintains zero mandatory fields principle while ensuring every question can be answered

**Supports Lauren's Analysis:**
- Distinguishing "didn't attend" from "attended and rated low" is critical for decision-making
- Example: Low Q8 ratings mean "Saturday didn't deliver value" → fix programming
- N/A selections mean "some people don't attend Saturday" → understand why (logistics? interest?)

### Design Decision Rationale

**Why Radio Button (Not Checkbox):**
N/A is mutually exclusive with 1-5 rating. Radio button enforces single selection. Checkbox would allow confusing "rated 3 AND marked N/A" scenario.

**Why Descriptive Labels (Not Just "N/A"):**
"I did not attend the coworking day" is self-explanatory and accessible. Screen reader users understand context. Simple "N/A" requires users to infer meaning.

**Why N/A Distinct from Ratings (Not "0" or "6"):**
N/A is categorically different from low/high rating. Storing as numeric would corrupt statistical analysis (mean, median calculations). Text value preserves semantic meaning.

**Why CSV Export Shows "N/A" Text:**
Lauren analyzes in Excel/Google Sheets. Text "N/A" is immediately recognizable. Numeric 0 could be confused with "didn't answer" vs "not applicable." Empty cell looks like missing data.

### Implementation Considerations

**Backward Compatibility:**
If database initially stores only numeric ratings (1-5), migration needed to accept text values. Alternative: separate `is_not_applicable` boolean flag (more complex, not recommended).

**Validation Logic:**
```javascript
// Pseudocode
if (q3_value === 'N/A' && q3_rating !== null) {
  // Clear conflicting rating
  q3_rating = null;
}
```

**Analytics Impact:**
When Lauren calculates average ratings, N/A responses should be excluded from calculation (not treated as 0). Document this in CSV export notes.

---

## For Issue Tracker Import

**Title**: N/A Option Handling (4 Questions: Coworking, Saturday, Accommodations, Comparison)

**Description**:
As a conference attendee, I want N/A options on questions that might not apply to my situation, so I can accurately indicate non-applicability without being forced to choose an inaccurate rating.

**Source**: Discovery cycle 2025-11-12-mvp, addressing data quality and completion barrier concerns from PM follow-up and attendee interviews.

**Acceptance Criteria**: See full criteria above - N/A options on Q3 (coworking), Q8 (Saturday), Q10 (accommodations), Q13 (comparison) with descriptive labels, mutually exclusive with ratings, CSV export shows N/A as text.

**Labels**: 2025-11-12-mvp, n-a-handling, must-have, data-quality
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 1 (XS-sized, < 1 day)
