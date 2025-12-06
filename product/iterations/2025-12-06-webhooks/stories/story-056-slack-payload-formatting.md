# User Story: Slack Payload Formatting

**Story ID**: STORY-056
**Iteration**: 2025-12-06-webhooks
**Priority**: Could have
**Status**: Draft
**Labels**: 2025-12-06-webhooks, conference-organizer, backend, integrations, slack, llm-dev

## User Story
As a conference organizer,
I want Slack webhooks to receive properly formatted messages,
So that notifications appear as readable Slack messages rather than raw JSON.

## Context
Slack incoming webhooks expect a specific payload format. This story adds Slack-specific formatting when webhook type is "slack" in config.

## Source
**Discovery Cycle**: 2025-12-06-webhooks
**Synthesis Reference**: `product/iterations/2025-12-06-webhooks/discovery/synthesis/synthesis-2025-12-06.md`
**User Need**: Slack channel notifications for real-time team visibility
**Supporting Evidence**: Interview identified Slack as primary use case

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Slack-formatted message**
- **Given** a webhook is configured with type "slack"
- **When** a survey is submitted
- **Then** the payload uses Slack's expected format
- **And** the message renders as readable text in Slack

**Scenario 2: Message includes link**
- **Given** a Slack webhook fires
- **When** the message appears in Slack
- **Then** the admin dashboard link is clickable

### Non-Functional Requirements
- [ ] Compatibility: Works with Slack incoming webhooks API
- [ ] Usability: Message readable at a glance

### Quality Checklist
- [ ] Message renders correctly in Slack
- [ ] Link is clickable
- [ ] Non-Slack webhooks unaffected

## Open Questions
- Simple text vs Slack blocks format?

## Dependencies
- STORY-052: Webhook Dispatch on Submission
- STORY-054: Webhook Config File (for webhook type detection)

## Estimate
**Size**: XS
**Confidence**: High

**Reasoning**: Conditional payload formatting based on webhook type. Slack format is well-documented.

## Metadata
**Iteration**: 2025-12-06-webhooks
**Created**: 2025-12-06
**Last Updated**: 2025-12-06
**Build Date**:
