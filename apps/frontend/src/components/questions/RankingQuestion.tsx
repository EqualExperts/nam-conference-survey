import { Card, Title, Text, Stack, Select } from '@mantine/core';

interface RankingQuestionProps {
  id: string;
  question: string;
  transparency: string;
  options: { value: string; label: string }[];
  rankings: Record<string, number>;
  onChange: (rankings: Record<string, number>) => void;
  questionNumber?: number;
  totalQuestions?: number;
}

export function RankingQuestion({
  id: _id,
  question,
  transparency,
  options,
  rankings,
  onChange,
  questionNumber,
  totalQuestions,
}: RankingQuestionProps) {
  const rankOptions = ['1', '2', '3', '4'];

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

        <Text size="sm" fw={500}>
          Rank each option from 1 (most valuable) to 4 (least valuable)
        </Text>

        <Stack gap="sm">
          {options.map((option) => (
            <Select
              key={option.value}
              label={option.label}
              placeholder="Select rank"
              data={rankOptions}
              value={rankings[option.value]?.toString() || ''}
              onChange={(rank) => {
                onChange({
                  ...rankings,
                  [option.value]: rank ? parseInt(rank) : 0,
                });
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}