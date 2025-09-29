
"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/navbar';
import Login from "@/app/(auth)/login/page"
import Register from "@/app/(auth)/register/page"
function CheckPathway({children}) {
    const pathname=usePathname();

  return (

    pathname === "/login" ? <Login/> : pathname === "/register" ? <Register/> : 
    
    <>
    <Navbar/>
{children}
    </>
 
  )
}

export default CheckPathway