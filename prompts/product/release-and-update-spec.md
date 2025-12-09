# Release from Git History and Update Product Specification

This prompt provides canonical instructions for creating a release from git history, matching what was built to stories, and updating the product specification.

## Required Input
- **Iteration**: Which iteration to release
- **Git History**: Commits from the build period (analyzed via git log)

## Core Principle: Evidence-Based Confirmation

**Do NOT assume all stories were built.** Only mark a story as Built when:
1. Git commit evidence shows the capability was implemented
2. PM confirms the story acceptance criteria were met

This prevents false positives where stories are marked complete but weren't actually delivered.

## Process Steps

### 1. Analyze Git History

**Extract build information from git:**

```bash
# Get recent commits
git log --oneline -30

# For each feature commit, get details
git show {commit-hash} --no-patch --format="%B"
git show {commit-hash} --stat --no-patch

# Get commit timestamp for build date
git show {commit-hash} --no-patch --format="%ci"
```

**For each commit, extract:**
- Commit hash (short)
- Timestamp (becomes build date)
- Author
- Commit message (full)
- Files changed (from --stat)
- Capabilities/features mentioned

**Build a capability inventory** listing everything mentioned in git commits.

### 2. Match Git Evidence to Stories

**For each story in the iteration:**

a. **Read the story file** from `product/iterations/{iteration}/stories/story-{number}-*.md`

b. **Compare against git evidence:**
   - Does the git history mention this capability?
   - Do the files changed align with what this story requires?
   - Does the commit message detail match the story's acceptance criteria?

c. **Classify each story:**
   - **Confirmed Built**: Clear git evidence + matches acceptance criteria
   - **Likely Built**: Git evidence suggests it, but needs PM confirmation
   - **Not Built**: No git evidence for this capability
   - **Partially Built**: Some acceptance criteria met, others not

### 3. Confirm with PM

**Use AskUserQuestion tool to confirm uncertain stories.**

For each "Likely Built" or "Partially Built" story:
- Present the story title and key acceptance criteria
- Show the git evidence found (or lack thereof)
- Ask PM to confirm: Built / Not Built / Partial

Example question format:
```
Story 040 (Database Storage) - Git shows PostgreSQL + Prisma implementation.
Key AC: Session tracking, all question types stored, concurrent writes.
Git evidence: "Prisma ORM with PostgreSQL database", "Survey submission endpoint"

Was this story fully completed?
```

### 4. Update Story Statuses

**For each confirmed Built story:**

a. **Read story file**

b. **Update status and add build date:**
```markdown
**Status**: Built
**Build Date**: {YYYY-MM-DD from git commit timestamp}
```

c. **Save updated story file**

**Important**: Use the git commit timestamp as the build date, not today's date.

### 5. Identify Unbuilt Stories

**Scan iteration stories:**
- List all stories still with status `Ready` or `Draft`
- These are candidates for backlog

**For each unbuilt story:**
- Show user: Story ID, title, priority
- Ask: "Move STORY-XXX to backlog? (y/n/skip)"
- If yes: Add to backlog with reason
- If no: Leave in iteration (may be planned for future build)
- If skip: User will handle manually

### 6. Track Capabilities Built Without Stories

**Critical: Identify gaps in planning.**

Compare the capability inventory from git against stories:
- What was built that doesn't match any story?
- These represent work that wasn't planned/estimated

**For each unmatched capability:**
- Note the commit hash and timestamp
- Note the capability description
- Flag for inclusion in product spec appendix
- Consider whether a retroactive story should be created

### 7. Remove Built Stories from Backlog

**Read** `product/backlog.md`

The backlog is the master index of all un-built stories. Stories are added when created via `/req` and removed when built via `/rel`.

**For each confirmed Built story:**
- Remove the story's row from the backlog table
- Update the "Last Updated" date

**Save** updated `product/backlog.md`

### 8. Create Release Artifact

**Releases are cross-iteration** - stored in `product/releases/` (not iteration-specific, since multiple iterations can be concurrent).

**Determine release number:**
- Check `product/releases/` directory
- Find highest existing release number
- New release is next sequential number

**Create release file:** `product/releases/release-{number}-{date}.md`

**Use template:** Follow the format in `product/templates/release-template.md`

