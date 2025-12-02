# User Story: Optional Comment Boxes (12 Total)

**Story ID**: STORY-006
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, qualitative-feedback, conference-attendee, mixed-format

## User Story

As a conference attendee (Sarah Aslanifar persona),
I want optional text boxes beneath select questions where I can add context to my ratings,
So that I can explain my reasoning when it matters to me without being forced to write essays or provide commentary when I have nothing to add.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 6 (Optional Comment Boxes)
**User Need**: "When answering survey questions, I want complete control over what I share, so I can provide authentic feedback without feeling forced"
**Supporting Evidence**:
- Sarah Aslanifar: "I do like a mix. I do like the multiple choice, but also an option to write something if there's something that I notice that's not there" - preference for mixed format
- Andrew Shawcare: Question-specific commentary preference (ability to elaborate when needed)
- Synthesis: "12 optional comment boxes" documented in Feature 6

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Comment Box Displays Beneath Specified Questions - Happy Path**
- **Given** I am viewing Q1 (Overall Conference Rating)
- **When** the question renders with its Likert scale
- **Then** an optional comment text box appears beneath the rating options
- **And** the text box is clearly labeled as "Optional comment" or similar
- **And** the text box is empty by default (not pre-filled)
- **And** I can type freely without character limits

**Scenario 2: All 12 Comment Boxes Present**
- **Given** I am completing the entire survey
- **When** I progress through the 19 questions
- **Then** I encounter comment boxes beneath these specific questions:
  - Q1 (Overall Conference Rating)
  - Q2 (Return Intent)
  - Q3 (Coworking Day Value)
  - Q5 (Connection Depth)
  - Q6 (Learning Value)
  - Q7 (Future Learning Topics) - this is already open-ended, comment may be redundant but specified
  - Q8 (Saturday Personal Time Worth)
  - Q9 (Pre-Conference Communication)
  - Q10 (Accommodations/Venue/Catering) - conditional: "Please comment if you answered Neutral or below"
  - Q12 (Conference Length)
  - Q13 (Comparison to Other Professional Development)
  - Q15 (Additional Feedback) - this is already open-ended
  - Q16 (Recommendation Improvements)
- **And** Q4, Q11, Q14, Q17, Q18, Q19 do NOT have comment boxes (per specification)

**Scenario 3: Leaving Comment Box Empty - No Validation**
- **Given** I view a question with an optional comment box
- **When** I leave the comment box empty and proceed
- **Then** no validation error appears
- **And** no warning suggests I should add a comment
- **And** the survey accepts my submission with empty comment
- **And** empty comment saves as null/empty in database

**Scenario 4: Adding Comment Text**
- **Given** I want to explain my Q1 rating of "3 - Neutral"
- **When** I type in the optional comment box: "Venue was excellent but content felt rushed"
- **Then** my comment saves with the response
- **And** the comment exports to CSV in dedicated "Q1 - Comment" column
- **And** my comment is preserved exactly as typed (no truncation)

**Scenario 5: Q10 Conditional Comment Instruction**
- **Given** I rate Q10 (Accommodations/Venue/Catering) as "3 - Neutral"
- **When** the comment box appears
- **Then** the label states: "Please comment if you answered Neutral or below (Optional)"
- **And** I am encouraged but NOT required to provide context
- **And** if I rate Q10 as "5 - Excellent", the same comment box still appears (not hidden)
- **And** the instruction helps guide when comments are most useful

**Scenario 6: No Character Limits**
- **Given** I want to provide detailed feedback in Q15 (Additional Feedback)
- **When** I type a 500-word comment
- **Then** the text box accepts all text without truncation
- **And** no "X characters remaining" counter appears
- **And** the text area expands vertically to show all my text (or scrolls smoothly)
- **And** my full comment saves and exports to CSV

**Scenario 7: Multi-Line Text Support**
- **Given** I am typing in a comment box
- **When** I press Enter to create a new paragraph
- **Then** line breaks are preserved in the text box
- **And** line breaks save to database
- **And** line breaks export properly in CSV (quoted cell format)
- **And** I can organize my feedback in readable paragraphs

**Scenario 8: Mobile Text Entry**
- **Given** I am completing the survey on a mobile device
- **When** I tap into a comment box
- **Then** the mobile keyboard appears smoothly
- **And** the text area is large enough to see 3-4 lines of text
- **And** the viewport adjusts so keyboard doesn't cover my typing
- **And** typing feels natural with standard mobile keyboard

**Scenario 9: Clear Optional Labeling**
- **Given** I am viewing any of the 12 comment boxes
- **When** I read the label
- **Then** the word "Optional" is clearly visible
- **And** no asterisk (*) or "Required" indicator appears
- **And** the styling matches other optional elements (Q19 demographics)
- **And** I understand I can skip without consequence

**Scenario 10: Comment Box Positioning**
- **Given** I am viewing a question with rating scale and comment box
- **When** the page renders
- **Then** the comment box appears AFTER the rating options (not before)
- **And** adequate spacing (16px+) separates comment from next question
- **And** the visual hierarchy is clear (question → rating → transparency note → comment)

