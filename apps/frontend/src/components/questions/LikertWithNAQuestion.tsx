import { Card, Title, Text, Radio, Stack, Textarea } from '@mantine/core';

interface LikertWithNAQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: string | null;
  onChange: (value: string | null) => void;
  comment?: string;
  onCommentChange?: (comment: string) => void;
}

export function LikertWithNAQuestion({
  id,
  question,
  transparency,
  value,
  onChange,
  comment,
  onCommentChange,
}: LikertWithNAQuestionProps) {
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
            <Radio value="NA" label="Not Applicable" />
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