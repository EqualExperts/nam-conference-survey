---
description: Create release from git history and update product spec
---

You are being asked to create a release by analyzing what was built and deployed, matching it to stories, and updating the product specification.

# Overview

This command orchestrates the release workflow: analyzing git history to determine what was built, confirming with the PM, updating story statuses, managing backlog, and updating the product specification.

# Workflow Steps

## 1. Record Start Time
- Capture the current timestamp as the operation start time
- This will be used for timing metrics

## 2. Identify Scope
- Ask the user for a date range or commit range to analyze
- Releases can include stories from multiple iterations
- If not specified, default to commits since the last release

## 3. Analyze Git History
**Use git log as the source of truth for what was built.**

Assume CI/CD practices: everything committed to main/master has been deployed.

- Run `git log --oneline -30` to see recent commits
- For feature commits, run `git show {commit-hash} --stat --no-patch` and `git show {commit-hash} --no-patch --format="%B"` to see full details
- Extract:
  - What features/capabilities were implemented
  - Commit timestamps (these become build dates)
  - Author information
  - Technical details mentioned in commit messages

## 4. Match Commits to Stories
- Read the backlog (`knowledge/product/backlog.md`) to get the list of un-built stories
- For each story in the backlog, check if git evidence suggests it was built
- Compare commit messages, file changes, and technical details against story acceptance criteria
- Build a suggested list of completed stories with supporting evidence

## 5. Present Suggestions to PM for Confirmation
**Use AskUserQuestion to present your findings:**
- Show the list of stories you believe were completed, with brief evidence for each
- Ask the PM to confirm, correct, or add to the list
- Example: "Based on git commits, I believe these stories were completed: [list]. Please confirm, remove any incorrect ones, or add any I missed."

This approach reduces PM effort - they review and confirm rather than recall from memory.

## 6. Read the Release Prompt
**Read and follow the instructions in**: `prompts/product/release-and-update-spec.md`

This prompt contains the canonical instructions for:
- How to update story statuses (Ready → Built)
- How to handle capabilities built without matching stories
- How to remove built stories from backlog
- How to create release artifacts (in `product/releases/`)
- Release template format (in `templates/product/release-template.md`)
- How to update the product specification

## 7. Execute Release Process
Follow the instructions from the prompt to create the release.

**Key requirements:**
- Only include stories confirmed by PM in the release
- Update story files: status Ready → Built, add build date from git timestamp
- **Remove built stories from `knowledge/product/backlog.md`**
- Create release artifact in `product/releases/`
- Update `knowledge/product/product-spec.md` with newly built capabilities
- **Add built stories to product spec appendix**
- **Create entries for capabilities built without matching stories**
- **Update `product/releases/README.md`** with the new release (see step 7a)

## 7a. Update Releases README
**After creating the release artifact, update `product/releases/README.md`:**

- Add the new release to the table in the "Release Files" section
- Format: `| [release-{number}-{date}.md](release-{number}-{date}.md) | {date} | {count} stories |`
- Keep releases in reverse chronological order (newest first)

Example update:
```markdown
| Release | Date | Stories |
|---------|------|---------|
| [release-004-2025-12-09.md](release-004-2025-12-09.md) | 2025-12-09 | 1 story |
| [release-003-2025-12-09.md](release-003-2025-12-09.md) | 2025-12-09 | 1 story |
| [release-002-2025-12-06.md](release-002-2025-12-06.md) | 2025-12-06 | 1 story |
| [release-001-2025-11-20.md](release-001-2025-11-20.md) | 2025-11-20 | 24 stories |
```

## 7b. Update Stories Index Files
**For each story marked as Built, update its iteration's `stories-index.md`:**

- Find the story's iteration directory: `product/iterations/{iteration}/stories/stories-index.md`
- Update the story's Status from `Ready` to `Built` in the stories table
- This keeps the iteration's story index in sync with individual story files

Example: If STORY-052 was built in iteration 2025-12-08-final-fixes:
```markdown
| STORY-052 | Optional Questions Bug Fix | Critical | S | Built |
```

## 8. Record Timing and Report Results
- Capture the end timestamp
- Calculate duration in seconds (this is the generation time for the release)
- Append to centralized timing log at `product/metrics/timing-log.jsonl`:
  ```json
  {"timestamp": "{end_timestamp}", "command": "/rel", "iteration": null, "release": "{release_number}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "duration_seconds": {duration}, "generation_seconds": {duration}, "status": "success", "metadata": {"stories_built": {count}, "capabilities_without_stories": {count}}}
  ```
  Note: For `/rel`, `generation_seconds` equals `duration_seconds` since the operation is primarily AI generation (git analysis, release notes, spec updates).
- Tell the user:
  - Release is complete
  - X stories marked as Built and removed from backlog
  - Z capabilities built without matching stories (if any)
  - Product spec updated with new capabilities
  - Path to release artifact
  - The operation duration

# Important Notes

- **Git log is the source of truth** for what was built
- **Do not assume stories were built** - confirm each one through git evidence and PM interview
- The prompt file contains detailed release logic
- Users can customize release behavior by editing `prompts/product/release-and-update-spec.md`
- Stories go directly from Ready to Built (no intermediate "Building" status)
- Release process is atomic: git analysis → PM confirmation → story updates → remove from backlog → product spec
- Release artifacts are stored in `product/releases/` (not iteration-specific, since iterations can be concurrent)
- Use the template in `templates/product/release-template.md` for release format
- **Track capabilities built without stories** - these represent gaps in the planning process
