Consider the following rules during execution of the tasks:
- rules/clean-code.md
- rules/typescript-rules.md
- rules/nestjs-rules.md
- rules/react-rules.md
- rules/design-rules.md

---

### Task 1: Refactor Backend DTO with Custom Decorators

- [X] Eliminate 60% code duplication in survey DTO by creating reusable validation decorators

**Prompt**: The `CreateSurveyResponseDto` class in `apps/backend/src/modules/survey/dto/create-survey-response.dto.ts` contains significant code duplication with repeated decorator patterns. Currently it's 225 lines with ~60% duplication across 19 survey question fields. Each field uses the same decorator combinations (`@IsOptional() @IsString()`, `@IsOptional() @IsInt() @Min(1) @Max(5)`, etc.) repeated multiple times.

Create custom validation decorators to eliminate this duplication:

1. Create a new file `apps/backend/src/common/decorators/validation.decorators.ts` with these custom decorators:
   - `OptionalString()` - combines @IsOptional() and @IsString()
   - `OptionalInt(min: number, max: number)` - combines @IsOptional(), @IsInt(), @Min(), and @Max()
   - `OptionalEnum(values: readonly string[], fieldName: string)` - combines @IsOptional(), @IsString(), and @IsIn() with auto-generated message
   - `OptionalStringArray()` - combines @IsOptional(), @IsArray(), and @IsString({ each: true })

2. Create a new file `apps/backend/src/modules/survey/constants/validation.constants.ts` to extract all validation constraint arrays:
   - `LIKERT_WITH_NA_VALUES` (already exists, keep it)
   - `CONFERENCE_LENGTH_VALUES = ['too_short', 'just_right', 'too_long', 'unsure'] as const`
   - `IMPROVEMENTS_VALUES = ['yes_clear', 'some', 'no_changes', 'not_sure', 'did_not_attend', 'first_conference'] as const`
   - `EMPLOYMENT_STATUS_VALUES = ['employee', 'active_associate', 'alumni_associate', 'client', 'prefer_not'] as const`

3. Refactor the DTO to use these new decorators throughout, reducing from 225 lines to approximately 100 lines.

Follow Clean Code RULE-003 (eliminate code duplication) and NestJS RULE-002 (use DTOs with class-validator decorators). Implement this in THE SIMPLEST WAY POSSIBLE without over-engineering.

**Files affected**:
- `apps/backend/src/common/decorators/validation.decorators.ts` (NEW)
- `apps/backend/src/modules/survey/constants/validation.constants.ts` (NEW)
- `apps/backend/src/modules/survey/dto/create-survey-response.dto.ts` (REFACTOR)

---

### Task 2: Extract Question Configuration from SurveyPage

- [X] Reduce SurveyPage component from 537 lines to <200 by extracting question configuration to a data-driven structure

**Prompt**: The `SurveyPage.tsx` component is 537 lines and violates React RULE-008 (single responsibility) and Clean Code RULE-002 (functions must be small). It mixes concerns: layout, state management, submission logic, and 19 inline question definitions with custom options arrays.

Extract question configuration into a data-driven structure:

1. Create `apps/frontend/src/config/question-types.ts` defining TypeScript types for all question configurations:
   - Define `QuestionType` union type with all question types: 'likert' | 'likert-with-na' | 'multiple-select' | 'single-choice' | 'ranking' | 'open-ended' | 'text-field'
   - Create interfaces for each question type (LikertQuestionConfig, LikertWithNAQuestionConfig, etc.)
   - Each interface should include: id, type, field (keyof SurveyFormState), question, transparency, and type-specific props like options, commentField, etc.
   - Define `QuestionConfig` as a discriminated union of all question config types

2. Create `apps/frontend/src/config/survey-questions.ts` with a const array of all 19 questions:
   - Export `SURVEY_QUESTIONS: QuestionConfig[]` array containing all question configurations
   - Export `TOTAL_QUESTIONS = SURVEY_QUESTIONS.length` (derived, not hardcoded)
   - Move all inline options arrays from SurveyPage into this file

3. Create `apps/frontend/src/components/QuestionRenderer.tsx`:
   - React.memo wrapped component that takes `config: QuestionConfig`, `formData`, and `updateField`
   - Use a switch statement on `config.type` to render the appropriate question component
   - Create helper functions to map config props to component props for each question type

4. Refactor `SurveyPage.tsx` to use data-driven rendering:
   - Replace 334 lines of inline JSX with: `SURVEY_QUESTIONS.map(config => <QuestionRenderer key={config.id} ... />)`
   - Keep state management, submission logic, and layout structure
   - Target: reduce from 537 lines to <200 lines

Follow React RULE-008 (components must have single responsibility), Clean Code RULE-003 (DRY), and Clean Code RULE-203 (order by level of abstraction).

**Files affected**:
- `apps/frontend/src/config/question-types.ts` (NEW)
- `apps/frontend/src/config/survey-questions.ts` (NEW)
- `apps/frontend/src/components/QuestionRenderer.tsx` (NEW)
- `apps/frontend/src/pages/SurveyPage.tsx` (REFACTOR - 537 → <200 lines)

---

### Task 4: Add Type Safety Improvements

- [X] Add readonly modifiers to interface properties and explicit return types to prevent mutations

**Prompt**: Several type safety gaps violate TypeScript RULE-102 (use readonly to prevent mutations) and RULE-003 (explicit function return types). The `SurveyFormState` interface has mutable array and object properties, component props lack readonly modifiers, and the `updateField` function lacks an explicit return type.

Add type safety improvements:

1. In `apps/frontend/src/types/survey.ts`:
   - Add `readonly` to all interface properties in `SurveyFormState`
   - Change `q4ConnectionTypes: string[]` to `readonly q4ConnectionTypes: readonly string[]`
   - Change `q11SessionRankings: Record<string, number>` to `readonly q11SessionRankings: Readonly<Record<string, number>>`
   - Change `q17FeedbackConfidence: string[]` to `readonly q17FeedbackConfidence: readonly string[]`

2. In all question component files, add readonly to prop interfaces:
   - Change `options?: LikertOption[]` to `readonly options?: readonly LikertOption[]`
   - Apply similar patterns to all array/object props

3. In `SurveyPage.tsx`, add explicit return type to updateField:
   - Change: `const updateField = <K extends keyof SurveyFormState>(field: K, value: SurveyFormState[K]) => { ... }`
   - To: `const updateField = <K extends keyof SurveyFormState>(field: K, value: SurveyFormState[K]): void => { ... }`

Follow TypeScript RULE-102 (use readonly properties) and RULE-003 (explicit function parameter and return types).

**Files affected**:
- `apps/frontend/src/types/survey.ts`
- `apps/frontend/src/components/questions/LikertQuestion.tsx`
- `apps/frontend/src/components/questions/LikertWithNAQuestion.tsx`
- `apps/frontend/src/components/questions/MultipleSelectQuestion.tsx`
- `apps/frontend/src/pages/SurveyPage.tsx`

---

### Task 5: Refactor Backend Service Field Mapping

- [ ] Eliminate 46 lines of manual field mapping in survey service by creating a DTO mapper utility

**Prompt**: The `survey.service.ts` file contains 46 lines of manual field mapping with repeated `?? null` patterns when creating survey responses (lines 79-124). This violates Clean Code RULE-003 (eliminate duplication) and NestJS RULE-101 (keep services focused). Every new question field requires manual mapping.

Create a reusable DTO mapper:

1. Create `apps/backend/src/modules/survey/utils/dto-mapper.util.ts`:
   - Export function `mapDtoToPrismaInput(dto: CreateSurveyResponseDto, userId: string, status: Status): Prisma.SurveyResponseCreateInput`
   - Use `Object.entries(dto).reduce()` to automatically map all DTO fields
   - Handle arrays (preserve empty arrays), undefined (convert to null), and other values (pass through)
   - Include userId and status in the returned object

2. Refactor `apps/backend/src/modules/survey/survey.service.ts`:
   - Import the mapper utility
   - Replace the 46-line manual mapping with: `const response = await tx.surveyResponse.create({ data: mapDtoToPrismaInput(dto, user.id, Status.SUBMITTED) });`
   - Reduce method from 46 lines of mapping to 3 lines

Follow Clean Code RULE-003 (DRY) and NestJS RULE-101 (keep services focused on single responsibility).

**Files affected**:
- `apps/backend/src/modules/survey/utils/dto-mapper.util.ts` (NEW)
- `apps/backend/src/modules/survey/survey.service.ts` (REFACTOR)

---

### Task 6: Extract Validation Constants to Shared Package

- [ ] Move validation constants to shared package to ensure frontend/backend stay in sync

**Prompt**: Validation constraint arrays are duplicated between backend DTOs and frontend question configurations, creating risk of frontend/backend mismatch. This violates Clean Code RULE-003 (DRY) and TypeScript RULE-101 (prefer type over enum for unions).

Extract constants to shared package:

1. Create `packages/shared/src/validation-constants.ts`:
   - Export `LIKERT_WITH_NA_VALUES = ['1', '2', '3', '4', '5', 'NA'] as const`
   - Export `CONFERENCE_LENGTH_VALUES = ['too_short', 'just_right', 'too_long', 'unsure'] as const`
   - Export `IMPROVEMENTS_VALUES = ['yes_clear', 'some', 'no_changes', 'not_sure', 'did_not_attend', 'first_conference'] as const`
   - Export `EMPLOYMENT_STATUS_VALUES = ['employee', 'active_associate', 'alumni_associate', 'client', 'prefer_not'] as const`
   - Export TypeScript types derived from constants: `export type ConferenceLengthValue = typeof CONFERENCE_LENGTH_VALUES[number];`

