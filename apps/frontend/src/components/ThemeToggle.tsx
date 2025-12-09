import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { useTheme, Theme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'switch';
}

export function ThemeToggle({ size = 'md' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = (): void => {
    const themes: Theme[] = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <IconSun size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />;
      case 'dark':
        return <IconMoon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />;
      case 'auto':
        return <IconDeviceDesktop size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />;
    }
  };

  const getLabel = (): string => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'auto':
        return 'Auto mode (follows system)';
    }
  };

  const getAriaLabel = (): string => {
    return `Toggle theme, currently ${getLabel()}`;
  };

  return (
    <Tooltip label={getLabel()} position="bottom" withArrow>
      <ActionIcon
        onClick={cycleTheme}
        size={size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'xl'}
        variant="subtle"
        color="gray"
        aria-label={getAriaLabel()}
        title={getAriaLabel()}
      >
        {getIcon()}
      </ActionIcon>
    </Tooltip>
  );
}
