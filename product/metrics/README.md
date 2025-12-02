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
  "status": "success",
  "metadata": {"themes_identified": 5, "pain_points": 8}
}
```

**Field Descriptions**:
- `timestamp`: When the operation completed (ISO 8601)
- `command`: The slash command that was executed
- `iteration`: The iteration name, or `null` for global operations (/rel)
- `start`: When the operation started (ISO 8601)
- `end`: When the operation ended (ISO 8601)
- `duration_seconds`: Total duration in seconds
- `status`: "success" or "failure"
- `metadata`: Command-specific details (varies by command)

**Commands Tracked**:
| Command | Iteration-Specific | Typical Metadata |
|---------|-------------------|------------------|
| /iter | Yes | interview_conducted |
| /synth | Yes | themes_identified, pain_points |
| /req | Yes | stories_created, story_ids |
| /map | Yes | board_id, board_url, story_cards |
| /demap | Yes | stories_updated, stories_added, stories_archived |
| /jira | Yes | stories_created, jira_project |
| /rel | No (global) | release, stories_built, capabilities_without_stories |

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
