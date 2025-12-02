# Discovery Synthesis
**Date:** 2025-11-19
**Interviews Analyzed:**
- interview-mike-mitchell-2025-11-12.md
- interview-katie-coleman-2025-11-12.md
- interview-lauren-kessler-2025-11-12.md
- interview-sarah-aslanifar-2025-11-13.md
- interview-andrew-shawcare-2025-11-13.md
- interview-chris-condo-2025-11-13.md
- interview-mike-mitchell-pm-followup-2025-11-17.md

**Participants:** Managing Director, Conference Planner, Principal Engineer, Senior Consultant, Client Partner, Product Manager (7 interviews total, representing both conference organizers and attendees)

## Executive Summary

The NAM Conference Survey must serve dual audiences: conference organizers who need data to justify significant financial investment and guide future planning, and attendees who need to feel their Saturday personal time commitment is valued through meaningful feedback collection. This discovery cycle reveals that survey success depends less on technical sophistication and more on demonstrating genuine respect for participants' time and input.

Conference organizers require measurement across four critical dimensions: emotional sentiment about the Saturday time commitment, logistics effectiveness, learning outcomes, and networking quality. They need this data in analyzable formats that support demographic segmentation and strategic decision-making. Success means achieving 90-95% response rates (36-38 of 40 attendees) by collecting feedback during the conference before attendees depart.

However, attendees will only participate when surveys respect clear boundaries: completion must take under 5 minutes with zero mandatory fields, feedback must demonstrably influence future decisions, and the experience must feel authentic rather than performative. The research reveals a fundamental tension between organizers' comprehensive data needs and attendees' completion barriers—a tension resolved by designing questions that capture rich insights efficiently while building trust through visible transparency about data usage and follow-up on previous feedback.

The MVP must focus exclusively on reliable survey completion and data storage, with a hard deadline of November 19, 2025 for testing readiness. All data analysis, visualization, results presentation, authentication, and survey management functionality are explicitly deferred to future iterations.

## Key Themes

### Theme 1: Time Respect as Trust Foundation
**Evidence from:**
- Principal Engineer (Interview sarah-aslanifar): "More than five minutes" exceeds tolerance threshold; has abandoned "several times" when surveys too long
- Managing Director (Interview katie-coleman): "We're very conscious that this is on a Saturday, and it's people's personal time that we're routing into"
- Conference Planner (Interview lauren-kessler): "If you give me a task to do on the plane, I'm not gonna do it"
- Senior Consultant (Interview andrew-shawcare): Only completes surveys "if there's no other option to give feedback"

**Implication:** Survey length directly impacts response rates and organizational trust. When surveys demand excessive time, attendees perceive this as disrespect for their contribution. The Saturday conference setting amplifies this sensitivity—organizers are already asking for personal time commitment, and survey completion should honor rather than extend that burden. Attendees who complete quick, focused surveys feel their time is valued; those forced through lengthy surveys question whether their participation matters.

**Business Requirement:** The system must enable complete survey responses within 5 minutes for baseline completion, with 8-10 minutes maximum for comprehensive responses including optional commentary. This time constraint shapes all design decisions: question quantity, format selection, and optional versus required fields.

---

### Theme 2: Feedback Loop Visibility Drives Participation
**Evidence from:**
- Senior Consultant (Interview andrew-shawcare): "It's just a black hole. You send it down the pipe. And it's unclear what happens to the survey or whether it was worth your time filling it out."
- Principal Engineer (Interview sarah-aslanifar): "Close to none" when asked about seeing what happens with feedback; "Even if they don't use my feedback, just knowing that someone took the time to read that and consider it"
- Client Partner (Interview chris-condo): "If equal Experts took any actions based on it… If they don't take any action about it. If nothing changes. Then I'm going to say, then why? Why did I take that survey?"
- Managing Director (Interview katie-coleman): Previous year "didn't really know what to do afterwards" with consulting skills feedback

**Implication:** The perceived fate of survey responses fundamentally determines future participation willingness. When feedback disappears without acknowledgment or visible action, attendees conclude their input is performative rather than valuable. This creates a destructive cycle: organizers collect less data as response rates decline, attendees see less evidence of impact, and trust erodes. Conversely, visible follow-through transforms surveys from bureaucratic exercises into genuine dialogue about conference improvement.

**Business Requirement:** The system must demonstrate respect for participant input through immediate acknowledgment of submission, transparency about how each question's data will be used, and mechanisms for attendees to understand whether previous feedback influenced conference improvements. This includes question-level transparency notes, tracking improvements from previous conferences, and enabling follow-up on specific responses.

---

### Theme 3: In-Conference Completion Maximizes Quality and Quantity
**Evidence from:**
- Conference Planner (Interview lauren-kessler): "I always prefer to fill it out, like, while I'm there at the end of the day"; "I'd rather kind of leave everything at the conference"
- Client Partner (Interview chris-condo): "A lot of times when you're traveling to a conference, you have to travel back. And so the survey comes at an inconvenient time. When you're traveling. And then you get home and you forget to take it."
- Principal Engineer (Interview sarah-aslanifar): Prefers completing "frankly on my flights back" for overall conference feedback while memory fresh
- Managing Director (Interview katie-coleman): "Once people leave, back to their lives, back to work, it's another thing to do, isn't it?"

**Implication:** Survey timing profoundly affects both response rates and feedback authenticity. Post-conference distribution faces three critical challenges: competing priorities once attendees return to normal work, fading emotional connection to conference experience, and lost momentum as immediate reactions give way to rationalized retrospectives. In-conference completion captures authentic sentiment while experience is fresh, eliminates post-departure follow-up burden, and leverages captive audience during scheduled breaks.

**Business Requirement:** The system must support completion before attendees leave the conference venue, designed as a scheduled activity during conference breaks rather than post-event distribution. This requires mobile-optimized design since attendees will complete on phones during breaks, integration with conference schedule logistics, and potentially enforcement mechanisms like tying completion to break activities.

---

### Theme 4: Strategic Data Needs Require Flexible Analysis
**Evidence from:**
- Conference Planner (Interview lauren-kessler): "I love the raw data… it's more helpful for me to get all of it"; needs "to dice it the ways that I need to… based on who's active, clients, employees versus associates"
- Client Partner (Interview chris-condo): "There's two ways I wanted… the raw excel of all the questions, all the answers, all the numbers… I want to create some very interesting slides based on each question"
- Managing Director (Interview katie-coleman): Needs to measure across four distinct dimensions: emotional sentiment, logistics, learning, networking
- Conference Planner (Interview lauren-kessler): "My biggest fear is that we go after something and nobody's interested"—needs data to make evidence-based planning decisions

**Implication:** Pre-formatted dashboards and summary reports fail strategic planning needs because they lock organizers into predetermined analysis paths. Conference organizers need demographic segmentation (active vs associate, client vs employee, geographic location, travel distance), cross-referencing capabilities to understand different experience patterns, and flexibility to explore unexpected patterns in the data. Raw data access enables custom analysis that answers specific strategic questions about resource allocation, event format effectiveness, and community engagement.

**Business Requirement:** The system must provide direct CSV export with all response data, properly structured demographic fields for segmentation, and support for both quantitative analysis (ratings, rankings) and qualitative insights (open-ended responses). Analysis and visualization functionality is explicitly out of scope for MVP—organizers will perform custom analysis externally.

---

### Theme 5: Question-Level Transparency Builds Authenticity
**Evidence from:**
- Senior Consultant (Interview andrew-shawcare): "For each question, there was, let's say, subtext underneath saying" what the data will be used for; "The more information you give me, great, that's probably helpful to understand my intention"
- Senior Consultant (Interview andrew-shawcare): "I want to skip surveys because I feel somewhat inauthentic. In some way."
- Principal Engineer (Interview sarah-aslanifar): Feedback motivation strongly tied to feeling conference organizers genuinely care about improvement
- Client Partner (Interview chris-condo): "Having a strategy for the survey is the most important thing"—working backwards from intended use

**Implication:** When attendees don't understand why questions are asked or how responses will be used, they perceive surveys as data collection exercises rather than genuine dialogue. This opacity breeds skepticism about organizer intentions and reduces response quality as participants guess at appropriate answer styles. Question-level transparency transforms the experience from interrogation to collaboration, helping attendees provide responses aligned with actual data usage while building trust through organizational honesty.

**Business Requirement:** The system must display clear explanatory text beneath each question describing how that specific data will inform decisions, enable attendees to understand the purpose and value of their responses, and demonstrate that questions serve genuine needs rather than curiosity. This transparency appears in lightweight, non-intrusive formats that don't impede completion flow.

---

### Theme 6: Optional Fields Prevent Abandonment
**Evidence from:**
- Principal Engineer (Interview sarah-aslanifar): "There are sometimes fields that it's like you must enter something and if you don't have any feedback on that, it doesn't let you proceed. Those are frustrating"
- Principal Engineer (Interview sarah-aslanifar): When encountering restrictive options, "abandons survey rather than providing inaccurate response"
- Senior Consultant (Interview andrew-shawcare): Wants ability to "just not do that question" without abandoning entire survey when personal values conflict
- Conference Planner (Interview lauren-kessler): "Response rate. So it needs to be something people actually respond to, because if I only get five people, the data doesn't mean anything to me"

**Implication:** Mandatory fields create a paradox: they attempt to ensure data completeness but instead drive survey abandonment, resulting in less total data collection. When attendees lack meaningful input for required questions, they face an impossible choice: fabricate responses (corrupting data quality), abandon the survey (losing all their feedback), or struggle through frustration (damaging organizer trust). Making all fields optional respects that attendees have varying experiences and knowledge, enabling them to contribute where they have genuine insights.

**Business Requirement:** The system must implement zero mandatory fields across all 19 questions, support partial survey completion where attendees answer only questions relevant to their experience, and enable N/A options for questions that may not apply to all attendees (coworking day attendance, Saturday participation, accommodation usage).

---

### Theme 7: Community Connection Measurement Enables Strategic Planning
**Evidence from:**
- Conference Planner (Interview lauren-kessler): "We don't have great data on how people are feeling about the E community in general. Do they feel part of something bigger, or like they're on their own little island?"
- Managing Director (Interview katie-coleman): "Overwhelmingly. It's nearly always about the connections and meeting people"—networking identified as primary conference value
- Client Partner (Interview chris-condo): "I would want to present. The state of our network. Internally on stage"—aspiration to use survey data to demonstrate network health
- Conference Planner (Interview lauren-kessler): "Before this conversation, I didn't think I was ever gonna get that data, and I was gonna have to do some trial and error"

**Implication:** Remote consultants working primarily for external customers need intentional community connection points, and conferences serve as critical anchors for organizational belonging. However, without measurement, organizers operate blind on community sentiment, making event planning decisions through trial-and-error rather than evidence. Understanding whether conferences strengthen community bonds, how different attendee segments experience networking differently, and what connection formats prove most valuable enables strategic investment in the right community-building approaches.

**Business Requirement:** The system must capture sentiment about connection to the Equal Experts community, measure networking quality across different formats (structured coworking, informal social time, main sessions), and enable demographic analysis to understand how connection experiences vary by role, location, and engagement level. This data informs future event format decisions and broader community engagement strategy.

