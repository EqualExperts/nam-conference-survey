import { test, expect } from '@playwright/test';

const STORAGE_KEY = 'nam-survey-color-scheme';

test.describe('Dark Mode Theme', () => {
  test.beforeEach(async ({ context }) => {
    // Clear localStorage before each test
    await context.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('respects OS dark mode preference on first visit', async ({ page }) => {
    // Emulate dark mode preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    // Check that dark theme is applied
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');
  });

  test('respects OS light mode preference on first visit', async ({ page }) => {
    // Emulate light mode preference
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    // Check that light theme is applied
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'light');
  });

  test('theme toggle switches between light and dark modes', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const html = page.locator('html');
    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });

    // Initial state should be light
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'light');

    // Click to switch to dark
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');

    // Click to switch back to light
    const lightModeToggle = page.getByRole('button', { name: /switch to light mode/i });
    await lightModeToggle.click();
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'light');
  });

  test('theme persists after page refresh', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    // Switch to dark mode
    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
    await themeToggle.click();

    // Verify dark mode is set
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');

    // Refresh the page
    await page.reload();

    // Dark mode should persist
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');
  });

  test('theme persists across navigation', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    // Switch to dark mode
    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
    await themeToggle.click();

    // Navigate to admin page
    await page.goto('/admin');

    // Dark mode should persist
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');

    // Navigate to thank you page
    await page.goto('/thanks');
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');
  });

  test('theme toggle is visible on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /switch to (dark|light) mode/i })).toBeVisible();

    await page.goto('/thanks');
    await expect(page.getByRole('button', { name: /switch to (dark|light) mode/i })).toBeVisible();

    await page.goto('/admin');
    await expect(page.getByRole('button', { name: /switch to (dark|light) mode/i })).toBeVisible();
  });

  test('theme toggle is keyboard accessible', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });

    // Tab to focus on toggle (may need multiple tabs depending on DOM order)
    await page.keyboard.press('Tab');

    // Keep pressing Tab until we reach the theme toggle
    let attempts = 0;
    while (attempts < 10) {
      const activeElement = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
      if (activeElement?.includes('Switch to')) {
        break;
      }
      await page.keyboard.press('Tab');
      attempts++;
    }

    // Press Enter to activate
    await page.keyboard.press('Enter');

    // Check that theme switched
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');
  });

  test('no flash of incorrect theme on load', async ({ page, context }) => {
    // Set localStorage to dark mode preference
    await context.addInitScript(() => {
      localStorage.setItem('nam-survey-color-scheme', 'dark');
    });

    // Navigate to page
    await page.goto('/');

    // The theme should already be dark from the inline script
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'dark');
  });

  test('localStorage is updated when theme changes', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    // Switch to dark mode
    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
    await themeToggle.click();

    // Check localStorage
    const storedValue = await page.evaluate(() => localStorage.getItem('nam-survey-color-scheme'));
    expect(storedValue).toBe('dark');
  });

  test('saved preference overrides OS preference', async ({ page, context }) => {
    // Set localStorage to light mode preference
    await context.addInitScript(() => {
      localStorage.setItem('nam-survey-color-scheme', 'light');
    });

    // But set OS preference to dark
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    // User preference should win
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-mantine-color-scheme', 'light');
  });
});
