# User Story: Open-Ended Text Questions (3 Total)

**Story ID**: STORY-010
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, qualitative-insights, conference-organizer, open-feedback

## User Story

As a conference organizer (Katie Coleman persona),
I want to collect unrestricted qualitative feedback on future topics, what attendees liked most, and general additional feedback,
So that I can capture rich insights and unexpected themes that structured questions might miss.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 10 (Open-Ended Text Questions)
**User Need**: "When analyzing conference success, I need both quantitative metrics and qualitative context to understand the full story and discover unexpected insights"
**Supporting Evidence**:
- Katie Coleman: Emphasis on qualitative insights alongside quantitative data from 4 measurement areas
- Chris Condo: "You want both the raw data and the interpretation" - importance of qualitative context
- Sarah Aslanifar: "I do like a mix. I do like the multiple choice, but also an option to write something if there's something that I notice that's not there"
- Synthesis: "Complements quantitative data with rich context; enables discovery of unexpected themes"

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Q7 Future Learning Topics - Free-Form Text Entry**
- **Given** I am viewing Q7: "What topics would you like to see covered at future NAM Conferences?"
- **When** the question renders
- **Then** I see a multi-line text area for open-ended response
- **And** the text area accepts unlimited characters
- **And** I can submit without entering anything (field is optional)
- **And** placeholder text suggests examples without being prescriptive

**Scenario 2: Q14 What Liked Most - Free-Form Text Entry**
- **Given** I am viewing Q14: "What did you like most about the NAM Conference?"
- **When** the question renders
- **Then** I see a multi-line text area for open-ended response
- **And** the text area allows unrestricted length input
- **And** I can leave it blank and proceed (field is optional)

**Scenario 3: Q15 Additional Feedback - Free-Form Text Entry**
- **Given** I am viewing Q15: "Is there anything else you'd like to share about the conference?"
- **When** the question renders
- **Then** I see a multi-line text area for open-ended response
- **And** no character limit restricts my input
- **And** I can skip this question without validation errors

**Scenario 4: Mobile Text Input Functional**
- **Given** I am completing the survey on a mobile device (375px width)
- **When** I interact with any of the 3 open-ended text questions
- **Then** the text area is appropriately sized for mobile (full width, multiple lines visible)
- **And** mobile keyboard appears when I tap the text area
- **And** I can type multi-line responses without layout issues
- **And** text remains readable as I type

**Scenario 5: CSV Export Preserves Full Text Content**
- **Given** I submitted long-form responses to Q7, Q14, and Q15
- **When** the survey administrator exports data to CSV
- **Then** all three open-ended responses export in full (no truncation)
- **And** multi-line text is properly escaped/quoted in CSV format
- **And** special characters (quotes, commas, line breaks) preserve correctly

### Non-Functional Requirements

- [ ] **Accessibility**: Screen readers announce text area and allow input; keyboard navigation allows tab to focus and typing works normally
- [ ] **Usability**: Text areas sized to encourage thoughtful responses (minimum 4-5 lines visible); auto-resize as user types (optional enhancement)
- [ ] **Data Integrity**: Database stores full text content without truncation; preserves line breaks and special characters
- [ ] **Performance**: Text entry responsive with no lag; large text submissions (500+ words) save successfully

### Quality Checklist

- [ ] All 3 open-ended questions implemented: Q7, Q14, Q15
- [ ] Text areas allow multi-line input (not single-line input fields)
- [ ] No character limits enforced on any of the 3 questions
- [ ] All 3 questions marked "Required: No" per STORY-002 (Zero Mandatory Fields)
- [ ] Mobile testing confirms functional text input on iOS Safari and Android Chrome
- [ ] CSV export tested with various text patterns (short, long, multi-line, special characters)
- [ ] proposed-survey-questions.md specification verified for question wording

## Technical Notes

**Open-Ended Questions from proposed-survey-questions.md:**

**Q7: Future Learning Topics**
- **Question**: "What topics would you like to see covered at future NAM Conferences?"
- **Type**: Open-ended text area
- **Purpose**: Informs future conference content planning
- **Transparency Note**: "This helps us plan future conference content based on your interests and learning goals."

**Q14: What You Liked Most**
- **Question**: "What did you like most about the NAM Conference?"
- **Type**: Open-ended text area
- **Purpose**: Captures positive highlights and unexpected successes
- **Transparency Note**: "Understanding what worked well helps us replicate success in future conferences."
- **Katie's Measurement Area**: Emotional Sentiment

