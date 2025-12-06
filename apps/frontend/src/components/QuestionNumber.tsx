import { Text } from '@mantine/core';

interface QuestionNumberProps {
  current: number;
  total: number;
}

export function QuestionNumber({ current, total }: QuestionNumberProps) {
  return (
    <Text
      component="span"
      size="sm"
      c="dimmed"
      fw={400}
      style={{ whiteSpace: 'nowrap' }}
    >
      Question {current} of {total}
    </Text>
  );
}
