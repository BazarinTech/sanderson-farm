"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import {
  SmartPhone01Icon,
  UserIcon,
  Wallet01Icon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  Edit01Icon,
} from "hugeicons-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Topbar from "@/components/shared/topbar"

export default function CashoutWalletPage() {
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [accountName, setAccountName] = useState("")
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [hasExistingWallet, setHasExistingWallet] = useState(true)

  // Simulate fetching existing wallet data
  useEffect(() => {
    // Mock existing wallet data - in real app, fetch from API
    const existingData = {
      mpesaPhone: "0712345678",
      accountName: "John Doe",
      hasPin: true,
    }

    if (existingData.mpesaPhone) {
      setMpesaPhone(existingData.mpesaPhone)
      setAccountName(existingData.accountName)
      setHasExistingWallet(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!mpesaPhone || !accountName) {
      setError("Please fill in all required fields")
      return
    }

    if (!/^0\d{9}$/.test(mpesaPhone) && !/^254\d{9}$/.test(mpesaPhone)) {
      setError("Please enter a valid M-Pesa phone number")
      return
    }

    if (!hasExistingWallet || isEditing) {
      if (!pin) {
        setError("Please set a withdrawal PIN")
        return
      }

      if (pin.length < 4) {
        setError("PIN must be at least 4 digits")
        return
      }

      if (pin !== confirmPin) {
        setError("PINs do not match")
        return
      }
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    setShowSuccess(true)
    setHasExistingWallet(true)
    setIsEditing(false)
    setPin("")
    setConfirmPin("")

    setTimeout(() => {
      setShowSuccess(false)
    }, 2000)
  }

  return (
    <div>
      <Topbar title="Withdrawal Wallet" backBtn />

      <div className="flex-1 px-6 py-6">
        {/* Info Card */}
        <div className="bg-primary/10 rounded-xl p-4 mb-6 flex gap-3">
          <InformationCircleIcon size={24} className="text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm text-primary">Important Notice</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Set up your M-Pesa withdrawal details carefully. Your withdrawals will be sent to this number.
            </p>
          </div>
        </div>

        {/* Current Wallet Display (if exists and not editing) */}
        {hasExistingWallet && !isEditing && (
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wallet01Icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">M-Pesa Wallet</h3>
                  <p className="text-sm text-muted-foreground">Withdrawal Account</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                <Edit01Icon size={16} />
                Edit
              </Button>
            </div>

            <div className="space-y-3 pt-3 border-t border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Phone Number</span>
                <span className="font-medium">{mpesaPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Account Name</span>
                <span className="font-medium">{accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Withdrawal PIN</span>
                <span className="font-medium text-green-600">Set</span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        {(!hasExistingWallet || isEditing) && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Wallet01Icon size={32} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold">{hasExistingWallet ? "Update Wallet Details" : "Set Up Wallet"}</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {hasExistingWallet ? "Modify your withdrawal information" : "Configure your M-Pesa withdrawal account"}
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="mpesaPhone">M-Pesa Phone Number *</Label>
              <div className="relative">
                <SmartPhone01Icon
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="mpesaPhone"
                  type="tel"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="0712345678"
                  className="pl-10 h-12"
                />
              </div>
              <p className="text-xs text-muted-foreground">The number registered with M-Pesa</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name *</Label>
              <div className="relative">
                <UserIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="accountName"
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10 h-12"
                />
              </div>
              <p className="text-xs text-muted-foreground">Must match your M-Pesa registered name</p>
            </div>

            <div className="h-px bg-gray-200 my-4" />

            <div className="space-y-2">
              <Label htmlFor="pin">{hasExistingWallet ? "New Withdrawal PIN *" : "Withdrawal PIN *"}</Label>
              <PasswordInput id="pin" name="pin" value={pin} onChange={setPin} placeholder="Enter 4-6 digit PIN" />
              <p className="text-xs text-muted-foreground">This PIN will be required when making withdrawals</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPin">Confirm PIN *</Label>
              <PasswordInput
                id="confirmPin"
                name="confirmPin"
                value={confirmPin}
                onChange={setConfirmPin}
                placeholder="Confirm your PIN"
              />
            </div>

            <div className="flex gap-3 pt-4">
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 bg-transparent"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" className="flex-1 h-12 text-lg font-semibold" disabled={isLoading}>
                {isLoading ? "Saving..." : hasExistingWallet ? "Update Wallet" : "Save Wallet"}
              </Button>
            </div>
          </form>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <h3 className="font-semibold text-sm text-orange-700 mb-2">Security Tips:</h3>
          <ul className="text-sm text-orange-600 space-y-1">
            <li>• Never share your withdrawal PIN with anyone</li>
            <li>• Use a unique PIN different from other accounts</li>
            <li>• Contact support if you suspect unauthorized access</li>
          </ul>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="max-w-sm mx-auto rounded-2xl">
          <AlertDialogHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckmarkCircle01Icon size={32} className="text-green-600" />
            </div>
            <AlertDialogTitle className="text-center">Wallet Saved!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your withdrawal wallet details have been {hasExistingWallet ? "updated" : "saved"} successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
