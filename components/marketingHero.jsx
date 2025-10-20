"use client"
import React from 'react'
import BgImage from "@/public/images/car-bg.png"
import UpcomingHeader from "@/components/UpcomingHeader"
import Image from 'next/image'
import AuctionCard from "@/components/auctionCard"
import ServiceCard from "@/components/serviceCard"
import Footer from "@/components/Footer"
import SearchBox from "@/components/SearchBox"
import PastClients from "@/components/pastclients"
import {FiSearch} from "react-icons/fi"
import { useQuery } from "@tanstack/react-query";
import  {fetchFeaturedLots}  from "@/helpers/fetchFeaturedLots";
import { imageServerUrl,baseUrl } from '@/urls'
import Link from 'next/link'
import image from "@/public/images/car-bg.png"
import { FaGavel } from 'react-icons/fa'
function MarketingHero() {
    let id="hello"
  const {data,isLoading,error}=useQuery({
    queryKey:["featured-lots"],
    queryFn:fetchFeaturedLots,
    enabled:!!id,
    refetchOnWindowFocus:false,
    refetchOnMount:false,
  
})
console.log(data);
  return (
    <>
    <div className='h-120 bg-cover bg-center bg-no-repeat  z-100' >
    <div className="absolute left-0 w-full h-full " 
    style={{
        background:"linear-gradient(to right,#fff, #e5f2ff",
        mixBlendMode:"multiply" 
    }}
    >



    </div>
<div className='flex'>
<div className=''>
    <h2 className="px-13 font-bold text-center   md:py-30 text-6xl     md:tracking-wide md:leading-[1.4] md:-mb-25 md:font-extrabold">
    Your Auction Journey  <br />
    Starts Here
     <span style={{
        color:"#4f46e5"
     }} > Bid First</span> 
</h2>
<p className='px-15  text-center flex justify-center' style={{
    fontSize:"17px"
}}>
    <span className='w-[95%]'>
   Trusted platform for smart buyers and serious sellers
    </span>

</p>
<p className='px-15 flex justify-center'> 
<Link href="/searchpage" style={{
        backgroundColor:"#4f46e5"
     }} className=' text-white px-8  z-100   py-2 mt-4 tracking-wide rounded-md cursor-pointer md:px-15 sm:px-10'>
    Let's Go Bidding
</Link>

</p>

    </div>
    <div className='hidden md:block'>
        <Image src={BgImage} width={500} height={500} alt='Background Image'/>
    </div>
   
</div>
 
    </div> 





  <SearchBox/>
  <div style={{
        clipPath:"polygon(0 0,100% 0, 100% 100%,0% 100%)"
    }} className='grid justify-center bg-indigo-50 py-20 px-6 '>
        <div className='max-w-3xl mx-auto text-center'>
<h4 className='text-indigo-500 uppercase tracking-wide text-sm font-semibold'>
Convenient Solution
</h4>
<h1 className='mt-2 text-indigo-900 text-4xl md:text-5xl font-bold'>
Online Auctions
</h1>
<p className='mt-4 text-gray-600 text-base md:text-lg'>
Discover,bid and win from the comfort of your home.Bidfirst brings auctions closer to you with seamless digital convenience.
</p>
<p className='mt-6'>
<Link href="/onlineauctions" className='mt-6 bg-[#4f46e5] hover:bg-[#4f46e5] text-white font-semibold py-2 px-6 rounded shadow-md transition-all cursor-pointer'>
    View Online Auctions
</Link>
</p>

        </div>

    </div>
 
    <div style={{
        clipPath:"polygon(0 30px,100% 0, 100% 100%,0% 100%)"
    }} className='grid justify-center bg-[#0A2540] py-20 px-6 -mt-12 '>
        <div className='max-w-3xl mx-auto text-center'>
<h4 className='text-indigo-300 uppercase tracking-wide text-sm font-semibold'>
Real Connections
</h4>
<h1 className='mt-2 text-white text-4xl md:text-5xl font-bold'>
Attend Our On-Site Auctions
</h1>
<p className='mt-4 text-indigo-50 text-base md:text-lg'>
Experience the thrill of live bidding in person.Our on-site auctions bring buyers and sellers together in a dynamic, transparent environment.Network,inspect items firsthand, and secure great deal with real-time excitement
</p>
<p className='mt-6'>
<Link href="/onsiteauctions" className='mt-6 bg-[#4f46e5] hover:bg-[#4f46e5] text-white font-semibold py-2 px-6 rounded shadow-md transition-all cursor-pointer'>
    View Onsite Auctions
</Link>
</p>
<div>
    
</div>

        </div>

    </div>




  <header className='md:flex md:justify-center flex justify-center mb-8 mt-6'>
    <h2 className='text-3xl font-bold   md:justify-center md:text-5xl   '>Our  <span style={{
        color:"#4f46e5"
     }} >Clients</span></h2>
</header>
<PastClients/>


    <UpcomingHeader/>
    <div className=' px-13 flex gap-14 flex-wrap  justify-center mb-8 mt-4'> 
{
    data?.slice(-7,-1).map((item)=>(
      
        <div key={item._id} style={{
    boxShadow:"10px 10px 10px rgba(0,0,0,0.2)"
}} className='max-w-sm rounded-lg overflow-hidden shadow-xl bg-white '>
<Image src={item?.lotImages ?  `${imageServerUrl}${item?.lotImages[0]?.newPath}` : image} alt='Alternate Image' width={500} height={500} className='w-full h-48 object-cover mb-0.4'/>
<div className='p-5 bg-[#0A2540] text-white'>

<h5 className='text-xl font-semibold mb-2'>
{
            item?.propertyName ?   item?.propertyName : "Hyundai Tucson Accent"
          }  
</h5>
<p className='text-sm text-gray-300 mb-4'>

</p>
<div className='flex items-center justify-between'>
<span className='text-lg font-bold text-white'>
${item?.currentPrice ? item?.currentPrice : "12000"}

</span>
<Link href={`/auctions/${item?.auction}`} className='bg-[#635BFF] hover:bg-[#7a6bff] text-white text-sm px-4 py-2 rounded-md font-medium cursor-pointer'>
See More
</Link>
</div>
</div>
</div>

      
        ))
}

   

    </div>



  <div className=' px-13 flex gap-14 flex-wrap  justify-center mb-8 mt-4'>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        
        <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 h-64 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10"></div>
          <div className="relative z-10 w-48 h-48 bg-white rounded-full shadow-md flex items-center justify-center">
            <div className="text-indigo-600 text-6xl">📦</div>
          </div>
        </div>

     
        <div className="p-6 space-y-4">
      
          <div className="flex items-center gap-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              Popular
            </span>
          </div>

    
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Product</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              High-quality product designed for modern professionals who value performance and elegance.
            </p>
          </div>

     
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-gray-900">$99</span>
              <span className="text-sm text-gray-500 line-through">$149</span>
            </div>
            <p className="text-sm text-green-600 font-medium">Save 34%</p>
          </div>

       
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-indigo-600">✓</span>
              <span>Free worldwide shipping</span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600">✓</span>
              <span>30-day money back guarantee</span>
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-600">✓</span>
              <span>24/7 customer support</span>
            </li>
          </ul>

          {/* Button */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-6">
           
            Add to Cart
          </button>

     
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>





  
 

<Footer/>

    </>
 
  )
}

export default MarketingHero
