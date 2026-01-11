"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/auth/password-input"
import { SmartPhone01Icon, UserIcon, Mail01Icon, ArrowLeft01Icon } from "hugeicons-react"
import { VerificationCodeInput } from "@/components/auth/verification-input"
import { toast } from "sonner"
import { requestVerificationCode, verifyCode } from "@/lib/backend/actions"
import { auth } from "@/lib/backend/auth"
import { useInviteCode } from "@/lib/hooks/use-invite-code"
import { useMainStore } from "@/lib/stores/use-main-store"

type Step = "phone" | "verify" | "details"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const searchParams = useSearchParams();
  const upline = searchParams.get("inviteCode");
  const { decode } = useInviteCode()

  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleRequestCode = async () => {
    setError("")

    if (!/^0\d{9}$/.test(phone) && !/^254\d{9}$/.test(phone)) {
      setError("Please enter a valid phone number")
      return
    }

    setIsLoading(true)
    try {
      const response = await requestVerificationCode({phone})
      if (response.status == 'Success') {
        toast.success("Verification code sent successfully")
        setStep("verify")
      } else {
        setError(response.message || "Failed to send verification code")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while sending the verification code.")
    }finally {  
      setIsLoading(false)

      startCountdown()
    }
  }

  const handleVerifyCode = async () => {
    setError("")

    if (verificationCode.length !== 6) {
      setError("Please enter the 6-digit verification code")
      return
    }

    setIsLoading(true)
    try {
      const response = await verifyCode({phone, code: verificationCode})
      if (response.status == 'Success') {
        toast.success("Phone number verified successfully")
        setIsVerified(true)
        setStep("details")
      } else {
        setError(response.message || "Invalid verification code")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred during verification.")
    }finally {
    setIsLoading(false)
    }
    
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fullName || !password || !confirmPassword) {
      setError("Please fill in all required fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if(!isVerified) {
      setError("Please verify your phone number first")
      setStep("phone")
      return
    }

    setIsLoading(true)
    try {
      const response = await auth({email, password, confirmPassword, phone, name: fullName, type: 'register', upline: String(decode(upline || "")) || ""})
      if (response.status == 'Success') {
        const loginState = useMainStore.getState().loginState
        loginState()
        toast.success(response.message || "Registration successful")
        router.push("/home")
      } else {
        setError(response.message || "Registration failed")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred during registration.")
    }finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (step === "verify") setStep("phone")
    else if (step === "details") setStep("verify")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-6 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          {step !== "phone" && (
            <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <ArrowLeft01Icon size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold">Create Account</h1>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div
            className={`h-1 flex-1 rounded-full ${step === "phone" || step === "verify" || step === "details" ? "bg-white" : "bg-white/30"}`}
          />
          <div
            className={`h-1 flex-1 rounded-full ${step === "verify" || step === "details" ? "bg-white" : "bg-white/30"}`}
          />
          <div className={`h-1 flex-1 rounded-full ${step === "details" ? "bg-white" : "bg-white/30"}`} />
        </div>
        <p className="text-primary-foreground/80 mt-2 text-sm">
          Step {step === "phone" ? 1 : step === "verify" ? 2 : 3} of 3:{" "}
          {step === "phone" ? "Enter Phone" : step === "verify" ? "Verify Code" : "Complete Profile"}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center mb-6">{error}</div>
        )}

        {/* Step 1: Phone */}
        {step === "phone" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <SmartPhone01Icon size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Enter Your Phone Number</h2>
              <p className="text-muted-foreground text-sm mt-1">We&apos;ll send you a verification code</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <SmartPhone01Icon
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712345678"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button onClick={handleRequestCode} className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
              {isLoading ? "Sending..." : "Request Verification Code"}
            </Button>
          </div>
        )}

        {/* Step 2: Verify Code */}
        {step === "verify" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail01Icon size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Enter Verification Code</h2>
              <p className="text-muted-foreground text-sm mt-1">Code sent to {phone}</p>
            </div>

            <VerificationCodeInput value={verificationCode} onChange={setVerificationCode} />

            <Button
              onClick={handleVerifyCode}
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-muted-foreground text-sm">Resend code in {countdown}s</p>
              ) : (
                <button
                  onClick={() => {
                    startCountdown()
                    handleRequestCode()
                    setVerificationCode("")
                  }}
                  className="text-primary text-sm hover:underline"
                >
                  Resend verification code
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Complete Profile */}
        {step === "details" && (
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserIcon size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Complete Your Profile</h2>
              <p className="text-muted-foreground text-sm mt-1">Just a few more details</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative">
                <UserIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <div className="relative">
                <Mail01Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <PasswordInput id="password" value={password} onChange={setPassword} placeholder="Create a password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm your password"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
