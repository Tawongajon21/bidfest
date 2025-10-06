"use client"
import React from 'react'
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { fetchLot } from '../../../helpers/fetchLot';
import {use} from "react"
import { useSession,clearSession,getSession, useClearSession } from '@/middleware/useSession'
import { useEffect } from 'react';
import { useRef,useState } from 'react';
import ImageComponent from './Image';
import useCountdown from '../../../helpers/useCountdown';
import Image from 'next/image';
import {FaArrowLeft} from "react-icons/fa"
import { usePathname } from 'next/navigation'
import {usePreviousRoute} from '../../../helpers/usePreviousPath';
import { FiX } from 'react-icons/fi';
import { useContext } from 'react';
import Link from 'next/link';
import { FaCalculator } from 'react-icons/fa';
import {redirect} from "next/navigation"
import {placeBid} from "@/helpers/addBid"
import {updateBid} from "@/helpers/updateBid";
import LotLoadingSkeleton from './LotLoadingSkeleton';
import AuctionTimer from '@/components/AuctionTimer';
function Page({params}) {
  const [session, setsession] = useState(null);
  useEffect(() => {
    
  let sessionData= getSession();
  setsession(sessionData)
   
  }, [])
  
let previousRoute=usePreviousRoute();
let queryClient=useQueryClient();
console.log(previousRoute);
    const {id}=use(params);
    
    let userId=session?.payload._id;
    let signature=session?.token;

    const {data,isLoading,error,refetch}=useQuery({
        queryKey:["lots",id],
        queryFn:fetchLot,
        enabled:!!id,
        refetchOnWindowFocus:false,
        refetchOnMount:false,
      
    })  

    const updateBidObject=useMutation({
        mutationFn:updateBid,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["lots",id]})
        }
    })
    
    

    let getUserBid=data?.bids.find((item)=>item.user===userId);
    console.log(getUserBid);
    const [currentIndex, setcurrentIndex] = useState(0);
    const [bidEdited, setbidEdited] = useState(false)
    const [isEdit , setIsEdit ] = useState(false)

const touchStartX=useRef(null)
const touchEndX=useRef(null);
const handleTouchStart=(e)=>{
    touchStartX.current=e.changedTouches[0].clientX
}


const {mutate,isPending,error:placeBidError}=useMutation({
    mutationFn:placeBid,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["lots",id]})
    }


  
})

const formatCurrency=(number)=>{
    return new Intl.NumberFormat('en-ZW',{
        style:"currency",
        currency:"USD",
        minimumFractionDigits:2
    }).format(number)
}

const handleTouchEnd=(e)=>{
    touchEndX.current=e.changedTouches[0].clientX
    handleSwipe()
}
const handleSwipe=()=>{
    let deltaX=touchStartX.current-touchEndX.current;
    let threshold=50;
    if (deltaX>threshold) {
        nextImage()
        
    }else if(deltaX<-threshold){
prevImage()
    }
}
const nextImage=(lotImages)=>{
    setcurrentIndex((prev)=>prev===lotImages.length-1?0:prev+1)
}
const prevImage=(lotImages)=>{
    setcurrentIndex((prev)=>prev===0?lotImages.length-1:prev-1)
}
const getCurrentIndex=(lotImages)=>{
    const current= lotImages[currentIndex]
    return current
}
const [loggedIn, setloggedIn] = useState(null)
const {days,hours,minutes,seconds}= useCountdown(data?.auction?.auctionDeadline,data?.auction?.auctionTime)

   let parsedData={};
   if (data?.specs) {
    try {
        parsedData=JSON.parse(data.specs)  
    } catch (error) {
        console.log("Failed error");
    }
  
   }
   const [isOpen, setIsOpen] = useState(false)

   const [bidPlaced, setbidPlaced] = useState(false)
   const [amount, setamount] = useState(0)
   let buyersPremium= 0.15* Number(amount)
let vat=Number(buyersPremium)*0.15;

let vatOnBuyersPremium=0.15*buyersPremium;
let total=Number(buyersPremium)+ Number(vatOnBuyersPremium)+Number(amount);
let lot=data?._id
let bid={auction:data?.auction?._id,amount,lot,buyersPremium,vatOnBuyersPremium,total}

