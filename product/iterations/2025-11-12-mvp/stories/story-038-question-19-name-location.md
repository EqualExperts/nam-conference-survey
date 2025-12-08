# User Story: Question 19 - Name and Home Location

**Story ID**: 038
**Epic**: EPIC-001 - NAM Conference Survey MVP
**Priority**: Critical
**Status**: Built
**Build Date**: 2025-11-20
**Labels**: 2025-11-12-mvp, conference-attendee, survey-question, demographic, text-input

## User Story
As a Conference Attendee, I want to optionally provide my name and home city/state, so that organizers can follow up on specific feedback if needed while respecting my choice to remain anonymous.

## Source
**Discovery**: 2025-11-12-mvp
**Question Source**: proposed-survey-questions.md - Q19
**Design**: screenshots/20-q19-years.png

## Question Details

**Text**: "If comfortable please provide your name and home city and state. (This helps us follow up on specific feedback if needed)"

**Type**: Text input fields - Two separate text boxes

**Input Fields**:
- Name: Text input with placeholder "Leave blank to remain anonymous"
- City and State: Text input with placeholder "e.g., San Francisco, CA"

**Required**: No - Both fields completely optional

**Transparency Note**: "Providing your name and home location is completely optional. Anonymous responses are equally valuable."

**Optional Comment**: No - this question IS the text inputs

## Screen Layout
- Progress: "Question 19 of 19" / "100% complete"
- Two text input fields (Name and City/State)
- Placeholders emphasize optional nature
- Transparency note emphasizes anonymity is okay
- Back button and "Submit" button (not "Next")
- Final question before completion screen

## Acceptance Criteria

**Key Scenarios**:

1. **Attendee Views Question 19 (Final Question)**
   - Progress shows "Question 19 of 19" and "100% complete"
   - Two text input fields display
   - Placeholders clearly indicate optional nature
   - Button says "Submit" instead of "Next"

2. **Attendee Provides Name and Location**
   - When entering text in either or both fields
   - Then text is captured and saved
   - And no validation or formatting enforcement occurs

3. **Attendee Remains Anonymous**
   - When clicking Submit without filling either field
   - Then null values saved for both fields
   - And no error or warning displayed
   - And survey proceeds to completion screen

4. **Partial Information**
   - When attendee fills only one field (e.g., just city, not name)
   - Then partial information is saved
   - And survey proceeds normally

5. **Submit Button Behavior**
   - When clicking "Submit"
   - Then all 19 questions' responses are finalized
   - And system navigates to completion screen (STORY-039)
   - And survey session is marked complete in database

6. **Mobile Text Entry**
   - On mobile device
   - Both fields are easily tappable
   - Mobile keyboard appears appropriately
   - Text remains visible while keyboard is open

## Technical Notes

**Question ID**: `q19_name_location`

**Data Structure**:
```json
{
  "question_id": "q19_name_location",
  "question_number": 19,
  "response_type": "demographic_text",
  "name": "string" or null,
  "city_state": "string" or null,
  "timestamp": "ISO 8601"
}
```

**Validation**:
- No validation required (both fields optional)
- Accept null/empty values
- No format enforcement for city/state
- Suggested character limits: Name 100 chars, Location 100 chars

**Privacy Considerations**:
- Store name and location separately from survey session ID if possible
- Consider encryption at rest for PII (name, location)
- Ensure CSV export respects anonymity (separate identifiable data from responses if requested)
- Make clear in completion screen that anonymous responses were accepted

**Analysis Use**:
- Enable follow-up on specific feedback if attendee provided contact info
- Geographic analysis if city/state provided
- Maintain complete anonymity if fields left blank

## Dependencies
- Question 18 for "Back" navigation
- Completion screen (STORY-039) for "Submit" navigation
- Database schema (STORY-040) supports optional text fields
- CSV export (STORY-041) handles optional PII appropriately
- Consider data privacy regulations (GDPR, CCPA) for PII storage

## Estimate
**Size**: S (1-2 days)
**Confidence**: High

**Reasoning**: Two simple text input fields with special handling for final question (Submit button, 100% progress, privacy considerations).
