# Stories Index: 2025-12-08-final-fixes

**Iteration**: 2025-12-08-final-fixes
**Created**: 2025-12-08
**Template**: LLM Developer
**Granularity**: Coarse

## Summary

| Priority | Count |
|----------|-------|
| Critical | 1 |
| High | 2 |
| Low | 3 |
| **Total** | **6** |

**Total Estimated Effort**: 6 x Small = ~6-12 days

## Stories

| ID | Title | Priority | Size | Status |
|----|-------|----------|------|--------|
| STORY-052 | Optional Questions Bug Fix | Critical | S | Ready |
| STORY-053 | Admin Password Protection | High | S | Ready |
| STORY-054 | Sticky Survey Header | Low | S | Ready |
| STORY-055 | Chaos Mode Theme | Low | S | Ready |
| STORY-056 | Question Numbers Display | Low | S | Ready |
| STORY-057 | Connection Types Missing "Other" Checkbox | High | S | Ready |

## Story Details

### STORY-052: Optional Questions Bug Fix
**File**: `story-052-optional-questions-fix.md`

Fix validation that incorrectly requires all questions to be answered. Users must be able to submit surveys with any number of questions answered (including zero).

### STORY-053: Admin Password Protection
**File**: `story-053-admin-password-protection.md`

Add shared password protection to admin routes. Password configured via environment variable. Session-based authentication.

### STORY-054: Sticky Survey Header
**File**: `story-054-sticky-header.md`

Fix the header and progress bar to the top of the viewport so they remain visible while users scroll through the survey questions.

### STORY-055: Chaos Mode Theme
**File**: `story-055-chaos-mode.md`

Add a "chaos mode" theme option that renders the survey with wild, random colors. Dependent on dark mode (STORY-047) being implemented first.

### STORY-056: Question Numbers Display
**File**: `story-056-question-numbers.md`

Display question numbers on each survey question (e.g., "Question 1 of 19") to help participants understand their position in the survey.

### STORY-057: Connection Types Missing "Other" Checkbox
**File**: `story-057-connection-types-other-checkbox.md`

Add missing "Other (please specify)" checkbox to Question 4 (Connection Types). Currently only the text field exists without the corresponding checkbox option.

## Dependencies

```
STORY-052 (Optional Questions Fix)
  └── No dependencies

STORY-053 (Admin Password Protection)
  └── STORY-045 (Admin Overview Page) - already built

STORY-054 (Sticky Survey Header)
  └── No dependencies

STORY-055 (Chaos Mode Theme)
  └── STORY-047 (Dark Mode) - from dark-mode iteration

STORY-056 (Question Numbers Display)
  └── No dependencies

STORY-057 (Connection Types Missing "Other" Checkbox)
  └── No dependencies
```

## Implementation Order

1. **STORY-052** - Critical bug fix, unblocks survey submissions
2. **STORY-053** - Required before production deployment
3. **STORY-057** - Bug fix for missing "Other" checkbox on Q4
4. **STORY-054** - UX improvement, can be done anytime
5. **STORY-055** - Fun feature, requires dark mode first
6. **STORY-056** - UX improvement, can be done anytime
