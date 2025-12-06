import { Card, Text, Stack, Skeleton } from '@mantine/core';

export interface MetricCardProps {
  label: string;
  value: number | null;
  loading?: boolean;
  ariaLabel?: string;
}

export function MetricCard({ label, value, loading = false, ariaLabel }: MetricCardProps) {
  if (loading) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="xs" align="center">
          <Skeleton height={48} width={80} />
          <Skeleton height={20} width={120} />
        </Stack>
      </Card>
    );
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      aria-label={ariaLabel || `${label} count`}
    >
      <Stack gap="xs" align="center">
        <Text size="48px" fw={700} c="#1795d4">
          {value ?? 0}
        </Text>
        <Text size="lg" fw={500} c="#2c3234">
          {label}
        </Text>
      </Stack>
    </Card>
  );
}
