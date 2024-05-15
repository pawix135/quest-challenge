import { expect, test } from '@playwright/test'

test.describe("Homepage", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")
  })

  test("Check if the title of homepage is correct", async ({ page }) => {
    const correctTitle = "Questly - Challenges"
    await expect(page).toHaveTitle(correctTitle);
  })
  
  test("Check if the desciption of homepage is correct", async ({ page }) => {
    const correctDescription = "Join challenges and compete with others to achieve your goals!"
    const metaDescription = await page.$eval('meta[name="description"]', (el) => el.getAttribute("content"));
    expect(metaDescription).toBe(correctDescription);
  })
  
})