'use client'
import Topbar from '@/components/shared/topbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'

type TransactionStatus = "Pending" | "Completed" | "Failed"

interface Transaction {
  id: string
  type: string
  amount: string
  date: string
  status: TransactionStatus
}

const accountTransactions: Transaction[] = [
  { id: "1", type: "Deposit", amount: "+KSH10.00", date: "2025-12-23 03:12:11", status: "Pending" },
  { id: "2", type: "Bonus", amount: "+KSH50.00", date: "2025-12-22 14:30:00", status: "Completed" },
  { id: "3", type: "Commission", amount: "+KSH120.00", date: "2025-12-21 09:15:22", status: "Completed" },
]

const rechargeTransactions: Transaction[] = [
  { id: "1", type: "Recharge", amount: "+KSH500.00", date: "2025-12-20 11:45:00", status: "Completed" },
  { id: "2", type: "Recharge", amount: "+KSH1000.00", date: "2025-12-18 16:20:33", status: "Completed" },
]

const withdrawTransactions: Transaction[] = [
  { id: "1", type: "Withdraw", amount: "-KSH200.00", date: "2025-12-19 08:00:00", status: "Failed" },
]

const statusStyles: Record<TransactionStatus, string> = {
  Pending: "bg-orange-400 text-white",
  Completed: "bg-green-500 text-white",
  Failed: "bg-red-500 text-white",
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-foreground font-medium">{transaction.type}</p>
          <p className="text-primary font-semibold text-lg">{transaction.amount}</p>
          <p className="text-muted-foreground text-sm">{transaction.date}</p>
        </div>
        <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyles[transaction.status]}`}>
          {transaction.status}
        </span>
      </div>
    </div>
  )
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
      <p className="text-center text-muted-foreground text-sm py-4">none more</p>
    </div>
  )
}


function Page() {
  return (
    <div>
      <Topbar title="Records" backBtn />

      <div className="px-4 pt-4">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full h-12 bg-primary rounded-full p-1 grid grid-cols-3">
            <TabsTrigger
              value="account"
              className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none font-medium"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="recharge"
              className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none font-medium"
            >
              Recharge
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none font-medium"
            >
              Withdraw
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="account" className="mt-0">
              <TransactionList transactions={accountTransactions} />
            </TabsContent>

            <TabsContent value="recharge" className="mt-0">
              <TransactionList transactions={rechargeTransactions} />
            </TabsContent>

            <TabsContent value="withdraw" className="mt-0">
              <TransactionList transactions={withdrawTransactions} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Page