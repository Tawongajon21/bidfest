"use client"
import React from 'react'
import Image from 'next/image'
import ImageOne from "../../public/images/photo-one.jpg"
import {FaCalendar,FaAngleRight} from "react-icons/fa6"
import {FaAngleDoubleRight} from "react-icons/fa"
import {FiSearch} from "react-icons/fi"
import {baseUrl,imageServerUrl} from "../../urls"
import { useQuery } from "@tanstack/react-query";
import { fetchAuctions } from "../../helpers/fetchData";
import { useState,useEffect,useRef,useMemo } from 'react';
import { FiX } from 'react-icons/fi'
import { useSession,clearSession,getSession, useClearSession } from '@/middleware/useSession'

import useLots from '../../helpers/useLots';
import AuctionCard from './auctionCard'
import { useRouter,useSearchParams } from 'next/navigation'
import AuctionsLoading from "../../components/AuctionsLoading"
function Wrapper() {
    const {data:session}=useSession();
    console.log(session);
    let userId=session?.payload._id;
    console.log(userId);
    const searchParams= useSearchParams();
    const term= searchParams.get("query")||""
    console.log(term);
    const [searchTerm, setsearchTerm] = useState("")
    const [propertyName, setPropertyName] = useState("")
    const [minimumPrice, setMinPrice] = useState("")
    const elementRef = useRef()
    const [vehicleType, setvehicleType] = useState("")
    const [itemType, setitemType] = useState("")
    
    const [maximumPrice, setMaxPrice] = useState("")
    const [submittedTerm, setsubmittedTerm] = useState(null)
    const [submittedSearch, setsubmittedSearch] = useState({})
    const {data,fetchNextPage,hasNextPage,isLoading,isFetching,isFetchingNextPage,refetch}=useLots(submittedSearch)
    const [location, setlocation] = useState("")
    const [openAdvancedSearch, setopenAdvancedSearch] = useState(false)


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
    console.log(data);

    const handleSearch=(e)=>{
e.preventDefault();
e.stopPropagation()
setsubmittedSearch({
    search:searchTerm ? searchTerm : propertyName,
    minimumPrice,
    maximumPrice,
    vehicleType : vehicleType ? vehicleType :"",
    itemType : itemType ? itemType :"",


    
})
setsubmittedTerm(submittedSearch)
//setopenAdvancedSearch(!openAdvancedSearch)
    }
console.log(data);
 let itemTypes=["All","Phone","Laptop","Tv","Cattle","Household","Car"]   
 const [category, setcategory] = useState("All")


    let locations= useMemo(()=>{
        if (!data?.pages) {
            return []
        } 

        let allLots=data.pages?.flatMap((page)=>page?.data||[]);
        let uniqueLocations=[...new Set(allLots.map((lot)=>lot?.auction?.auctionLocation).filter(Boolean))]
        return uniqueLocations
    },[data])

    useEffect(() => {
    if (elementRef.current) {
        let text=elementRef.current
        console.log(text);
    }
    }, [])
    console.log(term);

 
useEffect(() => {
if (vehicleType) {
    setsubmittedSearch({
     
        vehicleType : vehicleType 
    
        
    })
    setsubmittedTerm(submittedSearch)
    setsearchTerm(vehicleType)
}
if (itemType) {
    setsubmittedSearch({
     
        itemType : itemType 
    
        
    })
    setsubmittedTerm(submittedSearch)
    setsearchTerm(itemType)
}
if (term) {
    setsubmittedSearch({
     propertyName:term,
    })
    setsubmittedTerm(submittedSearch)
    setsearchTerm(term)
}
}, [itemType,term])
console.log(data);

let tempLots=data?.pages.map((page)=>page?.data);

let lots=tempLots?.flat();

let bids=lots?.map((item)=>{
    return item.bids
  })
  console.log(bids);
  let userBids=bids?.map((item)=>(
    item.find((bid)=>bid.user?._id===userId)
  ));
console.log(userBids);


  return (
    <>
<div className='flex justify-center bg-[#4f46e5] py-8 text-2xl   md:text-4xl font-bold  '>
    <h2 className='text-white '>
      Search for your next property
    </h2>
</div>
{
        openAdvancedSearch&& <div className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center">
<form onSubmit={
    handleSearch}>
<div  style={{
        paddingTop:"-3rem"
    }} className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
<p className='flex items-center content-center justify-between'>
    <p>
    <h2 className="text-2xl font-semibold mb-4 dark:text-black">
Advanced Search
</h2>
    </p>

<p className='mt-[-15px]'>
<FiX onClick={()=>{
    setopenAdvancedSearch(!openAdvancedSearch)
}} className='text-red-500 font-bold' size={20}/>
</p>
</p>


<p className='mb-2'>

    <p className='flex justify-between align-middle content-center'>

<p className='w-full'>
    <label htmlFor="" className="dark:text-black">
       Item Name
    </label>
 
    <input  type='text' onChange={(e)=>setPropertyName(e.target.value)}  placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md dark:border-gray-900 dark:text-black'/>

    </p>
    </p>
    <p className='flex justify-between align-middle content-center'>

<p className='w-full'>
    <label htmlFor=""  className="dark:text-black">
       Item Type
    </label>
 <select name="" id="" onChange={(e)=>{
    e.preventDefault()
    setitemType(e.target.value)
    }} className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md dark:border-gray-900 dark:text-black'>
{
    itemTypes.map((item)=>(
<option value={item}>{item}</option>
    ))
}

 </select>

    </p>
    </p>
    <p className='flex justify-between align-middle content-center'>

    </p>
    <p className='flex justify-between align-middle content-center'>

<p className='w-full'>
    <label htmlFor="" className="dark:text-black">
       Minimmum Price
    </label>
 
    <input onChange={(e)=>setMinPrice(e.target.value)}  type='number'   placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md dark:border-gray-900 dark:text-black'/>

    </p>
    </p>
    <p className='flex justify-between align-middle content-center'>

<p className='w-full'>
    <label htmlFor="" className="dark:text-black">
        Maximum Price
    </label>
 
    <input  type='number'  onChange={(e)=>setMaxPrice(e.target.value)}    placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md dark:border-gray-900 dark:text-black'/>

    </p>
    </p>
    <p className='flex justify-between align-middle content-center'>


    </p>
  

</p>




{
    /**
     * <input  type='number' value={amount} onChange={(e)=>setamount(e.target.value)}    placeholder='' className='w-full pl-4 pr-10 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>

     */
}
<p className='flex justify-center'>
<button type='submit'  className="bg-[#4f46e5] text-white px-4 py-2 cursor-pointer">
Search
</button>
</p>


</div>

 
</form>
 








                </div>
      }     
<div className=' flex justify-center mt-4 flex-wrap'>
    <form onSubmit={handleSearch}>
        <input onChange={(e)=>setsearchTerm(e.target.value)} type="text"  placeholder='Type your search here' className='w-80 md:w-120 py-2 border-black border-2 placeholder:text-1.5xl text-left pl-2 dark:border-white dark:border-2 dark:placeholder-white'/>
        <p className='grid align-center justify-center gap-3 md:flex align-center  mt-2 font-bold '>
            <button type="button" className='underline text-[18px]  cursor-pointer' onClick={()=>setopenAdvancedSearch(!openAdvancedSearch)}>
                Switch to advanced search
            </button>


            <button  type='submit' className='border-[#4f46e5] bg-[#4f46e5] text-white  border-2 font-bold px-12 py-2 cursor-pointer flex justify-center'>
            <FiSearch className='font-bold' size={20}/>
            </button>
        </p>
    </form>
</div>
<div className='grid justify-center'>
<div className="flex flex-wrap  gap-4 mt-3 mb-3">
{
itemTypes.map((cat)=>(
<button onClick={
    ()=>{
     
        setitemType(cat)
   
        /*
setcategory(cat)
setvehicleType(cat)

setsubmittedSearch((prev)=>(
    {
        ...prev,vehicleType:category
    }
))

console.log(vehicleType);
*/

}} key={cat}  className={`flex-1 min-w-[100px] border-1 px-4  min-h-[48px] bg-black  ${itemType === cat &&  "bg-[#4f46e5]"}     text-white cursor-pointer    dark:bg-gray-800/30 dark:backdrop-blur-sm dark:border-gray-700/50 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-indigo-600/20
               dark:hover:border-indigo-500/50 dark:hover:text-white
               dark:hover:shadow-lg dark:hover:shadow-indigo-500/30`}>
{cat}
</button>
))
}


</div>
<p className='font-bold text-[18px] mb-3 mb-5'>
    {
        submittedTerm && !isFetching && searchTerm !== "All" &&
        `${data?.pages[0]?.resultsFound === 1 ? `1 result found` : `${data?.pages[0]?.resultsFound} results found`} ` 
    }

 

</p>
</div>

<div className='grid'>

</div>
<div className='px-13 flex gap-10 flex-wrap  justify-center mt-5 '> 
{ 

isLoading ? <AuctionsLoading/> :
 data?.pages.map((page)=>
 page?.data?.map((lot)=>{

    let userHasBid=(bids=[],userId)=>{
    let getBid=bids.find(bid=>bid.user===userId)
    console.log(getBid);
    return  { hasBid: bids.some(bid=>bid.user===userId),bid:getBid}
    };
  
   return <AuctionCard
    key={lot._id}
    type={lot?.auction?.type}
    propertyName={lot.propertyName}
    auctionDate={lot.auctionDate}
    auctionDeadline={lot.auction?.auctionDeadline}
    auctionTime={lot.auction?.auctionTime}
userHadBid={userHasBid(lot.bids,userId)}
refetch={refetch}
userBids={userBids}
 id={lot._id} 
   auctionId={lot.auction?._id} 
   bids={lot.bids.length} 
startDateTime={lot.auction?.startDateTime} 
lotImages={lot?.lotImages}
  exteriorImages={lot?.lotImages}
   sold={lot.sold} 
   code={lot.code} 
   startingPrice={lot.startingPrice}
    location={lot?.auction?.location}
   openTime={lot?.auction?.openTime}
   closeTime={lot?.auction?.closeTime}
      mileage={lot.mileage}
       currentPrice={lot.currentPrice}
isLive={lot.isLive}

    />
})
 )
 

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

export default Wrapper
