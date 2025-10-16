"use client"
import React from 'react'
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { fetchLot } from '../../../helpers/fetchLot';

import {useSession} from "@/middleware/useSession"
import { AiOutlineEye ,   AiOutlineEyeInvisible } from 'react-icons/ai'
import { useEffect } from 'react';
import { useRef,useState } from 'react';
import ImageComponent from './Image';
import { deleteBid } from '@/helpers/cancelBid';
import useCountdown from '../../../helpers/useCountdown';
import { useRegister } from '@/helpers/userRegister'
import { useLogin } from '@/helpers/userLogin'
import Image from 'next/image';
import {FaArrowLeft} from "react-icons/fa"
import { usePathname } from 'next/navigation'
import {usePreviousRoute} from '../../../helpers/usePreviousPath';
import UseTimer from "@/helpers/useTimer"
import { FiX } from 'react-icons/fi';
import { useContext } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { FaCalculator } from 'react-icons/fa';
import {redirect} from "next/navigation"
import {placeBid} from "@/helpers/addBid"
import {updateBid} from "@/helpers/updateBid";
import LotLoadingSkeleton from './LotLoadingSkeleton';
import AuctionTimer from '@/components/AuctionTimer';
import { FaCheck } from 'react-icons/fa';
import { imageServerUrl,bidfirstUrl } from '@/urls';
import { FaShare,FaShareAlt,FaShareAltSquare,FaWhatsapp,FaFacebook } from 'react-icons/fa';
import {Share} from "lucide-react"
function Page({params}) {
    let id= params.id
    const [showRegister, setshowRegister] = useState(false);
    const [showLogin, setshowLogin] = useState(false)
    const [loading, setloading] = useState(false)
    const [name, setname] = useState("")
    const [surname, setsurname] = useState("")
    const [phone, setphone] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState(false);
    const [registerError, setregisterError] = useState("");
    const [loginError, setloginError] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("")
    const [showPassword, setshowPassword] = useState(false)
    const [valid, setvalid] = useState(true)
    const [show, setshow] = useState(false)
    const togglePassword=()=>{
        setshowPassword(!showPassword)
    }
    const formatPhoneNumber=(value)=>{
        const digits=value.replace(/\D/g,"");
        let cleaned=digits.startsWith('263')? digits.slice(3):digits;
        let parts=[];
        if (cleaned.length>0) {
            parts.push(cleaned.slice(0,3))
        }
        if(cleaned.length>3){
        parts.push(cleaned.slice(3,6))
        }
        if(cleaned.length>6){
        parts.push(cleaned.slice(6,9))
        }
        return `+263 ${parts.join(' ')}`
            }
            const isStrongPassword=(password)=>{
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!!%*?&]{8,})$/.test(password);
            }
            const [isstrong, setisstrong] = useState(true)
            const  handleChange=(e)=>{
                const value=e.target.value;
                const name=e.target.name;
              
                    setemail(value)
                    setvalid(/^[^\s@]+@[^\s@]+\.[^\s@]+/.test(value))
             
               
            }
            const  handlePassword=(e)=>{
                const value=e.target.value;
                const name=e.target.name;
              
                    setpassword(value)
                    setisstrong(isStrongPassword(value))
             
               
            }
        
        
    const [pendingBid, setpendingBid] = useState({})
const [selected, setselected] = useState(0)
const [images, setimages] = useState([])
const [currentIndexImage, setcurrentIndexImage] = useState(0)
const [openImage, setopenImage] = useState(false)
const deleteBidObject=useMutation({
    mutationFn:deleteBid,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["lots",id]})
    }
})
let previousRoute=usePreviousRoute();
let queryClient=useQueryClient();
console.log(previousRoute);
    
    const {data:session}=useSession();
    let userId=session?.payload._id ;
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
    const [openDropdown, setopenDropdown] = useState(false);
    let dynamicUrl= bidfirstUrl+"/"+"lots"+id;
    let encodedURL=encodeURIComponent(dynamicUrl)
    let encodedText= encodeURIComponent("Check the lot item for the " + data?.auction?.name);
    const handleDelete=(id)=>{
        deleteBidObject.mutate(id)
    }
    


    const [currentIndex, setcurrentIndex] = useState(0);
    const [bidEdited, setbidEdited] = useState(false)
    const [isEdit , setIsEdit ] = useState(false)

const [touchStartX, settouchStartX] = useState(null);
const [touchEndX, settouchEndX] = useState(null)

