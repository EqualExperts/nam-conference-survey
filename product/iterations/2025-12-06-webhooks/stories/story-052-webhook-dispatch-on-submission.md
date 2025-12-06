# User Story: Webhook Dispatch on Submission

**Story ID**: STORY-052
**Iteration**: 2025-12-06-webhooks
**Priority**: Must have
**Status**: Draft
**Labels**: 2025-12-06-webhooks, conference-organizer, backend, integrations, llm-dev

## User Story
As a conference organizer,
I want an HTTP POST request sent to an external URL when a survey is submitted,
So that I can verify webhook functionality works end-to-end.

## Context
This is the minimal foundation for webhook notifications. It proves the core mechanism works: survey submission triggers an outbound HTTP call. Initially uses a hardcoded URL (e.g., webhook.site) for testing. Config file and payload refinement come in subsequent stories.

## Source
**Discovery Cycle**: 2025-12-06-webhooks
**Synthesis Reference**: `product/iterations/2025-12-06-webhooks/discovery/synthesis/synthesis-2025-12-06.md`
**User Need**: Verify webhooks fire when surveys are submitted
**Supporting Evidence**: Success criteria: "I can submit a survey and see the webhook hit webhook.site within seconds"

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Webhook fires on submission**
- **Given** a survey response is being submitted
- **When** the submission completes successfully
- **Then** an HTTP POST request is sent to the configured webhook URL
- **And** the request includes basic JSON payload (submission ID, timestamp)

**Scenario 2: Submission succeeds regardless of webhook**
- **Given** the webhook URL is unreachable or returns an error
- **When** a survey is submitted
- **Then** the survey submission still completes successfully
- **And** the user sees the normal thank you screen

### Non-Functional Requirements
- [ ] Performance: Webhook call is async, doesn't block submission response
- [ ] Reliability: Survey submission never fails due to webhook issues

### Quality Checklist
- [ ] Submitting survey triggers visible request on webhook.site
- [ ] Survey submission UX is unchanged
- [ ] Basic payload is valid JSON

## Open Questions
- None - this is intentionally minimal

## Dependencies
- Survey submission endpoint (exists)

## Estimate
**Size**: S
**Confidence**: High

**Reasoning**: Minimal scope - just add HTTP client call to existing submission flow. No config, no complex payload, no error handling beyond fire-and-forget.

## Metadata
**Iteration**: 2025-12-06-webhooks
**Created**: 2025-12-06
**Last Updated**: 2025-12-06
**Build Date**:
