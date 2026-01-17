import { Suspense } from "react"
import RecordPage from "./record-page"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <RecordPage />
    </Suspense>
  )
}
