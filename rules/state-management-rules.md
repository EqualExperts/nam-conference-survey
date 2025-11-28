# State Management Pattern Rules

Simple state organization for the NAM Conference Survey demo app focusing on React state patterns and form management without over-engineering.

## Context

*Applies to:* React state management, form handling, and data flow patterns
*Level:* Tactical - State organization for demo app simplicity
*Audience:* Frontend developers working with survey forms and admin functionality

## Core Principles

1. **Start Simple:** Use local React state first, lift up only when necessary
2. **Form Focus:** Survey forms are the main state complexity - handle them well
3. **Server State Separation:** Distinguish UI state from server data
4. **Demo Appropriate:** Don't over-engineer for a conference demo

## Rules

### Must Have (Critical)

- **RULE-001:** Survey form state MUST use controlled components with react-hook-form
- **RULE-002:** Server data MUST use TanStack Query, not useState + useEffect  
- **RULE-003:** Authentication state MUST use React Context (simple boolean + token)
- **RULE-004:** Form progress MUST persist in sessionStorage for multi-step survey

### Should Have (Important)

- **RULE-101:** Loading and error states SHOULD be co-located with data fetching
- **RULE-102:** Local component state SHOULD stay local unless shared across routes

## State Categories

### 1. Survey Form State
```typescript
// Use react-hook-form for the main survey
import { useForm } from 'react-hook-form';

function SurveyForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: JSON.parse(sessionStorage.getItem('survey_progress') || '{}'),
  });

  // Auto-save progress
  const formData = watch();
  useEffect(() => {
    sessionStorage.setItem('survey_progress', JSON.stringify(formData));
  }, [formData]);

  const onSubmit = async (data) => {
    await submitSurvey(data);
    sessionStorage.removeItem('survey_progress'); // Clear on success
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* questions */}</form>;
}
```

### 2. Server State (TanStack Query)
```typescript
// All API data through TanStack Query
function AdminResponses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['survey-responses'],
    queryFn: () => api.getSurveyResponses(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  return <ResponseTable data={data} />;
}
```

### 3. Global State (React Context)
```typescript
// Simple auth context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token) => {
    localStorage.setItem('admin_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### 4. Local Component State
```typescript
// Keep it simple for UI interactions
function QuestionCard({ question }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card>
      <Button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </Button>
      {isExpanded && <QuestionDetails question={question} />}
    </Card>
  );
}
```

## Form Validation
```typescript
// Simple validation with react-hook-form
const surveySchema = {
  q1_overall_rating: { required: "Please rate the overall experience" },
  q2_return_intent: { required: "Please rate your return intent" },
};

function useSurveyForm() {
  return useForm({
    mode: 'onBlur',
    defaultValues: loadSavedProgress(),
    resolver: (values) => validateSurvey(values, surveySchema),
  });
}
```

## Anti-Patterns for Demo App

### ❌ Don't Over-Engineer
```typescript
// Don't use complex state management for a demo
const [complexState, dispatch] = useReducer(complexReducer, initialState); // ❌

// Don't create elaborate state machines
const [current, send] = useMachine(surveyStateMachine); // ❌

// Don't micro-optimize everything
const memoizedEverything = useMemo(() => expensiveCalc(), []); // ❌
```

### ✅ Keep It Simple
```typescript
// Basic state for basic needs
const [isSubmitting, setIsSubmitting] = useState(false);
const [selectedValue, setSelectedValue] = useState(null);

// Use the platform
const formData = new FormData(form); // For simple forms
const searchParams = new URLSearchParams(location.search); // For URL state
```

## Quality Gates

### Code Review Focus
- [ ] Forms use react-hook-form with validation
- [ ] Server data uses TanStack Query
- [ ] No prop drilling for global state (use Context)
- [ ] Survey progress persists across page reloads

---

## TL;DR

*Demo App Philosophy:* Simple, predictable state management without over-engineering
*Form Focus:* react-hook-form + sessionStorage for survey progress  
*Server Data:* TanStack Query for all API calls
*Global State:* React Context only for auth (boolean + token)

*Quick Decision:*
New state needed? **Local useState first**, lift to Context only if truly global, use TanStack Query for server data, react-hook-form for forms.