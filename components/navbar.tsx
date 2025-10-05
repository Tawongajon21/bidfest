'use client'
import React from 'react'
import { useSession,clearSession,getSession, useClearSession } from '@/middleware/useSession'

import LoggedOutNavbar from "@/components/LoggedOutNavbar"
import LoggedInNavbar from "@/components/LoggedInNavbar"
function Navbar() {
    const session=useSession();

console.log( session?.data !== null);


  return (
   session?.data !== null ? <LoggedInNavbar session={session?.data} clearSession={clearSession}/> : <LoggedOutNavbar session={session?.data}/>
  )
}

export default Navbar