2. Update `packages/shared/src/index.ts` to export these constants

3. Update backend to import from shared package:
   - In `apps/backend/src/modules/survey/constants/validation.constants.ts`: Remove the constants and re-export from shared package
   - Or remove this file entirely and import directly from shared package

4. Update frontend to import from shared package:
   - In `apps/frontend/src/config/survey-questions.ts`: Import constants from shared package instead of inline arrays

Follow Clean Code RULE-003 (single source of truth) and TypeScript RULE-101 (prefer types for unions).

**Files affected**:
- `packages/shared/src/validation-constants.ts` (NEW)
- `packages/shared/src/index.ts` (UPDATE)
- `apps/backend/src/modules/survey/constants/validation.constants.ts` (REFACTOR or REMOVE)
- `apps/frontend/src/config/survey-questions.ts` (UPDATE imports if Task 2 complete, otherwise update SurveyPage.tsx)

---

### Task 7: Normalize Comment Field Patterns

- [ ] Remove inconsistent custom comment label from Q10 for consistency across all questions

**Prompt**: Only Q10 (accommodations/venue question) uses a custom `commentLabel` prop ("Please comment if you answered Neutral or below"), while all other questions use the default label. This violates Clean Code RULE-005 (use consistent formatting) and creates inconsistent UX.

Normalize the pattern:

1. In `apps/frontend/src/pages/SurveyPage.tsx` (or `apps/frontend/src/config/survey-questions.ts` if Task 2 is complete):
   - Find Q10 (Accommodations/Venue question) configuration
   - Remove the `commentLabel="Please comment if you answered Neutral or below"` prop
   - Move this guidance into the `transparency` text instead
   - Change transparency to: "This helps us evaluate hotel quality and venue suitability for future conferences. Please comment if you answered Neutral or below."

This ensures all questions use consistent comment field labels and moves conditional guidance to the transparency text where it belongs.

Follow Clean Code RULE-005 (consistent formatting) and Design Rules RULE-101 (reuse existing patterns).

**Files affected**:
- `apps/frontend/src/pages/SurveyPage.tsx` (if Task 2 not complete)
- `apps/frontend/src/config/survey-questions.ts` (if Task 2 is complete)

---

### Task 8: Add Question Metadata Support

- [ ] Extend question configuration with optional metadata for future features (ordering, categories, conditional questions)

**Prompt**: The question configuration (created in Task 2) lacks metadata that would enable advanced features like question reordering, categorization, and conditional logic. This violates Clean Code RULE-203 (order by level of abstraction) and limits future extensibility.

Add metadata support to question configuration:

1. In `apps/frontend/src/config/question-types.ts`:
   - Add optional `order: number` property to `BaseQuestionConfig` or the common properties of all question config types
   - Add optional `category?: 'experience' | 'logistics' | 'learning' | 'feedback' | 'demographics'` property
   - Add optional `dependsOn?: { questionId: string; condition: (value: any) => boolean }` property for future conditional question support

2. In `apps/frontend/src/config/survey-questions.ts`:
   - Add `order` to each question (1-19)
   - Add appropriate `category` to each question
   - Update TOTAL_QUESTIONS calculation to potentially filter by categories in the future

3. (Optional) Update `QuestionRenderer.tsx` or `SurveyPage.tsx` to sort questions by order before rendering (if not already in order in the array)

This prepares the codebase for future features like:
- Question reordering via drag-and-drop admin UI
- Category-based filtering/grouping
- Conditional questions (show Q13 only if Q12 = 'attended')
- A/B testing different question orders

Follow Clean Code RULE-203 (order by abstraction levels) and prepare for future extensibility without over-engineering the current implementation.

**Files affected**:
- `apps/frontend/src/config/question-types.ts` (if Task 2 complete)
- `apps/frontend/src/config/survey-questions.ts` (if Task 2 complete)
- `apps/frontend/src/components/QuestionRenderer.tsx` (optional sorting logic)

---

## Execution plan workflow

The following workflow applies when executing this TODO list:
- Execute only the **SPECIFIED TASK**
- Implement the task in **THE SIMPLEST WAY POSSIBLE**
- Run the tests and format the code:
    - docker-compose exec backend pnpm test (if backend changes)
    - docker-compose exec backend pnpm lint (if backend changes)
    - docker-compose exec frontend pnpm test (if frontend changes)
    - docker-compose exec frontend pnpm type-check (if frontend changes)
- **Ask me to review the task once you have completed and then WAIT FOR ME**
- Mark the TODO item as complete with [X]
- Commit the change to Git when I've approved and/or amended the code
- **STOP and await further instructions**
