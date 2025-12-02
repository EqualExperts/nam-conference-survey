# User Story: Choice Ranking Question (1 Total)

**Story ID**: STORY-009
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-11-12-mvp, quantitative-ranking, conference-planner, schedule-design

## User Story

As a conference planner (Lauren Kessler persona),
I want attendees to rank session types in priority order,
So that I can understand preference hierarchies when balancing the event schedule and make data-driven decisions about time allocation.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 9 (Choice Ranking Question)
**User Need**: "When planning conference schedules, I need quantitative data on how attendees prioritize different session formats, so I can allocate time appropriately rather than relying on trial-and-error"
**Supporting Evidence**:
- Lauren Kessler interview: "That would be really helpful for me to see because then it gives me quantitative data on how people were ranking different things"
- Lauren Kessler: Trial-and-error planning without data - "I can dice it the ways that I need to" indicates preference for structured quantitative data
- Synthesis: "Provides prioritization data beyond binary preferences; informs schedule design trade-offs"

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Q11 Session Format Ranking - All Options Ranked**
- **Given** I am viewing Q11: "How would you rank the value of different session formats?"
- **When** the question renders
- **Then** I see 4 session types that need ranking: Main presentations, Interactive workshops, Co-working time, Networking/social time
- **And** I can assign each option a rank from 1-4 (where 1 = most valuable, 4 = least valuable)
- **And** each rank (1, 2, 3, 4) is assigned to exactly one option
- **And** the interface prevents duplicate rank assignments

**Scenario 2: Drag-to-Reorder Interface (Desktop/Touch Optimized)**
- **Given** I am on a desktop browser or tablet
- **When** I use the drag-and-drop ranking interface
- **Then** I can click and drag session types to reorder them
- **And** visual feedback shows the item being dragged (elevation, opacity change)
- **And** other items shift to accommodate the new position
- **And** when I release, the ranking updates and saves my preference

**Scenario 3: Dropdown Rank Assignment Alternative (Mobile Fallback)**
- **Given** I am on a mobile device where drag-and-drop may be challenging
- **When** I view the ranking question
- **Then** I can alternatively use dropdown menus to assign ranks 1-4 to each option
- **And** selecting a rank already assigned to another option swaps the ranks
- **And** the note states: "Drag to reorder, or use dropdown to assign rank 1-4 to each option"

**Scenario 4: Mobile-Optimized Interaction**
- **Given** I am completing the survey on a mobile device (375px width)
- **When** I interact with the ranking question
- **Then** the drag handles (if used) are touch-friendly (minimum 44px)
- **And** OR the dropdown rank selectors are appropriately sized
- **And** the interface works smoothly without layout shifting or scrolling issues

**Scenario 5: CSV Export Shows Rank Values**
- **Given** I ranked: Main presentations (1), Interactive workshops (2), Networking (3), Co-working (4)
- **When** the survey administrator exports data to CSV
- **Then** Q11 exports showing rank value (1-4) for each session type
- **And** format allows easy statistical analysis (e.g., average rank per session type)
- **And** column headers clearly indicate: q11_main_presentations_rank, q11_workshops_rank, q11_coworking_rank, q11_networking_rank

### Non-Functional Requirements

- [ ] **Accessibility**: Screen readers announce current rank order and allow keyboard-based reordering (up/down arrows or tab + number keys)
- [ ] **Usability**: Clear instructions explain ranking mechanism; visual feedback confirms current ranking state
- [ ] **Performance**: Drag-and-drop (if used) responds smoothly without lag; rank updates reflect immediately
- [ ] **Data Integrity**: Database stores rank values (1-4) for all four session types

### Quality Checklist

- [ ] Q11 implemented with all 4 session types rankable
- [ ] Drag-to-reorder OR dropdown ranking tested on desktop
- [ ] Mobile interaction tested on iOS Safari and Android Chrome
- [ ] Duplicate rank assignment prevented (UI enforces 1-4 unique assignments)
- [ ] Screen reader announces rank order and allows keyboard navigation
- [ ] CSV export tested - shows rank values per session type
- [ ] proposed-survey-questions.md specification verified for session type wording

## Technical Notes

**Q11: Session Format Preferences (4 options to rank 1-4)**

From proposed-survey-questions.md:
1. Main presentations (keynotes, talks)
2. Interactive workshops (hands-on sessions)
3. Co-working time (collaborative work blocks)
4. Networking/social time (meals, breaks, social events)

**Ranking Instruction:**
"Rank these from 1 (most valuable to you) to 4 (least valuable to you). Drag to reorder, or use dropdown to assign rank 1-4 to each option."