const submitBid=()=>{
 
    if (signature) {
        if (amount<data?.currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }
        mutate(bid)
        setbidPlaced(!bidPlaced)
/*
        setTimeout(()=>{
            window.location.pathname="/personalbids"
      
        },3000)
    
*/
    }

  }
  
  const BUYERS_PREMIUM_RATE=0.15;
  const VAT_RATE=0.15;
  
  const [getUserBidInfo, setgetUserBidInfo] = useState({})
console.log(getUserBidInfo);
  const [staleBid, setstaleBid] = useState({})
  
useEffect(()=>{
    setgetUserBidInfo(getUserBid)
    setstaleBid(getUserBidInfo)
    let amount=parseFloat(getUserBidInfo?.amount)||0;
    let premium=parseFloat((amount*BUYERS_PREMIUM_RATE)).toFixed(2);
    let vat=parseFloat((premium*VAT_RATE).toFixed(2));

let total=parseFloat((Number(amount)+Number(premium)+Number(vat))).toFixed(2)

    setgetUserBidInfo((prev)=>({
        ...prev,
        amount:Number(amount),
        buyersPremium:Number(premium),
        vatOnBuyersPremium:Number(vat),
        total:Number(total)
    }))
 
    setgetUserBidInfo((prev)=>{
        console.log(prev);
        return {
            ...prev,
            amount:Number(amount),
            buyersPremium:Number(premium),
            vatOnBuyersPremium:Number(vat),
            total:Number(total)

        }
    })
},[getUserBidInfo?.amount])
console.log(getUserBidInfo);
const [showBidConfirmation, setshowBidConfirmation] = useState(false);
const submitEditBid=()=>{
 
    if (signature) {
      
        if (getUserBidInfo.amount<data?.currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }

      
        updateBidObject.mutate(getUserBidInfo)
        setbidPlaced(!bidPlaced)
        setbidEdited(!bidEdited)
        setIsEdit(!isEdit)


setshowBidConfirmation(!showBidConfirmation)
    }

  }


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