**Content structure:**
```markdown
# Release {number} - {YYYY-MM-DD}

**Source**: Git commit history

---

## Stories Built: {count}

| ID | Title | Iteration |
|----|-------|-----------|
| {ID} | {Title} | {iteration} |
| {ID} | {Title} | {iteration} |

## Capabilities Built Without Stories: {count}

| Capability | Commit | Timestamp |
|------------|--------|-----------|
| {Description} | {hash} | {datetime} |

## Product Spec Updates

- {Description of product spec changes}
- Appendix includes {count} built stories

## Files Created/Updated

- {count} story files updated to Built status
- `product/backlog.md` ({new/updated})
- `product/product-spec.md` ({new/updated})
- `product/releases/release-{number}-{date}.md` (new)
- `iterations/{iteration}/timing.json` (updated)
- `artifacts/timing-log.jsonl` (appended)

## Git Commits Included

| Commit | Timestamp | Author | Description |
|--------|-----------|--------|-------------|
| {hash} | {datetime} | {author} | {message summary} |

## Metrics

- Stories in iteration: {count}
- Stories confirmed built: {count}
- Stories deferred to backlog: {count}
- Capabilities without stories: {count}

## Next Steps

- Review product spec for accuracy
- Consider backlog stories for next sprint
- Update story map if using Miro for visualization

---

*Release artifact generated by /rel command*
```

### 8a. Update Releases README

**After creating the release artifact, update `product/releases/README.md`:**

- Read the current README
- Add the new release to the "Release Files" table
- Format: `| [release-{number}-{date}.md](release-{number}-{date}.md) | {date} | {count} stories |`
- Keep releases in **reverse chronological order** (newest first)
- Save the updated README

This ensures the releases directory index stays current and discoverable.

### 9. Update Product Specification

**Read** `product/product-spec.md` (create if doesn't exist)

**For each built story:**

a. **Extract capability description** from story
b. **Identify appropriate feature area** in product spec
c. **Add capability** under that feature area

**Update Appendix with build-grouped stories:**

The appendix should group stories by build timestamp, not just list them:

```markdown
## Appendix: Build History

### Build: 2025-11-20 14:34 UTC
**Commit**: 041833fd
**Author**: Marco Vermeulen

**Stories Built**:
- **STORY-020**: Q1 - Conference Atmosphere Rating
- **STORY-021**: Q2 - Return Intent
- **STORY-022**: Q3 - Coworking Effectiveness
[... etc]

**Capabilities Without Stories**:
- Admin dashboard three-tab interface (Statistics, Responses, Users)
- JWT-based session management

### Build: 2025-11-19 00:55 UTC
**Commit**: 455a69d1
**Author**: Andy

**Stories Built**:
- **STORY-019**: Welcome Screen
- **STORY-039**: Completion Screen
- **STORY-040**: Database Storage

**Capabilities Without Stories**:
- Google OAuth authentication (later removed)
- Docker multi-container setup
- Rate limiting infrastructure
```

**Why group by build?**
- Shows the actual development timeline
- Links stories to specific commits for traceability
- Makes capabilities without stories visible
- Supports future auditing and retrospectives

**Update metadata:**
- Update "Last Updated" date
- Update version if using semantic versioning

**Save** updated `product/product-spec.md`

### 10. Handle Edge Cases

**Partial story completion:**
- If commit shows partial implementation, ask PM how to handle
- Options: Leave as Ready, create follow-up story, or note partial in release

**Stories spanning multiple commits:**
- Use the final commit timestamp as build date
- Note all relevant commits in release artifact

**Refactoring commits:**
- Don't create story entries for pure refactoring
- Note significant refactors in release artifact under "Technical Changes"

**Reverted features:**
- If a feature was committed then reverted, it's NOT built
- Check git history for reverts before confirming

## Quality Checks

Before completing release:

- [ ] Each Built story has git evidence AND PM confirmation
- [ ] Build dates come from git timestamps, not today's date
- [ ] Unbuilt Ready stories handled (backlog or left in iteration)
- [ ] Capabilities without stories are documented
- [ ] Release artifact includes all commits analyzed
- [ ] Product spec appendix grouped by build timestamp
- [ ] No stories marked Built without evidence

## Output Summary

After release, provide summary:

```
## Release Complete

**Release**: {number} for iteration {iteration-name}

**Stories Confirmed Built**: {count}
- STORY-XXX: {title} (Build: {date}, Commit: {hash})
- STORY-YYY: {title} (Build: {date}, Commit: {hash})

**Stories Removed from Backlog**: {count}

**Capabilities Built Without Stories**: {count}
- {Capability}: {commit hash}
- {Capability}: {commit hash}

**Product Spec Updates**:
- Added {count} capabilities across {count} feature areas
- Appendix now shows {count} total built stories

**Files Updated**:
- {count} story files updated to Built status
- product/backlog.md ({count} stories removed)
- product/product-spec.md
- product/releases/release-{number}-{date}.md

**Action Items**:
- Review capabilities without stories for future planning
- Review backlog for next story to build
```

## Notes

- **Git log is the source of truth** - don't trust assumptions
- **PM confirmation required** - prevents false positives
- **Track unplanned work** - capabilities without stories reveal planning gaps
- **Build timestamps matter** - use git dates, not release date
- Release should be run after each significant build
- Product spec should always reflect current verified state