### Non-Functional Requirements

- [ ] **Performance**: Comment boxes render instantly with questions (no delayed load)
- [ ] **Accessibility**: Text areas have proper labels for screen readers; keyboard navigation works
- [ ] **Usability**: Text areas resize/scroll appropriately for long comments
- [ ] **Data Integrity**: Comments preserve special characters, line breaks, and Unicode

### Quality Checklist

- [ ] All 12 comment boxes implemented per specification (Q1, Q2, Q3, Q5, Q6, Q7, Q8, Q9, Q10, Q12, Q13, Q15, Q16)
- [ ] Q10 conditional instruction verified: "Please comment if you answered Neutral or below (Optional)"
- [ ] All labeled clearly as "Optional"
- [ ] No character limits enforced
- [ ] Can be left blank without validation errors
- [ ] Mobile text input tested on iOS and Android
- [ ] Multi-line text (Enter key) works properly
- [ ] Comments export to CSV in dedicated columns
- [ ] Screen reader announces "Optional comment" label
- [ ] Spec verification: proposed-survey-questions.md lists all 12 comment locations

## Technical Notes

**HTML Structure:**
```html
<!-- Example: Q1 with comment box -->
<div class="question">
  <h3 class="question-text">
    Q1. How would you rate your overall NAM Conference experience?
  </h3>

  <p class="transparency-note">
    This helps leadership understand overall event quality...
  </p>

  <!-- Likert scale options -->
  <div class="likert-options">
    <!-- Radio buttons for 1-5 + N/A -->
  </div>

  <!-- Optional comment box -->
  <div class="optional-comment">
    <label for="q1-comment">
      Optional comment:
    </label>
    <textarea
      id="q1-comment"
      name="q1_comment"
      rows="3"
      placeholder=""
      aria-label="Optional comment for overall conference rating"
    ></textarea>
  </div>
</div>
```

**Styling Specifications:**
```css
.optional-comment {
  margin-top: 12px;
  margin-bottom: 24px;
}

.optional-comment label {
  display: block;
  font-size: 14px;
  color: #6B7280; /* Gray to indicate optional */
  font-style: italic;
  margin-bottom: 4px;
}

.optional-comment textarea {
  width: 100%;
  min-height: 80px; /* ~3 lines */
  padding: 12px;
  font-size: 16px; /* Prevent iOS zoom */
  font-family: inherit;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  resize: vertical; /* Allow user to resize */
}

.optional-comment textarea:focus {
  outline: 2px solid #3B82F6; /* Blue focus ring */
  border-color: #3B82F6;
}

/* Mobile adjustments */
@media (max-width: 639px) {
  .optional-comment textarea {
    min-height: 100px; /* Slightly taller on mobile */
  }
}
```

**Q10 Conditional Instruction:**
```html
<label for="q10-comment">
  Please comment if you answered Neutral or below (Optional):
</label>
```
Note: Box still visible for all ratings, but instruction guides when most useful

**Database Schema:**
```sql
-- 12 optional comment columns
CREATE TABLE survey_responses (
  -- ... question fields ...

  q1_comment TEXT,   -- Optional, NULL allowed
  q2_comment TEXT,
  q3_comment TEXT,
  q5_comment TEXT,
  q6_comment TEXT,
  q7_comment TEXT,   -- Redundant with Q7 main field but specified
  q8_comment TEXT,
  q9_comment TEXT,
  q10_comment TEXT,
  q12_comment TEXT,
  q13_comment TEXT,
  q15_comment TEXT,  -- Redundant with Q15 main field but specified
  q16_comment TEXT
);
```

**Character Limit:**
- Database: TEXT type (no arbitrary limit)
- Frontend: No `maxlength` attribute on textarea
- Backend validation: Accept any length (reasonable max ~5000 chars for practicality)

**Line Break Handling:**
- Store as-is in database (preserve \n)
- CSV export: Quote cells with line breaks
  ```csv
  "Comment with
  line break here"
  ```

## Design Notes

**Why 12 Comment Boxes (Not All 19 Questions):**
From synthesis Feature 6:
- Located beneath: Q1, Q2, Q3, Q5, Q6, Q7, Q8, Q9, Q12, Q13, Q15, Q16
- Q10 has conditional comment: "Please comment if you answered Neutral or below"
- Q4, Q11, Q14, Q17, Q18, Q19 do NOT have comment boxes

Rationale:
- Likert scales benefit from context (Q1, Q2, Q3, Q5, Q6, Q8, Q9, Q12, Q13)
- Open-ended questions Q7, Q15 already allow free-form (comment may be redundant)
- Multi-select (Q4, Q17) and ranking (Q11) less need for elaboration
- Demographics (Q18, Q19) don't need comments
- Q14 (What You Liked Most) is already open-ended

