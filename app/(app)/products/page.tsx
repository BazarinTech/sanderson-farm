'use client'
import { ProductCard } from '@/components/products/product-card'
import { BottomNav } from '@/components/shared/bottombar'
import NoList from '@/components/shared/no-list'
import Topbar from '@/components/shared/topbar'
import { useMainStore } from '@/lib/stores/use-main-store'
import React, { useEffect } from 'react'


function Page() {
  const mainDetails = useMainStore((state) => state.mainDetails)
  const loginState = useMainStore((state) => state.loginState)
    useEffect(() => {
      loginState()
    }, [loginState])
  return (
    <div>
      <Topbar title="Grover Products" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4 mb-20">
        {mainDetails?.products.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            image={product.image}
            max={product.max}
            duration={product.duration}
            returns={product.returns}
            order_limit={product.order_limit}
            ID={product.ID}
            tier={product.tier}
            description={product.description}
            status={product.status}

          />
        ))}
        {mainDetails?.products.length === 0 && (
          <NoList title='No products found' description='Please reach our customer support for help'/>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

export default Page