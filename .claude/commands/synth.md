---
description: Run synthesis on the current iteration
---

You are being asked to synthesize the discovery materials for the current or specified product iteration.

# Overview

This command orchestrates the synthesis workflow by reading the canonical prompt instructions and executing them.

# Workflow Steps

## 1. Record Start Time
- Capture the current timestamp as the operation start time
- This will be used for timing metrics

## 2. Identify the Iteration
- Check if the user specified an iteration name (e.g., "2025-11-12-mvp")
- If not specified, look in `product/iterations/` for the most recent iteration (by date prefix)
- Ask the user to clarify if there are multiple recent iterations

## 3. Read the Synthesis Prompt
**Read and follow the instructions in**: `prompts/product/synthesize-discovery.md`

This prompt contains the canonical instructions for:
- What context files to review
- How to identify themes and patterns
- How to extract user needs
- How to rank pain points
- How to propose features
- How to structure the output

## 4. Execute Synthesis
Follow the instructions from the prompt to create the synthesis document.

**Key requirements:**
- Use the synthesis template from `templates/product/synthesis-template.md`
- Review all discovery materials in the iteration's discovery directory
- Include product context from `knowledge/product/*` files
- Cross-reference with previous synthesis from this or other iterations
- Provide evidence-based recommendations

## 5. Save Output
- Save to: `product/iterations/{iteration-name}/discovery/synthesis/synthesis-{date}.md`
- Use ISO date format (YYYY-MM-DD) for the filename
- Remove the `.synthesis-pending` marker file from discovery directory if it exists

## 6. Record Timing and Report Results
- Capture the end timestamp
- Calculate duration in seconds
- Append to centralized timing log at `product/metrics/timing-log.jsonl`:
  ```json
  {"timestamp": "{end_timestamp}", "command": "/synth", "iteration": "{iteration-name}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "duration_seconds": {duration}, "status": "success", "metadata": {"themes_identified": {count}, "pain_points": {count}}}
  ```
- Tell the user:
  - The synthesis is complete
  - The file path
  - Key findings summary (themes, features, effort estimate)
  - The operation duration

# Important Notes

- **The prompt file is the source of truth** for synthesis instructions
- Users can customize synthesis behavior by editing `prompts/product/synthesize-discovery.md`
- This command handles workflow orchestration (finding files, timing, saving output)
- The prompt handles the actual synthesis logic and requirements
