# Admin Authentication (Lightweight Login)

The survey application currently has anonymous public access for survey participants, but admin functionality (under the `/admin` route context) needs to be protected with basic authentication. This feature introduces a lightweight username/password login system that validates credentials against environment variables and protects all admin routes with session-based authentication. The goal is to prevent unauthorized access to admin functionality while maintaining simplicity - this is an internal tool that doesn't require enterprise-grade security infrastructure.

## Requirements

- **Login page**: User sees a login form when attempting to access any `/admin/*` route without valid authentication
- **Credential validation**: Submitted username and password are validated against `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` environment variables
- **Local development**: `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` default to `admin` and `password` for local development
- **Session persistence**: Successful login creates a session that persists across page refreshes (sessionStorage or localStorage)
- **Route protection**: All routes under `/admin` context automatically redirect to login page if user is not authenticated
- **Post-login redirect**: After successful login, user is redirected to the originally requested admin page (or default admin dashboard)
- **Visual consistency**: Login UI follows the same design patterns as existing survey pages (Mantine components, Equal Experts branding)
- **Error feedback**: Invalid credentials display clear error message to user
- **No logout initially**: Session persists until browser session ends or user clears storage (logout can be added later if needed)

## Rules

- rules/design-rules.md
- rules/react-rules.md
- rules/state-management-rules.md
- rules/typescript-rules.md

## Component Architecture

```typescript
// Environment variables (frontend .env)
interface AdminEnvVars {
  VITE_ADMIN_USERNAME: string;
  VITE_ADMIN_PASSWORD: string;
}

// Auth context/hook for managing authentication state
interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  // Note: logout not required initially, but can be added later
}

// Login page component
interface LoginPageProps {
  // No props needed - handles its own state and redirect logic
}

interface LoginFormData {
  username: string;
  password: string;
}

// Protected route wrapper component
interface ProtectedRouteProps {
  children: React.ReactNode;
  // Optional: redirectTo path after login
}

// Component hierarchy:
// App
//   ├── AuthProvider (wraps entire app)
//   ├── Router
//       ├── /admin/login → LoginPage
//       ├── /admin/* → ProtectedRoute
//           └── AdminDashboard (or other admin pages)
```

## Extra Considerations

- **Environment variable security**: Document that VITE_ADMIN_ prefixed variables are exposed to frontend bundle - acceptable for this use case but users should be aware. Vite requires VITE_ prefix for client-side exposure.
- **Session storage choice**: Consider sessionStorage (clears on tab close) vs localStorage (persists across browser restarts) - sessionStorage is more secure
- **URL preservation**: When redirecting to login, preserve the intended destination URL to redirect back after successful login
- **Responsive design**: Login form should work well on mobile devices (admin might access on tablets/phones)
- **Error handling**: Handle edge cases like empty credentials, missing env vars, network errors gracefully
- **No password hashing on frontend**: Since credentials are in env vars, there's no need for client-side hashing (would provide false security)
- **Accessibility**: Login form must be keyboard accessible and screen reader friendly

## Testing Considerations

- **Manual testing**: Verify login flow with correct/incorrect credentials
- **Session persistence**: Test that authentication survives page refresh
- **Route protection**: Attempt to access admin routes without authentication and verify redirect
- **Edge cases**: Test with missing env vars, empty form submission, special characters in password
- **Note**: No automated E2E tests required initially, but login flow should be testable with Playwright if needed later

## Implementation Notes

**Authentication approach:**
- Use React Context + custom hook pattern for auth state management (e.g., `useAuth()` hook)
- Store authentication status in sessionStorage as a simple boolean or token flag
- No JWT tokens or complex session management - a simple "isAuthenticated" flag is sufficient

**Routing approach:**
- Create a `<ProtectedRoute>` wrapper component that checks auth status
- Use React Router's navigation/redirect functionality to send unauthenticated users to login
- Preserve intended destination in URL query params or state for post-login redirect

**Styling approach:**
- Use Mantine components (TextInput, PasswordInput, Button, Container, Paper)
- Follow the same layout patterns as SurveyPage (centered content, mobile-first responsive)
- Include Equal Experts branding (logo, colors: #1795d4 primary blue, #22567c navy)

**Environment variables:**
- Frontend: `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` in `apps/frontend/.env` (VITE_ prefix required by Vite)
- Document in README that these should be set differently in production
- Consider adding `.env.example` with placeholder values
- Local environment can inject `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` through docker-compose.yml

**File organization:**
- `src/contexts/AuthContext.tsx` - Auth context provider and hook
- `src/components/ProtectedRoute.tsx` - Route protection wrapper
- `src/pages/LoginPage.tsx` - Login form page
- Update `src/App.tsx` or router config to include login route and wrap admin routes

## Specification by Example

### Example 1: Unauthenticated user attempts to access admin dashboard
1. User navigates to `http://localhost:3000/admin`
2. `ProtectedRoute` component checks `isAuthenticated` state (from AuthContext)
3. State returns `false` (no valid session in sessionStorage)
4. User is redirected to `/admin/login?redirect=/admin`
5. Login page displays with username/password form

### Example 2: Successful login flow
1. User is on `/admin/login?redirect=/admin`
2. User enters username: "admin", password: "conference2024"
3. User clicks "Login" button or presses Enter
4. Form validates credentials against `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD`
5. Credentials match - `login()` function sets `isAuthenticated: true` in sessionStorage
6. User is redirected to `/admin` (from redirect query param)
7. Admin dashboard page loads successfully

### Example 3: Failed login attempt
1. User enters username: "admin", password: "wrongpassword"
2. User clicks "Login" button
3. Credentials don't match environment variables
4. Error message displays: "Invalid username or password"
5. Form remains on login page, inputs are cleared or focus is set to password field
6. User can try again

### Example 4: Session persistence across page refresh
1. User successfully logs in and navigates to `/admin`
2. User refreshes the page (F5 or CMD+R)
3. On app initialization, AuthContext checks sessionStorage for authentication flag
4. Flag exists and is valid - `isAuthenticated` is set to `true`
5. Admin page loads without redirect to login

### Example 5: Environment variables
```bash
# apps/frontend/.env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=conference2024
```

## Verification

- [ ] Login page renders correctly and matches existing page design patterns
- [ ] Login form accepts username and password input
- [ ] Form validation prevents empty submission
- [ ] Correct credentials (matching env vars) allow successful login
- [ ] Incorrect credentials display appropriate error message
- [ ] Authentication state persists across page refresh (sessionStorage)
- [ ] Unauthenticated users are redirected to `/admin/login` when accessing `/admin` routes
- [ ] After successful login, user is redirected to originally requested admin page
- [ ] Login page is keyboard accessible (tab navigation, Enter to submit)
- [ ] Login page is mobile responsive (works on 375px viewport)
- [ ] Missing environment variables are handled gracefully (error message or fallback)
- [ ] Special characters in password are handled correctly
- [ ] AuthContext provides `isAuthenticated` and `login` to consuming components
- [ ] ProtectedRoute correctly wraps admin routes and enforces authentication
- [ ] Equal Experts branding (logo, colors) is present on login page
- [ ] No console errors or warnings during login flow
