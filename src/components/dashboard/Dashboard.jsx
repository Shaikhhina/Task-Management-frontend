import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className='flex flex-col md:flex-row h-[90vh] gap-3'>
        <div className='bg-blue-900 border rounded-sm w-full md:w-1/6 p-4 flex flex-col justify-between text-white'>
            <Sidebar/>
        </div>
        <div className='bg-blue-100 border rounded-sm p-4 w-full md:w-5/6'>
            <Outlet/>
        </div>
    </div>
  )
}
