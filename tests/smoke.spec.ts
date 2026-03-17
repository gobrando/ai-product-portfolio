import { expect, test } from '@playwright/test';

test('hero, navigation, and contact CTAs render', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('AI products');
  await expect(page.getByRole('link', { name: 'Download Resume' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Connect on LinkedIn' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'GitHub' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email Me' })).toBeVisible();
});

test('top-nav anchors navigate to sections', async ({ page }) => {
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: 'Toggle navigation menu' });
  const useMobileMenu = await menuButton.isVisible();

  if (useMobileMenu) {
    await menuButton.click();
    await page.locator('#mobile-menu a', { hasText: 'Work' }).click();
  } else {
    await page.getByRole('link', { name: 'Work' }).first().click();
  }
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator('#work')).toBeInViewport();

  if (useMobileMenu) {
    await menuButton.click();
    await page.locator('#mobile-menu a', { hasText: 'Contact' }).click();
  } else {
    await page.getByRole('link', { name: 'Contact' }).first().click();
  }
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
});

test('hero image fallback appears when image fails to load', async ({ page }) => {
  await page.goto('/');
  const photo = page.locator('#hero-photo');

  await photo.evaluate((node) => {
    node.setAttribute('src', 'missing-headshot.jpg');
    node.dispatchEvent(new Event('error'));
  });

  await expect(page.locator('#hero-photo-wrap')).toHaveClass(/is-fallback/);
  await expect(page.locator('.hero-photo-fallback')).toBeVisible();
});

test('case-study evidence CTAs are present', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Request Artifacts' })).toHaveCount(3);
  await expect(page.getByRole('link', { name: 'Discuss This Case' })).toHaveCount(3);
});

test('mobile nav can be toggled and closed with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const nav = page.locator('#site-nav');
  const menuButton = page.getByRole('button', { name: 'Toggle navigation menu' });

  await menuButton.click();
  await expect(nav).toHaveAttribute('data-open', 'true');

  await page.keyboard.press('Escape');
  await expect(nav).toHaveAttribute('data-open', 'false');
});

test('analytics bootstrap injects plausible script when configured', async ({ page }) => {
  await page.route('**/analytics.config.js', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: "window.PORTFOLIO_ANALYTICS={provider:'plausible',domain:'example.com'};"
    });
  });

  await page.goto('/');
  await expect(page.locator('script[data-domain="example.com"]')).toHaveAttribute('src', 'https://plausible.io/js/script.js');
});

test('analytics status reports unconfigured by default config', async ({ page }) => {
  await page.goto('/');
  const status = await page.evaluate(() => (window as unknown as { __portfolioAnalyticsStatus?: string }).__portfolioAnalyticsStatus);
  expect(status?.startsWith('unconfigured:')).toBeTruthy();
});

test('evidence index page and anchors are reachable', async ({ page }) => {
  await page.goto('/evidence.html');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Case Study Evidence Index');
  await expect(page.getByRole('button', { name: 'Goodwill GenAI' })).toBeVisible();
  await expect(page.getByLabel('Search artifacts')).toBeVisible();

  await page.goto('/');
  await page.getByRole('link', { name: 'View Evidence Index' }).first().click();
  await expect(page).toHaveURL(/evidence\.html#goodwill$/);
  await expect(page.locator('#goodwill')).toBeInViewport();
});

test('evidence filters and search update visible artifacts', async ({ page }) => {
  await page.goto('/evidence.html');

  const goodwillFilter = page.getByRole('button', { name: 'Goodwill GenAI' });
  await goodwillFilter.click();

  await expect(page.locator('#goodwill')).toBeVisible();
  await expect(page.locator('#ma-eec')).toHaveClass(/hidden/);
  await expect(page.locator('#cdc-reportstream')).toHaveClass(/hidden/);

  await page.getByLabel('Search artifacts').fill('latency');
  await expect(page.locator('#goodwill .artifact-card:not(.hidden)')).toHaveCount(1);
  await expect(page.locator('#goodwill .artifact-card:not(.hidden) .artifact-title')).toContainText('Quality + Latency Eval Rubric');
});

test('evidence artifact preview modal opens and closes', async ({ page }) => {
  await page.goto('/evidence.html');

  await page.getByRole('button', { name: 'Preview' }).first().click();
  await expect(page.locator('#preview-modal')).toBeVisible();
  await expect(page.locator('#preview-canvas-title')).toContainText('Product Scope Map');

  await page.keyboard.press('Escape');
  await expect(page.locator('#preview-modal')).toBeHidden();
});

test('evidence page analytics bootstrap injects plausible script when configured', async ({ page }) => {
  await page.route('**/analytics.config.js', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: "window.PORTFOLIO_ANALYTICS={provider:'plausible',domain:'example.com'};"
    });
  });

  await page.goto('/evidence.html');
  await expect(page.locator('script[data-domain="example.com"]')).toHaveAttribute('src', 'https://plausible.io/js/script.js');
});
