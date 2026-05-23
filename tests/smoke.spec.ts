import { test, expect } from "@playwright/test";

test("homepage loads with hero and booking form works", async ({ page }) => {
  await page.goto("/");
  // Generic check: h1 exists and is non-empty
  const h1 = page.locator("h1#hero-heading");
  await expect(h1).toBeVisible();
  await expect(h1).not.toBeEmpty();

  // Scroll to contact section
  await page.locator("#contact").scrollIntoViewIfNeeded();

  // Fill the inline contact form
  const contactForm = page.locator("#contact form").first();
  await contactForm.locator("input[name='name']").fill("Тест Тестов");
  await contactForm.locator("input[name='phone']").fill("+79031234567");

  // Consent checkbox — click the role="checkbox" element directly
  await contactForm.getByRole("checkbox").click();
  // Wait for the submit button to become enabled
  const submit = contactForm.locator("button[type='submit']");
  await expect(submit).toBeEnabled({ timeout: 2000 });
  await submit.click();

  // Sonner toast (it renders [data-sonner-toast] or a region with status role)
  const toast = page
    .locator("[data-sonner-toast], li[role='status']")
    .first();
  await expect(toast).toContainText(/Заявка отправлена|отправлена/i, {
    timeout: 3000,
  });
});

test("/uslugi/ page loads", async ({ page }) => {
  await page.goto("/uslugi/");
  await expect(page.locator("h1")).toContainText("Цены");
});

test("cookie banner accepts and stays hidden after reload", async ({
  page,
}) => {
  await page.goto("/");
  // Wait past the 800ms reveal delay
  const banner = page.locator("[data-testid='cookie-banner']");
  await expect(banner).toBeVisible({ timeout: 2000 });

  await page.locator("[data-testid='cookie-banner-accept']").click();
  await expect(banner).toBeHidden();

  // Reload
  await page.reload();
  await expect(banner).toBeHidden();
});
