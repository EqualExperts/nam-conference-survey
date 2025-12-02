# Story Maps

This directory contains Miro board synchronization data for the iteration's story map.

## Files

### miro-metadata.json
Technical metadata for bidirectional sync between Miro and story files:
- Board identifiers (board_id, board_url)
- Item IDs mapping story cards to Miro elements
- Swim lane Y-coordinates for priority detection
- Sync timestamps and direction

## Workflow

### /map - Create Story Map
Creates a Miro board from iteration stories:
1. Reads stories from `../stories/`
2. Creates board with activity columns and story cards
3. Positions cards by priority in swim lanes (NOW/NEXT/LATER)
4. Saves metadata to `miro-metadata.json`

### /demap - Sync Priorities Back
Reads Miro board state and updates story files:
1. Reads `miro-metadata.json` for board ID and swim lane positions
2. Gets current card positions from Miro API
3. Determines priority from Y-coordinate vs swim lane boundaries
4. Updates story file metadata (Priority, Status, Last Synced)
5. Handles new cards (prompts for story details) and removed cards (archive/backlog)

## Color Coding Legend

**Story Types:**
| Color | Type | Usage |
|-------|------|-------|
| Yellow | User Story | Standard feature work |
| Cyan | Infrastructure | Database, APIs, architecture |
| Violet | Spike/Research | Investigation, POCs |
| Light Blue | Quality/Testing | Accessibility, performance, security |
| Orange | Risk/Assumption | Items needing validation |
| Red | Bug/Defect | Fixing broken functionality |
| Light Green | Refactoring | Tech debt, code cleanup |
| Gray | Documentation | Guides, runbooks |

**Board Elements:**
| Color | Element |
|-------|---------|
| Blue | Activity headers (columns) |
| Gray | Persona legend, swim lane anchors |
| Black | Swim lane connector lines |

## Swim Lane Structure

```
[Stories positioned here are NOW priority]
─────────── NOW ↑ ───────────
[Stories positioned here are NEXT priority]
─────────── NEXT ↑ ───────────
[Stories positioned here are LATER priority]
─────────── LATER ↑ ───────────
```

The `/demap` command uses Y-coordinates from metadata to classify each card's priority.