---

## User Needs, Desires, and Aspirations (Jobs to Be Done)

### Need 1: When I attend a conference on my personal Saturday time, I want to know the organizers value my sacrifice and feedback, so I can feel confident my participation matters

**Type:** Emotional need

**Supporting evidence:**
- Managing Director (Interview katie-coleman): "We're very conscious that this is on a Saturday, and it's people's personal time that we're routing into"
- Principal Engineer (Interview sarah-aslanifar): "If I feel like my feedback is not going to be valued, that's something that I will skip the surveys entirely"
- Senior Consultant (Interview andrew-shawcare): "Build trust that this is gonna be useful to me in some way"

**Priority:** High

**Current satisfaction:** Partially met—organizers are conscious of the burden but lack mechanisms to demonstrate value of feedback collection

---

### Need 2: When I complete a survey, I want to provide authentic feedback efficiently, so I can contribute honest insights without excessive time investment

**Type:** Efficiency need

**Supporting evidence:**
- Principal Engineer (Interview sarah-aslanifar): "More than five minutes" exceeds tolerance threshold; prefers immediate session feedback while memory fresh
- Conference Planner (Interview lauren-kessler): "I'd rather kind of leave everything at the conference. If you give me a task to do on the plane, I'm not gonna do it"
- Senior Consultant (Interview andrew-shawcare): Prefers computer for long-form but mobile acceptable for multiple choice

**Priority:** Must-have

**Current satisfaction:** Unmet—previous surveys either too long or poorly timed

---

### Need 3: When I submit feedback, I want to see evidence that previous responses influenced decisions, so I can trust my input creates real change

**Type:** Validation need

**Supporting evidence:**
- Senior Consultant (Interview andrew-shawcare): "It's just a black hole. You send it down the pipe. And it's unclear what happens"
- Principal Engineer (Interview sarah-aslanifar): "Even if they don't use my feedback, just knowing that someone took the time to read that and consider it"
- Client Partner (Interview chris-condo): "If nothing changes. Then I'm going to say, then why? Why did I take that survey?"

**Priority:** High

**Current satisfaction:** Minimally met—some feedback sharing but limited visible action

---

### Need 4: When I answer survey questions, I want to understand why each question is being asked and how data will be used, so I can provide responses aligned with actual needs

**Type:** Transparency need

**Supporting evidence:**
- Senior Consultant (Interview andrew-shawcare): "For each question, there was, let's say, subtext underneath saying" what the data will be used for
- Client Partner (Interview chris-condo): "Having a strategy for the survey is the most important thing"
- Senior Consultant (Interview andrew-shawcare): "The more information you give me, great, that's probably helpful to understand my intention"

**Priority:** High

**Current satisfaction:** Unmet—surveys typically lack question-level purpose explanation

---

### Need 5: When I plan future conferences, I want demographic-segmented data showing how different groups experienced the event, so I can make evidence-based decisions about venue, format, and content

**Type:** Strategic planning need

**Supporting evidence:**
- Conference Planner (Interview lauren-kessler): "I can dice it the ways that I need to… based on who's active, clients, employees versus associates"
- Conference Planner (Interview lauren-kessler): "My biggest fear is that we go after something and nobody's interested"
- Client Partner (Interview chris-condo): "There's two ways I wanted… the raw excel of all the questions, all the answers, all the numbers"

**Priority:** Must-have

**Current satisfaction:** Partially met—previous surveys collected data but lacked demographic segmentation capability

---

### Need 6: When I justify significant conference investment, I want measurable evidence across four dimensions (sentiment, logistics, learning, networking), so I can demonstrate ROI to stakeholders

**Type:** Accountability need

**Supporting evidence:**
- Managing Director (Interview katie-coleman): "These are expensive things. Do they still create the value or should we do something different next time?"
- Managing Director (Interview katie-coleman): Identified four critical measurement areas: emotional sentiment, logistics, learning, networking
- Client Partner (Interview chris-condo): Target 75% response rate minimum (30 of 40 attendees) for meaningful data

**Priority:** Must-have

**Current satisfaction:** Partially met—previous feedback collected but lacked systematic measurement framework

---

### Need 7: When I encounter survey questions that don't apply to my experience, I want to skip them without abandoning the entire survey, so I can provide honest feedback where I have genuine insights

**Type:** Flexibility need

**Supporting evidence:**
- Principal Engineer (Interview sarah-aslanifar): "There are sometimes fields that it's like you must enter something and if you don't have any feedback on that, it doesn't let you proceed. Those are frustrating"
- Senior Consultant (Interview andrew-shawcare): "I would potentially want to just not do that question" without abandoning entire survey
- Principal Engineer (Interview sarah-aslanifar): Abandons surveys with restrictive answer choices rather than providing inaccurate responses

**Priority:** High

**Current satisfaction:** Unmet—previous surveys contained mandatory fields and restrictive options

---

### Aspiration 1: When I present conference results, I want to share network health data publicly on stage, so I can demonstrate community strength and identify client opportunities

**Type:** Vision / Strategic opportunity

**Supporting evidence:**
- Client Partner (Interview chris-condo): "I would want to present. The state of our network. Internally on stage and say, all right, thanks for fill out the survey… Let's see how our networks do"
- Client Partner (Interview chris-condo): "When I walk into a client someday… I want to be able to say, listen… you're leaving money on the table"
- Client Partner (Interview chris-condo): Use survey data to identify client opportunities and demonstrate untapped value

**Priority:** Future opportunity (exploring)

**Current satisfaction:** Unmet—no current mechanism for real-time results presentation

