import { Card, Title, Text, Radio, Stack, Textarea, Group } from '@mantine/core';
import { QuestionNumber } from '../QuestionNumber';

interface LikertOption {
  value: string;
  label: string;
}

interface LikertWithNAQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: string | null;
  onChange: (value: string | null) => void;
  readonly options?: readonly LikertOption[];
  naLabel?: string;
  comment?: string;
  onCommentChange?: (comment: string) => void;
  commentPlaceholder?: string;
  commentLabel?: string;
  questionNumber: number;
  totalQuestions: number;
}

const DEFAULT_OPTIONS: LikertOption[] = [
  { value: '5', label: '5 - Strongly Agree' },
  { value: '4', label: '4 - Agree' },
  { value: '3', label: '3 - Neutral' },
  { value: '2', label: '2 - Disagree' },
  { value: '1', label: '1 - Strongly Disagree' },
];

export function LikertWithNAQuestion({
  id,
  question,
  transparency,
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  naLabel = 'Not Applicable',
  comment,
  onCommentChange,
  commentPlaceholder = 'Share any additional thoughts...',
  commentLabel = 'Additional comments (optional)',
  questionNumber,
  totalQuestions,
}: LikertWithNAQuestionProps) {
  // Combine provided options with N/A option
  const allOptions = [...options, { value: 'NA', label: naLabel }];
  const ariaLabel = `Question ${questionNumber} of ${totalQuestions}: ${question}`;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group gap="md" align="flex-start" wrap="nowrap" visibleFrom="xs">
          <QuestionNumber current={questionNumber} total={totalQuestions} />
          <Title order={3} size="h4" style={{ flex: 1 }} aria-label={ariaLabel}>
            {question}
          </Title>
        </Group>

        <Stack gap={4} hiddenFrom="xs">
          <QuestionNumber current={questionNumber} total={totalQuestions} />
          <Title order={3} size="h4" aria-label={ariaLabel}>
            {question}
          </Title>
        </Stack>

        <Text size="sm" c="dimmed">
          {transparency}
        </Text>

        <Radio.Group
          value={value || ''}
          onChange={onChange}
          name={id}
        >
          <Stack gap="sm">
            {allOptions.map((option) => (
              <Radio key={option.value} value={option.value} label={option.label} />
            ))}
          </Stack>
        </Radio.Group>

        {onCommentChange && (
          <Textarea
            label={commentLabel}
            value={comment || ''}
            onChange={(e) => onCommentChange(e.currentTarget.value)}
            placeholder={commentPlaceholder}
            minRows={2}
            autosize
          />
        )}
      </Stack>
    </Card>
  );
}
