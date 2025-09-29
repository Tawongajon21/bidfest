'use client'
import React from 'react'
import Image from 'next/image'
import image from "@/public/images/car-bg.png"
import { AiOutlineEye ,   AiOutlineEyeInvisible } from 'react-icons/ai'
import {AiFillStar} from "react-icons/ai"
import {BiChair,BiCar,BiCalendar} from "react-icons/bi"
import {BsCarFront,BsSpeedometer} from "react-icons/bs"
import {FaDoorOpen,FaPerson} from "react-icons/fa6"
import useSession from "@/middleware/useSession"
import {FaCar,FaRev,FaGasPump,FaGavel,FaSignOutAlt,FaCalculator,FaInfo} from "react-icons/fa"
import { FiX } from 'react-icons/fi'
import { useMutation,useQueryClient, useQuery,useQueries } from '@tanstack/react-query'
import {placeBid} from "../helpers/addBid"
import {updateBid} from "../helpers/updateBid";
import { useEffect,useState } from 'react'
import { imageServerUrl,baseUrl } from '@/urls'
import {redirect} from "next/navigation"
//import {fetchPersonalBids} from "../../helpers/getPersonalBids"
import {fetchPersonalBids} from "@/helpers/getPersonalBids"
import {fetchBid} from "@/helpers/fetchBid"
import EditDataModal from "@/components/EditDataModal"
import Link from 'next/link'
import AuctionTimer from "./AuctionTimer"

function AuctionCard({startDateTime,expectedPrice,closeTime,openTime,refetch,type,key,lotImages,item,previousPathName,userBids,bids,id,auctionId,auctionDate,auctionDeadline, auctionTime ,propertyName,currentPrice}) {
  let queryClient=useQueryClient();
    const {session}=useSession();
    console.log(type);
const [showRegister, setshowRegister] = useState(false);
const [showLogin, setshowLogin] = useState(false)

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
    
    
const [loading, setloading] = useState(false)
const [text, settext] = useState(" 11d 30hrs 50mins 10seconds")
const [bidPlaced, setbidPlaced] = useState(false)
const [bidEdited, setbidEdited] = useState(false)
const [showPrice, setshowPrice] = useState(false)
const [loggedIn, setloggedIn] = useState(null)
const [isOpen, setIsOpen] = useState(false)
const [isEdit, setIsEdit] = useState(false)
const [documentHandling, setdocumentHandling] = useState(163.39)
const [adminFee, setadminFee] = useState(8.47)
let lot=id
const [amount, setamount] = useState("");
const [amountEdit, setamountedit] = useState("");
const formatDate=(date)=>{
    let dateObj=new Date(date)
    let optionsDate={day:"numeric",month:"short",year:"numeric"}
    let formattedDate=dateObj.toLocaleDateString("en-ZW",optionsDate)
    let time=new Intl.DateTimeFormat("en-ZW",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:false,
        timeZone:"Africa/Harare"
        
    }).format(dateObj);
    //dateObj.toLocaleTimeString("en-ZW",{timeZone:"Africa/Harare",hour:"2-digit",minute:"2-digit",hour12:false})
    return {date:formattedDate,time}
}

const localTime=(date)=>{
    let newDate= new Date(date);
    let utcHours=String(newDate.getUTCHours()).padStart(2,'0');
    let utcMinutes=String(newDate.getUTCMinutes()).padStart(2,'0')
    let time = `${utcHours}:${utcMinutes}`
    return time
}
let auction=auctionId
let userId=session?.payload._id;

const [showBidConfirmation, setshowBidConfirmation] = useState(false);


