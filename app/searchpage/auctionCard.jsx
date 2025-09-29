'use client'
import React from 'react'
import Image from 'next/image'
import image from "@/public/images/car-bg.png"
import {AiFillStar} from "react-icons/ai"
import {BiChair, BiCar, BiCalendar} from "react-icons/bi"
import {BsCarFront, BsSpeedometer} from "react-icons/bs"
import {FaDoorOpen, FaPerson} from "react-icons/fa6"
import Link from 'next/link'
import useSession from "@/middleware/useSession"
import {FaCar, FaRev, FaGasPump, FaGavel, FaSignOutAlt, FaCalculator, FaInfo} from "react-icons/fa"
import {FiX} from 'react-icons/fi'
import {useMutation, useQueryClient, useQuery, useQueries} from '@tanstack/react-query'
import {placeBid} from "@/helpers/addBid"
import {updateBid} from "@/helpers/updateBid";
import {useEffect, useState} from 'react'
import {imageServerUrl, baseUrl} from '@/urls'
import {redirect} from "next/navigation"
//import {fetchPersonalBids} from "../../helpers/getPersonalBids"
import {fetchPersonalBids} from "@/helpers/getPersonalBids"
import {fetchBid} from "@/helpers/fetchBid"
import { deleteBid } from '../../helpers/cancelBid'
import EditDataModal from "@/components/EditDataModal"
function AuctionCard({openTime,closeTime,startDateTime,type,refetch, rank, lotImages, key, userHadBid, isLive, item, previousPathName, bids, id, auctionId, auctionDate, auctionDeadline, auctionTime, exteriorImages, sold, code, startingPrice, location, propertyName, mileage, currentPrice, userBids, auctionType}) {
    const deleteBidObject=useMutation({
        mutationFn:deleteBid,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["lots",id]})
        }
    })
    console.log(userHadBid);
    const [showBidConfirmation, setshowBidConfirmation] = useState(false);


    const [staleBid, setstaleBid] = useState({})
    let queryClient = useQueryClient();
    const {session} = useSession();
    const [text, settext] = useState(" 11d 30hrs 50mins 10seconds")
    const [bidPlaced, setbidPlaced] = useState(false)
    const [bidEdited, setbidEdited] = useState(false)
    const [showPrice, setshowPrice] = useState(false)
    const [loggedIn, setloggedIn] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const [adminFee, setadminFee] = useState(8.47)
    let lot = id
    const [amount, setamount] = useState("");
    const [amountEdit, setamountedit] = useState("");
    let documentHandling = amount * 0.15
    console.log(documentHandling);
    let auction = auctionId
    let userId = session?.payload._id;

    console.log(userBids);


    useEffect(() => {
        const timer = setInterval(() => {
            setshowPrice((prevShowPrice) => !prevShowPrice);

        }, 3000)
        return () => clearTimeout(timer)
    }, [])
    const [timeleft, settimeleft] = useState("")
    const getTimeLeft=()=>{
        let now=new Date();
        let open= new Date(openTime);
        let close=new Date(closeTime)
        if (now<open) {
            return {status:"not_started",label:"Auction not opened yet"}
        }
        if (now>=close) {
            return {status:"closed",label:"Auction closed"}
        }
        let diff= close-now;
        let totalSeconds= Math.floor(diff/1000);
        let totalMinutes=Math.floor(diff/1000/60);
        let days=Math.floor(totalSeconds/(60*60*24));
        let hours=Math.floor((total%(60*60*24))/3600);
        let minutes=Math.floor((totalSeconds%3600)/60);
        let seconds=totalSeconds%60
        return {status:"open",label:`${days} days ${hours} hours ${minutes} minutes  ${seconds} seconds left`}
    }
