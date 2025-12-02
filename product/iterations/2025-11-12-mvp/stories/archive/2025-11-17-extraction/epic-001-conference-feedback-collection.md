# Epic: NAM Conference Feedback Collection MVP

**Epic ID**: EPIC-001
**Status**: Draft
**Owner**: Katie Coleman (Managing Director)
**Target Release**: MVP - November 19, 2025 (Testing Deadline)

## Overview

Create a lightweight, mobile-first survey application for the Equal Experts North America Conference that enables attendees to provide structured feedback during the conference before departure. The application addresses the "black hole effect" through question-level transparency and immediate acknowledgment while maintaining high completion rates (90-95%) through zero mandatory fields and 5-minute minimum completion paths.

This epic delivers Katie Coleman's 4 critical measurement areas (emotional sentiment, logistics, learning outcomes, networking effectiveness) through a 19-question survey designed specifically for Equal Experts culture emphasizing authenticity, transparency, and respect for attendees' time.

## Business Value

**For Equal Experts Leadership:**
- Validates $XX,XXX conference investment ROI through systematic feedback collection
- Justifies Saturday personal time commitment with measurable value demonstration
- Enables data-driven decisions for future conference planning and format changes
- Provides publishable results demonstrating organizational transparency

**Quantified Impact:**
- Target 90-95% response rate (36-38 of 40 attendees) vs typical <50% for post-conference surveys
- 5-minute minimum completion time vs industry average 10-15 minutes
- Zero survey abandonment from completion barriers vs 20-30% abandonment typical
- 100% question-level transparency vs 0% in traditional survey tools

## User Value

**For Conference Attendees (Sarah, Andrew, Chris):**
- Authentic feedback channel that demonstrates genuine interest in improvement
- Complete control over what to share through zero mandatory fields
- Clear understanding of data usage through question-level transparency notes
- Immediate acknowledgment that feedback was received and will be reviewed
- Convenient in-conference completion (mobile-first) avoiding post-travel burden

**For Conference Planners (Lauren):**
- Raw CSV export with demographic fields enabling custom segmentation analysis
- Choice ranking data showing session format preferences (quantitative prioritization)
- Community sentiment measurement previously unavailable
- High response rate ensuring statistical validity for planning decisions

## Success Metrics

**Response Rate & Completion:**
- **Target:** 90-95% response rate (36-38 of 40 attendees)
- **Completion Time:** 80% of users complete in ≤7 minutes
- **Abandonment Rate:** <5% survey abandonment
- **Mobile Completion:** 70%+ complete on mobile devices during conference

**Data Quality:**
- **Optional Comments:** 40%+ of respondents provide at least one optional comment
- **Demographic Capture:** 60%+ provide optional name/location (Q19)
- **N/A Usage:** Appropriate use of N/A options indicates authentic responses

**Post-Launch Validation:**
- Katie's 4 measurement areas all show sufficient data for decision-making
- Lauren can successfully segment by employment status and location
- Conference organizers receive actionable insights within 24 hours of survey close

## Scope

### In Scope (MVP - All Must-Have Features)

**Core Survey Functionality:**
- 19-question survey covering Katie's 4 measurement areas
- Zero mandatory fields across all questions
- Mobile-first responsive design (375px - 1920px)
- Equal Experts branding throughout
- Data storage to database with reliable persistence

**Question Types (9 Likert, 2 Multi-Select, 1 Ranking, 3 Single-Choice, 3 Open-Ended, 1 Demographics):**
- Likert scale questions (1-5 ratings with labeled endpoints)
- Multiple select checkbox questions (Q4 connections, Q17 feedback confidence)
- Choice ranking interface (Q11 session formats - drag-to-reorder or dropdown)
- Single-choice questions (Q12 length, Q16 improvements, Q18 employment)
- Open-ended text questions (Q7 topics, Q14 liked most, Q15 additional)
- Demographics (Q19 optional name/location)
- 12 optional comment boxes throughout
- N/A options on 4 questions (Q3, Q8, Q10, Q13)

**Transparency & Trust Features:**
- Question-level transparency notes (all 19 questions)
- Immediate acknowledgment page post-submission
- Progress indicator ("Question X of 19")

