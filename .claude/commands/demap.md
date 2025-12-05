---
description: Sync Miro story map priorities back to iteration stories
---

You are being asked to synchronize the Miro story map back to the iteration's story files, updating priorities based on swim lane positions.

# Overview

This command reads the current state of the Miro story map and updates the iteration's story files to reflect:
- Story prioritization (NOW/NEXT/LATER) based on swim lane position
- Stories that have been added to the board (creates new story files)
- Stories that have been removed from the board (archives them)

# Workflow Steps

## 1. Record Start Time
- Capture the current timestamp as the operation start time
- This will be used for timing metrics

## 2. Identify the Iteration
- Check if the user specified an iteration name (e.g., "2025-11-12-mvp")
- If not specified, look in `product/iterations/` for the most recent iteration (by date prefix)
- Ask the user to clarify if there are multiple recent iterations

## 3. Locate Miro Board
- Read `product/iterations/{iteration}/story-maps/miro-metadata.json` for board ID
- Verify the board exists and is accessible via Miro MCP
- Extract swim lane Y-coordinates from metadata for priority detection

## 4. Read Current Miro Board State
- Get all items from the Miro board using Miro MCP
- Filter to story cards only (exclude headers, labels, connectors, etc.)
- For each story card, capture:
  - Card ID
  - Story title/content
  - Y-coordinate position
  - Story number (if present in title, e.g., "001: Story Name")

## 5. Determine Swim Lane Assignments

Use the Y-coordinates from metadata to classify each story:

```
For each story card:
  - Get story Y-coordinate
  - Compare to swim lane connector positions from metadata
  - If y < NOW_LINE: priority = "NOW"
  - Else if y < NEXT_LINE: priority = "NEXT"
  - Else if y < LATER_LINE: priority = "LATER"
  - Else: priority = "BACKLOG"
```

## 6. Detect Changes

Compare Miro board state to local story files in `product/iterations/{iteration}/stories/`:

**Scenarios**:

1. **Story on board with matching file** → Update priority if changed
2. **Story on board without matching file** → New story, ask user for details
3. **Story file without matching card** → Removed from board, ask user to confirm archival

**Story matching logic**:
- Try to match by story number in card title (e.g., "001: Title")
- If no number, try to match by title similarity
- If no match found, treat as new story

## 7. Handle New Stories

For each story on Miro board without a matching local file:

**Interview user**:
```
I found a new story on the Miro board:

**Card Title**: {title from Miro}
**Position**: {swim lane - NOW/NEXT/LATER}
**Current Y-coordinate**: {y}

Please provide:

1. **Story Title**: [Clear, user-focused title]
2. **User Story**: As a [who], I want [what], so that [why]
3. **Acceptance Criteria**: What must be true for this story to be complete?
4. **Priority**: {pre-filled from swim lane}
5. **Effort Estimate**: XS/S/M/L/XL?
6. **Dependencies**: Does this depend on other stories?
7. **Technical Notes**: Any implementation considerations?

I'll assign this as STORY-{next-number} and create the story file.
```

**Create story file**:
- Scan all `product/iterations/*/stories/` directories to find highest story number
- Assign next sequential number
- Use appropriate story template (LLM-dev or human-dev based on user preference)
- Save to `product/iterations/{iteration}/stories/story-{number}-{slug}.md`
- Add metadata: Priority, Status (Draft), Created date

## 8. Handle Removed Stories

For each local story file without a matching Miro card:

**Ask user**:
```
Story STORY-{number} "{title}" is no longer on the Miro board.

Should I:
1. Archive it (move to stories/archive/{date}-demap/)
2. Move it to backlog (add to product/backlog.md)
3. Keep it as-is (maybe it was just moved temporarily)
```

**If archiving**:
- Create archive directory: `product/iterations/{iteration}/stories/archive/{YYYY-MM-DD}-demap/`
- Move story file to archive
- Update story metadata: Status → Archived, Archived date

**If moving to backlog**:
- Add entry to `knowledge/product/backlog.md` under appropriate priority section
- Update story metadata: Status → Backlog, Backlog date
- Keep story file in current location (just update metadata)

## 9. Update Story Priorities

For each story that exists both on Miro and locally:

**Read story file** from `product/iterations/{iteration}/stories/story-{number}-*.md`

**Update story metadata**:
- Priority: {NOW/NEXT/LATER} based on swim lane
- Miro Position: y={coordinate}
- Last Synced: {current date}
- Status: Ready (if not already set)

**Example metadata block**:
```markdown
**Story ID**: STORY-019
**Priority**: NOW
**Status**: Ready
**Miro Position**: y=125
**Last Synced**: 2025-11-20
**Effort**: S (1-2 days)
```

## 10. Update Miro Metadata

Update `product/iterations/{iteration}/story-maps/miro-metadata.json`:
- Update `last_synced_at` timestamp
- Update `sync_direction` to "miro_to_markdown"
- Update story counts by priority
- Add change log entry

## 11. Record Timing and Report Results

- Capture the end timestamp
- Calculate duration in seconds
- Append to centralized timing log at `product/metrics/timing-log.jsonl`:
  ```json
  {"timestamp": "{end_timestamp}", "command": "/demap", "iteration": "{iteration-name}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "duration_seconds": {duration}, "status": "success", "metadata": {"stories_updated": {count}, "stories_added": {count}, "stories_archived": {count}, "board_id": "xxx"}}
  ```
- Tell the user:
  - Demap sync is complete
  - Summary of changes:
    - X stories updated with new priorities
    - Y new stories added
    - Z stories archived
  - Current distribution: NOW ({count}), NEXT ({count}), LATER ({count})
  - The operation duration

# Important Notes

- **Miro is the source of truth for priorities** during /demap
- Story files are the source of truth for story details (acceptance criteria, etc.)
- /demap focuses on priority synchronization, not content updates
- Always preserve story numbers - never renumber or reuse
- Stories can move between iterations by updating their location and metadata
- User must confirm before archiving or creating new stories
- If Miro MCP is not available, inform the user and exit gracefully

# Integration with Workflow

```
/map → Creates initial Miro board from stories
  ↓
[Humans collaborate on Miro, adjust priorities, add/remove stories]
  ↓
/demap → Syncs Miro priorities back to story files
  ↓
[Repeat /demap as needed during planning/development]
  ↓
/jira → Loads stories to Jira (uses latest priorities from /demap)
```
