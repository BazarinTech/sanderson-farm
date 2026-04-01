'use client'

import {
  Wallet01Icon,
  Download01Icon,
  TaskDone01Icon,
  InformationCircleIcon,
  MarketingIcon,
  GiftIcon,
  WhatsappIcon,
  WhatsappBusinessIcon,
} from "hugeicons-react"
import { useRouter } from "next/navigation"

const actions = [
  { icon: Wallet01Icon, label: "Recharge", color: "bg-primary", link: "/recharge" },
  { icon: Download01Icon, label: "Withdraw", color: "bg-primary", link: "/cashout" },
  { icon: GiftIcon, label: "Bonus", color: "bg-primary", link: "/bonus" },
  { icon: MarketingIcon, label: "Influencer", color: "bg-primary", link: "/incentive" },
  { icon: TaskDone01Icon, label: "Records", color: "bg-primary", link: "/records" },
  { icon: InformationCircleIcon, label: "About", color: "bg-primary", link: "/company" },
  { icon: WhatsappIcon, label: "Whatsapp Group", color: "bg-primary", link: "https://chat.whatsapp.com/GCPOpdXf3C90ZiFgRjiQnQ?mode=gi_t" },
  { icon: WhatsappBusinessIcon, label: "Whatsapp Channel", color: "bg-primary", link: "https://whatsapp.com/channel/0029Vb7WoPs6rsQrOLQmZi0s" }
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
