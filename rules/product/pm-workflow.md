# Product Management Workflow Rules

When the user requests product management work without using slash commands, follow these rules to use the PM infrastructure correctly.

## Task Recognition

Recognize PM tasks by keywords and intent:

| User says... | Task type | Prompt file |
|--------------|-----------|-------------|
| "write a story", "create stories", "extract requirements" | Story extraction | `prompts/product/extract-user-stories.md` |
| "synthesize", "analyze interviews", "summarize discovery" | Synthesis | `prompts/product/synthesize-discovery.md` |
| "create a story map", "map the stories" | Story mapping | `prompts/product/create-story-map.md` |
| "load to jira", "create jira tickets" | Jira loading | `prompts/product/load-stories-to-tracker.md` |
| "create a release", "what was released" | Release management | `prompts/product/release-and-update-spec.md` |
| "start an iteration", "new iteration" | Iteration setup | Use `/iter` command |

## Workflow Steps

When a PM task is recognized:

### 1. Read the Prompt
- Read the relevant prompt file from `prompts/product/`
- The prompt contains the canonical instructions for that task type
- Follow the prompt's instructions exactly

### 2. Load Product Context
Always read these files for PM tasks:
- `context/product/product-spec.md` - What we're building
- `context/product/personas.md` - Who we're building for
- `context/product/backlog.md` - What's left to build

### 3. Identify Current Iteration
- Scan `product/iterations/` for directories
- Most recent by date prefix (YYYY-MM-DD) is the current iteration
- If ambiguous, ask the user which iteration

### 4. Use Templates
- Templates are in `templates/product/`
- For stories: `story-template-*.md` (offer choice if multiple exist)
- For synthesis: `synthesis-template.md`
- For releases: `release-template.md`
- Read the template's YAML front matter for name and description

### 5. Determine Story Numbering
- Scan ALL `product/iterations/*/stories/` directories
- Find the highest STORY-XXX number
- New stories start at next sequential number
- Story numbers never reset between iterations

### 6. Save Outputs
| Artifact type | Save location |
|---------------|---------------|
| Stories | `product/iterations/{iteration}/stories/story-{number}-{slug}.md` |
| Synthesis | `product/iterations/{iteration}/discovery/synthesis/{date}-synthesis.md` |
| Story index | `product/iterations/{iteration}/stories/stories-index.md` |

### 7. Update Backlog
After creating stories:
- Add each story to `context/product/backlog.md`
- Include: ID, Title, Priority, Iteration

## When to Use Slash Commands Instead

Prefer slash commands when:
- The full orchestration is needed (timing metrics, all validations)
- The user explicitly mentions the command
- Multiple related steps should run together

Use direct PM workflow when:
- User asks naturally ("write me a story for X")
- Only part of the workflow is needed
- User wants more control over the process

## Engineering vs PM Work

| Request type | Use PM infrastructure? |
|--------------|----------------------|
| "Write a story for the admin page" | Yes - PM task |
| "Implement the admin page" | No - engineering task |
| "What stories exist for analytics?" | Yes - PM context lookup |
| "Fix the bug in SurveyPage.tsx" | No - engineering task |

When doing engineering implementation, read stories as requirements but don't modify PM artifacts.
