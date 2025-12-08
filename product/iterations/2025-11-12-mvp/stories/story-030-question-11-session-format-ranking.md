# User Story: Question 11 - Session Format Preferences Ranking

**Story ID**: 030
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, ranking

## User Story
As a Conference Attendee, I want to rank different session types in order of value to me, so that organizers can balance the event schedule between different session types based on what attendees value most.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q11
**Design**: screenshots/12-q11-session-formats.png

## Question Details

**Text**: "Rank the following session types in order of value to you (1 = most valuable, 4 = least valuable)"

**Type**: Choice ranking - Each item gets rank 1-4 via dropdown

**Items to Rank**:
- Main presentations
- Interactive workshops
- Co-working time
- Networking / social time

**Required**: No

**Transparency Note**: "This helps us balance the event schedule between different session types based on what attendees value most."

**Implementation Note**: "Drag to reorder, or use dropdown to assign rank 1-4 to each option."

## Screen Layout
- Progress: "Question 11 of 19" / "58% complete"
- 4 items each with "Rank" dropdown (1-4)
- Helper text: "1 = most valuable, 4 = least valuable"
- No optional comment box for ranking question

## Acceptance Criteria

**Key Scenarios**:

1. **Attendee Views Question 11**
   - Progress shows 58% (11/19)
   - 4 session types display with dropdown for each
   - Each dropdown has options 1, 2, 3, 4
   - Helper text clarifies ranking meaning

2. **Attendee Assigns Rankings**
   - When selecting rank for one item
   - Then that rank is assigned
   - And system allows duplicate ranks (partial completion acceptable)
   - And attendee can change rankings freely

3. **Complete Ranking**
   - When attendee assigns all 4 items unique ranks (1, 2, 3, 4)
   - Then all items have distinct rankings
   - And data is saved as ranking order

4. **Incomplete Ranking Allowed**
   - When attendee ranks only some items or uses duplicate ranks
   - Then partial ranking is saved
   - And no validation error occurs (question is optional)

5. **Alternative: Drag-and-Drop** (if implemented)
   - Note in Technical Notes that drag-and-drop is alternative to dropdowns
   - If implemented, must work on mobile (touch-friendly)

6. **Navigation**
   - Standard navigation to Q10/Q12 works
   - Rankings preserved when navigating back

## Technical Notes

**Question ID**: `q11_session_format_ranking`

**Data Structure**:
```json
{
  "question_id": "q11_session_format_ranking",
  "question_number": 11,
  "response_type": "ranking",
  "rankings": {
    "main_presentations": 1-4 or null,
    "interactive_workshops": 1-4 or null,
    "coworking_time": 1-4 or null,
    "networking_social_time": 1-4 or null
  },
  "timestamp": "ISO 8601"
}
```

**Implementation Options**:
1. **Dropdown approach** (shown in screenshot): 4 dropdowns, each with options 1-4
2. **Drag-and-drop approach** (noted as alternative): Touch-friendly reordering

**Validation**:
- No required validation
- Allow partial rankings (some items unranked)
- Allow duplicate ranks (imperfect but acceptable given optional nature)
- For analysis, treat incomplete rankings carefully

**Analysis Considerations**:
- Calculate average rank for each session type
- Identify most/least valued formats
- Cross-tabulate with demographics (e.g., do technical vs non-technical attendees prefer different formats?)

## Dependencies
- Questions 10 and 12 for navigation
- Database schema (STORY-040) supports ranking structure
- CSV export (STORY-041) handles ranking data (4 columns or serialized structure)

## Estimate
**Size**: M (3-5 days)
**Confidence**: Medium

**Reasoning**: More complex UI than standard questions. Dropdown implementation is straightforward but requires handling ranking logic. Drag-and-drop would add significant complexity. Testing needed for mobile usability and data structure validation.
