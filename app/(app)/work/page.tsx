'use client'

import { OrderCard } from '@/components/products/order-card'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const orders = [
  {
    id: 1,
    name: "AS1",
    image: "/mixed-colorful-beans-in-wooden-bowl.jpg",
    cycle: "30 Day",
    total: "KSH160050.00",
    purchaseDate: "2025-12-20 17:11",
    status: "valid" as const,
    daily: "KSH550.00",
  },
  {
    id: 2,
    name: "AS1",
    image: "/mixed-colorful-beans-in-wooden-bowl.jpg",
    cycle: "30 Day",
    total: "KSH1650.00",
    purchaseDate: "2025-12-24 15:26",
    status: "valid" as const,
    daily: "KSH550.00",
  },
  {
    id: 3,
    name: "Antminer S2",
    image: "/red-kidney-beans-in-wooden-bowl-with-scoop.jpg",
    cycle: "42 Day",
    total: "KSH2700.00",
    purchaseDate: "2025-12-15 10:30",
    status: "expired" as const,
    daily: "KSH550.00",
  },
  {
    id: 4,
    name: "AS1",
    image: "/mixed-colorful-beans-in-wooden-bowl.jpg",
    cycle: "30 Day",
    total: "KSH160050.00",
    purchaseDate: "2025-11-20 09:45",
    status: "expired" as const,
    daily: "KSH550.00",
  },
]

function Page() {

  const validOrders = orders.filter((order) => order.status === "valid")
  const expiredOrders = orders.filter((order) => order.status === "expired")
  return (
    <div>
      <Topbar title="Grover Tasks" backBtn/>
      {/* Summary Section */}
        <div className="px-4 py-6 mb-20">

          <Tabs defaultValue="valid" className="mt-1">
          <TabsList className="grid w-full grid-cols-2 rounded-full bg-background p-1 space-x-1">
            <TabsTrigger
              value="valid"
              className="rounded-full data-[state=inactive]:bg-background data-[state=active]:text-secondary data-[state=inactive]:shadow-sm data-[state=active]:bg-primary data-[state=inactive]:text-accent-foreground py-4"
            >
              Valid
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="rounded-full data-[state=inactive]:bg-background data-[state=active]:text-secondary data-[state=inactive]:shadow-sm data-[state=active]:bg-primary data-[state=inactive]:text-accent-foreground py-4"
            >
              Expired
            </TabsTrigger>
          </TabsList>

          <TabsContent value="valid" className="mt-5">
            <div className="space-y-4 p-4">
              {validOrders.length > 0 ? (
                validOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    name={order.name}
                    image={order.image}
                    cycle={order.cycle}
                    total={order.total}
                    purchaseDate={order.purchaseDate}
                    status={order.status}
                    daily={order.daily}
                  />
                ))
              ) : (
                <p className="py-8 text-center text-muted-foreground">No valid orders found</p>
              )}
              <p className="py-4 text-center text-sm text-muted-foreground">none more</p>
            </div>
          </TabsContent>

          <TabsContent value="expired" className="mt-5">
            <div className="space-y-4 p-4">
              {expiredOrders.length > 0 ? (
                expiredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    name={order.name}
                    image={order.image}
                    cycle={order.cycle}
                    total={order.total}
                    purchaseDate={order.purchaseDate}
                    status={order.status}
                    daily={order.daily}
                  />
                ))
              ) : (
                <p className="py-8 text-center text-muted-foreground">No expired orders found</p>
              )}
              <p className="py-4 text-center text-sm text-muted-foreground">none more</p>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      <BottomNav />
    </div>
  )
}

export default Page