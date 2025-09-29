"use client"
import React from 'react'
import Image from 'next/image'
import ImageOne from "../../public/images/photo-one.jpg"
import {FaCalendar,FaAngleRight, FaAngleLeft} from "react-icons/fa6"
import {FaAngleDoubleLeft, FaAngleDoubleRight} from "react-icons/fa"
import Link from 'next/link'
import { useState,useMemo } from 'react'
import {baseUrl,imageServerUrl} from "../../urls"
export default function AuctionClient({data,auctionType}) {
    console.log(data);
    
  const [currentPage, setcurrentPage] = useState(1)

  const itemsPerPage=6;
  const windowSize=5
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

  return (
    <>
<div className='bg-blue-500 py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
    <h2 className='text-white'>
        Upcoming Auctions
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
<div className='flex  justify-center md:flex flex-wrap'>
  

{
   currentAuctions?.map((auction,idx)=>(
    <Link key={idx} href={`/auctions/${auction._id}`}>
   
<div className="w-350 mt-4 md:ml-29"  key={idx} style={{
    width:"350px",
    boxShadow:"0 0 10px rgba(0,0,0,0.8)",
    cursor:"pointer"
}}>
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
    </main>
</div>
</Link>
   ))
}


</div>



    </>
  )
}


