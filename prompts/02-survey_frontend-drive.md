# Anonymous Survey Submission Frontend

This feature implements the public-facing survey form that allows conference attendees to provide anonymous feedback. The interface presents all 19 questions in a single-page format with progress indication, mobile-first responsive design, and immediate submission without requiring authentication. The form adheres to Equal Experts branding with Mantine UI components and ensures WCAG 2.1 AA accessibility compliance.

## Requirements

- Single-page survey form displaying all 19 questions without authentication
- All questions are optional - users can skip any or all questions
- Progress indicator showing completion percentage as users proceed
- Mobile-first responsive design (375px to 1920px)
- Question types: Likert scales (1-5), Likert with N/A, multi-select checkboxes, ranking, single choice, open-ended text
- Real-time form validation with clear error messages
- Submit button triggers anonymous POST to backend API
- Success: redirect to thank you page with submission confirmation
- Error: display inline error messages without losing form data
- Loading state during submission with disabled form
- Equal Experts branding (logo, colors, typography per [`knowledge/design-system.md`](../knowledge/design-system.md))
- WCAG 2.1 AA accessibility (keyboard navigation, screen reader support, color contrast)

## Rules

- rules/react-rules.md
- rules/design-rules.md
- rules/state-management-rules.md
- rules/vite-rules.md
- rules/clean-code.md
- rules/typescript-rules.md

## Component Architecture

```typescript
// Main survey page component
interface SurveyPageProps {}

interface SurveyFormState {
  // Likert scale questions (number or null)
  q1OverallRating: number | null;
  q1Comment: string;
  q2ReturnIntent: number | null;
  q2Comment: string;
  
  // Likert with N/A (string or null)
  q3CoworkingEffectiveness: string | null;  // '1'-'5', 'NA', or null
  q3Comment: string;
  
  // Multiple select
  q4ConnectionTypes: string[];
  q4ConnectionOther: string;
  
  // Additional questions (matching backend schema)
  q5ConnectionDepth: number | null;
  q5Comment: string;
  q6LearningValue: number | null;
  q6Comment: string;
  q7FutureTopics: string;
  q8SaturdayWorth: string | null;
  q8Comment: string;
  q9PreConferenceCommunication: number | null;
  q10AccommodationsVenue: string | null;
  q11SessionRankings: Record<string, number>;
  q12ConferenceLength: string;
  q13ComparisonToPD: string | null;
  q14LikedMost: string;
  q15AdditionalFeedback: string;
  q16Improvements: string;
  q16Comment: string;
  q17FeedbackConfidence: string[];
  q18EmploymentStatus: string;
  q19Name: string;
  q19Location: string;
}

// Component hierarchy
<SurveyPage>
  <Container size="md">
    <SurveyHeader />           // Equal Experts logo
    <ProgressIndicator />      // Questions answered / 19, percentage
    <SurveyForm>
      <Stack gap="xl">
        <LikertQuestion />         // Q1, Q2, Q5, Q6, Q9
        <LikertWithNAQuestion />   // Q3, Q8, Q10, Q13
        <MultipleSelectQuestion /> // Q4, Q17
        <RankingQuestion />        // Q11
        <SingleChoiceQuestion />   // Q12, Q16, Q18
        <OpenEndedQuestion />      // Q7, Q14, Q15
        <TextFieldQuestion />      // Q19 (name, location)
        <OptionalCommentBox />     // All comment fields
      </Stack>
      <SubmitButton />
    </SurveyForm>
  </Container>
</SurveyPage>

<ThankYouPage>
  <Container size="sm">
    <SuccessMessage />
    <ReturnButton />
  </Container>
</ThankYouPage>

// Reusable question components
interface LikertQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: number | null;
  onChange: (value: number | null) => void;
  comment?: string;
  onCommentChange?: (comment: string) => void;
}

interface LikertWithNAQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: string | null;  // '1'-'5', 'NA', or null
  onChange: (value: string | null) => void;
  comment?: string;
  onCommentChange?: (comment: string) => void;
}

interface MultipleSelectQuestionProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

interface RankingQuestionProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  rankings: Record<string, number>;
  onChange: (rankings: Record<string, number>) => void;
}
```

