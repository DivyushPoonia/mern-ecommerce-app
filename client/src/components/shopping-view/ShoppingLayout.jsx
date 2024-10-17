import React from 'react'
import ShoppingHeader from './ShoppingHeader'
import { Outlet } from 'react-router-dom'

function ShoppingLayout() {
  return (
    <div className=' flex flex-col overflow-hidden'>
       <ShoppingHeader/>
       <main className='flex flex-col w-full'> 
          <Outlet/>
       </main>
    </div>
  )
}

export default ShoppingLayout
