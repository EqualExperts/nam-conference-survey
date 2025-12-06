# Interview: Jeremy - Webhooks Feature

## Metadata
- **Date**: 2025-12-06
- **Participant**: Jeremy
- **Role**: Developer / Product Owner
- **Duration**: ~5 minutes
- **Interviewer**: Claude (AI-guided)
- **Iteration**: 2025-12-06-webhooks

## Context
Defining webhook functionality to notify external systems when survey responses are submitted. Backend-focused feature for a small dev team learning exercise.

## Key Findings

### Use Cases (3 separate stories identified)
1. **Slack channel** - Real-time notifications to a Slack channel
2. **IFTTT / event routing** - Integration with IFTTT or equivalent event routing service
3. **Demo & testing** - webhook.site for demos and unit testing

### Payload Design
- **Mode**: Summary (not full response data)
- **Contents**: Key fields + link back to admin site for full details
- **Rationale**: Privacy preservation - sensitive data stays in the app

### Configuration
- **MVP/v1**: Config file (JSON/YAML listing webhook destinations)
- **Backlog/v2**: Admin UI for managing webhook URLs
- **Multiple destinations**: Supported (Slack AND IFTTT simultaneously)

### Error Handling
- **MVP**: Fire and forget, log errors to existing logging framework
- **v1.0**: Basic retry (1-2 attempts), same error logging
- **Deferred**: Queue with backoff (not in scope)

### Security
- **Approach**: None for MVP
- **Rationale**: Keep it simple, rely on obscure URLs
- **Deferred**: Shared secret headers, HMAC signatures (not in scope)

### Success Criteria
> "I can submit a survey and see the webhook hit webhook.site within seconds"

Demo-focused: visual proof that the webhook fires and delivers payload to external service.

## Direct Quotes
> "Summary mode, with link back to admin site to see full details, so privacy is preserved"

> "Version 1: config file. Version 2 for backlog: admin UI"

> "MVP: fire & forget, but log errors to the logging framework used by the site. v1.0: basic retry, same error logging."

## Insights & Observations
1. Clear separation of MVP vs v1.0 vs backlog scope
2. Privacy-conscious design - summary only, full data stays in app
3. Three distinct integration targets = three stories
4. Success measured by visual demo, not complex metrics
5. Backend-focused team, appropriate technical choices

## Suggested Story Breakdown
1. **Core webhook service** - Fire webhook on submission, config file, fire-and-forget
2. **Slack integration** - Format payload for Slack incoming webhook
3. **IFTTT integration** - Format payload for IFTTT webhook trigger
4. **Demo/test mode** - webhook.site integration for testing

## Open Questions
- Specific fields to include in summary payload?
- Config file format preference (JSON vs YAML)?
- Slack message formatting preferences?

## Technical Notes
- Existing stack: NestJS + Prisma
- Logging framework already in place
- Admin dashboard exists (can link to it from webhook payload)

## Tags
`webhooks` `backend` `integrations` `slack` `ifttt` `mvp`
