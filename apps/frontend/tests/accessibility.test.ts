import { test } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const routes = ['/login', '/register', '/dashboard', '/missions', '/profile']

const reportsDir = path.join(__dirname, 'a11y-reports')

// Ensure reports directory exists
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true })
}

for (const route of routes) {
  test(`accessibility check: ${route}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${route}`)
    const builder = new AxeBuilder({ page })
    const results = await builder.analyze()
    const reportPath = path.join(reportsDir, route.replace(/\//g, '_') + '.json')
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
  })
}