**Database Schema:**
```sql
-- Store individual rank for each session type
q11_main_presentations_rank INTEGER,  -- 1-4
q11_workshops_rank INTEGER,           -- 1-4
q11_coworking_rank INTEGER,           -- 1-4
q11_networking_rank INTEGER           -- 1-4

-- Validation: Each rank 1-4 appears exactly once across the four columns
```

**Implementation Approach Options:**

**Option 1: Drag-and-Drop Library** (e.g., react-beautiful-dnd, dnd-kit)
```javascript
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const sessionTypes = [
  { id: 'main_presentations', label: 'Main presentations (keynotes, talks)' },
  { id: 'workshops', label: 'Interactive workshops (hands-on sessions)' },
  { id: 'coworking', label: 'Co-working time (collaborative work blocks)' },
  { id: 'networking', label: 'Networking/social time (meals, breaks, social events)' }
];

// Order determines rank: index 0 = rank 1, index 1 = rank 2, etc.
const [orderedSessions, setOrderedSessions] = useState(sessionTypes);

// On drag end, reorder array and derive ranks from positions
```

**Option 2: Dropdown Rank Selection**
```javascript
const sessionTypes = [/* same as above */];

// State: { main_presentations: 1, workshops: 2, coworking: 4, networking: 3 }
const [ranks, setRanks] = useState({});

// When user selects rank N for session A, swap ranks if N already assigned to session B
const handleRankChange = (sessionId, newRank) => {
  const currentSessionWithRank = Object.entries(ranks).find(([id, rank]) => rank === newRank);
  if (currentSessionWithRank) {
    // Swap ranks
    setRanks({
      ...ranks,
      [currentSessionWithRank[0]]: ranks[sessionId],
      [sessionId]: newRank
    });
  } else {
    setRanks({ ...ranks, [sessionId]: newRank });
  }
};
```

**Recommendation**: Implement drag-and-drop as primary interface with dropdown as fallback or alternative. Test both on mobile to determine best user experience.

**CSV Export Format:**
```csv
respondent_id,q11_main_presentations_rank,q11_workshops_rank,q11_coworking_rank,q11_networking_rank
001,1,2,4,3
002,2,1,3,4
003,1,3,2,4
```

Allows Lauren to calculate:
- Average rank per session type (lower = more valuable)
- Most common #1 choice
- Correlation with demographics (e.g., do employees rank differently than associates?)

## Design Notes

**Drag-and-Drop Visual Example (Desktop):**
```
[Question Text]
Q11. How would you rank the value of different session formats?

[Transparency Note]
This helps us balance the conference schedule based on what attendees find most valuable.

[Instruction]
Drag to reorder from most valuable (top) to least valuable (bottom), or use dropdown to assign rank 1-4.

[Draggable List]
1. ≡ Main presentations (keynotes, talks)                    [Dropdown: 1]
2. ≡ Interactive workshops (hands-on sessions)               [Dropdown: 2]
3. ≡ Networking/social time (meals, breaks, social events)   [Dropdown: 3]
4. ≡ Co-working time (collaborative work blocks)             [Dropdown: 4]

(≡ represents drag handle; numbers auto-update based on position)
```

**Mobile Considerations:**
- Drag handles must be large enough for touch (44px minimum)
- Consider mobile-first approach: dropdowns primary, drag secondary
- Test drag-and-drop library mobile support thoroughly before committing
- Alternative: Simple up/down arrow buttons to reorder (more explicit than drag)

**Visual Feedback States:**
- Dragging: Item elevated (shadow), slightly transparent, cursor changes
- Drop target: Highlighted line or gap showing where item will land
- Completed: Rank numbers update to reflect new order

## Open Questions

- ✅ Should we use drag-and-drop or dropdown ranking? **ANSWER**: Implement both - drag-and-drop as primary (better UX), dropdown as alternative (better accessibility/mobile fallback). User chooses preferred method.
- ✅ Do we allow partial ranking (e.g., rank top 2, leave bottom 2 unranked)? **ANSWER**: No - require all 4 ranked for data consistency per proposed-survey-questions.md. However, entire question remains OPTIONAL per STORY-002.
- ✅ Should ranking be required or optional? **ANSWER**: Optional per STORY-002 (Zero Mandatory Fields). Survey can be submitted without ranking Q11.

## Estimate

**Size**: M (3-5 days)
**Confidence**: Medium-High

