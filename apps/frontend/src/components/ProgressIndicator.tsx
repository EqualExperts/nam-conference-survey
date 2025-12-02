import { Progress, Text, Group, Stack } from '@mantine/core';

interface ProgressIndicatorProps {
  answered: number;
  total: number;
}

export function ProgressIndicator({ answered, total }: ProgressIndicatorProps) {
  const percentage = Math.round((answered / total) * 100);

  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          Questions answered: {answered} of {total}
        </Text>
        <Text size="sm" c="dimmed" fw={500}>
          {percentage}% complete
        </Text>
      </Group>
      <Progress value={percentage} size="sm" radius="xl" color="equalBlue" />
    </Stack>
  );
}