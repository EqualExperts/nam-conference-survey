---
description: Extract user stories from iteration synthesis
---

You are being asked to extract user stories from a completed iteration synthesis.

# Overview

This command orchestrates the requirements extraction workflow by reading the canonical prompt instructions and executing them.

# Workflow Steps

## 1. Record Start Time
- Capture the current timestamp as the operation start time
- This will be used for timing metrics

## 2. Identify the Iteration
- Check if the user specified an iteration name (e.g., "2025-11-12-mvp")
- If not specified, look in `product/iterations/` for the most recent iteration (by date prefix)
- Ask the user to clarify if there are multiple recent iterations

## 3. Verify Synthesis Exists and Identify Most Recent
- Check that `product/iterations/{iteration-name}/discovery/synthesis/` directory exists
- If multiple synthesis files exist, identify the MOST RECENT by date
- Use ONLY the most recent synthesis file (older files are historical record only)
- If no synthesis found, inform the user they need to run `/synth` first
- Read the most recent synthesis document to understand the capabilities and requirements

## 4. Select Story Template and Granularity

### Discover Available Templates
- Scan `templates/product/` for files matching pattern `story-template-*.md`
- Read the YAML front matter from each template to extract `name` and `description`
- Build a list of available templates with their descriptions

### Ask User for Template Selection
Use the AskUserQuestion tool to present the available templates. For each template, show:
- The template name (from front matter)
- The description (from front matter)

Example options based on current templates:
- **Human Developer**: Detailed stories with explicit UI components, data requirements, business rules, and implementation guidance. Best for human developers who need comprehensive specifications.
- **LLM Developer**: Streamlined stories with high-level acceptance criteria. Best for LLM-assisted development where the AI infers implementation details from context.

### Ask User for Story Granularity
Use the AskUserQuestion tool to ask about granularity:
- **Fine**: More, smaller stories. Each screen element, interaction, or discrete capability becomes a separate story. Results in highly specific, atomic stories.
- **Standard**: Balanced approach. Logical user-facing capabilities become stories. A screen with multiple related elements may be one story.
- **Coarse**: Fewer, larger stories. Related functionality grouped together. Epics may become single stories.

Store the selected template path and granularity for use in story extraction.

## 5. Determine Story Numbering
- Scan all `product/iterations/*/stories/` directories to find the highest existing story number
- New stories should start at the next sequential number (e.g., if last is STORY-044, start at STORY-045)

## 6. Review Design Artifacts
- Check if `product/iterations/{iteration-name}/design/` directory exists
- If it exists, review all screenshots and design files
- Design screens often represent individual stories
- Screenshots should be referenced in story files

## 7. Read the Story Extraction Prompts
**Read and follow the instructions in**:
- `prompts/product/extract-user-stories.md` - For extracting stories from synthesis and design

This prompt contains the canonical instructions for:
- How to convert synthesis capabilities into user stories
- How to incorporate design screens as stories
- How to write Given-When-Then acceptance criteria
- How to use general personas (not specific stakeholder names)
- How to focus on business requirements while including obvious technical needs
- How to assign priorities and estimates
- How to identify dependencies
- What quality checks to include

## 8. Execute Story Extraction
Follow the instructions from the prompts to create the stories.

**Key requirements:**
- **Use the template selected by the user in Step 4** (read the full template file)
- **Apply the granularity setting selected by the user**:
  - Fine: Create more, smaller stories (each discrete capability or screen element)
  - Standard: Create balanced stories (logical user-facing capabilities)
  - Coarse: Create fewer, larger stories (group related functionality)
- Include product context from `context/product/*` files
- Review BOTH synthesis capabilities AND design screens for story creation
- Reference screenshots in stories where design artifacts exist
- Use general personas (Conference Attendee, Conference Organizer, Event Planner)
- Focus on business requirements with obvious technical needs included
- Ensure sequential story numbering across all iterations
- Follow Given-When-Then format for acceptance criteria

## 9. Save Stories
- Stories are saved to `product/iterations/{iteration-name}/stories/`
- Save each story as `story-{number}-{slug}.md`
- Create or update `product/iterations/{iteration-name}/stories/stories-index.md` with:
  - List of all stories in this iteration
  - Summary of priorities
  - Total effort estimate

## 10. Add Stories to Backlog
- Read `context/product/backlog.md` (create from template if doesn't exist)
- Add each new story to the backlog table with: ID, Title, Priority, Iteration
- The backlog is the master index of all un-built stories
- Update the "Last Updated" date

## 11. Record Timing and Report Results
- Capture the end timestamp
- Calculate duration in seconds
- Append to centralized timing log at `product/metrics/timing-log.jsonl`:
  ```json
  {"timestamp": "{end_timestamp}", "command": "/req", "iteration": "{iteration-name}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "duration_seconds": {duration}, "status": "success", "metadata": {"stories_created": {count}, "story_ids": ["STORY-XXX", "STORY-YYY"], "template": "{selected-template-name}", "granularity": "{selected-granularity}"}}
  ```
- Tell the user:
  - Story extraction is complete
  - List all stories created with their IDs, titles, and priorities
  - Summary: X stories (Y must have, Z should have, etc.)
  - Estimated total effort
  - The operation duration
  - Next steps: Stories can be mapped with `/map`, loaded to Jira with `/jira`, or sent directly to development

# Important Notes

- **The prompt file is the source of truth** for extraction logic
- Users can customize story extraction by editing `prompts/product/extract-user-stories.md`
- **Story templates are discovered dynamically** from `templates/product/story-template-*.md`
- **User selects template and granularity** at runtime for maximum flexibility
- This command handles workflow orchestration (finding files, numbering, timing, saving output)
- The prompt handles the actual extraction logic
- Epics have been removed - stories are the atomic units
- Stories are saved to iteration directory AND added to product backlog
- Backlog is the master index of all un-built stories (removed when released via `/rel`)
- DO NOT automatically load stories to Jira - that's a separate workflow (`/jira`)
- Story numbering is sequential across all iterations, not per-iteration
- Different teams can use different templates/granularity within the same project
