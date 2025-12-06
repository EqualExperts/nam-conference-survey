import { Card, Title, Text, Checkbox, Stack, TextInput, Textarea, Group } from '@mantine/core';
import { useMemo } from 'react';

interface MultipleSelectQuestionProps {
  id: string;
  question: string;
  transparency: string;
  readonly options: readonly { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  otherMaxLength?: number;
  comment?: string;
  onCommentChange?: (comment: string) => void;
  commentPlaceholder?: string;
  commentMaxLength?: number;
  questionNumber?: number;
  totalQuestions?: number;
}

export function MultipleSelectQuestion({
  id: _id,
  question,
  transparency,
  options,
  values,
  onChange,
  otherValue,
  onOtherChange,
  otherMaxLength,
  comment,
  onCommentChange,
  commentPlaceholder = 'Share any additional thoughts...',
  commentMaxLength,
  questionNumber,
  totalQuestions,
}: MultipleSelectQuestionProps) {
  const otherCharCount = otherValue?.length || 0;
  const otherRemaining = otherMaxLength ? otherMaxLength - otherCharCount : null;

  const commentCharCount = comment?.length || 0;
  const commentRemaining = commentMaxLength ? commentMaxLength - commentCharCount : null;

  // Determine visual state for other field counter
  const otherCounterState = useMemo(() => {
    if (!otherMaxLength || otherRemaining === null) return null;

    if (otherRemaining < 0) {
      return {
        color: 'red.7',
        message: 'error',
      };
    }

    const warningThreshold = Math.floor(otherMaxLength * 0.9);
    if (otherCharCount >= warningThreshold) {
      return {
        color: 'yellow.7',
        message: 'warning',
      };
    }

    return {
      color: 'dimmed',
      message: 'normal',
    };
  }, [otherMaxLength, otherRemaining, otherCharCount]);

  // Determine visual state for comment counter
  const commentCounterState = useMemo(() => {
    if (!commentMaxLength || commentRemaining === null) return null;

    if (commentRemaining < 0) {
      return {
        color: 'red.7',
        message: 'error',
      };
    }

    const warningThreshold = Math.floor(commentMaxLength * 0.9);
    if (commentCharCount >= warningThreshold) {
      return {
        color: 'yellow.7',
        message: 'warning',
      };
    }

    return {
      color: 'dimmed',
      message: 'normal',
    };
  }, [commentMaxLength, commentRemaining, commentCharCount]);

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

        {onOtherChange && (
          <>
            <TextInput
              label="Other (please specify)"
              value={otherValue || ''}
              onChange={(e) => onOtherChange(e.currentTarget.value)}
              placeholder="Please specify..."
              error={otherMaxLength && otherRemaining !== null && otherRemaining < 0 ?
                `Please reduce to ${otherMaxLength} characters or fewer` : undefined}
            />
            {otherMaxLength && (
              <Group justify="space-between" gap="xs">
                <Text
                  size="sm"
                  c={otherCounterState?.color}
                  fw={otherCounterState?.message === 'error' ? 600 : 400}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {otherRemaining !== null && otherRemaining >= 0
                    ? `${otherRemaining} characters remaining (${otherCharCount} / ${otherMaxLength})`
                    : `${Math.abs(otherRemaining!)} characters over limit (${otherCharCount} / ${otherMaxLength})`}
                </Text>
              </Group>
            )}
          </>
        )}

        {onCommentChange && (
          <>
            <Textarea
              label="Additional comments (optional)"
              value={comment || ''}
              onChange={(e) => onCommentChange(e.currentTarget.value)}
              placeholder={commentPlaceholder}
              minRows={2}
              autosize
              error={commentMaxLength && commentRemaining !== null && commentRemaining < 0 ?
                `Please reduce your comment to ${commentMaxLength} characters or fewer` : undefined}
            />
            {commentMaxLength && (
              <Group justify="space-between" gap="xs">
                <Text
                  size="sm"
                  c={commentCounterState?.color}
                  fw={commentCounterState?.message === 'error' ? 600 : 400}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {commentRemaining !== null && commentRemaining >= 0
                    ? `${commentRemaining} characters remaining (${commentCharCount} / ${commentMaxLength})`
                    : `${Math.abs(commentRemaining!)} characters over limit (${commentCharCount} / ${commentMaxLength})`}
                </Text>
              </Group>
            )}
          </>
        )}
      </Stack>
    </Card>
  );
}