---

### Aspiration 2: When I collect conference feedback, I want conversational AI to conduct natural interviews, so I can reimagine feedback beyond traditional form constraints

**Type:** Innovation opportunity

**Supporting evidence:**
- Managing Director (Interview katie-coleman): "What would be really interesting… could you have a conversational LLMs like an agent that's interviewing you so you'll effectively just speaking to it"
- Managing Director (Interview katie-coleman): "Maybe we use AI as the tool that's helping to capture a lot of this… you just reimagine this whole way you get feedback"
- Senior Consultant (Interview andrew-shawcare): Ideal solution would be "do a retro with the attendees at the very end and to devote time" for discussion

**Priority:** Exploratory (post-MVP consideration)

**Current satisfaction:** Not addressed—traditional survey forms only

---

### Aspiration 3: When I receive post-survey acknowledgment, I want surprise recognition rather than transactional incentives, so I can feel genuinely appreciated for my contribution

**Type:** Emotional reward

**Supporting evidence:**
- Principal Engineer (Interview sarah-aslanifar): "That's the element of surprise that it's after and not because of it… It's afterwards that's more rewarding than going into it knowing that I will get something"
- Principal Engineer (Interview sarah-aslanifar): Past positive experience with company sending surprise thank-you package weeks after interview feedback
- Senior Consultant (Interview andrew-shawcare): "If someone gives me something to do this, it makes it even more inauthentic. Because it makes it that you have to give me something in order to fill this out"

**Priority:** Nice-to-have (interested concept)

**Current satisfaction:** Not addressed—no post-feedback recognition beyond basic confirmation

---

## Identified Pain Points (Ranked)

1. **Survey feedback disappears into "black hole" without visible follow-up** (Mentioned by 4 of 5 attendee participants)
   - **Impact**: High
   - **Current workaround**: Only complete surveys when no other feedback option exists; reduce future participation
   - **Opportunity**: Demonstrate respect for participant time by showing how previous feedback influenced conference improvements, providing immediate acknowledgment of submission, and sharing action plans based on responses
   - **Evidence**: Senior Consultant (andrew-shawcare), Principal Engineer (sarah-aslanifar), Client Partner (chris-condo), Managing Director (katie-coleman)

2. **Mandatory fields force fabricated responses or survey abandonment** (Mentioned by 3 of 5 attendee participants)
   - **Impact**: High
   - **Current workaround**: Abandon survey rather than provide inaccurate responses; complete only required fields with minimal effort
   - **Opportunity**: Enable honest, selective feedback by making all fields optional, providing N/A options where appropriate, and trusting attendees to contribute where they have genuine insights
   - **Evidence**: Principal Engineer (sarah-aslanifar), Senior Consultant (andrew-shawcare), Conference Planner (lauren-kessler indirectly via response rate concerns)

3. **Survey timing conflicts with travel and competing priorities** (Mentioned by 3 of 4 organizer/attendee participants)
   - **Impact**: Medium/High
   - **Current workaround**: Send follow-up reminders; some conferences send during travel window hoping attendees complete on flights
   - **Opportunity**: Capture feedback during scheduled conference break before attendees depart, maximizing response rates while experience remains fresh and minimizing post-conference burden
   - **Evidence**: Client Partner (chris-condo), Conference Planner (lauren-kessler), Managing Director (katie-coleman)

4. **Survey length exceeds attention threshold** (Mentioned by 2 of 5 attendee participants)
   - **Impact**: High
   - **Current workaround**: Abandon survey partway through; complete quickly without thoughtful responses
   - **Opportunity**: Design focused survey completing in under 5 minutes for baseline responses, with optional commentary for those wanting to provide additional context
   - **Evidence**: Principal Engineer (sarah-aslanifar "more than five minutes" threshold), Conference Planner (lauren-kessler "10 minutes maximum")

5. **Lack of community sentiment measurement prevents strategic planning** (Mentioned by 2 of 3 organizer participants)
   - **Impact**: High
   - **Current workaround**: Trial-and-error approach to event planning without data foundation
   - **Opportunity**: Measure connection to Equal Experts community, networking effectiveness across formats, and demographic variations to inform evidence-based event strategy
   - **Evidence**: Conference Planner (lauren-kessler), Managing Director (katie-coleman)

6. **Unclear question purpose creates response misalignment** (Mentioned by 2 of 5 attendee participants)
   - **Impact**: Medium
   - **Current workaround**: Make assumptions about survey purpose during completion; provide responses based on guessed intent
   - **Opportunity**: Display transparency notes beneath each question explaining data usage, helping attendees provide responses aligned with actual analytical needs
   - **Evidence**: Senior Consultant (andrew-shawcare), Client Partner (chris-condo via strategy emphasis)

7. **Restrictive answer choices prevent authentic feedback expression** (Mentioned by 2 of 5 attendee participants)
   - **Impact**: Medium
   - **Current workaround**: Abandon survey when forced to choose between inaccurate options
   - **Opportunity**: Combine scaled ratings with optional open-ended commentary, enabling both quantitative analysis and nuanced qualitative insights
   - **Evidence**: Principal Engineer (sarah-aslanifar), Senior Consultant (andrew-shawcare via authenticity concerns)

8. **Pre-formatted data presentation limits strategic analysis flexibility** (Mentioned by 2 of 3 organizer participants)
   - **Impact**: Medium
   - **Current workaround**: Request raw data exports for custom spreadsheet analysis
   - **Opportunity**: Provide direct CSV export with all responses and demographic fields, enabling custom segmentation and cross-referencing without visualization constraints
   - **Evidence**: Conference Planner (lauren-kessler), Client Partner (chris-condo)

