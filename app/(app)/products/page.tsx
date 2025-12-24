import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import React from 'react'


function Page() {
  return (
    <div>
      <Topbar title="Grover Products" backBtn/>


      <BottomNav />
    </div>
  )
}

export default Page