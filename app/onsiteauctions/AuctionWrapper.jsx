"use client"
import React from 'react'
import Image from 'next/image'
import ImageOne from "../../public/images/photo-one.jpg"
import {FaRegSquareCaretRight} from "react-icons/fa6"
import {FaCalendar,FaAngleRight} from "react-icons/fa6"
import {FaAngleDoubleRight} from "react-icons/fa"
import { fetchAuctions } from "../../helpers/fetchData";
import { useQuery,useQueries } from "@tanstack/react-query";
import classifyAuctions from '../../helpers/classifyAuctions'
import AuctionClient from "./auctions"
import useOnsiteAuctions from "./useOnsiteAuctions"
import { useMemo,useEffect,useState,useRef } from 'react'
import Link from 'next/link'
import { imageServerUrl } from '../../urls'
import AuctionsLoading from '../../components/AuctionsLoading'
function AuctionWrapper() {
    const {data,fetchNextPage,hasNextPage,isLoading,isFetching,isFetchingNextPage}=useOnsiteAuctions()
console.log(data);
    let observerRef=useRef();
    useEffect(() => {
 if (!observerRef.current||!hasNextPage) {
    return
 }
 const observer=new IntersectionObserver(([entry])=>{
    if (entry.isIntersecting) {
        fetchNextPage()
    }

 })
 observer.observe(observerRef.current);
 return ()=>observer.disconnect()
    }, [hasNextPage,fetchNextPage])
 
    const [currentPage, setcurrentPage] = useState(1)

    const itemsPerPage=4;
    const windowSize=4
    const totalPages=Math.ceil(data?.length/itemsPerPage);

    const currentAuctions=useMemo(()=>{
      const start=(currentPage-1)*itemsPerPage;
      return data?.pages.slice(start,start+itemsPerPage)
    },[data,currentPage])
    const windowStart=Math.floor((currentPage-1)/windowSize)*windowSize+1;
  
    const windowEnd=Math.min(windowStart+windowSize-1,totalPages);
  
  const pageNumbers=[];
  for(let i=windowStart;i<=windowEnd;i++){
  pageNumbers.push(i)
  }
  const formatDate=(date)=>{
    let dateObj=new Date(date)
    let optionsDate={day:"numeric",month:"long",year:"numeric"}
    let formattedDate=dateObj.toLocaleDateString("en-GB",optionsDate)
    let time= dateObj.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:false})
    return {date:formattedDate,time}
}
 
const localTime=(date)=>{
  let newDate= new Date(date);
  let utcHours=String(newDate.getUTCHours()).padStart(2,'0');
  let utcMinutes=String(newDate.getUTCMinutes()).padStart(2,'0')
  let time = `${utcHours}:${utcMinutes}`
  return time
}
  return (

    <>
<div className='bg-[#4f46e5] py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
    <h2 className='text-white'>
        Onsite Auctions
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
<div className='px-13 flex gap-10 flex-wrap  justify-center'>

{
  isLoading ? <AuctionsLoading/> :  
 data?.pages.map((page)=>
 page?.data?.map((auction,idx)=>{
return   <div style={{
 boxShadow:"10px 10px 10px rgba(0,0,0,0.2)"
}} className='w-80 md:w-96 rounded-lg overflow-hidden shadow-xl bg-white '>
<Image src={`${imageServerUrl}${auction.featuredImage[0].newPath}`}     loading='lazy'
      placeholder='blur'
      blurDataURL={`${imageServerUrl}${auction.featuredImage[0].thumbnail}`}  alt='Alternate Image' width={500} height={500} className='w-full h-50 object-cover mb-0.4'/>
<div className='p-5 bg-[#0A2540] text-white'>

<h5 className='text-xl font-semibold mb-2'>

         {auction.name}
      
</h5>
<h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
<span>
Auction Location 
</span>
<span>
{auction.location}
</span>

</h5>
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
<h5 className='text-[17px] font-semibold mb-2 flex justify-between align-middle items-center'>
<span>
Auction Date
</span>
<span>
{formatDate(auction.startDateTime).date}
</span>

</h5>
<h5 className='text-[17px] font-semibold mb-2 flex justify-between align-middle items-center'>
<span>
Auction Start Time
</span>
<span>
{localTime(auction.startDateTime)}
</span>

</h5>
<div className='flex items-center justify-center mt-4'>

<Link href={`/auctions/${auction?._id}`} className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-4 py-2 rounded-md font-medium cursor-pointer'>
View Auction
</Link>
</div>
</div>
</div>

 }))

}


</div>

<div ref={observerRef}>
{
    isFetchingNextPage && <p>
        Loading more ....
    </p>
}
</div>



    </>
 
 
    
  )
}

export default AuctionWrapper