# User Story: Save Draft Functionality

**Story ID**: STORY-018
**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Priority**: Could have
**Status**: Draft
**Labels**: 2025-11-12-mvp, nice-to-have, resilience, conference-attendee, advanced

## User Story

As a conference attendee who needs to pause mid-survey due to interruption,
I want to save my progress and return later to complete the survey from where I left off,
So that I don't lose my work if interrupted and don't need to re-answer questions I've already completed.

## Source

**Discovery Cycle**: 2025-11-12-mvp
**Synthesis Reference**: synthesis-2025-11-17.md - Feature 14 (Save Draft Functionality)
**User Need**: Resilience against interruptions during conference break completion
**Supporting Evidence**:
- Feature 14 implementation notes: "Allow users to save and return if they need to pause"
- In-conference completion context: Conference breaks can be interrupted (announcements, conversations, urgent calls)
- Sarah Aslanifar completion sensitivity: Reduce abandonment from unexpected pauses
- Lauren Kessler timing preference: "5-6pm during conference break" but interruptions possible

## Change History
*(No changes yet - initial story)*

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Save Draft Mid-Survey**
- **Given** I have completed Questions 1-7 of the survey
- **When** I need to pause and click "Save Draft" button
- **Then** my responses to Q1-Q7 are saved
- **And** I receive confirmation message: "Your progress has been saved. You can return to complete the survey later."
- **And** I am provided a way to resume (email link, URL, or browser storage notification)

**Scenario 2: Resume from Saved Draft**
- **Given** I previously saved a draft after completing Q1-Q7
- **When** I return to the survey using my resume link/URL
- **Then** the survey loads at Question 8 (next unanswered question)
- **And** my previous responses to Q1-Q7 are preserved
- **And** I can navigate back to review/edit Q1-Q7 if desired
- **And** I can continue from Q8 to completion

**Scenario 3: Auto-Save Draft on Browser Close**
- **Given** I am on Question 5 with Q1-Q4 answered
- **When** I accidentally close the browser tab or browser crashes
- **Then** my responses to Q1-Q4 are automatically saved (if using localStorage)
- **And** when I return to the survey URL, I see: "You have an incomplete survey. Would you like to continue where you left off?"
- **And** if I choose "Continue," survey loads at Question 5 with Q1-Q4 answers restored

**Scenario 4: Draft Expiration (Optional Enhancement)**
- **Given** I saved a draft 7 days ago
- **When** I attempt to resume the draft
- **Then** the system notifies me: "This draft has expired. Please start a new survey."
- **And** I am prompted to start fresh survey (prevent stale data from weeks-old drafts)

**Scenario 5: Submit Draft Completion**
- **Given** I resumed a draft from Q8 and completed Q8-Q19
- **When** I click Submit
- **Then** all responses (Q1-Q19) are submitted as complete survey
- **And** the draft is marked as submitted/deleted (no longer resumable)
- **And** I receive standard acknowledgment page
- **And** response is included in CSV export with all other submissions

**Scenario 6: Draft vs Submitted Distinction in Database**
- **Given** the system stores both draft and submitted responses
- **When** Lauren exports survey data to CSV
- **Then** only submitted (finalized) responses are exported
- **And** drafts are not included in analysis dataset
- **And** clear database flag distinguishes drafts from submissions (e.g., status='draft' vs status='submitted')

### Non-Functional Requirements

- [ ] **Persistence**: Draft responses survive browser close/reopen (if using localStorage) or session timeout (if server-side)
- [ ] **Privacy**: Drafts stored securely; no unauthorized access to partial responses
- [ ] **Performance**: Draft save completes in < 1 second; no perceptible lag
- [ ] **Resilience**: Draft recovery works across browser sessions (if server-side) or within same browser (if localStorage)
- [ ] **Data Integrity**: Submitted survey includes both draft responses and new responses without data loss or overwrite

### Quality Checklist

- [ ] Draft save mechanism chosen (localStorage vs server-side) and documented
- [ ] Resume mechanism tested (URL with token, email link, or localStorage detection)
- [ ] Draft responses restore correctly when resuming
- [ ] User can edit previously saved draft responses before submission
- [ ] Submitted drafts no longer resumable (prevent duplicate submissions)
- [ ] Drafts excluded from CSV export (only submitted responses)
- [ ] Expiration mechanism prevents indefinite draft accumulation (if server-side)
- [ ] Clear user messaging distinguishes "saved draft" from "submitted survey"