const localTime=(date)=>{
  const newDate= new Date(date);
  const utcHours=String(newDate.getUTCHours()).padStart(2,'0');
  const utcMinutes=String(newDate.getUTCMinutes()).padStart(2,'0')
  const time = `${utcHours}:${utcMinutes}`
  return time
}
 

  return (
    isLoading  ? <LotLoadingSkeleton /> 
    :
    <>
       {
        isOpen && <div className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center">
{
bidPlaced === false ?    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
<p className='flex items-center content-center justify-between'>
    <p>
    <h2 className="text-2xl font-semibold mb-4">
Place Your Bid
</h2>
    </p>

<p className='mt-[-15px]'>
<FiX onClick={()=>{
    setIsOpen(!isOpen)
}} className='text-red-500 font-bold' size={20}/>
</p>
</p>
<p className='flex items-center content-center justify-between'>
    <p className='flex gap-2 items-center align-middle content-center'>
    <p className='mt-1'>
    <FaCalculator size={15} />
    </p>
  

    <h2 className="text-xl font-semibold ">
Bid Calculator 
</h2>

    </p>



</p>
<p className='flex align-middle content-center text-[14px]'>

Use calculator below to determine your final invoice amount based on your bid.
   
    </p>
<p className='mb-2'>
<p className='mb-2 mt-2 font-bold text-[14px]'>
    The minimum price is ${data?.currentPrice}
    </p>
    <p className='flex justify-between align-middle content-center'>
<h3 className='font-bold'>
    Enter Your Bid
</h3>
<p>
 
    <input  type='number' value={amount} onChange={(e)=>setamount(e.target.value)}    placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>

    </p>
    </p>
  

</p>
<hr />
<p className='mb-2 mt-2 text-[14px] flex justify-between'>
   <b>
    Buyers Premium (15.00%) : 
   </b>
   <span>
{formatCurrency(Math.round(buyersPremium))}
   </span>

    </p>
  
<p className='mb-2 mt-2 text-[14px] flex justify-between'>
   <b>
  VAT on  Buyers Premium (15.00%) : 
   </b>
   <span>
{formatCurrency(Math.round(vat))}
   </span>

    </p>

<p className='mb-2 mt-2 text-[14px] flex justify-between'>
   <b>
  Total : 
   </b>
   <span>
{formatCurrency(Math.round(total))}
   </span>

    </p>


<p className='flex justify-center'>
<button onClick={()=>submitBid()} className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
Submit
</button>
</p>


</div>

:

<div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
<p className='flex items-center content-center justify-between'>
    <p>
    <h2 className="text-xl font-semibold mb-4">
Bid placed successfully
</h2>
    </p>

<p className='mt-[-15px]'>
<FiX onClick={()=>{
    setIsOpen(!isOpen)
}} className='text-red-500 font-bold' size={20}/>
</p>
</p>

<p className='mb-4'>
You will be redirected to the my bids page where you can monitor your bids
</p>


</div> 
}



 








                </div>
      }   

{
  
  isEdit &&   <div key={data?._id} className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center">
      {
    bidEdited === false &&      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
    <p className='flex items-center content-center justify-between'>
        <p>
        <h2 className="text-2xl font-semibold mb-4">
  Edit Your Bid
    </h2>
        </p>
    
    <p className='mt-[-15px] cursor-pointer'>
    <FiX onClick={()=>{
      console.log("hello");
        setIsEdit(!isEdit)
  ///  console.log(bidEdited);
    }} className='text-red-500 font-bold' size={20}/>
    </p>
    </p>
    <p className='flex items-center content-center justify-between'>
        <p className='flex gap-2 items-center align-middle content-center'>
        <p className='mt-1'>
        <FaCalculator size={15} />
        </p>
      
    
        <h2 className="text-xl font-semibold ">
    Bid Calculator 
    </h2>
    
        </p>
    
    
    
    </p>
    <p className='flex align-middle content-center text-[14px]'>
    
    Use calculator below to determine your final invoice amount based on your bid.
       
        </p>
    <p className='mb-2'>
    <p className='mb-2 mt-2 font-bold text-[14px]'>
        The minimum price is ${data?.currentPrice}
        </p>
    <p className='mb-2 mt-2 font-bold text-[14px]'>
        Your current bid price  is ${getUserBid?.amount}
   
        </p>
        <p className='flex justify-between align-middle content-center'>
    <h3 className='font-bold'>
        Enter Your Bid
    </h3>
    <p>
     
        <input  type='text'  onChange={(e)=>setgetUserBidInfo({...getUserBidInfo,amount:e.target.value})}    placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-[#4f46e5] focus:ring-[#4f46e5] focus:outline-none rounded-md'/>
    
        </p>
        </p>
      
    
    </p>
    <hr />
    <p className='mb-2 mt-2 text-[14px] flex justify-between'>
       <b>
        Buyers Premium (5.00%) : 
       </b>
       <span>
    {formatCurrency(Math.round(getUserBidInfo.buyersPremium))}
       </span>
    
        </p>
   
   
    <p className='mb-2 mt-2 text-[14px] flex justify-between'>
       <b>
        VAT on Buyers Premium (15%) : 
       </b>
       <span>
    {formatCurrency(Math.round(getUserBidInfo.vatOnBuyersPremium))}
       </span>
    
        </p>
   
    <p className='mb-2 mt-2 text-[14px] flex justify-between'>
       <b>
        Total : 
       </b>
       <span>
    {formatCurrency(Math.round(getUserBidInfo.total))}
       </span>
    
        </p>
   
   
   
   
  
  
  
  
    <p className='flex justify-center'>
    <button onClick={()=>submitEditBid()} className="bg-[#4f46e5] text-white px-4 py-2 cursor-pointer">
    Submit
    </button>
    </p>
    
    
    </div> 
      
      
      
   
      }
  
      
      
    
    
      
      
      
      
      
      
      
                      </div> 


}



{
 showBidConfirmation &&  <div  className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center">
 <div className="fixed inset-0 bg-transparent  bg-opacity-50  p-6 rounded shadow-lg w-[90%] max-w-md z-9999999 flex items-center justify-center">
  <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
 <p className='flex items-center content-center justify-between'>
     <p>
     <h2 className="text-xl font-semibold mb-4">
 Bid edited successfully
 </h2>
     </p>
 
 <p className='mt-[-15px]'>
 <FiX onClick={()=>{
    setshowBidConfirmation(!showBidConfirmation)
 }} className='text-red-500 font-bold cursor-pointer' size={20}/>
 </p>
 </p>
 
 <p className='mb-4'>
You have placed your bid successfully, you can decide either to stay on this page or to go to my bids page to monitor your bids
 </p>
 
 <p className='flex justify-between sm:justify-between gap-5'>
   <button  onClick={()=>{
          
               window.location.pathname="/personalbids"
           
           
   }} className="bg-[#4f46e5] text-white px-4 rounded-md py-2 cursor-pointer">
       Go to my bids page
   </button>
   <button onClick={()=>{
       refetch()
       setIsEdit(false)
       setbidEdited(false)
  setshowBidConfirmation(!showBidConfirmation)
  
       }} className='border-2 border-[#4f46e5] rounded-md text-[#4f46e5] px-4 py-2 cursor-pointer'>
      Remain on this page
   </button>
 </p>
 </div> 
 </div>
 </div>
 

       }
      

      <div className='bg-[#4f46e5] py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
        <h2 className='text-white'>
           {
            data?.propertyName
           }
        </h2>
    </div>
    <div className="px-4 md:px-12 mt-6">
 
          
<ImageComponent images={data?.lotImages}/>


             

         
      

</div>
<div className='mt-4 grid  px-8 md:px-15 sm:grid-cols-3 gap-4 text-sm text-indigo-100'>
<div className='flex items-center gap-2'>
<span className='text-indigo-400  text-[17px]'>
Property Name: {data?.propertyName}
</span>

</div>
<div className='flex items-center gap-2'>
<span className='text-indigo-400 text-[17px]'>
Item Type: {data?.itemType}
</span>

</div>
{
     data?.auction.type === "Onsite" &&  
     <div className='flex items-center gap-2'>
<span className='text-red-500 text-[17px]'>
Auction Start Time : {formatDate(data?.auction.startDateTime)}
</span>

</div>
}
{
     data?.auction.type === "Onsite" &&  
     <div className='flex items-center gap-2'>
<span className='text-red-500 text-[17px]'>
Auction Start Time : {localTime(data?.auction.startDateTime)}
</span>

</div>
}

{
    data?.auction.type === "Online" && <AuctionTimer color={"red"}  openTime={data?.auction.openTime} closeTime={data?.auction.closeTime}/>
}
<div className='flex items-center gap-2'>

</div>
<div className='flex items-center gap-2'>
<span className='text-indigo-400 text-[17px]'>
Auction Code : {data?.code}
</span>

</div>
<div className='flex items-center gap-2'>
<span className='text-indigo-400 text-[17px]'>
Current Price : ${data?.currentPrice}
</span>

</div>
<div className='flex items-center gap-2'>
<span className='text-indigo-400 text-[17px]'>
Expected Selling Price : ${data?.expectedPrice}
</span>

</div>
<div className='flex items-center gap-2'>
<span className='text-indigo-400 text-[17px]'>
Auction Type : {data?.auction?.auctionType}
</span>

</div>
{
    Object.entries(parsedData).map(([key,value])=>(
        <p key={key}>
            <span className='text-indigo-400 text-[17px]'>
            {key} : {value}
            </span>
           </p>
    )) 
}



</div>

<p className='mb-6 flex justify-center gap-3'>
{
data?.auctionType === "Online" ?  (
    getUserBid ?     <button 
    onClick={
      ()=>{
          if (session?.payload._id) {
              
              setloggedIn(true)
         
     //  setgetUserBid(userHadBid?.bid)
             setIsEdit(true)
          
          }else {
  setloggedIn(false);
  redirect(`/login?from=/auctions/${data?.auction?._id}`)
          }
      }
  }
className="bg-[#4f46e5] text-white px-4 py-2 cursor-pointer">
  Edit Bid
</button> :     <button 
          onClick={
            ()=>{
                if (session?.payload._id) {
                    
                    setloggedIn(true)
                    
                    setIsOpen(!isOpen)
           //  setgetUserBid(userHadBid?.bid)
                   // setIsEdit(!isEdit)
                
                }else {
        setloggedIn(false);
        redirect(`/login?from=/auctions/${data?.auction?._id}`)
                }
            }
        }
    className="bg-[#4f46e5] text-white px-4 py-2 cursor-pointer">
        Place Bid
    </button>
)
: null



  
}
<p className='flex justify-center items-center align-middle content-center gap-6 mt-8 mb-8'>
    <p>
{
    data?.auctionType !=="Online" ? null :    <>
    {
         getUserBid ?   <button 
         onClick={
           ()=>{
               if (session) {
                   
                   setloggedIn(true)
              
          //  setgetUserBid(userHadBid?.bid)
                  setIsEdit(!isEdit)
               
               }else {
       setloggedIn(false);
       redirect(`/login?from=/auctions/${data?.auction?._id}`)
               }
           }
       }
     className="bg-[#4f46e5] text-white px-4 py-2 cursor-pointer">
       Edit Bid
     </button> :   
        <button 
        onClick={
          ()=>{
              if (session?.payload._id) {
                  
                  setloggedIn(true)
                  
                  setIsOpen(!isOpen)
         //  setgetUserBid(userHadBid?.bid)
                 // setIsEdit(!isEdit)
              
              }else {
      setloggedIn(false);
      redirect(`/login?from=/auctions/${data?.auction?._id}`)
              }
          }
      }
  className="bg-[#4f46e5] text-white px-4 py-2 cursor-pointer">
      Place Bid
  </button>
    }
    </>
}
</p>


    <Link href={previousRoute !== null ? previousRoute : "/"} className="flex border-red-500 text-white bg-red-500 px-8 py-2 cursor-pointer  gap-2  items-center">
   <FaArrowLeft />    Back
    </Link>
</p>

</p>
   
    </>
  )
}

