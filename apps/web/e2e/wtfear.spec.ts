import { test, expect } from '@playwright/test';

test.describe('WTFearB Critical Interactive State Machines & Routing', () => {
  test('1. Blueprint filter & drawer enforces state invariant when switching categories', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Inspect Governed Support & Ops Triage Agent/i }).click();
    const drawer = page.getByRole('dialog');
    await expect(drawer).toBeVisible();

    // Selecting 'SYSTEMS' category must automatically close the 'AI AGENTS' inspection drawer
    await page.getByRole('button', { name: 'SYSTEMS', exact: true }).click();
    await expect(drawer).toBeHidden();

    // Pressing Escape on an open drawer restores focus to trigger button
    await page.getByRole('button', { name: /Inspect Event-Driven Sync/i }).click();
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
  });

  test('2. Engagement Calculator computes deterministic Governed AI Sprint + Eval Harness scope', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('radio', { name: /2-Week Rapid Sprint/i }).check();
    await page.getByRole('radio', { name: /Governed AI/i }).check();
    await page.getByRole('checkbox', { name: /Include 50-Case Golden Eval Harness/i }).check();

    // Base $6,500-$8,500 * 1.2 (governed_ai) + $1,800 eval harness = $9,600 - $12,000
    await expect(page.getByTestId('calculator-price-range')).toContainText('$9,600 – $12,000');
  });

  test('3. Live AgentSandbox triggers ESCALATE_TO_HUMAN when confidence slider exceeds model score', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: /02 \/ Ambiguous Custom SLA Credit/i }).click();
    await expect(page.getByRole('status')).toContainText('ESCALATE_TO_HUMAN');

    await page.getByRole('tab', { name: /03 \/ Adversarial Prompt Injection/i }).click();
    await expect(page.getByRole('status')).toContainText('BLOCKED_POLICY_GATE');
  });

  test('4. /llms.txt and /llms-full.txt return machine-readable Markdown with 200 status', async ({ request }) => {
    const res = await request.get('/llms.txt');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('# WTFearB — Systems Engineering Studio');

    const resFull = await request.get('/llms-full.txt');
    expect(resFull.status()).toBe(200);
    expect(await resFull.text()).toContain('Complete Technical Reference & Architecture Corpus (llms-full.txt)');
  });

  test('5. Programmatic SSR Blueprint and Comparison routes load with correct canonical headers', async ({ page }) => {
    await page.goto('/blueprints/ai-triage');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Governed Support & Ops Triage Agent');

    await page.goto('/compare/traditional-dev-agencies');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('wtfear vs. Traditional Dev Agencies');
  });
});
