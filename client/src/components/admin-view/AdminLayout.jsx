import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='w-full min-h-screen flex'>
        <AdminSidebar/>
        <div className='w-full flex flex-1 flex-col'>
            <AdminHeader/>
            <main className='bg-blue-100 min-h-screen flex flex-1 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout
