# Stories Summary - NAM Conference Survey MVP

**Epic**: EPIC-001 - NAM Conference Feedback Collection MVP
**Discovery Cycle**: 2025-11-12-mvp
**Total Stories**: 18 stories
**Extraction Date**: 2025-11-17

## Story List by Priority

### Must Have (Walking Skeleton) - 16 Stories

1. **STORY-001: Question-Level Transparency System** - S (1-2 days)
   - Transparency note beneath all 19 questions explaining data usage
   - Addresses black hole effect and builds trust

2. **STORY-002: Zero Mandatory Fields Design** - XS (<1 day) - **CRITICAL**
   - All 19 questions optional to prevent abandonment
   - Hard requirement from Sarah Aslanifar interview

3. **STORY-003: Immediate Acknowledgment Page** - XS (<1 day)
   - Confirmation message post-submission
   - Addresses black hole effect

4. **STORY-004: Mobile-First Responsive Design** - M (3-5 days)
   - 375px-1920px width support
   - Enables in-conference phone completion

5. **STORY-005: CSV Export with Demographic Headers** - M (3-5 days)
   - Raw data export for Lauren's custom analysis
   - 34 columns: 19 questions + 12 comments + 3 demographics

6. **STORY-006: Optional Comment Boxes (12 Total)** - S (1-2 days)
   - Text fields beneath select questions
   - Balances structure with qualitative depth

7. **STORY-007: Likert Scale Questions (9 Total)** - M (3-5 days)
   - Quantitative measurement across Katie's 4 areas
   - Questions: Q1, Q2, Q3, Q5, Q6, Q8, Q10, Q13, Q16

8. **STORY-008: Multiple Select Checkbox Questions (2 Total)** - S (1-2 days)
   - Q4 (Connection Quality), Q17 (Feedback Confidence)
   - Captures multi-dimensional feedback

9. **STORY-009: Choice Ranking Question (1 Total)** - M (3-5 days)
   - Q11 (Session Format Preferences)
   - Lauren's quantitative prioritization data

10. **STORY-010: Open-Ended Text Questions (3 Total)** - S (1-2 days)
    - Q7, Q14, Q15
    - Qualitative insights for Katie

11. **STORY-011: Demographics Questions (2 Total)** - S (1-2 days)
    - Q18 (Employment Status), Q19 (Name/Location)
    - Enables Lauren's segmentation analysis

12. **STORY-012: N/A Option Handling (4 Questions)** - XS (<1 day)
    - Q3, Q8, Q10, Q13
    - Distinguishes non-applicable from low ratings

13. **STORY-013: Accessibility Compliance (WCAG 2.1 AA)** - M (3-5 days)
    - Screen reader, keyboard nav, color contrast
    - Inclusive design requirement

14. **STORY-014: Load Testing for Concurrent Users** - S (1-2 days)
    - 40 concurrent users support
    - Prevents in-conference scheduled activity failure

15. **STORY-015: Equal Experts Branding** - XS (<1 day)
    - Logo, colors, typography
    - Professional appearance

16. **STORY-016: Database Schema & Data Storage** - M (3-5 days)
    - Foundation for all functionality
    - Nullable columns, proper data types

### Should Have (Release 2) - 1 Story

17. **STORY-017: Progress Indicator** - XS (<1 day)
    - "Question X of 19" display
    - Helps users manage time

### Could Have (Nice to Have) - 1 Story

18. **STORY-018: Save Draft Functionality** - L (1-2 weeks)
    - Save/resume incomplete surveys
    - Significant complexity justifies deferral

## Effort Summary

**Must Have Stories (16):**
- XS (< 1 day): 5 stories = ~2-3 days
- S (1-2 days): 5 stories = ~5-10 days
- M (3-5 days): 6 stories = ~18-30 days

**Total Must-Have Effort**: ~25-43 days if sequential
**Parallelizable**: Frontend (questions) + Backend (storage/export) = ~15-25 days with 2-3 developers

**Should Have Stories (1):**
- XS: 1 story = <1 day

**Could Have Stories (1):**
- L: 1 story = ~5-10 days

**Grand Total**: ~30-54 days (all stories)
**MVP (Must-Have Only)**: ~25-43 days

## Priority Breakdown

| Priority | Count | Effort Range |
|----------|-------|--------------|
| Must have | 16 | 25-43 days |
| Should have | 1 | <1 day |
| Could have | 1 | 5-10 days |
| **TOTAL** | **18** | **30-54 days** |

