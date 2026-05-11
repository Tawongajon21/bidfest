'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/navbar'

function CheckPathway({ children }) {
  const pathname = usePathname();

  // Don't show Navbar on login/register pages
  const hideNavbar = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  )
}

export default CheckPathway