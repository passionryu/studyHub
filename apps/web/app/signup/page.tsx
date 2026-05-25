import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { SignupForm } from "@/components/signup/signup-form"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <Button asChild variant="ghost" className="w-fit px-0">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to StudyHub
          </Link>
        </Button>

        <section className="space-y-3">
          <p className="text-sm font-medium text-primary">StudyHub account</p>
          <h1 className="text-3xl font-semibold tracking-normal">Create your account</h1>
          <p className="max-w-2xl text-muted-foreground">
            Join StudyHub to organize notes, interview practice, and study questions in one place.
          </p>
        </section>

        <SignupForm />
      </div>
    </main>
  )
}
