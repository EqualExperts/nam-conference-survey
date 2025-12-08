# User Story: Optional Questions Bug Fix

**Story ID**: STORY-052
**Iteration**: 2025-12-08-final-fixes
**Priority**: Critical
**Status**: Ready (reverted from production - needs API URL fix)
**Labels**: 2025-12-08-final-fixes, conference-attendee, survey, bug-fix, llm-dev

## User Story
As a Conference Attendee,
I want to submit my survey responses without being required to answer every question,
So that I can provide feedback on topics I'm comfortable discussing without being blocked from submitting.

## Context
Testing revealed that the survey validation incorrectly requires all questions to be answered before submission. This directly contradicts the product design principle that "all questions are optional" and creates friction that threatens the goal of 100% survey completion from conference attendees.

## Source
**Discovery Cycle**: 2025-12-08-final-fixes
**Synthesis Reference**: `product/iterations/2025-12-08-final-fixes/discovery/synthesis/synthesis-2025-12-08.md`
**User Need**: Friction-free survey completion - attendees must be able to submit surveys with unanswered questions
**Supporting Evidence**: Product Owner confirmed via testing that users cannot submit without answering all questions; product specification explicitly states "All questions optional"

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Submit with all questions answered**
- **Given** I am on the survey and have answered all 19 questions
- **When** I click the submit button
- **Then** my responses are saved successfully
- **And** I see the thank you / completion screen

**Scenario 2: Submit with some questions skipped**
- **Given** I am on the survey and have answered only 5 of 19 questions
- **When** I click the submit button
- **Then** my responses are saved successfully with null/empty values for unanswered questions
- **And** I see the thank you / completion screen

**Scenario 3: Submit with no questions answered**
- **Given** I am on the survey and have not answered any questions
- **When** I click the submit button
- **Then** my response is saved (even if all values are null/empty)
- **And** I see the thank you / completion screen

**Scenario 4: No validation errors for empty fields**
- **Given** I have left multiple questions unanswered
- **When** I attempt to submit
- **Then** I do not see any validation error messages about required fields
- **And** the form does not prevent submission

### Non-Functional Requirements
- [ ] Performance: Submission completes quickly regardless of how many questions are answered
- [ ] Accessibility: No change to accessibility - validation removal should not affect screen reader experience
- [ ] Mobile: Submission works identically on mobile devices
- [ ] Usability: Clear that questions are optional (no required field indicators)

### Quality Checklist
- [ ] All 19 questions can be individually skipped
- [ ] Partial submissions are stored correctly in database
- [ ] No validation errors appear for empty/unanswered questions
- [ ] Existing full submissions still work correctly
- [ ] Backend accepts requests with missing/null question values

## Open Questions
None - requirement is clear: remove all required validation from survey questions.

## Implementation Notes

**API URL Fix Required**: When deploying to production, the `VITE_API_URL` build argument must include `/api` at the end. The frontend constructs URLs as `${VITE_API_URL}/survey/submit`, but the backend expects `/api/survey/submit`.

- Incorrect: `VITE_API_URL=https://nam-survey-backend-xxx.run.app`
- Correct: `VITE_API_URL=https://nam-survey-backend-xxx.run.app/api`

Update `deploy/gcp/cloudbuild.yaml` substitution `_BACKEND_URL` to include `/api` suffix before redeploying this story.

## Dependencies
None - this is a fix to existing functionality.

## Estimate
**Size**: S
**Confidence**: High

**Reasoning**: Likely involves removing validation decorators from backend DTOs and/or frontend form validation. Small, focused change with clear scope.

## Metadata
**Iteration**: 2025-12-08-final-fixes
**Created**: 2025-12-08
**Last Updated**: 2025-12-08
**Build Date**:
