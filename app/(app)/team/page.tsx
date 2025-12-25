'use client'

import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckmarkCircle01Icon, Copy01Icon } from 'hugeicons-react'
import TeamTable from '@/components/team/team-table'
import { Button } from '@/components/ui/button'

const referralCode = "3G2HU3"
const referralLink = `https://grover-worker.com/register?inviteCode=${referralCode}`

// Mock team data
const teamData = {
  teamB: [
    { account: "07****1234", referrer: "Direct", depositStatus: "Active" },
    { account: "07****5678", referrer: "Direct", depositStatus: "Pending" },
    { account: "07****9012", referrer: "Direct", depositStatus: "Active" },
    { account: "07****3456", referrer: "Direct", depositStatus: "Inactive" },
  ],
  teamC: [
    { account: "07****2345", referrer: "07****1234", depositStatus: "Active" },
    { account: "07****6789", referrer: "07****5678", depositStatus: "Active" },
  ],
  teamD: [{ account: "07****4567", referrer: "07****2345", depositStatus: "Pending" }],
}

const stats = {
  teamSize: 7,
  totalIncome: 2450.0,
  monthlyRecharge: 1200.0,
}


function Page() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }
  return (
    <div>
      <Topbar title="Grover Team" backBtn/>
      {/* Invite Section */}
      <div className="mx-4 mt-4 rounded-xl bg-muted/50 p-5 ">
        <p className="text-center text-sm text-muted-foreground">Invite friend with link shared</p>
        <p className="mt-2 text-center text-2xl font-bold tracking-wider text-foreground">{referralCode}</p>
        <p className="mt-2 break-all text-center text-xs text-muted-foreground">{referralLink}</p>
        <Button onClick={handleCopy} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
          {copied ? (
            <>
              <CheckmarkCircle01Icon size={18} className="mr-2" />
              COPIED!
            </>
          ) : (
            <>
              <Copy01Icon size={18} className="mr-2" />
              COPY
            </>
          )}
        </Button>
      </div>

      {/* Stats Section */}
      <div className="mx-4 mt-6 flex justify-between text-center">
        <div className="flex-1">
          <p className="text-xl font-bold text-foreground">{stats.teamSize}</p>
          <p className="text-xs text-muted-foreground">Team Size</p>
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold text-primary">1</p>
          <p className="text-xs text-muted-foreground">Total Active</p>
        </div>
      </div>
      <div className="mx-4 mt-4 text-center">
        <p className="text-xl font-bold text-foreground">KSH{stats.monthlyRecharge.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">Invite Income</p>
      </div>

      {/* Team Members Section */}
      <div className="mx-4 mt-6">
        <div className="rounded-full border-2 border-primary py-3 text-center">
          <span className="text-sm font-medium tracking-widest text-foreground">TEAM MEMBERS</span>
        </div>
      </div>

      {/* Team Tabs */}
      <div className="mx-4 mt-4 mb-20">
        <Tabs defaultValue="teamB" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-full bg-primary p-1">
            <TabsTrigger
              value="teamB"
              className="rounded-full text-primary-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Team B
            </TabsTrigger>
            <TabsTrigger
              value="teamC"
              className="rounded-full text-primary-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Team C
            </TabsTrigger>
            <TabsTrigger
              value="teamD"
              className="rounded-full text-primary-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Team D
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teamB" className="mt-4">
            <TeamTable members={teamData.teamB} />
          </TabsContent>
          <TabsContent value="teamC" className="mt-4">
            <TeamTable members={teamData.teamC} />
          </TabsContent>
          <TabsContent value="teamD" className="mt-4">
            <TeamTable members={teamData.teamD} />
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  )
}

export default Page