## Technical Notes

**Implementation Approach - Two Options:**

### Option 1: Client-Side (localStorage) - Simpler, Lower Effort
**Pros:**
- No server-side storage needed
- Instant save/restore (no network latency)
- Works offline
- No authentication required

**Cons:**
- Drafts lost if user switches browsers or devices
- No way to email resume link
- Limited to single browser/device

**Implementation:**
```javascript
// Save draft
function saveDraft(responses) {
  localStorage.setItem('survey_draft', JSON.stringify({
    responses: responses,
    lastSaved: new Date().toISOString(),
    currentQuestion: 8
  }));
}

// Resume draft
function loadDraft() {
  const draft = localStorage.getItem('survey_draft');
  if (draft) {
    return JSON.parse(draft);
  }
  return null;
}

// Clear draft after submission
function clearDraft() {
  localStorage.removeItem('survey_draft');
}
```

### Option 2: Server-Side (Database) - More Robust, Higher Effort
**Pros:**
- Works across browsers and devices
- Can email resume link to user
- Can set expiration policies
- More resilient

**Cons:**
- Requires database schema for drafts
- Requires unique resume token generation
- Requires email sending capability (if using email link)
- More complex implementation (L-sized instead of M-sized)

**Implementation:**
```sql
-- Extend survey_responses table with status
ALTER TABLE survey_responses ADD COLUMN status VARCHAR(20) DEFAULT 'draft';
-- Values: 'draft', 'submitted'

ALTER TABLE survey_responses ADD COLUMN resume_token UUID UNIQUE;
ALTER TABLE survey_responses ADD COLUMN draft_expires_at TIMESTAMP;
```

```javascript
// Save draft
POST /api/survey/draft
{
  responses: { q1: 5, q2: 4, ... },
  currentQuestion: 8
}
// Returns: { resumeToken: 'uuid', resumeUrl: '/survey/resume/uuid' }

// Resume draft
GET /survey/resume/:token
// Loads draft and allows continuation

// Submit draft
POST /api/survey/submit/:token
{
  responses: { q1: 5, q2: 4, ..., q19: 'Employee' }
}
// Marks status='submitted', clears resume_token
```

**Recommended for MVP: Option 1 (localStorage)**
- "Could Have" priority justifies simpler approach
- Conference context: Users unlikely to switch devices mid-completion
- Acceptable trade-off: Draft lost if browser cleared, but interruption recovery works for majority case
- Option 2 can be future enhancement if demand emerges

**Auto-Save Strategy:**
- Save draft automatically every N questions (e.g., every 3 questions)
- OR save draft when user clicks "Back" or "Next" (implicit save)
- Explicit "Save Draft" button provides user control and visibility

**Draft Expiration (Server-Side Only):**
- Set expiration: 7 days from last save (prevent indefinite stale drafts)
- Cron job or database trigger to clean expired drafts
- Notify user on resume if draft expired

## Design Notes

**UI Elements Needed:**

**Save Draft Button:**
```
[Save Draft]  [Next →]

Note: Your progress is automatically saved as you go.
You can close this page and return later to complete the survey.
```

**Resume Draft Notification (On Return):**
```
┌───────────────────────────────────────────┐
│ You have an incomplete survey             │
│                                            │
│ Last saved: November 17, 2025 at 3:45 PM  │
│ Question 8 of 19                           │
│                                            │
│  [Continue Survey]  [Start New Survey]    │
└───────────────────────────────────────────┘
```

**Draft Saved Confirmation:**
```
✓ Your progress has been saved

You can close this page and return later.
Your responses will be waiting for you.
```

**Mobile Considerations:**
- Save Draft button should be easily tappable (minimum 44px height)
- Confirmation message visible without scrolling
- Resume notification appears prominently when returning

## Open Questions

- ✅ Client-side (localStorage) vs server-side (database) storage? **ANSWER**: localStorage recommended for Could-Have priority; server-side if upgraded to Should-Have
- ✅ Should drafts expire after N days? **ANSWER**: Yes if server-side (7 days); N/A if localStorage (user controls via browser clear)
- ✅ How to handle user who starts new survey while draft exists? **ANSWER**: Prompt user to continue draft or start fresh; clear old draft if start fresh
- ✅ Should we email resume link? **ANSWER**: No for MVP localStorage approach; yes if server-side implemented later

