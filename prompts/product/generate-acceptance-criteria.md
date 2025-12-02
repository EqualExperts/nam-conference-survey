# Generate Acceptance Criteria for User Story

Please create detailed, testable acceptance criteria for a given user story.

## Context Files to Review
- `product/context/product-overview.md` (for constraints and requirements)
- `product/context/technical-context.md` (for technical constraints)
- The specific user story file you're working with

## Instructions
1. Review the user story and its source evidence
2. Generate comprehensive acceptance criteria using Given-When-Then format where appropriate
3. Include both functional and non-functional requirements
4. Consider edge cases and error conditions
5. Ensure criteria are specific, measurable, and testable
6. Consider accessibility, security, and performance requirements

## Acceptance Criteria Framework

### Functional Criteria
- What must the feature do?
- What workflows must it support?
- What validations are required?

### Non-Functional Criteria
- Performance requirements (speed, scale)
- Accessibility requirements (WCAG compliance level)
- Security requirements (authentication, authorization, data protection)
- Usability requirements (ease of use, error handling)

### Edge Cases
- What happens with invalid inputs?
- What happens with missing data?
- What happens at scale limits?
- What happens when dependencies fail?

## Output Format

### Scenario-Based Format (Given-When-Then)
Use this for behavioral acceptance criteria:

```markdown
**Scenario**: [Name of scenario]

**Given** [initial context/precondition]  
**When** [action occurs]  
**Then** [expected outcome]

**And** [additional outcome if needed]
```

### Checklist Format
Use this for criteria that don't fit scenario format:

```markdown
- [ ] [Specific, testable criterion]
- [ ] [Another criterion]
```

## Example Output

```markdown
## Acceptance Criteria

### Scenario 1: Successful Login
**Given** a registered user with valid credentials  
**When** the user enters their email and password and clicks "Log In"  
**Then** the user is redirected to the dashboard  
**And** a success message is displayed  
**And** the user's session is established

### Scenario 2: Failed Login - Invalid Credentials
**Given** a registered user  
**When** the user enters incorrect credentials  
**Then** an error message "Invalid email or password" is displayed  
**And** the user remains on the login page  
**And** the password field is cleared  
**And** no session is established

### Scenario 3: Failed Login - Account Locked
**Given** a user account that has been locked due to multiple failed attempts  
**When** the user enters valid credentials  
**Then** an error message "Account locked. Please reset your password" is displayed  
**And** a password reset link is provided

### Non-Functional Requirements
- [ ] Login request completes within 2 seconds under normal load
- [ ] Password is transmitted securely (HTTPS only)
- [ ] Failed login attempts are logged for security monitoring
- [ ] Login form is accessible (WCAG 2.1 AA compliant)
- [ ] Login form works on mobile devices (responsive design)
- [ ] Error messages do not reveal whether email exists in system (security)

### Edge Cases
- [ ] Handle network timeout gracefully with user-friendly message
- [ ] Handle special characters in password correctly
- [ ] Prevent rapid-fire login attempts (rate limiting)
- [ ] Handle concurrent login sessions appropriately
```

## Success Criteria
- [ ] All happy path scenarios covered
- [ ] All error conditions covered
- [ ] Edge cases identified and handled
- [ ] Non-functional requirements specified
- [ ] Criteria are specific and measurable
- [ ] Criteria are independently testable
- [ ] No ambiguous terms (avoid "should", "usually", "properly")
- [ ] Security considerations included
- [ ] Performance requirements specified
- [ ] Accessibility requirements included

## Output Location
Update the existing user story file with enhanced acceptance criteria, or create a separate detailed acceptance criteria file at:

`product/requirements/acceptance-criteria/ac-[story-id].md`
