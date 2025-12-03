# Rules - Product Management LLM Guidelines

This directory contains rules that guide LLM behavior for product management tasks.

## Rules Index

| File | Purpose |
|------|---------|
| [pm-workflow.md](pm-workflow.md) | Task recognition and routing for PM work without slash commands |

## When to Read These Rules

- **Read `pm-workflow.md`**: When the user asks for PM work (stories, synthesis, etc.) without using a slash command
- **Skip for engineering**: Pure implementation tasks that don't involve PM artifacts

The rules enable Claude to use the prompts/templates infrastructure even when the user doesn't invoke slash commands explicitly.

---

## Contributing New Rules

Rules should be:
- Opinionated
- Brief
- Specific
- Focused (avoid unnecessary context)

Use the template in `templates/product/rule-template.md` to generate new rules:
```
Please generate me a new rule formatted according to templates/product/rule-template.md
that summarizes the principles of [topic/methodology] in under 200 lines.
```