## Extra Considerations

- **Mobile-First Design**: All components must work on 375px width (iPhone SE) first, then scale up
- **Touch Targets**: Minimum 44x44px touch targets for all interactive elements (buttons, radio, checkbox)
- **Anonymous Access**: No authentication required - form loads immediately on page visit
- **Progress Calculation**: Count non-null/non-empty answers vs total 19 questions
- **Form Persistence**: Consider using sessionStorage to prevent data loss on accidental refresh
- **Loading States**: Disable all inputs and show spinner during submission
- **Error Recovery**: Keep form data intact if submission fails, display retry option
- **Question Spacing**: Generous whitespace between questions for readability (24px minimum)
- **Optional Indicators**: Clear "(optional)" labels but emphasize all questions are optional
- **Transparency Notes**: Display data usage explanation for each question per spec
- **Browser Compatibility**: Test on Chrome, Safari, Firefox, Edge
- **Performance**: Initial page load <2s, form interaction <100ms response time

## Testing Considerations

- **Component Tests**: Each question component renders correctly with all states
- **Integration Tests**: Complete survey submission flow, partial submission flow
- **Validation Tests**: Field-level validation for Likert ranges, N/A options
- **Accessibility Tests**: Keyboard navigation through entire form, screen reader compatibility
- **Responsive Tests**: Verify layout at breakpoints: 375px, 640px, 768px, 1024px, 1920px
- **Error Handling Tests**: API error responses, network failures, timeout scenarios
- **Progress Tests**: Progress indicator updates correctly as questions are answered
- **Form State Tests**: Values persist correctly, comments associate with questions
- **Visual Regression**: Screenshots at each breakpoint match design system
- **Performance Tests**: Page load time <2s, form submission <500ms total

## Implementation Notes

- **State Management**: Use React Hook Form with Zod validation schema
- **API Client**: Use Axios with TanStack Query for submission mutation
- **UI Components**: Mantine UI v7 components per [`knowledge/design-system.md`](../knowledge/design-system.md)
- **Styling**: Mantine theme customization with Equal Experts colors
- **Routing**: React Router for navigation to thank you page
- **Form Layout**: Single scrollable page with Cards for each question group
- **Progress Bar**: Mantine Progress component at top of form
- **Question Groups**: Visual separation for related questions (e.g., Q1-Q2 overall experience)
- **Comment Fields**: Collapsible/expandable optional comment boxes
- **Ranking Implementation**: Use Mantine Select dropdowns (1-4) for mobile-friendly ranking
- **Error Display**: Mantine Alert component for submission errors
- **Success Redirect**: Navigate to `/thanks` route with success state
- **Theme**: Import from `apps/frontend/src/theme/theme.ts` as defined in design system

## Specification by Example

### User Journey: Complete Survey Submission

```typescript
// User Flow
1. User visits http://localhost:3000/survey
2. Page loads with Equal Experts logo, all 19 questions, progress bar at 0%
3. User answers Q1 (Overall Rating): selects 5 stars
   → Progress bar updates to 5% (1/19)
4. User adds Q1 comment: "Excellent conference!"
5. User skips Q2-Q3
6. User answers Q4 (Connection Types): checks "Colleagues", "Clients"
   → Progress bar updates to 10% (2/19)
7. User continues through questions, skipping some
8. User reaches end, sees "Submit Survey" button
9. User clicks Submit
   → Form disables, spinner shows "Submitting..."
   → API POST to /api/survey/submit
10. Success response received
    → Navigate to /thanks page
    → Display: "Thank You! Your feedback has been submitted successfully."
```

### Component Usage: Likert Question