**Breakdown:**
- Drag-and-drop library integration: 4-6 hours
- Dropdown alternative implementation: 3-4 hours
- Rank swap logic (if using dropdowns): 2-3 hours
- Mobile optimization and testing: 4-6 hours
- Accessibility implementation (keyboard reordering, screen reader): 4-6 hours
- Database schema for rank storage: 2 hours
- CSV export format for ranking data: 2-3 hours
- Testing drag-and-drop on multiple devices/browsers: 3-4 hours
- Testing dropdown ranking interaction: 2 hours

**Total**: ~26-37 hours (3.5-4.5 days)

**Confidence Note**: Medium-High because drag-and-drop libraries can have mobile quirks. Dropdown fallback reduces risk.

## Dependencies

- STORY-001 (Question-Level Transparency) - provides transparency notes
- STORY-002 (Zero Mandatory Fields) - ensures ranking question can be skipped entirely
- STORY-004 (Mobile-First Responsive Design) - critical for mobile drag-and-drop testing
- STORY-016 (Database Schema) - defines storage for rank values
- STORY-005 (CSV Export) - implements export format for ranking data

## Notes

### Why This Story is Must-Have (Walking Skeleton)

**Lauren's Quantitative Data Need:**
From synthesis:
> Lauren Kessler: "That would be really helpful for me to see because then it gives me quantitative data on how people were ranking different things"

Without Q11, Lauren relies on trial-and-error for schedule design. Ranking data enables:
- Allocate more time to highly-ranked formats
- Reduce time for lower-ranked formats
- Balance competing priorities with data backing

**Unique Data Beyond Likert Scales:**
- Likert scales show absolute value (e.g., "workshops are valuable")
- Ranking shows RELATIVE value (e.g., "workshops MORE valuable than presentations")
- Critical for resource allocation decisions with fixed conference duration

**Statistical Analysis Potential:**
- Average rank per session type
- Demographic segmentation (employees vs associates vs clients)
- Correlation with other questions (e.g., do people who ranked networking #1 also rate connection depth highly?)

### Context from Synthesis

**Lauren's Planning Challenge:**
From synthesis Theme 4 (Strategic Demographic Segmentation):
> Lauren operates with "limited budget data on community sentiment" - needs structured quantitative data for evidence-based planning decisions

**Session Format Context:**
The 4 session types cover the full range of conference activities:
1. **Main presentations**: Traditional conference content (keynotes, talks)
2. **Interactive workshops**: Hands-on learning (workshops, breakouts)
3. **Co-working time**: Collaborative work (pairing, group projects)
4. **Networking/social time**: Connection building (meals, breaks, social events)

Katie's 4 measurement areas map loosely to these formats:
- Learning Outcomes → Main presentations, Interactive workshops
- Networking Effectiveness → Networking/social time, Co-working time

### Design Decision Rationale

**Why Ranking (Not Rating Each Separately):**
- Forces prioritization trade-offs (mirrors real schedule design constraints)
- Prevents "everything is excellent" response pattern
- Provides clearer signal for resource allocation
- Smaller cognitive load (one task vs four separate ratings)

**Why 1-4 Ranking (Not Pairwise Comparison):**
- Faster completion (one ranking task vs 6 pairwise comparisons for 4 items)
- Easier mobile interaction
- More intuitive for respondents
- Sufficient granularity for 4 options

**Why Drag-and-Drop + Dropdown (Dual Interface):**
- Drag-and-drop: Better desktop UX, more intuitive spatial metaphor
- Dropdown: Better accessibility, reliable mobile fallback, keyboard-friendly
- Dual approach maximizes completion across devices and abilities

### Testing Checklist Item Reference

From synthesis implementation notes testing checklist:
> "Test choice ranking - Q11 drag-to-reorder or dropdown ranking (1-4) functions properly"

---

## For Issue Tracker Import

**Title**: Choice Ranking Question (1 Total)

**Description**:
As a conference planner (Lauren), I want attendees to rank session types in priority order, so I can understand preference hierarchies when balancing the event schedule and allocate time based on data rather than trial-and-error.

**Q11 Session Format Ranking**: Rank 4 session types (Main presentations, Interactive workshops, Co-working time, Networking/social time) from 1 (most valuable) to 4 (least valuable).

**Acceptance Criteria**: Drag-to-reorder OR dropdown ranking (1-4), mobile-optimized interface, prevents duplicate rank assignments, CSV export shows rank values per session type, accessible via keyboard navigation and screen reader.

**Labels**: 2025-11-12-mvp, quantitative-ranking, must-have, schedule-planning
**Priority**: Must Have (Walking Skeleton)
**Story Points**: 5 (M-sized, 3-5 days)
