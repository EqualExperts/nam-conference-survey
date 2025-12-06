# User Story: Summary Payload Schema

**Story ID**: STORY-053
**Iteration**: 2025-12-06-webhooks
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-12-06-webhooks, conference-organizer, backend, integrations, llm-dev

## User Story
As a conference organizer,
I want the webhook payload to include summary information and a link to the admin dashboard,
So that I can quickly understand the submission without exposing full response data.

## Context
Webhook payloads should be informative but privacy-preserving. This story defines and implements the summary payload schema with key fields and an admin link for full details.

## Source
**Discovery Cycle**: 2025-12-06-webhooks
**Synthesis Reference**: `product/iterations/2025-12-06-webhooks/discovery/synthesis/synthesis-2025-12-06.md`
**User Need**: "Summary mode, with link back to admin site to see full details, so privacy is preserved"
**Supporting Evidence**: Interview explicitly requested summary-only payload

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Payload includes summary fields**
- **Given** a survey is submitted
- **When** the webhook fires
- **Then** the payload includes: submission ID, timestamp, submission count (nth response)
- **And** the payload does NOT include full survey answers

**Scenario 2: Payload includes admin link**
- **Given** a survey is submitted
- **When** the webhook fires
- **Then** the payload includes a URL to view details in the admin dashboard
- **And** the URL is correctly formatted and functional

### Non-Functional Requirements
- [ ] Privacy: No sensitive survey data in webhook payload
- [ ] Usability: Payload is human-readable JSON

### Quality Checklist
- [ ] Payload schema is documented
- [ ] Admin link works when clicked
- [ ] No PII or survey answers exposed

## Open Questions
- Include overall rating if provided? (optional field)

## Dependencies
- STORY-052: Webhook Dispatch on Submission

## Estimate
**Size**: XS
**Confidence**: High

**Reasoning**: Just defining and implementing a JSON schema. Straightforward data selection and formatting.

## Metadata
**Iteration**: 2025-12-06-webhooks
**Created**: 2025-12-06
**Last Updated**: 2025-12-06
**Build Date**:
