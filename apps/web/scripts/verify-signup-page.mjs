import { readFileSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const files = {
  signupPage: join(root, "app/signup/page.tsx"),
  signupForm: join(root, "components/signup/signup-form.tsx"),
  validation: join(root, "lib/signup-validation.ts"),
  searchHeader: join(root, "components/dashboard/search-header.tsx"),
}

const contents = Object.fromEntries(
  Object.entries(files).map(([key, path]) => [key, readFileSync(path, "utf8")]),
)

const checks = [
  [contents.searchHeader.includes('href="/signup"'), "search header links to /signup"],
  [contents.signupPage.includes("SignupForm"), "signup page renders SignupForm"],
  [contents.signupForm.includes("confirmPassword"), "signup form has password confirmation"],
  [contents.signupForm.includes("interests"), "signup form has interests field"],
  [contents.validation.includes("Passwords do not match."), "validation checks password confirmation"],
  [contents.validation.includes("Password must be at least 8 characters."), "validation checks password length"],
]

const failed = checks.filter(([passed]) => !passed)
if (failed.length > 0) {
  for (const [, message] of failed) {
    console.error(`failed: ${message}`)
  }
  process.exit(1)
}

console.log("signup page smoke checks passed")