9. **Mobile device limitation reduces long-form response quality** (Mentioned by 1 of 5 attendee participants)
   - **Impact**: Medium
   - **Current workaround**: Wait for computer access for surveys with open-ended questions; provide shortened responses on mobile
   - **Opportunity**: Design mobile-optimized interface supporting both quick completion and thoughtful commentary, with optional comment fields rather than required essays
   - **Evidence**: Senior Consultant (andrew-shawcare)

10. **Survey design by committee creates unfocused questionnaires** (Mentioned by 1 of 3 organizer participants with survey design expertise)
   - **Impact**: Medium
   - **Current workaround**: Focus surveys within specific scope; use demographic screening to target qualified respondents
   - **Opportunity**: Begin with clear survey strategy defining data usage before question design, ensuring questions align with actual decision-making needs
   - **Evidence**: Client Partner (chris-condo)

## Required System Capabilities

### Capability Area 1: Time-Efficient Survey Completion

Conference attendees are providing feedback during personal Saturday time or conference breaks, creating tight constraints on acceptable time investment. The survey must respect this constraint while still capturing comprehensive data across four critical measurement dimensions: emotional sentiment, logistics, learning, and networking.

**Must provide:**
- Complete baseline survey responses within 5 minutes for efficiency-focused attendees
- Support comprehensive responses with optional commentary within 8-10 minutes maximum
- Enable partial completion where attendees answer only applicable questions
- Mobile-optimized interface supporting completion on phones during conference breaks
- Progress indication showing completion status (Question X of 19)
- Ability to save drafts and return if attendees need to pause

**Supporting evidence:**
- Principal Engineer (Interview sarah-aslanifar): "More than five minutes" exceeds tolerance threshold; abandoned "several times" when surveys too long
- Conference Planner (Interview lauren-kessler): 10-minute maximum completion time with preference for in-conference completion
- Managing Director (Interview katie-coleman): Conscious that Saturday conference already demands personal time commitment

**Success looks like:** 90-95% of attendees (36-38 of 40 people) complete survey during scheduled conference break, with minimal abandonment and strong completion across all demographic segments.

---

### Capability Area 2: Authentic Feedback Collection Without Completion Barriers

Attendees will abandon surveys when forced to provide responses on topics where they lack meaningful input or when required fields prevent progression. The system must enable selective participation while still capturing comprehensive data from those with relevant insights.

**Must provide:**
- Zero mandatory fields across all 19 survey questions
- N/A options for questions that may not apply (coworking day attendance, Saturday participation, accommodation usage, comparison to other professional development)
- Optional comment boxes for additional context on each major topic
- Ability to skip individual questions without abandoning entire survey
- Clear indication that anonymous responses are equally valued

**Supporting evidence:**
- Principal Engineer (Interview sarah-aslanifar): Abandoned surveys when "fields that it's like you must enter something and if you don't have any feedback on that, it doesn't let you proceed"
- Senior Consultant (Interview andrew-shawcare): "I would potentially want to just not do that question" without abandoning entire survey
- Conference Planner (Interview lauren-kessler): "If I only get five people, the data doesn't mean anything to me"—understands completion barriers reduce total data collection

**Success looks like:** High completion rates from diverse attendee segments with minimal abandonment due to question applicability issues; rich optional commentary from those with detailed insights.

---

### Capability Area 3: Question-Level Transparency About Data Usage

Attendees question survey authenticity when they don't understand why questions are asked or how responses will inform decisions. The system must demonstrate genuine purpose behind each question, building trust through organizational transparency about data usage.

**Must provide:**
- Clear explanatory text beneath each question describing how specific data will inform decisions
- Visible transparency notes that don't impede completion flow
- Communication about measurement areas (sentiment, logistics, learning, networking) at survey introduction
- Immediate acknowledgment upon submission confirming feedback was received and will be reviewed

**Supporting evidence:**
- Senior Consultant (Interview andrew-shawcare): "For each question, there was, let's say, subtext underneath saying" what the data will be used for; "The more information you give me, great, that's probably helpful to understand my intention"
- Senior Consultant (Interview andrew-shawcare): "I want to skip surveys because I feel somewhat inauthentic. In some way"
- Client Partner (Interview chris-condo): "Having a strategy for the survey is the most important thing"

**Success looks like:** Attendees understand clear purpose behind questions, provide responses aligned with analytical needs, and perceive survey as genuine dialogue rather than performative data collection.

---

### Capability Area 4: Feedback Loop Visibility and Previous Impact Recognition

The perceived fate of survey responses fundamentally determines future participation willingness. The system must demonstrate that previous feedback influenced conference improvements, building trust that current responses will similarly drive change.

**Must provide:**
- Question asking whether attendees noticed improvements from previous conference feedback
- Multiple-select question exploring what would build confidence that feedback will be acted upon
- Immediate confirmation that submission was received and will be reviewed by conference organizers
- Mechanism for organizers to communicate actions taken based on responses (operational, not technical)

**Supporting evidence:**
- Senior Consultant (Interview andrew-shawcare): "It's just a black hole. You send it down the pipe. And it's unclear what happens to the survey"
- Principal Engineer (Interview sarah-aslanifar): "Close to none" when asked about seeing what happens with feedback; "Even if they don't use my feedback, just knowing that someone took the time to read that and consider it"
- Client Partner (Interview chris-condo): "If nothing changes. Then I'm going to say, then why? Why did I take that survey?"

**Success looks like:** Attendees perceive their feedback as valued input driving real change; visible connection between previous responses and current conference improvements; confidence in organizer commitment to act on data.

---

