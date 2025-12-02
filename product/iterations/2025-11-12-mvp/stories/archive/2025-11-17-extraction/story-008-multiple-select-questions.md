# User Story: Multiple Select Checkbox Questions (2 Total)

**Story ID**: STORY-008
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, multi-dimensional-feedback, conference-attendee, networking-quality

## User Story

As a conference attendee,
I want to select multiple options from a list when more than one applies to my experience,
So that I can accurately represent the types of connections I valued and what would build my confidence in the feedback loop without being forced to choose only one.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 8 (Multiple Select Checkbox Questions)
**User Need**: "When describing my conference experience, I want to capture nuanced, multi-dimensional feedback that single-choice questions miss"
**Supporting Evidence**:
- Lauren Kessler: Choice ranking and multiple selection preference - enables understanding of overlapping priorities
- Q4 (Connection Quality): Attendees value multiple types of connections simultaneously (peer support, client relationships, mentorship, etc.)
- Q17 (Feedback Confidence): Multiple factors contribute to trust in feedback loop (acknowledgment, transparency, action taken, etc.)
- Synthesis: "Captures nuanced, multi-dimensional feedback that single-choice questions miss"

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Q4 Connection Quality - Multiple Selections Allowed**
- **Given** I am viewing Q4: "What types of connections did you find most valuable at the NAM Conference?"
- **When** the question renders
- **Then** I see 6 predefined checkbox options plus "Other (please specify)"
- **And** I can select as many options as apply to my experience
- **And** when I check "Other", a text field appears for specification
- **And** I can submit with any combination of selections (0, 1, or multiple)

**Scenario 2: Q17 Feedback Confidence - Multiple Selections Allowed**
- **Given** I am viewing Q17: "What would make you more confident that your feedback will be used?"
- **When** the question renders
- **Then** I see 7 predefined checkbox options plus "Other (please specify)"
- **And** I can select multiple options that matter to me
- **And** when I check "Other", a text field appears for specification
- **And** all my selections save correctly to the database

**Scenario 3: "Other" Text Field Conditional Visibility**
- **Given** I am on Q4 or Q17
- **When** I have not checked the "Other" option
- **Then** the "please specify" text field does not appear
- **When** I check "Other"
- **Then** the text field appears immediately beneath the checkbox
- **And** I can type my custom response
- **When** I uncheck "Other"
- **Then** the text field disappears and my typed text is discarded

**Scenario 4: Mobile-Friendly Checkbox Interface**
- **Given** I am completing the survey on a mobile device (375px width)
- **When** I view Q4 or Q17
- **Then** checkboxes are touch-friendly (minimum 44px tap target)
- **And** labels wrap appropriately without horizontal scrolling
- **And** I can easily check/uncheck options with one touch
- **And** "Other" text field is appropriately sized for mobile input

**Scenario 5: CSV Export Shows All Selected Options**
- **Given** I selected "Peer connections", "Client introductions", and "Other: Alumni reconnections" for Q4
- **When** the survey administrator exports data to CSV
- **Then** Q4 exports all three selections clearly
- **And** format is either comma-separated (option1,option2,other:custom) OR separate columns per option
- **And** both Q4 and Q17 multi-select responses export completely

### Non-Functional Requirements

- [ ] **Accessibility**: Screen readers announce "checkbox" role and checked state; keyboard navigation allows space bar to toggle selection
- [ ] **Usability**: Clear visual distinction between selected and unselected checkboxes; immediate feedback when toggled
- [ ] **Data Integrity**: Database stores all selected options without truncation; "Other" text preserved completely
- [ ] **Performance**: No lag when checking/unchecking options or revealing "Other" text field

### Quality Checklist

- [ ] Q4 implemented with 6 predefined options + Other
- [ ] Q17 implemented with 7 predefined options + Other
- [ ] "Other" text field appears/disappears based on checkbox state
- [ ] Multiple selections allowed (not radio button behavior)
- [ ] Mobile testing confirms touch-friendly interaction
- [ ] Screen reader announces checkbox state and label
- [ ] CSV export tested with various selection patterns (0 selected, all selected, mix)
- [ ] proposed-survey-questions.md specification verified for option wording

## Technical Notes

