# Discovery Synthesis: Webhooks

**Synthesis Date**: 2025-12-06
**Iteration**: 2025-12-06-webhooks
**Research Period**: 2025-12-06
**Status**: Complete

---

## Executive Summary

The webhooks iteration enables external system notifications when survey responses are submitted. The feature serves three integration targets: Slack channels for real-time team visibility, IFTTT/event routing services for workflow automation, and webhook.site for development testing. The design prioritizes privacy (summary payload with admin link rather than full data) and simplicity (config file over admin UI, fire-and-forget over complex retry logic). MVP scope is intentionally minimal to enable quick delivery by a small backend-focused team.

---

## Research Overview

**Interviews Conducted**: 1
**Observations**: 0
**Other Sources**: Product spec, previous iteration synthesis

### Participants

| # | Role | Date | Key Focus |
|---|------|------|-----------|
| 1 | Developer / Product Owner | 2025-12-06 | Feature requirements, scope definition |

---

## Key Themes

### Theme 1: External System Integration

**Summary**: Survey submissions should trigger notifications to external systems for real-time visibility and workflow automation.

**Evidence**:
- Interview: "To a Slack channel" - for real-time team notifications
- Interview: "To IFTTT or equivalent event routing service" - for workflow automation
- Interview: "For demo & unit test to webhook.site" - for development verification

**Impact**: High

**User Need**: When a survey is submitted, I want external systems to be notified so that stakeholders have real-time visibility and can trigger automated workflows.

---

### Theme 2: Privacy-Preserving Design

**Summary**: Webhook payloads should contain summary data with links to full details, rather than complete response data.

**Evidence**:
- Interview: "Summary mode, with link back to admin site to see full details, so privacy is preserved"

**Impact**: High

**User Need**: When webhooks fire, I want only summary information sent externally so that sensitive feedback data stays within the application and privacy is maintained.

---

### Theme 3: Simple Configuration

**Summary**: Webhook destinations should be configured via config file for v1, with admin UI deferred to backlog.

**Evidence**:
- Interview: "Version 1: config file. Version 2 for backlog: admin UI"

**Impact**: Medium

**User Need**: When setting up webhooks, I want to configure destinations through a simple config file so that setup is straightforward without building additional UI.

---

### Theme 4: Reliability vs. Simplicity Tradeoff

**Summary**: MVP prioritizes simplicity (fire-and-forget) over reliability (retry logic), with error logging for visibility.

**Evidence**:
- Interview: "MVP: fire & forget, but log errors to the logging framework used by the site. v1.0: basic retry, same error logging."

**Impact**: Medium

**User Need**: When webhooks fail, I want errors logged to the existing framework so that I have visibility into failures without complex retry infrastructure.

---

## Pain Points (Ranked)

| Rank | Pain Point | Severity | Frequency | Users Affected |
|------|------------|----------|-----------|----------------|
| 1 | No real-time notification when surveys are submitted | High | Every submission | Conference Organizer |
| 2 | Cannot integrate survey events with external workflows | Medium | Per integration need | Conference Organizer |
| 3 | No easy way to verify webhook functionality during development | Medium | During development | Developer |

---

## User Needs

### Must Address
1. **Webhook delivery on submission**: System must POST to configured URLs when surveys are submitted - Evidence: Core feature requirement from interview
2. **Summary payload format**: Webhook payload must include key fields and admin link, not full response data - Evidence: "Summary mode... so privacy is preserved"
3. **Multiple destination support**: System must support multiple simultaneous webhook destinations - Evidence: Three distinct integration targets identified

### Should Address
1. **Error logging**: Failed webhook calls should be logged to existing logging framework - Evidence: "Log errors to the logging framework used by the site"
2. **Config file management**: Webhook URLs configurable via JSON/YAML config file - Evidence: "Version 1: config file"

### Could Address
1. **Basic retry logic**: 1-2 retry attempts on failure (v1.0 scope) - Evidence: "v1.0: basic retry"
2. **Admin UI configuration**: Web interface for managing webhooks (backlog) - Evidence: "Version 2 for backlog: admin UI"

---

## Proposed Features

### Feature 1: Core Webhook Service

**User Story**: As a conference organizer, I want the system to send webhook notifications when surveys are submitted so that I have real-time visibility into survey activity.

**Addresses**:
- Theme: External System Integration
- Pain Points: 1, 2
- User Needs: Must Address 1, 2, 3

**Estimated Effort**: M

**Priority**: Must Have

---

### Feature 2: Slack Integration

**User Story**: As a conference organizer, I want survey submissions to post to a Slack channel so that the team has real-time visibility without checking the admin dashboard.

**Addresses**:
- Theme: External System Integration
- Pain Points: 1
- User Needs: Must Address 1

**Estimated Effort**: S

**Priority**: Must Have

---

### Feature 3: IFTTT / Event Routing Integration

**User Story**: As a conference organizer, I want survey submissions to trigger IFTTT webhooks so that I can automate workflows based on survey events.

**Addresses**:
- Theme: External System Integration
- Pain Points: 2
- User Needs: Must Address 1

**Estimated Effort**: S

**Priority**: Should Have

---

### Feature 4: Development Testing Support

**User Story**: As a developer, I want to configure webhooks to point to webhook.site so that I can verify webhook functionality during development and testing.

**Addresses**:
- Theme: External System Integration
- Pain Points: 3
- User Needs: Must Address 1, 3

**Estimated Effort**: S

**Priority**: Must Have

---

## Cross-Iteration References

**Related Previous Work**:
- **2025-12-02-admin-page**: Admin dashboard provides the destination for "link back to admin" in webhook payload. Dashboard route `/admin` established.
- **2025-11-12-mvp**: Survey submission flow and data model established. Webhook service will integrate with submission handler.

**Potential Conflicts**:
- None identified. Webhooks extend existing functionality without modifying it.

---

## Recommendations

### Immediate Actions (This Iteration)
1. Create webhook service module in NestJS backend
2. Define summary payload schema (key fields + admin URL)
3. Implement config file loading for webhook destinations
4. Integrate webhook dispatch into survey submission flow
5. Add error logging for failed webhook calls

### Future Considerations
1. **v1.0**: Add basic retry logic (1-2 attempts with short delay)
2. **v2 (Backlog)**: Admin UI for webhook configuration
3. **v2 (Backlog)**: Security features (shared secrets, HMAC signatures)

---

## Open Questions

- [x] What events trigger webhooks? → Survey submission only (for MVP)
- [x] What data in payload? → Summary fields + admin link
- [x] How configured? → Config file (JSON/YAML)
- [x] Error handling? → Fire-and-forget with logging
- [x] Security? → None for MVP
- [ ] Specific fields to include in summary payload? (To be determined during implementation)
- [ ] Config file format preference (JSON vs YAML)? (To be determined)
- [ ] Slack message formatting preferences? (To be determined)

---

## Appendix

### Research Artifacts
- [Interview: Jeremy 2025-12-06](../interviews/interview-jeremy-2025-12-06.md)

### Methodology Notes
- Single stakeholder interview conducted as part of learning exercise
- Scope intentionally minimal for small backend team with limited time
- Success criteria focused on demonstrable outcome (visual webhook delivery)

### Key Quotes

> "Summary mode, with link back to admin site to see full details, so privacy is preserved"

> "Version 1: config file. Version 2 for backlog: admin UI"

> "MVP: fire & forget, but log errors to the logging framework used by the site. v1.0: basic retry, same error logging."

> Success criteria: "I can submit a survey and see the webhook hit webhook.site within seconds"
