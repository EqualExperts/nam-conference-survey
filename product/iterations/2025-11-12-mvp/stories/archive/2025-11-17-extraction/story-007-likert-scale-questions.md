# User Story: Likert Scale Questions (9 Total)

**Story ID**: STORY-007
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, quantitative-measurement, conference-organizer, katies-measurement-areas

## User Story

As a conference organizer (Katie Coleman persona),
I want consistent 1-5 Likert scale questions for key metrics across my 4 measurement areas,
So that I can quantitatively measure satisfaction, value, and intent with comparable data that enables trend tracking and statistical analysis.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 7 (Likert Scale Questions), Theme 5 (Katie's 4 Measurement Areas)
**User Need**: "When I invest in conference planning, I want quantitative data across emotional sentiment, logistics, learning, and networking dimensions, so I can make data-driven decisions about future events"
**Supporting Evidence**:
- Katie Coleman key requirements: 4 non-negotiable measurement areas (Emotional Sentiment, Logistics, Learning Outcomes, Networking Effectiveness)
- Katie Coleman: "We're very conscious that this is on a Saturday, and it's people's personal time" - Saturday validation question critical (Q8)
- Chris Condo: Quantitative data needs from Forrester survey experience - consistent scales enable statistical analysis
- Lauren Kessler: "I can dice it the ways that I need to" - structured data enables demographic segmentation

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: All 9 Likert Questions Render with Consistent Scale**
- **Given** I am completing the survey
- **When** I encounter any of the 9 Likert scale questions (Q1, Q2, Q3, Q5, Q6, Q8, Q10, Q13, Q16)
- **Then** each displays a 1-5 scale with radio button or slider interface
- **And** endpoint labels are clear (e.g., "5 - Excellent" to "1 - Poor")
- **And** all 9 questions use the same visual presentation format

**Scenario 2: Mobile-Friendly Selection Interface**
- **Given** I am completing the survey on a mobile device (375px width)
- **When** I view a Likert scale question
- **Then** the radio buttons or slider are touch-friendly (minimum 44px tap target)
- **And** labels remain readable without horizontal scrolling
- **And** I can easily select my rating with one touch

**Scenario 3: N/A Option Availability on Applicable Questions**
- **Given** I am viewing Q3 (Coworking Day), Q8 (Saturday), Q10 (Accommodations), or Q13 (Comparison)
- **When** the question renders
- **Then** an "N/A" or "Does not apply" option appears as distinct from the 1-5 scale
- **And** selecting N/A excludes numeric rating selection
- **And** N/A is clearly labeled with context (e.g., Q8: "Did not attend Saturday")

**Scenario 4: Single Selection Enforced**
- **Given** I am answering a Likert scale question
- **When** I select rating "4"
- **Then** only "4" remains selected (radio button behavior)
- **And** I cannot select multiple ratings simultaneously
- **And** I can change my selection before submission

**Scenario 5: CSV Export Shows Numeric Value and Label**
- **Given** I have completed a survey with Likert scale responses
- **When** the survey administrator exports data to CSV
- **Then** Q1 shows both numeric value (1-5) and label ("Excellent", "Good", etc.)
- **And** N/A selections export clearly as "N/A" not as zero or blank
- **And** all 9 Likert questions appear in dedicated columns with proper headers

### Non-Functional Requirements

- [ ] **Accessibility**: Screen readers announce scale endpoints and current selection; keyboard navigation works (arrow keys to change selection)
- [ ] **Performance**: Likert controls render instantly with question (no loading delay)
- [ ] **Consistency**: All 9 questions use identical scale structure (1-5 + N/A where applicable)
- [ ] **Usability**: Clear visual feedback when option selected (color change, checkmark, or similar indicator)

### Quality Checklist

- [ ] All 9 Likert questions implemented: Q1, Q2, Q3, Q5, Q6, Q8, Q10, Q13, Q16
- [ ] N/A option appears only on Q3, Q8, Q10, Q13 (not on other 5 questions)
- [ ] Endpoint labels match proposed-survey-questions.md specifications exactly
- [ ] Mobile testing confirms touch-friendly selection on iOS Safari and Android Chrome
- [ ] Screen reader announces scale structure and selected value
- [ ] CSV export tested with various response patterns (all answered, some N/A, some skipped)

## Technical Notes

**Question Coverage by Katie's 4 Measurement Areas:**

**Emotional Sentiment:**
- Q1: Overall conference rating (1-5: Excellent to Poor)
- Q2: Return intent (1-5: Definitely to Definitely not)
- Q8: Saturday worth (1-5: Absolutely worth it to Not worth my Saturday) + N/A option

**Logistics:**
- Q10: Accommodations/Venue/Catering (1-5: Excellent to Poor) + N/A option

**Learning Outcomes:**
- Q6: Learning value (1-5: Extremely valuable to Not valuable)
- Q13: vs other professional development (1-5: Significantly more valuable to Significantly less valuable) + N/A option

**Networking Effectiveness:**
- Q3: Coworking day value (1-5: Extremely valuable to Not valuable) + N/A option
- Q5: Connection depth (1-5: Very deep to Very superficial)

**General/Multiple Areas:**
- Q16: Likelihood to recommend (1-5: Extremely likely to Not at all likely)

**Implementation Approach:**
```javascript
// Example Likert question data structure
const likertQuestions = [
  {
    id: 'q1',
    text: 'How would you rate your overall NAM Conference experience?',
    scale: {
      type: 'likert-5',
      endpoints: { 5: 'Excellent', 1: 'Poor' },
      includeNA: false
    },
    transparencyNote: 'This helps leadership understand overall event quality and justify future investment in conferences.'
  },
  {
    id: 'q8',
    text: 'Was the NAM Conference worth giving up your personal Saturday time?',
    scale: {
      type: 'likert-5',
      endpoints: { 5: 'Absolutely worth it', 1: 'Not worth my Saturday' },
      includeNA: true,
      naLabel: 'Did not attend Saturday'
    },
    transparencyNote: '...'
  }
  // ... remaining 7 Likert questions
];
```

**Responsive Design Considerations:**
- Desktop: Radio buttons with labels inline or in row
- Mobile: Stacked radio buttons for easier touch targeting
- Alternative: Slider control if touch-optimized and accessible

**CSV Export Format:**
```csv
question_id,numeric_value,text_label
q1,5,Excellent
q2,4,Probably yes
q3,N/A,Did not attend coworking day
q5,3,Neither deep nor superficial
q6,5,Extremely valuable
```

## Design Notes

**Visual Hierarchy Example (Q1):**
```
[Question Text - Bold, 16px, Dark Gray]
Q1. How would you rate your overall NAM Conference experience?

[Transparency Note - Regular, 14px, Medium Gray, Italic]
This helps leadership understand overall event quality and justify future investment in conferences.

[Likert Scale - Radio buttons, 16px labels]
○ 5 - Excellent
○ 4 - Good
○ 3 - Fair
○ 2 - Below expectations
○ 1 - Poor

[Optional Comment Box - See STORY-006]
(Optional) Any additional comments about your overall experience?
```

**N/A Option Placement:**
For questions with N/A (Q3, Q8, Q10, Q13):
```
○ 5 - Excellent
○ 4 - Good
○ 3 - Fair
○ 2 - Below expectations
○ 1 - Poor
○ N/A - Did not stay at conference hotel  [Visually distinct, perhaps with separator line]
```

**Mobile-Friendly Touch Targets:**
- Minimum 44x44px tap target per iOS Human Interface Guidelines
- Adequate spacing between options (minimum 8px vertical gap)
- Consider larger radio button size on mobile (20px vs 16px on desktop)

## Open Questions

- ✅ Should we use radio buttons or slider interface for Likert scales? **ANSWER**: Radio buttons preferred for accessibility and clarity; sliders acceptable if keyboard-accessible and announce current value to screen readers
- ✅ Should N/A appear before or after the 1-5 scale? **ANSWER**: After, with visual separation, to reinforce it's a distinct option from the rating continuum
- ✅ Do we need neutral midpoint labels (e.g., "3 - Neutral")? **ANSWER**: Yes - proposed-survey-questions.md shows endpoint labels but midpoint labels improve clarity

## Estimate

**Size**: M (3-5 days)
**Confidence**: High

**Breakdown:**
- Likert component development (reusable): 4-6 hours
- Implement 9 questions with specific endpoint labels: 4-6 hours
- N/A option logic for 4 questions: 2-3 hours
- Mobile responsive optimization: 4-6 hours
- Accessibility implementation (keyboard nav, screen reader): 4-6 hours
- CSV export format for Likert data: 3-4 hours
- Testing all 9 questions on multiple devices: 3-4 hours

**Total**: ~24-35 hours (3-4.5 days)

## Dependencies

- STORY-001 (Question-Level Transparency) - provides transparency notes beneath each question
- STORY-002 (Zero Mandatory Fields) - ensures Likert questions can be skipped
- STORY-004 (Mobile-First Responsive Design) - provides responsive layout system
- STORY-012 (N/A Option Handling) - provides N/A implementation pattern (if separate story)
- STORY-016 (Database Schema) - defines storage for numeric values and N/A responses

## Notes

### Why This Story is Must-Have (Walking Skeleton)

**Covers All 4 of Katie's Critical Measurement Areas:**
- Emotional Sentiment: Q1, Q2, Q8 (3 questions)
- Logistics: Q10 (1 question)
- Learning Outcomes: Q6, Q13 (2 questions)
- Networking Effectiveness: Q3, Q5 (2 questions)
- Plus Q16 (recommendation likelihood) - general quality indicator

**Enables Quantitative Analysis:**
- Consistent 1-5 scale allows statistical comparison
- Trend tracking over multiple conference years
- Demographic segmentation by employment status (per Lauren's needs)
- Benchmarking against industry standards or prior events

**High-Value Question Coverage:**
- 9 of 19 total questions (47% of survey)
- Includes Katie's most critical question (Q8 - Saturday worth)
- Provides structured data that complements qualitative open-ended responses

### Katie's 4 Measurement Areas - Question Mapping

From synthesis Theme 5, Katie identified these as non-negotiable:

1. **Emotional Sentiment** - "Is this worth their Saturday time?"
   - **Q1**: Overall experience rating
   - **Q2**: Would you attend again?
   - **Q8**: Saturday personal time worth (CRITICAL)

2. **Logistics** - "Did we set clear expectations, was venue good, accommodations adequate?"
   - **Q10**: Accommodations/Venue/Catering quality

3. **Learning Outcomes** - "Was it informative? Did you learn something?"
   - **Q6**: Learning value
   - **Q13**: Comparison to other professional development

4. **Networking Effectiveness** - "Meeting people is primary value"
   - **Q3**: Coworking day connection value
   - **Q5**: Depth of connections made

### Design Decision Rationale

**Why 1-5 Scale (Not 1-7 or 1-10):**
- Industry standard for survey research
- Odd number allows neutral midpoint
- 5 options balance granularity with decision fatigue
- Mobile-friendly (7 or 10 options harder to display clearly on small screens)

**Why Labeled Endpoints (Not Numeric Only):**
- Clarity about what scale represents
- Accessibility for screen readers
- Reduces interpretation ambiguity
- Consistent with proposed-survey-questions.md specifications

**Why N/A on Only 4 Questions:**
- Q3: Coworking day not attended by all (some arrived Friday evening)
- Q8: Saturday sessions optional (some only attended Friday)
- Q10: Not all stayed at conference hotel
- Q13: Some attendees haven't attended other professional development events
- Other 5 questions apply universally to all conference attendees

---

## For Issue Tracker Import

**Title**: Likert Scale Questions (9 Total)

**Description**:
As a conference organizer, I want consistent 1-5 Likert scale questions covering emotional sentiment, logistics, learning, and networking areas, so I can quantitatively measure satisfaction and make data-driven decisions about future events.

**Covers Katie's 4 Critical Measurement Areas**: Emotional (Q1, Q2, Q8), Logistics (Q10), Learning (Q6, Q13), Networking (Q3, Q5), plus Recommendation (Q16).

**Acceptance Criteria**: All 9 Likert questions render with consistent 1-5 scale, clear endpoint labels, mobile-friendly selection interface, N/A options on Q3/Q8/Q10/Q13, and CSV export showing numeric values and labels.

**Labels**: 2025-11-12-mvp, quantitative-measurement, must-have, mobile-responsive
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 5 (M-sized, 3-5 days)
