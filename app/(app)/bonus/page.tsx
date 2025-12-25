'use client'

import Topbar from '@/components/shared/topbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Ticket01Icon } from 'hugeicons-react'
import React, { useState } from 'react'

const bonusTiers = [
  { required: 5, current: 0, salary: 200 },
  { required: 6, current: 0, salary: 400 },
  { required: 11, current: 0, salary: 600 },
  { required: 20, current: 0, salary: 800 },
]

function Page() {
  const [couponCode, setCouponCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleRedeemCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponCode.trim()) {
      setMessage({ type: "error", text: "Please enter a coupon code" })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock validation - in reality this would be an API call
    if (couponCode.toUpperCase() === "BONUS100") {
      setMessage({ type: "success", text: "Coupon redeemed successfully! KSH 100 added to your balance." })
      setCouponCode("")
    } else {
      setMessage({ type: "error", text: "Invalid or expired coupon code. Please try again." })
    }

    setIsSubmitting(false)
  }
  return (
    <div>
      <Topbar title="Bonus" backBtn />

      {/* Coupon Redemption Section */}
      <div className="mx-4 mb-6 rounded-xl bg-amber-50 p-5 mt-5">
        <div className="mb-4 flex items-center gap-2">
          <Ticket01Icon className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Redeem Coupon Code</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Enter your coupon code below to claim exclusive bonuses and rewards!
        </p>
        <form onSubmit={handleRedeemCoupon} className="space-y-3">
          <Input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="border-primary/30 bg-background text-center text-lg font-semibold uppercase tracking-wider"
            maxLength={20}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Redeeming..." : "Redeem Coupon"}
          </Button>
        </form>
        {message && (
          <div
            className={`mt-3 rounded-lg p-3 text-center text-sm ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* Bonus Tiers */}
      <div className="space-y-4 px-4 mb-10">
        {bonusTiers.map((tier, index) => {
          const isReady = tier.current >= tier.required
          return (
            <div key={index} className="overflow-hidden rounded-xl border-2 border-primary/20 bg-background">
              {/* Header Row */}
              <div className="grid grid-cols-3 border-b border-primary/10 px-4 py-3">
                <span className="text-center text-sm text-muted-foreground">Invited Friends</span>
                <span className="text-center text-sm text-muted-foreground">Salary</span>
                <span className="text-center text-sm text-muted-foreground">Claim</span>
              </div>
              {/* Values Row */}
              <div className="grid grid-cols-3 items-center px-4 py-4">
                <span className="text-center text-lg font-bold text-foreground">
                  {tier.current}/{tier.required}
                </span>
                <span className="text-center text-lg font-bold text-foreground">Ksh {tier.salary}</span>
                <div className="flex justify-center">
                  <Button
                    variant={isReady ? "default" : "secondary"}
                    size="sm"
                    className={
                      isReady
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }
                    disabled={!isReady}
                  >
                    {isReady ? "Claim" : "Not Ready"}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Page