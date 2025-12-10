# Response Detail Modal Component

**Story Reference**: STORY-046 (iterations/2025-12-02-admin-page/stories/story-046-response-detail-modal.md)

The admin overview page shows recent survey responses in a table with basic information (ID and timestamp). Conference organizers need to view the complete response details without leaving the overview page. This feature adds a modal overlay that displays all 19 survey questions and answers when the organizer clicks "View" on a response row, providing a quick way to review individual feedback.

## Requirements

- Add "View" link/button to each row in the Recent Responses table on the admin overview page
- Clicking "View" opens a modal overlay with the complete response details
- Modal displays response header showing ID and formatted submission timestamp
- Modal body shows all 19 questions in order (Q1-Q19) with their answers
- Display each question type with appropriate formatting:
  - **Likert scale**: Star rating visualization with numeric value and label (e.g., "★★★★☆ (4 - Satisfied)")
  - **Multi-select**: Bulleted list of selected options
  - **Ranking**: Numbered list in rank order
  - **Open-ended**: Quoted text block preserving line breaks
- Unanswered questions show "No response" in italic text
- Modal scrolls internally when content exceeds viewport height (max-height: 80vh)
- Modal header remains fixed at top while scrolling
- Modal can be closed three ways: X button, clicking overlay, pressing Escape key
- Focus returns to the "View" link that opened the modal after closing
- Focus is trapped within modal while open (keyboard navigation stays inside)
- Modal opens within 500ms including data fetch
- Smooth animation for modal open/close (Mantine default)
- Background is dimmed with overlay when modal is open
- Modal respects the application's dark/light mode setting (STORY-047) and adapts colors accordingly

## Rules

- rules/design-rules.md
- rules/react-rules.md
- rules/typescript-rules.md
- rules/clean-code.md
- rules/vite-rules.md

## Component Architecture

```typescript
// Main modal component
interface ResponseDetailModalProps {
  responseId: number | null; // null when closed
  opened: boolean;
  onClose: () => void;
}

// Question display component
interface QuestionDisplayProps {
  questionNumber: number;
  questionText: string;
  questionType: 'likert' | 'multi-select' | 'ranking' | 'open-ended';
  answer: LikertAnswer | MultiSelectAnswer | RankingAnswer | OpenEndedAnswer | null;
}

// Answer type interfaces (match backend DTO)
interface LikertAnswer {
  value: number; // 1-5
  label: string; // "Very Dissatisfied" | "Dissatisfied" | "Neutral" | "Satisfied" | "Very Satisfied"
}

interface MultiSelectAnswer {
  selectedOptions: string[];
}

interface RankingAnswer {
  rankedItems: string[];
}

interface OpenEndedAnswer {
  text: string;
}

// API response type (from backend)
interface ResponseDetailDto {
  id: number;
  submittedAt: string; // ISO 8601
  questions: QuestionAnswer[];
}

interface QuestionAnswer {
  questionNumber: number;
  questionText: string;
  questionType: 'likert' | 'multi-select' | 'ranking' | 'open-ended';
  answer: LikertAnswer | MultiSelectAnswer | RankingAnswer | OpenEndedAnswer | null;
}

// Component hierarchy
// AdminPage
//   └─ RecentResponsesTable (existing)
//        ├─ ResponseRow (add "View" button)
//        └─ ResponseDetailModal (new)
//             ├─ Modal (Mantine)
//             │   ├─ ModalHeader (ID, timestamp, close button)
//             │   └─ ModalBody (scrollable)
//             │        └─ QuestionDisplay[] (for each question)
//             │             ├─ LikertDisplay (star rating)
//             │             ├─ MultiSelectDisplay (bulleted list)
//             │             ├─ RankingDisplay (numbered list)
//             └─            └─ OpenEndedDisplay (quoted text)
```

## Extra Considerations

- **Accessibility - Focus management**: Use Mantine Modal's built-in focus trap and return focus to trigger element
- **Accessibility - Screen reader**: Ensure modal announces opening with proper ARIA attributes
- **Accessibility - Star ratings**: Provide text alternatives for star visualizations (e.g., "4 out of 5 stars")
- **Accessibility - Close button**: Ensure X button has accessible label "Close response details"
- **Performance**: Fetch response data only when modal opens (lazy loading)
- **Performance**: Consider caching fetched response data to avoid refetching if reopened
- **Error handling**: Display error state if API fetch fails
- **Loading state**: Show loading spinner while fetching response data
- **Dark mode support**: Ensure modal works with existing dark mode toggle (STORY-047)
- **Responsive design**: Modal should work on mobile screens (min-width: 375px)
- **Line breaks preservation**: Use `white-space: pre-wrap` for open-ended text to preserve formatting
- **Star rating visualization**: Use Unicode star characters (★ filled, ☆ empty) or icon library
- **Question ordering**: Display questions in exact order as defined in survey (Q1-Q19)
- **Empty state**: Handle edge case where response has no answered questions
- **Modal width**: Approximately 600px centered on desktop, full-width with padding on mobile

## Testing Considerations

- **Unit tests**: Test QuestionDisplay component renders correctly for each question type
- **Unit tests**: Test null answer cases render "No response"
- **Integration tests**: Test modal opens when "View" button clicked
- **Integration tests**: Test API call triggered on modal open
- **Integration tests**: Test all three close methods (X, overlay, Escape)
- **Accessibility tests**: Verify focus trap works (Tab key cycles within modal)
- **Accessibility tests**: Verify focus returns to trigger button on close
- **Accessibility tests**: Verify screen reader announcements
- **Manual testing**: Test keyboard navigation through all interactive elements
- **Manual testing**: Test with all 19 questions answered vs. partially answered
- **Manual testing**: Test on mobile viewport (375px)

## Implementation Notes

