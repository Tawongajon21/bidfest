
'use client'
import React from 'react'
import Logo from "../public/images/logo.svg"
import Image from 'next/image'
import Link from 'next/link'
import {AiOutlineMenu} from "react-icons/ai"
import {MdClose} from "react-icons/md"
import useSession from "@/middleware/useSession"
import { useState,useEffect,useRef } from 'react'
import {FaSearch,FaBell,FaGavel,FaArrowDown} from "react-icons/fa"
import {FiX} from "react-icons/fi"
import {HiChevronDown} from "react-icons/hi"
import  {io}  from 'socket.io-client'
import {IoNotificationsOutline,IoSearchOutline} from "react-icons/io5"
import { serverUrl } from '@/urls'
import useSocket from "../hooks/useSocket"
import CarBg from "@/public/images/car-bg.png";
import  {fetchNotifications}  from "../helpers/fetchNotifications";
import {markNotificationRead} from "../helpers/markAsRead"
import {imageServerUrl} from "@/urls"
import { useQuery, useQueryClient,useMutation } from "@tanstack/react-query";
import timeAgo from "@/helpers/timeAgo"
import EmptyNotification from "@/public/images/empty-notifications.png"
import useNotifications from "@/helpers/useUnreadNotifications"
export default function LoggedOutNavbar({session}) {


    const [selected, setselected] = useState('')
    const [personalBar, setpersonalBar] = useState(false)

    const [toggleDropdown, settoggleDropdown] = useState(false)
    const [isOpen, setisOpen] = useState(false)






  return (

    <>
   <header className=' py-4'>
    <nav className='container flex justify-between items-center w-[92%] mx-auto'>
<div className="cursor-pointer" > 
<Link href="/">
<h2 style={{
    color:"#4f46e5" 
}} className="text-2xl font-bold ">
    BidFirst
</h2>
</Link>

</div>
{
    /**Mobile Navbar Begins Here */
}

{
    !session &&
    <button onClick={()=>setisOpen(!isOpen)} className={`md:hidden flex justify-center w-8  rounded-full align-middle content-center`}>

<b>
    {
        isOpen === true ?   <MdClose size={20}/>  : <AiOutlineMenu size={20}/> 
    }

</b>




</button>
}

{
    /**PC View  */
}



{
    !session &&  <ul className="hidden  md:flex justify-center items-center content-center gap-7">
         <li className='text-center'>
<Link className='text-lg text-gray-900' href="/searchpage">
    <b>
    Search
    </b>

</Link>
    </li>
    <li>
<Link className='text-lg' href="/liveauctions">
    <b>
    Live Auctions
    </b>

</Link>
    </li>
    <li>
<Link className='text-lg' href="/upcomingauctions">
    <b className='text-gray-900'>
    Upcoming Auctions
    </b>

</Link>


    </li>
    <li>
    <Link className='text-lg' href="/onsiteauctions">
    <b className='text-gray-900'>
   Onsite Auctions
    </b>

</Link>
    </li>
    <li>
    <Link className='text-lg' href="/onlineauctions">
    <b className='text-gray-900'>
  Online Auctions
    </b>

</Link>
    </li>

</ul>
}



{
    !session &&  <div className="hidden md:flex gap-7">
    <Link href="/login" style={{
     color:"#4f46e5",
     borderColor:"#4f46e5"
    }} className='text-lg border border-solid   px-8 py-1.25  rounded-sm'>
           Login
        </Link>
    <Link style={{
     color:"white",
     borderColor:"#4f46e5",
     border:"1px solid #4f46e5",
     backgroundColor:"#4f46e5"

    }} href="/register"  className='text-lg border border-solid   px-8 py-1.25  rounded-sm'>
     Signup
    </Link>
      
    </div>
}





    </nav>
   </header>
   
{
    isOpen && <div className="shadow transition duration-1000 ease-in  grid justify-center top-1  z-50 list-none gap-5 align-center ">
    <li className='text-center'>
<Link className='text-lg text-gray-900' href="/searchpage">
Search
</Link>
    </li>
    <li className='text-center'>
<Link className='text-lg text-gray-900' href="/liveauctions">
Live Auctions
</Link>
    </li>
    <li className='text-center'>
<Link className='text-lg text-gray-900' href="/upcomingauctions">
Upcoming Auctions
</Link>
    </li>
    <li className='text-center'>
<Link className='text-lg text-gray-900' href="/onlineauctions">
Online Auctions
</Link>
    </li>
    <li className='text-center'>
<Link className='text-lg text-gray-900' href="/onsiteauctions">
Onsite Auctions
</Link>
    </li>
    <li className='text-center'>
<Link className='text-lg text-gray-900' href="/">
Contact us
</Link>
    </li>
    <li className='text-center'>
 

    <Link href="/login" style={{
     color:"#4f46e5",
     borderColor:"#4f46e5"
    }} className='text-lg border border-solid   px-8 py-1.25  rounded-sm'>
           Login
        </Link>
    </li>
   
    <li className='mb-6 text-center'>
    <Link style={{
     color:"white",
     borderColor:"#4f46e5",
     border:"1px solid #4f46e5",
     backgroundColor:"#4f46e5"

    }} href="/register"  className='text-lg border border-solid   px-8 py-1.25  rounded-sm'>
     Signup
    </Link>
    </li>
</div>
}

   </>
  )
}

