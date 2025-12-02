# Discovery Iteration: 2025-11-12-mvp

**Started**: 2025-11-12
**Focus**: Build the infrastructure and baseline functionality for the app
**Status**: Active

## Goals
Build the infrastructure and baseline functionality for the NAM Conference Survey app

**MVP Core Features:**
- Working website with data storage
- Multiple choice and essay questions
- Optional anonymity (users can provide name or stay anonymous)
- EE branding
- Reliable data storage

**Target Launch:** Ready for testing by Wednesday, November 19, 2025

## Research Methods
- [x] Stakeholder interview (Mike Mitchell - PM/Product Manager)
- [x] Stakeholder interview (Katie Coleman - Managing Director/Conference Organizer)
- [x] Stakeholder interview (Lauren Kessler - Conference Planner/Data Consumer)
- [x] Stakeholder interview (Andrew Shawcare - Senior Consultant/Conference Attendee)
- [x] Stakeholder interview (Sarah Aslanifar - Principal Engineer/Conference Attendee)
- [x] Stakeholder interview (Chris Condo - Client Partner/Survey Design Expert)
- [ ] Technical observations
- [ ] Additional research as needed

## Timeline
- **Start**: 2025-11-12
- **Target completion**: 2025-11-19 (testing ready)
- **Synthesis by**: 2025-11-14

## Key Decisions

### Scope Decisions
- **Authentication**: NOT included in MVP (open link model)
- **Admin App**: NOT included in MVP (hardcoded questions)
- **Data Analysis**: NOT included in MVP (just store data)
- **Anonymity**: Optional - users choose whether to provide name

### Success Criteria
- Users can complete survey successfully
- Data stored reliably (no data loss)
- Ready for testing by Nov 19

## Notes

**Six key interviews conducted:**
1. **Mike Mitchell (PM)** - Defined MVP scope, timeline, core features
2. **Katie Coleman (Managing Director)** - Conference organizer perspective, response rate challenges, ROI justification, explored conversational AI concept
3. **Lauren Kessler (Conference Planner)** - Event planning perspective, data analysis needs, community sentiment measurement, strong preference for raw data export and choice ranking features
4. **Andrew Shawcare (Senior Consultant)** - Conference attendee perspective, survey skepticism, transparency and authenticity concerns, "black hole" effect of surveys without follow-up
5. **Sarah Aslanifar (Principal Engineer)** - Conference attendee perspective, completion barriers (mandatory fields, time constraints), strong need for feedback acknowledgment, 5-minute limit
6. **Chris Condo (Survey Expert)** - Best practices, quality considerations, Forrester model

**Key insights:**
- **Chris:** Survey quality and thorough testing are critical. Target 75% response rate (30 of 40 attendees).
- **Katie:** Major challenge is capturing feedback before people leave venue. Interested in conversational AI approach to reimagine feedback collection beyond traditional forms.
- **Lauren:** Wants to measure community sentiment and event format preferences. Strong preference for raw data in spreadsheet format for custom analysis. Suggested building survey completion into conference schedule (5:00-5:10 PM) to maximize response rates.
- **Andrew:** Survey skepticism due to lack of transparency and follow-up ("black hole" effect). Prefers in-person retrospectives. Wants question-level transparency about how data will be used and visible follow-up showing actions taken.
- **Sarah:** Will abandon surveys with mandatory fields that don't apply or surveys over 5 minutes. Strong need for feedback acknowledgment - "If I feel like my feedback is not going to be valued, that's something that I will skip the surveys entirely."

**Technical approach:** To be defined in separate context file
