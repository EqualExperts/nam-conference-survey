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
- `knowledge/product/product-spec.md` - What we're building
- `knowledge/product/personas.md` - Who we're building for
- `knowledge/product/backlog.md` - What's left to build

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

**CRITICAL**: Story numbers are globally unique across ALL iterations. Before creating ANY new story:

1. Scan ALL `product/iterations/*/stories/` directories
2. Find the highest STORY-XXX number across the entire backlog
3. New stories start at next sequential number
4. Story numbers NEVER reset between iterations
5. Verify the backlog.md shows no conflicts with planned numbers

**Why this matters**: Stories may exist in different iterations that were created at different times. A story in iteration A might use STORY-047 while a story in iteration B uses STORY-048. Always check ALL iterations, not just the current one.

**Verification command**:
```bash
grep -rh "Story ID.*STORY-" product/iterations/*/stories/*.md | sort -t- -k2 -n
```

### 6. Save Outputs
| Artifact type | Save location |
|---------------|---------------|
| Stories | `product/iterations/{iteration}/stories/story-{number}-{slug}.md` |
| Synthesis | `product/iterations/{iteration}/discovery/synthesis/{date}-synthesis.md` |
| Story index | `product/iterations/{iteration}/stories/stories-index.md` |

### 7. Update Story Indexes (MANDATORY)

**CRITICAL**: Every new story must be added to TWO places:

1. **Iteration stories-index.md** (`product/iterations/{iteration}/stories/stories-index.md`)
   - Add row to Stories table: ID, Title, Priority, Size, Status
   - Add Story Details section with file reference and summary
   - Update Dependencies section if applicable
   - Update Summary counts

2. **Master backlog** (`knowledge/product/backlog.md`)
   - Add row: ID, Title, Priority, Iteration
   - Stories remain in backlog until released via `/rel`

**This applies regardless of how stories are added** - via `/req`, direct request, or any other method. No story creation is complete until both indexes are updated.

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

## Generation Time Tracking (MANDATORY)

When creating PM artifacts outside of slash commands, **always track generation time** for productivity metrics.

### What to Track

| Artifact | Track generation time? |
|----------|----------------------|
| Individual story | Yes - per story |
| Synthesis document | Yes |
| Story map | Yes |
| Release notes | Yes |
| Story refinement/rewrite | Yes |

### How to Track

1. **Before starting generation**: Note the current timestamp
2. **After completing the artifact**: Note the end timestamp, calculate duration
3. **Append to timing log** at `product/metrics/timing-log.jsonl`:

**For individual stories:**
```json
{"timestamp": "{end_timestamp_ISO8601}", "command": "story", "iteration": "{iteration-name}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "generation_seconds": {duration}, "status": "success", "metadata": {"story_id": "STORY-XXX", "source": "direct_request"}}
```

**For synthesis:**
```json
{"timestamp": "{end_timestamp_ISO8601}", "command": "synthesis", "iteration": "{iteration-name}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "generation_seconds": {duration}, "status": "success", "metadata": {"source": "direct_request"}}
```

**For story maps:**
```json
{"timestamp": "{end_timestamp_ISO8601}", "command": "story_map", "iteration": "{iteration-name}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "generation_seconds": {duration}, "status": "success", "metadata": {"source": "direct_request", "story_count": N}}
```

### Why This Matters

Generation times measure AI productivity for tasks that would otherwise be done by humans. This data enables:
- Comparison of AI vs human effort for PM tasks
- Identification of which tasks benefit most from AI assistance
- Tracking productivity improvements over time

**This tracking applies regardless of whether slash commands are used.** The goal is complete coverage of PM artifact generation.