**Data Export:**
- CSV export with proper column headers
- Demographic fields included (employment status, name, location)
- Multi-select and ranking data properly formatted
- All 19 questions + 12 optional comments exportable

**Quality Assurance:**
- 19-item testing checklist completion
- Mobile device testing (iOS Safari, Android Chrome)
- Load testing (40 concurrent users)
- Accessibility compliance (WCAG 2.1 AA - keyboard nav, screen reader)

### Out of Scope (Deferred Post-MVP)

- ❌ **Authentication/Login** - Open link model for MVP
- ❌ **Admin Question Builder** - Questions hardcoded in MVP
- ❌ **Data Visualization/Dashboard** - Just store data, analysis in spreadsheet
- ❌ **Conversational AI Interface** - Katie's interest but post-MVP
- ❌ **Save Draft Functionality** - Could-have priority, not MVP critical
- ❌ **Session-Specific Feedback** - Overall conference only for MVP
- ❌ **Real-Time Results Display** - CSV export sufficient for MVP
- ❌ **Automated Follow-Up Communication** - Operational process outside product
- ❌ **Branching Logic/Conditional Questions** - Single linear flow for MVP

## User Stories

### Must Have (Walking Skeleton) - 16 Stories
- [ ] STORY-001: Question-Level Transparency System - **S**
- [ ] STORY-002: Zero Mandatory Fields Design - **XS**
- [ ] STORY-003: Immediate Acknowledgment Page - **XS**
- [ ] STORY-004: Mobile-First Responsive Design - **M**
- [ ] STORY-005: CSV Export with Demographic Headers - **M**
- [ ] STORY-006: Optional Comment Boxes (12 Total) - **S**
- [ ] STORY-007: Likert Scale Questions (9 Total) - **M**
- [ ] STORY-008: Multiple Select Checkbox Questions (2 Total) - **S**
- [ ] STORY-009: Choice Ranking Question (1 Total) - **M**
- [ ] STORY-010: Open-Ended Text Questions (3 Total) - **S**
- [ ] STORY-011: Demographics Questions (2 Total) - **S**
- [ ] STORY-012: N/A Option Handling (4 Questions) - **XS**
- [ ] STORY-013: Accessibility Compliance (WCAG 2.1 AA) - **M**
- [ ] STORY-014: Load Testing for Concurrent Users - **S**
- [ ] STORY-015: Equal Experts Branding - **XS**
- [ ] STORY-016: Database Schema & Data Storage - **M**

### Should Have (Release 2) - 1 Story
- [ ] STORY-017: Progress Indicator - **XS**

### Could Have (Nice to Have) - 1 Story
- [ ] STORY-018: Save Draft Functionality - **L**

## Dependencies

**External:**
- Conference schedule finalized (determines in-conference completion window)
- 40 confirmed attendees (validates 90-95% = 36-38 responses target)
- Hosting environment available by Nov 19 testing deadline

**Internal (Story Dependencies):**
- STORY-016 (Database Schema) must complete before STORY-005 (CSV Export)
- STORY-004 (Mobile-First Design) enables all question type stories (007-012)
- STORY-001 (Transparency) and STORY-002 (Zero Mandatory) are foundational design patterns affecting all question stories

**Technical Stack Decisions Required:**
- Frontend framework selection
- Backend framework selection
- Database selection (PostgreSQL recommended per NAM Demo patterns)
- Hosting platform (GCP recommended per NAM Demo infrastructure)

## Risks

**Completion Time Risk:**
- **Risk:** Survey exceeds Sarah's 5-minute abandonment threshold
- **Mitigation:** Tested completion paths (4-5 min minimum, 6-7 typical, 8-10 max); all fields optional
- **Contingency:** Remove optional comment boxes if testing shows >7 min typical

**Response Rate Risk:**
- **Risk:** <90% response rate even with in-conference scheduled activity
- **Mitigation:** Zero mandatory fields, mobile-first design, 5-min completion path
- **Contingency:** Lauren indicated 75%+ (30 of 40) still statistically useful per Chris Condo

**Mobile Experience Risk:**
- **Risk:** Choice ranking (Q11) difficult on mobile devices
- **Mitigation:** Dual interface - drag-to-reorder OR dropdown assignment (1-4)
- **Contingency:** Fall back to dropdown-only if drag-drop testing fails

