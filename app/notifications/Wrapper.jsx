

"use client"
export const dynamic="force-dynamic"
import React from 'react'
import { serverUrl } from '@/urls'
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import {FaCar,FaRev,FaGasPump,FaGavel,FaSignOutAlt} from "react-icons/fa"
import { FiX } from 'react-icons/fi'
import {AiFillStar} from "react-icons/ai"
import {BiChair,BiCar,BiCalendar} from "react-icons/bi"
import {BsCarFront,BsSpeedometer} from "react-icons/bs"
import {FaDoorOpen,FaPerson} from "react-icons/fa6"
import Image from 'next/image'
import image from "@/public/images/car-bg.png"
import { imageServerUrl,baseUrl } from '@/urls'
import {fetchPersonalBids} from "../../helpers/getPersonalBids"
import {fetchNotifications} from "../../helpers/fetchNotifications"
import {fetchLots} from "../../helpers/fetchLots"
import {fetchLot} from "../../helpers/fetchLot"
import { useQuery,useQueries, useQueryClient,useMutation } from "@tanstack/react-query";
import { useSession,clearSession,getSession, useClearSession } from '@/middleware/useSession'

import {markNotificationRead} from "../../helpers/markAsRead"
import timeAgo from "@/helpers/timeAgo"
import EmptyNotification from "@/public/images/empty-notifications.png"
import  {io}  from 'socket.io-client'
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import useNotifications from '../../helpers/useNotifications';

import AuctionIcon from "../../public/icons/auction-icon.png"

import useMarkAllAsRead from "../../helpers/markAllAsRead"


export default function Wrapper() {
  const [page, setpage] = useState(1);
  const [filterRead, setfilterRead] = useState(null);
  const [cursor, setcursor] = useState(null);
  const [hasMore, sethasMore] = useState(true)

const [session, setsession] = useState(null);
useEffect(() => {
  
let sessionData= getSession();
setsession(sessionData)
 
}, [])

if (!session) {
    return
}
    console.log(session);
    let queryClient=useQueryClient();
    let PAGE_SIZE=5
    const [socket, setsocket] = useState(null)
const {data,fetchNextPage,hasNextPage,isLoading,isFetching,isFetchingNextPage}=useNotifications()
let information=useNotifications()
console.log(information.data);
   let id=session?.payload._id;
   let userId=id
console.log(data);

const {mutate:markRead}=useMutation(markNotificationRead,{
  onSuccess:()=>{
      queryClient.invalidateQueries("notifications")
  }
})




  useEffect(() => {
    const socketIo=io(serverUrl,{
          auth:{
              token:localStorage.getItem("signature")
          }
      }); 
    
  setsocket(socketIo)

socketIo.on("connection",(socket)=>{
  console.log(userId);
  console.log(socket);
  
  




})

socketIo.emit("add-user",userId);
socketIo.on("newNotification",(data)=>{
  console.log("Received Notification", data);
  
})
socketIo.on("notification",(newNotif)=>{
queryClient.setQueryData(["notifications"],()=>{
  queryClient.invalidateQueries(['notifications'])
})
})
const handleScroll=()=>{
  if (window.innerHeight+document.documentElement.scrollTop+50>=document.documentElement.offsetHeight) {
    if (hasNextPage&&!isFetchingNextPage) {
      fetchNextPage()
    }
  }
}
window.addEventListener("scroll",handleScroll);
return ()=>window.removeEventListener("scroll",handleScroll)


  }, [queryClient])



const loadMore=()=>{

}
console.log(session)

const {mutate:markAllAsRead,isLoading:refetchingLoading}= useMarkAllAsRead();

if (isLoading) {
  return <h1>Loading.....</h1>
}

return (
    <>
    <div className='bg-blue-500 py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
        <h2 className='text-white'>
          Your Notifications
        </h2>
    </div>
<div   style={{
  justifyContent:"end"
}} className='flex mr-8 mt-4'>
  <button onClick={()=>markAllAsRead()} disabled={refetchingLoading} style={{
    borderColor:"gray"
  }} className='border-1  px-5 py-3 cursor-pointer text-gray-500'>
    Mark As Read
  </button>
</div>

    <div style={{
      width:"100%"
    }} className=' px-13 grid    mt-5 md:gap-4 sm:w-[100%] gap-4'> 


   {
    
    data?.length === 0 ?    <div className='pl-4 mb-4'>
    <h2>
       You have no new notifications at the moment,please check again later
    </h2>
    <div className='flex justify-center'>
    <Image src={EmptyNotification} width={90} height={90} alt='Empty Notification Bar'/>
    </div>
   
   </div> 
     :
 data?.pages?.flatMap((page)=>page.data)?.map((item)=>(
  
<section onClick={()=>{
      markRead(item._id)
  }}   className={`flex   items-center w-[100%] cursor-pointer  px-3
  ${item?.read===true ? "bg-white" : "bg-blue-100"}
`} style={{

  width:"100%"
}}>
  <main>
  {
      item?.lot  !== null && <div>
  {
  item?.lot.exteriorImages?.[0] &&
  
    
      item.lot.exteriorImages?.map((item,index)=>{
          if (index===0) {
              return <div className='w-full max-w-3xl mx-auto aspect-w-1 aspect-h-1'>
          {
            item.newPath ?     <Image key={index} src={`${serverUrl}/${item.newPath}`}  className=" object-cover rounded-lg"  alt='Notification Image'/>
   :
   <Image src={AuctionIcon} className=" object-cover rounded-lg" alt='Auction Icon' />
          }


              </div>
           
            }
    
      })
      
      
  
  }
      
      </div> 
      }
     {
      item.auction !== null ? <div>
  {
  item.auction.featuredImage?.[0] &&
  
    
      item.auction.featuredImage?.map((item,index)=>{
          if (index===0) {
              return <div className='w-full max-w-3xl mx-auto aspect-w-1 aspect-h-1'>
   <Image key={index} src={`${serverUrl}/${item.newPath}`} className=' object-cover rounded-lg' width={250} height={250}  alt='Notification Image'/>
         
              </div>
           
            }
    
      })
      
      
  
  }
      
      </div>  :  <Image src={AuctionIcon} height={80} width={80} alt='Auction Icon' />

      }
  

 
  </main>
  <div  >
    <p className='text-sm pl-2 text-gray-500'>
    {item?.message} 
    </p>
    <p className='text-sm mt-2 pl-2 text-gray-500'>
          {
            timeAgo(item?.createdAt)
          }
      </p>

  </div>
  
</section>




 ))



  

     
   }
 


 
{
  hasNextPage&& (
    <button onClick={()=>fetchNextPage()} disabled={isFetching}>
{
  isFetching ? "Loading" : "Load More"
}
    </button>
  )
}

        </div>
        </>
  )
}

