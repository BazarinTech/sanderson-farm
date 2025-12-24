"use client"

import { useEffect, useState } from "react"
import { Rocket01Icon, SparklesIcon } from "hugeicons-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"

interface PromotionDialogProps {
  isOpen: boolean
  onComplete: () => void
  productName: string
}

export function PromotionDialog({ isOpen, onComplete, productName }: PromotionDialogProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      setProgress(0)
      return
    }

    const duration = 3000 // 3 seconds
    const interval = 30 // Update every 30ms
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            onComplete()
          }, 200)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isOpen, onComplete])

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-sm rounded-2xl border-0 p-6 shadow-2xl [&>button]:hidden">
        <AlertDialogHeader className="space-y-0">
          {/* Header with icon */}
          <div className="mb-4 flex flex-col items-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Rocket01Icon className="h-8 w-8 text-primary" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-foreground">Promoting Your Product</AlertDialogTitle>
            <AlertDialogDescription className="mt-1 text-center text-sm text-muted-foreground">
              {productName}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        {/* Progress section using shadcn Progress */}
        <div className="mb-4">
          <Progress
            value={progress}
            className="h-3 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent"
          />
          <p className="mt-2 text-center text-sm font-medium text-primary">{Math.round(progress)}%</p>
        </div>

        {/* Captivating info */}
        <div className="space-y-3 rounded-xl bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <SparklesIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Boosting Visibility</p>
              <p className="text-xs text-muted-foreground">
                Your product is being featured to thousands of potential investors
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Rocket01Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Maximizing Returns</p>
              <p className="text-xs text-muted-foreground">Promoted products earn up to 25% more daily income</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">Please wait while we process your promotion...</p>
      </AlertDialogContent>
    </AlertDialog>
  )
}
