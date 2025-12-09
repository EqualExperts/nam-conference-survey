# Optional Questions Bug Fix

The survey validation currently blocks submission unless all 19 questions are answered, contradicting the core product design principle that "all questions are optional." This creates friction that threatens the goal of 100% survey completion from conference attendees. Users must be able to submit surveys with any number of unanswered questions, from answering all 19 down to answering zero questions.

## Requirements

- User can submit survey with all 19 questions answered
- User can submit survey with only some questions answered (e.g., 5 of 19)
- User can submit survey with zero questions answered (all fields empty/null)
- No validation error messages appear for unanswered/empty questions
- Form does not prevent submission due to missing answers
- Submission completes quickly regardless of how many questions are answered
- Clear visual indication that questions are optional (no required field indicators like asterisks)
- Backend accepts requests with missing/null question values
- Existing full submissions continue to work correctly
- Partial submissions are stored correctly in database with null/empty values

## Rules

- rules/react-rules.md
- rules/typescript-rules.md
- rules/clean-code.md

## Component Architecture

The survey form is located in `apps/frontend/src/pages/SurveyPage.tsx` and uses `@mantine/form` for form handling. The validation logic needs to be removed or modified to allow all fields to be optional.

```typescript
// Current problematic pattern (needs fixing):
interface SurveyFormValues {
  question1: string;  // Currently required
  question2: string;  // Currently required
  // ... all 19 questions
}

// Expected pattern after fix:
interface SurveyFormValues {
  question1?: string | null;  // Optional
  question2?: string | null;  // Optional
  // ... all 19 questions should be optional
}

// Form validation should allow empty/null values:
const form = useForm({
  initialValues: { /* ... */ },
  validate: {
    // Remove all required validations
    // No validation rules that block submission
  }
});
```

## Extra Considerations

- **Backend Coordination**: Ensure backend DTOs accept optional/null values for all question fields. Check `apps/backend/src/modules/survey/dto/` for validation decorators that may need removal.
- **Database Schema**: Verify that Prisma schema allows null values for all question fields in the `SurveyResponse` model.
- **Visual Indicators**: Remove any asterisks (*) or "required" labels from question components.
- **Existing Submissions**: Ensure existing full submissions in the database are not affected by this change.
- **Form State**: Empty fields should submit as null or empty strings (consistent with backend expectations).
- **Mobile Experience**: Submission behavior must be identical on mobile devices.
- **API URL Configuration**: The `VITE_API_URL` environment variable must include `/api` at the end for proper backend routing (e.g., `https://backend.example.com/api`).
- **Dead Code**: remove **all** dead validation code

## Testing Considerations

Test all three core scenarios from the acceptance criteria:

1. **Full Submission Test**: Answer all 19 questions and verify successful submission
2. **Partial Submission Test**: Answer only 5 random questions, leave 14 unanswered, verify successful submission with null values stored
3. **Empty Submission Test**: Leave all questions blank, click submit, verify successful submission

Additional testing:
- Verify no validation error messages appear for empty fields
- Confirm database stores null/empty values correctly for unanswered questions
- Test on mobile devices (iOS Safari, Android Chrome)
- Verify thank you page displays after submission in all scenarios
- Check that rate limiting (10 submissions/hour per IP) still works correctly

## Implementation Notes

**Frontend Changes** (`apps/frontend/`):
- Remove validation rules from `@mantine/form` configuration in `SurveyPage.tsx`
- Update TypeScript interfaces to make all question fields optional (`?` or `| null`)
- Remove required field indicators (*) from question components
- Ensure form submits even with empty values

**Backend Changes** (`apps/backend/`):
- Check `apps/backend/src/modules/survey/dto/create-survey-response.dto.ts`
- Remove `@IsNotEmpty()`, `@IsRequired()`, or similar class-validator decorators
- Make all question properties optional in DTOs
- Verify Prisma schema allows nullable fields: `apps/backend/prisma/schema.prisma`

**Key Files to Review**:
- `apps/frontend/src/pages/SurveyPage.tsx` - Main form component
- `apps/frontend/src/components/questions/*` - Individual question components
- `apps/backend/src/modules/survey/dto/create-survey-response.dto.ts` - Backend validation
- `apps/backend/prisma/schema.prisma` - Database schema

**Deployment Note**: When deploying to production, update `deploy/gcp/cloudbuild.yaml` to ensure `_BACKEND_URL` substitution includes `/api` suffix.

## Specification by Example

### Example 1: Fully Engaged User
**Scenario**: Sarah attends the conference and has opinions on everything
- Sarah opens survey on her phone
- Answers all 19 questions with thoughtful responses
- Clicks "Submit"
- **Expected**: Submission succeeds, thank you page displays

### Example 2: Selective Feedback User
**Scenario**: Mike only wants to comment on specific aspects
- Mike opens survey
- Answers questions 1, 3, 7, 12, and 15 (5 total)
- Leaves questions 2, 4-6, 8-11, 13-14, 16-19 completely blank
- Clicks "Submit"
- **Expected**: No validation errors, submission succeeds, thank you page displays
- **Database**: Answered questions saved, unanswered stored as null

### Example 3: Accidental Submission
**Scenario**: Katie opens survey but accidentally hits submit immediately
- Katie opens survey
- Does not answer any questions (all blank)
- Clicks "Submit" (maybe accidentally)
- **Expected**: Submission succeeds (no validation blocking), thank you page displays
- **Database**: Record created with all question fields as null

### Example 4: Mobile Partial Submission
**Scenario**: Conference attendee on iPhone during coffee break
- Opens survey on iPhone Safari
- Answers first 3 questions
- Gets called away to session
- Returns and quickly submits without completing remaining questions
- **Expected**: Submission succeeds on mobile, partial responses saved

## Verification

- [ ] All 19 questions can be individually skipped without validation errors
- [ ] User can submit survey with all questions answered (full submission)
- [ ] User can submit survey with only 5 questions answered (partial submission)
- [ ] User can submit survey with zero questions answered (empty submission)
- [ ] No validation error messages appear for empty/unanswered fields
- [ ] Form submit button is never disabled due to missing answers
- [ ] Backend accepts requests with missing/null question values without 400 errors
- [ ] Database correctly stores null values for unanswered questions
- [ ] Existing full submissions continue to work correctly
- [ ] Thank you page displays after submission in all scenarios (full/partial/empty)
- [ ] No required field indicators (*) visible on any questions
- [ ] Submission works identically on mobile devices (iOS Safari, Android Chrome)
- [ ] Rate limiting (10 submissions/hour per IP) still functions correctly
- [ ] `VITE_API_URL` includes `/api` suffix in deployment configuration
- [ ] Frontend constructs correct API URLs (e.g., `${VITE_API_URL}/survey/submit`)