**Q15: Additional Feedback**
- **Question**: "Is there anything else you'd like to share about the conference?"
- **Type**: Open-ended text area
- **Purpose**: Catch-all for feedback that doesn't fit structured questions
- **Transparency Note**: "This is your opportunity to share anything we didn't ask about."

**Database Schema:**
```sql
-- All three questions store full text content
q7_future_topics TEXT,        -- Unlimited length
q14_liked_most TEXT,          -- Unlimited length
q15_additional_feedback TEXT  -- Unlimited length

-- Use TEXT type (not VARCHAR with limit) to avoid truncation
```

**Frontend Implementation:**
```javascript
// Text area component
const OpenEndedQuestion = ({ questionId, questionText, transparencyNote, placeholder }) => {
  const [value, setValue] = useState('');

  return (
    <div className="question-container">
      <label htmlFor={questionId} className="question-text">
        {questionText}
      </label>
      <p className="transparency-note">{transparencyNote}</p>
      <textarea
        id={questionId}
        name={questionId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={5}  // Show 5 lines initially
        className="open-ended-textarea"
        aria-label={questionText}
        // NO maxLength attribute - allow unlimited input
      />
    </div>
  );
};

// Example usage
<OpenEndedQuestion
  questionId="q7"
  questionText="What topics would you like to see covered at future NAM Conferences?"
  transparencyNote="This helps us plan future conference content based on your interests and learning goals."
  placeholder="e.g., Technical deep-dives, leadership skills, client engagement strategies..."
/>
```

**CSV Export Considerations:**
```csv
# Handle multi-line text and special characters properly
respondent_id,q7_future_topics,q14_liked_most,q15_additional_feedback
001,"AI/ML topics
Cloud architecture
Agile at scale","The networking time was fantastic! Met so many great people.","Overall excellent, but coffee ran out on Saturday morning."
002,"Leadership development, communication skills",Loved the keynote on emerging tech trends,""
```