## Coverage of Katie's 4 Measurement Areas

### 1. Emotional Sentiment
- Q1: Overall Conference Rating (STORY-007)
- Q2: Return Attendance Intent (STORY-007)
- Q8: Saturday Personal Time Worth (STORY-007) - **CRITICAL**
- Q14: What You Liked Most (STORY-010)

### 2. Logistics Feedback
- Q9: Pre-Conference Communication (STORY-007)
- Q10: Accommodations, Venue & Catering (STORY-007)
- Q12: Conference Length (STORY-007)

### 3. Learning Outcomes
- Q6: Learning Value (STORY-007)
- Q7: Future Learning Topics (STORY-010)
- Q13: Comparison to Other Professional Development (STORY-007)

### 4. Networking Effectiveness
- Q3: Coworking Day Effectiveness (STORY-007)
- Q4: Connection Quality - Who (STORY-008)
- Q5: Connection Depth (STORY-007)

**Coverage**: ✅ All 4 areas fully covered

## Key Dependencies

**Foundation Stories (Must Complete First):**
- STORY-016 (Database Schema) → Enables STORY-005 (CSV Export)
- STORY-004 (Mobile-First Design) → Enables all question stories (007-012)
- STORY-002 (Zero Mandatory) → Design pattern for all question stories

**Parallel Workstreams Possible:**
1. **Frontend Team**: STORY-001, 002, 003, 004, 006-012, 015, 017
2. **Backend Team**: STORY-016, 005, 014
3. **QA Team**: STORY-013 (Accessibility), STORY-014 (Load Testing)

## Critical Path for MVP (48-Hour Sprint)

**Day 1 (Nov 18):**
1. STORY-016: Database Schema (foundation) - 6-8 hours
2. STORY-004: Mobile-First Design (foundation) - 6-8 hours
3. STORY-002: Zero Mandatory Fields - 2-4 hours
4. STORY-015: EE Branding - 2-4 hours

**Day 2 (Nov 19):**
1. STORY-007: Likert Scale Questions - 6-8 hours
2. STORY-010: Open-Ended Text Questions - 3-5 hours
3. STORY-001: Transparency Notes - 3-5 hours
4. STORY-003: Acknowledgment Page - 2-3 hours
5. Testing: STORY-013, STORY-014 - 4-6 hours

**Deferred to Post-Testing:**
- STORY-005: CSV Export (can add after testing deadline)
- STORY-006: Optional Comments (can add to questions incrementally)
- STORY-008, 009, 011, 012: Additional question types
- STORY-017, 018: Nice-to-have features

**Minimum Viable for Nov 19 Testing:**
- STORY-001, 002, 003, 004, 007, 010, 015, 016 = ~8 stories
- Covers Katie's 4 areas with Likert + Open-ended
- Achieves core transparency + completion optimization goals

## Story Files Location

All stories saved to:
```
/Users/mike/dev/NAM-Conf-Survey/product/requirements/2025-11-12-mvp/
├── epic-001-conference-feedback-collection.md
├── story-001-question-level-transparency.md
├── story-002-zero-mandatory-fields.md
├── story-003-immediate-acknowledgment.md
├── story-004-mobile-responsive-design.md
├── story-005-csv-export-demographics.md
├── story-006-optional-comment-boxes.md
├── story-007-likert-scale-questions.md
├── story-008-multiple-select-questions.md
├── story-009-choice-ranking-question.md
├── story-010-open-ended-text-questions.md
├── story-011-demographics-questions.md
├── story-012-na-option-handling.md
├── story-013-accessibility-compliance.md
├── story-014-load-testing-concurrent-users.md
├── story-015-equal-experts-branding.md
├── story-016-database-schema-data-storage.md
├── story-017-progress-indicator.md
└── story-018-save-draft-functionality.md
```

## Next Steps

1. ✅ **Requirements extraction complete** - All 18 stories created
2. **Story refinement** - Review with Katie Coleman for prioritization confirmation
3. **Tech stack decisions** - Finalize frontend/backend/database choices
4. **Jira loading** - Run `/jira` command to create tickets with EPIC-001 parent links
5. **Development sprint** - Nov 18-19 (48 hours to testing deadline)
6. **Testing environment** - Prepare for Nov 19 deadline
