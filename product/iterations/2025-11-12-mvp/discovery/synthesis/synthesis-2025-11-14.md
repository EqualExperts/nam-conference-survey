# Discovery Synthesis - NAM Conference Survey MVP

**Date:** 2025-11-14
**Discovery Cycle:** 2025-11-12-mvp
**Interviews Analyzed:**
- Katie Coleman (Managing Director) - 2025-11-12
- Lauren Kessler (Conference Logistics Coordinator) - 2025-11-12
- Chris Condo (Client Partner / Survey Expert) - 2025-11-13
- Andrew Shawcare (Conference Attendee) - 2025-11-13
- Sarah Aslanifar (Conference Attendee) - 2025-11-13

**Participants:** 5 stakeholders representing conference organizers, data consumers, survey design experts, and attendees

## Executive Summary

This discovery cycle reveals a fundamental tension in conference feedback: **organizers need comprehensive data to justify expensive Saturday conferences, while attendees will abandon surveys that feel like "black holes" or create completion barriers**.

The most critical finding is that **timing and transparency drive completion rates more than incentives or clever design**. All 5 participants emphasized in-conference completion before attendees leave (Katie, Lauren, Chris, Andrew, Sarah), and authenticity of feedback loop (Andrew, Sarah, Katie). The "black hole effect" where feedback disappears without acknowledgment creates survey fatigue that undermines response rates.

**Key priorities for MVP:**
1. **In-conference completion** - Capture feedback before attendees leave venue (5/5 participants)
2. **Transparency about data usage** - Show question-level purpose and follow-up actions (Andrew, Sarah, Katie)
3. **Zero mandatory fields** - All questions optional to prevent abandonment (Sarah, Andrew)
4. **5-minute target completion** - Hard constraint for attendee participation (Sarah)
5. **Raw CSV export with demographics** - Lauren's must-have for custom analysis

**Katie's 4 non-negotiable measurement areas** define success:
1. Emotional sentiment (worth Saturday time commitment)
2. Logistics effectiveness (venue, hotel, WiFi, communication)
3. Learning outcomes (content value and skill development)
4. Networking effectiveness (community connection and relationship building)

The MVP must balance Lauren's analytical needs (demographic segmentation, choice ranking) against Sarah's completion barriers (5-minute limit, no mandatory fields). Chris's professional standards (75% response rate, tested survey logic) provide quality guardrails.

**Estimated effort:** Medium (M) - 29 questions across 8 sections with choice ranking, multiple select, and optional comments requires careful UI/UX work for mobile-first experience.

## Key Themes

### Theme 1: Survey Timing Determines Response Quality and Rates

**Evidence from:**
- **Katie Coleman**: "Once people leave, back to their lives, back to work, it's another thing to do, isn't it?" - wants feedback "then and there before people leave"
- **Lauren Kessler**: "I always prefer to fill it out, like, while I'm there at the end of the day" - suggests carving out 5-10 minutes during 5-6pm break
- **Chris Condo**: "A lot of times when you're traveling to a conference, you have to travel back. And so the survey comes at an inconvenient time. When you're traveling. And then you get home and you forget to take it."
- **Sarah Aslanifar**: "Ideally I do this frankly on my flights back" - wants access within hours of conference end
- **Andrew Shawcare**: Prefers completion "before attendees leave venue and emotions/thoughts fade"

**Implication:** Post-conference distribution fundamentally undermines response rates and data quality. Attendees return to normal routines, context switches away from conference experience, and survey becomes "another task" rather than immediate reflection.

**Recommendation:** Implement in-conference completion window during final day break (5-6pm suggested by Lauren). Make survey accessible immediately when announced, not sent via email days later.

---

### Theme 2: Feedback Loop Transparency Drives Participation

**Evidence from:**
- **Andrew Shawcare**: "It's just a black hole. You send it down the pipe. And it's unclear what happens to the survey or whether it was worth your time filling it out." - describes surveys as "inauthentic" without visible follow-up
- **Sarah Aslanifar**: "Close to none" when asked about seeing what happens with feedback - "Even if they don't use my feedback, just knowing that someone took the time to read that and consider it"
- **Katie Coleman**: References publishing conference feedback publicly on blog as accountability mechanism
- **Chris Condo**: "If Equal Experts took any actions based on it… If they don't take any action about it. If nothing changes. Then I'm going to say, then why? Why did I take that survey?"

**Implication:** Without visible feedback loops showing (1) acknowledgment of receipt, (2) actions taken, or (3) explanation of decisions, attendees develop "black hole fatigue" and stop participating. This is especially critical for repeat conferences where previous non-response destroys trust.