export default Page

{
    /**<div className='px-6 grid gap-2 space-y-2 md:px-52'>
<p >
    Property Name : {data?.propertyName}
</p>
<p>
    Item Type : {data?.itemType}
</p>
<p>

    Auction Deadline : {days} days  {hours} hours {minutes} minutes {seconds} seconds left
</p>

<p>
    Auction Location : {data?.auction?.auctionLocation}
</p>
<p>
    Auction Code : {data?.code}
</p>
<p>
    Current Price : ${data?.currentPrice}
</p>

<p>
    Auction Type : {data?.auction?.auctionType}
</p>
{
    Object.entries(parsedData).map(([key,value])=>(
        <p key={key}>{key} : {value}</p>
    )) 
}


<p className='mb-4 flex justify-between'>
{
data?.auctionType === "Online" &&  (
    getUserBid ?     <button 
    onClick={
      ()=>{
          if (session) {
              
              setloggedIn(true)
         
     //  setgetUserBid(userHadBid?.bid)
             setIsEdit(!isEdit)
          
          }else {
  setloggedIn(false);
  redirect(`/login?from=/auctions/${data?.auction?._id}`)
          }
      }
  }
className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
  Edit Bid
</button> :     <button 
          onClick={
            ()=>{
                if (session) {
                    
                    setloggedIn(true)
                    
                    setIsOpen(!isOpen)
           //  setgetUserBid(userHadBid?.bid)
                   // setIsEdit(!isEdit)
                
                }else {
        setloggedIn(false);
        redirect(`/login?from=/auctions/${data?.auction?._id}`)
                }
            }
        }
    className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
        Place Bid
    </button>
)

  
}

 
    <Link href={previousRoute !== null ? previousRoute : "/"} className=" border-red-500 text-white bg-red-500 px-8 py-2 cursor-pointer  flex items-center gap-2 mt-2">
   <FaArrowLeft />    Back
    </Link>
</p>
</div>
 */
}
