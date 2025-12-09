# Prompts - Product Management AI Behavior

This directory contains prompts that define AI behavior for product management workflows.

## Prompts

Control AI behavior during product discovery and requirements workflows:

| File | Used By | Purpose |
|------|---------|---------|
| synthesize-discovery.md | /synth | How to analyze interviews and create synthesis |
| extract-user-stories.md | /req | How to convert synthesis into stories |
| generate-acceptance-criteria.md | /req | How to write Given-When-Then criteria |
| create-story-map.md | /map | How to create Miro boards |
| load-stories-to-tracker.md | /jira | How to format and load to Jira |
| release-and-update-spec.md | /rel | How to process releases |
| create-meta-synthesis.md | - | Cross-iteration analysis |
| generate-activity-chart.md | - | Generate PM activity frequency chart from timing log |
| generate-lifecycle-funnel.md | - | Generate iteration lifecycle funnel showing stage progression |

**When to read**:
- When running PM slash commands, OR
- When `rules/product/pm-workflow.md` routes a natural language PM request here

**When to skip**: Pure engineering tasks

---

## Customization

Edit these prompts to change AI behavior. The prompts are the single source of truth for how slash commands operate.