### Capability Area 5: Strategic Data Analysis and Demographic Segmentation

Conference organizers make significant financial investments requiring justification through measurable evidence. They need flexible data analysis supporting demographic segmentation, custom cross-referencing, and exploration of experience patterns across different attendee segments.

**Must provide:**
- Direct CSV export containing all 19 questions with responses
- Demographic fields: employment status (employee, active associate, alumni associate, client), home location
- Properly structured column headers enabling clean spreadsheet import
- Support for both quantitative analysis (Likert scale ratings, choice rankings) and qualitative insights (open-ended responses)
- No pre-formatted dashboards or visualizations (out of MVP scope—organizers perform external analysis)

**Supporting evidence:**
- Conference Planner (Interview lauren-kessler): "I love the raw data… it's more helpful for me to get all of it"; needs "to dice it the ways that I need to… based on who's active, clients, employees versus associates"
- Client Partner (Interview chris-condo): "There's two ways I wanted… the raw excel of all the questions, all the answers, all the numbers"
- Conference Planner (Interview lauren-kessler): "My biggest fear is that we go after something and nobody's interested"—needs data for evidence-based planning

**Success looks like:** Organizers can segment responses by demographic characteristics, identify different experience patterns across attendee types, and make evidence-based decisions about future conference format, venue, and content.

---

### Capability Area 6: Multi-Dimensional Conference Experience Measurement

Conference success requires understanding four distinct but interconnected dimensions of attendee experience. The system must capture sentiment, logistics effectiveness, learning outcomes, and networking quality in ways that support both independent analysis and holistic understanding.

**Must provide:**
- Emotional sentiment questions about Saturday time commitment value and overall conference rating
- Logistics feedback on accommodations, venue, catering, and pre-conference communication clarity
- Learning outcome questions about educational value, skill development, and future topic interests
- Networking effectiveness questions about connection quality, valuable connection types, and coworking day value
- Return attendance intent and comparison to other professional development opportunities
- Choice ranking to understand relative value of different session formats

**Supporting evidence:**
- Managing Director (Interview katie-coleman): Identified four critical measurement areas: "Did you enjoy it? Was it worth spending your Saturday on?" (sentiment), logistics effectiveness, "Was it informative? Did you learn something?" (learning), "Did you connect with the EE community effectively?" (networking)
- Conference Planner (Interview lauren-kessler): Interested in choice ranking "because then it gives me quantitative data on how people were ranking different things"
- Client Partner (Interview chris-condo): Target 75% response rate minimum (30 of 40 attendees) to ensure meaningful data

**Success looks like:** Organizers can measure ROI across all four dimensions, justify continued conference investment through evidence of value delivery, and identify specific areas requiring improvement or enhanced investment.

---

### Capability Area 7: In-Conference Completion Support

Survey timing profoundly affects both response rates and feedback authenticity. The system must support completion during scheduled conference breaks before attendees depart, capturing immediate reactions while experience is fresh and minimizing post-departure follow-up burden.

**Must provide:**
- Mobile-first responsive design optimizing for phone completion during breaks
- Quick-loading interface supporting completion during limited break windows
- Minimal data entry requirements respecting that attendees are completing on mobile during social time
- Support for 40 concurrent users submitting during concentrated completion window
- No authentication requirement (open link model) removing friction for immediate access

**Supporting evidence:**
- Conference Planner (Interview lauren-kessler): "I always prefer to fill it out, like, while I'm there at the end of the day"; "I'd rather kind of leave everything at the conference"
- Client Partner (Interview chris-condo): "A lot of times when you're traveling to a conference, you have to travel back. And so the survey comes at an inconvenient time. When you're traveling. And then you get home and you forget to take it."
- Managing Director (Interview katie-coleman): "Once people leave, back to their lives, back to work, it's another thing to do, isn't it?"
- Product Manager (Interview mike-mitchell-pm-followup): Target 90-95% response rate achievable through "in-conference scheduled activity provides control over completion"

**Success looks like:** Target 90-95% completion rate (36-38 of 40 attendees) achieved during conference through scheduled activity; minimal need for post-conference follow-up; authentic feedback captured while emotional connection to experience remains strong.

---

## Workflow Patterns

### Current Post-Conference Feedback Collection (As-Is)

**Trigger:** Conference completion; organizers need to measure success and plan future events

**Steps:**
1. **Post-event survey creation** - Organizers use Google Forms to build survey with multiple choice and open-ended questions
2. **Email distribution** - Send survey link to attendees after conference ends, often during travel window
3. **Response collection over 1-2 weeks** - Monitor completion rates; send follow-up reminders
4. **Manual analysis** - Review responses in Google Forms; export to Excel for demographic segmentation
5. **Documentation** - Write summary for internal sharing and potential blog publication
6. **Strategic application** - Use insights to inform next year's venue, format, and content decisions

**Pain points:**
- Timing conflicts with travel create low response rates
- Fading emotional connection reduces feedback authenticity
- Post-conference burden competes with work priorities
- Lack of demographic segmentation limits strategic insights
- Missing community sentiment measurement prevents evidence-based planning
- No systematic feedback loop showing previous responses influenced changes

**What attendees want instead:**
- Complete survey during conference before departure
- Understand question purpose through transparency notes
- Provide selective feedback where they have genuine insights (no mandatory fields)
- See evidence that previous feedback created visible improvements
- Receive immediate acknowledgment that submission was received and valued

---

### Desired In-Conference Feedback Collection (To-Be)

**Trigger:** Scheduled survey completion activity during final conference break (before attendees depart)