- **Mantine Modal component**: Use `<Modal>` from `@mantine/core` for overlay behavior
- **Modal configuration**:
  - `size="lg"` or custom width (~600px)
  - `centered={true}`
  - `scrollAreaComponent={ScrollArea.Autosize}` for internal scrolling
  - `trapFocus={true}` for accessibility
  - `returnFocus={true}` to restore focus on close
- **State management**: Use local component state for `opened` and `responseId`
- **Data fetching**: Use `useEffect` hook to fetch when modal opens, dependency on `responseId`
- **API integration**: Create or reuse admin API client function `getResponseDetail(id: number)`
- **Component structure**: Create separate `QuestionDisplay` component with type-specific rendering
- **Star rating**: Consider using Mantine's `<Rating>` component (read-only mode) or custom implementation
- **Styling**: Use Mantine's styling system (sx prop or createStyles)
- **Date formatting**: Use `Intl.DateTimeFormat` or date library for timestamp display
- **TypeScript strict mode**: Ensure proper type guards for answer types
- **Reusable components**: Create type-specific display components that can be reused if needed elsewhere
- **Recent Responses integration**: Modify existing Recent Responses table component to add "View" link

## Specification by Example

### Visual Layout Example

```
┌─────────────────────────────────────────────────┐
│  Response #42                               [✕] │
│  Submitted: Dec 2, 2025 2:34pm                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Q1: Overall Satisfaction                       │
│  ★★★★☆ (4 - Satisfied)                          │
│                                                 │
│  Q2: Session Quality                            │
│  ★★★★★ (5 - Very Satisfied)                     │
│                                                 │
│  Q3: Topics of Interest                         │
│  • AI/ML                                        │
│  • Cloud Architecture                           │
│  • DevOps Practices                             │
│                                                 │
│  Q4: Session Ranking                            │
│  1. Keynote                                     │
│  2. Workshop A                                  │
│  3. Panel Discussion                            │
│                                                 │
│  Q5: Additional Comments                        │
│  "Great conference! Would love more hands-on    │
│   workshops next year."                         │
│                                                 │
│  Q6: Venue Rating                               │
│  No response                                    │
│                                                 │
│  ... (remaining questions Q7-Q19)               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### User Interaction Flow

```gherkin
Feature: Response Detail Modal

Scenario: Open and view complete response
  Given the organizer is on the admin overview page
  And the Recent Responses table displays multiple responses
  When they click the "View" link on response #42
  Then a modal opens with smooth animation
  And the modal header shows "Response #42"
  And the modal header shows formatted timestamp "Dec 2, 2025 2:34pm"
  And the modal body shows all 19 questions in order
  And question 1 shows a star rating with label
  And question 3 shows a bulleted list of selections
  And question 5 shows quoted text with line breaks preserved
  And question 6 shows "No response" for unanswered question

Scenario: Close modal via X button
  Given the response modal is open
  When the organizer clicks the X button in the modal header
  Then the modal closes with smooth animation
  And focus returns to the "View" link that opened the modal

Scenario: Close modal via overlay click
  Given the response modal is open
  When the organizer clicks on the dimmed background (outside modal)
  Then the modal closes
  And focus returns to the "View" link

Scenario: Close modal via Escape key
  Given the response modal is open
  When the organizer presses the Escape key
  Then the modal closes
  And focus returns to the "View" link

Scenario: Keyboard navigation within modal
  Given the response modal is open
  When the organizer presses Tab key repeatedly
  Then focus cycles only between elements within the modal
  And focus never leaves the modal while it's open
  And focus can reach the close button

Scenario: Scroll long response
  Given the response modal is open for a response with all 19 questions answered
  When the modal content exceeds the viewport height
  Then the modal body scrolls internally
  And the header with ID and timestamp remains fixed at top
  And the organizer can scroll to view all questions

Scenario: Loading state during fetch
  Given the organizer is on the admin overview page
  When they click "View" on a response
  Then a loading spinner displays in the modal
  And the spinner disappears when data is loaded
  And the complete response displays within 500ms

Scenario: Error state on fetch failure
  Given the organizer is on the admin overview page
  When they click "View" on a response
  And the API request fails
  Then an error message displays in the modal
  And the error message provides helpful information
  And the organizer can close the modal and try again
```

## Verification

- [ ] "View" link added to each row in Recent Responses table
- [ ] Clicking "View" opens the response detail modal
- [ ] Modal header displays response ID and formatted timestamp
- [ ] All 19 questions display in correct order (Q1-Q19)
- [ ] Likert questions render as star rating with numeric value and label
- [ ] Multi-select questions render as bulleted list
- [ ] Ranking questions render as numbered list in correct order
- [ ] Open-ended questions render with preserved line breaks in quoted format
- [ ] Unanswered questions display "No response" in italic text
- [ ] Modal has fixed header with scrollable body when content is long
- [ ] Modal max-height is 80vh with internal scrolling
- [ ] X button closes modal and returns focus to trigger
- [ ] Clicking overlay closes modal and returns focus
- [ ] Pressing Escape key closes modal and returns focus
- [ ] Focus is trapped within modal while open (Tab cycles inside)
- [ ] Modal opens within 500ms including data fetch
- [ ] Loading spinner displays while fetching data
- [ ] Error message displays if API fetch fails
- [ ] Close button has accessible label for screen readers
- [ ] Screen reader announces modal opening
- [ ] Star ratings have text alternatives for accessibility
- [ ] Modal width is ~600px on desktop, full-width on mobile
- [ ] Modal works correctly in both light and dark mode
- [ ] Component uses TypeScript with proper type checking
- [ ] All interactive elements are keyboard accessible
- [ ] Unit tests cover question display for all types
- [ ] Integration tests cover modal open/close behavior
