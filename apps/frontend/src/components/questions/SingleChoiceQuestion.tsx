import { Card, Title, Text, Radio, Stack, Textarea } from '@mantine/core';

interface SingleChoiceQuestionProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  comment?: string;
  onCommentChange?: (comment: string) => void;
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
}: SingleChoiceQuestionProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3} size="h4">
          {question}
        </Title>

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