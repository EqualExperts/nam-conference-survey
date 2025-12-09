# User Story: GCP Secret Manager for Admin Credentials

**Story ID**: STORY-058
**Iteration**: 2025-12-08-final-fixes
**Priority**: High
**Status**: Ready
**Labels**: 2025-12-08-final-fixes, conference-organizer, admin, security, infrastructure, llm-dev

## User Story
As a Conference Organizer,
I want admin credentials stored securely in GCP Secret Manager,
So that sensitive passwords are not exposed in the codebase or deployment commands.

## Context
Currently, admin credentials must be passed via command-line substitutions on every deployment (`--substitutions=_VITE_ADMIN_PASSWORD="..."`). This is error-prone and risks exposing credentials in shell history. Storing credentials in GCP Secret Manager allows secure, centralized management with automatic retrieval during builds.

## Source
**Discovery Cycle**: 2025-12-08-final-fixes
**Synthesis Reference**: Product Owner discussion during deployment
**User Need**: Secure credential management without manual re-entry on each deploy
**Supporting Evidence**: Current deployment requires re-specifying password each time; credentials should not be searchable in repo

## Acceptance Criteria

### Functional Scenarios

**Scenario 1: Deploy without specifying credentials**
- **Given** admin credentials are stored in GCP Secret Manager
- **When** I run `gcloud builds submit --config=deploy/gcp/cloudbuild.yaml`
- **Then** the build retrieves credentials from Secret Manager automatically
- **And** the frontend is deployed with the correct admin password

**Scenario 2: Update credentials in Secret Manager**
- **Given** I need to change the admin password
- **When** I update the secret value in GCP Secret Manager
- **And** I trigger a new deployment
- **Then** the new password is used in the deployed application

**Scenario 3: Credentials not in repo or logs**
- **Given** the deployment is configured with Secret Manager
- **When** I search the repository for the admin password
- **Then** the password is not found in any file
- **And** the password is not visible in Cloud Build logs

### Non-Functional Requirements
- [ ] Security: Credentials never appear in repo, logs, or shell history
- [ ] Security: Only authorized service accounts can access secrets
- [ ] Usability: Deployment command is simpler (no substitutions needed)
- [ ] Documentation: README updated with Secret Manager setup instructions

### Quality Checklist
- [ ] Secret created in GCP Secret Manager
- [ ] Cloud Build service account has Secret Manager access
- [ ] cloudbuild.yaml updated to retrieve secret
- [ ] Deployment works without command-line credential substitutions
- [ ] README documents the Secret Manager setup
- [ ] Existing admin login functionality unchanged

## Open Questions
- Secret name convention (e.g., `nam-survey-admin-password` or `admin-credentials`)
- Whether to store username as a secret too, or just password

## Dependencies
- STORY-053 (Admin Password Protection) - Built
- GCP project must have Secret Manager API enabled

## Estimate
**Size**: S
**Confidence**: High

**Reasoning**: Straightforward GCP configuration change. Create secret, grant IAM permissions, update cloudbuild.yaml to use `availableSecrets`. No application code changes needed.

## Metadata
**Iteration**: 2025-12-08-final-fixes
**Created**: 2025-12-09
**Last Updated**: 2025-12-09
**Build Date**:
