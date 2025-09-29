"use client"
import React from 'react'
import AuctionCard from "../../../components/auctionCard"

import useSession from "@/middleware/useSession"
function AuctionClient({refetch,data,userBids,previousPathName}) {
  const {session}=useSession();
  let signature=session?.signature
  console.log(data);



  return (
    <>
    
    <div className='bg-[#4f46e5] py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
        <h2 className='text-white'>
           {
            data?.name
           }
        </h2>
    </div>
    <div className=' px-13 flex gap-14 flex-wrap  justify-center mt-5 '> 

    {
      data?.lots.map((item,id)=>(
        <AuctionCard startDateTime={data.startDateTime} type={data?.type}  refetch={refetch} auctionType={data.auctionType}   key={item._id} closeTime={data.closeTime} openTime={data.openTime}  item={item} previousPathName={previousPathName} userBids={userBids}  id={item._id}   auctionId={data._id} bids={item.bids.length}  auctionDate={data.auctionDate} auctionDeadline={data.auctionDeadline} auctionTime={data.auctionTime}    sold={item.sold} code={item.code} startingPrice={item.startingPrice}  location={item.location} propertyName={item.propertyName} mileage={item.mileage} currentPrice={item.currentPrice} expectedPrice={item.expectedPrice} lotImages={item.lotImages}/>
      ))
    }
       
 
        </div>
        </>
  )
}

export default AuctionClient