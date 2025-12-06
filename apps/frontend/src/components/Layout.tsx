import { ReactNode } from 'react';
import { Box, Group, Image, Container, useComputedColorScheme } from '@mantine/core';
import { ThemeToggle } from './ThemeToggle';

export interface LayoutProps {
  children: ReactNode;
}

const LOGO_URL = 'https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg';

export function Layout({ children }: LayoutProps) {
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const isLightMode = colorScheme === 'light';

  return (
    <Box mih="100vh">
      <Box
        component="header"
        py="xs"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--mantine-color-body)',
          borderBottom: '1px solid var(--mantine-color-default-border)',
        }}
      >
        <Container size="lg">
          <Group justify="space-between" align="center">
            <Image
              src={LOGO_URL}
              alt="Equal Experts"
              h={40}
              w="auto"
              style={{
                filter: isLightMode ? 'invert(1) hue-rotate(180deg)' : undefined,
              }}
            />
            <ThemeToggle size="md" />
          </Group>
        </Container>
      </Box>
      <Box component="main">{children}</Box>
    </Box>
  );
}
