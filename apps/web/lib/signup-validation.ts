export interface SignupFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  interests: string
}

export interface SignupValidationResult {
  isValid: boolean
  errors: Partial<Record<keyof SignupFormValues, string>>
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateSignup(values: SignupFormValues): SignupValidationResult {
  const errors: SignupValidationResult["errors"] = {}

  if (!values.name.trim()) {
    errors.name = "이름을 입력해주세요."
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "올바른 이메일 주소를 입력해주세요."
  }

  if (values.password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다."
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "비밀번호가 서로 일치하지 않습니다."
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
