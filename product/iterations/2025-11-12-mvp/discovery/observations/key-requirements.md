# Key Requirements - NAM Conference Survey

## Katie Coleman's 4 Key Measurement Areas

As the Managing Director and primary stakeholder responsible for conference investment decisions, Katie identified 4 critical areas that MUST be measured:

### 1. Emotional Sentiment
**Core question**: "Did you enjoy it? Was it worth spending your Saturday on?"

**Why it matters**: The conference uses attendees' personal time on a Saturday. Katie needs to understand if this personal time investment feels worthwhile to participants.

**Success indicator**: Strong positive sentiment about the Saturday time commitment being valuable.

**Quote**:
> We're very conscious that this is on a Saturday, and it's people's personal time that we're routing into in a way that we don't normally. So we want to get that sentiment.

---

### 2. Logistics Feedback
**Core question**: "Were the logistics effective and clear?"

**Specific areas to measure**:
- Hotel accommodations
- Room setup and facilities
- WiFi and technical infrastructure
- Clarity of expectations (what attendees knew to expect before arriving)
- Food and catering
- Venue accessibility and comfort

**Why it matters**: Logistics failures create friction that undermines the entire conference experience. Katie needs concrete feedback to improve venue selection and planning.

**Success indicator**: Minimal logistics complaints; any issues identified can be addressed for next year.

---

### 3. Learning Outcomes
**Core question**: "Was it informative? Did you learn something?"

**Specific areas to measure**:
- Value of technical content (AI/SDLC topics)
- Skill development (consulting skills, technical skills)
- Actionable takeaways
- Interest in post-conference follow-up sessions

**Why it matters**: If attendees don't learn anything meaningful, the conference becomes purely social. Katie needs to justify the conference investment with tangible learning outcomes.

**Success indicator**: Attendees report specific learning outcomes and show interest in continued learning.

**Related challenge**:
> We didn't really know what to do afterwards. Like, there was a bunch of ideas and thoughts. We captured a lot shared it, but trying to teach something like consulting skills... Is just feels impossible.

---

### 4. Networking Effectiveness
**Core question**: "Did you connect with the EE community effectively?"

**Specific areas to measure**:
- Coworking day feedback (structured networking time)
- Connection to Equal Experts community overall
- Quality of networking opportunities
- Sense of belonging to the network

**Why it matters**: Networking and community building are the primary stated value of the conference. This is what Katie hears most often from attendees.

**Success indicator**: Strong sense of community connection; coworking format proves effective.

**Quote**:
> Overwhelmingly. It's nearly always about the connections and meeting people.

---

## Other High-Priority Stakeholder Requirements

### Lauren Kessler (Conference Planner / Data Consumer)
**Priority**: Demographic segmentation for custom analysis

**Requirements**:
- Export to raw CSV format (not pre-formatted dashboards)
- Demographic fields: active vs associate, client vs employee, location, travel distance
- Choice ranking for event format preferences
- Community sentiment measurement

**Why it matters**: Lauren needs to perform custom analysis to understand how different segments experience the conference differently.

---

### Chris Condo (Survey Design Expert)
**Priority**: Professional quality and optimal response rates

**Requirements**:
- Target 75% response rate minimum (30 of 40 attendees)
- Thorough but appropriate for conference context
- Quality over quantity approach
- Proper survey design principles

**Why it matters**: Poor survey design leads to low response rates and unreliable data. Chris's expertise ensures we get quality data.

---

### Sarah Aslanifar (Conference Attendee - Principal Engineer)
**Priority**: Completion barriers elimination

**Requirements**:
- 5-minute maximum completion time
- All fields optional (no mandatory barriers)
- Conditional explanations only for low ratings (≤3)
- Immediate acknowledgment of feedback receipt

**Why it matters**: Sarah represents attendees who will abandon surveys with completion barriers. Her constraints define the upper bounds of survey length and complexity.

**Critical quote**:
> If I feel like my feedback is not going to be valued, that's something that I will skip the surveys entirely.

---

### Andrew Shawcare (Conference Attendee - Senior Consultant)
**Priority**: Transparency and feedback loop

**Requirements**:
- Question-level transparency about how data will be used
- Visible follow-up showing actions taken from previous feedback
- Authenticity over performative data collection

**Why it matters**: Andrew represents skeptical attendees who won't participate if they perceive a "black hole" effect where feedback disappears without acknowledgment or action.

**Critical quote**:
> Once you've done it once or twice and you don't hear anything back, you're like, what was the point in me doing that?

---

## MVP Scope Constraints

Based on Mike Mitchell's PM interview, these are explicitly OUT OF SCOPE for MVP:

- ❌ Authentication (open link model)
- ❌ Admin app to create/edit questions (hardcoded)
- ❌ Data analysis/display of results (just store data)
- ❌ Conversational AI interface (Katie's interest, but post-MVP)

**MVP success criteria** (from Mike):
- Users can complete survey successfully
- Data stored reliably (no data loss)
- Ready for testing by November 19, 2025

---

## Prioritization Framework

When designing questions and features, prioritize in this order:

1. **Katie's 4 measurement areas** - These are non-negotiable. If we can't measure these, the survey fails its primary purpose.

2. **Completion barriers** (Sarah & Andrew) - If people don't complete the survey, we have no data at all.

3. **Demographic segmentation** (Lauren) - Needed for analysis depth but secondary to getting responses.

4. **Response rate optimization** (Chris) - Quality standards ensure reliability.

**Trade-off principle**: When in conflict, favor completion over comprehensiveness. Better to get 35 complete responses to 12 questions than 20 partial responses to 18 questions.
