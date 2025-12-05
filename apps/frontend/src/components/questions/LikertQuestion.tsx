import { Card, Title, Text, Radio, Stack, Textarea } from '@mantine/core';

interface LikertOption {
  value: string;
  label: string;
}

interface LikertQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: number | null;
  onChange: (value: number | null) => void;
  readonly options?: readonly LikertOption[];
  comment?: string;
  onCommentChange?: (comment: string) => void;
  commentPlaceholder?: string;
}

const DEFAULT_OPTIONS: LikertOption[] = [
  { value: '5', label: '5 - Strongly Agree' },
  { value: '4', label: '4 - Agree' },
  { value: '3', label: '3 - Neutral' },
  { value: '2', label: '2 - Disagree' },
  { value: '1', label: '1 - Strongly Disagree' },
];

export function LikertQuestion({
  id,
  question,
  transparency,
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  comment,
  onCommentChange,
  commentPlaceholder = 'Share any additional thoughts...',
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
          value={value?.toString() || ''}
          onChange={(val) => onChange(val ? parseInt(val) : null)}
          name={id}
        >
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
            placeholder={commentPlaceholder}
            minRows={2}
            autosize
          />
        )}
      </Stack>
    </Card>
  );
}
