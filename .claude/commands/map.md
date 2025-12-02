---
description: Create Miro story map for current iteration with production-grade formatting
---

You are being asked to create a visual story map in Miro from a product iteration's stories.

# Overview

This command orchestrates the story mapping workflow by reading the canonical prompt instructions and executing them to create a production-grade Miro board.

# Workflow Steps

## 1. Record Start Time
- Capture the current timestamp as the operation start time
- This will be used for timing metrics

## 2. Identify the Iteration
- Check if the user specified an iteration name (e.g., "2025-11-12-mvp")
- If not specified, look in `product/iterations/` for the most recent iteration (by date prefix)
- Ask the user to clarify if there are multiple recent iterations

## 3. Verify Stories Exist
- Check that `product/iterations/{iteration-name}/stories/` directory exists
- Find all story files (story-{number}-{slug}.md)
- Find stories-index.md for story overview
- If no stories found, inform the user they need to run `/req` first

## 4. Story Map Location
- Story maps are saved in: `product/iterations/{iteration-name}/story-maps/`
- This is where the story map markdown and metadata will be stored
- Create the directory if it doesn't exist

## 5. Read the Story Mapping Prompt
**Read and follow the instructions in**: `prompts/product/create-story-map.md`

This prompt contains the canonical instructions for:
- How to analyze stories to extract activities and user flows
- How to create a Miro board
- How to apply the universal color scheme by story type
- How to position items with consistent spacing
- How to create swim lanes with connector-based separators
- How to add persona emojis and legend
- How to save metadata for future syncing

## 6. Execute Story Map Creation
Follow the instructions from the prompt to create the Miro story map.

**Key requirements:**
- Use Miro MCP tools for all board operations
- Apply production-grade formatting (blue activity headers, color by type, consistent spacing)
- Create connector-based swim lanes (NOW/NEXT/LATER or priority-based)
- Include persona emojis on all story cards
- Save comprehensive metadata to `miro-metadata.json` in story-maps directory

## 7. Record Timing and Report Results
- Capture the end timestamp
- Calculate duration in seconds
- Append to centralized timing log at `product/metrics/timing-log.jsonl`:
  ```json
  {"timestamp": "{end_timestamp}", "command": "/map", "iteration": "{iteration-name}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "duration_seconds": {duration}, "status": "success", "metadata": {"board_id": "xxx", "board_url": "https://miro.com/app/board/xxx", "total_items_created": {count}, "story_cards": {count}}}
  ```
- Tell the user:
  - Story map creation is complete
  - Direct link to the Miro board
  - Summary: X stories mapped across Y activities
  - The operation duration

# Important Notes

- **The prompt file is the source of truth** for story mapping logic
- Users can customize story map formatting by editing `prompts/product/create-story-map.md`
- This command handles workflow orchestration (finding files, timing, reporting)
- The prompt handles the actual Miro API interaction and formatting logic
- Requires Miro MCP to be configured with appropriate permissions
- If Miro MCP is not available, inform the user and skip gracefully
- Story maps are synced to markdown for version control
