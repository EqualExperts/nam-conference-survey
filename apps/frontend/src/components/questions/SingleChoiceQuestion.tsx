import { Card, Title, Text, Radio, Stack, Textarea, Group } from '@mantine/core';
import { QuestionNumber } from '../QuestionNumber';

interface SingleChoiceQuestionProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  comment?: string;
  onCommentChange?: (comment: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function SingleChoiceQuestion({
  id,
  question,
  transparency,
  options,
  value,
  onChange,
  comment,
  onCommentChange,
  questionNumber,
  totalQuestions,
}: SingleChoiceQuestionProps) {
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

        <Radio.Group value={value} onChange={onChange} name={id}>
          <Stack gap="sm">
            {options.map((option) => (
              <Radio key={option.value} value={option.value} label={option.label} />
            ))}
          </Stack>
        </Radio.Group>

        {onCommentChange && (
          <Textarea
            label="Additional comments (optional)"
            value={comment || ''}
            onChange={(e) => onCommentChange(e.currentTarget.value)}
            placeholder="Share any additional thoughts..."
            minRows={2}
            autosize
          />
        )}
      </Stack>
    </Card>
  );
}