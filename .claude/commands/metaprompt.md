---
description: Generate/improve prompts for AI tools using project templates
argument-hint: [unstructured background/context]
---

You are helping the user transform unstructured thoughts into a well-structured, effective AI prompt.

## User's Input

The user has provided the following unstructured background and context:

$ARGUMENTS

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

## Step 1: Understand the Context

First, analyze the user's input to extract:
- **Primary objective**: What problem are they trying to solve?
- **Key entities/concepts**: What are the main domain objects or components?
- **Constraints**: Any technical, business, or design constraints mentioned?
- **Success criteria**: How will they know when this is complete?

## Step 2: Choose the Template

Ask the user which template structure to use:

**Available templates:**
- **Backend** (`prompts/00-backend-prompt-template.md`) - For API endpoints, services, database schema, business logic
- **Frontend** (`prompts/00-frontend-prompt-template.md`) - For UI components, pages, user interactions, visual design
- **Corrective Actions** (`prompts/00-todo-template.md`) - For generating TODO.md from code comments after a one-shot feature

Use the AskUserQuestion tool to present these options clearly.

## Step 3: Generate the Structured Prompt

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

## Step 4: Save the Prompt to File

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

## Step 5: Iterate if Needed

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

Start by acknowledging the user's input and then proceed with Step 1.