## Estimate

**Size**: L (1-2 weeks)
**Confidence**: Medium

**Breakdown (localStorage Approach):**
- localStorage save/load implementation: 4-6 hours
- Auto-save logic (on navigation): 2-3 hours
- Resume detection and prompt UI: 3-4 hours
- Draft vs submission logic: 2-3 hours
- Testing draft save/resume flows: 4-6 hours
- Cross-browser localStorage testing: 2-3 hours
- User messaging and confirmations: 2-3 hours
- Documentation: 1-2 hours

**If Server-Side: XL (2-3 weeks)**
- Add above estimates: 8-10 additional hours for database schema, token generation, expiration logic, email integration (if used)

## Dependencies

- STORY-016 (Database Schema) - if using server-side storage, need draft status field
- Survey navigation system - need to track current question for resume
- STORY-002 (Zero Mandatory Fields) - draft can have any combination of answered/unanswered questions

## Notes

### Why This Story is Could-Have (Nice to Have)

**Not Critical for MVP Success:**
- In-conference completion window is short (5-10 minutes)
- Interruptions during break are possible but not highly likely
- Most users complete in single session without needing draft
- Walking skeleton works perfectly without this feature

**Significant Implementation Complexity:**
- Even localStorage approach is L-sized (1-2 weeks)
- Server-side approach is XL-sized (2-3 weeks)
- Testing all draft scenarios (save, resume, submit, expire) is complex
- Edge cases: multiple drafts, draft conflicts, expiration

**High Value for Small Subset of Users:**
- Users who get interrupted benefit significantly
- Reduces abandonment from unexpected pauses
- Demonstrates thoughtful UX design
- But majority of users complete without interruption

**Why Not Won't-Have:**
- Legitimate use case exists (interruptions do happen)
- Relatively high ROI if time permits (L-sized for significant UX improvement)
- Differentiator from basic survey tools
- Aligns with Equal Experts quality standards

**Implementation Decision:**
- If 7-day timeline tight: Skip for MVP, prioritize walking skeleton
- If timeline has buffer: Implement localStorage version (L-sized)
- Post-MVP enhancement: Upgrade to server-side if user feedback indicates demand

### Design Decision Rationale

**Why localStorage Over Server-Side for MVP:**
- Could-Have priority justifies simpler, faster implementation
- Conference context: Users on same device during break (unlikely to switch)
- Acceptable limitation: Draft lost if browser cleared (documented in user messaging)
- Future enhancement path clear if need emerges

**Why Auto-Save Instead of Manual Only:**
- Users forget to save manually
- Interruptions often unexpected (browser crash, urgent call)
- Auto-save provides safety net without requiring user action
- Explicit "Save Draft" button still valuable for intentional pause

**Why 7-Day Expiration (If Server-Side):**
- Conference feedback time-sensitive (responses from weeks later less valuable)
- Prevents database clutter from abandoned drafts
- Encourages timely completion while allowing reasonable pause window

### Future Enhancements (Post-MVP)

**Release 3 or Later:**
- Email resume link (requires server-side + email capability)
- Draft across devices (requires server-side + authentication)
- Draft history (view/restore previous draft versions)
- Share draft with colleague (for collaborative feedback)
- Admin dashboard to view draft abandonment rates

---

## For Issue Tracker Import

**Title**: Save Draft Functionality
**Description**:
As a conference attendee who needs to pause mid-survey due to interruption, I want to save my progress and return later to complete the survey from where I left off, so that I don't lose my work if interrupted and don't need to re-answer questions I've already completed.

**Source**: Discovery cycle 2025-11-12-mvp, Feature 14 from synthesis; provides resilience for in-conference completion interruptions.

**Acceptance Criteria**: Users can save incomplete survey, drafted responses persist, resume from saved draft, submit combines draft + new responses, drafts excluded from CSV export.

**Labels**: 2025-11-12-mvp, nice-to-have, could-have, resilience
**Priority**: Could Have (Nice to Have)
**Story Points**: 8 (L-sized, 1-2 weeks for localStorage; 13 for server-side)