```typescript
<LikertQuestion
  id="q1OverallRating"
  question="How would you rate your overall conference experience?"
  transparency="This helps us understand attendee satisfaction and improve future events."
  value={formState.q1OverallRating}
  onChange={(value) => updateField('q1OverallRating', value)}
  comment={formState.q1Comment}
  onCommentChange={(comment) => updateField('q1Comment', comment)}
/>

// Renders as:
<Card shadow="sm" padding="lg" radius="md" withBorder>
  <Stack gap="md">
    <Title order={3} size="h4">
      How would you rate your overall conference experience?
    </Title>
    <Text size="sm" c="dimmed">
      This helps us understand attendee satisfaction and improve future events.
    </Text>
    <Radio.Group value={value?.toString() || ''} onChange={handleChange}>
      <Stack gap="sm">
        <Radio value="1" label="1 - Poor" />
        <Radio value="2" label="2 - Fair" />
        <Radio value="3" label="3 - Good" />
        <Radio value="4" label="4 - Very Good" />
        <Radio value="5" label="5 - Excellent" />
      </Stack>
    </Radio.Group>
    {/* Optional comment field */}
    <Textarea
      label="Additional comments (optional)"
      value={comment}
      onChange={(e) => onCommentChange(e.currentTarget.value)}
      placeholder="Share any additional thoughts..."
      minRows={2}
      autosize
    />
  </Stack>
</Card>
```

### Responsive Behavior

```typescript
// Mobile (375px)
- Single column layout
- Vertical radio button stacks
- Full-width cards
- Sticky progress bar at top
- Touch-optimized button sizes

// Tablet (768px)
- Single column with wider cards
- More padding/spacing

// Desktop (1024px+)
- Centered container (max 800px)
- Larger typography
- Comfortable spacing
```

### Error State Example

```typescript
// Submission fails with 400 error
<Alert
  icon={<IconAlertCircle />}
  title="Submission Error"
  color="red"
  withCloseButton
  onClose={() => clearError()}
>
  There was a problem submitting your survey. Please check your answers and try again.
  {errors.map(err => (
    <Text key={err.field} size="sm">
      • {err.field}: {err.message}
    </Text>
  ))}
</Alert>

// Keep form data intact, allow user to fix and resubmit
```

### Success Page

```typescript
<ThankYouPage>
  <Container size="sm" py="xl">
    <Card shadow="md" padding="xl" radius="md" withBorder>
      <Stack align="center" gap="xl">
        <Image
          src="https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg"
          alt="Equal Experts"
          h={60}
          w="auto"
        />
        <Title order={1} ta="center" c="equalBlue.4">
          Thank You!
        </Title>
        <Text size="lg" ta="center">
          Your feedback has been submitted successfully.
        </Text>
        <Text size="md" c="dimmed" ta="center">
          Your responses will help us improve future conferences.
          We genuinely appreciate you taking the time to share your thoughts.
        </Text>
        <Button
          variant="filled"
          color="equalBlue"
          size="lg"
          component="a"
          href="https://www.equalexperts.com"
        >
          Return to Equal Experts
        </Button>
      </Stack>
    </Card>
  </Container>
</ThankYouPage>
```

## Verification

- [ ] Survey page loads without authentication at `/survey` route
- [ ] All 19 questions display with correct types (Likert, multi-select, ranking, text)
- [ ] Progress indicator shows completion percentage (0-100%)
- [ ] Equal Experts logo displays in header
- [ ] Mobile layout works correctly at 375px width
- [ ] Touch targets meet 44x44px minimum size
- [ ] Tablet layout optimized at 768px width
- [ ] Desktop layout centered at 1024px+ width
- [ ] Keyboard navigation works through entire form
- [ ] Screen reader announces all questions and options
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Likert questions render 1-5 scale with clear labels
- [ ] Likert with N/A includes "Not Applicable" option
- [ ] Multi-select checkboxes allow multiple selections
- [ ] Ranking question allows ordering 1-4
- [ ] Open-ended questions have expandable text areas
- [ ] Optional comment boxes available for relevant questions
- [ ] Submit button disabled during submission
- [ ] Loading spinner shows during API call
- [ ] Success: redirects to thank you page
- [ ] Error: displays clear message without losing form data
- [ ] Form validation prevents invalid submissions
- [ ] API integration sends correct payload structure per [`knowledge/api-spec.md`](../knowledge/api-spec.md)
- [ ] Partial submissions work (any subset of questions)
- [ ] Empty submission acceptable (zero questions answered)
- [ ] Page load completes in <2 seconds
- [ ] Form interactions respond in <100ms
- [ ] Cross-browser testing passed (Chrome, Safari, Firefox, Edge)