'use client'

import {
  Wallet01Icon,
  Download01Icon,
  Gif01Icon,
  Calendar01Icon,
  TaskDone01Icon,
  InformationCircleIcon,
} from "hugeicons-react"
import { useRouter } from "next/navigation"

const actions = [
  { icon: Wallet01Icon, label: "Recharge", color: "bg-primary", link: "/recharge" },
  { icon: Download01Icon, label: "Withdraw", color: "bg-primary", link: "/cashout" },
  { icon: Gif01Icon, label: "Bonus", color: "bg-primary", link: "/bonus" },
  { icon: Calendar01Icon, label: "Incentive", color: "bg-primary", link: "/incentive" },
  { icon: TaskDone01Icon, label: "Records", color: "bg-primary", link: "/records" },
  { icon: InformationCircleIcon, label: "About", color: "bg-primary", link: "/company" },
]

export function QuickActions() {
  const router = useRouter()
  return (
    <div className="grid grid-cols-4 gap-4 p-4 w-full">
      {actions.map((action) => {
        const Icon = action.icon
        const isLight = action.color.includes("secondary")
        return (
          <button key={action.label} className="flex flex-col items-center gap-3 group" onClick={() => router.push(action.link)}>
            <div
              className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 shadow-lg`}
            >
              <Icon
                className={`w-8 h-8 ${isLight ? "text-foreground" : "text-primary-foreground"}`}
                strokeWidth={1.5}
              />
            </div>
            <span className="text-sm font-medium text-foreground">{action.label}</span>
          </button>
        )
      })}
    </div>
  )
}
