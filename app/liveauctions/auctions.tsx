"use client"
import React from 'react'
import Image from 'next/image'

import Link from 'next/link'
import { useState,useMemo } from 'react'
import {imageServerUrl} from "../../urls"
import AuctionsLoading from "@/components/AuctionsLoading"
import AuctionTimer from '@/components/AuctionTimer'
export default function AuctionClient({data,isLoading}) {

    
  const [currentPage, setcurrentPage] = useState(1)

  const itemsPerPage=4;
  const windowSize=4
  const totalPages=Math.ceil(data?.length/itemsPerPage);

  const currentAuctions=useMemo(()=>{
    const start=(currentPage-1)*itemsPerPage;

    return data?.slice(start,start+itemsPerPage)
  },[data,currentPage])
  const windowStart=Math.floor((currentPage-1)/windowSize)*windowSize+1;

  const windowEnd=Math.min(windowStart+windowSize-1,totalPages);

const pageNumbers=[];
for(let i=windowStart;i<=windowEnd;i++){
pageNumbers.push(i)
}
   // const isLastBatch=currentWindowEnd===totalPages;
   // const isFirstBatch=currentWindowStart===1
/*
   const handlePageClick=(page)=>{
    setcurrentPage(page)
if (page>windowEnd) {
    setWindowStart(windowStart+windowSize)
}
if (page<windowStart) {
    setWindowStart(Math.max(1, windowStart-windowSize))
}
}
*/
function formatDate(auctionDate) {
    const date= new Date(auctionDate);
const formattedDate=date.toLocaleDateString('en-US',{
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
});
return formattedDate
}
console.log(currentAuctions);
const localTime=(date)=>{
  const newDate= new Date(date);
  const utcHours=String(newDate.getUTCHours()).padStart(2,'0');
  const utcMinutes=String(newDate.getUTCMinutes()).padStart(2,'0')
  const time = `${utcHours}:${utcMinutes}`
  return time
}
  return (
    <>
<div className='bg-[#4f46e5] py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
    <h2 className='text-white'>
        Live Auctions
    </h2>
</div>

<div className="mt-6 flex justify-center gap-6 mb-5">
 
 


{
    pageNumbers.map(i=>(
      <button style={{
        fontSize:"1.2rem"
    }} 
    key={i}

    onClick={()=>setcurrentPage(i)}
 
    
    className={`cursor-pointer  font-bold ${i===currentPage ? "border-2 border-[#4f46e5] px-5 py-3 rounded-md text-white bg-[#4f46e5]" : "border-2 border-white text-[#0A2540] px-5 py-3 rounded-md box-shadow-md"} `}>
  {i}
    </button>
    ))
}




</div>


<div className=' px-13 flex gap-14 flex-wrap  justify-center'> 

{
  isLoading ? <AuctionsLoading/> :
   currentAuctions.map((auction)=>(
  



   <div  key={auction?._id} style={{
    boxShadow:"10px 10px 10px rgba(0,0,0,0.2)"
}} className='w-80 md:w-96 rounded-lg overflow-hidden shadow-xl bg-white '>
<Image src={`${imageServerUrl}${auction.featuredImage[0].newPath}`}     loading='lazy'
         placeholder='blur'
         blurDataURL={`${imageServerUrl}${auction.featuredImage[0].thumbnail}`}  alt='Alternate Image' width={500} height={500} className='w-full h-50 object-cover mb-0.4'/>
<div className='p-5 bg-[#0A2540] text-white'>

<h5 className='text-xl font-semibold mb-2'>

            {auction.name}
         
</h5>
{
    auction.type === "Onsite" &&   <h5 className='text-xl font-semibold mb-4 flex justify-between align-middle items-center'>
    <span>
    Auction Location 
    </span>
    <span>
    {auction.location}
    </span>
  
  </h5>
  }

<h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
  <span>
  Auction Type
  </span>
  <span>
  {auction.type}
  </span>

</h5>
<h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
  <span>
 Number of Lots
  </span>
  <span>
  {auction.lots?.length}
  </span>

</h5>
{
  auction.type === "Onsite" &&    <h5 className='text-[17px] font-semibold mb-4 flex justify-between align-middle items-center'>
  <span>
Auction Date
  </span>
  <span>
  
  {formatDate(auction.startDateTime)}
  </span>

</h5>
  }
  {
  auction.type === "Onsite" &&    <h5 className='text-[17px] font-semibold mb-4 flex justify-between align-middle items-center'>
  <span>
Auction Start Time
  </span>
  <span>
  
  {localTime(auction.startDateTime)}
  </span>

</h5>
  }

{
    auction.type === "Online" && <AuctionTimer color={null} closeTime={auction.closeTime} openTime={auction.openTime}/>
}
<div className='flex items-center justify-center mt-4'>

<Link href={`/auctions/${auction?._id}`} className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-4 py-2 rounded-md font-medium cursor-pointer'>
View Auction
</Link>
</div>
</div>
</div>




   ))
}


</div>

    </>
  )
}






{
  /**
    <section>
        <Image
         src={`${imageServerUrl}${auction.featuredImage[0].newPath}`} 
         alt='Auction Lot' width={350} 
         loading='lazy'
         placeholder='blur'
         blurDataURL={`${imageServerUrl}${auction.featuredImage[0].thumbnail}`} 
         height={350}/>

    </section>
    <main className=''>
        <div className=' '>
        <h3 className='px-2 py-2 font-bold text-1xl flex gap-2 align-middle bg-[#f7c336] '>
         <FaCalendar size={20}/>    {auction.auctionName}
        </h3>
        </div>
      <div className='mt-2'>
        <h2 className='px-2 font-bold text-2xl capitalize'>
        {auction.auctionName}
        </h2>
      </div>
        <div className='px-2 mt-2 '>
            <ul className="py-2">
                <li className='flex justify-between'>
                <b className='text-[19px]'>
                  Location
                    </b>     <span className='text-[19px]'>
                       {auction.auctionLocation}
                    </span>           
                </li>
                <li className='flex justify-between'>
                <b className='text-[19px]'>
                    Date
                    </b>     <span className='text-[19px]'>
                    {
                        formatDate(auction.auctionDate)
                      }
                    </span>
                </li>
                <li className='flex justify-between'>
                <b className='text-[19px]'>
                  Number of Lots
                    </b>     <span className='text-[19px]'>
                       {auction.lots.length}
                    </span>
                </li>
                <li className='flex justify-between'>
                <b className='text-[19px]'>
                  Auction Type
                    </b>     <span className='text-[19px]'>
                       {auction?.auctionType}
                    </span>
                </li>
                <li className='flex justify-center py-2'>
                    <Link href={`/auctions/${auction._id}`}>
                    
                    <button style={{
                         cursor:"pointer"
                    }}  
                    
                    className='border-black border-3 text-black px-15 py-2 mt-4 tracking-wide  '>
                        View
                    </button>
                    </Link>
                 
                </li>

            </ul>
        </div>
    </main> */
}