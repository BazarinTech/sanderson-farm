'use client'

import { OrderCard } from '@/components/products/order-card'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMainStore } from '@/lib/stores/use-main-store'
import { useEffect, useState } from 'react'

function Page() {
  const mainDetails = useMainStore((state) => state.mainDetails)
  const [validOrders, setValidOrders] = useState<InvestmentOrder[]>([]);
  const [expiredOrders, setExpiredOrders] = useState<InvestmentOrder[]>([]);

  const loginState = useMainStore((state) => state.loginState)
    useEffect(() => {
      loginState()
    }, [loginState])

  useEffect(() => {
    if (mainDetails) {
      const valid = mainDetails.user_investments.filter((order) => order.status === 'Active');
      const expired = mainDetails.user_investments.filter((order) => order.status === 'Expired');
      setValidOrders(valid);
      setExpiredOrders(expired);
    }
  }, [mainDetails]);
  return (
    <div>
      <Topbar title="Grover Tasks"/>
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
                    key={order.ID}
                    name={order.product_name}
                    image={order.image}
                    cycle={order.duration}
                    total={order.total_returns}
                    purchaseDate={order.investment_date}
                    status={order.status}
                    daily={order.return_rate}
                    roll={order.roll}
                    orderID={order.ID}
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
                    key={order.ID}
                    name={order.product_name}
                    image={order.image}
                    cycle={order.duration}
                    total={order.total_returns}
                    purchaseDate={order.investment_date}
                    status={order.status}
                    daily={order.return_rate}
                    roll={order.roll}
                    orderID={order.ID}
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