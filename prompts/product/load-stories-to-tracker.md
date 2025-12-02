# Load User Stories to Issue Tracker

Use this prompt to load user stories from markdown files into your issue tracker (Jira, Linear, etc.) via MCP.

## Prerequisites

1. Stories have been generated using `extract-user-stories.md`
2. Story files are in `product/requirements/[CYCLE-NAME]/`
3. MCP server for your issue tracker is configured (e.g., Atlassian MCP for Jira)

## Required Input

**Project Key/ID**: [e.g., "PROD", "ENG-123"]
**Issue Type**: [e.g., "Story", "Task", "User Story" - check your project for available types]
**Story Files**: [Specify which stories to load, e.g., "story-001-*.md through story-005-*.md"]
**Default Assignee** (optional): [Account ID or leave blank for unassigned]

## Context Files to Review

- The specific story files you want to load
- `product/requirements/user-stories/stories-by-cycle.md` (for context)
- `product/context/target-users.md` (if you need to map personas to assignees)

## Instructions

For each story file specified:

1. **Read the story file** to extract:
   - Title (from the header)
   - User story text (from "User Story" section)
   - Acceptance criteria (entire "Acceptance Criteria" section)
   - Priority (from header metadata)
   - Labels (from header metadata)
   - Story points/estimate (from "Estimate" section)
   - Epic (from header metadata, if specified)

2. **Format the description** for the issue tracker:
   ```
   As a [persona],
   I want to [action],
   So that [benefit].

   ## Source
   Discovery Cycle: [cycle name]
   User Need: [JTBD]

   ## Acceptance Criteria
   [Full acceptance criteria section with scenarios]
   ```

3. **Create the issue** using the appropriate MCP tool:
   - Title: Story title
   - Description: Formatted description from step 2
   - Issue Type: As specified in input
   - Project: As specified in input
   - Priority: Map MoSCoW to tracker priorities:
     - "Must have" → Highest/High
     - "Should have" → Medium
     - "Could have" → Low
     - "Won't have" → Lowest (or don't create)
   - Labels: Use labels from story metadata
   - Story Points: Use estimate if provided

4. **Track created issues**:
   - After creating each issue, note the issue key/ID
   - Prepare a summary mapping story files to issue keys

5. **Handle errors gracefully**:
   - If an issue fails to create, note which story file failed
   - Continue with remaining stories
   - Provide summary of successes and failures

## Output

After loading all stories, provide a summary:

```markdown
## Story Import Summary

### Successfully Created
| Story File | Issue Key | Title | Priority |
|------------|-----------|-------|----------|
| story-001-user-login.md | PROD-123 | User Login | High |
| story-002-dashboard.md | PROD-124 | Dashboard View | Medium |

### Failed to Create
| Story File | Reason |
|------------|--------|
| story-003-export.md | Missing required field: Epic |

### Next Steps
1. Review failed imports and address issues
2. Update story files with issue tracker keys for reference
3. Set up any dependencies between issues in tracker
```

## Notes

**For Jira via Atlassian MCP**:
- Use `mcp__atlassian__createJiraIssue` tool
- Get project key from project settings
- Check available issue types with `mcp__atlassian__getVisibleJiraProjects`
- Get issue type metadata if needed: `mcp__atlassian__getJiraProjectIssueTypesMetadata`

**For other trackers**:
- Adapt the tool calls to your specific MCP server
- The story markdown format is designed to be compatible with most trackers

**Best practices**:
- Start with a small batch (2-3 stories) to verify formatting
- Validate project key and issue type before bulk import
- Keep story markdown files as the source of truth
- Reference issue tracker keys in story files after import
