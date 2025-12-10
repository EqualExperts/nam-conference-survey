---
description: Generate/improve prompts for AI tools using project templates
---

You are helping the user create a well-structured, effective AI prompt from a user story through an intelligent discovery process.

## Usage

This command can be invoked in two ways:

1. **With a story number**: `/metaprompt 045` - Reads story-045 from iterations and makes inferences
2. **Without parameters**: `/metaprompt` - Uses interactive discovery process (legacy mode)

## Your Task

Help the user create a high-quality, production-ready prompt by:

1. **Analyzing story content** - Extract requirements, context, and technical clues from the user story
2. **Making smart inferences** - Determine likely template type, domain entities, and implementation approach
3. **Confirming direction** - Ask targeted questions to confirm inferences and fill gaps
4. **Generating structured prompt** - Transform story into a complete, well-formatted engineering prompt
5. **Applying prompt engineering best practices**:
   - **Task clarity & context**: Ensure the objective is unambiguous with necessary background
   - **Structured output format**: Define clear sections and expected response structure
   - **Examples and constraints**: Include concrete examples and explicit limitations
   - **Testable requirements**: Frame requirements as measurable acceptance criteria

## Step 1: Load and Analyze the Story

### If story number provided:

1. **Parse the story number**:
   - Accept formats: `045`, `45`, `STORY-045`, or full path
   - Normalize to 3-digit format (e.g., `045`)

