# Setup - Product Context Interview

You are helping a product manager set up Claude PM for their product. Conduct an interactive interview to populate the product context files.

## Interview Flow

### 1. Introduction

Say:
> "I'll help you set up Claude PM by gathering information about your product. This will populate the context files that I'll reference during discovery. We can go as deep or shallow as you'd like - you can always add more detail later.
>
> **Note**: If your engineering team has already documented technical architecture or tech stack information, you can add those files directly to `context/product/` or reference them if they're elsewhere in the repository. I'll be able to read them automatically."

### 2. Depth Selection

Ask:
> "How much context would you like to provide now?
>
> **Option 1: Quick Start** (~5-10 minutes)
> - Product overview only
> - Minimal information to get started
> - Good for: Early-stage ideas, quick experiments
>
> **Option 2: Standard Setup** (~15-20 minutes)
> - Product overview
> - Target users and personas
> - Good for: Most products ready to start discovery
>
> **Option 3: Complete Setup** (~30-40 minutes)
> - Product overview
> - Target users and personas
> - Competitive landscape
> - Technical context (if not already documented)
> - Glossary of domain terms
> - Good for: Products with clear market positioning"

Wait for user to choose Option 1, 2, or 3.

---

## Option 1: Quick Start

### Product Overview

Ask these questions and populate `context/product/product-overview.md`:

1. **Product Name**: "What's the name of your product or feature?"

2. **Vision/Tagline**: "In one sentence, what does your product do or what problem does it solve?"

3. **Current Stage**: "What stage are you at? (e.g., idea/concept, MVP, beta, production, established product adding new features)"

4. **Who experiences the problem**: "Who are the primary users or customers? (Just a quick description - we can add detail later)"

5. **Core Problem**: "What's the main problem or pain point you're solving? (1-2 sentences)"

After collecting responses, say:
> "Great! I'll create your product overview now. You can add more detail to `context/product/product-overview.md` anytime."

Then create the file with their responses.

**Stop here for Option 1** - Skip to "Next Steps" section.

---

## Option 2: Standard Setup

Complete **Option 1** first, then continue:

### Target Users

Ask these questions and populate `context/product/target-users.md`:

1. **Primary Persona Name/Role**: "What's the primary user persona? (e.g., Engineering Team Lead, Small Business Owner, etc.)"

2. **Demographics**: "Any important demographics for this persona? (company size, industry, experience level, etc.)"

3. **Key Goals** (ask for 2-3): "What are the top 2-3 goals this persona is trying to achieve?"

4. **Key Pain Points** (ask for 2-3): "What are the biggest frustrations or challenges they face today?"

5. **Technical Proficiency**: "How technical is this user? (non-technical, beginner, intermediate, advanced)"

6. **Additional Personas**: "Are there other important user types? If yes, just give me their role/name and we can add details later. If no, that's fine."

After collecting responses, say:
> "Perfect! I'll create your target users file now. You can add more personas or detail to `context/product/target-users.md` anytime."

Then create the file with their responses.

**Stop here for Option 2** - Skip to "Next Steps" section.

---

## Option 3: Complete Setup

Complete **Option 2** first, then continue:

### Competitive Landscape

Say:
> "Let's capture your competitive positioning. This helps me understand how to differentiate during discovery."

Ask these questions and populate `context/product/competitive-landscape.md`:

1. **Top 2-3 Direct Competitors**: "Who are your main direct competitors? (products that solve the same problem)"

2. **For each competitor, ask**:
   - "What do they do well?"
   - "What are their weaknesses?"
   - "How is your product different or better?"

3. **Indirect Competitors/Alternatives**: "What do people use today if they don't use a product like yours? (e.g., spreadsheets, manual processes, other workarounds)"

4. **Key Differentiation**: "In one sentence, what makes your product unique?"

### Technical Context

Say:
> "Now let's talk about technical context. **Important**: If your engineering team has already documented architecture, tech stack, or technical constraints, you can skip this and just point me to those files or add them to `context/product/` directly."

Ask:
> "Do you have existing technical documentation I should reference? (yes/no)"

**If YES**:
- Ask: "Where can I find it? (file path or just tell me to look in a specific directory)"
- Say: "Great! I'll reference that documentation. You can also copy key files to `context/product/technical-context.md` if you want me to always have quick access."
- Skip technical questions

**If NO**:
Ask these questions and populate `context/product/technical-context.md`:

1. **Tech Stack Known**: "Do you know what tech stack you're using or planning to use? (It's okay if this is TBD)"

2. **If known, ask**:
   - "What's the frontend framework? (React, Vue, etc. or TBD)"
   - "What's the backend framework? (Node.js, Django, etc. or TBD)"
   - "What database? (PostgreSQL, MongoDB, etc. or TBD)"
   - "What cloud provider? (AWS, GCP, Azure, etc. or TBD)"

3. **Technical Constraints**: "Are there any important technical constraints? (performance requirements, security/compliance needs, browser support, etc.)"

4. **Integration Requirements**: "Does this need to integrate with any existing systems or third-party services?"

### Glossary

Say:
> "Finally, let's capture any domain-specific terms or jargon."

Ask:
> "Are there any domain-specific terms, acronyms, or jargon I should know? This helps me understand interviews and write better stories. (If none come to mind, we can skip this - you can add them later as they come up)"

**If YES**: Ask them to list 3-5 key terms and their definitions, then populate `context/product/glossary.md`

**If NO**: Say "No problem! You can add terms to `context/product/glossary.md` as they come up during discovery."

---

## Next Steps

After completing the interview (regardless of option chosen), say:

> "**Setup Complete!**
>
> I've created your product context files in `context/product/`. You can review and edit them anytime.
>
> ### What you can do now:
>
> 1. **Start your first iteration**:
>    - Type `/iter` to begin
>    - I'll help you conduct stakeholder interviews or add research
>
> 2. **Add more context** (optional):
>    - Review files in `context/product/` and add detail
>    - If you have existing technical docs, copy them to `context/product/`
>    - Engineering team can add architecture diagrams, tech stack details, etc.
>
> 3. **Learn the workflow**:
>    - Read `product/README.md` for workflow overview
>
> ### Quick Reference:
> - `/iter` - Start new iteration (interviews, research)
> - `/synth` - Synthesize discovery findings
> - `/req` - Extract user stories from synthesis
> - `/map` - Create Miro story map
> - `/jira` - Load stories to Jira (if Atlassian MCP configured)
>
> **Ready to start your first iteration?** Just type `/iter` when you're ready!"

---

## File Creation Guidelines

When creating context files:

1. **Use the templates** in `context/product/` as a base
2. **Replace placeholder sections** with user's responses
3. **Keep examples** if user provided minimal info (they can reference them later)
4. **Mark TBD clearly** for sections they skipped
5. **Use proper markdown formatting**

### Example Product Overview Output:

```markdown
# Product Overview

## Product Name
[User's product name]

## Vision Statement
[User's tagline/vision]

## Problem Statement

### What problem are we solving?
[User's core problem description]

### Who experiences this problem?
[User's description of who has the problem]

### Current alternatives/workarounds
[TBD - can be added during discovery]

## Solution Overview
[User's solution if provided, or TBD]

## Success Metrics
[TBD - can be defined during discovery]

## Constraints & Assumptions

### Technical Constraints
[User's technical constraints if provided, or TBD]

### Business Constraints
[TBD - can be added later]

### Key Assumptions
[TBD - can be validated during discovery]

## Out of Scope (for now)
[TBD - will be defined during discovery cycles]
```

---

## Important Reminders

Throughout the interview:

1. **Be conversational** - This is a dialogue, not a form to fill out
2. **Allow brief answers** - Don't force detail if they want to move quickly
3. **Remind about iteration** - They can always add more context later
4. **Reference existing docs** - Encourage them to point to or copy existing documentation rather than recreating it
5. **Show progress** - After each section, acknowledge what was captured
6. **Be encouraging** - Even minimal context is valuable to get started

## Handling Edge Cases

**If user says "I don't know" or "TBD"**:
- Say: "No problem! I'll mark that as TBD. You can add it later or we'll discover it during iterations."

**If user wants to skip everything**:
- Say: "Totally fine! You can manually edit the context files in `context/product/` whenever you're ready. Want to jump straight to `/iter` to start discovery?"

**If user has existing documentation**:
- Say: "Perfect! You can copy those files directly into `context/product/` or just point me to them and I'll reference them. This interview is optional if you already have good docs."

**If this is a sub-product or module in a larger product**:
- Say: "Since this is part of a larger product, you can reference the parent product's context or create a focused version just for this module. Whichever makes more sense for your workflow."
