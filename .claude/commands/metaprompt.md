---
description: Generate/improve prompts for AI tools using project templates
---

You are helping the user create a well-structured, effective AI prompt through an interactive discovery process.

## Your Task

Help the user create a high-quality, production-ready prompt by:

1. **Analyzing their input** - Identify the core objective, key requirements, constraints, and domain concepts
2. **Selecting the appropriate template** - Ask which template structure to use
3. **Generating a structured prompt** - Transform their unstructured thoughts into a complete, well-formatted prompt
4. **Applying prompt engineering best practices**:
   - **Task clarity & context**: Ensure the objective is unambiguous with necessary background
   - **Structured output format**: Define clear sections and expected response structure
   - **Examples and constraints**: Include concrete examples and explicit limitations
   - **Testable requirements**: Frame requirements as measurable acceptance criteria

## Step 1: Discover the Context Through Questions

Use the AskUserQuestion tool to gather the information needed to create an effective prompt. Ask targeted questions to understand:

1. **Primary objective and scope**:
   - What feature or system are you building?
   - What problem does this solve?
   - Is this frontend, backend, or both?

2. **Template selection** (ask early to guide subsequent questions):
   - Which template structure should we use?
     - Backend (API endpoints, services, database schema, business logic)
     - Frontend (UI components, pages, user interactions, visual design)
     - Corrective Actions (TODO.md from code comments after a one-shot feature)

3. **Key requirements**:
   - What are the must-have features or acceptance criteria?
   - What defines "done" for this work?

4. **Domain and technical details**:
   - What are the main entities or components involved?
   - Are there any technical constraints or preferences?
   - What existing code or patterns should be followed?

5. **Testing and quality**:
   - What level of testing is needed?
   - Are there specific scenarios to test?

6. **Additional context** (if needed):
   - Are there edge cases or special considerations?
   - Any examples or references to follow?

**Important**: Don't ask all questions at once. Start with objective and template selection, then ask follow-up questions based on their answers. Keep the conversation focused and efficient.

## Step 2: Generate the Structured Prompt

Once you know which template to use:

1. **Read the selected template** using the Read tool
2. **Fill in each section** based on the user's unstructured input:
   - Extract requirements from their description
   - Identify relevant rules files from `rules/` directory that apply
   - Draft domain models or component architecture as appropriate
   - Add testing considerations
   - Create concrete examples (Specification by Example)
   - Build verification checklist

3. **Enhance with prompt engineering best practices**:
   - Make requirements specific, measurable, and testable
   - Add context where the user's input was vague
   - Include edge cases and constraints
   - Suggest concrete examples if none were provided
   - Ensure the "why" is clear alongside the "what"

4. **Write the prompt to the prompts directory**

## Step 3: Save the Prompt to File

After generating the structured prompt:

1. **Determine the next prompt number**:
   - List all files in `prompts/` directory
   - Find the highest number used (excluding 00-* templates)
   - Use the next sequential number

2. **Derive a descriptive filename** from the user's input or feature name
   - Use kebab-case (e.g., `admin-overview-page`)
   - Keep it concise but descriptive

3. **Write the prompt** to `prompts/{number}-{descriptive-name}.md`

4. **Confirm the file location** to the user

## Step 4: Iterate if Needed

After saving the prompt, ask if the user wants to:
- Refine any section
- Add more detail to specific areas
- Adjust the scope or requirements
- Generate alternative approaches

## Important Guidelines

- **Don't assume**: If the user's input lacks critical details, ask clarifying questions
- **Be specific**: Vague prompts produce vague results - push for concrete, testable requirements
- **Match their style**: Use the same terminology and concepts from their templates
- **Preserve intent**: Don't change what they want - just structure it better
- **Think examples**: Good prompts include concrete examples, not just abstract descriptions
- **Consider rules**: Suggest relevant rules files from the `rules/` directory based on the task

## Rules Files Reference

Common rules files in this project:
- `rules/nestjs-rules.md` - Backend API development
- `rules/react-rules.md` - Frontend component development
- `rules/typescript-rules.md` - TypeScript coding standards
- `rules/domain-driven-design.md` - DDD principles
- `rules/code-quality-rules.md` - General quality standards

## Getting Started

Begin by asking the user about their objective and which template type they want to use (Step 1). Use the AskUserQuestion tool to make this interactive and conversational. Once you understand what they need, gather additional details before generating the prompt.
