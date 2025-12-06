# Stories Index: 2025-12-06-webhooks

**Iteration**: 2025-12-06-webhooks
**Created**: 2025-12-06
**Total Stories**: 5

## Summary

| Priority | Count |
|----------|-------|
| Must have | 2 |
| Should have | 2 |
| Could have | 1 |

**Total Estimated Effort**: S + 4×XS = ~2-3 days

## Stories

| ID | Title | Priority | Size | Status |
|----|-------|----------|------|--------|
| STORY-052 | Webhook Dispatch on Submission | Must have | S | Draft |
| STORY-053 | Summary Payload Schema | Must have | XS | Draft |
| STORY-054 | Webhook Config File | Should have | XS | Draft |
| STORY-055 | Webhook Error Logging | Should have | XS | Draft |
| STORY-056 | Slack Payload Formatting | Could have | XS | Draft |

## Quick Start

**Minimum demo (STORY-052 only)**: Submit survey → see webhook hit webhook.site

## Story Details

### STORY-052: Webhook Dispatch on Submission
**File**: [story-052-webhook-dispatch-on-submission.md](story-052-webhook-dispatch-on-submission.md)

Minimal foundation: HTTP POST fires when survey submitted. Can use hardcoded URL for demo.

### STORY-053: Summary Payload Schema
**File**: [story-053-summary-payload-schema.md](story-053-summary-payload-schema.md)

Define payload with summary fields and admin link. Privacy-preserving.

### STORY-054: Webhook Config File
**File**: [story-054-webhook-config-file.md](story-054-webhook-config-file.md)

Load webhook URLs from JSON/YAML config file. Supports multiple destinations.

### STORY-055: Webhook Error Logging
**File**: [story-055-webhook-error-logging.md](story-055-webhook-error-logging.md)

Log webhook success/failure to NestJS logging framework.

### STORY-056: Slack Payload Formatting
**File**: [story-056-slack-payload-formatting.md](story-056-slack-payload-formatting.md)

Slack-specific message formatting for readable channel notifications.

## Dependencies

```
STORY-052 (Webhook Dispatch) ─┬─► STORY-053 (Payload Schema)
                              ├─► STORY-054 (Config File) ──► STORY-056 (Slack)
                              └─► STORY-055 (Error Logging)
```

## Recommended Build Order

1. **STORY-052** - Core dispatch (demo-able immediately)
2. **STORY-053** - Better payload
3. **STORY-054** - Config file (enables multiple webhooks)
4. **STORY-055** - Error logging (observability)
5. **STORY-056** - Slack formatting (nice to have)