useEffect(() => {
const timer=setInterval(()=>{
    setshowPrice((prevShowPrice)=>!prevShowPrice);
   
},3000)
return ()=>clearTimeout(timer)
}, [])
const [timeleft, settimeleft] = useState({days:0,hours:0,minutes:0,seconds:0})
useEffect(() => {
const interval= setInterval(()=>{

        let dateString=auctionDate.split("T")[0]
     
        const fullDateTime=dateString+ "T"+ auctionTime+":00"
    
        let deadline= new Date(fullDateTime);
        let now=new Date();
        const diff=deadline-now;
        if (diff<=0) {
            clearInterval(interval);
            settimeleft({days:0,hours:0,minutes:0,seconds:0})
        }else{
            settimeleft({
                days:Math.floor(diff/(1000*60*60*24)),
                hours:Math.floor((diff/(1000*60*60*24))%24),
                minutes:Math.floor((diff/(1000*60))%60),
                seconds:Math.floor((diff/1000)%60),
                
                
            })
        }
     
    
   

},1000)
return ()=>clearInterval(interval)
}, [auctionDate,auctionDeadline])

let signature=session?.token;

let bidData={auction,lot,amount}
const {mutate,isPending,error,}=useMutation({
    mutationFn:placeBid,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["lots",id]})
    }


  
})
let buyersPremium= 0.15* Number(amount)
let vat=Number(buyersPremium)*0.15;
let vatOnBuyersPremium=0.15*buyersPremium;
let total=Number(buyersPremium)+ Number(vatOnBuyersPremium)+Number(amount);


let totalWithVat=Number(amount)+Number(buyersPremium)+Number(vat);
let cashHandling=totalWithVat*0.02;
let totalWithVatWithCashHandling=Number(totalWithVat)+Number(cashHandling);


const updateBidObject=useMutation({
    mutationFn:updateBid,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["lots",id]})
    }
})
let bid={auction,amount,lot,buyersPremium,vatOnBuyersPremium,total}
const [pendingBid, setpendingBid] = useState({})
const submitBid=()=>{
    if (!signature) {
        setshowRegister(true);
        setpendingBid(bid);
        return 
    }
    if (signature) {
        if (amount<currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }
        mutate(bid)
        setbidPlaced(!bidPlaced)

   

    } 


  }



  console.log(showRegister);
  console.log(pendingBid);
  

  let userBid=session ?  userBids?.find((bid)=>bid?.lot===id) : null;

  let bidId=userBid?._id;
  const [getUserBid, setgetUserBid] = useState({})
  const BUYERS_PREMIUM_RATE=0.15;
  const VAT_RATE=0.15;
  
  
  

  const editBid=()=>{
 
    if (signature) {
        if (amountEdit<currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }
        let updateBid={amount:amountEdit,id:bidId}
        updateBidObject.mutate(updateBid)
   setbidEdited(!bidEdited)

        setTimeout(()=>{
            window.location.pathname="/personalbids"
      
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

const [staleBid, setstaleBid] = useState({})
useEffect(()=>{
    setstaleBid(getUserBid)
    let amount=parseFloat(getUserBid?.amount)||0;
    let premium=parseFloat((amount*BUYERS_PREMIUM_RATE)).toFixed(2);
    let vat=parseFloat((premium*VAT_RATE).toFixed(2));

let total=parseFloat((Number(amount)+Number(premium)+Number(vat))).toFixed(2)
console.log(total);
    setgetUserBid((prev)=>({
        ...prev,
        amount:Number(amount),
        buyersPremium:Number(premium),
        vatOnBuyersPremium:Number(vat),
        total:Number(total)
    }))
},[getUserBid?.amount])
console.log(getUserBid);
const submitEditBid=()=>{
 
    if (signature) {
        if (getUserBid.amount<currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }
        updateBidObject.mutate(getUserBid)
        setbidPlaced(!bidPlaced)
        setbidEdited(!bidEdited)
        setIsEdit(!isEdit)
setshowBidConfirmation(!showBidConfirmation)
 

    }

  }
console.log(closeTime);
const [countdown, setcountdown] = useState({})
function getCountdown(openTimeStr,closeTimeStr){
    let now=new Date();
    let openTime=new Date(openTimeStr);
    let closeTime=new Date(closeTimeStr);
    if (now<openTime) {
        return {
            status:'Not Yet Open',
            countdownTo:'Open',
            timeLeft:formatTimeDiff(openTime-now)
        }
    }
    else if(now>=openTime&&now<closeTime){
return {
    status:'Open',
    countdownTo:'Close',
    timeLeft:formatTimeDiff(closeTime-now)
}
    }else{
        return {
            status:'Closed',
            countdownTo:null,
            timeLeft:null

        }
    }

}
function formatTimeDiff(diffMs) {
    let totalSeconds=Math.floor(diffMs/1000);
    let days=Math.floor(totalSeconds/(3600*24));
    let hours=Math.floor((totalSeconds%(3600*24))/3600)
    let minutes=Math.floor((totalSeconds%3600)/60);
    let seconds=totalSeconds%60
    return {days,hours,minutes,seconds}
}
useEffect(() => {
    let interval=setInterval(()=>{
        let result=getCountdown(openTime,closeTime)
        setcountdown(result)
    })
    return ()=>clearInterval(interval)
    }, [openTime,closeTime])


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
        const res=await fetch(`${baseUrl}auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,phone,password,name,surname})
        })
        const data= await res.json();
    
        if (res.ok) {
               localStorage.setItem("signature",data.signature)
               setshowRegister(false);
               setIsOpen(true)
     
        }else{
            setregisterError(data)
        }
       
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
        setloginError(null);
        try {
        
            const res=await fetch(`${baseUrl}auth/signin`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            const data= await res.json();

            if (res.ok) {
             
             
           
              
         
             }else{
               
                setloginError(data)
               
             }
         




           

          // localStorage.setItem("signature",data.signature)
           // router.push("/")
        } catch (error) {
      console.log(error.msg);
            setloginError(error.message)
        }
        finally{
            setloading(false)
        }
        
        
        }
    useEffect(() => {
        if (registerError?.msg) {
         setshow(true);
         const timer=setTimeout(()=>{
             setshow(false)
         },5000)
         return ()=>clearTimeout(timer)
        }
      
        if (loginError?.msg) {
         setshow(true);
         const timer=setTimeout(()=>{
             setshow(false)
         },5000)
         return ()=>clearTimeout(timer)
        }
      
         }, [registerError?.msg,loginError?.msg])
         
  return (
    <div >

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
    The minimum price is ${currentPrice ? currentPrice: ""}
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

<p className='mb-2'>

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
    VAT on Buyers Premium (15.00%) : 
   </b>
   <span>
{formatCurrency(Math.round(vat))}
   </span>

    </p>
    <hr/>
    <p className='mb-2 mt-2 text-[14px] flex justify-between'>
   <b>
   Total  : 
   </b>
   <span>
{formatCurrency(Math.round(total))}
   </span>

    </p>

</p>

{
    /**
     * <input  type='number' value={amount} onChange={(e)=>setamount(e.target.value)}    placeholder='' className='w-full pl-4 pr-10 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>

     */
}
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
  
    isEdit &&     <div key={key} className="flex items-center justify-center fixed inset-0   backdrop-blur-sm    z-10000000 ">
  
        {
      bidEdited === false &&     <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999 backdrop-blur-sm ">
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
  
      }} className='text-red-500 font-bold cursor-pointer' size={20}/>
      </p>
      </p>
      <p className='flex items-center content-center justify-between'>
          <p className='flex gap-2 items-center align-middle content-center'>
          <p className='mt-1'>
          <FaCalculator size={15} />
          </p>
        
      
          <h2 className="text-xl font-semibold text-indigo-100">
      Bid Calculator 
      </h2>
      
          </p>
      
      
      
      </p>
      <p className='flex align-middle content-center text-[14px]'>
      
      Use calculator below to determine your final invoice amount based on your bid.
         
          </p>
      <p className='mb-2'>
      <p className='mb-2 mt-2 font-bold text-[14px]'>
          The minimum price is ${currentPrice ? currentPrice: ""}
          </p>
      <p className='mb-2 mt-2 font-bold text-[14px]'>
          Your current bid price  is ${getUserBid?.amount}
          {
            /**
             * {data?.amount}
             */
          }
          </p>
          <p className='flex justify-between align-middle content-center'>
      <h3 className='font-bold'>
          Enter Your Bid
      </h3>
      <p>
       
          <input  type='text'  onChange={(e)=>setgetUserBid({...getUserBid,amount:e.target.value})}    placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-[#4f46e5] focus:ring-[#4f46e5] focus:outline-none rounded-md'/>
      
          </p>
          </p>
        
      
      </p>
    
 
      <p className='mb-2'>
      
      <p className='mb-2 mt-2 text-[14px] flex justify-between'>
         <b>
          Buyers Premium (15.00%) : 
         </b>
         <span>
      {formatCurrency(Math.round(getUserBid?.buyersPremium))}
         </span>
      
          </p>
      
          <p className='mb-2 mt-2 text-[14px] flex justify-between'>
         <b>
         VAT on Buyers Premium (15%) : 
         </b>
         <span>
      {formatCurrency(Math.round(getUserBid?.vatOnBuyersPremium))}
         </span>
      
          </p>
          <hr />
          <p className='mb-2 mt-2 text-[14px] flex justify-between'>
         <b>
         Total  : 
         </b>
         <span>
      {formatCurrency(Math.round(getUserBid.total))}
         </span>
      
          </p>
   
      
      
      </p>
      
      {
          /**
           * <input  type='number' value={amount} onChange={(e)=>setamount(e.target.value)}    placeholder='' className='w-full pl-4 pr-10 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
      
           */
      }
      <p className='flex justify-center'>
      <button onClick={()=>submitEditBid()} className="bg-indigo-600 hover:bg-indigo-500  rounded  text-white px-4 py-2 cursor-pointer">
      Submit
      </button>
      </p>
      
      
      </div> 
        }
         
        
        
        
        
        
    
        
        
                        </div> 
                      
}

{
 showBidConfirmation &&   <div className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center backdrop-blur-sm ">
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
   <form onSubmit={handleLogin}>
   {
                    show &&   <p className='mt-3 mb-3 text-red-500'>
               {loginError?.msg}
                    </p>
                }
{
    loading &&  <p className='mt-3 mb-3 '>
    Loading....
         </p>
}

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
<input value={password} onChange={(e)=>setpassword(e.target.value)} type={showPassword ? "text":"password"}  placeholder='Enter your password' className='w-full pl-4 pr-10 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>

<span onClick={togglePassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
{
    showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
}
</span>
</div>

  

</p>

   
    <p className='flex justify-between sm:justify-between gap-5'>
     
      <button 
         className='border-2 border-[#4f46e5] rounded-md text-[#4f46e5] px-4 py-2 cursor-pointer'>
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
               {registerError?.msg}
                    </p>
                }
                     {
                    loading &&  <p className='mt-3 mb-3 '>
                   Loading...
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
     
      <button  className='border-2 border-[#4f46e5] rounded-md text-[#4f46e5] px-4 py-2 cursor-pointer'>
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

{
    type === "Online" && <AuctionTimer closeTime={closeTime} openTime={openTime}/>
}



{
    type === "Onsite" &&  <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
    <span>
 Lot Starting Price
    </span>
    <span>
    ${currentPrice}
    </span>
  
  </h5>
}
{
    type === "Onsite" &&  <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
    <span>
 Lot Expected Selling Price
    </span>
    <span>
    ${expectedPrice}
    </span>
  
  </h5>
}
{
    type === "Onsite" &&  <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
    <span>
 Auction Date
    </span>
    <span>
    {formatDate(startDateTime).date} 
    </span>
  
  </h5>
}
{
    type === "Onsite" &&  <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
    <span>
 Auction Time
    </span>
    <span>
    {localTime(startDateTime)} 
    </span>
  
  </h5>
}


{
    type === "Online" &&  <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
    <span>
   Number of Bids placed
    </span>
    <span>
    {bids}
    </span>
  
  </h5>
}

<div className='flex items-center justify-center mt-4'>

{
    previousPathName === "/upcomingauctions" ?  <p  className=''>
  
 
 </p> : 
    <p  className='grid'>
{
    type === "Online" && countdown?.status!=="Not Yet Open" ? <>
      {


   
userBid  ? 
<span className='flex justify-evenly align-middle items-center gap-40'>
<button 
onClick={
    ()=>{
        if (session) {
            
            setloggedIn(true)
     
            setIsEdit(!isEdit)
            setgetUserBid(userBid)
        }else {
setloggedIn(false);
redirect(`/login?from=/auctions/${auctionId}`)
        }
    }
}

className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-6 py-2 rounded-md font-medium cursor-pointer'>
    Edit Item
</button>

<Link className='bg-white hover:bg-[#7a6bff] hover:text-white text-[#7a6bff] text-sm px-4 py-2 rounded-md font-medium cursor-pointer' href={`/lots/${id}`}>
More Info
</Link>

</span>




    :
<p className='flex justify-evenly align-middle items-center gap-40'>
<button 
    onClick={
        ()=>{
            setIsOpen(!isOpen)
         
        }
    }
    
    className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-4 py-2 rounded-md font-medium cursor-pointer'>
        Bid Item
    </button>
    
    <Link href={`/lots/${id}`} className='bg-white hover:bg-[#7a6bff] hover:text-white text-[#7a6bff] text-sm px-4 py-2 rounded-md font-medium cursor-pointer'>
    More Info
    </Link>
</p>
   




} 

    </> 
    :
    <p >
        
<Link className='bg-white hover:text-white hover:bg-[#7a6bff] text-[#7a6bff] text-sm px-4 py-2 rounded-md font-medium cursor-pointer' href={`/lots/${id}`}>
More Info
</Link>
    </p>


}

    
     

 
    
    </p>
}


</div>
</div>
</div>
          
            



    </div>
  )
}

export default AuctionCard


{
    /**    <Image src={lotImages ?  `${imageServerUrl}${lotImages[0].newPath}` : image} alt='Alternate Image' width={280} height={280}/>
          
       
      
<main>
    <header>
        <h3 className='font-bold ' style={{
            fontSize:"18px"
        }}>
          {
            propertyName ? propertyName : "Hyundai Tucson Accent"
          }  
        </h3>
    </header>
    <section style={{
        display:"flex",
    
        justifyContent:"space-between"
    }} className=' '>
<p className='flex'>
{timeleft.days}d {timeleft.hours}hrs {timeleft.minutes}mins {timeleft.seconds}secs left
</p>
<p className='flex gap-1 align-middle'>
<FaGavel size={18} className='text-blue-500'/> <span className='font-bold'>
{bids}
    </span>
</p>

    </section>
  
<div className="flex justify-between mt-2">
    <p>
        <b>
          ${currentPrice? currentPrice : "12000"}
        </b>
    </p>
{
    previousPathName === "/upcomingauctions" ?  <p  className=''>
  
 
 </p> : 
    <p  className=''>
       {


   
        userBid  ?  <button 
        onClick={
            ()=>{
                if (session) {
                    
                    setloggedIn(true)
             
                    setIsEdit(!isEdit)
                    setgetUserBid(userBid)
                }else {
        setloggedIn(false);
        redirect(`/login?from=/auctions/${auctionId}`)
                }
            }
        }
        
        className='border-blue-500 border-2 text-blue-500 px-6 py-0.9 cursor-pointer'>
            Edit
        </button>
        
        
        
 
            :

            <button 
            onClick={
                ()=>{
                    if (session) {
                        
                        setloggedIn(true)
                 
                        setIsOpen(!isOpen)
                    }else {
            setloggedIn(false);
            redirect(`/login?from=/auctions/${auctionId}`)
                    }
                }
            }
            
            className='border-blue-500 border-2 text-blue-500 px-6 py-0.9 cursor-pointer'>
                Bid
            </button>
            




       } 


 
    
    </p>
}

</div>


</main>
 */
}
  