2. **Find the story file**:
   - Use Glob to search for `product/iterations/**/stories/story-{number}-*.md`
   - If multiple matches found (shouldn't happen), use the most recent iteration
   - If not found, ask user to clarify which iteration or provide the full path

3. **Read and parse the story**:
   - Extract: Story ID, title, user story, context, acceptance criteria, labels, dependencies
   - Pay attention to: User Experience Design section, technical requirements, open questions

4. **Make inferences** based on story content:

   **Template type inference**:
   - **Frontend indicators**: mentions "page", "component", "UI", "user sees", "clicks", "visual", "responsive", "accessibility", labels contain "frontend" or component names
   - **Backend indicators**: mentions "API", "endpoint", "database", "service", "authentication", "validation", labels contain "backend" or "admin"
   - **Both**: stories that mention both UI and API, or require full-stack implementation
   - **TODO template**: only when user explicitly mentions refactoring existing one-shot code

   **Domain entities**:
   - Extract key nouns from user story and acceptance criteria (e.g., "Response", "Metric", "Dashboard")
   - Identify relationships between entities
   - Note any data structures mentioned in UX design section

   **Technical approach**:
   - Look for specific frameworks/libraries mentioned
   - Identify patterns from dependencies section
   - Note any technical constraints from non-functional requirements

   **Rules files needed**:
   - Frontend stories → `rules/react-rules.md`, `rules/typescript-rules.md`
   - Backend stories → `rules/nestjs-rules.md`, `rules/typescript-rules.md`
   - Database changes → `rules/domain-driven-design.md`
   - Always include: `rules/code-quality-rules.md`

### If no story number provided (legacy mode):

Use the AskUserQuestion tool to gather information through interactive discovery:
1. **Primary objective and scope**: What feature? What problem? Frontend/backend/both?
2. **Template selection**: Which template (Backend/Frontend/TODO)?
3. **Key requirements**: Must-have features and acceptance criteria
4. **Domain and technical details**: Entities, constraints, patterns to follow
5. **Testing and quality**: Test level and specific scenarios
6. **Additional context**: Edge cases, examples, references

**Important**: Don't ask all questions at once. Start with objective and template selection, then follow up based on answers.

## Step 2: Confirm Direction with User

After analyzing the story and making inferences, use the AskUserQuestion tool to **confirm your understanding** with targeted questions:

1. **Template type confirmation**:
   - **For full-stack stories** (both frontend and backend): ALWAYS create separate prompts
     - Ask only: "This story has both backend and frontend work. Should I:"
       - Option 1: "Create backend prompt first (you can request frontend after)"
       - Option 2: "Create both backend and frontend prompts now"
     - Do NOT offer a combined prompt option - fullstack stories MUST be split

   - **For single-concern stories**: "Based on the story, this looks like a [frontend/backend] task. Should I use the [template-name] template?"
   - Or if uncertain: "Should this use the frontend template, backend template, or both?"

2. **Scope clarification** (only if story is ambiguous):
   - Ask about specific implementation details not clear from the story
   - Clarify any open questions from the story file
   - Confirm technical approach if multiple valid options exist

3. **Additional context** (if needed):
   - "The story mentions [X]. Should this follow the pattern from [similar feature]?"
   - "Should we include [additional consideration] not explicitly in the story?"

**Keep confirmation questions minimal** - only ask what's truly ambiguous. Trust your inferences when the story is clear.

**RULE: Fullstack stories MUST be split** - Stories with both API and UI work must ALWAYS be divided into separate backend and frontend prompts because:
- Each prompt stays focused on a single concern (API design vs UI/UX)
- Backend can be implemented and tested independently
- Frontend can reference the completed backend API
- Easier to review and verify each part separately
- Better alignment with typical development workflow

## Step 3: Generate the Structured Prompt(s)

Once the template and approach are confirmed:

### For Fullstack Stories (Backend + Frontend - REQUIRED):

1. **Create Backend Prompt First**:
   - Read the backend template (`prompts/00-backend-prompt-template.md`)
   - Focus on API endpoint design, data structures, and backend logic
   - Include domain model and DTO definitions
   - Add API request/response examples
   - Reference the story for context

2. **Create Frontend Prompt Second** (if user requested both, or after user confirms):
   - Read the frontend template (`prompts/00-frontend-prompt-template.md`)
   - Focus on UI components, user interactions, and visual design
   - Include component hierarchy and props interfaces
   - Reference the backend API endpoint from the first prompt
   - Add visual mockups and user interaction flows
   - Reference the story for context

3. **Ensure Consistency Between Prompts**:
   - DTO interfaces MUST match exactly between backend and frontend prompts
   - API endpoint paths MUST be consistent
   - Data structures MUST align
   - Both prompts MUST reference the same story
   - Frontend prompt should reference backend prompt for API contract

### For Single-Concern Stories (Backend OR Frontend):

1. **Read the selected template** using the Read tool (backend or frontend)

2. **Transform story into prompt sections**:

   **Header**: Use story title as feature name

   **Story Reference** (if from story): Add immediately after title:
   - Format: `**Story Reference**: STORY-{number} (relative/path/to/story-file.md)`
   - Example: `**Story Reference**: STORY-047 (iterations/2025-12-02-dark-mode/stories/story-047-dark-mode.md)`

   **Overview paragraph**: Combine story context + user story into concise "why"

   **Requirements**:
   - Convert acceptance criteria scenarios into bullet points
   - Add non-functional requirements from story
   - Make each requirement specific, measurable, testable

   **Rules**: List inferred rules files (from Step 1)

   **Domain/Component Architecture**:
   - For backend: Extract entities and relationships from story
   - For frontend: Define component hierarchy from UX design section
   - Use TypeScript pseudo-code format

   **Extra Considerations**:
   - Extract from non-functional requirements
   - Add edge cases from acceptance criteria
   - Include any technical constraints mentioned

   **Testing Considerations**:
   - Reference test scenarios from acceptance criteria
   - Specify test types needed (unit, integration, e2e)
   - Add quality gates from story

   **Implementation Notes**:
   - Add specific patterns or approaches from dependencies section
   - Include technical preferences mentioned in story
   - Reference similar completed features if mentioned

   **Specification by Example**:
   - Extract examples from UX design section
   - Convert acceptance criteria scenarios to Gherkin format
   - Add API request/response examples if backend
   - Add component usage examples if frontend

   **Verification**:
   - Convert quality checklist items from story
   - Add verification steps for each acceptance criterion
   - Include manual verification steps if applicable

3. **Enhance with prompt engineering best practices**:
   - Make vague requirements concrete and measurable
   - Add missing context where story assumptions aren't explicit
   - Include realistic edge cases not mentioned in story
   - Ensure examples are complete and executable

4. **Write the prompt to the prompts directory** (see Step 4 below)

## Step 4: Save the Prompt(s) to File

### For Fullstack Stories (Backend + Frontend):

1. **Determine the next prompt numbers**:
   - List all files in `prompts/` directory
   - Find the highest number used (excluding 00-* templates)
   - Use sequential numbers for backend (N) and frontend (N+1)

2. **Derive descriptive filenames**:
   - **Backend**: `{number}-story-{story-number}-{kebab-case-title}-backend.md`
     - Example: `10-story-046-response-detail-backend.md`
   - **Frontend**: `{number+1}-story-{story-number}-{kebab-case-title}-{component}.md`
     - Use specific component type: `-modal.md`, `-page.md`, `-form.md`, `-component.md`
     - Example: `11-story-046-response-detail-modal.md`

3. **Write the prompts** to the prompts directory:
   - Each prompt MUST have the story reference at the top:
     ```markdown
     # [Feature Title - Backend/Frontend]

     **Story Reference**: STORY-{number} (path/to/story-file.md)

     [Overview paragraph...]
     ```
   - Backend prompt focuses on API implementation
   - Frontend prompt focuses on UI/UX implementation
   - Both prompts reference the same story

4. **Confirm to user**:
   - Show file path(s) created
   - Summarize what each prompt covers
   - Mention the story ID for reference
   - If only backend created, ask if they want frontend next

### For Single-Concern Stories (Backend OR Frontend only):

1. **Determine the next prompt number**:
   - List all files in `prompts/` directory
   - Find the highest number used (excluding 00-* templates)
   - Use the next sequential number

2. **Derive a descriptive filename**:
   - **If from story**: use format `{number}-story-{story-number}-{kebab-case-title}.md`
     - Example: `09-story-047-dark-mode.md`
   - **If from user input** (legacy mode): use format `{number}-{descriptive-name}.md`
   - Keep the descriptive name concise but clear

3. **Write the prompt** to the prompts directory:
   - **If from story**: Add story reference at the top:
     ```markdown
     # [Feature Title]

     **Story Reference**: STORY-{number} (path/to/story-file.md)

     [Overview paragraph continues...]
     ```
   - **If from user input** (legacy mode): No story reference needed

4. **Confirm to user**:
   - Show the file path
   - Summarize what template was used
   - Mention the story ID for reference

## Step 5: Iterate if Needed

After saving the prompt, ask if the user wants to:
- Refine any section
- Add more detail to specific areas
- Adjust the scope or requirements
- Generate alternative approaches

## Important Guidelines

- **Story-first approach**: When given a story number, read it thoroughly before making inferences
- **Trust your inferences**: If the story is clear, minimize confirmation questions
- **Don't over-ask**: Only confirm what's genuinely ambiguous - don't ask for confirmation on obvious things

- **MANDATORY: Always split fullstack stories**: When a story has both API and UI work, you MUST create separate backend and frontend prompts - NO EXCEPTIONS, NO COMBINED OPTION
- **Fullstack story indicators** - MUST split when story includes:
  - API endpoint definition + UI component
  - Database changes + user interface
  - Service layer logic + page/modal/form component
  - "As a user I want to see..." (UI) combined with "fetches data from..." (API)
  - Backend acceptance criteria + frontend acceptance criteria

- **Be specific**: Convert story acceptance criteria into concrete, testable requirements
- **Preserve intent**: Don't change the story's intent - structure and enhance it for engineering
- **Think examples**: Transform UX designs and scenarios into concrete code examples
- **Consider rules**: Auto-suggest relevant rules files based on story content and labels
- **Story context matters**: Include relevant context from dependencies, open questions, and iteration goals

- **CRITICAL: Maintain consistency across split prompts** - When creating backend + frontend prompts, ensure:
  - DTO/interface definitions match EXACTLY (copy between prompts)
  - API endpoint paths are IDENTICAL
  - Data structures ALIGN perfectly
  - Both reference the SAME story
  - Frontend prompt explicitly references the backend prompt's API design
  - Question types, enums, and constants are consistent

## Rules Files Reference

Common rules files in this project:
- `rules/nestjs-rules.md` - Backend API development (use for API/service stories)
- `rules/react-rules.md` - Frontend component development (use for UI stories)
- `rules/typescript-rules.md` - TypeScript coding standards (use for all stories)
- `rules/domain-driven-design.md` - DDD principles (use when database/entities involved)
- `rules/code-quality-rules.md` - General quality standards (always include)

## Quick Start Workflows

### With story number (single-concern story):
```
/metaprompt 047
→ Finds story-047 from iterations
→ Analyzes content and makes inferences
→ Determines this is a frontend-only story
→ Confirms template choice with user
→ Generates prompt in prompts/09-story-047-dark-mode.md
→ Includes story reference at top of prompt
```

### With story number (fullstack story - ALWAYS SPLIT):
```
/metaprompt 046
→ Finds story-046 from iterations
→ Analyzes content: has both API endpoint and modal UI
→ Detects fullstack story - will create separate backend and frontend prompts
→ Asks: "Create backend first, or both now?"
→ User selects: "Create backend prompt first"
→ Generates backend prompt in prompts/10-story-046-response-detail-backend.md
→ Asks: "Ready to create the frontend prompt?"
→ User confirms: "yes please"
→ Generates frontend prompt in prompts/11-story-046-response-detail-modal.md
→ Both prompts reference STORY-046 with consistent DTOs and API contracts
```

### Without story number (legacy):
```
/metaprompt
→ Asks about objective and template type
→ Gathers requirements through questions
→ Generates prompt based on answers
```

## Getting Started

**If story number provided**: Immediately search for and read the story file, then proceed with inference and confirmation.

**If no story number**: Begin by asking the user about their objective and which template type they want to use. Use the AskUserQuestion tool to make this interactive and conversational.
