import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { button: 'sm', icon: 16 },
  md: { button: 'md', icon: 20 },
  lg: { button: 'lg', icon: 24 },
} as const;

export function ThemeToggle({ size = 'md' }: ThemeToggleProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const isDark = computedColorScheme === 'dark';
  const { button: buttonSize, icon: iconSize } = sizeMap[size];

  const toggleColorScheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="subtle"
      size={buttonSize}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <IconSun size={iconSize} /> : <IconMoon size={iconSize} />}
    </ActionIcon>
  );
}
