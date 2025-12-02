import { Card, Title, Text, Textarea, Stack } from '@mantine/core';

interface OpenEndedQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function OpenEndedQuestion({
  id: _id,
  question,
  transparency,
  value,
  onChange,
  placeholder = 'Share your thoughts...',
}: OpenEndedQuestionProps) {
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