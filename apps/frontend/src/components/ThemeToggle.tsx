import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ThemeToggle({ size = 'lg' }: ThemeToggleProps): JSX.Element {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const toggleColorScheme = (): void => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="subtle"
      size={size}
      aria-label={`Switch to ${computedColorScheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${computedColorScheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {computedColorScheme === 'dark' ? (
        <IconSun size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28} />
      ) : (
        <IconMoon size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28} />
      )}
    </ActionIcon>
  );
}