**Visual Hierarchy:**
```
┌─────────────────────────────────────┐
│ Question Text (Bold, 16px)          │
│ Transparency Note (Gray, 14px)      │
│                                     │
│ ○ 5 - Excellent                    │
│ ○ 4 - Good                         │
│ ○ 3 - Neutral                      │
│ ○ 2 - Fair                         │
│ ○ 1 - Poor                         │
│                                     │
│ Optional comment: (Italic, Gray)    │
│ ┌─────────────────────────────────┐ │
│ │ [Text area - 3 rows visible]    │ │
│ │                                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Placeholder Text:**
Decision: NO placeholder text
Rationale:
- "Optional comment" label is sufficient instruction
- Placeholder text can be confusing (looks like pre-filled content)
- Screen readers may read placeholder as value
- Empty text area is clearest UX

**Resize Behavior:**
- `resize: vertical` allows users to drag to expand if needed
- Prevents horizontal resize (would break mobile layout)
- Default 3 rows visible; expands as user types

## Open Questions

- ✅ Should comment boxes be expandable/collapsible to reduce visual clutter? **ANSWER**: No - always visible. Sarah wants "option to write something" readily available. Collapsing adds friction.
- ✅ Do Q7 and Q15 need separate comment boxes when they're already open-ended? **ANSWER**: Per synthesis specification, yes - implement as specified. May be redundant but simplifies question structure consistency.

## Estimate

**Size**: S (1-2 days)
**Confidence**: High

**Breakdown:**
- Add 12 textarea elements to question templates: 2-3 hours
- Style text areas (desktop and mobile): 2-3 hours
- Database schema update (12 comment columns): 1 hour
- Backend API update (accept comment fields): 1-2 hours
- CSV export update (12 comment columns): 2-3 hours
- Testing all 12 comment boxes: 2-3 hours
- Mobile text input testing: 2 hours
- Accessibility testing (screen reader labels): 1-2 hours

**Total**: ~13-19 hours (1.5-2 days)

## Dependencies

- STORY-007 through STORY-010 (Question Types) - comment boxes attach to questions
- STORY-004 (Mobile-First Responsive Design) - ensures mobile text input
- STORY-005 (CSV Export) - comment columns must export
- STORY-016 (Database Schema) - comment fields in schema

## Notes

### Why This Story is Must-Have (Critical Path Justification)

**Balances Structure and Flexibility:**
- Likert scales provide quantitative data (Lauren's need)
- Comment boxes enable qualitative context (Katie's need)
- Optional nature prevents abandonment (Sarah's need)

**Sarah's Mixed Format Preference:**
- "I do like a mix. I do like the multiple choice, but also an option to write something"
- Pure structured survey feels restrictive
- Pure open-ended survey takes too long
- Mixed format is optimal

**Enriches Data Quality:**
- "Why" behind ratings matters as much as ratings themselves
- Comments reveal unexpected insights structured questions miss
- Low-effort implementation (S-sized) for high data value

### Design Decision Rationale

**Why Optional (Not Required):**
- Mandatory comments would violate STORY-002 (Zero Mandatory Fields)
- Sarah abandons surveys with forced text entry
- Comments are valuable when provided voluntarily, useless when forced

**Why Beneath Rating (Not Above):**
- Logical flow: Rate first, then explain if desired
- Prevents comment influencing rating (bias)
- Matches mental model: "Here's my rating, and here's why"

**Why All Visible (Not Conditional Display):**
- Simpler implementation
- No JavaScript complexity for show/hide logic
- Q10 instruction guides when comment most useful without hiding option
- Consistent UX across all 12 comment boxes

**Why No Character Limit:**
- Andrew and Sarah want flexibility to elaborate
- Artificial limits feel arbitrary and restrictive
- CSV export handles long text properly
- Database TEXT type supports unlimited length

### Testing Strategy

**Critical Test Cases:**
1. All 12 comment boxes render on correct questions
2. Submit survey with all comments empty - succeeds
3. Submit survey with all comments filled - all save
4. Submit survey with mix (5 comments, 7 empty) - selective save
5. Multi-line comment with Enter key - preserves line breaks
6. Long comment (500+ words) - no truncation
7. Special characters in comment (quotes, commas) - CSV exports correctly
8. Mobile typing in comment box - keyboard doesn't cover text
9. Screen reader announces "Optional comment" label
10. Q10 conditional instruction displays properly

**Regression Prevention:**
- Automated test: "12 comment textareas exist in DOM"
- QA checklist: "Verify all comments export to CSV"
- Code review: "No maxlength attributes on comment textareas"

---

## For Issue Tracker Import

**Title**: Optional Comment Boxes (12 Total)
**Description**:
As a conference attendee, I want optional text boxes beneath select questions where I can add context to my ratings, so I can explain my reasoning without being forced to provide commentary.

**Source**: Discovery cycle 2025-11-12-mvp, addressing Sarah Aslanifar's mixed format preference. Feature 6: Optional Comment Boxes.

**Acceptance Criteria**: 12 optional comment boxes beneath specified questions (Q1, Q2, Q3, Q5, Q6, Q7, Q8, Q9, Q10, Q12, Q13, Q15, Q16); clearly labeled "Optional"; no character limits; can be left blank; export to CSV in dedicated columns.

**Labels**: 2025-11-12-mvp, qualitative-feedback, must-have, mixed-format
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 3 (S-sized, 1-2 days)
