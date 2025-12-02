# Synthesize Discovery Research

Please analyze the interview files for a specific discovery cycle and create a synthesis document following the template structure.

## Required Input
**Discovery Cycle**: [Specify the cycle directory, e.g., `2025-03-mobile-experience`]

## Context Files to Review
- All files in `product/context/` (for product background)
- All files in `product/discovery/[CYCLE-NAME]/interviews/` (except the template file)
- **All files in `product/discovery/[CYCLE-NAME]/observations/`** (ALWAYS read this directory - may contain key requirements, historical data, or additional context beyond interviews)
- All files in `product/discovery/[CYCLE-NAME]/surveys/`
- `product/requirements/stories-by-cycle.md` (to see what's already been discovered)
- Previous cycle synthesis documents (to understand previous cycles)

## Instructions
1. Read all research files in the specified cycle directory
2. Identify recurring themes across interviews (mentioned in 3+ interviews = significant theme)
3. Extract user needs, desires, and aspirations in "Jobs to Be Done" format (When I... I want to... So I can...)
4. Rank pain points by:
   - Frequency (how many participants mentioned it)
   - Impact (High/Medium/Low based on participant descriptions)
5. Describe required business capabilities and user functionality (not technical implementation or stories)
6. Note any conflicting feedback or open questions
7. Provide specific interview references for every claim (use role descriptions, not names)
8. **Cross-reference with previous cycles**: Note if findings confirm, contradict, or expand on previous research

## Content Guidelines

**What to Include:**
- Business requirements and user functionality
- User needs, desires, and aspirations (not just pain points)
- Non-functional requirements (performance, accessibility, usability)
- Required system capabilities described from user perspective
- Evidence-based insights with interview references

**What to Exclude:**
- Specific stakeholder names (use role descriptions: "Managing Director", "Conference Planner", "Attendee")
- Technical implementation details (tech stack, architecture, code structure)
- Breaking requirements into individual work stories (that happens in `/req` command)
- Prescriptive engineering direction ("use React", "implement with microservices")

**Narrative Focus:**
- Maintain cohesive narrative flow that tells the story of user needs
- Use bullet points to summarize requirements within narrative context
- Describe WHAT the system must do and WHY, not HOW to build it
- Let engineering team determine technical approach based on business requirements

## Output Location
Save the synthesis to: `product/discovery/[CYCLE-NAME]/synthesis-[YYYY-MM-DD].md`

Use today's date in the filename and the cycle directory name provided.

## Output Format
Use the synthesis template structure found at: `product/discovery/synthesis/synthesis-template.md`

## Success Criteria
- Every theme is supported by specific interview references (use role descriptions, not names)
- Business capabilities trace back to user needs with evidence
- Priority recommendations are evidence-based (cite frequency and impact)
- Open questions are clearly identified for future research
- No assumptions or inferences without clear supporting evidence from interviews
- Conflicting or minority opinions are noted, not dismissed
- **Cross-cycle insights**: Connections to previous research are noted
- **New vs. confirming**: Clear distinction between new findings and validation of previous cycles
- **No premature story breakdown**: Requirements described as cohesive narrative, not work chunks
- **Captures desires and aspirations**: Not just pain points, but what users want to achieve

## Quality Checks
- [ ] Each theme references at least 3 interviews (using role descriptions, not names)
- [ ] Pain points are ranked with quantitative support (X of Y participants)
- [ ] User needs include desires and aspirations, not only problems
- [ ] Required capabilities focus on WHAT/WHY, not HOW
- [ ] No technical implementation prescriptions
- [ ] No specific stakeholder names in synthesis body
- [ ] Open questions are listed for any ambiguous findings
- [ ] Executive summary accurately reflects detailed findings
- [ ] Cross-references to previous cycles are included where relevant
- [ ] Synthesis notes which findings are new vs. confirming previous research

## Post-Synthesis Actions
After creating the synthesis:
1. **Interview the PM**: Review the "Open Questions" section of the synthesis and conduct a brief follow-up interview with the Product Manager to answer outstanding questions. This ensures synthesis is complete before moving to requirements extraction.
2. Review if any existing stories in `stories-by-cycle.md` should be updated
3. Document any contradictions with previous research in the synthesis
