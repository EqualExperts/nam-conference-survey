import { Progress, Text, Group, Stack } from '@mantine/core';
import { useLanguage } from '../contexts/LanguageContext';
import { uiTranslations } from '../translations/ui';

interface ProgressIndicatorProps {
  answered: number;
  total: number;
}

export function ProgressIndicator({ answered, total }: ProgressIndicatorProps) {
  const { language } = useLanguage();
  const t = uiTranslations[language];
  const percentage = Math.round((answered / total) * 100);

  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          {t.progress.questionsAnswered}: {answered} {t.progress.of} {total}
        </Text>
        <Text size="sm" c="dimmed" fw={500}>
          {percentage}% {t.progress.complete}
        </Text>
      </Group>
      <Progress value={percentage} size="sm" radius="xl" color="equalBlue" />
    </Stack>
  );
}