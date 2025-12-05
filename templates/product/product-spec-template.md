# [Product Name] - Product Specification

**Last Updated**: [YYYY-MM-DD]
**Version**: [Semantic version or git commit hash]

## Executive Summary

[2-3 paragraphs describing what the product does, who it's for, and the key value it provides. Written for stakeholders who need a quick understanding of the product's current state.]

## User Personas

[Brief summary of who uses this product. Reference `knowledge/product/target-users.md` for full details, or include key persona descriptions here.]

- **[Persona 1]**: [Role and primary use case]
- **[Persona 2]**: [Role and primary use case]
- **[Persona 3]**: [Role and primary use case]

## Feature Areas

### 1. [Feature Area Name]

**User Need**: [What JTBD this feature area addresses]

**Capabilities**:
- **[Capability 1]**: [Description of what users can do, from user perspective]
- **[Capability 2]**: [Description of what users can do, from user perspective]
- **[Capability 3]**: [Description of what users can do, from user perspective]

**User Experience**:
[Narrative description of how users interact with this feature area. Describe the flow, key interactions, and what makes the experience valuable. 2-4 paragraphs.]

**Notable Implementation Details**:
[Technical details worth documenting for future reference - architecture decisions, integrations, performance characteristics, etc. Only include if relevant.]

### 2. [Feature Area Name]

**User Need**: [What JTBD this feature area addresses]

**Capabilities**:
- **[Capability 1]**: [Description from user perspective]
- **[Capability 2]**: [Description from user perspective]

**User Experience**:
[Narrative description of user interaction with this feature area.]

**Notable Implementation Details**:
[Technical details if relevant.]

### 3. [Additional Feature Areas]
[Continue pattern for each major feature area...]

## Non-Functional Characteristics

### Performance
[What performance characteristics does the product have - response times, load capacity, scalability considerations]

### Accessibility
[Accessibility features implemented - WCAG compliance level, keyboard navigation, screen reader support, etc.]

### Security
[Security measures in place - authentication, authorization, data protection, compliance requirements]

### Reliability
[Uptime expectations, error handling, data integrity measures]

### Usability
[Key usability features - responsive design, mobile support, browser compatibility, user feedback mechanisms]

## Technical Context

**Architecture**: [High-level architecture description - monolith vs microservices, client-server model, etc.]

**Technology Stack**: [Key technologies used - frontend framework, backend language, database, hosting, etc.]

**Integrations**: [External systems or services integrated with]

**Deployment**: [How the product is deployed and accessed]

**Data**: [Data storage approach, backup strategy, data retention]

## Known Limitations

[Current limitations, deferred capabilities, known issues, or areas for future improvement]

- [Limitation 1]
- [Limitation 2]
- [Limitation 3]

## Future Direction

[High-level view of planned enhancements or strategic direction. Not a commitment, but useful context.]

## Appendix: Build History

[Grouped by release. Each release section includes stories built and any capabilities built without stories.]

### Release {NUMBER} - {YYYY-MM-DD}

**Stories Built**: {count}

| ID | Title |
|----|-------|
| STORY-001 | [Story title] |
| STORY-002 | [Story title] |

**Capabilities Built Without Stories**: {count}

| Capability | Commit |
|------------|--------|
| [Description] | [hash] |

[Story details (status, build date, acceptance criteria) are in the story files. Full release details are in `product/releases/`.]

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | YYYY-MM-DD | [Release description] |

---

*This product specification is a living document that reflects the current state of the product. It is updated through the `/rel` workflow as new capabilities are built and verified.*