const [status, setstatus] = useState("")
    useEffect(()=>{
        let updateCountdown=()=>settimeleft(getTimeLeft());
        let updateStatus=()=>{
            let {status,label}=getTimeLeft(openTime,closeTime);
     
            setstatus(status)
settimeleft(label)
        }
        updateStatus()
      
        let interval=setInterval(updateStatus,1000);
        return ()=>clearInterval(interval)
    },[openTime,closeTime])
    useEffect(() => {
        const interval = setInterval(() => {

            let dateString = auctionDate.split("T")[0]

            const fullDateTime = dateString + "T" + auctionTime + ":00"

            let deadline = new Date(fullDateTime);
            let now = new Date();
            const diff = deadline - now;
            if (diff <= 0) {
                clearInterval(interval);
                settimeleft({days: 0, hours: 0, minutes: 0, seconds: 0})
            } else {
                settimeleft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60 * 24)) % 24),
                    minutes: Math.floor((diff / (1000 * 60)) % 60),
                    seconds: Math.floor((diff / 1000) % 60),


                })
            }




        }, 1000)
        return () => clearInterval(interval)
    }, [auctionDate, auctionDeadline])

    let signature = session?.token;

    let bidData = {auction, lot, amount}
    const {mutate, isPending, error, } = useMutation({
        mutationFn: placeBid,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["lots", id]})
        }



    })
    let buyersPremium = 0.15 * Number(amount)
    let vat = Number(buyersPremium) * 0.15;

    let vatOnBuyersPremium = 0.15 * buyersPremium;
    let total = Number(buyersPremium) + Number(vatOnBuyersPremium) + Number(amount);

    const updateBidObject = useMutation({
        mutationFn: updateBid,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["lots", id]})
        }
    })



    let bid = {auction, amount, lot, buyersPremium, vatOnBuyersPremium, total}

    const submitBid = () => {

        if (signature) {
            if (amount < currentPrice) {
                alert("The Amount should be equal or greater than the Current Price")
                return
            }
            mutate(bid)
            setbidPlaced(!bidPlaced)
            setshowBidConfirmation(!showBidConfirmation)
            




        }

    }







    let userBid = session ? userBids?.find((bid) => bid?.lot === id) : null;
    let bidId = userBid?._id
    const editBid = () => {

        if (signature) {
            if (amountEdit < currentPrice) {
                alert("The Amount should be equal or greater than the Current Price")
                return
            }
            let updateBid = {amount: amountEdit, id: bidId}
            updateBidObject.mutate(updateBid)
            setbidEdited(!bidEdited)

            setTimeout(() => {
                window.location.pathname = "/personalbids"

            }, 3000)

        }

    }

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('en-ZW', {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(number)
    }



    const [getUserBid, setgetUserBid] = useState({})

    const handleEditFunction = () => {
        console.log(bid)
    }
    const BUYERS_PREMIUM_RATE = 0.15;
    const VAT_RATE = 0.15;









    useEffect(() => {
        setstaleBid(getUserBid)
        let amount = parseFloat(getUserBid?.amount) || 0;
        let premium = parseFloat((amount * BUYERS_PREMIUM_RATE)).toFixed(2);
        let vat = parseFloat((premium * VAT_RATE).toFixed(2));

        let total = parseFloat((Number(amount) + Number(premium) + Number(vat))).toFixed(2)

        setgetUserBid((prev) => ({
            ...prev,
            amount: Number(amount),
            buyersPremium: Number(premium),
            vatOnBuyersPremium: Number(vat),
            total: Number(total)
        }))
    }, [getUserBid?.amount])


    const submitEditBid = () => {

        if (signature) {
            if (getUserBid.amount < currentPrice) {
                alert("The Amount should be equal or greater than the Current Price")
                return
            }

            updateBidObject.mutate(getUserBid)

            setbidPlaced(!bidPlaced)

            setIsEdit(false)
            setbidEdited(!bidEdited)
            setshowBidConfirmation(!showBidConfirmation)




        }

    }

    const handleDelete=(id)=>{
        deleteBidObject.mutate(id)
    }
    const formatDate=(date)=>{
        let dateObj=new Date(date)
        let optionsDate={day:"numeric",month:"long",year:"numeric"}
        let formattedDate=dateObj.toLocaleDateString("en-GB",optionsDate)
        let time= dateObj.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:false})
        return {date:formattedDate,time}
    }