**Q4: Connection Types (6 predefined + Other)**

From proposed-survey-questions.md:
1. Peer connections (other consultants at my level)
2. Client introductions and relationship building
3. Leadership access (conversations with partners/directors)
4. Mentorship opportunities
5. Cross-office networking (meeting people from other regions)
6. Social/personal friendships beyond work
7. **Other (please specify):** [text field]

**Q17: Feedback Confidence Factors (7 predefined + Other)**

From proposed-survey-questions.md:
1. Seeing a summary of aggregated results
2. Knowing specific actions taken based on feedback
3. More transparency about how feedback is used
4. Follow-up communication from organizers
5. Public sharing of results (blog post, town hall)
6. Immediate acknowledgment of submission
7. Anonymous option for sensitive feedback
8. **Other (please specify):** [text field]

**Database Schema Approach:**

**Option 1: Comma-separated string** (simpler)
```sql
q4_connection_types TEXT,  -- "Peer connections,Client introductions,Other:Alumni"
q4_other_text TEXT,        -- "Alumni reconnections"
q17_confidence_factors TEXT,
q17_other_text TEXT
```

**Option 2: Separate boolean columns** (better for analysis)
```sql
-- Q4 columns
q4_peer_connections BOOLEAN,
q4_client_introductions BOOLEAN,
q4_leadership_access BOOLEAN,
q4_mentorship BOOLEAN,
q4_cross_office BOOLEAN,
q4_social_friendships BOOLEAN,
q4_other BOOLEAN,
q4_other_text TEXT,

-- Q17 columns
q17_aggregated_results BOOLEAN,
q17_actions_taken BOOLEAN,
q17_transparency BOOLEAN,
q17_followup_communication BOOLEAN,
q17_public_sharing BOOLEAN,
q17_immediate_acknowledgment BOOLEAN,
q17_anonymous_option BOOLEAN,
q17_other BOOLEAN,
q17_other_text TEXT
```

**Recommendation**: Use Option 2 (separate boolean columns) for easier demographic segmentation and statistical analysis per Lauren's requirements.

**Frontend Implementation:**
```javascript
// Q4 example
const q4Options = [
  { id: 'peer', label: 'Peer connections (other consultants at my level)' },
  { id: 'client', label: 'Client introductions and relationship building' },
  { id: 'leadership', label: 'Leadership access (conversations with partners/directors)' },
  { id: 'mentorship', label: 'Mentorship opportunities' },
  { id: 'cross_office', label: 'Cross-office networking (meeting people from other regions)' },
  { id: 'social', label: 'Social/personal friendships beyond work' },
  { id: 'other', label: 'Other (please specify):', hasTextField: true }
];

// State management
const [selectedOptions, setSelectedOptions] = useState([]);
const [otherText, setOtherText] = useState('');
const showOtherField = selectedOptions.includes('other');
```

## Design Notes

**Checkbox Layout Example (Q4):**
```
[Question Text]
Q4. What types of connections did you find most valuable at the NAM Conference?

[Transparency Note]
This helps us understand which networking aspects to prioritize in future conferences.

[Checkboxes - stacked vertically]
☐ Peer connections (other consultants at my level)
☐ Client introductions and relationship building
☐ Leadership access (conversations with partners/directors)
☐ Mentorship opportunities
☐ Cross-office networking (meeting people from other regions)
☐ Social/personal friendships beyond work
☐ Other (please specify): [text field appears when checked]

[Optional Comment Box - See STORY-006]
(Optional) Any additional comments about networking at the conference?
```

**Mobile Considerations:**
- Stack checkboxes vertically (not in columns)
- Full-width labels for easier tap targeting
- Adequate spacing between checkboxes (minimum 8px vertical gap)
- "Other" text field full-width on mobile

**Visual States:**
- Unchecked: Empty checkbox outline
- Checked: Checkbox with checkmark, possibly different background color
- Hover (desktop): Subtle highlight
- Focus (keyboard): Clear focus ring around checkbox

## Open Questions