Use proper CSV escaping:
- Quote fields containing commas, quotes, or line breaks
- Escape internal quotes by doubling them (`"He said ""hello""" becomes He said "hello")
- Preserve line breaks within quoted fields

## Design Notes

**Text Area Sizing:**
```
[Question Text - Bold, 16px]
Q7. What topics would you like to see covered at future NAM Conferences?

[Transparency Note - Regular, 14px, Gray, Italic]
This helps us plan future conference content based on your interests and learning goals.

[Text Area - Full width, 5 visible lines, auto-expand]
┌──────────────────────────────────────────────────────────┐
│ e.g., Technical deep-dives, leadership skills...         │
│                                                           │
│                                                           │
│                                                           │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Mobile Considerations:**
- Full-width text area (no fixed width)
- Minimum 5 lines visible initially
- Font size minimum 16px to prevent iOS zoom on focus
- Adequate padding for touch interaction
- Consider auto-resize as user types (expand vertically, never shrink below 5 lines)

**Placeholder Text Examples:**
- Q7: "e.g., Technical deep-dives, leadership skills, client engagement strategies, work-life balance..."
- Q14: "e.g., Specific sessions, networking opportunities, venue, speakers..."
- Q15: (No placeholder - truly open-ended catch-all)

**Visual States:**
- Default: Light gray border, white background
- Focus: Darker border (blue or brand color), subtle glow
- Filled: Maintains default appearance with user's text visible

## Open Questions

- ✅ Should we have character limits to prevent extremely long responses? **ANSWER**: No - synthesis emphasizes "unrestricted" feedback. Lauren's past experience with unlimited text ("produced a lot of complaints about the venue") shows this is valuable, not problematic.
- ✅ Should text areas auto-resize as users type? **ANSWER**: Nice-to-have enhancement but not required for MVP. Fixed 5-line height acceptable.
- ✅ Do we need rich text formatting (bold, italic, lists)? **ANSWER**: No - plain text sufficient. Adds complexity without clear value per synthesis evidence.

## Estimate

**Size**: S (1-2 days)
**Confidence**: High

**Breakdown:**
- Text area component development (reusable): 2-3 hours
- Q7 implementation: 1 hour
- Q14 implementation: 1 hour
- Q15 implementation: 1 hour
- Mobile responsive optimization: 2-3 hours
- Accessibility testing (screen reader, keyboard): 2 hours
- Database schema update (TEXT columns): 1 hour
- CSV export with proper text escaping: 2-3 hours
- Testing with various text patterns: 2 hours

**Total**: ~14-19 hours (2 days)

## Dependencies

- STORY-001 (Question-Level Transparency) - provides transparency notes
- STORY-002 (Zero Mandatory Fields) - ensures text questions can be skipped
- STORY-004 (Mobile-First Responsive Design) - provides responsive layout
- STORY-016 (Database Schema) - defines TEXT columns for open-ended responses
- STORY-005 (CSV Export) - implements proper text escaping and multi-line handling

## Notes

### Why This Story is Must-Have (Walking Skeleton)

**Complements Quantitative Data:**
From synthesis:
> "Complements quantitative data with rich context; enables discovery of unexpected themes"

Likert scales and multi-select questions provide structure, but open-ended questions reveal:
- Unexpected pain points not covered by structured questions
- Positive highlights that organizers didn't anticipate
- Context behind numeric ratings (WHY someone rated overall experience 5 vs 3)

**Katie's Qualitative Insights Need:**
From synthesis Theme 5:
> Katie Coleman's 4 measurement areas include both quantitative and qualitative components

Q14 (What Liked Most) directly addresses Emotional Sentiment measurement area with qualitative depth.

**Lauren's Content Planning:**
Q7 (Future Learning Topics) directly informs future conference agenda:
- Identifies emerging topics of interest
- Reveals gaps in current content coverage
- Captures attendee career development priorities

**Addresses Sarah's Feedback Preference:**
From synthesis:
> Sarah Aslanifar: "I do like a mix. I do like the multiple choice, but also an option to write something if there's something that I notice that's not there"

Open-ended questions provide the flexibility Sarah values.

### Context from Synthesis

**Question Placement Logic:**

**Q7 (Future Topics)**: Positioned after learning-focused questions (Q6 learning value, Q7 future topics) - thematic flow

**Q14 (What Liked Most)**: Positioned near end of survey after all specific questions asked - allows respondents to reflect on overall experience

**Q15 (Additional Feedback)**: Final question - classic survey pattern for catch-all feedback

**Balance with Optional Comment Boxes:**
Survey includes:
- **12 optional comment boxes** beneath specific questions (focused feedback)
- **3 open-ended questions** for broader, unrestricted feedback

This balance provides multiple feedback channels without overwhelming with too many text fields.

### Design Decision Rationale

**Why No Character Limits:**
- Lauren's experience: Unlimited text revealed important venue feedback (even if volume was high)
- Better to have too much data than miss critical insights
- Statistical analysis can handle variable-length responses
- CSV export supports full text preservation

**Why Plain Text (Not Rich Text):**
- Simplifies implementation and reduces bugs
- Easier CSV export (no HTML/Markdown parsing needed)
- Screen reader accessibility simpler
- Mobile keyboards don't need formatting toolbar
- Plain text sufficient for feedback insights

**Why 5 Lines Visible Initially:**
- Signals expectation of multi-line response (vs single-line suggests short answer)
- Not so large as to intimidate (10+ lines might feel like "essay required")
- Mobile-friendly height (fits on screen with question and transparency note)

**Why All Three Questions Optional:**
Per STORY-002 (Zero Mandatory Fields):
- Q7: Attendees may not have topic suggestions → skip allowed
- Q14: Attendees may prefer to express via earlier comment boxes → skip allowed
- Q15: Catch-all truly optional → skip allowed

### Lauren's Past Experience with Open Text

From synthesis (Competitive Insights - Google Forms):
> Lauren Kessler: "Free flow text field with no character limit produced a lot of complaints about the venue" - overwhelming volume

**Lesson Learned**: Unlimited text is VALUABLE (captured important feedback) even if volume creates processing challenge. Solution: Combine structured questions (Q10 accommodations rating) with open-ended option (Q15 additional feedback).

This approach balances:
- Structured data for statistical analysis (Likert scales)
- Unrestricted qualitative depth (open-ended questions)

---

## For Issue Tracker Import

**Title**: Open-Ended Text Questions (3 Total)

**Description**:
As a conference organizer, I want to collect unrestricted qualitative feedback on future topics (Q7), what attendees liked most (Q14), and general additional feedback (Q15), so I can capture rich insights and unexpected themes that structured questions miss.

**Acceptance Criteria**: All 3 open-ended questions (Q7, Q14, Q15) accept multi-line text, no character limits, all optional per STORY-002, mobile text input functional, CSV export preserves full text content with proper escaping.

**Labels**: 2025-11-12-mvp, qualitative-insights, must-have, content-planning
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 3 (S-sized, 1-2 days)
