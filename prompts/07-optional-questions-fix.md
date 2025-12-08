# Optional Questions Bug Fix (STORY-052)

Fix the survey validation that incorrectly requires all questions to be answered before submission. The product design explicitly states "all questions are optional" - users must be able to submit surveys with any combination of answered/unanswered questions, including submitting with zero answers.

## Requirements

- All 19 survey questions must be individually skippable
- Survey submission succeeds with all questions answered
- Survey submission succeeds with some questions answered (partial submission)
- Survey submission succeeds with zero questions answered (empty submission)
- No validation errors appear for empty/unanswered questions
- Backend accepts requests with missing/null question values
- Existing full submissions continue to work correctly

## Rules

- rules/nestjs-rules.md
- rules/typescript-rules.md
- rules/react-rules.md

## Domain

```typescript
// Current (broken): DTOs likely have required validation
class CreateSurveyResponseDto {
  @IsNotEmpty() // REMOVE - makes field required
  @IsNumber()
  question1: number;
  // ... similar for all 19 questions
}

// Target: All fields optional, nullable
class CreateSurveyResponseDto {
  @IsOptional()
  @IsNumber()
  question1?: number | null;
  // ... similar for all 19 questions
}
```

## Extra Considerations

- Check BOTH backend DTOs AND frontend form validation
- Backend: Look for `@IsNotEmpty()`, `@IsString()` without `@IsOptional()`, or similar required decorators in survey DTOs
- Frontend: Check Mantine form validation rules in SurveyPage for required field definitions
- Database schema already supports nullable fields (verify but likely no migration needed)
- Rate limiting should still apply regardless of submission completeness
- Do not change any question text, order, or structure - only validation

## Testing Considerations

- Unit tests: Verify DTO accepts null/undefined for each question field
- Integration tests: Submit survey with various combinations:
  - All 19 questions answered
  - Only 5 questions answered
  - Zero questions answered
  - Single question answered
- E2E tests: Complete user flow from empty form to thank you page
- Verify no console errors or validation messages appear

## Implementation Notes

- Start with backend DTO changes - this is likely the primary blocker
- Use `@IsOptional()` decorator from class-validator for nullable fields
- Ensure field types allow `null` or `undefined` (e.g., `number | null`)
- Frontend form should have no `required: true` or validation rules that block submission
- Keep changes minimal - only modify validation, not field types or structure

## Specification by Example

**Scenario 1: Full submission**
```json
POST /api/survey
{
  "question1": 5,
  "question2": 4,
  // ... all 19 questions with values
}
// Response: 201 Created
```

**Scenario 2: Partial submission (5 of 19)**
```json
POST /api/survey
{
  "question1": 5,
  "question5": 3,
  "question10": 4,
  "question15": 2,
  "question19": "Great conference!"
}
// Response: 201 Created (not 400 Bad Request)
```

**Scenario 3: Empty submission**
```json
POST /api/survey
{}
// Response: 201 Created (not 400 Bad Request)
```

**Scenario 4: No validation errors in UI**
- User opens survey, scrolls to bottom, clicks Submit
- No red error messages appear
- User sees thank you page

## Verification

- [ ] Backend: Locate and update survey DTO with `@IsOptional()` on all question fields
- [ ] Backend: Verify DTO field types allow null/undefined
- [ ] Backend: Run unit tests - all pass
- [ ] Frontend: Check SurveyPage form validation - remove any required rules
- [ ] Frontend: Verify no field-level required indicators in UI
- [ ] Manual test: Submit with all questions answered - succeeds
- [ ] Manual test: Submit with 5 questions answered - succeeds
- [ ] Manual test: Submit with 0 questions answered - succeeds
- [ ] Manual test: No validation errors appear at any point
- [ ] Database: Verify partial submissions are stored correctly with null values
