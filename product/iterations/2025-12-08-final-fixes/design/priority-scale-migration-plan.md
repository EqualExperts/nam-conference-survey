# Plan: Standardize Priority Scale to Critical/High/Medium/Low

## Problem Statement

The backlog currently shows inconsistent priority values:
- **MoSCoW scale**: "Must Have", "Should Have", "Could Have", "Won't Have"
- **Simple scale**: "High" (used in STORY-047)
- **Release-based**: "NOW", "NEXT", "LATER" (used in story maps)

This inconsistency makes it difficult to compare priorities across stories and iterations.

## Proposed Solution

Standardize all priority fields to: **Critical / High / Medium / Low**

### Mapping from Old to New

| Old Value | New Value | Rationale |
|-----------|-----------|-----------|
| Must Have | Critical | Core functionality, blocks release |
| Should Have | High | Important, strong business value |
| Could Have | Medium | Nice to have, lower urgency |
| Won't Have | Low | Deferred, may not be built |
| NOW | Critical | Immediate priority |
| NEXT | High | Next in queue |
| LATER | Medium | Future consideration |

---

## Files to Update

### Phase 1: Framework Files (Templates & Prompts)

These define the scale and must be updated first:

| File | Line(s) | Current | Change |
|------|---------|---------|--------|
| `templates/product/story-template-human-dev.md` | 10 | `[Must have/Should have/Could have/Won't have]` | `[Critical/High/Medium/Low]` |
| `templates/product/story-template-llm-dev.md` | 10 | `[Must have/Should have/Could have/Won't have]` | `[Critical/High/Medium/Low]` |
| `templates/product/synthesis-template.md` | 98, 113 | `[Must Have / Should Have / Could Have]` | `[Critical / High / Medium / Low]` |
| `templates/product/interview-template.md` | 80 | `Must have` example | `Critical` example |
| `templates/product/backlog-template.md` | - | No scale defined | Add note about priority scale |
| `prompts/product/create-story-map.md` | 9 | `Must Have (NOW), Should Have (NEXT), Could Have (LATER)` | `Critical (NOW), High (NEXT), Medium (LATER)` |
| `prompts/product/load-stories-to-tracker.md` | 57-60 | MoSCoW → Jira mapping | Critical/High/Medium/Low → Jira mapping |
| `.claude/commands/demap.md` | 131, 139 | NOW/NEXT/LATER | Critical/High/Medium (keep swim lane names, map to new priorities) |

### Phase 2: Existing Data Files

Migrate existing stories and backlog to new scale:

**Backlog:**
- `knowledge/product/backlog.md` - Convert all priority values

**Stories by Iteration:**

| Iteration | Story Count | Current Priorities |
|-----------|-------------|-------------------|
| 2025-12-08-final-fixes | 2 | Must Have |
| 2025-12-02-admin-page | 6 | Must Have, Should Have |
| 2025-12-02-dark-mode | 1 | High |
| 2025-11-12-mvp | 26+ | Must Have, Should Have, Could Have |
| Archive stories | 18 | Various |

---

## Execution Order

1. **Update framework files** (Phase 1) - Sets the standard for future stories
2. **Update backlog** - Master index, most visible
3. **Update recent iteration stories** (2025-12-08, 2025-12-02) - Active work
4. **Update MVP iteration stories** (2025-11-12) - Historical but may be referenced
5. **Update archive stories** (optional) - Low priority, historical record only

---

## Estimated Effort

- Phase 1 (Framework): ~15 minutes (8 files, simple text replacements)
- Phase 2 (Backlog): ~5 minutes (1 file, 9 stories)
- Phase 2 (Recent stories): ~10 minutes (~9 story files)
- Phase 2 (MVP stories): ~15 minutes (~26 story files)
- Phase 2 (Archive): ~10 minutes (optional, 18 files)

**Total**: ~45-55 minutes

---

## Validation

After migration:
- [ ] All templates use Critical/High/Medium/Low
- [ ] All prompts reference new scale
- [ ] Backlog shows consistent priorities
- [ ] Story files in active iterations updated
- [ ] No MoSCoW terminology remains in framework files

---

## Questions for Mike

1. **Archive stories**: Should we update the archived stories in `2025-11-12-mvp/stories/archive/`? These are historical and not used, but inconsistency may be confusing if referenced.

2. **Story map swim lanes**: The `/map` command uses NOW/NEXT/LATER as visual swim lane names. Should these change to Critical/High/Medium, or keep the release-timing names but map to the new priorities?

3. **Proceed?**: Approve this plan to begin execution.
