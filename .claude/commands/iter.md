---
description: Start a new iteration with discovery
---

You are being asked to start a new product iteration for the NAM Demo application.

# Task

1. **Record start time**:
   - Capture the current timestamp as the operation start time
   - This will be used for timing metrics

2. **Get iteration information from user**:
   - Ask the user for the iteration name (short slug, e.g., "mvp", "analytics", "mobile")
   - Ask for a brief description of the iteration focus (one sentence)
   - Ask if they want to be interviewed to populate the baseline discovery context (yes/no)

3. **Create iteration directory structure**:
   - Generate iteration directory name: `{YYYY-MM-DD}-{iteration-name}` using today's date (ISO format)
   - **CRITICAL**: Create directories using SEPARATE mkdir commands. Each path MUST be wrapped in double quotes to handle spaces (e.g., `mkdir -p "/path/with spaces/dir"`). Do NOT use brace expansion `{}` - it fails silently with paths containing spaces.
   - Run these commands in sequence:
     ```bash
     # Step 1: Create discovery subdirectories (use full absolute paths, quoted)
     mkdir -p "{full-path}/product/iterations/{iteration-date}/discovery/interviews"
     mkdir -p "{full-path}/product/iterations/{iteration-date}/discovery/observations"
     mkdir -p "{full-path}/product/iterations/{iteration-date}/discovery/synthesis"

     # Step 2: Create other top-level directories (use full absolute paths, quoted)
     mkdir -p "{full-path}/product/iterations/{iteration-date}/stories"
     mkdir -p "{full-path}/product/iterations/{iteration-date}/story-maps"
     mkdir -p "{full-path}/product/iterations/{iteration-date}/design"
     ```
   - Expected directories (all 8 must exist):
     - `product/iterations/{iteration-date}/`
     - `product/iterations/{iteration-date}/discovery/`
     - `product/iterations/{iteration-date}/discovery/interviews/`
     - `product/iterations/{iteration-date}/discovery/observations/`
     - `product/iterations/{iteration-date}/discovery/synthesis/`
     - `product/iterations/{iteration-date}/stories/`
     - `product/iterations/{iteration-date}/story-maps/`
     - `product/iterations/{iteration-date}/design/`
   - **VALIDATION REQUIRED**: After creating directories, run `ls -la` on BOTH the iteration root AND the discovery directory to confirm all 8 directories exist. If any are missing, create them individually before proceeding. Do NOT continue until validation passes.
   - Create initial discovery README.md:
     ```markdown
     # Iteration Discovery: {iteration-date}

     **Started**: {YYYY-MM-DD}
     **Focus**: {description}
     **Status**: Active

     ## Goals
     {description}

     ## Research Methods
     - [x] AI-guided stakeholder interview
     - [ ] Technical observations
     - [ ] Additional research as needed

     ## Timeline
     - **Start**: {YYYY-MM-DD}
     - **Target synthesis**: TBD

     ## Key Decisions
     [To be documented during discovery]

     ## Notes
     [Context and findings]
     ```
   - Create `.synthesis-pending` marker file in discovery directory
   - Copy interview template from `templates/product/interview-template.md` to `discovery/interviews/` directory if it exists

4. **Conduct interview (if user said yes)**:
   - If the user wants to be interviewed:
     - Conduct a structured discovery interview based on the iteration context
     - Ask about:
       - Business drivers and rationale for the iteration
       - Target users and their pain points
       - Feature scope and requirements
       - Success metrics and goals
       - Timeline and dependencies
       - MVP scope (what's in, what's deferred)
     - Keep the interview conversational but comprehensive
     - Take notes during the interview

5. **Save interview notes (if interview was conducted)**:
   - Format the interview as a proper interview document
   - Include:
     - Interview metadata (date, participant, role, duration)
     - Key findings organized by topic
     - Direct quotes from the user
     - Insights and observations
     - Open questions
     - Tags
   - Save to `product/iterations/{iteration-date}/discovery/interviews/interview-{user-name}-{date}.md`
   - Use the interview template format from `templates/product/interview-template.md`

6. **Update discovery README**:
   - Update `product/iterations/{iteration-date}/discovery/README.md` with:
     - Specific goals for this iteration
     - Research methods used (interview, observations, etc.)
     - Key decisions made during setup
     - Timeline information
   - Keep it concise but informative

7. **Record timing and report results**:
   - Capture the end timestamp
   - Calculate duration in seconds
   - Append to centralized timing log at `product/metrics/timing-log.jsonl`:
     ```json
     {"timestamp": "{end_timestamp}", "command": "/iter", "iteration": "{iteration-date}", "start": "{start_timestamp_ISO8601}", "end": "{end_timestamp_ISO8601}", "duration_seconds": {duration}, "status": "success", "metadata": {"interview_conducted": true/false}}
     ```
   - Tell the user:
     - The iteration has been created
     - The iteration directory path
     - If interview was conducted, mention the interview notes location
     - The operation duration
     - Suggest next steps:
       - Add technical observations if needed
       - Run `/synth` when ready to synthesize
       - Or conduct additional interviews/research

# Notes

- The iteration name should be a short, hyphenated slug (e.g., "mvp", not "MVP Features")
- The description is just for context - keep it to one sentence
- The interview should be thorough but not exhausting - aim for 10-15 minutes worth of questions
- If the user declines the interview, just create the structure and they can add materials manually
- All directory and file creation is handled by the slash command using Bash and Write tools
- Interview questions should be tailored to the iteration type (UI features vs backend services vs infrastructure)
- Iterations can be concurrent - multiple active iterations are supported
- Discovery is continuous within an iteration - synthesis can be run multiple times
