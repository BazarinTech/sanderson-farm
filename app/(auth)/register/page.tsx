import { Suspense } from "react"

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <RegisterPage />
    </Suspense>
  )
}
