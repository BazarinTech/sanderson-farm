"use client"

import Image from "next/image"
import { ArrowRight01Icon } from "hugeicons-react"
import { useCurrency } from "@/lib/hooks/use-currency"


export function ProductCard({ name, image, max, duration, returns, order_limit }: Product) {
  const src = image
  ? `https://grover.xgramm.com/admin/uploads/${image}`
  : "/placeholder.svg";
  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border w-full">
      {/* Product Name */}
      <h3 className="text-lg font-semibold text-foreground mb-3">{name}</h3>

      {/* Product Info Row */}
      <div className="flex gap-4 mb-4">
        {/* Product Image */}
        <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0">
          <Image
            src={src}
            alt={name}
            width={128}
            height={96}
            className="w-full h-full object-cover"
            unoptimized={src.startsWith("https://grover.xgramm.com")}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Price :</span>
            <span className="text-sm font-bold text-primary">{useCurrency(max)}</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Cycle :</span>
            <span className="text-sm font-medium text-foreground italic">{duration} Day</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Daily :</span>
            <span className="text-sm font-bold text-primary">{useCurrency(returns)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar and Buy Button */}
      <div className="flex items-center gap-2">
        {/* Progress Section */}
        <div className="flex-1 flex items-center gap-2">
          {/* Circle indicator */}
          <div className="w-6 h-6 rounded-full shrink-0" />
          {/* Progress bar */}
          <div className="flex-1 h-8 bg-muted-foreground/60 rounded-full overflow-hidden relative">
            <div className="h-full bg-muted-foreground/80 rounded-full" style={{ width: `${100}%` }} />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground">
             Limit {order_limit}
            </span>
          </div>
        </div>

        {/* Buy Button */}
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Buy
          <ArrowRight01Icon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
