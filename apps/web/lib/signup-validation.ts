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
    errors.name = "Name is required."
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address."
  }

  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters."
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match."
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required."
  }

  if (!values.interests.trim()) {
    errors.interests = "Add at least one interest."
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
