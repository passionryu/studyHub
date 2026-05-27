import type { SignupFormValues } from "@/lib/signup-validation"

export interface SignupMemberRequest {
  name: string
  email: string
  password: string
  phone: string | null
  interests: string[]
}

export interface SignupMemberResponse {
  memberId: number
  name: string
  email: string
}

export class SignupApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "SignupApiError"
  }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_STUDYHUB_API_BASE_URL ?? "http://localhost:3001"

export function toSignupMemberRequest(values: SignupFormValues): SignupMemberRequest {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    password: values.password,
    phone: values.phone.trim() || null,
    interests: values.interests
      .split(",")
      .map((interest) => interest.trim())
      .filter(Boolean),
  }
}

export async function signupMember(values: SignupFormValues): Promise<SignupMemberResponse> {
  const response = await fetch(`${apiBaseUrl}/api/members/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toSignupMemberRequest(values)),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new SignupApiError(data?.message ?? "회원가입 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.")
  }

  return data as SignupMemberResponse
}
