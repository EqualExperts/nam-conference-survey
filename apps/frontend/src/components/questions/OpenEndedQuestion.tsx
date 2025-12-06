import { Card, Title, Text, Textarea, Stack, Group } from '@mantine/core';
import { useMemo } from 'react';

interface OpenEndedQuestionProps {
  id: string;
  question: string;
  transparency: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function OpenEndedQuestion({
  id: _id,
  question,
  transparency,
  value,
  onChange,
  placeholder = 'Share your thoughts...',
  maxLength,
}: OpenEndedQuestionProps) {
  const charCount = value.length;
  const remaining = maxLength ? maxLength - charCount : null;

  // Determine visual state for character counter
  const counterState = useMemo(() => {
    if (!maxLength || remaining === null) return null;

    if (remaining < 0) {
      return {
        color: 'red.7',
        message: 'error',
      };
    }

    // Warning threshold at 90%
    const warningThreshold = Math.floor(maxLength * 0.9);
    if (charCount >= warningThreshold) {
      return {
        color: 'yellow.7',
        message: 'warning',
      };
    }

    return {
      color: 'dimmed',
      message: 'normal',
    };
  }, [maxLength, remaining, charCount]);

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
          error={maxLength && remaining !== null && remaining < 0 ?
            'Please reduce your comment to 250 characters or fewer' : undefined}
        />

        {maxLength && (
          <Group justify="space-between" gap="xs">
            <Text
              size="sm"
              c={counterState?.color}
              fw={counterState?.message === 'error' ? 600 : 400}
              aria-live="polite"
              aria-atomic="true"
            >
              {remaining !== null && remaining >= 0
                ? `${remaining} characters remaining (${charCount} / ${maxLength})`
                : `${Math.abs(remaining!)} characters over limit (${charCount} / ${maxLength})`}
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
}