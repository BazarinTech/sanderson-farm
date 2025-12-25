'use client'

import WalletCard from '@/components/mine/wallet-card'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Wallet01Icon,
  Download01Icon,
  InformationCircleIcon,
  Agreement02Icon,
  Ticket02Icon,
  PackageIcon,
  File01Icon,
  InformationSquareIcon,
  LockPasswordIcon,
  CustomerServiceIcon,
  Download02Icon,
  ArrowRight01Icon,
  CoinsSwapIcon,
  Gif01Icon,
  Logout01Icon,
} from "hugeicons-react"
import Link from 'next/dist/client/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const menuItems = [
  { icon: InformationCircleIcon, label: "Withdraw Account", href: "/cashout-wallet" },
  { icon: Agreement02Icon, label: "Telegram Channel", href: "#" },
  { icon: Ticket02Icon, label: "My Coupon", href: "/bonus" },
  { icon: PackageIcon, label: "Whatsapp group", href: "#" },
  { icon: File01Icon, label: "Records", href: "/records" },
  { icon: InformationSquareIcon, label: "About US", href: "/company" },
  { icon: LockPasswordIcon, label: "Reset Password", href: "/reset-password" },
  { icon: CustomerServiceIcon, label: "Customer Service", href: "#" },
  { icon: Download02Icon, label: "App Download", href: "#" },
  { icon: Logout01Icon, label: "Logout", href: "/login" },
]

function Page() {
  const router = useRouter()
  return (
    <div>
      <Topbar title="Grover Profile" />
      {/* Header with Profile */}
      <div className="bg-primary text-primary-foreground pt-4 pb-8 px-4">
        <h1 className="text-center font-semibold mb-6">Mine</h1>

        {/* Profile Avatar and Info */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2 border-2 border-primary-foreground/30">
            <span className="text-2xl font-bold">BD</span>
          </div>
          <div className="bg-primary-foreground/20 px-3 py-0.5 rounded-full text-sm flex items-center gap-1 mb-2">
            <span className="text-xs">▼</span>
            <span>lv1</span>
          </div>
          <p className="font-semibold">ID : 949</p>
          <p className="text-primary-foreground/80 text-sm">769172724</p>
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Income & Coffee Beans Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4 bg-card">
            <div className="text-center mb-3">
              <p className="text-lg font-bold text-foreground">KSH0.00</p>
              <p className="text-xs text-muted-foreground">Today&apos;s Product Income</p>
            </div>
            <Button
              variant="outline"
              className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              onClick={() => router.push('/products')}
            >
              <CoinsSwapIcon size={16} className="mr-2" />
              Make more
            </Button>
          </Card>

          <Card className="p-4 bg-card">
            <div className="text-center mb-3">
              <p className="text-lg font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Active Team</p>
            </div>
            <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push('/team')}>
              <Gif01Icon size={16} className="mr-2" />
              Invite more
            </Button>
          </Card>
        </div>

        {/* Wallet Card */}
        <WalletCard className="mb-4" />

        {/* Recharge & Withdraw Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6 bg-transparent"
            onClick={() => router.push('/recharge')}
          >
            <Wallet01Icon size={20} className="mr-2" />
            Recharge
          </Button>
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-6" onClick={() => router.push('/cashout')}>
            <Download01Icon size={20} className="mr-2" />
            Withdraw
          </Button>
        </div>

          {/* Menu Items */}
          <div className="space-y-1 mb-20">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center justify-between py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={22} className="text-primary" />
                  <span className="text-foreground">{item.label}</span>
                </div>
                <ArrowRight01Icon size={18} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
       </div>
      <BottomNav />
    </div>
  )
}

export default Page