**Recommendation:**
1. Implement question-level transparency showing how each data point will be used (Andrew's specific request)
2. Include Q23 asking if attendees noticed improvements from last year
3. Include Q24 asking what would build confidence feedback will be acted upon
4. Plan public summary publication (Katie's existing practice)

---

### Theme 3: Completion Barriers Kill Response Rates

**Evidence from:**
- **Sarah Aslanifar**: "There are sometimes fields that it's like you must enter something and if you don't have any feedback on that, it doesn't let you proceed. Those are frustrating" - abandoned surveys "several times" due to mandatory fields or excessive length
- **Andrew Shawcare**: Wants "question-level skip capability" - "I would potentially want to just not do that question" without abandoning entire survey
- **Lauren Kessler**: Concerned about "free flow text field with no character limit produced a lot of complaints about the venue" - overwhelmed by repetitive feedback
- **Chris Condo**: References untested survey logic failures: "two of the questions never showed up… I'm like, where are the answers on these two questions?"

**Implication:** Any friction point (mandatory fields, excessive length, poor UX, untested logic) triggers abandonment. Better to get partial data from 35 people than no data because survey demanded completeness.

**Recommendation:**
1. **Zero mandatory fields** - all 29 questions optional (Sarah's hard requirement)
2. **5-minute target completion** - Sarah's threshold; 8-10 minute estimate is acceptable but at risk
3. **Thorough testing before launch** - Chris's lesson from Forrester failure
4. **Optional comment boxes not required** - structured questions with optional elaboration (18 comment boxes available)

---

### Theme 4: Demographic Segmentation Critical for Analysis

**Evidence from:**
- **Lauren Kessler**: "I can dice it the ways that I need to… based on who's active, clients, employees versus associates" - must-have for meaningful analysis; needs raw CSV export
- **Katie Coleman**: Wants to understand how "connection to Equal Experts" varies across groups
- **Chris Condo**: Standard Forrester practice to screen respondents and capture demographics for filtering
- **Key-requirements.md observation**: Identifies 4 demographic splits: active vs associates, client-facing vs internal, location, travel distance

**Implication:** Without demographic segmentation, aggregated results hide crucial insights about how different groups experience the conference. Lauren can't understand whether remote staff or client-facing consultants have different needs.

**Recommendation:** Implement demographics section (Q25-Q29) at survey end with clear "all optional" messaging. Include:
- Employment status (active employee / associate)
- Client-facing vs internal role
- Office location
- Travel distance
- Optional name field for follow-up

---

### Theme 5: Professional Survey Quality Standards vs Attendee Tolerance

**Evidence from:**
- **Chris Condo**: Forrester standard: minimum 50 responses per question for statistical significance; targets 75% response rate (30 of 40 attendees)
- **Sarah Aslanifar**: "More than five minutes" threshold for abandonment; has abandoned "several" surveys exceeding this
- **Lauren Kessler**: Wants 95% completion rate from all active team members - "if I only get five people, then the data doesn't mean anything to me"
- **Chris Condo**: "Having a strategy for the survey is the most important thing and the most regretful thing in the past"

**Implication:** There's tension between professional research standards (Chris's Forrester background) and practical attendee tolerance (Sarah's 5-minute limit). With only 40 attendees, this isn't formal research requiring statistical significance, but quality still matters.

**Recommendation:**
- Target 75-95% response rate (30-38 respondents) as success threshold
- Design for 8-10 minute completion (balances depth with Sarah's tolerance)
- Prioritize Katie's 4 measurement areas over comprehensive coverage
- Test survey completion time with real users before launch

---

### Theme 6: Data Export Format Preferences

**Evidence from:**
- **Lauren Kessler**: "I love the raw data. If you just send me the spreadsheet that Google Forms spits out, I can dice it the ways I need to" - strong preference for CSV over formatted reports
- **Chris Condo**: "There's two ways I wanted… the raw excel of all the questions, all the answers, all the numbers… I want to create some very interesting slides based on each question"
- **Katie Coleman**: Previous experience with Google Forms exports worked well

**Implication:** Data consumers (Lauren, Chris, Katie) want control over analysis rather than pre-formatted dashboards. They'll do their own slicing, segmentation, and visualization.

**Recommendation:** MVP should focus on clean CSV export with proper column headers for all 29 questions + optional comments. No dashboard or visualization layer needed for MVP.

---

## User Needs (Jobs to Be Done)

### Need 1: When I complete a conference, I want to provide feedback while experience is fresh, so I can give accurate sentiment before context switching back to work

**Supporting evidence:**
- Katie: "Once people leave, back to their lives, back to work, it's another thing to do"
- Chris: "When you finally do take it, you don't necessarily have the same raw emotion that you had in the moment"
- Sarah: "Ideally I do this frankly on my flights back" - immediate post-conference timing
- Lauren: "I always prefer to fill it out, like, while I'm there at the end of the day"

**Priority:** High - This is foundational to response rates and data quality

**Current satisfaction:** Poor - current practice sends surveys post-conference via email

---

### Need 2: When I invest time providing feedback, I want to see evidence it was valued and acted upon, so I can trust the process is worthwhile

**Supporting evidence:**
- Andrew: "It's just a black hole. You send it down the pipe" - wants "action-based follow-up communication"
- Sarah: "Close to none" seeing what happens with feedback - needs "human acknowledgement"
- Chris: "If they don't take any action about it... Then why? Why did I take that survey?"
- Katie: Publishes conference feedback summaries publicly on blog

**Priority:** High - This determines willingness to participate in future surveys

**Current satisfaction:** Very poor - Andrew and Sarah report almost never seeing follow-up

---

### Need 3: When I encounter a survey question without relevant feedback, I want to skip it without abandoning the entire survey, so I can complete what I have input on

**Supporting evidence:**
- Sarah: "If you don't have any feedback on that, it doesn't let you proceed. Those are frustrating"
- Andrew: "I would potentially want to just not do that question" - needs question-level skip capability
- Sarah: Has abandoned surveys "several times" due to mandatory fields

**Priority:** High - Prevents abandonment

**Current satisfaction:** Poor - Sarah encounters mandatory fields frequently

---

### Need 4: When I complete a quick survey, I want to finish in under 5 minutes, so it doesn't feel like a burden on my time

**Supporting evidence:**
- Sarah: "More than five minutes" is her abandonment threshold
- Lauren: Suggests "5-10 minutes during 5-6pm break" as acceptable conference window
- Andrew: Values "under 5 minutes total" for quick surveys
- Chris: Balances this against need for quality data - proposes 8-10 minute target

**Priority:** Medium-High - Defines upper bound of survey length

**Current satisfaction:** Variable - depends on survey design

---

### Need 5: When I analyze conference feedback, I want raw CSV data with demographic fields, so I can perform custom segmentation analysis

**Supporting evidence:**
- Lauren: "I love the raw data... I can dice it the ways I need to" - needs demographic splits (active/associate, client/employee, location, travel)
- Chris: Wants "raw excel of all the questions, all the answers, all the numbers"
- Lauren: "95% completion or completion from all of our active team members" - needs high response rate for meaningful analysis

**Priority:** High for data consumers (Lauren, Chris, Katie)

**Current satisfaction:** Good with Google Forms - they've used this successfully before

---

### Need 6: When I justify expensive conference investments, I want data showing emotional sentiment about Saturday time commitment, so I can decide whether to continue this format

**Supporting evidence:**
- Katie: "We're very conscious that this is on a Saturday, and it's people's personal time" - needs to measure if "this time commitment worth it"
- Katie: "These are expensive things. Do they still create the value or should we do something different next time?"
- Katie: Must measure 4 areas: emotional sentiment, logistics, learning, networking

**Priority:** Critical - This is Katie's primary decision-making need

**Current satisfaction:** Unknown - hasn't had systematic measurement before

---

## Identified Pain Points (Ranked)

### 1. **Survey Black Hole Effect** (Mentioned by 4 of 5 participants)
- **Impact**: High - Creates survey fatigue and reduces future participation
- **Current workaround**: Andrew and Sarah skip surveys entirely unless no other feedback option; Katie publishes results to combat this
- **Opportunity**: Implement transparent feedback loop showing (1) acknowledgment, (2) actions taken, (3) decision explanations
- **Evidence**: Andrew ("black hole... unclear what happens"), Sarah ("close to none" seeing results), Chris ("why did I take that survey?"), Katie (publishes summaries)

### 2. **Post-Conference Survey Timing Reduces Response Rates** (Mentioned by 5 of 5 participants)
- **Impact**: High - Direct effect on data quantity and quality
- **Current workaround**: Sending follow-up reminders (ineffective); accepting low response rates
- **Opportunity**: In-conference completion window during final day break (5-6pm)
- **Evidence**: Katie ("once people leave... another thing to do"), Lauren ("while I'm there at the end of the day"), Chris (travel timing conflict), Sarah (wants access during travel home), Andrew (before attendees leave venue)

### 3. **Mandatory Fields Force Abandonment** (Mentioned by 2 of 5 participants, but critical)
- **Impact**: High - Causes complete survey abandonment
- **Current workaround**: Abandoning surveys (Sarah "several times")
- **Opportunity**: Zero mandatory fields; all 29 questions optional
- **Evidence**: Sarah ("if you don't have any feedback on that, it doesn't let you proceed"), Andrew (wants question-level skip capability)

### 4. **Survey Length Exceeds Attention Span** (Mentioned by 2 of 5 participants)
- **Impact**: Medium-High - Sarah has abandoned surveys for this reason
- **Current workaround**: Survey abandonment; providing shortened responses
- **Opportunity**: Target 5-minute minimum, 8-10 minute typical completion time
- **Evidence**: Sarah ("more than five minutes" threshold), Lauren (suggests 5-10 minute window)

### 5. **Lack of Demographic Segmentation for Analysis** (Mentioned by 3 of 5 participants)
- **Impact**: High for data consumers - Can't understand group differences
- **Current workaround**: None - analyzing aggregated data only
- **Opportunity**: Capture 5 demographic fields (employment status, role type, location, travel distance, optional name)
- **Evidence**: Lauren ("dice it based on who's active, clients, employees"), Chris (Forrester standard practice), Katie (wants to understand community connection differences)

### 6. **Uncertain ROI on Conference Investment** (Mentioned by 2 of 5 participants)
- **Impact**: High - Affects strategic decision to continue conferences
- **Current workaround**: Relying on general positive feedback without systematic measurement
- **Opportunity**: Measure Katie's 4 areas: emotional sentiment, logistics, learning, networking
- **Evidence**: Katie ("expensive things... do they still create value?"), Lauren ("my biggest fear is that we go after something and nobody's interested")

### 7. **Loss of Raw Emotion Over Time** (Mentioned by 2 of 5 participants)
- **Impact**: Medium - Affects authenticity and accuracy of feedback
- **Current workaround**: Waiting days/weeks for survey completion (accepts lower quality)
- **Opportunity**: In-conference completion captures immediate sentiment
- **Evidence**: Chris ("you don't necessarily have the same raw emotion that you had in the moment"), Andrew (emotions/thoughts fade)

### 8. **Untested Survey Logic Creates Data Gaps** (Mentioned by 1 of 5 participants, but critical)
- **Impact**: High when it occurs - Missing critical data from expensive research
- **Current workaround**: None - data lost permanently
- **Opportunity**: Thorough testing protocol before launch (by Nov 17)
- **Evidence**: Chris's Forrester example ("two of the questions never showed up")

### 9. **Mobile Device Limitation for Long-Form Responses** (Mentioned by 2 of 5 participants)
- **Impact**: Medium - Affects response quality for open-ended questions
- **Current workaround**: Providing shortened mobile responses; waiting for computer access
- **Opportunity**: Mobile-optimized UI; optional comment boxes (not required)
- **Evidence**: Andrew ("mobile input modality not suitable for thoughtful responses"), Katie (uncertain about device targeting)

### 10. **Free-Form Feedback Overwhelming Volume** (Mentioned by 1 of 5 participants)
- **Impact**: Medium - Makes analysis difficult
- **Current workaround**: Considering structured questions to limit scope
- **Opportunity**: Structured Likert scales with optional comment boxes (18 available but not required)
- **Evidence**: Lauren ("free flow text field with no character limit produced a lot of complaints")

---

## Potential Features/Stories

### Feature: In-Conference Survey Completion Window

**User story:** As a conference attendee, I want to complete the survey during the final conference break before I leave, so I can provide feedback while experience is fresh without it becoming post-conference homework

**Validation:** 5/5 participants emphasized in-conference timing (Katie, Lauren, Chris, Sarah, Andrew)

**User value:**
- Higher response rates (capture before context switch)
- More accurate sentiment (raw emotions preserved)
- Better attendee experience (completes feedback obligation on-site)

**Effort estimate:** S - Survey already designed; timing is operational decision

**Priority:** Must have - Foundational to response rate success

**Dependencies:** Survey must be mobile-responsive for phones/tablets during break

---

### Feature: Question-Level Transparency About Data Usage

**User story:** As a survey respondent, I want to see beneath each question how this data will be used, so I can understand the purpose and feel confident providing authentic feedback

**Validation:** Andrew (explicit request), Sarah (wants to understand purpose), Katie (values transparency), Chris (understanding survey strategy)

**User value:**
- Builds trust that feedback serves real purpose
- Addresses "black hole" perception
- Aligns responses with actual data needs

**Effort estimate:** XS - Add transparency note beneath each of 29 questions (already drafted in proposed-survey-questions.md)

**Priority:** Must have - Critical for authentic participation

**Dependencies:** None

**Implementation notes:**
- Display in smaller, lighter text beneath each question
- Example: "This helps us understand overall event quality and justify future investment in conferences."

---

### Feature: Zero Mandatory Fields

**User story:** As a survey respondent, I want all questions to be optional, so I can skip questions where I have no meaningful feedback without abandoning the survey

**Validation:** Sarah (hard requirement from Principal Engineer perspective), Andrew (wants question-level skip capability)

**User value:**
- Prevents survey abandonment
- Respects respondent's selective expertise
- Increases completion rate by removing friction

**Effort estimate:** XS - Configure all 29 questions as optional (no required fields)

**Priority:** Must have - Sarah will abandon otherwise

**Dependencies:** None

**Trade-off:** May reduce data completeness, but better to get partial data from 35 people than complete abandonment from those encountering irrelevant mandatory fields

---

### Feature: 5-10 Minute Target Completion Time

**User story:** As a conference attendee with limited time, I want to complete the survey in 5-10 minutes, so it feels like reasonable time investment rather than burden

**Validation:** Sarah (5-minute threshold), Lauren (suggests 5-10 minute break window), Chris (balances depth with tolerance)

**User value:**
- Respects attendee time
- Increases completion likelihood
- Maintains focus and quality of responses

**Effort estimate:** M - Requires careful question design and testing to hit time target

**Priority:** Must have - Defines survey scope constraints

**Dependencies:** User testing to validate actual completion time

**Implementation notes:**
- 29 questions with 18 optional comment boxes
- Estimated 6 minutes minimum (no comments), 8 minutes typical, 10 minutes maximum
- Progress indicator showing "Question X of 29"

---

### Feature: Raw CSV Export with Demographic Segmentation

**User story:** As a conference data consumer (Lauren, Chris, Katie), I want to export all survey responses as raw CSV with demographic fields, so I can perform custom segmentation analysis

**Validation:** Lauren (explicit must-have), Chris (Forrester standard practice), Katie (used Google Forms exports before)

**User value:**
- Enables custom analysis and cross-referencing
- Supports demographic segmentation (active/associate, client/employee, location, travel)
- Allows data consumers to create their own visualizations

**Effort estimate:** S - Standard CSV export functionality with proper column headers

**Priority:** Must have - Lauren's non-negotiable requirement

**Dependencies:** Demographics section (Q25-Q29) capturing:
- Employment status
- Client-facing role
- Office location
- Travel distance
- Optional name

---

### Feature: Choice Ranking for Session Format Preferences

**User story:** As a conference data consumer, I want attendees to rank session types in order of value, so I can get quantitative data on format preferences without overwhelming free-form text

**Validation:** Lauren (specific request for drag-and-drop ranking), Katie (interested in format decisions)

**User value:**
- Provides quantitative ranking data
- Avoids overwhelming free-form complaints
- Informs future conference format decisions

**Effort estimate:** M - Implement drag-to-reorder or dropdown ranking UI (1-5) for Q16

**Priority:** Should have - Lauren's preferred approach, not critical for MVP

**Dependencies:** Mobile-friendly ranking interface

**Question:** Rank these session types (1 = most valuable, 5 = least valuable):
- Keynote presentations
- Interactive workshops
- Open space / unconference sessions
- Panel discussions
- Networking / social time

---

### Feature: Katie's 4 Measurement Areas Coverage

**User story:** As Managing Director responsible for conference investment decisions, I want survey questions covering emotional sentiment, logistics, learning outcomes, and networking effectiveness, so I can justify whether expensive Saturday conferences deliver value

**Validation:** Katie (primary stakeholder defining success), Lauren (executes on Katie's strategic decisions)

**User value:**
- Enables strategic decision-making about conference continuation
- Justifies significant financial investment
- Addresses Saturday personal time concern

**Effort estimate:** M - Covered by 24 core questions across sections 1-7

**Priority:** Must have - Defines entire survey purpose

**Dependencies:** None - questions already designed to cover these 4 areas

**Implementation notes:**
Section 1-2: Overall Experience (2Q) - emotional sentiment
Section 2: Networking & Community (4Q) - networking effectiveness
Section 3: Learning & Content (4Q) - learning outcomes
Section 4: Saturday Personal Time (1Q) - emotional sentiment about time investment
Section 5: Logistics (4Q) - logistics effectiveness

---

### Feature: Feedback Loop Visibility

**User story:** As a survey respondent, I want to see evidence that my feedback was read and acted upon, so I can trust the process is worthwhile and participate in future surveys

**Validation:** Andrew ("black hole" effect), Sarah (needs human acknowledgement), Chris (questions "why did I take that survey?")

**User value:**
- Builds trust for future participation
- Addresses survey fatigue
- Demonstrates feedback is valued

**Effort estimate:** S - Implement Q23 (noticed improvements from last year) and Q24 (what builds confidence)

**Priority:** Should have - Critical for repeat conference trust, but post-MVP operational concern

**Dependencies:** Operational commitment to publishing results and taking visible actions

**Implementation notes:**
- Q23: "If you attended last year's NAM Conference, did you notice improvements based on previous feedback?"
- Q24: "What would make you most confident that your feedback will be acted upon?" (multiple select)

---

### Feature: Mobile-Responsive Survey Interface

**User story:** As a conference attendee completing survey on my phone during the break, I want the interface to work smoothly on mobile devices, so I can complete without frustration

**Validation:** Katie ("I don't know which device they would do it on... is it better to target a mobile device?"), Andrew (mobile limitations for long-form), Sarah (completes surveys on phone or computer)

**User value:**
- Enables in-conference completion during break
- Accommodates attendee device preferences
- Reduces completion friction

**Effort estimate:** M - Mobile-first responsive design for all question types

**Priority:** Must have - In-conference completion window assumes mobile access

**Dependencies:** None

**Implementation notes:**
- Choice ranking (Q16) must work on mobile
- Multiple select checkboxes mobile-friendly
- Optional comment boxes work with mobile keyboards
- Progress indicator visible on small screens

---

### Feature: Optional Comment Boxes After Structured Questions

**User story:** As a survey respondent, I want to add explanatory text directly after questions where I have specific context, so I can provide nuance beyond structured ratings without being forced to write essays

**Validation:** Sarah ("I prefer that it should be part of that question... multiple choice followed by a small optional thing"), Lauren (wants to avoid overwhelming free-form text)

**User value:**
- Captures nuanced context when respondent wants to elaborate
- No mandatory text requirements (prevents abandonment)
- Balances structured data with qualitative depth

**Effort estimate:** M - 18 optional comment boxes after relevant questions

**Priority:** Should have - Enhances data quality without creating barriers

**Dependencies:** Mobile-friendly text input

**Implementation notes:**
- Clearly marked as "Optional"
- Available after most rating questions (13 Likert scales + 5 others)
- Not counted toward 29-question total for progress indicator

---

## Workflow Patterns

**Common workflow observed across interviews:**

### Conference Feedback Collection (Organizer Perspective - Katie, Lauren)

1. **Pre-conference**: Create survey questions and test functionality
2. **In-conference announcement**: Communicate survey availability during conference (not pre-send)
3. **In-conference completion window**: Attendees complete during 5-6pm final day break
4. **Immediate collection**: Responses captured before attendees leave venue
5. **Post-conference analysis**: Review raw CSV data, segment by demographics
6. **Public reporting**: Publish summary on blog (Katie's existing practice)
7. **Action planning**: Use insights to inform next year's venue, format, schedule decisions

**Tools used:** Google Forms (previous year), new survey app (this year)

**Pain points:** Post-conference timing reduces response rates; lack of systematic measurement of Katie's 4 areas

### Survey Completion (Attendee Perspective - Andrew, Sarah, Chris)

1. **Receive invitation**: Announcement during conference (or email post-conference)
2. **Assess purpose**: Determine if feedback is genuinely wanted or performative
3. **Evaluate time investment**: Check expected completion time and question types
4. **Choose device**: Mobile if during conference break, computer if detailed responses needed
5. **Complete questions**: Skip questions without relevant feedback
6. **Submit**: Hope for acknowledgment but expect "black hole"
7. **Post-submission**: Rarely see what happens with feedback; develops survey fatigue

**Current workarounds:** Skipping surveys entirely if perceived as performative; abandoning partway if mandatory fields encountered

### Survey Analysis (Data Consumer Perspective - Lauren, Chris, Katie)

1. **Export raw data**: Download CSV with all responses
2. **Segment by demographics**: Filter by active/associate, client/employee, location, travel
3. **Identify patterns**: Look for trends across segments
4. **Create visualizations**: Build custom slides/reports from raw data
5. **Present findings**: Share with leadership team for budget approval
6. **Publish results**: Blog post with summary (Katie's transparency practice)

**Tools used:** Google Forms exports, Excel, PowerPoint

**Pain points:** Currently no systematic feedback collection; relying on trial-and-error

---

## User Segmentation Insights

Discovery revealed **3 distinct user segments** with different needs:

### Segment 1: Data Consumers (Katie, Lauren, Chris - organizers/leadership)
- **Needs**: Raw CSV export, demographic segmentation, comprehensive coverage of Katie's 4 areas
- **Pain points**: Uncertain ROI on conferences, lack of systematic measurement
- **Priorities**: Data quality and depth over respondent convenience
- **Success metrics**: 75-95% response rate (30-38 of 40 attendees)

### Segment 2: Completion-Sensitive Attendees (Sarah, Andrew)
- **Needs**: Quick completion (5-10 minutes), transparency about data usage, visible feedback loop
- **Pain points**: Survey black hole effect, mandatory fields, excessive length
- **Priorities**: Time respect and authenticity over comprehensiveness
- **Success metrics**: Can complete without frustration or abandonment

### Segment 3: Survey Design Experts (Chris - dual role)
- **Needs**: Professional quality standards, tested survey logic, proper question design
- **Pain points**: Questions that miss the mark, untested logic failures
- **Priorities**: Strategic survey design working backwards from intended use
- **Success metrics**: 75% response rate (30/40), statistically meaningful data

**Design tension:** Segment 1 (data consumers) wants comprehensive coverage while Segment 2 (attendees) will abandon if too long or complex. Chris (Segment 3) bridges this by applying professional standards to balance depth with completion tolerance.

**Resolution strategy:** Prioritize Katie's 4 non-negotiable measurement areas (emotional sentiment, logistics, learning, networking) and make everything optional. Target 8-10 minutes with 29 questions, knowing Sarah's 5-minute threshold means some will complete faster by skipping optional comments.

---

## Competitive Insights

**Alternatives mentioned:**

1. **Google Forms** (Katie, Lauren)
   - Pros: Easy to create, multi-device support, clean CSV export
   - Cons: Generic experience, no question-level transparency, sent post-conference
   - Katie's assessment: "Seemed to work pretty well" but timing still problematic

2. **Conversational AI Feedback** (Katie's aspiration, Andrew's ideal)
   - Katie: "What would be really interesting... could you have a conversational LLMs like an agent that's interviewing you"
   - Andrew: Prefers event retrospective discussion or sticky notes on wall over forms
   - Assessment: Exciting future possibility but "might make it too complicated" for MVP

3. **In-Person Retrospectives** (Andrew's strong preference)
   - Andrew: "If you really wanted it. It would be the most authentic way to get it, to do a retro with the attendees"
   - Assessment: Most authentic but difficult to scale; time constraints during conference

4. **Qualtrics** (Chris's Forrester experience for waves)
   - Pros: Professional survey platform, branching logic, screening capabilities
   - Cons: Complex, expensive, overkill for 40-person conference
   - Assessment: Professional standard for formal research, unnecessary for this context

**Competitive advantage for new app:**
- In-conference timing (Google Forms doesn't enforce this)
- Question-level transparency (none of alternatives provide this)
- Designed specifically for conference context (not generic survey tool)
- Mobile-first for in-break completion (not post-conference email)

---

## Open Questions

### Question 1: What specific response rate threshold determines "success" vs "failure"?
**Why it matters:** Lauren wants 95% (38/40), Chris targets 75% (30/40), Sarah's constraints suggest lower may be realistic.
**Who can answer:** Katie (primary decision-maker)
**For next cycle:** Define minimum acceptable response rate to inform design trade-offs

### Question 2: How will feedback loop visibility be operationalized post-survey?
**Why it matters:** Andrew and Sarah need evidence feedback was acted upon; Katie publishes summaries but operational commitment unclear.
**Who can answer:** Katie, Lauren, Danielle (network engagement team)
**For next cycle:** Define process for acknowledging responses, publishing results, communicating actions taken

### Question 3: Should survey differentiate between in-person and remote attendees?
**Why it matters:** Remote consultants may have different networking needs; demographics include location but not attendance mode.
**Who can answer:** Katie, Lauren
**For next cycle:** Clarify if hybrid/remote attendance requires different questions

### Question 4: What are the actual logistics pain points from previous year that should be specifically measured?
**Why it matters:** Katie mentioned "a lot of complaints about the venue" from free-form text but specific issues unclear.
**Who can answer:** Katie, Lauren (have previous year's feedback write-up)
**For next cycle:** Review previous conference feedback document to understand recurring logistics issues

### Question 5: How does survey timing integrate with conference schedule logistics?
**Why it matters:** Lauren suggests 5-6pm break but unclear if this conflicts with other conference activities or dinner.
**Who can answer:** Lauren (conference logistics coordinator)
**For next cycle:** Confirm exact timing and communication plan for in-conference survey announcement

### Question 6: Should there be different questions for first-time vs repeat attendees?
**Why it matters:** Q23 asks about improvements from last year, which only applies to repeat attendees.
**Who can answer:** Katie, Lauren
**For next cycle:** Determine if new attendees need different question set or if conditional logic needed

### Question 7: What specific actions resulted from previous year's feedback?
**Why it matters:** Q23 asks if attendees noticed improvements, but unclear what specific changes were made.
**Who can answer:** Katie (has previous feedback write-up and can identify actions taken)
**For next cycle:** Document specific improvements made year-over-year to validate feedback loop

### Question 8: Is anonymous response critical or is optional name field acceptable?
**Why it matters:** Q29 offers optional name field but Andrew/Sarah value anonymity; unclear if this creates pressure.
**Who can answer:** All participants
**For next cycle:** Validate that optional name field doesn't undermine perceived anonymity

---

## Recommended Next Steps

### 1. PM Interview Follow-Up (This Week - Nov 14-15)
**Action:** Interview Katie Coleman to answer open questions 1, 2, 4, 7
**Rationale:** Need decision on success metrics, feedback loop commitment, previous year context
**Owner:** Mike Mitchell
**Timing:** Before requirements extraction (needed for story prioritization)

### 2. Survey Timing Coordination (This Week - Nov 14-15)
**Action:** Confirm with Lauren exact conference schedule and survey announcement timing
**Rationale:** In-conference completion window critical to design; need to coordinate with break schedule
**Owner:** Mike Mitchell
**Timing:** Before MVP development

### 3. User Testing Protocol (Week of Nov 17)
**Action:** Test survey with 3-5 EE staff to validate 8-10 minute completion time and mobile UX
**Rationale:** Chris's lesson about untested survey logic; Sarah's 5-minute threshold needs validation
**Owner:** Mike Mitchell
**Timing:** Nov 17 (per testing checklist in proposed-survey-questions.md)

### 4. Requirements Extraction (Week of Nov 17)
**Action:** Run `/req` command to generate epic and user stories from this synthesis
**Rationale:** Convert discovery insights into actionable development stories
**Owner:** Mike Mitchell
**Timing:** After PM interview answers open questions

### 5. CSV Export Format Specification (Week of Nov 17)
**Action:** Document exact CSV column headers and demographic field formatting for Lauren's analysis needs
**Rationale:** Lauren's must-have requirement needs clear specification
**Owner:** Development team
**Timing:** During requirements/story creation

### 6. Mobile-First Design Review (Week of Nov 17)
**Action:** Review proposed UI/UX for choice ranking (Q16), multiple select checkboxes (Q5, Q8, Q24), and optional comment boxes on mobile devices
**Rationale:** In-conference completion assumes mobile use during break
**Owner:** Design/development team
**Timing:** Before development starts

### 7. Previous Conference Feedback Review (Week of Nov 17)
**Action:** Obtain and review Katie's previous conference feedback write-up and published blog summary
**Rationale:** Understand historical context, logistics pain points, and what actions were taken
**Owner:** Mike Mitchell
**Timing:** Informs question refinement and baseline for Q23

### 8. Feedback Loop Operational Planning (Week of Nov 17)
**Action:** Define process for post-survey acknowledgment, results analysis timeline, and public summary publication
**Rationale:** Andrew and Sarah need confidence feedback loop is real, not performative
**Owner:** Katie, Lauren, Mike Mitchell
**Timing:** Before survey launch (needed for transparency notes)

---

## Appendix

### Participant Demographics

**Katie Coleman** - Managing Director
- Primary decision-maker for conference investment
- Responsible for network engagement strategy
- Has used Google Forms for previous conference feedback
- Dual role: conference organizer and attendee

**Lauren Kessler** - Conference Logistics Coordinator
- Responsible for venue, food, transportation, booking logistics
- Data consumer for demographic analysis
- Handles pre-conference communication (instructions clarity challenges)
- Works with Katie on conference planning

**Chris Condo** - Client Partner / Survey Design Expert
- Former Forrester analyst with extensive survey research background
- Experience designing thought leadership surveys, total economic impact studies, wave evaluations
- Understands professional quality standards (50+ responses for statistical significance)
- Dual role: conference attendee and potential data consumer

**Andrew Shawcare** - Conference Attendee (Senior Consultant)
- Represents skeptical attendees who question survey authenticity
- Has experienced "black hole" effect with surveys
- Values transparency and visible feedback loops
- Prefers discussion-based feedback over forms

**Sarah Aslanifar** - Conference Attendee (Principal Engineer)
- 4+ years at Equal Experts
- Extensive conference speaking/attending experience
- Represents completion-sensitive attendees with hard constraints
- Has abandoned "several" surveys due to length or mandatory fields

### Research Methods

**Interview Approach:**
- 5 semi-structured interviews conducted November 12-13, 2025
- Mix of stakeholders: 2 organizers/data consumers (Katie, Lauren), 1 survey expert (Chris), 2 attendees (Andrew, Sarah)
- Interviews captured using Granola AI note-taking tool
- New interview template structure focused on pain points, unmet needs, aspirations, current workflows

**Observations:**
- Previous conference feedback document (PDF) referenced but not analyzed in detail
- Key requirements document consolidating Katie's 4 measurement areas
- Proposed survey questions (29 questions across 8 sections) drafted from discovery insights

**Timing:**
- Discovery cycle started Nov 12 with Katie and Lauren interviews
- Completed Nov 13 with Chris, Andrew, and Sarah interviews
- Synthesis completed Nov 14

**No surveys conducted** - primary research method was stakeholder interviews to understand requirements before designing survey questions.
