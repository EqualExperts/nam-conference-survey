import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

const renderWithMantine = (ui: React.ReactElement, colorScheme: 'light' | 'dark' = 'light') => {
  return render(
    <MantineProvider defaultColorScheme={colorScheme}>
      {ui}
    </MantineProvider>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders without crashing', () => {
    renderWithMantine(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has correct aria-label for light mode', () => {
    renderWithMantine(<ThemeToggle />, 'light');
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('has correct aria-label for dark mode', () => {
    renderWithMantine(<ThemeToggle />, 'dark');
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('is keyboard accessible', () => {
    renderWithMantine(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Button should be focusable
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('renders different sizes', () => {
    const { rerender } = renderWithMantine(<ThemeToggle size="sm" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <MantineProvider>
        <ThemeToggle size="lg" />
      </MantineProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    renderWithMantine(<ThemeToggle />, 'light');
    const button = screen.getByRole('button');

    // Initially should say "Switch to dark mode" in light mode
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');

    // Click to toggle
    fireEvent.click(button);

    // After click in light mode, Mantine will switch to dark
    // The aria-label should now reflect the new state
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});
