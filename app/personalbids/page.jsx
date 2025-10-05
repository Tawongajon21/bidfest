"use client"
import React from 'react'
export const dynamic="force-dynamic"
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
import {fetchLots} from "../../helpers/fetchLots"
import {fetchLot} from "../../helpers/fetchLot"
import { useQuery,useQueries } from "@tanstack/react-query";
import { useSession,clearSession,getSession, useClearSession } from '@/middleware/useSession'

import PersonalBidCard from './personalBidCard';
import LotLoadingSkeleton from "../../components/LotLoadingSkeleton"
import AuctionsLoading from '../../components/AuctionsLoading';
function Page() {
  const [session, setsession] = useState(null);
  useEffect(() => {
    
  let sessionData= getSession();
  setsession(sessionData)
   
  }, [])
  
  
   let id=session?.payload._id;
   console.log(id);
    const {data,isLoading,error,refetch}=useQuery({
        queryKey:["bids",id],
        queryFn:fetchPersonalBids,
        enabled:false,
        refetchOnWindowFocus:false,
        refetchOnMount:false,
        refetchOnReconnect:false,
        staleTime:"Infinity"
      
    })

    const lotQueries=useQueries({
   queries:(data||[]).map(bid=>({
    queryKey:["lot",bid.lot],
    queryFn:()=>fetchLot(bid.lot),
    enabled:!!bid.lot
   }))
      
    })


  let bids=data   ? data : [];

console.log(bids);

//console.log(grouped);



    let router=useRouter();



    const [text, settext] = useState(" 11d 30hrs 50mins 10seconds")
    const [timeleft, settimeleft] = useState({days:0,hours:0,minutes:0,seconds:0})
const [bidPlaced, setbidPlaced] = useState(false)
const [showPrice, setshowPrice] = useState(false)
const [loggedIn, setloggedIn] = useState(null)
const [isOpen, setIsOpen] = useState(false)
let lot= "id"
const [amount, setamount] = useState("");


const [info, setinfo] = useState([])
console.log(bids);

useEffect(() => {
  const timer=setTimeout(()=>{
    refetch()
  },2000)
return ()=>clearTimeout(timer)
}, [refetch])

return (
    <>
    <div className='bg-[#4f46e5] py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
        <h2 className='text-white'>
          Your Bids
        </h2>
    </div>
    <div  className='px-13 flex gap-10 flex-wrap  justify-center mt-5'> 
   
    {
  isLoading ? <AuctionsLoading/> :   
    bids?.map((item,index)=>(
<PersonalBidCard
refetch={refetch}
item={item}
bidId={item?.bidId}
amount={item?.amount}
auctionId={item?.lot.auction}
auctionDate={item?.auction?.auctionDate}
auctionDeadline={item?.auction?.auctionDeadline}
auctionTime={item?.auction?.auctionTime}
auctionType={item?.auction?.auctionType}
code={item?.lot.code}
createdAt={item.lot.createdAt}
currentPrice={item.lot.currentPrice}
expectedPrice={item.lot.expectedPrice}
exteriorImages={item.lot.exteriorImages}
lotImages={item?.lot?.lotImages}
interiorImages={item.lot.interiorImages}
keyAvailable={item.lot.keyAvailable}
location={item.lot.location}
mileage={item.lot.mileage}
propertyName={item.lot.propertyName}
sold={item.lot.sold}
startingPrice={item.lot.startingPrice}
updatedAt={item.lot.updatedAt}
_id={item._id}
rank={item?.rank}
key={item.bidId}
id={item._id}
buyersPremium={item?.buyersPremium}
vat={item?.vat}
totalWithVat={item?.totalWithVat}
cashHandling={item?.cashHandling}
totalWithVatWithCashHandling={item?.totalWithVatWithCashHandling}
openTime={item.auction.openTime}
closeTime={item.auction.closeTime}
  />
    ))

} 
    


 
        </div>
        </>
  )
}

export default Page