# Discovery Interview: Survey Form Validation

**Date**: 2025-12-06
**Participant**: Paolo Maralit
**Role**: Product Owner / Stakeholder
**Duration**: ~15 minutes
**Interviewer**: Claude Code

## Context

This interview explored requirements for adding character count display and validation to the survey form's additional comments field.

## Key Findings

### Business Drivers
**Q: What prompted the need for character count display on the additional comments field?**

The requirement is driven by a combination of:
- User feedback
- Technical requirements
- Business needs

This multi-faceted driver suggests the feature addresses both user experience concerns and system requirements.

### Scope Definition
**Q: Which specific fields in the survey need character count/validation?**

**Finding**: Only the additional comments field (q15AdditionalFeedback in the database schema) requires this enhancement.

**Insight**: This is a targeted improvement focusing on the main open-ended feedback field, not a system-wide change to all text inputs.

### Character Limit Specification
**Q: What character limits are you considering?**

**Decision**: 250 characters

**Context**:
- Current database uses PostgreSQL TEXT type (no inherent limit)
- No storage or performance concerns
- Limit is purely for UX and content management

### Display Requirements
**Q: How should the character counter be displayed to users?**

**Requirements**:
- Display format: Show BOTH remaining characters AND used/total ratio
  - Example: "200 characters remaining (50 / 250)"
- Visibility: Always visible (not conditional)
- Visual feedback: Color changes when approaching/reaching limit
  - Normal state: Under limit
  - Warning state: Approaching limit (~90%+)
  - Error state: Over limit

**Quote**: "yes, yes, always, yes" - indicating strong preference for comprehensive, always-on feedback

### Validation Behavior
**Q: What should happen when a user exceeds the limit?**

**Decision**: Allow typing but show error message

**Implication**: Users can see their full text even if it exceeds the limit, but will be informed they need to reduce it.

**Q: What should happen on form submission?**

**Decision**: Block submission until character count is reduced to 250 or below

**Implication**: This is a hard requirement - users cannot submit with overlong comments.

### Technical Implementation
**Q: Should this validation apply on both frontend and backend?**

**Decision**: Frontend only

**Rationale**: This is positioned as a UX enhancement rather than a security/data integrity requirement. Backend continues to accept any length text.

**Risk consideration**: Since this is frontend-only, technically savvy users could bypass the validation. This appears acceptable given the use case (conference survey feedback).

### Mobile Considerations
**Q: Mobile experience considerations?**

**Response**: "mobile" - indicating mobile-specific design considerations are important

**Note**: Specific details not elaborated, but mobile experience is a confirmed consideration given the app's mobile-first design approach.

## Pain Points Identified

1. **User uncertainty**: Currently, users don't know if their comments are "too long" until potentially hitting an unknown limit
2. **Lost content risk**: Users might write extensive comments only to discover they can't submit
3. **Mobile typing experience**: On mobile, it's harder to gauge text length without explicit feedback

## User Needs Extracted

1. **Clear feedback**: Users need to know how much space they have as they type
2. **Progressive disclosure**: Users need warning before hitting the limit, not just at the limit
3. **Graceful handling**: Users should be able to see their full text even if over limit while they edit it down
4. **Mobile-friendly design**: Counter must work well on small screens

## Proposed Solution

Implement a real-time character counter with:
- Dual display (remaining + ratio)
- Always-on visibility
- Color-coded states (normal/warning/error)
- Frontend validation that blocks submission when over limit
- Mobile-responsive design

## Open Questions

1. **Color specifications**: What exact colors for normal/warning/error states? (Equal Experts brand colors vs Mantine defaults?)
2. **Mobile layout**: Specific positioning/sizing for mobile screens?
3. **Warning threshold**: At what percentage should warning state trigger? (Assumption: 90%, but not confirmed)
4. **Success metrics**: How will we measure success? (Not discussed)
5. **Priority/timeline**: When should this be delivered? (Not discussed)
6. **Accessibility**: Screen reader announcements for character count updates? (Not discussed)

## Technical Notes

From schema review (apps/backend/prisma/schema.prisma):
- Field: `q15AdditionalFeedback String?`
- Current type: PostgreSQL TEXT (unlimited)
- No existing validation constraints
- Part of the `SurveyResponse` model

## Next Steps

1. Run `/synth` to synthesize this interview with any other discovery materials
2. Extract user stories from synthesis
3. Consider technical observations:
   - Review current Textarea component implementation
   - Identify Mantine UI components for character counter
   - Plan validation logic integration
   - Mobile responsive design patterns

## Tags

#character-validation #ux-enhancement #mobile-first #frontend-validation #survey-form #user-feedback