console.log(status);
console.log(timeleft);

    return (
        <div style={{
            boxShadow: "10px 10px 10px rgba(0,0,0,0.2)"
        }} className='w-96 md:w-96 rounded-lg overflow-hidden shadow-xl bg-white '>

            {
                /**Place Bid Modal Open Starts Here */
            }
            {
                showBidConfirmation && <div className="fixed inset-0 bg-transparent  bg-opacity-50 z-99999999999999 flex items-center justify-center backdrop-blur-sm ">
                    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
                        <p className='flex items-center content-center justify-between'>
                            <p>
                                <h2 className="text-xl font-semibold mb-4">
                                    Bid edited successfully
                                </h2>
                            </p>

                            <p className='mt-[-15px]'>
                                <FiX onClick={() => {
                                    setshowBidConfirmation(!showBidConfirmation)
                                }} className='text-red-500 font-bold cursor-pointer' size={20} />
                            </p>
                        </p>

                        <p className='mb-4'>
                            You have placed your bid successfully, you can decide either to stay on this page or to go to my bids page to monitor your bids
                        </p>

                        <p className='flex justify-between sm:justify-between gap-5'>
                            <button onClick={() => {

                                window.location.pathname = "/personalbids"


                            }} className="bg-[#4f46e5] text-white px-4 rounded-md py-2 cursor-pointer">
                                Go to my bids page
                            </button>
                            <button onClick={() => {
                                refetch()
setIsOpen(!isOpen)
                                setshowBidConfirmation(!showBidConfirmation)

                            }} className='border-2 border-[#4f46e5] rounded-md text-[#4f46e5] px-4 py-2 cursor-pointer'>
                                Remain on this page
                            </button>
                        </p>
                    </div>
                </div>
            }




            {
                isOpen && <div className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center backdrop-blur-sm">
                    {
                        bidPlaced === true && <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999 ">
                            <p className='flex items-center content-center justify-between'>
                                <p>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        Place Your Bid
                                    </h2>
                                </p>

                                <p className='mt-[-15px]'>
                                    <FiX onClick={() => {
                                        setIsOpen(!isOpen)
                                    }} className='text-red-500 font-bold cursor-pointer' size={20} />
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
                                    The minimum price is ${currentPrice ? currentPrice : ""}
                                </p>
                                <p className='flex justify-between align-middle content-center'>
                                    <h3 className='font-bold'>
                                        Enter Your Bid
                                    </h3>
                                    <p>

                                        <input type='number' value={amount} onChange={(e) => setamount(e.target.value)} placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md' />

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


                            {
                                /**
                                 * <input  type='number' value={amount} onChange={(e)=>setamount(e.target.value)}    placeholder='' className='w-full pl-4 pr-10 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
                            
                                 */
                            }
                            <p className='flex justify-center'>
                                <button onClick={() => submitBid()} className="bg-[#635BFF] text-white px-4 py-2 cursor-pointer">
                                    Submit
                                </button>
                            </p>


                        </div>


                    }









                </div>
            }


            {
                /**Place Bid Modal Open Ends Here */
            }




            {
                /*Edit Bid Modal Open Starts Here */
            }


            {

                isEdit &&
                <div key={key} className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center backdrop-blur-sm">

                    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999 ">
                        <p className='flex items-center content-center justify-between'>
                            <p>
                                <h2 className="text-2xl font-semibold mb-4">
                                    Edit Your Bid
                                </h2>
                            </p>

                            <p className='mt-[-15px] cursor-pointer'>
                                <FiX onClick={() => {
                                    console.log("hello");
                                    setIsEdit(!isEdit)
                                    ///  console.log(bidEdited);
                                }} className='text-red-500 font-bold' size={20} />
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
                                The minimum price is ${currentPrice}
                            </p>
                            <p className='mb-2 mt-2 font-bold text-[14px]'>
                                Your current bid price  is ${getUserBid.amount}

                            </p>
                            <p className='flex justify-between align-middle content-center'>
                                <h3 className='font-bold'>
                                    Enter Your Bid
                                </h3>
                                <p>

                                    <input type='text' onChange={(e) => setgetUserBid({...getUserBid, amount: e.target.value})} placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md' />

                                </p>
                            </p>


                        </p>
                        <hr />
                        <p className='mb-2 mt-2 text-[14px] flex justify-between'>
                            <b>
                                Buyers Premium (15.00%) :
                            </b>
                            <span>
                                {formatCurrency(Math.round(getUserBid.buyersPremium))}
                            </span>

                        </p>


                        <p className='mb-2 mt-2 text-[14px] flex justify-between'>
                            <b>
                                VAT on Buyers Premium (15%) :
                            </b>
                            <span>
                                {formatCurrency(Math.round(getUserBid.vatOnBuyersPremium))}
                            </span>

                        </p>

                        <p className='mb-2 mt-2 text-[14px] flex justify-between'>
                            <b>
                                Total :
                            </b>
                            <span>
                                {formatCurrency(Math.round(getUserBid.total))}
                            </span>

                        </p>







                        <p className='flex justify-center'>
                            <button onClick={() => submitEditBid()} className="bg-[#635BFF] text-white px-4 py-2 cursor-pointer">
                                Submit
                            </button>
                        </p>


                    </div>










                </div>


            }

            {
                /*Edit Bid Modal Open Ends Here */
            }





            <div style={{
                boxShadow: "10px 10px 10px rgba(0,0,0,0.2)"
            }} className='w-full   rounded-lg overflow-hidden shadow-xl bg-white  '>

                <Image src={`${imageServerUrl}${lotImages[0]?.newPath}`} loading='lazy'
                    placeholder='blur'
                    blurDataURL={lotImages ? `${imageServerUrl}${lotImages[0]?.thumbnail}` : image} alt='Alternate Image' width={500} height={500} className='w-full h-50 object-cover mb-0.4' />





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
                        type === "Onsite" &&   <>      
                          <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                        <span>
                           Auction Date
                        </span>
                        <span>
                        {formatDate(startDateTime).date}
                        </span>



                    </h5>
                    <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                        <span>
                           Auction Start Time
                        </span>
                        <span>
                            {formatDate(startDateTime).time}
                        </span>



                    </h5>
                    <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                        <span>
                           Lot Price
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
                    <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
                        <span>
                          Auction Location
                        </span>
                        <span>
                            {location}
                        </span>



                    </h5>
                    <p className='flex justify-center mt-4'>
                       
                            
                                   
                                    <Link href={`/lots/${id}`} className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-6 py-2 rounded-md font-medium cursor-pointer'>
                                        More Information
                                    </Link>
                            


</p>

</>
         
                  
                    }
           
{
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
}


             
                </div>
            </div>



        </div>
    )
}

export default AuctionCard