# Prompt: Create Miro Story Map from Requirements

This prompt guides Claude in creating a production-grade story map in Miro from epic and user story markdown files.

## Overview

You will create a visual story map on a Miro board that organizes user stories by:
- **Activities** (vertical columns) - Major user activities or measurement areas
- **Release Priority** (horizontal swim lanes) - Critical/High (NOW), Medium (NEXT), Low (LATER)
- **Story Type** (color coding) - Infrastructure, Quality/Testing, Regular stories, etc.

## Input Files

You will read the following files from `product/requirements/{cycle-name}/`:

1. **Epic file**: `epic-{number}-{slug}.md`
   - Contains epic title, description, and high-level goals
   - May contain activity groupings in the description

2. **Story files**: `story-{number}-{slug}.md` (all files matching pattern)
   - Each contains: title, description, acceptance criteria, size estimate, priority
   - Look for metadata fields: `Priority`, `Size`, `Type`

3. **Summary file**: `STORIES-SUMMARY.md`
   - Contains MoSCoW prioritization (Must/Should/Could/Won't Have)
   - Grouped by release or activity

## Step 1: Analyze Requirements

### Extract Activities
- Read the epic description and story groupings
- Identify 3-6 major activities or measurement areas
- Activities should represent the horizontal user journey
- Common patterns:
  - User journey steps (Discover → Research → Purchase → Use)
  - Measurement areas (Satisfaction, Logistics, Outcomes, Effectiveness)
  - Feature categories (Foundation, Core Features, Advanced Features)

### Classify Stories by Type
Examine each story to determine its type:
- **Regular**: Standard user-facing feature work (most stories)
- **Infrastructure**: Database, APIs, deployment, architecture (look for "schema", "API", "deploy")
- **Quality/Testing**: Accessibility, performance, security, load testing (look for "WCAG", "test", "performance")
- **Spike**: Investigation, prototypes, POCs, technical decisions (look for "spike", "research", "investigate")
- **Documentation**: User guides, API docs, runbooks (look for "documentation", "guide", "README")
- **Refactoring**: Code cleanup without new features (look for "refactor", "cleanup", "tech debt")

### Extract Priority
From STORIES-SUMMARY.md or story metadata:
- **Critical/High**: Walking skeleton, critical path stories → NOW swim lane
- **Medium**: Important enhancements for next release → NEXT swim lane
- **Low**: Nice to have features, deferred work → LATER swim lane

### Identify Personas
- Look for persona references in stories (emoji prefixes like 📋, 👥, 🎯)
- Common personas: End Users, Administrators, Developers, Stakeholders
- Extract persona names and emojis

## Step 2: Create Miro Board

### Create the Board
```
Use mcp__miro__create-board:
- name: "Story Map - {cycle-date} - {epic-title}"
- description: "Story map for {cycle-name}"
- sharingPolicy: "edit" (team can collaborate)
```

### Calculate Layout Positions

**Board Layout:**
- Epic header at top: (x: -575, y: -900)
- Activity headers row: y: -600, spaced 600px apart starting at x: -1200
- Story cards: Grid beneath activity headers
- Persona legend: Right side at (x: 1600, y: -600)
- Swim lanes: Horizontal connectors dividing priority sections

**Activity Column Positions** (for 5 activities):
- Column 1: x: -1200
- Column 2: x: -600
- Column 3: x: 0
- Column 4: x: 600
- Column 5: x: 1200

**Story Card Spacing:**
- Vertical spacing between cards: 200px
- Horizontal spacing between columns: 600px
- Card dimensions: 199px width × 228px height (Miro default for square sticky notes)

**Swim Lane Positions** (consistent gaps):
- **NOW section**:
  - Stories: y: -400, -200, 0, 200, 400 (up to 16 cards across 5 columns)
  - Connector: y: 675
  - Label: y: 625
  - Gap: ~161px from last card (bottom at 514) to connector

- **NEXT section**:
  - First story: y: 889
  - Additional stories: y: 1139, 1389 (250px spacing, capacity for 3 vertically)
  - Connector: y: 1653
  - Label: y: 1603
  - Gap: ~214px from connector to first card

- **LATER section**:
  - First story: y: 1867
  - Additional stories: y: 2117, 2367 (250px spacing, capacity for 3 vertically)
  - Connector: y: 2631
  - Label: y: 2581
  - Gap: ~214px from connector to first card

## Step 3: Create Board Items

### 3.1 Epic Header (Text Item)
```
mcp__miro__create-text-item:
  data: { content: "Story Map - {Epic Title} - {cycle-name}" }
  position: { x: -575, y: -900 }
  style: { color: "#000000", fontSize: 48, textAlign: "left" }
  geometry: { width: 1600 }
```

### 3.2 Activity Headers (Sticky Notes)
For each activity (blue color, differentiated from quality/testing cards):
```
mcp__miro__create-sticky-note-item:
  data: { content: "{Activity Name}", shape: "rectangle" }
  position: { x: {column_x}, y: -600 }
  style: { fillColor: "blue" }
```

**Important**: Activity names should be concise, no stakeholder references.

### 3.3 Story Cards (Sticky Notes)

**Card Content Format:**
```
{persona_emoji} STORY-{number}
{title_abbreviated}
{key_details}

{size} ({effort})
{priority}
```

Example:
```
📋 STORY-001
Question-Level Transparency

S (1-2 days)
Must Have
```

**Color Scheme by Type:**
- Yellow (light_yellow): Regular user stories
- Cyan: Infrastructure/Technical
- Violet (purple): Spikes/Research
- Light Blue: Quality/Testing/Compliance
- Orange (light_orange): Risk/Assumption cards
- Red: Bugs/Defects
- Light Green: Refactoring/Tech Debt
- Gray: Documentation

**Positioning Algorithm:**
1. Group stories by activity (column)
2. Within each activity, sort by priority (Must → Should → Could)
3. Assign y-coordinates based on priority:
   - Critical/High → NOW section (y: -400 to 400)
   - Medium → NEXT section (y: 889+)
   - Low → LATER section (y: 1867+)
4. Stack multiple stories in same activity+priority vertically (200px spacing)

**Create each story card:**
```
mcp__miro__create-sticky-note-item:
  data: {
    content: "{formatted_content}",
    shape: "square"
  }
  position: { x: {column_x}, y: {calculated_y} }
  style: { fillColor: "{color_by_type}" }
```

### 3.4 Persona Legend (Sticky Note)
```
mcp__miro__create-sticky-note-item:
  data: {
    content: "PERSONAS\n\n{emoji1} {Persona 1}\n{emoji2} {Persona 2}...",
    shape: "square"
  }
  position: { x: 1600, y: -600 }
  style: { fillColor: "gray" }
```

### 3.5 Swim Lane Separators (Connectors)

For each swim lane (NOW, NEXT, LATER), create 3 items:

**A. Anchor Points (2 gray sticky notes)**
```
mcp__miro__create-sticky-note-item:
  data: { content: " ", shape: "square" }
  position: { x: -1375, y: {connector_y} }  # Left anchor
  geometry: { width: 20 }
  style: { fillColor: "gray" }

mcp__miro__create-sticky-note-item:
  data: { content: " ", shape: "square" }
  position: { x: 1375, y: {connector_y} }   # Right anchor
  geometry: { width: 20 }
  style: { fillColor: "gray" }
```

**B. Connector Line**
```
mcp__miro__create-connector:
  startItem: { id: "{left_anchor_id}" }
  endItem: { id: "{right_anchor_id}" }
  style: {
    strokeColor: "#000000",
    strokeWidth: 12,
    strokeStyle: "normal"
  }
```

**C. Text Label**
```
mcp__miro__create-text-item:
  data: { content: "{NOW/NEXT/LATER} ↑" }
  position: { x: -1300, y: {label_y} }  # 50px above connector
  style: { color: "#000000", fontSize: 24, textAlign: "left" }
```

**Swim Lane Coordinates:**
- NOW: connector_y: 675, label_y: 625
- NEXT: connector_y: 1653, label_y: 1603
- LATER: connector_y: 2631, label_y: 2581

## Step 4: Save Metadata

### 4.1 Create miro-metadata.json
Save comprehensive metadata to `product/story-maps/{cycle-name}/miro-metadata.json`:

```json
{
  "board_id": "{board_id}",
  "board_name": "{board_name}",
  "board_url": "https://miro.com/app/board/{board_id}",
  "cycle": "{cycle-name}",
  "epic": "{epic_number}",
  "created_at": "{ISO8601_timestamp}",
  "last_synced_at": "{ISO8601_timestamp}",
  "sync_direction": "markdown_to_miro",
  "refinements_applied": {
    "title_formatting": true,
    "persona_emojis": true,
    "persona_legend": true,
    "swim_lanes": true,
    "color_by_story_type": true,
    "stories_above_swim_lanes": true
  },
  "items": {
    "epic_header": {
      "id": "{item_id}",
      "type": "text",
      "content": "{content}",
      "style": { "color": "#000000", "fontSize": 48, "textAlign": "left", "width": 1600 },
      "position": { "x": -575, "y": -900 }
    },
    "persona_legend": {
      "id": "{item_id}",
      "type": "sticky_note",
      "content": "{content}",
      "color": "gray"
    },
    "swim_lanes": [
      {
        "label_id": "{label_id}",
        "label_content": "NOW ↑",
        "connector_id": "{connector_id}",
        "anchor_left_id": "{anchor_id}",
        "anchor_right_id": "{anchor_id}",
        "type": "connector",
        "label_position": { "x": -1300, "y": 625 },
        "connector_y": 675,
        "connector_style": { "strokeColor": "#000000", "strokeWidth": 12 },
        "anchor_color": "gray",
        "stories_above": "001-016 positioned at y: -400 to 400",
        "capacity": "16 stories (5 columns × 4 rows)",
        "spacing": "161px gap from last card to connector"
      }
      // ... NEXT and LATER swim lanes
    ],
    "activity_headers": [
      {
        "id": "{item_id}",
        "type": "sticky_note",
        "content": "{activity_name}",
        "color": "blue"
      }
      // ... additional activities
    ],
    "must_have_stories": {count},
    "should_have_stories": {count},
    "could_have_stories": {count},
    "total_story_cards": {count}
  },
  "statistics": {
    "total_items_created": {count},
    "story_cards": {count},
    "activity_headers": {count},
    "text_items": {count},
    "persona_legend": 1,
    "swim_lane_connectors": 3,
    "swim_lane_labels": 3,
    "swim_lane_anchors": 6,
    "api_items": {count},
    "deleted_items": 0
  },
  "story_colors": {
    "yellow": {count},
    "cyan": {count},
    "light_blue": {count},
    "violet": {count}
  },
  "personas": {
    "{persona_key}": {
      "emoji": "{emoji}",
      "name": "{name}",
      "story_count": {count}
    }
  }
}
```

## Error Handling

- If Miro MCP is not available: Inform user and exit gracefully
- If board creation fails: Report error with details
- If any item creation fails: Log the error but continue with remaining items
- If metadata save fails: Warn user but don't fail the entire operation

## Best Practices

1. **Create all items before updating any**: Collect item IDs first, then make any position adjustments
2. **Batch related operations**: Create all story cards together, all swim lanes together
3. **Save metadata immediately**: Don't wait until the end - save after each major section
4. **Provide progress updates**: Tell the user when each major section completes
5. **Validate inputs**: Check that all required files exist before starting
6. **Handle Miro API quirks**:
   - Shapes API is broken (don't use create-shape-item)
   - Use connectors with anchors for swim lanes
   - Gray is the lightest color available (no white)
   - Square sticky notes need only width in geometry (height auto-calculated)

## Final Output

After completing the story map, tell the user:

```
✅ Story map created successfully!

📊 **Miro Board**: [View Story Map](https://miro.com/app/board/{board_id})

**Summary:**
- {count} stories mapped across {N} activities
- {count} Must Have (NOW) | {count} Should Have (NEXT) | {count} Could Have (LATER)
- {total_items} items created via Miro API

**Next steps:**
- Share the Miro board with your team for review
- Run `/jira` to load stories to your issue tracker
- Use the story map to facilitate sprint planning discussions
```
