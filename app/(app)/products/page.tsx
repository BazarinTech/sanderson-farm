import { ProductCard } from '@/components/products/product-card'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import React from 'react'

const products = [
  {
    name: "Antminer S1",
    image: "/mixed-colorful-beans-in-wooden-bowl.png",
    price: 800.0,
    cycle: 30,
    daily: 55.0,
    limit: 1,
  }
]

function Page() {
  return (
    <div>
      <Topbar title="Grover Products" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4 mb-20">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            image={product.image}
            price={product.price}
            cycle={product.cycle}
            daily={product.daily}
            limit={product.limit}
          />
        ))}
      </main>

      <BottomNav />
    </div>
  )
}

export default Page