**Load Testing Risk:**
- **Risk:** 40 concurrent users crash system during scheduled activity
- **Mitigation:** Load testing story (STORY-014) validates capacity before deployment
- **Contingency:** Stagger completion (two groups of 20) if concurrent load fails

**Timeline Risk (7-Day MVP):**
- **Risk:** Nov 19 testing deadline too aggressive for 18 stories
- **Mitigation:** Focus on 16 must-have stories only; defer STORY-017, STORY-018
- **Contingency:** Reduce question count if development velocity insufficient

## Timeline

- **Start**: November 12, 2025 (cycle initiated)
- **Discovery Complete**: November 17, 2025 (synthesis finalized)
- **Requirements Extraction**: November 17, 2025 (this document)
- **Development Sprint**: November 18-19, 2025 (48 hours to testing)
- **Testing Ready**: November 19, 2025 (hard deadline per Mike Mitchell)
- **Conference Date**: December 6, 2025 (first production use)

**Total Cycle Duration:** 18 days (discovery) + 2 days (development) = 20 days end-to-end

## Notes

### Design Principles from Discovery

**Transparency Over Incentives:**
- Andrew and Sarah both rejected external incentives as inauthentic
- Question-level transparency builds intrinsic motivation
- Aligns with Equal Experts cultural values of openness

**Completion Optimization:**
- Sarah's 5-minute threshold drives zero mandatory fields requirement
- "Better to get 35 complete responses to 12 questions than 20 partial responses to 18 questions"
- Optional comment boxes preserve qualitative depth without creating barriers

**Mobile-First Rationale:**
- In-conference scheduled activity = phone-based completion during break
- Andrew noted mobile unsuitable for long-form but perfect for structured questions
- 70%+ expected mobile completion based on timing and convenience

### Katie's 4 Measurement Areas Coverage

**1. Emotional Sentiment (4 questions):**
- Q1: Overall Conference Rating (Likert 1-5)
- Q2: Return Attendance Intent (Likert 1-5)
- Q8: Saturday Personal Time Worth (Likert 1-5) - CRITICAL
- Q14: What You Liked Most (Open-ended)

**2. Logistics Feedback (3 questions):**
- Q9: Pre-Conference Communication Clarity (Likert 1-5)
- Q10: Accommodations, Venue & Catering (Likert 1-5)
- Q12: Conference Length (Single-choice)

**3. Learning Outcomes (3 questions):**
- Q6: Learning Value (Likert 1-5)
- Q7: Future Learning Topics (Open-ended)
- Q13: Comparison to Other Professional Development (Likert 1-5)

**4. Networking Effectiveness (3 questions):**
- Q3: Coworking Day Effectiveness (Likert 1-5)
- Q4: Connection Quality - Who (Multi-select checkboxes)
- Q5: Connection Depth (Likert 1-5)

**Additional (Format/Improvement/Demographics - 6 questions):**
- Q11: Session Format Preferences (Choice ranking 1-4)
- Q15: Additional Feedback (Open-ended)
- Q16: Improvements from Last Conference (Single-choice)
- Q17: Feedback Confidence (Multi-select checkboxes)
- Q18: Employment Status (Single-choice demographic)
- Q19: Name and Home Location (Optional text fields)

### Cross-Reference to Synthesis

This epic directly addresses:
- **7 Key Themes** identified in synthesis (all addressed through features)
- **6 User Needs** (all covered through stories STORY-001 through STORY-018)
- **10 Ranked Pain Points** (top 5 all mitigated through must-have stories)
- **5 User Segments** (design accommodates all segments' requirements)

### Effort Estimate Summary

**Total Estimated Effort:** 15-20 developer days
- XS stories (5): ~2-3 days total
- S stories (5): ~5-10 days total
- M stories (6): ~18-30 days total if sequential
- L stories (1): ~5-10 days (deferred)

**Parallel Development Possible:** Frontend (questions) + Backend (storage/export) can progress simultaneously after STORY-016 (database schema) completes.

**MVP Realistic with Team:** 48-hour sprint feasible if 2-3 developers working in parallel on must-have stories only.
