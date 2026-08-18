import { expect, test } from "@playwright/test";

const criticalRoutes = [
  { path: "/", name: "home" },
  { path: "/contact", name: "contact" },
  { path: "/demande-musique", name: "music-request" },
  { path: "/galerie", name: "gallery" },
  { path: "/evenements-prives", name: "private-events" },
  { path: "/evenements-professionnels", name: "professional-events" },
  { path: "/location-materiel", name: "rental" },
  { path: "/admin", name: "admin-login" },
] as const;

test.describe("responsive delivery smoke", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("https://example.supabase.co/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "null",
      });
    });
  });

  for (const route of criticalRoutes) {
    test(`${route.name} has no horizontal overflow or console errors`, async ({ page }, testInfo) => {
      const consoleErrors: string[] = [];

      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => {
        consoleErrors.push(error.message);
      });

      await page.goto(route.path);
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(() => {
        const documentElement = document.documentElement;
        return {
          clientWidth: documentElement.clientWidth,
          scrollWidth: documentElement.scrollWidth,
        };
      });

      await testInfo.attach(`${route.name}-${testInfo.project.name}.png`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });

      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
      expect(consoleErrors).toEqual([]);
    });
  }
});
