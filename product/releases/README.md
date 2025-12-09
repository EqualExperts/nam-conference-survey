# Releases

Release artifacts documenting what was built and deployed.

## Release Files

| Release | Date | Stories |
|---------|------|---------|
| [release-004-2025-12-09.md](release-004-2025-12-09.md) | 2025-12-09 | 1 story |
| [release-003-2025-12-09.md](release-003-2025-12-09.md) | 2025-12-09 | 1 story |
| [release-002-2025-12-06.md](release-002-2025-12-06.md) | 2025-12-06 | 1 story |
| [release-001-2025-11-20.md](release-001-2025-11-20.md) | 2025-11-20 | 24 stories |

## Release Format

Each release file contains:
- Stories built (with iteration source)
- Capabilities built without matching stories
- Git commits included
- Product spec updates made

## Workflow

Releases are created via `/rel` command which:
1. Analyzes git history for what was built
2. Matches commits to stories
3. Updates story status to Built
4. Removes built stories from backlog
5. Updates product spec
