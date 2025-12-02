# Discovery Synthesis - NAM Conference Survey MVP

**Date:** 2025-11-17
**Interviews Analyzed:** 7 total (5 stakeholder interviews + 1 PM setup + 1 PM follow-up)
**Participants:** Katie Coleman (Managing Director), Lauren Kessler (Conference Planner), Andrew Shawcare (Consultant/Attendee), Chris Condo (Client Partner/Survey Expert), Sarah Aslanifar (Principal Engineer/Attendee), Mike Mitchell (PM)

## Executive Summary

This synthesis consolidates research from 7 interviews conducted between Nov 12-17, 2025, for the NAM Conference Survey MVP. The discovery reveals a clear opportunity to create a lightweight survey application that balances Katie Coleman's 4 critical measurement areas (emotional sentiment, logistics, learning, networking) with completion-focused design that prevents abandonment from time-sensitive attendees like Sarah Aslanifar.

**Key findings:**
- **Target response rate**: 90-95% (36-38 of 40 attendees) - achievable through in-conference scheduled activity approach (PM follow-up resolved ambiguity between Lauren's 95% and Chris's 75% targets)
- **Completion time constraint**: 5-minute minimum path critical for attendees like Sarah; survey designed for 4-10 minute range
- **Core value proposition**: First survey designed specifically for Equal Experts culture emphasizing transparency, question-level data usage explanations, and addressing the "black hole effect" that causes survey skepticism
- **Final survey structure**: 19 questions covering all 4 measurement areas with zero mandatory fields, 12 optional comment boxes, question-level transparency notes, and mobile-first design

**MVP scope** (7-day timeline to Nov 19 testing deadline):
- Survey completion with reliable data storage
- EE branding throughout
- Mobile-responsive design (attendees will complete during conference break on phones)
- CSV export for Lauren's demographic analysis
- **Out of scope**: Authentication, admin question builder, data visualization/dashboards

