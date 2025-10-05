'use client'
import React from 'react'
import Image from 'next/image'
import image from "@/public/images/car-bg.png"
import {AiFillStar} from "react-icons/ai"
import {BiChair,BiCar,BiCalendar} from "react-icons/bi"
import {BsCarFront,BsSpeedometer} from "react-icons/bs"
import {FaDoorOpen,FaPerson} from "react-icons/fa6"
import { useSession,clearSession,getSession, useClearSession } from '@/middleware/useSession'

import {FaCar,FaRev,FaGasPump,FaGavel,FaSignOutAlt,FaCalculator} from "react-icons/fa"
import { FiX } from 'react-icons/fi'
import { useMutation,useQueryClient,useQuery } from '@tanstack/react-query'
import {placeBid} from "../../helpers/addBid"
import {updateBid} from "../../helpers/updateBid";
import {deleteBid} from "../../helpers/cancelBid";
import { useEffect,useState } from 'react'
import { imageServerUrl,baseUrl } from '@/urls'
import {redirect} from "next/navigation"
import EditDataModal from "../../components/EditDataModal"
import {fetchBid} from "../../helpers/fetchBid"
import {getPreviousPath} from "../../components/RouteTracker"
import Link from 'next/link'
import AuctionTimer from '@/components/AuctionTimer'
function PersonalBidCard({
bidId,amount,auctionId,auctionDate,
code,createdAt,currentPrice,
expectedPrice,exteriorImages,
interiorImages,keyAvailable,
location,mileage,
propertyName,sold,
startingPrice,updatedAt,
_id,rank,auctionTime,id,auctionDeadline,lotImages,item,auctionType,refetch,openTime,closeTime

}) {
  

  let queryClient=useQueryClient();
  let previousPathName=getPreviousPath()
  const session=getSession();

   
  
const [text, settext] = useState(" 11d 30hrs 50mins 10seconds")
const [bidPlaced, setbidPlaced] = useState(false)
const [bidEdited, setbidEdited] = useState(false)
const [showPrice, setshowPrice] = useState(false)
const [loggedIn, setloggedIn] = useState(null)
const [isOpen, setIsOpen] = useState(false)
const [isEdit, setIsEdit] = useState(false)
const [getUserBidInfo, setgetUserBidInfo] = useState({})
const [showBidConfirmation, setshowBidConfirmation] = useState(false);
let lot=id




const [amountEdit, setamountedit] = useState("");



useEffect(() => {
const timer=setInterval(()=>{
    setshowPrice((prevShowPrice)=>!prevShowPrice);
   
},3000)
return ()=>clearTimeout(timer)
}, [])
const [timeleft, settimeleft] = useState({days:0,hours:0,minutes:0,seconds:0})

const BUYERS_PREMIUM_RATE=0.15;
const VAT_RATE=0.15;


let signature=session?.token;


const {mutate,isPending,error,}=useMutation({
    mutationFn:placeBid,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["lots",id]})
    }


  
})
const updateBidObject=useMutation({
    mutationFn:updateBid,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["lots",id]})
    }
})
let bid={auctionId,lot,amount}
const submitBid=()=>{
 
    if (signature) {
        if (amount<currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }
        mutate(bid)
        setbidPlaced(!bidPlaced)

        setTimeout(()=>{
            window.location.pathname="/"
      
        },3000)
    

    }

  }





const formatCurrency=(number)=>{
    return new Intl.NumberFormat('en-ZW',{
        style:"currency",
        currency:"USD",
        minimumFractionDigits:2
    }).format(number)
}

const deleteBidObject=useMutation({
    mutationFn:deleteBid,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["lots",id]})
    }
})

const deleteBidFunction=()=>{
 
    if (signature) {
 
   
      //  updateBidObject.mutate(updateBid)
        deleteBidObject.mutate(deleteBid)

        setTimeout(()=>{
       window.location.reload()
      
        },3000)

    }

  }
  /*
const useDeleteItem=()=>{
    let queryClient=useQueryClient();
    return useMutation({
        mutationFn:deleteBid,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['items']
            })
        }
    })
}
*/
const {data,isLoading}=useQuery({
    
    queryKey:["item",_id],
    queryFn:()=>fetchBid(_id),
    enabled:false,
    refetchOnWindowFocus:false,
    refetchOnMount:false,
    refetchInterval:false,
    staleTime:"Infinity",
    cacheTime:1000*60,
    
})
console.log(data);
const [documentHandling, setdocumentHandling] = useState(163.39)
const [adminFee, setadminFee] = useState(8.47)

const handleDelete=()=>{
    deleteBidObject.mutate(_id)
}
let buyersPremium= 0.15* Number(amount)
let vat=Number(buyersPremium)*0.15;

let vatOnBuyersPremium=0.15*buyersPremium;
let total=Number(buyersPremium)+ Number(vatOnBuyersPremium)+Number(amount);
const [formData, setformData] = useState(0)
const [staleBid, setstaleBid] = useState({})
useEffect(() => {

}, [isEdit])

