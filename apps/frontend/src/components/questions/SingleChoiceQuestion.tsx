import { Card, Title, Text, Radio, Stack, Textarea, Group } from '@mantine/core';
import { useMemo } from 'react';

interface SingleChoiceQuestionProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  comment?: string;
  onCommentChange?: (comment: string) => void;
  commentMaxLength?: number;
  questionNumber?: number;
  totalQuestions?: number;
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
  commentMaxLength,
  questionNumber,
  totalQuestions,
}: SingleChoiceQuestionProps) {
  const charCount = comment?.length || 0;
  const remaining = commentMaxLength ? commentMaxLength - charCount : null;

  // Determine visual state for character counter
  const counterState = useMemo(() => {
    if (!commentMaxLength || remaining === null) return null;

    if (remaining < 0) {
      return {
        color: 'red.7',
        message: 'error',
      };
    }

    // Warning threshold at 90%
    const warningThreshold = Math.floor(commentMaxLength * 0.9);
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
  }, [commentMaxLength, remaining, charCount]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        {questionNumber && totalQuestions && (
          <Text size="xs" c="dimmed" fw={500}>
            Question {questionNumber} of {totalQuestions}
          </Text>
        )}
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
          <>
            <Textarea
              label="Additional comments (optional)"
              value={comment || ''}
              onChange={(e) => onCommentChange(e.currentTarget.value)}
              placeholder="Share any additional thoughts..."
              minRows={2}
              autosize
              error={commentMaxLength && remaining !== null && remaining < 0 ?
                `Please reduce your comment to ${commentMaxLength} characters or fewer` : undefined}
            />
            {commentMaxLength && (
              <Group justify="space-between" gap="xs">
                <Text
                  size="sm"
                  c={counterState?.color}
                  fw={counterState?.message === 'error' ? 600 : 400}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {remaining !== null && remaining >= 0
                    ? `${remaining} characters remaining (${charCount} / ${commentMaxLength})`
                    : `${Math.abs(remaining!)} characters over limit (${charCount} / ${commentMaxLength})`}
                </Text>
              </Group>
            )}
          </>
        )}
      </Stack>
    </Card>
  );
}