**Critical success factors:**
1. Zero mandatory fields (Sarah's hard requirement to prevent abandonment)
2. Question-level transparency about data usage (Andrew's authenticity requirement)
3. Immediate acknowledgment page (addresses black hole effect)
4. In-conference completion window (maximizes response rate and captures fresh sentiment)
5. Mobile-first design (attendees complete on phones during break)

## Key Themes

### Theme 1: The "Black Hole Effect" Destroys Survey Participation

**Evidence from:**
- **Andrew Shawcare**: "It's just a black hole. You send it down the pipe. And it's unclear what happens to the survey or whether it was worth your time filling it out."
- **Sarah Aslanifar**: "Close to none" - frequency of seeing what happens with feedback provided; "Even if they don't use my feedback, just knowing that someone took the time to read that and consider it"
- **Chris Condo**: "If Equal Experts took any actions based on it… If they don't take any action about it. If nothing changes. Then I'm going to say, then why? Why did I take that survey?"

**Implication**: Attendees won't complete surveys if they perceive feedback disappears into a void. The gap between feedback submission and acknowledgment/action creates cynicism that reduces future participation.

**Recommendation**: Implement dual-layer transparency:
1. **Question-level**: Transparency note beneath each question explaining how that specific data will be used
2. **Submission-level**: Immediate acknowledgment page confirming "Thank you - your feedback has been received and will be reviewed by conference organizers"

---

### Theme 2: Completion Barriers Drive Abandonment More Than Survey Length

**Evidence from:**
- **Sarah Aslanifar**: "There are sometimes fields that it's like you must enter something and if you don't have any feedback on that, it doesn't let you proceed. Those are frustrating because at this point, things should be optional." - Abandons surveys with mandatory fields rather than providing fabricated responses
- **Andrew Shawcare**: "I would potentially want to just not do that question" - needs ability to skip questions where personal values conflict with purpose
- **Sarah Aslanifar**: "More than five minutes" threshold for abandonment; "Sometimes they're too long. Or those that are very long. I do that." (abandoned multiple surveys)

**Implication**: Survey abandonment is driven more by forced participation (mandatory fields, restrictive answer choices) than by absolute length. A 10-minute survey with all optional fields will achieve higher completion than a 5-minute survey with mandatory barriers.

**Recommendation**:
- **Zero mandatory fields across all 19 questions** (CRITICAL - documented in implementation notes as hard requirement)
- Design for 3 completion paths: Minimum 4-5 minutes (skip all comments), Typical 6-7 minutes (some comments), Maximum 8-10 minutes (all comments filled)
- Use optional comment boxes (12 total) rather than forced long-form responses
- N/A options on questions that might not apply to all attendees (coworking day, Saturday attendance, accommodations, professional development comparison)

---

### Theme 3: Mobile Device Constraints Shape In-Conference Survey Design

**Evidence from:**
- **Katie Coleman**: Recognition that mobile targeting could improve "then and there" capture
- **Andrew Shawcare**: Mobile "not suitable for thoughtful, detailed open-ended responses" - prefers computer for long-form, mobile for multiple choice
- **Sarah Aslanifar**: "Ideally I do this frankly on my flights back" - comfortable with phone completion during travel
- **Lauren Kessler**: "I'd rather kind of leave everything at the conference. If you give me a task to do on the plane, I'm not gonna do it"

**Implication**: In-conference scheduled activity means attendees will complete on phones during conference break. This constrains question design to mobile-friendly formats while maintaining quick completion window.

**Recommendation**:
- Mobile-first responsive design (documented in testing checklist)
- Primarily Likert scales and multiple select (not heavy long-form)
- Optional comment boxes remain available but not required
- Target 5-10 minute conference break completion window (Lauren's preference)
- Test on mobile devices before deployment (implementation requirement)

---

### Theme 4: Strategic Demographic Segmentation Enables Data-Driven Planning

**Evidence from:**
- **Lauren Kessler**: "I can dice it the ways that I need to… based on who's active, clients, employees versus associates" - requires raw data export with demographic fields for custom analysis
- **Lauren Kessler**: "95% completion or completion from all of our active team members" - statistical validity requires near-universal participation
- **Chris Condo**: Target "at least 30 people to fill it out" (75% of 40 attendees) for meaningful segmentation
- **Katie Coleman**: Understanding different experiences helps justify continued investment: "These are expensive things. Do they still create the value or should we do something different next time?"

**Implication**: Raw data with demographic fields (employment status, name/location) enables Lauren to segment responses and understand how different groups experience the conference. This analysis informs future event planning decisions.

**Recommendation**:
- CSV export with proper column headers (documented in implementation notes)
- Q18: Employment status (Employee/Active Associate/Alumni Associate/Client/Prefer not to answer)
- Q19: Optional name and home location fields (completely optional to preserve anonymity option)
- All demographic questions optional to prevent completion barriers

---

### Theme 5: Katie's 4 Measurement Areas Define Survey Success

**Evidence from:**
- **Katie Coleman (key-requirements.md)**: Identified 4 non-negotiable measurement areas that MUST be captured
- **Emotional Sentiment**: "We're very conscious that this is on a Saturday, and it's people's personal time" - Saturday personal time commitment needs validation
- **Logistics**: Clear expectations, venue quality, accommodations must be measured for future planning
- **Learning Outcomes**: "Was it informative? Did you learn something?" - justifies conference investment beyond social value
- **Networking Effectiveness**: "Overwhelmingly. It's nearly always about the connections and meeting people" - primary stated value

**Implication**: Survey fails its primary purpose if any of these 4 areas lack coverage. All other features/questions are secondary to measuring these dimensions.

**Recommendation (reflected in final 19-question structure)**:
- **Emotional Sentiment**: Q1 (Overall rating), Q2 (Return intent), Q8 (Saturday worth), Q14 (What you liked most)
- **Logistics**: Q9 (Pre-conference communication), Q10 (Accommodations/Venue/Catering), Q12 (Conference length)
- **Learning Outcomes**: Q6 (Learning value), Q7 (Future learning topics), Q13 (vs other professional development)
- **Networking**: Q3 (Coworking day), Q4 (Connection types valued), Q5 (Connection depth)

---

### Theme 6: Transparency Builds Trust, Incentives Undermine Authenticity

**Evidence from:**
- **Andrew Shawcare**: "For each question, there was, let's say, subtext underneath saying," what data will be used for - question-level transparency as must-have
- **Sarah Aslanifar**: "I'm not big on that incentive stuff because it almost looks fishy… It almost feels the pressure to rate me good"
- **Andrew Shawcare**: "If someone gives me something to do this, it makes it even more inauthentic. Because it makes it that you have to give me something in order to fill this out"
- **Sarah Aslanifar**: Positive reaction to "element of surprise" post-feedback appreciation vs pre-announced incentives

**Implication**: Equal Experts consultants value authenticity and transparency over transactional incentives. Explaining why each question matters builds intrinsic motivation; offering rewards undermines perceived authenticity.

**Recommendation**:
- Transparency note beneath every question (all 19 questions in final survey)
- No incentives for completion (contrary to some traditional survey best practices)
- Immediate acknowledgment of submission showing feedback is valued
- Follow-up communication about actions taken (operational - outside product scope per PM clarification)

---

### Theme 7: Timing Optimization Balances Fresh Memory vs Reflection

**Evidence from:**
- **Katie Coleman**: "Once people leave, back to their lives, back to work, it's another thing to do, isn't it?" - post-conference response rates drop
- **Lauren Kessler**: "I always prefer to fill it out, like, while I'm there at the end of the day" - in-conference completion maximizes participation
- **Chris Condo**: "When you finally do take it, you don't necessarily have the same raw emotion that you had in the moment" - delays reduce authentic sentiment capture
- **Sarah Aslanifar**: Wants session-specific feedback "immediately after each session while memory is fresh"
- **Chris Condo**: Alternative view - waiting "a few days for retrospective thinking" can provide better perspective

**Implication**: Optimal timing is end-of-conference before departure. This captures authentic emotion and fresh memory while ensuring high response rates. Conference survey completed as scheduled activity during final day.

**Recommendation** (reflected in proposed-survey-questions.md):
- Completion window: "In-conference scheduled activity (final day before attendees depart)"
- Survey designed for conference break completion (5-6pm per Lauren)
- All questions assume in-conference context (no post-conference action questions)
- Mobile-first design supports on-site phone completion

---

## User Needs (Jobs to Be Done)

### Need 1: When I invest personal Saturday time in a conference, I want to validate that investment was worthwhile, so I can confidently commit to future conferences

**Supporting evidence:**
- **Katie Coleman**: "We're very conscious that this is on a Saturday, and it's people's personal time that we're routing into" - Saturday commitment creates obligation to prove value
- **Katie Coleman**: "These are expensive things. Do they still create the value or should we do something different next time?" - ROI uncertainty drives need for validation

**Priority:** Must-have (addresses Katie's #1 measurement area)

**Current satisfaction:** No systematic feedback collection; relying on anecdotal responses and general positive sentiment without structured validation

**Addressed by:** Q8 (Saturday Personal Time Worth) with 1-5 Likert scale from "Absolutely worth it" to "Not worth my Saturday" plus optional comment

---

### Need 2: When I complete a survey, I want to know my feedback will be read and considered, so I don't feel like I wasted my time on a meaningless exercise

**Supporting evidence:**
- **Andrew Shawcare**: "It's just a black hole. You send it down the pipe. And it's unclear what happens to the survey or whether it was worth your time filling it out"
- **Sarah Aslanifar**: "Even if they don't use my feedback, just knowing that someone took the time to read that and consider it, that makes me want to finish the survey"
- **Chris Condo**: "If they don't take any action about it. If nothing changes. Then I'm going to say, then why? Why did I take that survey?"

**Priority:** Must-have (prevents survey abandonment)

**Current satisfaction:** Very low - Andrew and Sarah report "close to none" visibility into what happens with feedback

**Addressed by:**
- Immediate acknowledgment page: "Thank you - your feedback has been received and will be reviewed by conference organizers"
- Question-level transparency notes explaining data usage (all 19 questions)
- Feedback loop visibility (operational follow-up outside product scope per PM interview)

---

### Need 3: When answering survey questions, I want complete control over what I share, so I can provide authentic feedback without feeling forced

**Supporting evidence:**
- **Sarah Aslanifar**: "There are sometimes fields that it's like you must enter something and if you don't have any feedback on that, it doesn't let you proceed. Those are frustrating" - abandons surveys with mandatory barriers
- **Andrew Shawcare**: "I would potentially want to just not do that question" when personal values conflict with question purpose
- **Sarah Aslanifar**: Abandoned "several times" due to restrictive answer choices or forced responses

**Priority:** Must-have (prevents abandonment)

**Current satisfaction:** Poor - most surveys include mandatory fields that force fabricated responses or survey abandonment

**Addressed by:**
- Zero mandatory fields across all 19 questions (documented as CRITICAL in implementation notes)
- N/A options on questions that might not apply (Q3 coworking, Q8 Saturday, Q10 accommodations, Q13 comparison)
- Optional comment boxes (12 total) never required

---

### Need 4: When I provide conference feedback, I want to do it while experience is fresh and before I return to normal life, so my responses are authentic and completion doesn't become another post-conference task

**Supporting evidence:**
- **Lauren Kessler**: "I always prefer to fill it out, like, while I'm there at the end of the day" - immediacy preference
- **Lauren Kessler**: "If you give me a task to do on the plane, I'm not gonna do it" - post-departure completion fails
- **Katie Coleman**: "Once people leave, back to their lives, back to work, it's another thing to do, isn't it?" - timing challenge
- **Chris Condo**: "A lot of times when you're traveling to a conference, you have to travel back. And so the survey comes at an inconvenient time. When you're traveling. And then you get home and you forget to take it" - travel timing kills response rates

**Priority:** Must-have (enables 90-95% response rate target)

**Current satisfaction:** Low - traditional post-conference surveys have poor response rates and miss authentic sentiment

**Addressed by:**
- In-conference scheduled activity completion window
- Mobile-first design for conference break completion
- 5-minute minimum path for time-sensitive completion
- All questions focus on immediate conference experience (no post-conference action questions per PM follow-up)

---

### Need 5: When planning future events, I want to analyze feedback by different demographic segments, so I can understand how different groups experience conferences differently

**Supporting evidence:**
- **Lauren Kessler**: "I can dice it the ways that I need to… based on who's active, clients, employees versus associates" - custom segmentation requirement
- **Lauren Kessler**: "I love the raw data. If you just send me the spreadsheet that Google Forms spits out, I can dice it the ways I need to" - raw export requirement
- **Chris Condo**: Demographic screening and segmentation essential from Forrester survey experience

**Priority:** Must-have for meaningful analysis (Lauren's primary requirement)

**Current satisfaction:** No systematic demographic capture or analysis capability

**Addressed by:**
- Q18: Employment status (Employee/Active Associate/Alumni Associate/Client/Prefer not to answer)
- Q19: Optional name and home location (for follow-up and geographic segmentation)
- CSV export with proper column headers (implementation requirement)
- All demographic fields optional to preserve anonymity

---

### Need 6: When I answer survey questions, I want to know how my specific response data will be used, so I understand the purpose and can provide appropriately contextualized answers

**Supporting evidence:**
- **Andrew Shawcare**: "For each question, there was, let's say, subtext underneath saying," what the data will be used for - must-have transparency
- **Andrew Shawcare**: Frustration when "survey purpose isn't communicated upfront, making it unclear whether feedback is genuinely wanted or procedural"
- **Chris Condo**: "Having a strategy for the survey is the most important thing" - understanding intended use shapes response quality

**Priority:** Must-have for authentic participation (Andrew's core requirement)

**Current satisfaction:** Very poor - most surveys lack question-level context

**Addressed by:**
- Transparency note beneath all 19 questions explaining specific data usage
- Examples: "This helps leadership understand overall event quality and justify future investment in conferences" (Q1), "This helps us gauge sustained interest and plan future conference capacity" (Q2)

---

## Identified Pain Points (Ranked)

### 1. Survey Black Hole Effect (Mentioned by 3 of 5 attendee/consumer interviews)
- **Impact**: High - Destroys future participation willingness
- **Current workaround**: Andrew only completes "if there's no other option to give feedback"; Sarah reports "close to none" visibility; Chris questions value if "nothing changes"
- **Opportunity**: Question-level transparency + immediate acknowledgment + follow-up communication about actions taken
- **Evidence**: Andrew Shawcare interview (lines 13-24), Sarah Aslanifar interview (lines 44-56), Chris Condo interview (lines 66-75)

### 2. Mandatory Fields Forcing Abandonment or Fabricated Responses (Mentioned by 2 of 3 attendee interviews)
- **Impact**: High - Direct survey abandonment or data quality degradation
- **Current workaround**: Sarah abandons surveys; others provide meaningless responses to proceed
- **Opportunity**: Zero mandatory fields across entire survey; all 19 questions optional
- **Evidence**: Sarah Aslanifar interview (lines 15-23), Andrew Shawcare interview (lines 84-99)

### 3. Survey Timing Conflicts with Post-Conference Travel (Mentioned by 3 of 5 interviews)
- **Impact**: High - Reduces response rates and authenticity of feedback
- **Current workaround**: None effective - surveys simply get lost or forgotten
- **Opportunity**: In-conference scheduled activity completion before departure
- **Evidence**: Chris Condo interview (lines 27-35), Katie Coleman interview (lines 39-48), Lauren Kessler interview (lines 98-104)

### 4. Lack of Demographic Segmentation Capability (Mentioned by 2 of 3 data consumer interviews)
- **Impact**: Medium - Prevents understanding of different group experiences
- **Current workaround**: Lauren mentions trial-and-error planning without data; Chris emphasizes demographic screening from Forrester experience
- **Opportunity**: Employment status + optional name/location fields + CSV export
- **Evidence**: Lauren Kessler interview (lines 74-80), Chris Condo interview (lines 108-114)

### 5. Unclear Question Purpose Creating Response Uncertainty (Mentioned by 2 of 3 attendee interviews)
- **Impact**: Medium - Wrong expectations, inappropriate response style
- **Current workaround**: Attendees make assumptions about purpose during completion
- **Opportunity**: Question-level transparency notes explaining data usage
- **Evidence**: Andrew Shawcare interview (lines 46-57), Chris Condo interview (lines 92-99)

### 6. Survey Length Exceeding Attention Span (Mentioned by 2 of 3 attendee interviews)
- **Impact**: Medium - Direct abandonment partway through
- **Current workaround**: Sarah's "More than five minutes" threshold; abandons long surveys
- **Opportunity**: 5-minute minimum path with optional expansions; 19 questions instead of 29
- **Evidence**: Sarah Aslanifar interview (lines 26-34), Lauren Kessler interview (10-minute maximum from context)

### 7. Mobile Device Constraints for Long-Form Responses (Mentioned by 2 of 3 attendee interviews)
- **Impact**: Medium - Reduces quality of open-ended feedback
- **Current workaround**: Andrew waits for computer access; Sarah completes on phone but keeps responses short
- **Opportunity**: Mobile-first design with primarily structured questions; optional (not required) comment boxes
- **Evidence**: Andrew Shawcare interview (lines 36-45), Sarah Aslanifar preferences (line 170 - comfortable with phone completion)

### 8. Loss of Raw Emotion Over Time (Mentioned by 1 interview but critical insight)
- **Impact**: Medium - Less authentic feedback when delayed
- **Current workaround**: Chris notes "waiting a few days for retrospective thinking" but loses immediacy
- **Opportunity**: Same as timing optimization - in-conference completion
- **Evidence**: Chris Condo interview (lines 38-44)

### 9. Untested Survey Logic Failures (Mentioned by 1 interview but cautionary tale)
- **Impact**: Low frequency but catastrophic consequences when occurs
- **Current workaround**: Chris emphasizes testing after costly incident where "two of the questions never showed up"
- **Opportunity**: Thorough testing checklist before deployment (19 items documented)
- **Evidence**: Chris Condo interview (lines 48-54)

### 10. Survey Perceived as Useless Management Exercise (Mentioned by 1 interview)
- **Impact**: High when occurs - Complete disengagement
- **Current workaround**: Chris skips surveys "to make them feel better about themselves"
- **Opportunity**: Transparency about genuine improvement intent + visible follow-up on actions taken
- **Evidence**: Chris Condo interview (lines 66-75)

---

## Potential Features/Stories

### Feature 1: Question-Level Transparency System

**User story:** As a conference attendee, I want to see a transparency note beneath each survey question explaining how that specific data will be used, so I understand the purpose and can provide appropriately contextualized feedback

**Validation:** Andrew Shawcare (must-have requirement), supported by Chris Condo's emphasis on survey strategy clarity

**User value:** Addresses black hole effect and unclear purpose pain points; builds trust through transparency; aligns with Equal Experts cultural values

**Effort estimate:** S (1-2 days)
- Add transparency text beneath each of 19 questions
- Style as lighter/smaller text for visual hierarchy
- Content already defined in proposed-survey-questions.md

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Survey question structure finalized (complete - 19 questions defined)

**Acceptance criteria:**
- All 19 questions display transparency note
- Notes appear in smaller, lighter text beneath question
- Mobile rendering preserves readability
- Content matches proposed-survey-questions.md specifications

---

### Feature 2: Zero Mandatory Fields Design

**User story:** As a conference attendee, I want complete freedom to skip any question that doesn't apply to me or that I don't want to answer, so I can provide authentic feedback without being forced to fabricate responses

**Validation:** Sarah Aslanifar (hard requirement - abandons surveys with mandatory fields), Andrew Shawcare (ability to skip questions per personal values)

**User value:** Eliminates primary abandonment driver; enables selective participation; respects attendee autonomy

**Effort estimate:** XS (< 1 day)
- Remove all required field validations
- Enable survey submission with any/all questions unanswered
- Add "Required: No" documentation to all 19 questions

**Priority:** Must have (Walking Skeleton)

**Dependencies:** None

**Acceptance criteria:**
- Survey can be submitted with zero questions answered
- No client-side validation errors for skipped questions
- No server-side validation requiring any fields
- All 19 questions marked "Required: No" in specification
- Testing confirms submission works with various skip patterns

**Critical note:** Implementation notes document this as CRITICAL requirement - "Zero mandatory fields. All 19 questions must be skippable to prevent abandonment. This is a hard requirement from attendee interviews."

---

### Feature 3: Immediate Acknowledgment Page

**User story:** As a conference attendee, I want immediate confirmation that my feedback was received and will be reviewed by organizers, so I don't feel like my responses disappeared into a black hole

**Validation:** Andrew Shawcare, Sarah Aslanifar, Chris Condo all emphasize need for acknowledgment

**User value:** Addresses black hole effect; provides closure on submission; builds trust for future participation

**Effort estimate:** XS (< 1 day)
- Create acknowledgment page after submission
- Display message: "Thank you - your feedback has been received and will be reviewed by conference organizers"
- Documented in implementation notes #5

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Survey submission flow

**Acceptance criteria:**
- Acknowledgment page displays immediately after submission
- Message confirms receipt and human review
- Page accessible on mobile devices
- No ambiguous language (e.g., no "Thank you for your submission" without context)

---

### Feature 4: Mobile-First Responsive Design

**User story:** As a conference attendee completing the survey during a conference break on my phone, I want a fully functional mobile experience, so I can provide feedback conveniently without waiting for computer access

**Validation:** Katie Coleman (mobile targeting for "then and there" capture), Sarah Aslanifar (completes on phone during travel), in-conference scheduled activity approach

**User value:** Enables 90-95% response rate target through in-conference completion; accommodates dominant use case

**Effort estimate:** M (3-5 days)
- Responsive layout design
- Mobile-optimized input controls
- Touch-friendly interaction patterns
- Testing on multiple devices/screen sizes

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Survey UI components

**Acceptance criteria:**
- Works on screen sizes 375px - 1920px width
- All question types functional on mobile (Likert scales, checkboxes, ranking, text)
- No horizontal scrolling required
- Input controls sized for touch interaction
- Testing checklist item verified on multiple mobile devices

---

### Feature 5: CSV Export with Demographic Headers

**User story:** As a conference planner (Lauren), I want to export raw survey data to CSV format with properly labeled demographic columns, so I can perform custom segmentation analysis based on employment status, location, and other factors

**Validation:** Lauren Kessler (must-have requirement: "I love the raw data. If you just send me the spreadsheet, I can dice it the ways I need to")

**User value:** Enables custom demographic analysis; supports data-driven event planning decisions

**Effort estimate:** M (3-5 days)
- Export all 19 questions + optional comments to CSV
- Proper column headers for all fields
- Demographic fields: Q18 employment status, Q19 name, Q19 home location
- Handle multi-select and ranking question formats

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Database schema, all question types implemented

**Acceptance criteria:**
- All 19 questions export with clear column headers
- Optional comment boxes export to dedicated columns (12 total)
- Q4 multiple select exports all selections
- Q11 ranking exports rank values (1-4)
- Q18 and Q19 demographic fields clearly labeled
- Testing checklist item: "Verify CSV export - All 19 questions + optional comments export cleanly with proper headers"

---

### Feature 6: Optional Comment Boxes (12 Total)

**User story:** As a conference attendee, I want optional text boxes beneath select questions where I can add context to my ratings, so I can explain my reasoning when it matters without being forced to write essays

**Validation:** Sarah Aslanifar ("I do like a mix. I do like the multiple choice, but also an option to write something if there's something that I notice that's not there"), Andrew Shawcare (question-specific commentary preference)

**User value:** Enables rich qualitative feedback without creating completion barriers; balances structure with flexibility

**Effort estimate:** S (1-2 days)
- Add optional text field beneath 12 specific questions
- Label clearly as optional
- No character limits
- Responsive design for mobile

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Question rendering system

**Acceptance criteria:**
- 12 optional comment boxes implemented per proposed-survey-questions.md
- Located beneath: Q1, Q2, Q3, Q5, Q6, Q7, Q8, Q9, Q12, Q13, Q15, Q16
- Q10 has conditional comment: "Please comment if you answered Neutral or below"
- All labeled clearly as optional
- No character limits enforced
- Can be left blank without validation errors
- Export to CSV in dedicated columns

---

### Feature 7: Likert Scale Questions (9 Total)

**User story:** As a conference organizer, I want consistent 1-5 Likert scale questions for key metrics, so I can quantitatively measure satisfaction, value, and intent across Katie's 4 measurement areas

**Validation:** Katie Coleman's 4 measurement areas, Chris Condo's quantitative data needs, Lauren Kessler's analysis requirements

**User value:** Enables quantitative analysis, trend tracking over time, statistical comparison across segments

**Effort estimate:** M (3-5 days)
- Implement 9 Likert scale questions (Q1, Q2, Q3, Q5, Q6, Q8, Q10, Q11, Q13)
- Consistent 1-5 scale with labeled endpoints
- Mobile-optimized radio button or slider interface
- N/A option where applicable (Q3, Q8, Q10, Q13)

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Question rendering system

**Acceptance criteria:**
- All 9 Likert questions render with 1-5 scale
- Clear endpoint labels (e.g., "5 - Excellent" to "1 - Poor")
- N/A option on Q3, Q8, Q10, Q13
- Single selection enforced (radio button behavior)
- Mobile-friendly selection interface
- CSV export shows numeric value (1-5) and label

---

### Feature 8: Multiple Select Checkbox Questions (2 Total)

**User story:** As a conference attendee, I want to select multiple options from a list when more than one applies to my experience, so I can accurately represent the types of connections I valued or what would build my confidence in the feedback loop

**Validation:** Lauren Kessler (choice ranking/multiple selection), coverage of Q4 connection types and Q17 feedback confidence

**User value:** Captures nuanced, multi-dimensional feedback that single-choice questions miss

**Effort estimate:** S (1-2 days)
- Implement Q4 (Connection Quality) with 6 checkbox options + "Other (please specify)"
- Implement Q17 (Feedback Confidence) with 7 checkbox options + "Other (please specify)"
- "Other" includes text field for specification

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Question rendering system

**Acceptance criteria:**
- Q4: 6 predefined options + Other with text field
- Q17: 7 predefined options + Other with text field
- Multiple selections allowed
- Checkbox UI mobile-friendly
- "Other" text field appears only when "Other" checked
- CSV export shows all selected options (comma-separated or separate columns per implementation note)

---

### Feature 9: Choice Ranking Question (1 Total)

**User story:** As a conference planner (Lauren), I want attendees to rank session types in order of value, so I can understand priority preferences when balancing the event schedule

**Validation:** Lauren Kessler ("That would be really helpful for me to see because then it gives me quantitative data on how people were ranking different things")

**User value:** Provides prioritization data beyond binary preferences; informs schedule design trade-offs

**Effort estimate:** M (3-5 days)
- Implement Q11 (Session Format Preferences)
- Drag-to-reorder interface OR dropdown assignment (1-4)
- 4 options: Main presentations, Interactive workshops, Co-working time, Networking/social time
- Mobile-optimized interaction

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Question rendering system, possibly drag-and-drop library

**Acceptance criteria:**
- All 4 session types can be ranked 1-4
- Drag-to-reorder OR dropdown works on mobile devices
- Each rank (1-4) assigned to exactly one option
- Note states: "Drag to reorder, or use dropdown to assign rank 1-4 to each option"
- CSV export shows rank value (1-4) for each session type
- Testing checklist item: "Test choice ranking - Q11 drag-to-reorder or dropdown ranking (1-4) functions properly"

---

### Feature 10: Open-Ended Text Questions (3 Total)

**User story:** As a conference organizer, I want to collect unrestricted qualitative feedback on future topics, what attendees liked most, and general additional feedback, so I can capture insights that structured questions might miss

**Validation:** Katie Coleman's desire for qualitative insights, Chris Condo's emphasis on both raw data and interpretation

**User value:** Complements quantitative data with rich context; enables discovery of unexpected themes

**Effort estimate:** S (1-2 days)
- Implement Q7 (Future Learning Topics)
- Implement Q14 (What You Liked Most)
- Implement Q15 (Additional Feedback)
- Text area with appropriate size
- No character limits
- All optional

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Question rendering system

**Acceptance criteria:**
- All 3 open-ended questions accept free-form text
- Text areas sized appropriately (multi-line)
- No character limits enforced
- Can be left blank (all optional)
- Mobile text input functional
- CSV export preserves full text content

---

### Feature 11: Demographics Questions (2 Total)

**User story:** As a conference planner (Lauren), I want to capture employment status and optional name/location demographics, so I can segment responses and follow up with specific attendees if needed

**Validation:** Lauren Kessler (segmentation requirement), PM follow-up (optional name field acceptable)

**User value:** Enables demographic analysis; supports follow-up on specific feedback; preserves anonymity option

**Effort estimate:** S (1-2 days)
- Implement Q18 (Employment Status): 5 radio button options
- Implement Q19 (Name and Home Location): 2 optional text fields
- Clear optional labeling

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Question rendering system

**Acceptance criteria:**
- Q18: Single select from Employee, Active Associate, Alumni Associate, Client, Prefer not to answer
- Q19: Two text fields (name, city/state) with placeholder "Leave blank to remain anonymous"
- Both questions marked "Required: No"
- Transparency note emphasizes optional nature: "Providing your name and home location is completely optional. Anonymous responses are equally valuable."
- CSV export includes demographic fields with proper headers

---

### Feature 12: N/A Option Handling (4 Questions)

**User story:** As a conference attendee, I want N/A options on questions that might not apply to my situation, so I can accurately indicate non-applicability without being forced to choose an inaccurate rating

**Validation:** PM follow-up ("all questions are applicable to everyone" via N/A options), prevents forced responses

**User value:** Maintains data quality by distinguishing non-applicable from low ratings; prevents survey abandonment

**Effort estimate:** XS (< 1 day)
- Add N/A option to Q3 (Coworking Day)
- Add N/A option to Q8 (Saturday - "Did not attend Saturday")
- Add N/A option to Q10 (Accommodations - "Did not stay at conference hotel")
- Add N/A option to Q13 (Comparison - "Haven't attended other professional development events")

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Likert scale rendering system

**Acceptance criteria:**
- N/A appears as distinct option (not part of 1-5 scale)
- Selection of N/A excludes numeric rating
- CSV export clearly indicates N/A selections
- Implementation notes verified: "Q3, Q8, Q10, Q13 include N/A option"
- Testing checklist item: "Verify Q3, Q8, Q10, Q13 N/A selections work properly"

---

### Feature 13: Progress Indicator

**User story:** As a conference attendee completing the survey, I want to see my progress through the questions, so I know how much remains and can decide whether to continue

**Validation:** Implementation notes specify "Question X of 19" progress indicator

**User value:** Sets expectations; reduces anxiety about unknown length; helps users manage time

**Effort estimate:** XS (< 1 day)
- Display "Question X of 19" indicator
- Update as user progresses
- Visible on mobile

**Priority:** Should have (Release 2)

**Dependencies:** Survey navigation system

**Acceptance criteria:**
- Progress shows "Question X of 19" format
- Updates accurately as user advances
- Visible throughout survey completion
- Mobile-friendly positioning
- Implementation note #3 verified

---

### Feature 14: Save Draft Functionality

**User story:** As a conference attendee, I want to save my progress and return to complete the survey later if I need to pause, so I don't lose my work if interrupted

**Validation:** Implementation notes specify save draft capability

**User value:** Reduces abandonment from interruptions; accommodates breaks

**Effort estimate:** L (1-2 weeks)
- Client-side draft persistence (localStorage or session)
- OR server-side draft storage with unique link
- Restore functionality when returning
- Clear indicators of draft status

**Priority:** Could have (Nice to have)

**Dependencies:** Database schema (if server-side), session management

**Acceptance criteria:**
- User can save incomplete survey
- Drafted responses persist across browser close/reopen OR page refresh
- User can resume from saved draft
- Clear indication of draft vs submitted status
- Implementation note #4 verified: "Allow users to save and return if they need to pause"

---

### Feature 15: Accessibility Compliance (WCAG 2.1 AA)

**User story:** As a conference attendee using assistive technology, I want the survey to be fully accessible via screen reader and keyboard navigation, so I can provide feedback independently

**Validation:** Implementation notes and testing checklist specify accessibility requirements

**User value:** Inclusive design; legal compliance; demonstrates Equal Experts values

**Effort estimate:** M (3-5 days) - integrated into all component development
- Screen reader compatibility
- Keyboard navigation for all controls
- Sufficient color contrast
- ARIA labels where needed
- Focus indicators

**Priority:** Must have (Walking Skeleton)

**Dependencies:** All UI components

**Acceptance criteria:**
- Screen reader announces all questions, options, and instructions
- All interactive elements keyboard-accessible
- Tab order follows logical flow
- Focus indicators visible on all interactive elements
- Color contrast meets WCAG 2.1 AA standards
- Testing checklist item verified: "Accessibility - Screen reader compatibility, keyboard navigation"

---

### Feature 16: Load Testing for Concurrent Users

**User story:** As a conference organizer, I want the survey system to handle 40 concurrent users during the in-conference completion window, so the scheduled activity doesn't fail under simultaneous load

**Validation:** Testing checklist specifies concurrent user validation; 40 attendees completing during same conference break

**User value:** Prevents embarrassing technical failures during high-stakes scheduled activity

**Effort estimate:** S (1-2 days) - testing and potential optimization
- Load test with 40 simulated concurrent users
- Identify bottlenecks (database, API, frontend)
- Optimize if needed
- Verify acceptable response times under load

**Priority:** Must have (Walking Skeleton)

**Dependencies:** Complete MVP application, deployment environment

**Acceptance criteria:**
- System supports 40 concurrent users completing survey
- Response times remain acceptable (< 2s for question transitions)
- No data loss under concurrent load
- Database handles concurrent writes
- Testing checklist item verified: "Load testing - Verify 40 concurrent users can submit during in-conference window"

---

## Workflow Patterns

### Common Conference Feedback Collection Workflow

**Observed across:** All attendee participants (Sarah, Andrew, Chris) and data consumers (Katie, Lauren)

**Typical current flow:**
1. Attend conference → 2. Return home/to work → 3. Receive survey email days/weeks later → 4. Assess whether worth time → 5. Complete (or abandon) → 6. Submit with no acknowledgment → 7. Never see results or actions taken

**Pain points in current workflow:**
- Timing delay reduces emotional connection and memory accuracy
- Travel timing creates inconvenience
- Black hole effect reduces future participation willingness
- Lack of transparency creates cynicism

**Proposed new workflow:**
1. Attend conference → 2. Complete survey during scheduled break before departure (mobile device) → 3. Receive immediate acknowledgment → 4. [Later] Receive follow-up about actions taken (operational, outside product scope)

**Key improvements:**
- In-conference completion eliminates travel timing issues
- Mobile-first design supports on-site completion
- Immediate acknowledgment addresses black hole perception
- Question-level transparency sets proper expectations

---

## User Segmentation Insights

### Segment 1: Completion-Sensitive Attendees (represented by Sarah Aslanifar)

**Characteristics:**
- 5-minute maximum tolerance before abandonment
- Will abandon rather than provide fabricated responses to mandatory fields
- Prefers mixed format (multiple choice + optional text)
- Completes on mobile devices during travel
- Motivated by conference quality, not external incentives

**Needs:**
- Zero mandatory fields (hard requirement)
- Quick completion path (4-5 minute minimum)
- Flexibility to skip questions without barriers
- Human acknowledgment of feedback value

**Design implications:**
- All 19 questions optional
- Optional comment boxes (not required)
- Mobile-optimized interface
- Immediate acknowledgment page

---

### Segment 2: Authenticity-Focused Participants (represented by Andrew Shawcare)

**Characteristics:**
- Values genuine feedback exchange over performative data collection
- Skeptical of surveys without clear purpose
- Requires question-level transparency about data usage
- Negative reaction to incentives (sees as inauthentic)
- Prefers discussion-based over isolated feedback methods

**Needs:**
- Transparent explanation of how each question's data will be used
- Evidence that feedback will be acted upon
- Ability to skip questions where values conflict
- Consistent communication channel (invitation through results)

**Design implications:**
- Transparency note beneath every question
- Immediate acknowledgment page
- Follow-up communication about actions taken (operational)
- No incentive-based completion strategy

---

### Segment 3: Data Quality Advocates (represented by Chris Condo)

**Characteristics:**
- Former Forrester analyst with professional survey design expertise
- Emphasizes strategy-first question design
- Understands statistical significance and demographic segmentation
- Wants both raw data and interpreted analysis
- Quality over speed preference

**Needs:**
- Survey strategy aligned with intended use of results
- Thorough testing before deployment
- Target 75% response rate (30 of 40)
- Demographic capture for segmentation
- Raw data export plus analysis

**Design implications:**
- Work backwards from Katie's 4 measurement areas to question design
- 19-item testing checklist before deployment
- CSV export with demographic fields
- Focus on completion optimization to achieve 90-95% target

---

### Segment 4: Network Engagement Planners (represented by Lauren Kessler)

**Characteristics:**
- Responsible for conference logistics and future event planning
- Needs demographic segmentation for custom analysis
- Operates with limited budget data on community sentiment
- Prefers raw data over pre-formatted reports
- Time-conscious about participant burden (10-minute maximum)

**Needs:**
- Raw CSV export with demographic fields
- Choice ranking for event format preferences
- High response rate (95% ideal, 90% acceptable)
- Community sentiment measurement
- In-conference completion window

**Design implications:**
- Q4: Connection types (multiple select)
- Q11: Session format ranking (drag-to-reorder)
- Q18: Employment status demographic
- Q19: Optional name/location
- CSV export with proper headers

---

### Segment 5: Strategic Decision Makers (represented by Katie Coleman)

**Characteristics:**
- Managing Director responsible for conference ROI decisions
- Conscious about Saturday personal time commitment request
- Focuses on 4 key measurement areas (emotional, logistics, learning, networking)
- Values public transparency and blog publication
- Interested in AI possibilities but pragmatic about MVP scope

**Needs:**
- Validate Saturday time investment worthwhileness
- Measure logistics effectiveness
- Quantify learning outcomes
- Assess networking value
- Justify continued conference investment

**Design implications:**
- Q8: Saturday worth question (critical)
- Q1: Overall rating
- Q2: Return intent
- Coverage of all 4 measurement areas in 19-question structure
- Public results sharing capability (operational follow-up)

---

## Competitive Insights

### Google Forms (Previous Conference Survey Tool)

**What users said:**
- **Katie Coleman**: "seemed to work pretty well" - positive experience but exploring alternatives
- **Lauren Kessler**: Positive: "Easy to produce the simple UI to create the questions. And pretty easy to pick and choose what you wanted… what type of question you wanted"
- **Lauren Kessler**: Challenge: "Free flow text field with no character limit produced a lot of complaints about the venue" - overwhelming volume

**Implications:**
- Google Forms sets baseline expectation for ease of use
- Free-form text without structure creates data processing challenges
- Lauren's raw data export preference ("I love the raw data. If you just send me the spreadsheet that Google Forms spits out") means CSV export is table stakes

**Competitive advantages for custom solution:**
- Question-level transparency (not possible in Google Forms)
- Tight integration with Equal Experts branding
- Tailored to specific conference context
- Immediate acknowledgment page with custom messaging

---

### Post-Conference Email Surveys (Industry Standard)

**What users said:**
- **Chris Condo**: "A lot of times when you're traveling to a conference, you have to travel back. And so the survey comes at an inconvenient time. When you're traveling. And then you get home and you forget to take it."
- **Lauren Kessler**: "If you give me a task to do on the plane, I'm not gonna do it"
- **Katie Coleman**: "Once people leave, back to their lives, back to work, it's another thing to do, isn't it?"

**Implications:**
- Post-conference timing is fundamental design flaw causing response rate problems
- Travel timing specifically problematic

**Competitive advantage:**
- In-conference scheduled activity completion addresses root cause
- Captures fresh sentiment and memory
- Achieves 90-95% response rate vs typical lower rates

---

### Corporate Employee Surveys (Chris's Example)

**What users said:**
- **Chris Condo**: "If I think management's asking me to do a survey to make them feel better about themselves, I might not want to do it"
- **Chris Condo**: "At the yearly meeting for your company… You want to see all that stuff, right?" - positive reaction to presenting survey results on stage

**Implications:**
- Transparency about purpose critical to avoid cynicism
- Public results sharing builds trust

**Competitive advantage:**
- Question-level transparency prevents "management exercise" perception
- Equal Experts cultural fit with openness and transparency

---

## Open Questions

### All open questions from 2025-11-14 synthesis RESOLVED via PM follow-up interview (2025-11-17):

1. ✅ **Response rate threshold**: Established 90-95% (36-38 of 40) based on in-conference scheduled activity approach
2. ✅ **Feedback loop operationalization**: Determined to be outside product scope - operational concern
3. ✅ **In-person vs remote differentiation**: Conference is fully in-person - no differentiation needed
4. ✅ **Previous logistics pain points**: Referenced in observations PDF; current questions sufficient
5. ✅ **Survey timing integration**: Operational detail outside product scope
6. ✅ **First-time vs repeat attendee questions**: Same question set for all with N/A options
7. ✅ **Previous year improvements**: Survey stands alone - not dependent on specific prior changes
8. ✅ **Anonymous vs name field**: Optional name field acceptable for follow-up (Q19)

**No remaining open questions** - discovery complete and ready for requirements extraction.

---

## Recommended Next Steps

### 1. Requirements Extraction (Immediate - Week of Nov 17)
**Action:** Run `/req` command to generate epic and user stories from this synthesis
**Rationale:** All open questions resolved; 19-question structure finalized; ready to convert discovery into actionable development stories
**Owner:** Mike Mitchell
**Timing:** Immediately following synthesis completion

### 2. Story Refinement Session (Nov 18-19)
**Action:** Review generated stories with Katie Coleman for prioritization alignment
**Rationale:** Ensure stories accurately reflect Katie's 4 measurement areas and strategic priorities
**Owner:** Mike Mitchell + Katie Coleman
**Timing:** Before Nov 19 testing deadline

### 3. Technical Architecture Decisions (Nov 18)
**Action:** Finalize tech stack and deployment approach based on 7-day timeline constraint
**Rationale:** MVP scope clear; need to select implementation technologies
**Owner:** Mike Mitchell + Development Team
**Key decisions:** Frontend framework, backend framework, database, hosting (per technical-context.md template)

### 4. Load Stories to Jira (Nov 18-19)
**Action:** Run `/jira` command to create tickets with epic parent links
**Rationale:** Enable team collaboration and progress tracking
**Owner:** Mike Mitchell
**Timing:** After story refinement, before development kickoff

### 5. Testing Environment Setup (Nov 19)
**Action:** Prepare testing environment for Wednesday Nov 19 deadline
**Rationale:** "Ready for testing" milestone requires functional deployment
**Owner:** Development Team
**Timing:** Nov 19 deadline

### 6. Post-MVP Feedback Loop Planning (Future)
**Action:** Design operational process for sharing results and actions taken
**Rationale:** Addresses black hole effect and builds trust for future conferences
**Owner:** Katie Coleman + Lauren Kessler
**Timing:** After MVP launch; inform by first survey results

---

## Appendix

### Participant Demographics

**Total Participants:** 7

**Stakeholder Breakdown:**
- **Decision Makers (2)**: Katie Coleman (Managing Director), Mike Mitchell (PM)
- **Data Consumers (2)**: Lauren Kessler (Conference Planner), Chris Condo (Client Partner)
- **Survey Takers (3)**: Sarah Aslanifar (Principal Engineer), Andrew Shawcare (Consultant), Chris Condo (dual role)

**Interview Distribution:**
- Nov 12, 2025: Katie Coleman (14:30), Lauren Kessler (16:00), Mike Mitchell (PM setup)
- Nov 13, 2025: Chris Condo (09:15), Andrew Shawcare (11:30), Sarah Aslanifar (15:15)
- Nov 17, 2025: Mike Mitchell (PM follow-up on 8 open questions)

**Geographic Context:** Equal Experts North America team (40 total conference attendees)

**Experience Levels:**
- Managing Director level: 1
- Principal/Senior level: 3
- Client Partner: 1
- Product Manager: 1

---

### Research Methods

**Interview Format:**
- Semi-structured interviews with open-ended questions
- 30-60 minute sessions conducted via Granola.ai video call
- Interview notes captured in structured template format

**Interview Focus Areas:**
- Pain points and problem areas
- Unmet needs
- Aspirations and opportunities
- Current workflows
- Feature reactions
- Memorable quotes and behavioral observations

**Synthesis Approach:**
- Thematic analysis across all 7 interviews
- Evidence-based recommendations (minimum 3 interview references for themes)
- Cross-referencing with observations documents (key-requirements.md, proposed-survey-questions.md)
- PM follow-up to resolve ambiguities before requirements extraction

**Artifacts Produced:**
- 7 interview transcripts in structured format
- 1 key requirements document (Katie's 4 measurement areas)
- 1 proposed survey questions specification (19 questions, consolidated from 29)
- 3 synthesis documents (Nov 13, Nov 14, Nov 17 - this document)

---

### Final Survey Structure Summary (from proposed-survey-questions.md)

**Total Questions:** 19 (consolidated from 29 in earlier drafts)

**Question Type Breakdown:**
- Likert scale ratings (1-5): 9 questions
- Multiple select checkboxes: 2 questions
- Choice ranking: 1 question
- Multiple choice (single select): 3 questions
- Open-ended text: 3 questions
- Text field (demographics): 1 question (2 fields)

**Optional Comment Boxes:** 12 total

**Estimated Completion Time:**
- Minimum path (skip optional comments and demographics): ~4-5 minutes
- Typical path (some comments, demographics): ~6-7 minutes
- Maximum path (all comments filled, all demographics): ~8-10 minutes

**Critical Design Principle:** 5-minute threshold critical for completion-sensitive attendees (Sarah Aslanifar); survey designed to allow quick completion by skipping optional comments

**Coverage of Katie's 4 Measurement Areas:**
1. **Emotional Sentiment**: Q1, Q2, Q8, Q14
2. **Logistics**: Q9, Q10, Q12
3. **Learning Outcomes**: Q6, Q7, Q13
4. **Networking Effectiveness**: Q3, Q4, Q5

**Implementation Priority:** All features marked "Must have (Walking Skeleton)" required for MVP