const editBid=()=>{
 
    if (signature) {
        if (getUserBidInfo.amount<currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }
       
        updateBidObject.mutate(getUserBidInfo)
   setbidEdited(!bidEdited)
   setIsEdit(false)
   setIsOpen(false)
   refetch()
 setshowBidConfirmation(true)



    }

  }

  useEffect(()=>{

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

console.log(openTime);
  return (
    <>
{
    showBidConfirmation === true && 
    <div key={_id} className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center backdrop-blur-sm">
        {
    <div key={_id} className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
      <p className='flex items-center content-center justify-between'>
          <p>
          <h2 className="text-2xl font-semibold mb-4">
    Edit Bid Successfull
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
 

      <p className='mb-2 grid justify-center'>
  
          <p className='grid justify-between align-middle content-center'>
      <h3 className='font-bold'>
         You have successfully edited your bid
      </h3>


      
          </p>
        
      
      </p>
   
 
      <p className='grid justify-center'>
      <button onClick={()=>{
        setshowBidConfirmation(false)
        setIsOpen(false)
        setIsEdit(false)
        setbidEdited(true)
    }} className="bg-[#635BFF] text-white px-4 py-2 cursor-pointer">
   Okay
      </button>
      </p>
      
      
      </div> 
       
        }
         
        
        
        
        
        
        
        
        
                        </div>
}
      {
        isOpen === true && <div className="fixed inset-0 bg-transparent  bg-opacity-50 z-60 flex items-center justify-center">
{
bidPlaced === false ?    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
<p className='flex items-center content-center justify-between'>
    <p>
    <h2 className="text-xl font-semibold mb-4">
Place Your Bid
</h2>
    </p>

<p className='mt-[-15px]'>
<FiX onClick={()=>{
    setIsOpen(!isOpen)
}} className='text-red-500 font-bold' size={20}/>
</p>
</p>

<p>
The minimum price is ${currentPrice ? currentPrice: ""}
</p>
<input  type='number' value={amount}    placeholder='' className='w-full pl-4 pr-10 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>

<button onClick={()=>submitBid()} className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
Submit
</button>
</div> :

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
    isEdit === true && 
    <div key={_id} className="fixed inset-0 bg-transparent  bg-opacity-50 z-60 flex items-center justify-center backdrop-blur-sm">
        {
      bidEdited === false &&      <div key={_id} className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
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
 

      <p className='mb-2 grid justify-center'>
      <p className='mb-2 mt-2 font-bold text-[14px]'>
          The minimum price is {currentPrice ? formatCurrency(currentPrice): ""}
          </p>
      <p className='mb-2 mt-2 font-bold text-[14px]'>
          Your current bid price  is {amount ? formatCurrency(amount) : null}
          </p>
          <p className='grid justify-between align-middle content-center'>
      <h3 className='font-bold'>
          Edit Your Bid
      </h3>
      <p>
       
          <input name='amount'   onChange={(e)=>setgetUserBidInfo({...getUserBidInfo,amount:e.target.value})}  type='text'     placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
      
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
   
          </p>
        
      
      </p>
   
      
      {
          /**
           * <input  type='number' value={amount} onChange={(e)=>setamount(e.target.value)}    placeholder='' className='w-full pl-4 pr-10 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
      
           */
      }
      <p className='grid justify-center'>
      <button onClick={()=>editBid()} className="bg-[#635BFF] text-white px-4 py-2 cursor-pointer">
      Submit
      </button>
      </p>
      
      
      </div> 
       
        }
         
        
        
        
        
        
        
        
        
                        </div>
}

            
<div style={{
    boxShadow:"10px 10px 10px rgba(0,0,0,0.2)"
}} className='w-96 md:w-96 rounded-lg overflow-hidden shadow-xl bg-white '>
<Image src={lotImages ?  `${imageServerUrl}${lotImages[0].newPath}` : image}     loading='lazy'
         placeholder='blur'
         blurDataURL={`${imageServerUrl}${lotImages[0].thumbnail}`}  alt='Alternate Image' width={500} height={500} className='w-full h-50 object-cover mb-0.4'/>
<div className='p-5 bg-[#0A2540] text-white'>

<h5 className='text-xl font-semibold mb-2 flex justify-between'>
<span>
    Property Name
</span> 
<span>
{
            propertyName ? propertyName : "Hyundai Tucson Accent"
          }  
</span>

         
</h5>
<h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>

<AuctionTimer openTime={openTime} closeTime={closeTime}/>


</h5>
<h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
  <span>
Current Price
  </span>
  <span>
  ${currentPrice}
  </span>

</h5>
<h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
  <span>
Bid Rank
  </span>
  <span>
 {rank}
  </span>

</h5>
<div className='flex items-center justify-center mt-4'>


  
    <p  className='flex justify-between gap-14'>
    <button 
onClick={
    ()=>{
        if (session!== null) {
            
            setloggedIn(true)
     setgetUserBidInfo(item)
            setIsEdit(true)
           setbidEdited(false)
        }else {
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
    ()=>{
        if ( window.confirm(`Are you sure you want to delete your bid for ${propertyName}?`)) {
        handleDelete()
        refetch()
        }
    }

    
    
   
}

className='bg-white  text-red-500 text-sm px-6 py-2 rounded-md font-medium cursor-pointer'>
   Cancel Bid
</button>


    
     

 
    
    </p>



</div>
</div>
</div>
          



    </>
  )
}

export default PersonalBidCard