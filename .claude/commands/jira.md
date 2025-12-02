---
description: Load current iteration stories to Jira
---

You are being asked to load user stories from a product iteration into Jira.

# Overview

This command orchestrates the Jira loading workflow by reading the canonical prompt instructions and executing them.

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
- If no stories found, inform the user they need to run `/req` first

## 4. Read the Jira Loading Prompt
**Read and follow the instructions in**: `prompts/product/load-stories-to-tracker.md`

This prompt contains the canonical instructions for:
- How to get Jira project information
- How to extract data from story markdown files
- How to map markdown fields to Jira fields
- How to create issues
- How to handle errors and retries

## 5. Execute Jira Loading
Follow the instructions from the prompt to load the stories to Jira.

**Key requirements:**
- Use Atlassian MCP tools for all Jira operations
- Create story issues without epic parent (epics have been removed)
- Preserve all acceptance criteria and metadata in Jira description
- Handle any Jira-specific field mappings
- Use labels to group stories from same iteration if needed

## 6. Record Timing and Report Results
- Capture the end timestamp
- Calculate duration in seconds
- Append to centralized timing log at `product/metrics/timing-log.jsonl`:
  ```json
  {"timestamp": "{end_timestamp}", "command": "/jira", "iteration": "{iteration-name}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "duration_seconds": {duration}, "status": "success", "metadata": {"stories_created": ["PROJ-XXX", "PROJ-YYY"], "jira_project": "PROJ"}}
  ```
- Tell the user:
  - Jira loading is complete
  - List of all story keys and titles
  - Summary: X stories loaded to Jira project Y
  - Direct links to view the stories in Jira
  - The operation duration

# Important Notes

- **The prompt file is the source of truth** for Jira loading logic
- Users can customize Jira loading behavior by editing `prompts/product/load-stories-to-tracker.md`
- This command handles workflow orchestration (finding files, timing, reporting)
- The prompt handles the actual Jira API interaction logic
- Requires Atlassian MCP to be configured with appropriate permissions
- If Atlassian MCP is not available, inform the user and skip gracefully
- Epics have been removed - stories are loaded as standalone issues
- Use iteration name as a label to group related stories in Jira if needed
