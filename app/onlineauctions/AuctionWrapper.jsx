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
import useOnlineAuctions from "./useOnlineAuctions"
import { useMemo,useEffect,useState,useRef } from 'react'
import Link from 'next/link'
import AuctionsLoading from '../../components/AuctionsLoading'
import { imageServerUrl } from '../../urls'
import AuctionTimer from './AuctionTimer'

function AuctionWrapper() {
    const {data,fetchNextPage,hasNextPage,isLoading,isFetching,isFetchingNextPage}=useOnlineAuctions()
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
    const formatDate=(date)=>{
      let dateObj=new Date(date)
      let optionsDate={day:"numeric",month:"short",year:"numeric"}
      let formattedDate=dateObj.toLocaleDateString("en-GB",optionsDate)
      let time= dateObj.toLocaleTimeString("en-ZW",{timeZone:"Africa/Harare",hour:"2-digit",minute:"2-digit",hour12:false})
      return {date:formattedDate,time}
  }


  const [timeleft, settimeleft] = useState({});
  const [expired, setexpired] = useState(false)

  return (

    <>
<div className='bg-[#4f46e5] py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
    <h2 className='text-white'>
    Online Auctions
    </h2>
</div>


<div className='px-13 flex gap-10 flex-wrap  justify-center'>
  

{
  isLoading===true ? <AuctionsLoading/>  :
 data?.pages.map((page)=>
 page?.data?.map((auction,idx)=>{
return  <div style={{
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

<h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                     Start Bidding Date
                     </span>
                     <span>
                     {formatDate(auction.openTime).date} 
                     </span>



                 </h5>
                 <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                     Start Bidding Time
                     </span>
                     <span>
                     {formatDate(auction.openTime).time} 
                     </span>



                 </h5>
                 <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                     End Bidding Date
                     </span>
                     <span>
                     {formatDate(auction.closeTime).date} 
                     </span>



                 </h5>
                 <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                    End Bidding Time
                     </span>
                     <span>
                     {formatDate(auction.closeTime).time} 
                     </span>



                 </h5>


<AuctionTimer openTime={auction.openTime} closeTime={auction.closeTime}/>



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


{
  /*
  type === "Online" &&  <>
         <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                     Start Bidding Date
                     </span>
                     <span>
                     {formatDate(openTime).date} 
                     </span>



                 </h5>
         <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                     Start Bidding Time
                     </span>
                     <span>
                     {formatDate(openTime).time} 
                     </span>



                 </h5>
         <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                     End Bidding Date
                     </span>
                     <span>
                     {formatDate(closeTime).date} 
                     </span>



                 </h5>
         <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                    End Bidding Time
                     </span>
                     <span>
                     {formatDate(closeTime).time} 
                     </span>



                 </h5>
                 <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                         Current Price
                     </span>
                     <span>
                     {formatCurrency(currentPrice)}
                     </span>

                 </h5>
                 <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                     <span>
                         Auction Type
                     </span>
                     <span>
                         {type}
                     </span>

                 </h5>
                 {
                      timeleft === "Auction not opened yet" &&      <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                      <span>
                     Auction Status
                      </span>
                      <span>
                          {timeleft}
                      </span>

                  </h5>
                 }
             
                 {
                      timeleft !== "Auction not opened yet" &&      <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                      <span>
                     Time Left
                      </span>
                      <span>
                          {timeleft}
                      </span>

                  </h5>
                 }
             
                       
               
         
                 <div className='flex items-center justify-center mt-4'>



                     <p className='flex justify-between gap-14'>
                      
                         {
                             type === "Online" ? <>
                                 {
                                     userHadBid.hasBid ? <>
                                         <button
                                             onClick={
                                                 () => {
                                                     if (session) {

                                                         setloggedIn(true)
                                                         setgetUserBid(userHadBid?.bid)
                                                         setIsEdit(!isEdit)

                                                     } else {
                                                         setloggedIn(false);
                                                         redirect(`/login?from=/auctions/${auctionId}`)
                                                     }
                                                 }
                                             }

                                             className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-6 py-2 rounded-md font-medium cursor-pointer'>
                                             Edit Bid
                                         </button>
                                         <button
                                             onClick={
                                                 () => {
                                                     if (window.confirm(`Are you sure you want to delete your bid for ${propertyName}?`)) {
                                                         handleDelete(userHadBid?.bid._id)
                                                         refetch()
                                                     }
                                                 }




                                             }

                                             className='bg-white  text-red-500 text-sm px-6 py-2 rounded-md font-medium cursor-pointer'>
                                             Cancel Bid
                                         </button>
                                     </> : <>
{
 timeleft !== "Auction not opened yet" &&   <button
 onClick={
     () => {
         if (session) {

             setloggedIn(true)
             setbidPlaced(!bidPlaced)
             setIsOpen(!isOpen)
         } else {
             setloggedIn(false);
             redirect(`/login?from=/auctions/${auctionId}`)
         }
     }
 }

 className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-4 py-2 rounded-md font-medium cursor-pointer'>
 Bid Item
</button>
}
                                       
                                         <Link href={`/lots/${id}`}  className='bg-white hover:bg-[#7a6bff] hover:text-white text-[#7a6bff] text-sm px-4 py-2 rounded-md font-medium cursor-pointer'>
                                             More Info
                                         </Link>
                                     </>
                                 }



                             </> :
                                 <Link href={`/lots/${id}`} className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-6 py-2 rounded-md font-medium cursor-pointer'>
                                     More Information
                                 </Link>
                         }








                     </p>



                 </div>
  </>
  */
}