"use client"

import { FormEvent, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { signupMember, SignupApiError } from "@/lib/signup-api"
import { validateSignup, type SignupFormValues } from "@/lib/signup-validation"

const initialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  interests: "",
}

export function SignupForm() {
  const [values, setValues] = useState<SignupFormValues>(initialValues)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validation = useMemo(() => validateSignup(values), [values])

  const updateField = (field: keyof SignupFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setSubmitMessage(null)
    setSubmitError(null)

    if (!validation.isValid) {
      return
    }

    setIsSubmitting(true)
    try {
      const member = await signupMember(values)
      setSubmitMessage(`${member.name}님, StudyHub 회원가입이 완료되었습니다.`)
      setValues(initialValues)
      setSubmitted(false)
    } catch (error) {
      if (error instanceof SignupApiError) {
        setSubmitError(error.message)
        return
      }
      setSubmitError("회원가입 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const errorFor = (field: keyof SignupFormValues) => submitted ? validation.errors[field] : undefined

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="grid gap-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" value={values.name} onChange={(event) => updateField("name", event.target.value)} />
        {errorFor("name") && <p className="text-sm text-destructive">{errorFor("name")}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} />
        {errorFor("email") && <p className="text-sm text-destructive">{errorFor("email")}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" value={values.password} onChange={(event) => updateField("password", event.target.value)} />
          {errorFor("password") && <p className="text-sm text-destructive">{errorFor("password")}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input id="confirmPassword" type="password" value={values.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} />
          {errorFor("confirmPassword") && <p className="text-sm text-destructive">{errorFor("confirmPassword")}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">전화번호</Label>
        <Input id="phone" value={values.phone} onChange={(event) => updateField("phone", event.target.value)} />
        {errorFor("phone") && <p className="text-sm text-destructive">{errorFor("phone")}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="interests">관심 영역</Label>
        <Textarea
          id="interests"
          value={values.interests}
          onChange={(event) => updateField("interests", event.target.value)}
          placeholder="알고리즘, Spring Boot, 시스템 설계"
        />
        {errorFor("interests") && <p className="text-sm text-destructive">{errorFor("interests")}</p>}
      </div>

      {submitMessage && <p className="text-sm text-emerald-600">{submitMessage}</p>}
      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" className="w-full sm:w-fit" disabled={isSubmitting}>
        {isSubmitting ? "가입 처리 중..." : "계정 만들기"}
      </Button>
    </form>
  )
}
