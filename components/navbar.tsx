import React from 'react'
import useSession from "@/middleware/useSession"
import LoggedOutNavbar from "@/components/LoggedOutNavbar"
import LoggedInNavbar from "@/components/LoggedInNavbar"
function Navbar() {
    const {session,clearSession}=useSession();
console.log(session);

  return (
   session !== null ? <LoggedInNavbar session={session} clearSession={clearSession}/> : <LoggedOutNavbar session={session}/>
  )
}

export default Navbar