**Steps:**
1. **Pre-conference preparation** - Survey URL shared in-person at conference and via email; attendees understand completion is scheduled activity
2. **Scheduled completion during break** - 5-10 minute window during final conference break (5-6pm timeframe); potentially tied to break activities
3. **Mobile completion** - Attendees complete on phones during break; all questions optional; transparency notes explain data usage
4. **Immediate confirmation** - Upon submission, attendees receive acknowledgment that feedback was received and will be reviewed
5. **Raw data export** - Organizers export complete CSV with all responses and demographic fields
6. **Custom analysis** - Conference planner and leadership perform demographic segmentation and strategic analysis using external tools
7. **Action planning** - Leadership team determines conference improvements based on data patterns
8. **Visible follow-through** - Next year's survey includes question asking whether attendees noticed improvements; public summary shared showing how feedback influenced decisions

**Advantages:**
- Captures authentic, immediate reactions while experience is fresh
- Achieves 90-95% response rate target through scheduled in-conference completion
- Eliminates post-conference follow-up burden and travel timing conflicts
- Demographic segmentation enables understanding of different experience patterns
- Question-level transparency builds trust through clear purpose explanation
- Feedback loop visibility demonstrates that responses drive real change

---

### Attendee Survey Completion Decision Flow

**Decision Point 1: Initial Participation**
- **Consideration:** Is my time valued? Will this be quick?
- **Enabler:** 5-minute completion window communicated upfront; mobile-optimized design
- **Barrier:** Unclear time investment; requirement to complete after leaving conference

**Decision Point 2: Question Engagement**
- **Consideration:** Do I understand why this is being asked? Can I skip if it doesn't apply?
- **Enabler:** Transparency notes beneath each question; all fields optional; N/A options provided
- **Barrier:** Mandatory fields forcing fabricated responses; unclear question purpose

**Decision Point 3: Completion vs Abandonment**
- **Consideration:** Is this worth finishing? Will anyone actually read this?
- **Enabler:** Visible progress indicator; question about previous feedback impact; immediate submission acknowledgment
- **Barrier:** Excessive length; "black hole" feeling; lack of visible follow-through from previous surveys

**Decision Point 4: Future Participation**
- **Consideration:** Did I see evidence that my previous feedback mattered?
- **Enabler:** Visible conference improvements; public summary of actions taken; personal acknowledgment
- **Barrier:** No changes observed; feedback disappeared without response

---

## User Segmentation Insights

### Conference Attendee Segments

**Segment 1: Efficiency-Focused Participants (represented by Principal Engineer)**
- **Characteristics:** Values quick completion; strict 5-minute time threshold; will abandon if survey too long
- **Primary needs:** Speed, optional fields, immediate feedback timing
- **Completion pattern:** Completes ratings quickly; skips most optional comment boxes; abandons surveys exceeding threshold
- **Success criteria:** Baseline completion in under 5 minutes
- **Quote:** "More than five minutes" exceeds tolerance; abandoned "several times"

**Segment 2: Authenticity-Focused Participants (represented by Senior Consultant)**
- **Characteristics:** Values genuine dialogue over data collection; skeptical of performative surveys; needs transparency
- **Primary needs:** Clear question purpose, feedback loop visibility, ability to skip questions that don't align with values
- **Completion pattern:** Only participates when survey feels authentic; wants to understand data usage
- **Success criteria:** Question-level transparency; visible evidence of previous impact
- **Quote:** "It's just a black hole. You send it down the pipe. And it's unclear what happens"

**Segment 3: Quality-Focused Participants (represented by Client Partner)**
- **Characteristics:** Brings survey design expertise; values professional quality; understands statistical significance
- **Primary needs:** Well-designed questions, appropriate survey strategy, meaningful results
- **Completion pattern:** Evaluates survey design quality; provides comprehensive responses when design is sound
- **Success criteria:** Questions aligned with clear strategy; proper testing before launch
- **Quote:** "Having a strategy for the survey is the most important thing"

**Segment 4: Convenience-Oriented Participants (represented by Conference Planner)**
- **Characteristics:** Wants to complete during conference and leave everything there; won't complete post-conference tasks
- **Primary needs:** In-conference completion window, mobile optimization, no post-departure burden
- **Completion pattern:** Completes enthusiastically when convenient; ignores post-conference requests
- **Success criteria:** Completion before leaving venue
- **Quote:** "I'd rather kind of leave everything at the conference. If you give me a task to do on the plane, I'm not gonna do it"

---

### Conference Organizer Segments

**Segment 1: Strategic Decision Maker (Managing Director)**
- **Primary responsibility:** Justify significant financial investment in conferences; demonstrate ROI to stakeholders
- **Data needs:** Four-dimensional measurement (sentiment, logistics, learning, networking); evidence of value delivery
- **Success criteria:** Strong positive sentiment about Saturday time commitment; clear learning and networking outcomes
- **Aspirations:** Potentially use conversational AI for feedback collection; publish results demonstrating transparency
- **Quote:** "These are expensive things. Do they still create the value or should we do something different next time?"

**Segment 2: Operational Planner (Conference Planner)**
- **Primary responsibility:** Design future events based on demonstrated attendee interests; manage logistics and format decisions
- **Data needs:** Raw CSV with demographic segmentation; choice ranking for format preferences; community sentiment measurement
- **Success criteria:** 95% completion rate from active team members; ability to perform custom analysis; evidence-based planning
- **Operational challenges:** Clear communication about logistics; understanding whether people feel part of community
- **Quote:** "My biggest fear is that we go after something and nobody's interested"

