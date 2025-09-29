'use client'
import React from 'react'
import Image from 'next/image'
import image from "@/public/images/car-bg.png"
import {AiFillStar} from "react-icons/ai"
import {BiChair,BiCar,BiCalendar} from "react-icons/bi"
import {BsCarFront,BsSpeedometer} from "react-icons/bs"
import {FaDoorOpen,FaPerson} from "react-icons/fa6"
import useSession from "@/middleware/useSession"
import {FaCar,FaRev,FaGasPump,FaGavel,FaSignOutAlt,FaCalculator,FaInfo} from "react-icons/fa"
import { FiX } from 'react-icons/fi'
import { useMutation,useQueryClient, useQuery,useQueries } from '@tanstack/react-query'
import {placeBid} from "../../../helpers/addBid"
import {updateBid} from "../../../helpers/updateBid";
import { useEffect,useState } from 'react'
import { imageServerUrl,baseUrl } from '@/urls'
import {redirect} from "next/navigation"
//import {fetchPersonalBids} from "../../helpers/getPersonalBids"
import {fetchPersonalBids} from "@/helpers/getPersonalBids"
import {fetchBid} from "@/helpers/fetchBid"
import EditDataModal from "@/components/EditDataModal"
import Link from 'next/link'
import AuctionTimer from './AuctionTimer'
function AuctionCard({openTime,closeTime,auctionType,key,lotImages,item,previousPathName,userBids,bids,id,auctionId,auctionDate,auctionDeadline, auctionTime ,propertyName,currentPrice}) {
  let queryClient=useQueryClient();
    const {session}=useSession();
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

let auction=auctionId
let userId=session?.payload._id;




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
const submitBid=()=>{
 
    if (signature) {
        if (amount<currentPrice) {
            alert("The Amount should be equal or greater than the Current Price")
            return
        }
        mutate(bid)
        setbidPlaced(!bidPlaced)

        setTimeout(()=>{
            window.location.pathname="/personalbids"
      
        },3000)
 

    }

  }


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

        setTimeout(()=>{
            window.location.pathname="/personalbids"
      
        },3000)
 

    }

  }
  return (
    <div style={{
        width:"280px"
    }}>

 
    
            
                <Image src={lotImages ?  `${imageServerUrl}${lotImages[0].newPath}` : image} alt='Alternate Image' width={280} height={280}/>
          
       
      
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
<AuctionTimer openTime={openTime} closeTime={closeTime}/>
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

  
    <p  className=''>
           <Link 
       href={`/lots/${id}`}
            className='border-blue-500 border-2 text-blue-500 px-6 py-0.9 cursor-pointer'>
              More Info 
            </Link>
            


  
    
    </p>


</div>


</main>




    </div>
  )
}

export default AuctionCard