import { readFileSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const files = {
  signupApi: join(root, "lib/signup-api.ts"),
  signupForm: join(root, "components/signup/signup-form.tsx"),
  validation: join(root, "lib/signup-validation.ts"),
}

const contents = Object.fromEntries(
  Object.entries(files).map(([key, path]) => [key, readFileSync(path, "utf8")]),
)

const checks = [
  [contents.signupApi.includes("/api/members/signup"), "회원가입 API endpoint 확인"],
  [contents.signupApi.includes("NEXT_PUBLIC_STUDYHUB_API_BASE_URL"), "API base URL 환경변수 확인"],
  [contents.signupApi.includes("toSignupMemberRequest"), "request 변환 함수 확인"],
  [contents.signupForm.includes("await signupMember(values)"), "회원가입 submit API 호출 확인"],
  [contents.signupForm.includes("StudyHub 회원가입이 완료되었습니다."), "성공 메시지 확인"],
  [contents.signupForm.includes("가입 처리 중..."), "제출 중 상태 확인"],
  [contents.validation.includes("비밀번호가 서로 일치하지 않습니다."), "한국어 검증 메시지 확인"],
]

const failed = checks.filter(([passed]) => !passed)
if (failed.length > 0) {
  for (const [, message] of failed) {
    console.error(`실패: ${message}`)
  }
  process.exit(1)
}

console.log("회원가입 API 연동 smoke 검증 통과")
