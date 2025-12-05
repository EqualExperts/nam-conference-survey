# NAM Conference Survey - Design System

**Version**: 1.0
**Last Updated**: 2025-11-18
**UI Framework**: Mantine UI v7 + Equal Experts Branding

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Mantine Theme Configuration](#mantine-theme-configuration)
3. [Component Library](#component-library)
4. [Typography](#typography)
5. [Color System](#color-system)
6. [Spacing & Layout](#spacing--layout)
7. [Accessibility](#accessibility)
8. [Responsive Design](#responsive-design)
9. [Question Component Patterns](#question-component-patterns)
10. [Page Layouts](#page-layouts)

---

## Brand Identity

### Equal Experts Visual Identity

**Source**: https://www.equalexperts.com

**Brand Characteristics**:
- Modern, minimalist, professional
- Clean typography hierarchy
- Generous whitespace
- Card-based layouts
- Emphasis on readability and trust

**Logo**:
```
URL: https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg
Usage: Header (desktop + mobile), acknowledgment page
Size: 180px width (desktop), 120px width (mobile)
```

---

## Mantine Theme Configuration

### Installation
```bash
pnpm add @mantine/core @mantine/hooks @mantine/form @emotion/react
```

### Theme Setup (`apps/frontend/src/theme/theme.ts`)

```typescript
import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  // Primary color: Equal Experts Blue
  primaryColor: 'equalBlue',

  colors: {
    // Custom Equal Experts color palette
    equalBlue: [
      '#e6f5fc', // 0 - lightest
      '#b3e0f5', // 1
      '#80cbee', // 2
      '#4db5e6', // 3
      '#1795d4', // 4 - PRIMARY (Equal Experts blue)
      '#1377aa', // 5 - darker
      '#0f5980', // 6
      '#0b3b56', // 7
      '#071d2b', // 8
      '#030e15', // 9 - darkest
    ],
    equalNavy: [
      '#e8f0f5', // 0
      '#c4d8e6', // 1
      '#9fc0d7', // 2
      '#7ba8c8', // 3
      '#5690b9', // 4
      '#22567c', // 5 - PRIMARY (Equal Experts navy)
      '#1b4563', // 6
      '#14334a', // 7
      '#0d2231', // 8
      '#061118', // 9
    ],
    equalCharcoal: [
      '#e9eaea', // 0
      '#c8c9ca', // 1
      '#a7a9aa', // 2
      '#86888a', // 3
      '#65686a', // 4
      '#2c3234', // 5 - PRIMARY (Equal Experts charcoal)
      '#23282a', // 6
      '#1a1e1f', // 7
      '#121415', // 8
      '#090a0a', // 9
    ],
  },

  // Typography
  fontFamily: 'Lexend, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',

  headings: {
    fontFamily: 'Lexend, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '500',
    sizes: {
      h1: { fontSize: '44px', lineHeight: '1.25', fontWeight: '500' },
      h2: { fontSize: '36px', lineHeight: '1.3', fontWeight: '500' },
      h3: { fontSize: '28px', lineHeight: '1.35', fontWeight: '500' },
      h4: { fontSize: '24px', lineHeight: '1.4', fontWeight: '500' },
      h5: { fontSize: '20px', lineHeight: '1.5', fontWeight: '500' },
      h6: { fontSize: '18px', lineHeight: '1.5', fontWeight: '500' },
    },
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },

  // Spacing
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // Border radius
  radius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  // Shadows
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },

  // Component defaults
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: (theme) => ({
        root: {
          fontWeight: 500,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows.md,
          },
        },
      }),
    },

    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },

    Textarea: {
      defaultProps: {
        radius: 'md',
        minRows: 3,
      },
    },

    Radio: {
      styles: (theme) => ({
        radio: {
          cursor: 'pointer',
          '&:checked': {
            backgroundColor: theme.colors.equalBlue[4],
            borderColor: theme.colors.equalBlue[4],
          },
        },
        label: {
          cursor: 'pointer',
          fontSize: theme.fontSizes.md,
        },
      }),
    },

    Checkbox: {
      styles: (theme) => ({
        input: {
          cursor: 'pointer',
          '&:checked': {
            backgroundColor: theme.colors.equalBlue[4],
            borderColor: theme.colors.equalBlue[4],
          },
        },
        label: {
          cursor: 'pointer',
        },
      }),
    },

    Card: {
      defaultProps: {
        shadow: 'sm',
        padding: 'lg',
        radius: 'md',
      },
      styles: {
        root: {
          border: '1px solid #e0e0e0',
        },
      },
    },

    Progress: {
      styles: (theme) => ({
        bar: {
          backgroundColor: theme.colors.equalBlue[4],
        },
      }),
    },
  },

  // Global styles
  globalStyles: (theme) => ({
    body: {
      backgroundColor: '#f5f5f5',
      color: theme.colors.equalCharcoal[5],
      fontSize: '18px',
      lineHeight: '32px',
    },

    a: {
      color: theme.colors.equalBlue[4],
      textDecoration: 'none',
      transition: 'color 0.3s ease-in-out',
      '&:hover': {
        color: theme.colors.equalNavy[5],
      },
    },
  }),
};
```

### Theme Provider Setup (`apps/frontend/src/App.tsx`)

```typescript
import { MantineProvider } from '@mantine/core';
import { theme } from './theme/theme';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app */}
    </MantineProvider>
  );
}
```

---

## Component Library

### Button Variants

```typescript
import { Button } from '@mantine/core';

// Primary action (submit survey, login)
<Button variant="filled" color="equalBlue">
  Submit Survey
</Button>

// Secondary action (back, cancel)
<Button variant="outline" color="equalNavy">
  Go Back
</Button>

// Tertiary action (skip, optional)
<Button variant="subtle" color="gray">
  Skip Question
</Button>
```

### Card Pattern

```typescript
import { Card, Text } from '@mantine/core';

<Card shadow="sm" padding="lg" radius="md" withBorder>
  <Text fw={500} size="lg" mb="md">
    Question Title
  </Text>
  <Text size="sm" c="dimmed" mb="lg">
    Transparency note explaining data usage
  </Text>
  {/* Question inputs */}
</Card>
```

### Progress Indicator

```typescript
import { Progress, Text, Group } from '@mantine/core';

<Group justify="space-between" mb="md">
  <Text size="sm" c="dimmed">
    Question {currentQuestion} of 19
  </Text>
  <Text size="sm" c="dimmed">
    {Math.round((currentQuestion / 19) * 100)}% complete
  </Text>
</Group>
<Progress value={(currentQuestion / 19) * 100} size="sm" radius="xl" />
```

---

## Typography

### Hierarchy

**H1 - Page Titles**
```typescript
<Title order={1}>NAM Conference Feedback</Title>
// 44px, Lexend Medium (500), #2c3234
```

**H2 - Section Titles**
```typescript
<Title order={2}>Overall Experience</Title>
// 36px, Lexend Medium (500), #2c3234
```

**H3 - Question Titles**
```typescript
<Title order={3}>How would you rate the networking opportunities?</Title>
// 28px, Lexend Medium (500), #2c3234
```

**Body - Regular Text**
```typescript
<Text size="lg">
  This helps us understand what connection types matter most.
</Text>
// 18px, Lexend Regular (400), #2c3234
```

**Small - Transparency Notes**
```typescript
<Text size="sm" c="dimmed">
  Your feedback helps us improve future conferences.
</Text>
// 14px, Lexend Regular (400), #6B7280 (gray)
```

### Font Loading (`apps/frontend/index.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## Color System

### Primary Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Equal Blue** | `#1795d4` | Primary buttons, links, active states |
| **Equal Navy** | `#22567c` | Secondary buttons, headings, accents |
| **Equal Charcoal** | `#2c3234` | Body text, headers, footers |
| **Light Gray** | `#f5f5f5` | Page background, section backgrounds |
| **White** | `#ffffff` | Card backgrounds, input backgrounds |

### Semantic Colors

| Purpose | Color | Hex |
|---------|-------|-----|
| **Success** | Green | `#10b981` (Mantine default) |
| **Error** | Red | `#ef4444` (Mantine default) |
| **Warning** | Yellow | `#f59e0b` (Mantine default) |
| **Info** | Blue | `#1795d4` (Equal Blue) |
| **Disabled** | Gray | `#9ca3af` |

### Text Colors

```typescript
// Primary text
<Text c="equalCharcoal.5">Main content</Text>

// Secondary text (transparency notes)
<Text c="dimmed">Supporting information</Text>

// Link text
<Text c="equalBlue.4" component="a">Learn more</Text>

// Error text
<Text c="red">Please select at least one option</Text>
```

---

## Spacing & Layout

### Grid System

```typescript
import { Container, Grid } from '@mantine/core';

<Container size="lg"> {/* Max width: 1200px */}
  <Grid gutter="lg">
    <Grid.Col span={{ base: 12, md: 6 }}>
      {/* 12 columns on mobile, 6 on desktop */}
    </Grid.Col>
  </Grid>
</Container>
```

### Responsive Breakpoints

| Breakpoint | Size | Usage |
|------------|------|-------|
| `xs` | 375px | Small phones |
| `sm` | 640px | Phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |

### Spacing Scale

```typescript
// Consistent spacing using Mantine theme
<Stack gap="xs">  // 8px
<Stack gap="sm">  // 12px
<Stack gap="md">  // 16px (default)
<Stack gap="lg">  // 24px
<Stack gap="xl">  // 32px
```

### Container Sizes

```typescript
// Survey pages (readable width for questions)
<Container size="md"> {/* Max width: 800px */}

// Admin dashboard (wide tables)
<Container size="xl"> {/* Max width: 1400px */}

// Full width
<Container size="fluid"> {/* 100% width */}
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast**:
- Text: 4.5:1 minimum
- Large text (24px+): 3:1 minimum
- Equal Blue (#1795d4) on white: 3.6:1 ✓ (large text only)
- Equal Charcoal (#2c3234) on white: 13.5:1 ✓ (all text)

**Keyboard Navigation**:
```typescript
// All interactive elements focusable
<Button tabIndex={0}>Submit</Button>

// Skip to main content
<a href="#main-content" className="sr-only">
  Skip to main content
</a>
```

**Screen Reader Support**:
```typescript
import { VisuallyHidden } from '@mantine/core';

<Radio.Group
  label="Overall conference rating"
  description="Rate from 1 (poor) to 5 (excellent)"
  aria-required="false"
>
  <Radio value="1" label="1 - Strongly Disagree" />
  <Radio value="2" label="2 - Disagree" />
  // ...
</Radio.Group>

// Hidden but read by screen readers
<VisuallyHidden>
  Question 5 of 19
</VisuallyHidden>
```

**Focus Indicators**:
```typescript
// Mantine provides default focus styles
// Custom override if needed:
{
  '&:focus': {
    outline: '2px solid #1795d4',
    outlineOffset: '2px',
  }
}
```

---

## Responsive Design

### Mobile-First Approach

**Breakpoint Strategy**:
1. Design for 375px width first (iPhone SE)
2. Scale up to tablet (768px)
3. Optimize for desktop (1024px+)

**Example: Question Card**

```typescript
import { Card, Stack, Radio } from '@mantine/core';

<Card
  shadow="sm"
  padding={{ base: 'md', sm: 'lg' }}  // 16px mobile, 24px tablet+
  radius="md"
>
  <Stack gap="md">
    <Title
      order={3}
      size={{ base: 'h4', sm: 'h3' }}  // Smaller on mobile
    >
      Question Text
    </Title>

    <Radio.Group
      orientation={{ base: 'vertical', sm: 'horizontal' }}  // Stack on mobile
    >
      <Radio value="1" label="Option 1" />
      <Radio value="2" label="Option 2" />
    </Radio.Group>
  </Stack>
</Card>
```

### Touch-Friendly Targets

**Minimum touch target**: 44x44px (Apple HIG, WCAG)

```typescript
<Button
  h={44}  // Minimum height
  px="lg" // Padding for wider touch area
>
  Next Question
</Button>

<Radio
  size="md"  // 24px input + 16px padding = 40px (close to 44px)
  styles={{
    radio: { minWidth: 24, minHeight: 24 },
    label: { padding: '10px' },  // Extra padding for touch
  }}
/>
```

### Responsive Typography

```typescript
<Title
  order={1}
  size={{ base: '25px', sm: '36px', md: '44px' }}  // Scale up
>
  Welcome to the Survey
</Title>

<Text
  size={{ base: 'md', sm: 'lg' }}  // 16px mobile, 18px desktop
  lh={{ base: 1.6, sm: 1.78 }}     // Line height adjusts
>
  Body text that's readable on all devices
</Text>
```

---

## Question Component Patterns

### 1. Likert Scale Question

```typescript
import { Card, Title, Text, Radio, Stack, Group } from '@mantine/core';

interface LikertQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: string | null;
  onChange: (value: string) => void;
  hasNA?: boolean;
}

export function LikertQuestion({
  id,
  question,
  transparency,
  value,
  onChange,
  hasNA = false,
}: LikertQuestionProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3} size="h4">
          {question}
        </Title>

        <Text size="sm" c="dimmed">
          {transparency}
        </Text>

        <Radio.Group
          value={value || ''}
          onChange={onChange}
          name={id}
        >
          <Stack gap="sm">
            <Radio value="1" label="1 - Strongly Disagree" />
            <Radio value="2" label="2 - Disagree" />
            <Radio value="3" label="3 - Neutral" />
            <Radio value="4" label="4 - Agree" />
            <Radio value="5" label="5 - Strongly Agree" />
            {hasNA && <Radio value="na" label="N/A" />}
          </Stack>
        </Radio.Group>
      </Stack>
    </Card>
  );
}
```

**Mobile Optimization**:
- Vertical stack of radio buttons (easier to tap)
- Large labels (18px minimum)
- Spacing between options (12px gap)

### 2. Multiple Select Question

```typescript
import { Card, Title, Text, Checkbox, Stack } from '@mantine/core';

interface MultipleSelectProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
}

export function MultipleSelectQuestion({
  id,
  question,
  transparency,
  options,
  values,
  onChange,
}: MultipleSelectProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3} size="h4">
          {question}
        </Title>

        <Text size="sm" c="dimmed">
          {transparency}
        </Text>

        <Checkbox.Group value={values} onChange={onChange}>
          <Stack gap="sm">
            {options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </Stack>
        </Checkbox.Group>
      </Stack>
    </Card>
  );
}
```

### 3. Choice Ranking Question

```typescript
import { Card, Title, Text, Stack, Select } from '@mantine/core';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface RankingQuestionProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  rankings: Record<string, number>;  // { optionValue: rank }
  onChange: (rankings: Record<string, number>) => void;
}

export function RankingQuestion({
  id,
  question,
  transparency,
  options,
  rankings,
  onChange,
}: RankingQuestionProps) {
  // Implementation using @dnd-kit for drag-and-drop
  // OR dropdown selects (1-4) for mobile fallback

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3} size="h4">
          {question}
        </Title>

        <Text size="sm" c="dimmed">
          {transparency}
        </Text>

        {/* Mobile: Dropdown approach */}
        <Stack gap="sm">
          {options.map((option) => (
            <Group key={option.value} gap="md">
              <Select
                label={option.label}
                data={['1', '2', '3', '4']}
                value={rankings[option.value]?.toString() || ''}
                onChange={(rank) => {
                  onChange({
                    ...rankings,
                    [option.value]: parseInt(rank || '0'),
                  });
                }}
                style={{ flex: 1 }}
              />
            </Group>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
```

### 4. Open-Ended Question

```typescript
import { Card, Title, Text, Textarea, Stack } from '@mantine/core';

interface OpenEndedProps {
  id: string;
  question: string;
  transparency: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function OpenEndedQuestion({
  id,
  question,
  transparency,
  value,
  onChange,
  placeholder = 'Share your thoughts...',
}: OpenEndedProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3} size="h4">
          {question}
        </Title>

        <Text size="sm" c="dimmed">
          {transparency}
        </Text>

        <Textarea
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder={placeholder}
          minRows={4}
          autosize
          maxRows={8}
        />
      </Stack>
    </Card>
  );
}
```

### 5. Optional Comment Box

```typescript
import { Textarea, Text } from '@mantine/core';

interface CommentBoxProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function CommentBox({
  value,
  onChange,
  label = 'Additional comments (optional)',
}: CommentBoxProps) {
  return (
    <>
      <Text size="sm" c="dimmed" mt="md">
        {label}
      </Text>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Share any additional thoughts..."
        minRows={2}
        autosize
        maxRows={4}
      />
    </>
  );
}
```

---

## Page Layouts

### Survey Page Layout

```typescript
import { AppShell, Container, Stack, Group, Button, Image } from '@mantine/core';

export function SurveyLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 80 }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" px="md" justify="space-between">
            <Image
              src="https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg"
              alt="Equal Experts"
              h={40}
              w="auto"
            />
            <Button variant="subtle" onClick={logout}>
              Logout
            </Button>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main style={{ backgroundColor: '#f5f5f5' }}>
        <Container size="md" py="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
```

### Admin Dashboard Layout

```typescript
import { AppShell, Container, NavLink } from '@mantine/core';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 250, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        {/* Same as survey header */}
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Dashboard" href="/admin" />
        <NavLink label="Responses" href="/admin/responses" />
        <NavLink label="Export CSV" href="/admin/export" />
        <NavLink label="Users" href="/admin/users" />
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: '#f5f5f5' }}>
        <Container size="xl" py="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
```

### Acknowledgment Page

```typescript
import { Container, Stack, Title, Text, Button, Image, Card } from '@mantine/core';

export function ThanksPage() {
  return (
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
  );
}
```

---

## Animation & Transitions

### Smooth Transitions

```typescript
// Button hover
transition: 'all 0.3s ease-in-out'

// Page transitions (React Router)
import { CSSTransition } from 'react-transition-group';

<CSSTransition
  in={show}
  timeout={300}
  classNames="fade"
  unmountOnExit
>
  <Component />
</CSSTransition>

// CSS
.fade-enter { opacity: 0; }
.fade-enter-active { opacity: 1; transition: opacity 300ms; }
.fade-exit { opacity: 1; }
.fade-exit-active { opacity: 0; transition: opacity 300ms; }
```

---

## Loading States

```typescript
import { Loader, Center, Stack, Text } from '@mantine/core';

export function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <Center h={400}>
      <Stack align="center" gap="md">
        <Loader color="equalBlue" size="lg" />
        <Text size="sm" c="dimmed">{message}</Text>
      </Stack>
    </Center>
  );
}
```

---

## Error States

```typescript
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      title="Error"
      color="red"
      variant="filled"
    >
      {message}
    </Alert>
  );
}
```

---

## Design Tokens Export

```typescript
// apps/frontend/src/theme/tokens.ts
export const tokens = {
  colors: {
    primary: '#1795d4',
    secondary: '#22567c',
    charcoal: '#2c3234',
    lightGray: '#f5f5f5',
    white: '#ffffff',
  },

  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },

  breakpoints: {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },

  typography: {
    fontFamily: 'Lexend, sans-serif',
    h1: { size: 44, lineHeight: 1.25, weight: 500 },
    h2: { size: 36, lineHeight: 1.3, weight: 500 },
    h3: { size: 28, lineHeight: 1.35, weight: 500 },
    body: { size: 18, lineHeight: 1.78, weight: 400 },
  },
} as const;
```

---

## Implementation Checklist

- [ ] Install Mantine UI and dependencies
- [ ] Load Lexend font from Google Fonts
- [ ] Configure custom theme with Equal Experts colors
- [ ] Set up MantineProvider in App.tsx
- [ ] Create component library (buttons, cards, inputs)
- [ ] Build question component patterns (Likert, multiple select, etc.)
- [ ] Implement responsive layouts (survey, admin, acknowledgment)
- [ ] Test accessibility (keyboard nav, screen reader, color contrast)
- [ ] Optimize for mobile (touch targets, responsive typography)
- [ ] Add loading and error states

---

## Future Enhancements

- Dark mode (Mantine supports out-of-the-box)
- Animation library (Framer Motion)
- Advanced data visualization (Chart.js or Recharts for admin dashboard)
- Micro-interactions (button clicks, form submissions)

---

**Design System Owner**: Frontend Team
**Last Updated**: 2025-11-18