- ✅ Should we limit the number of selections (e.g., "Select up to 3")? **ANSWER**: No - allow unlimited selections to capture authentic experience without forcing prioritization
- ✅ Should "Other" text field be required when "Other" is checked? **ANSWER**: No - all fields optional per STORY-002 (Zero Mandatory Fields)
- ✅ How should CSV export handle multiple selections? **ANSWER**: Separate boolean columns per option for easier analysis (per Technical Notes)

## Estimate

**Size**: S (1-2 days)
**Confidence**: High

**Breakdown:**
- Checkbox component development: 3-4 hours
- Q4 implementation (6 options + Other): 2-3 hours
- Q17 implementation (7 options + Other): 2-3 hours
- Conditional "Other" text field logic: 2 hours
- Mobile responsive optimization: 2-3 hours
- Accessibility implementation: 2-3 hours
- Database schema for multi-select storage: 2-3 hours
- CSV export format: 2-3 hours
- Testing both questions: 2 hours

**Total**: ~17-24 hours (2-3 days)

## Dependencies

- STORY-001 (Question-Level Transparency) - provides transparency notes
- STORY-002 (Zero Mandatory Fields) - ensures multi-select questions can be skipped
- STORY-004 (Mobile-First Responsive Design) - provides responsive layout
- STORY-016 (Database Schema) - defines storage for multi-select responses
- STORY-005 (CSV Export) - implements export format for multi-select data

## Notes

### Why This Story is Must-Have (Walking Skeleton)

**Captures Nuanced Networking Value:**
- Q4 is critical for understanding Katie's 4th measurement area (Networking Effectiveness)
- Single-choice question would force false prioritization - attendees genuinely value multiple connection types
- From synthesis: "Overwhelmingly. It's nearly always about the connections and meeting people" - networking is PRIMARY value

**Addresses Black Hole Effect:**
- Q17 directly implements feedback loop transparency
- Helps Katie and Lauren understand what builds trust for future participation
- Multiple selections reveal comprehensive trust-building strategy, not single silver bullet

**Data Quality:**
- More accurate than "Select your TOP connection type" forced ranking
- Reveals overlap patterns (e.g., "Do people who value client connections also value peer connections?")
- Enables richer demographic segmentation (per Lauren's analysis needs)

### Context from Synthesis

**Q4 Context:**
From synthesis Theme 5, networking is Katie's 4th critical measurement area:
> "Overwhelmingly. It's nearly always about the connections and meeting people" - primary stated value

Q4 provides detailed breakdown of which connection TYPES drive this value.

**Q17 Context:**
From synthesis Theme 1 (Black Hole Effect) and Theme 6 (Transparency Builds Trust):
- Andrew, Sarah, and Chris all emphasized need for feedback loop visibility
- Multiple factors contribute to confidence: acknowledgment, transparency, action taken, public sharing
- Q17 helps prioritize which transparency mechanisms to implement post-MVP

### Design Decision Rationale

**Why Checkboxes (Not Multi-Select Dropdown):**
- Better mobile experience (dropdowns awkward on touch devices)
- All options immediately visible (no interaction needed to see choices)
- Accessibility superior (screen readers handle checkboxes better than multi-select)
- User expectation: checkboxes signal multiple selection allowed

**Why "Other" Includes Text Field:**
- Captures unexpected connection types (e.g., "reconnected with alumni", "met spouse's colleagues")
- Provides qualitative context for selections
- Optional text prevents completion barrier (per STORY-002)

**Why No Selection Limit:**
- Attendees genuinely value multiple connection types simultaneously
- Forcing "top 3" prioritization creates cognitive load and reduces completion
- Database can store unlimited selections without issue
- Analysis can filter by number of selections if needed post-collection

---

## For Issue Tracker Import

**Title**: Multiple Select Checkbox Questions (2 Total)

**Description**:
As a conference attendee, I want to select multiple options when more than one applies to my experience, so I can accurately represent the types of connections I valued (Q4) and what would build my confidence in the feedback loop (Q17).

**Acceptance Criteria**: Q4 with 6 options + Other, Q17 with 7 options + Other, checkboxes allow multiple selections, "Other" reveals text field conditionally, mobile-friendly interface, CSV export shows all selected options.

**Labels**: 2025-11-12-mvp, multi-dimensional-feedback, must-have, networking
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 3 (S-sized, 1-2 days)
