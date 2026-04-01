"use client"
import { Message01Icon, ArrowUp01Icon, CustomerSupportIcon, GroupItemsIcon } from "hugeicons-react"
import { useRouter } from "next/navigation"

export function FloatingButtons() {
  const router = useRouter()
  return (
    <div className="fixed bottom-24 right-4 flex flex-col gap-3 z-40">
      <button className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform" onClick={() => {
        router.push('https://wa.me/15793859079?text=Hello%20I%20need%20help')
      }}>
        <CustomerSupportIcon className="w-6 h-6 text-accent-foreground" />
      </button>
      <div className="text-xs text-black font-medium text-center">Support</div>
    </div>
  )
}
