# Iteration Discovery: 2025-12-06-webhooks

**Started**: 2025-12-06
**Focus**: Response webhooks for external system notifications when surveys are submitted
**Status**: Active

## Goals
- Notify external systems when survey responses are submitted
- Support multiple integration targets: Slack, IFTTT, webhook.site
- Privacy-preserving: summary payload with link to admin for details

## Scope

### In Scope (MVP)
- Webhook service that fires on survey submission
- Config file for webhook URL configuration
- Summary payload (key fields + admin link)
- Fire-and-forget with error logging
- Support for multiple simultaneous destinations

### In Scope (v1.0)
- Basic retry (1-2 attempts) on failure

### Backlog (v2)
- Admin UI for webhook configuration
- Advanced retry with queue/backoff
- Security (shared secrets, HMAC signatures)

## Research Methods
- [x] AI-guided stakeholder interview

## Timeline
- **Start**: 2025-12-06
- **Target synthesis**: 2025-12-06

## Key Decisions
1. Summary payload mode (not full data) for privacy
2. Config file over env vars or admin UI for v1
3. Fire-and-forget for MVP, basic retry for v1.0
4. No authentication/signing for MVP
5. Three integration stories: Slack, IFTTT, webhook.site

## Success Criteria
> "I can submit a survey and see the webhook hit webhook.site within seconds"

## Interviews
- [interview-jeremy-2025-12-06.md](interviews/interview-jeremy-2025-12-06.md)

## Notes
Backend-focused feature for small dev team. Demo-friendly scope with clear visual success criteria.