const handleTouchStart=(e)=>settouchStartX(e.changedTouches[0].clientX)
const handleTouchEnd=(e)=>{
    if (touchStartX=== null) {
        return
    }
    let touchEndX=e.changedTouches[0].clientX;
    let diff=touchStartX-touchEndX

if (diff>50&&currentIndexImage<data?.lotImages.length-1) {
    setcurrentIndexImage(currentIndexImage+1)
}else if(diff<-50&&currentIndexImage>0){
setcurrentIndexImage(currentIndexImage-1)
}
   settouchStartX(null)

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

let bids=data?.bids;
let getUserBid=bids?.find((item)=>item.user._id===userId);
console.log(getUserBid);
let getbid= bids?.find((item)=>item.user._id===userId);

  let userBids=bids?.find((item)=>item.user._id===userId);
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
let userBid=session ? bids?.find((item)=>item.user._id===userId) : null;

let vatOnBuyersPremium=0.15*buyersPremium;
let total=Number(buyersPremium)+ Number(vatOnBuyersPremium)+Number(amount);
let lot=data?._id
let bid={auction:data?.auction?._id,amount,lot,buyersPremium,vatOnBuyersPremium,total}

const submitBid=()=>{
    if (!signature) {
        setshowRegister(true);
        setpendingBid(bid);
        return 
    }
    if (signature) {
        if (amount<data?.currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }
        if (userBid) {
            setIsEdit(true)
        }else{
            mutate(bid)
            setbidPlaced(!bidPlaced)
    setshowBidConfirmation(true)
        }
   
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
const [galleryImages, setgalleryImages] = useState(data?.lotImages)
useEffect(() => {
setgalleryImages(data)
}, [])
let countdown=UseTimer({openTime:data?.auction.openTime,closeTime:data?.auction.closeTime})
console.log(galleryImages);
console.log(countdown);
let registerObject=useRegister()
let loginObject= useLogin()
const handleRegister=async(e)=>{
    e.preventDefault();
    setloading(true);
    setregisterError("");
    try {
    if (password!==confirmPassword) {
        alert("Password and Confirm Password are not matching")
        return
    }
    else{
        registerObject.mutate({email,phone,password,name,surname})
  
  
     
       
    }
    
    
    
    } catch (error) {
       
        console.log(error);
      
    }
    finally{
        setloading(false)
    }
    
    
    }
    const handleLogin=async(e)=>{
    e.preventDefault();
    setloading(true);
    setregisterError("");
    try {
let formData={email,password}
        loginObject.mutate(formData)
  
  
     
       
    
    
    
    
    } catch (error) {
       
        console.log(error);
      
    }
    finally{
        setloading(false)
    }
    
    
    }
    useEffect(() => {
        if (registerObject.error) {
         setshow(true);
         const timer=setTimeout(()=>{
             setshow(false)
         },5000)
         return ()=>clearTimeout(timer)
        }
      if (registerObject.isSuccess) {
       
      setshowRegister(false)
      }
         }, [error,registerObject.error,registerObject.isSuccess])
        
     useEffect(() => {
        if (loginObject.error) {
         setshow(true);
         const timer=setTimeout(()=>{
             setshow(false)
         },5000)
         return ()=>clearTimeout(timer)
        }
      if (loginObject.isSuccess) {
refetch()

      setshowRegister(false)
      if (userBid!==null) {
        queryClient.invalidateQueries({queryKey:["lots",id]})
        setIsEdit(true)
        setIsOpen(false)
        
       
      }

      }
         }, [error,loginObject.error,loginObject.isSuccess])
        
    
  return (
    isLoading  ? <LotLoadingSkeleton /> 
    :
    <>
    {
 showBidConfirmation &&  <div  className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center">
 <div className="fixed inset-0 bg-transparent  bg-opacity-50  p-6 rounded shadow-lg w-[90%] max-w-md z-9999999 flex items-center justify-center">
  <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999 sm:w-[70%] md:w-[50%] lg-w-[40%]" >
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
       {
        isOpen && <div className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center">
{
bidPlaced === false &&    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
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
 showRegister === true &&    <div className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center backdrop-blur-sm ">
   {
    showLogin === true &&   <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
    <p className='flex items-center content-center justify-between'>
        <p>
        <h2 className="text-xl font-semibold mb-4">
   We have discovered that you are not logged in,kindly login so that the bid can be finalized
    </h2>
        </p>
    
    <p className='mt-[-15px]'>
    <FiX onClick={()=>{
       setshowRegister(!showRegister)
    }} className='text-red-500 font-bold cursor-pointer' size={20}/>
    </p>
    </p>
    {
                    show &&   <p className='mt-3 mb-3 text-red-500'>
                  { loginObject?.error.message}
                    </p>
                }
{
loginObject.isLoading === true &&  <p className='mt-3 mb-3 '>
 Loading....
         </p>
}
   <form onSubmit={handleLogin}>


   <p className='w-full'>
       <label htmlFor="">
       Email
       </label>
    
       <input   type="email" value={email} onChange={(e)=>setemail(e.target.value)}     placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
   
       </p>
 
       <p className='w-full'>
    <p className='flex justify-between align-middle'>
    <label htmlFor="" className='mb-2 text-blue-950'>Password</label>
    <label htmlFor="">
        <Link href="/" className='text-blue-500'>
        Forgot Password?
        </Link>
    </label>
    </p>
 


<div className='relative'>
<input  onChange={(e)=>setpassword(e.target.value)} type={showPassword ? "text":"password"}  placeholder='Enter your password' className='w-full pl-4 pr-10 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>

<span onClick={togglePassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
{
    showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
}
</span>
</div>

  

</p>

   
    <p className='flex justify-between sm:justify-between gap-5 mt-3'>
     
      <button 
        className='border-2 border-[#4f46e5]   text-white bg-[#4f46e5] rounded-md  px-4 py-2 cursor-pointer'>
      Login
      </button>
    </p>
    <p className='mt-2'>
       If you are not registered with us <span onClick={()=>setshowLogin(!showLogin)} className='text-blue-400 cursor-pointer'>Register</span> here.
    </p>
   </form>

    </div> 
   } 
   {
    showLogin === false  &&    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
    <p className='flex items-center content-center justify-between'>
        <p>
        <h2 className="text-xl font-semibold mb-4">
   We have discovered that you are not registered with us,kindly register so that the bidding process is finalized
    </h2>
        </p>
    
    <p className='mt-[-15px]'>
    <FiX onClick={()=>{
       setshowRegister(!showRegister)
    }} className='text-red-500 font-bold cursor-pointer' size={20}/>
    </p>
    </p>
   <form className='mb-6' onSubmit={handleRegister}>
   {
                    show &&   <p className='mt-3 mb-3 text-red-500'>
               { registerObject?.error.message}
                    </p>
                }
             {
    registerObject.isLoading === true &&  <p className='mt-3 mb-3 '>
Loading.....
         </p>
}
   <p className='w-full'>
       <label htmlFor="">
    Name
       </label>
    
       <input  type="text"  value={name} onChange={(e)=>setname(e.target.value)}    placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
   
       </p>
    <p className='w-full'>
       <label htmlFor="">
    Surname
       </label>
    
       <input type="text"  value={surname} onChange={(e)=>setsurname(e.target.value)}     placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
   
       </p>
    <p className='w-full'>
       <label htmlFor="">
      Phone Number
       </label>
    
       <input  type="tel" value={phone} onChange={(e)=>setphone(formatPhoneNumber(e.target.value))}    placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
   
       </p>
 <p className="w-full">
 <label htmlFor="" >Email</label>
    {
    !valid && <p className='text-red-500 mt-2 mb-2'>
    Invalid email
    </p>
}

    <input name='email' type="email" value={email} onChange={handleChange}    className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>

 </p>
 <p className="w-full">
    <p className='flex justify-between align-middle'>
    <label htmlFor="" className=''>Password</label>

    </p>
 


<div className='relative'>
<input value={password} onChange={handlePassword}   name='password' type={showPassword ? "text":"password"}   className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
<span onClick={togglePassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
{
    showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
}
</span>
</div>

  

</p>
<p className='grid mt-2'>
    <p className='flex justify-between align-middle'>
    <label htmlFor="" className=''>Confirm Password</label>

    </p>
 


<div className='relative'>
<input onChange={(e)=>setconfirmPassword(e.target.value)} type={showPassword ? "text":"password"}   className='w-full pl-4 pr-10 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
<span onClick={togglePassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
{
    showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
}
</span>
</div>

  

</p>

   
    <p className='flex justify-between sm:justify-between gap-5 mt-2'>
     
      <button  className='border-2 border-[#4f46e5]   text-white bg-[#4f46e5] rounded-md  px-4 py-2 cursor-pointer'>
        Register
      </button>
    </p>
    <p>
       If you are registered with us <span  onClick={()=>setshowLogin(!showLogin)} className='text-blue-400 cursor-pointer'>Login</span> here.
    </p>
   </form>

    </div> 
   }
   
 


   
   </div> 
  

       }

<div className="max-w-6xl mx-auto px-4 py-6">
    <div className='flex items-center align-middle content-center justify-between mb-4'>
<p>
<h1 className="text-2xl font-bold ">
        {data?.propertyName}
    </h1>
</p>
<p>
<span className='flex align-center items-center gap-2'>
 {
    data?.auction.type === "Online" &&  (
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
      style={{
        backgroundColor:"#4f46e5" 
     }} className=' text-white py-3 px-6 rounded  cursor-pointer'>
      Edit Bid
    </button> :     <button 
              onClick={
             ()=>{  
                 setIsOpen(!isOpen)
             }
            }
            style={{
                backgroundColor:"#4f46e5" 
             }} className=' text-white py-3 px-6 rounded cursor-pointer'>
            Place Bid
        </button>
       
    )
    
      
    }
     <div className='relative inline-block text-left'>
     <button onClick={()=>setopenDropdown(!openDropdown)} className=' text-[#4f46e5] py-3 px-6 rounded cursor-pointer'>
 <Share size={23} />
 </button>
 {
    openDropdown && (
        <div className='absolute mt-2 w-44 sm:w-52 md:w-64 right-0 bg-white border border-gray-200 rounded shadow-lg z-50'>
<a href={`https://wa.me/?text=encodedText${encodedURL}`} target='_blank' rel='noopener noreferrer' className='flex px-4 py-2 text-sm hover:bg-gray-100 gap-4 items-center align-middle content-center justify-center'>Share on Whatsapp <FaWhatsapp color='#25d366' size={20}/></a>
<a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`} target='_blank' rel='noopener noreferrer' className='flex px-4 py-2 text-sm hover:bg-gray-100 gap-4 items-center align-middle content-center justify-center'>Share on Facebook <FaFacebook color='#1877f2' size={20}/></a>
       
        </div>
    )
 }
     </div>

  
     </span>

</p>
 

    </div>
 

    <div className="flex flex-col md:flex-row gap-4">
        <div className='flex-1'>
<Image  onClick={()=>{
                setopenImage(true)
                setcurrentIndex(1)
                    }}  src={`${imageServerUrl}${data.lotImages[0].newPath}`} width={500} alt='alternate'  height={500} className='w-full h-auto rounded object-cover cursor-pointer'/>
        </div>
        <div className='md:w-1/3 grid grid-cols-3 md:grid-cols-2 gap-2'>
    {
        data?.lotImages.map((item,index)=>(
            <Image  onClick={()=>{
                setopenImage(true)
                setcurrentIndex(index)
                    }}  src={`${imageServerUrl}${item.newPath}`} width={500}  height={500} alt='alternate' className='cursor-pointer rounded'/>
        ))
    }

        </div>
    </div>


    <div className='mt-4 grid sm:flex lg:flex sm:justify-between lg:justify-between'>
    <main>
  <h2 className='text-2xl font-bold mb-3 mt-3'> 
 Lot Description
    </h2>
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-2'>
    {
    Object.entries(parsedData).map(([key,value])=>(
        <p key={key} className='text-[18px]'>
          
            {key} : {value}
           
           </p>
    )) 
}
    </div>
  </main>
<p  style={{
  boxShadow:"5px 5px 5px 5px rgba(0,0,0,0.2)"  
}} className=' px-4 mb-4 rounded-md py-3'>
{
    data.auction.type=== "Online" &&  <h2 className='text-[#4f46e5] font-semibold text-[17px] mb-1 mt-3 flex align-middle items-center gap-2'> 
 <FaCheck size={12}/>  Current Price 
   </h2>
} 
{
    data.auction.type=== "Onsite" &&  <h2 className='text-[#4f46e5] font-semibold text-[17px] mb-1 mt-3 flex align-middle items-center gap-2'> 
    <FaCheck size={12}/>  Start Price 
      </h2>
} 
<h2 className='text-2xl font-bold'>
    {formatCurrency(data?.currentPrice)}
</h2>
{
    data.auction.type=== "Onsite" &&  <h2 className='text-[#4f46e5] font-semibold text-[17px] mb-1 mt-3 flex align-middle items-center gap-2'> 
    <FaCheck size={12}/>  Auction Date 
      </h2>
} 
{
    data.auction.type=== "Onsite" && <h2 className='text-2xl font-bold'>
    {formatDate(data?.startDateTime)}
</h2>
}
{
    data.auction.type=== "Online" && <>  <h2 className='text-[#4f46e5] font-semibold text-[17px] mb-1 mt-3 flex align-middle items-center gap-2'> 
    <FaCheck size={12}/>   {countdown.status === 'Not Yet Open' ?   `Bidding Opens In ` :   ` Bidding Close In` }
      </h2>
      {
        countdown !== null &&     <h2 className='text-2xl font-bold'>
     
        {countdown?.timeLeft?.days} days {countdown?.timeLeft?.hours} hrs {countdown?.timeLeft?.minutes} minutes {countdown?.timeLeft?.seconds} seconds
     
  </h2>
      }
  
      </>
} 
<p className='mt-3 grid  gap-2 lg:flex  lg:justify-center  mb-4 md:flex '>
{
    data.auction.type=== "Onsite" &&  <button    style={{
      backgroundColor:"#4f46e5" 
   }} className=' text-white py-2 px-4 rounded font-semibold'>
  Auction Type : Onsite
</button>
}
{
    data.auction.type=== "Online" &&  <button    style={{
      backgroundColor:"#4f46e5" 
   }} className=' text-white py-2 px-4 rounded font-semibold'>
  Auction Type : Online
</button>
}
{
    data.auction.type=== "Onsite" &&  <h2 className='text-[#4f46e5] font-semibold text-[17px] mb-1 mt-3 flex align-middle items-center gap-2'> 
 <FaCheck size={12}/>  Auction Location
   </h2>
} 
{
    data.auction.type=== "Onsite" && <h2 className='text-2xl font-bold'>
    {data.auction.location}
</h2>
}

{
    data.auction.type=== "Onsite" &&  <h2 className='text-[#4f46e5] font-semibold text-[17px] mb-1 mt-3 flex align-middle items-center gap-2'> 
    <FaCheck size={12}/>  Start Price 
      </h2>
} 

<button    style={{
      backgroundColor:"#0A2540" 
   }} className=' text-white py-2 px-4 rounded font-semibold'>
  Item Type : {data?.itemType}
</button>

{
      data?.auction.type === "Online" &&          getUserBid &&  <button          onClick={
        () => {
            if (window.confirm(`Are you sure you want to delete your bid for ${data?.propertyName}?`)) {
                handleDelete(userBid?._id)
                refetch()
            }
        }




    }
style={{
            backgroundColor:"#BA0600" 
         }} className=' text-white py-2 px-4 rounded font-semibold'>
       Cancel Bid
      </button>


      
}
</p>


</p>
    </div>

    <h2 className='text-2xl font-bold mb-3 mt-3'> 
 Gallery
    </h2>
    <div className="w-full overflow-x-auto">
<div className="flex space-x-4  py-2">
{
    data?.lotImages.map((item,index)=>(
        <Image onClick={()=>{
    setopenImage(true)
    setcurrentIndex(index)
        }}  key={index} src={`${imageServerUrl}${item.newPath}`} width={500} height={500} className='cursor-pointer h-40 w-auto rounded shrink-0' />
    ))
}
</div>
    </div>

 
    

</div>
   
   {
    openImage && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center'>

<p className='text-white text-xl z-5000 top-5 left-1 absolute'>
    {data?.propertyName}
</p>
<button onClick={()=>setopenImage(false)} className='absolute top-4 right-4 text-white text-2xl cursor-pointer z-10000'>
x
</button>
<p className='hidden sm:grid absolute z-10000 left-4  justify-center'>
    <p className='grid justify-center'>
    <button onClick={()=>setcurrentIndexImage((prev)=>Math.max(prev-1,0))} className={`z-10000    text-black bg-white border-white rounded-full text-2xl cursor-pointer w-15 h-15 font-bold ${currentIndexImage === 0 ? "opacity-0 cursor-not-allowed" :""} `}>
{'<'} 
</button>
    </p>

</p>

<Image onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} src={`${imageServerUrl}${data?.lotImages[currentIndexImage].newPath}`} fill alt='Gallery Image' className='max-h-[90vh] w-auto object-contain mt-8'/>

<p className='hidden sm:grid absolute z-10000 right-4  justify-center'>
    <p className='grid justify-center'>
    <button onClick={()=>setcurrentIndexImage((prev)=>Math.min(prev+1,data?.lotImages.length-1))} className={`z-10000    text-black bg-white border-white rounded-full text-2xl cursor-pointer w-15 h-15 font-bold ${currentIndexImage=== data?.lotImages.length-1 ? "opacity-0 cursor-not-allowed" :""}`}>
    {">"}
</button>
    </p>

</p>

        </div>
    )
   }
    </>
  )
}

export default Page

{
    /**
     * 
           

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






    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <div className='px-6 grid gap-2 space-y-2 md:px-52'>
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
