# Extract User Stories from Discovery Synthesis (with Acceptance Criteria)

Please review the synthesis document(s) and extract well-formed user stories with comprehensive acceptance criteria, ready for development and issue tracker import.

## Required Input
**Discovery Cycle**: [Specify the cycle, e.g., `2025-03-mobile-experience`]
**Starting Story ID**: [Next available ID based on existing stories]
**Selected Template**: [Path to the user-selected story template from `templates/product/`]
**Granularity Setting**: [fine | standard | coarse]

## Context Files to Review
- `product/context/product-overview.md` (for product scope and constraints)
- `product/context/target-users.md` (for persona details)
- `product/context/technical-context.md` (for technical constraints affecting AC)
- **`product/discovery/[CYCLE-NAME]/synthesis-[MOST-RECENT-DATE].md`** (the MOST RECENT synthesis for this cycle - use only this, older synthesis files are historical record only)
- `product/design/[CYCLE-NAME]/` (for screenshots and design requirements)
- `product/requirements/stories-by-cycle.md` (to avoid duplication and understand existing stories)

## Instructions

### Story Creation
1. Review the "Required System Capabilities" section from the cycle's synthesis
2. Review the `product/design/[CYCLE-NAME]/` directory for screenshots and design artifacts
3. **Check for existing stories**: Review existing story files to see if similar stories already exist
4. **Read the selected story template** and use its structure for all stories created
5. **Apply the granularity setting** when deciding how to split capabilities into stories:
   - **Fine**: Create more, smaller stories. Each screen element, interaction, or discrete capability becomes a separate story. Results in highly specific, atomic stories.
   - **Standard**: Balanced approach. Logical user-facing capabilities become stories. A screen with multiple related elements may be one story.
   - **Coarse**: Fewer, larger stories. Related functionality grouped together. What might be an epic in fine granularity becomes a single story.
6. Create user stories based on:
   - **Synthesis capabilities**: Business requirements and user needs from synthesis
   - **Design screens**: Often each screen or major UI component represents a story
   - **Hybrid approach**: Some stories may be pure functionality, others may be screen-focused
7. Follow the standard user story format: "As a [persona], I want to [action], so that [benefit]"
8. Use **general personas** (not specific stakeholder names): "Conference Attendee", "Conference Organizer", "Event Planner"
9. Add story points or t-shirt sizing if enough context exists
10. Include traceability back to the synthesis (which user needs this addresses)
11. **Include screenshot references** where screens exist
12. **Document the discovery cycle** in each story's Source section
13. Flag any stories that need additional discovery or clarification

### Business vs Technical Requirements
- **Focus on business requirements**: What the system must do from a user perspective
- **Include obvious technical requirements**: When business requirement clearly implies technical need (e.g., "mobile-responsive" from synthesis requirement for mobile use)
- **Avoid prescriptive technical details**: Don't specify tech stack, architecture, or implementation approach unless explicitly required by business constraints

### Acceptance Criteria Generation
For EACH story, generate comprehensive acceptance criteria:

**Functional Scenarios** (Given-When-Then format):
- Happy path scenarios
- Error/failure scenarios
- Edge cases
- Validation requirements

**Non-Functional Requirements**:
- Performance (response time, load handling)
- Security (authentication, authorization, data protection)
- Accessibility (WCAG compliance, keyboard navigation, screen readers)
- Usability (error messages, user feedback)

**Quality Criteria**:
- What constitutes "done" for this story
- Testing requirements
- Documentation needs

## Handling Existing Stories
If a finding relates to an existing story:
- Create an entry in `product/requirements/changes/YYYY-MM-[cycle-name]-changes.md`
- Document what changed and why
- Update the existing story file with new information
- Add a note in the story about which cycle updated it

## Output Location
Create individual story files in: `product/requirements/[CYCLE-NAME]/`

Use naming convention: `story-[number]-[short-description].md`

Example: `product/requirements/2025-10-onboarding-flow/story-001-user-login.md`

If the cycle directory doesn't exist yet, create it.

## Story Template

**Use the selected story template** provided as input to this prompt. The template file will be located at the path specified in the "Selected Template" input field (e.g., `templates/product/story-template-human-dev.md` or `templates/product/story-template-llm-dev.md`).

Read the full template file and use its exact structure for all stories created. The template will contain:
- Required sections and their format
- Level of detail expected for each section
- Acceptance criteria structure
- Quality checklists appropriate to the development approach

**Do not use a hardcoded template** - always read and follow the user-selected template.

## Success Criteria
- [ ] **Stories use the selected template structure** exactly as specified
- [ ] **Granularity setting is applied** consistently across all stories
- [ ] Each story follows standard format (As a... I want... So that...)
- [ ] Persona uses general descriptions (Conference Attendee, Conference Organizer, Event Planner)
- [ ] No specific stakeholder names in stories
- [ ] Benefit is clear and measurable
- [ ] **Comprehensive acceptance criteria generated** with Given-When-Then scenarios
- [ ] **All scenarios covered**: happy path, error cases, edge cases
- [ ] **Non-functional requirements specified**: performance, security, accessibility
- [ ] Acceptance criteria are specific, measurable, and testable
- [ ] **Screenshots referenced** where design artifacts exist
- [ ] **Design requirements captured** from prototype/screenshots
- [ ] Traceability to most recent synthesis is maintained
- [ ] Focus on business requirements with obvious technical needs included
- [ ] Stories are appropriately sized for the selected granularity
- [ ] Technical feasibility is considered (flag blockers)
- [ ] Labels include cycle name for easy filtering
- [ ] Both synthesis capabilities AND design screens reviewed for story creation

## Story Sizing Guidelines
- **XS**: < 1 day, minimal complexity, clear implementation
- **S**: 1-2 days, some complexity, mostly clear
- **M**: 3-5 days, moderate complexity, may need design discussion
- **L**: 1-2 weeks, high complexity, requires architecture decisions
- **XL**: > 2 weeks, very high complexity - should be split into smaller stories

## Output Summary
After creating all story files:

1. **Update `product/requirements/stories-by-cycle.md`**:
   - Add a new section for this cycle
   - List all stories created with their file paths
   - Document key insights from the cycle
   - Update the overview counts

2. **If any existing stories were updated**:
   - Document changes in the story's "Change History" section
   - Note which cycle prompted the update
