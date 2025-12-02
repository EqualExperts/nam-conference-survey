# Product Directory

Working outputs of product discovery and release management.

## Directory Guide

| Directory | Purpose | Details |
|-----------|---------|---------|
| `iterations/` | Discovery and story artifacts by iteration | See [iterations/README.md](iterations/README.md) |
| `releases/` | Release artifacts (cross-iteration) | See [releases/README.md](releases/README.md) |
| `metrics/` | Timing and performance metrics | See [metrics/README.md](metrics/README.md) |

### Within each iteration (`iterations/YYYY-MM-DD-name/`):

| Directory | Purpose | Details |
|-----------|---------|---------|
| `discovery/` | Interviews, observations, synthesis | See `discovery/README.md` in each iteration |
| `stories/` | User stories (numbered sequentially) | Files are self-documenting |
| `story-maps/` | Miro sync metadata | See [story-maps/README.md](iterations/2025-11-12-mvp/story-maps/README.md) |
| `design/` | Design artifacts and screenshots | Files are self-documenting |

## Related Directories (at project root)

| Directory | Purpose |
|-----------|---------|
| `context/product/` | Product context (personas, glossary, specs) |
| `prompts/product/` | AI behavior for PM workflows |
| `templates/product/` | Output structures for PM artifacts |
| `rules/product/` | PM-specific LLM guidelines |
| `.claude/commands/` | Slash commands for PM workflows |

## Key Shared Files

- `context/product/product-spec.md` - What we're building (updated via /rel)
- `context/product/backlog.md` - What's left to build (managed via /req and /rel)

## Slash Commands

| Command  | Purpose                                       |
| -------- | --------------------------------------------- |
| `/iter`  | Start a new iteration with optional interview |
| `/synth` | Synthesize discovery materials                |
| `/req`   | Extract user stories from synthesis           |
| `/map`   | Create Miro story map                         |
| `/demap` | Sync Miro priorities back to stories          |
| `/jira`  | Load stories to Jira                          |
| `/rel`   | Reconcile releases and update product spec    |

## Story Lifecycle

```
Draft → Ready → Built
         ↓
      Backlog (if not built in iteration)
         ↓
      Archived (if removed from scope)
```

## Iteration Naming

Format: `YYYY-MM-DD-initiative-name`

Examples:
- `2025-11-12-mvp`
- `2025-12-15-analytics`

## Story Numbering

Stories are numbered **sequentially across all iterations** (never reset):
- STORY-001, STORY-002, ... STORY-044 (mvp iteration)

---

**Note**: Product management artifacts are in `/product` subdirectories within `context/`, `prompts/`, `templates/`, and `rules/`. Engineering artifacts remain at the root level of those directories.
