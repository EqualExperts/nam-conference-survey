# User Story: Webhook Error Logging

**Story ID**: STORY-055
**Iteration**: 2025-12-06-webhooks
**Priority**: Should have
**Status**: Draft
**Labels**: 2025-12-06-webhooks, conference-organizer, backend, integrations, llm-dev

## User Story
As a conference organizer,
I want webhook failures logged to the application logging framework,
So that I have visibility into delivery issues without affecting survey submissions.

## Context
Fire-and-forget means failures are silent by default. This story adds logging so operators can diagnose webhook issues. Uses existing NestJS logging framework.

## Source
**Discovery Cycle**: 2025-12-06-webhooks
**Synthesis Reference**: `product/iterations/2025-12-06-webhooks/discovery/synthesis/synthesis-2025-12-06.md`
**User Need**: "Log errors to the logging framework used by the site"
**Supporting Evidence**: Interview specified error logging for MVP

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Failed webhook is logged**
- **Given** a webhook URL is configured
- **When** the webhook call fails (timeout, connection error, non-2xx)
- **Then** the failure is logged with: URL, error type, timestamp
- **And** the log level is appropriate (warn or error)

**Scenario 2: Successful webhook is logged**
- **Given** a webhook URL is configured
- **When** the webhook call succeeds
- **Then** success is logged (info level) with URL and response status

### Non-Functional Requirements
- [ ] Logging: Uses existing NestJS Logger
- [ ] Observability: Logs include enough context for debugging

### Quality Checklist
- [ ] Failures appear in application logs
- [ ] Success also logged for complete audit trail
- [ ] No sensitive data in logs

## Open Questions
- Log full response body on error, or just status?

## Dependencies
- STORY-052: Webhook Dispatch on Submission

## Estimate
**Size**: XS
**Confidence**: High

**Reasoning**: Adding logging statements to existing code. NestJS Logger already available.

## Metadata
**Iteration**: 2025-12-06-webhooks
**Created**: 2025-12-06
**Last Updated**: 2025-12-06
**Build Date**:
