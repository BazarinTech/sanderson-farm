'use client'
import { ApplicationModal } from '@/components/incentives/application-modal'
import { IncentiveTierCard } from '@/components/incentives/incentive-card'
import { ReferralStats } from '@/components/incentives/referral-stats'
import Topbar from '@/components/shared/topbar'
import React, { useState } from 'react'
type IncentiveTier = {
  id: number
  level: string
  name: string
  requiredReferrals: number
  weeklySalary: number
  bonusItem?: string
}

const incentiveTiers: IncentiveTier[] = [
  {
    id: 1,
    level: "Level 1",
    name: "Bronze Agent",
    requiredReferrals: 10,
    weeklySalary: 1000,
  },
  {
    id: 2,
    level: "Level 2",
    name: "Silver Agent",
    requiredReferrals: 25,
    weeklySalary: 2500,
  },
  {
    id: 3,
    level: "Level 3",
    name: "Gold Agent",
    requiredReferrals: 50,
    weeklySalary: 5000,
    bonusItem: "Bluetooth Earbuds",
  },
  {
    id: 4,
    level: "Level 4",
    name: "Platinum Agent",
    requiredReferrals: 100,
    weeklySalary: 10000,
    bonusItem: "Smartphone",
  },
  {
    id: 5,
    level: "Level 5",
    name: "Diamond Agent",
    requiredReferrals: 250,
    weeklySalary: 25000,
    bonusItem: "Laptop",
  },
  {
    id: 6,
    level: "Level 6",
    name: "Elite Agent",
    requiredReferrals: 500,
    weeklySalary: 50000,
    bonusItem: "Laptop + Smart TV",
  },
]

function Page() {
  const [selectedTier, setSelectedTier] = useState<IncentiveTier | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [appliedTiers, setAppliedTiers] = useState<number[]>([])

  // Mock current user referrals - in real app this would come from API/database
  const currentReferrals = 12

  // Calculate current level and next milestone
  const currentLevelIndex = incentiveTiers.findIndex((tier) => currentReferrals < tier.requiredReferrals)
  const currentLevel =
    currentLevelIndex === 0
      ? "Starter"
      : currentLevelIndex === -1
        ? "Elite"
        : incentiveTiers[currentLevelIndex - 1].name.split(" ")[0]
  const nextMilestone =
    currentLevelIndex === -1
      ? incentiveTiers[incentiveTiers.length - 1].requiredReferrals
      : incentiveTiers[currentLevelIndex].requiredReferrals

  const handleApply = (tier: IncentiveTier) => {
    setSelectedTier(tier)
    setIsModalOpen(true)
  }

  const handleModalClose = (open: boolean) => {
    if (!open && selectedTier) {
      // Mark tier as applied when modal closes after submission
      setAppliedTiers((prev) => [...prev, selectedTier.id])
    }
    setIsModalOpen(open)
    if (!open) setSelectedTier(null)
  }

  const getRewardString = (tier: IncentiveTier) => {
    let reward = `KSH ${tier.weeklySalary.toLocaleString()}/week`
    if (tier.bonusItem) {
      reward += ` + ${tier.bonusItem}`
    }
    return reward
  }
  return (
    <div>
      <Topbar title="Incentives" backBtn />
<div className="px-4 py-4 space-y-4">
        {/* Stats Card */}
        <ReferralStats currentReferrals={currentReferrals} nextMilestone={nextMilestone} currentLevel={currentLevel} />

        {/* Info Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-amber-800 text-sm">
            <span className="font-semibold">Become an Agent!</span> Invite friends to join and when they become active
            members, unlock amazing rewards and weekly salary bonuses.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Reward Tiers</h2>

          {incentiveTiers.map((tier) => (
            <IncentiveTierCard
              key={tier.id}
              tier={tier}
              currentReferrals={currentReferrals}
              onApply={handleApply}
              hasApplied={appliedTiers.includes(tier.id)}
            />
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {selectedTier && (
        <ApplicationModal
          open={isModalOpen}
          onOpenChange={handleModalClose}
          tierName={selectedTier.name}
          reward={getRewardString(selectedTier)}
        />
      )}
    </div>
  )
}

export default Page