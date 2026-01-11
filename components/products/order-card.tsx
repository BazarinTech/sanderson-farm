"use client"

import { useState } from "react"
import Image from "next/image"
import { Speaker01Icon } from "hugeicons-react"
import { Button } from "@/components/ui/button"
import { PromotionDialog } from "./promotion-dialog"

interface OrderCardProps {
  name: string
  image: string
  cycle: number
  total: string
  purchaseDate: string
  status: string,
  daily: number
}

export function OrderCard({ name, image, cycle, total, purchaseDate, status, daily }: OrderCardProps) {
  const [isPromoting, setIsPromoting] = useState(false)

  return (
    <>
      <div className="rounded-xl bg-background p-4 shadow-sm border border-border w-full">
        <h3 className="mb-3 text-lg font-bold text-foreground">{name}</h3>

        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
            {status === "expired" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="rotate-[-15deg] rounded bg-destructive px-2 py-0.5 text-xs font-bold text-white">
                  EXPIRED
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col justify-center space-y-1">
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Daily:</span>
              <span className="text-sm font-semibold text-primary">{daily}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Cycle:</span>
              <span className="text-sm font-semibold text-foreground">{cycle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total:</span>
              <span className="text-sm font-semibold text-primary">{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Purchase:</span>
              <span className="text-sm font-semibold text-black">{purchaseDate}</span>
            </div>
          </div>
        </div>

        {status === "valid" && (
          <Button
            onClick={() => setIsPromoting(true)}
            className="mt-4 w-full rounded-full bg-gradient-to-r from-primary to-accent py-6 font-semibold text-primary-foreground hover:opacity-90"
            disabled={isPromoting}
          >
            <Speaker01Icon className="mr-2 h-5 w-5" />
            Promote
          </Button>
        )}
      </div>

      <PromotionDialog isOpen={isPromoting} onComplete={() => setIsPromoting(false)} productName={name} />
    </>
  )
}
