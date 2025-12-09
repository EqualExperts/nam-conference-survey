# Metrics

Centralized metrics for the product development workflow.

## Files

### timing-log.jsonl

**Single source of truth** for all timing data across the product lifecycle.

**Format** (one JSON object per line):
```json
{
  "timestamp": "2025-11-14T10:30:00Z",
  "command": "/synth",
  "iteration": "2025-11-12-mvp",
  "start": "2025-11-14T10:25:00Z",
  "end": "2025-11-14T10:30:00Z",
  "duration_seconds": 300,
  "generation_seconds": 300,
  "status": "success",
  "metadata": {"themes_identified": 5, "pain_points": 8}
}
```

## Two Types of Timing

### 1. Event Timestamps
When did activity X happen? Used for activity charts and lifecycle funnels.

### 2. Generation Durations
How long did AI take to generate artifact Y? Used for productivity measurement and comparison with human effort.

**Field Descriptions**:
- `timestamp`: When the operation completed (ISO 8601)
- `command`: The slash command or activity type (see table below)
- `iteration`: The iteration name, or `null` for global operations
- `start`: When the operation started (ISO 8601)
- `end`: When the operation ended (ISO 8601)
- `duration_seconds`: Total wall-clock duration (may include human wait time)
- `generation_seconds`: Actual AI generation time (for productivity metrics)
- `setup_seconds`: For `/iter`, time to set up iteration infrastructure
- `status`: "success" or "failure"
- `metadata`: Command-specific details (varies by command)

## Commands and Activities Tracked

### Slash Commands
| Command | Generation Time Field | Typical Metadata |
|---------|----------------------|------------------|
| /iter | `setup_seconds` | interview_conducted |
| /synth | `generation_seconds` = `duration_seconds` | themes_identified, pain_points |
| /req | `duration_seconds`, plus `story_generation_times` in metadata | stories_created, story_ids, story_generation_times |
| /map | `generation_seconds` = `duration_seconds` | board_id, board_url, story_cards |
| /demap | `duration_seconds` | stories_updated, stories_added, stories_archived |
| /jira | `duration_seconds` | stories_created, jira_project |
| /rel | `generation_seconds` = `duration_seconds` | release, stories_built |

### Direct Requests (outside slash commands)
| Activity | command value | Generation Time Field |
|----------|--------------|----------------------|
| Individual story | `story` | `generation_seconds` |
| Synthesis | `synthesis` | `generation_seconds` |
| Story map | `story_map` | `generation_seconds` |

Direct requests include `"source": "direct_request"` in metadata.

## Per-Story Generation Times

When stories are created via `/req`, individual story generation times are tracked in metadata:

```json
{
  "metadata": {
    "stories_created": 3,
    "story_ids": ["STORY-054", "STORY-055", "STORY-056"],
    "story_generation_times": [
      {"story_id": "STORY-054", "generation_seconds": 45},
      {"story_id": "STORY-055", "generation_seconds": 38},
      {"story_id": "STORY-056", "generation_seconds": 52}
    ]
  }
}
```

## Analysis Examples

**Total time per iteration**:
```bash
grep "iteration-name" timing-log.jsonl | jq -s 'map(.duration_seconds) | add'
```

**Average time per command**:
```bash
jq -s 'group_by(.command) | map({command: .[0].command, avg: (map(.duration_seconds) | add / length)})' timing-log.jsonl
```

**Filter by date range**:
```bash
jq -s 'map(select(.timestamp >= "2025-11-20" and .timestamp < "2025-11-22"))' timing-log.jsonl
```
