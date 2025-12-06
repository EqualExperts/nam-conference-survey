import { Button, Group } from '@mantine/core';
import { useLanguage } from '../contexts/LanguageContext';
import { uiTranslations } from '../translations/ui';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const t = uiTranslations[language];

  return (
    <Group gap="xs">
      <Button
        variant={language === 'en' ? 'filled' : 'subtle'}
        size="xs"
        onClick={() => setLanguage('en')}
        color="equalBlue"
      >
        {t.languageSwitch.english}
      </Button>
      <Button
        variant={language === 'es' ? 'filled' : 'subtle'}
        size="xs"
        onClick={() => setLanguage('es')}
        color="equalBlue"
      >
        {t.languageSwitch.spanish}
      </Button>
    </Group>
  );
}