**Segment 3: Client Relationship Strategist (Client Partner)**
- **Primary responsibility:** Use network intelligence for business development; understand capabilities and client opportunities
- **Data needs:** Statistical significance standards; both raw data and interpreted analysis; demographic screening
- **Success criteria:** 75% response rate minimum (30 of 40 attendees); professionally designed survey; quality over quantity
- **Aspirations:** Present network health data publicly on stage; leverage client intelligence for demonstrating value
- **Quote:** "When I walk into a client someday… I want to be able to say, listen… you're leaving money on the table"

---

## Competitive Insights

### Alternative Feedback Collection Methods

**Traditional Survey Tools (Google Forms, Microsoft Forms)**
- **Attendee feedback:** Previous NAM Conference used Google Forms; Managing Director found it "seemed to work pretty well"—"easy to produce the simple UI to create the questions"
- **Limitations:** Lacks question-level transparency, no built-in feedback loop visibility, limited demographic segmentation in free versions
- **Advantage over alternatives:** Familiar interface; low learning curve

**Post-Event Email Distribution**
- **Attendee feedback:** Universally criticized for poor timing
- **Client Partner:** "Survey comes at an inconvenient time. When you're traveling. And then you get home and you forget to take it."
- **Conference Planner:** "If you give me a task to do on the plane, I'm not gonna do it"
- **Lesson:** In-conference completion critical for response rates and authentic feedback

**Conversational AI/LLM Surveys**
- **Attendee feedback:** Managing Director expressed strong interest: "What would be really interesting… could you have a conversational LLMs like an agent that's interviewing you"
- **Inspiration source:** ChatGPT conversational survey experience
- **Senior Consultant:** Ideal would be "do a retro with the attendees at the very end and to devote time" for discussion
- **Status:** Exploration/curiosity for future iterations; too complex for MVP

**In-Person Retrospective Discussions**
- **Senior Consultant preference:** "If you really wanted it. It would be the most authentic way to get it, to do a retro with the attendees at the very end"
- **Alternative mentioned:** "Sticky notes on a wall" for collaborative feedback
- **Trade-off:** More authentic but challenging to scale; works better for small groups
- **Lesson:** Discussion-based formats valued for authenticity but digital surveys more practical for 40-person conference with distributed attendees

**External Incentive Programs**
- **Attendee feedback:** Universally negative
- **Principal Engineer:** "I'm not big on that incentive stuff because it almost looks fishy… It almost feels the pressure to rate me good"
- **Senior Consultant:** "If someone gives me something to do this, it makes it even more inauthentic"
- **Lesson:** Build intrinsic value through transparency and feedback loops rather than external rewards

---

## Open Questions

All open questions from the initial synthesis have been addressed in the PM follow-up interview (interview-mike-mitchell-pm-followup-2025-11-17.md):

1. **Response rate threshold:** Clarified as 90-95% (36-38 of 40 attendees), achievable through scheduled in-conference activity
2. **Feedback loop operationalization:** Outside product scope; organizational responsibility to manage follow-through
3. **Remote vs in-person differentiation:** Conference is fully in-person; no remote attendees to accommodate
4. **Specific logistics pain points:** Previous year's feedback available in observations folder; current questions already address foreseeable logistics concerns
5. **Survey timing integration:** Operational detail outside product scope; product must support in-conference completion
6. **First-time vs repeat attendee questions:** Same questions for everyone; Q16 includes "This is my first NAM Conference" option
7. **Actions from previous feedback:** Not documented; this year's survey stands alone; Q16 asks about perceived improvements
8. **Anonymous response criticality:** Optional name field acceptable (Q19); anonymous responses fully supported and equally valued

No outstanding questions require additional research before requirements extraction.

---

## Recommended Next Steps

1. **Requirements Extraction**: Run `/req` command to break down business requirements into actionable user stories and technical tasks based on this complete synthesis

2. **Technical Preparation**: Review technical requirements context file referenced in Product Manager interview to understand tech stack constraints and deployment approach

3. **Testing Readiness**: Ensure MVP ready for testing by November 19, 2025 hard deadline (approximately 7 days from discovery cycle start)

4. **Survey Question Finalization**: Validate that 19-question survey structure (documented in observations/proposed-survey-questions.md) aligns with synthesis findings and supports all four measurement dimensions

5. **Operational Planning**: Begin planning for in-conference completion logistics, including scheduled break timing, enforcement mechanisms if needed, and communication to attendees about expectations

---

## Appendix

### Participant Demographics

**Conference Organizers (4 participants):**
- Managing Director: Strategic decision maker responsible for conference ROI justification
- Conference Planner: Leading talent acquisition and logistics coordination; handles venue, food, transportation
- Client Partner: Business development focus; bringing survey design expertise from Forrester analyst background
- Product Manager: Leading MVP development with November 19, 2025 testing deadline

**Conference Attendees (3 participants):**
- Principal Engineer: 4+ years at Equal Experts; extensive conference speaking/attending experience
- Senior Consultant: Attended AI workshop in India; plays dodgeball Thursdays (mentioned for team coordination context)
- Note: Client Partner serves dual role as both organizer (NAM leadership team member) and attendee

**Total:** 7 interviews representing both organizer and attendee perspectives; 40-person conference total attendance

### Research Methods

- **Semi-structured interviews**: Conducted by Product Manager and AI assistant using consistent template
- **Interview duration**: Varied by participant (15-45 minutes typical)
- **Interview format**: Remote video calls with real-time note-taking
- **Follow-up interviews**: PM follow-up conducted after initial synthesis to resolve open questions
- **Supporting materials**: Previous conference feedback (PDF in observations folder), proposed survey questions (observations folder), key requirements document (observations folder)
- **Analysis approach**: Cross-participant pattern identification; frequency counting for significant themes (3+ mentions); explicit evidence citation for all claims