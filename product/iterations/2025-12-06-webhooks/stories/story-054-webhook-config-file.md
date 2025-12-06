# User Story: Webhook Config File

**Story ID**: STORY-054
**Iteration**: 2025-12-06-webhooks
**Priority**: Should have
**Status**: Draft
**Labels**: 2025-12-06-webhooks, conference-organizer, backend, integrations, llm-dev

## User Story
As a conference organizer,
I want to configure webhook URLs in a config file,
So that I can change webhook destinations without modifying code.

## Context
Moves webhook URL from hardcoded value to external configuration. Supports multiple webhook destinations. Uses JSON or YAML config file loaded at startup.

## Source
**Discovery Cycle**: 2025-12-06-webhooks
**Synthesis Reference**: `product/iterations/2025-12-06-webhooks/discovery/synthesis/synthesis-2025-12-06.md`
**User Need**: "Version 1: config file" for webhook configuration
**Supporting Evidence**: Interview specified config file over env vars or admin UI

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Load webhooks from config file**
- **Given** a config file exists with webhook URLs
- **When** the application starts
- **Then** webhook URLs are loaded from the config file
- **And** webhooks fire to all configured URLs on submission

**Scenario 2: Multiple webhooks supported**
- **Given** multiple webhook URLs are in the config file
- **When** a survey is submitted
- **Then** all configured webhooks receive the notification

**Scenario 3: No config file**
- **Given** no webhook config file exists
- **When** the application starts
- **Then** the application starts normally
- **And** no webhooks fire on submission (graceful degradation)

### Non-Functional Requirements
- [ ] Configuration: Standard JSON or YAML format
- [ ] Reliability: Invalid config doesn't crash the app

### Quality Checklist
- [ ] Config file format is documented
- [ ] Multiple URLs work simultaneously
- [ ] Missing config handled gracefully

## Open Questions
- JSON vs YAML preference?
- Config file location (e.g., `config/webhooks.json`)

## Dependencies
- STORY-052: Webhook Dispatch on Submission

## Estimate
**Size**: XS
**Confidence**: High

**Reasoning**: Simple file loading and parsing. NestJS ConfigModule patterns available.

## Metadata
**Iteration**: 2025-12-06-webhooks
**Created**: 2025-12-06
**Last Updated**: 2025-12-06
**Build Date**:
