"use client"

import { FormEvent, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

  const validation = useMemo(() => validateSignup(values), [values])

  const updateField = (field: keyof SignupFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    if (!validation.isValid) {
      return
    }
  }

  const errorFor = (field: keyof SignupFormValues) => submitted ? validation.errors[field] : undefined

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={values.name} onChange={(event) => updateField("name", event.target.value)} />
        {errorFor("name") && <p className="text-sm text-destructive">{errorFor("name")}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} />
        {errorFor("email") && <p className="text-sm text-destructive">{errorFor("email")}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={values.password} onChange={(event) => updateField("password", event.target.value)} />
          {errorFor("password") && <p className="text-sm text-destructive">{errorFor("password")}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" value={values.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} />
          {errorFor("confirmPassword") && <p className="text-sm text-destructive">{errorFor("confirmPassword")}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" value={values.phone} onChange={(event) => updateField("phone", event.target.value)} />
        {errorFor("phone") && <p className="text-sm text-destructive">{errorFor("phone")}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="interests">Interests</Label>
        <Textarea
          id="interests"
          value={values.interests}
          onChange={(event) => updateField("interests", event.target.value)}
          placeholder="Algorithms, Spring Boot, system design"
        />
        {errorFor("interests") && <p className="text-sm text-destructive">{errorFor("interests")}</p>}
      </div>

      <Button type="submit" className="w-full sm:w-fit">Create account</Button>
    </form>
  )
}
