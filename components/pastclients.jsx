"use client"
import React from 'react'
import Image from 'next/image'
import ImageOne from "../public/icons/airbnb-2-logo-svgrepo-com.svg"
import ImageTwo from "../public/icons/amazon-icon-logo-svgrepo-com.svg"
import ImageThree from "../public/icons/apple-black-logo-svgrepo-com.svg"
import ImageFour from "../public/icons/byte-records-29744-logo-svgrepo-com.svg"
import ImageFive from "../public/icons/ethereum-logo-svgrepo-com.svg"
import ImageSix from "../public/icons/facebook-messenger-3-logo-svgrepo-com.svg"
import ImageSeven from "../public/icons/google-icon-logo-svgrepo-com.svg"
import ImageEight from "../public/icons/heineken-14-logo-svgrepo-com.svg"
import ImageNine from "../public/icons/intair-vacances-logo-svgrepo-com.svg"
import ImageTen from "../public/icons/mcdonald-s-15-logo-svgrepo-com.svg"
import ImageEleven from "../public/icons/nashville-predators-1-logo-svgrepo-com.svg"
import ImageTwelve from "../public/icons/silver-star-1-logo-svgrepo-com.svg"
import ImageThirteen from "../public/icons/slack-logo-svgrepo-com.svg"
import ImageFourteen from "../public/icons/snapchat-logo-svgrepo-com.svg"
import ImageFifteen from "../public/icons/tiktok-banner-black-3-logo-svgrepo-com.svg"
import ImageSixteen from "../public/icons/under-armour-logo-svgrepo-com.svg"
import ImageSeventeen from "../public/icons/viber-3-logo-svgrepo-com.svg"
import ImageEighteen from "../public/icons/wedge-clamp-system-logo-svgrepo-com.svg"
import ImageNineteen from "../public/icons/wonder-woman-logo-svgrepo-com.svg"
import ImageTwenty from "../public/icons/behance.svg"
import ImageTwentyOne from "../public/icons/dribbble.svg"
import ImageTwentyTwo from "../public/icons/dropbox.svg"
import ImageTwentyThree from "../public/icons/klarna.svg"
import ImageTwentyFour from "../public/icons/mailchimp.svg"
import ImageTwentyFive from "../public/icons/netflix.svg"

import { useState,useEffect } from 'react'

function PastClients() {
    let images=[ ImageOne,ImageTwo,ImageThree,ImageFour,ImageFive,ImageSix,ImageSeven,ImageEight,ImageNine,ImageTen,ImageEleven,ImageTwelve,ImageThirteen,ImageFourteen,ImageFifteen,ImageSixteen,ImageSeventeen,ImageEighteen,ImageNineteen,ImageTwenty,ImageTwentyOne,ImageTwentyTwo,ImageTwentyThree,ImageTwentyFour,ImageTwentyFive]
const [currentIndex, setcurrentIndex] = useState(0);

useEffect(() => {
 const intervalId=setInterval(()=>{
    setcurrentIndex((prevIndex)=>(prevIndex+1)%images.length)
 },6000);
 return ()=>clearInterval(intervalId)
}, [images.length])

  return (
    <div className='slideshow-container' style={{
        overflow:"hidden",
        width:"100%",
        marginTop:"1rem",
        marginBottom:"1rem"
    }}>
        <div className='slideshow' style={{
            transform:`translateX(-${currentIndex*(100/images.length)}%)`,
            transition:'transform 1s ease-in-out',
            display:"flex",
            gap:"2rem",
            width:`${images.length*100/6}%`
        }}>

{
    images.map((image,index)=>(
        <Image style={{
            objectFit:"cover",
            
        }} key={index} src={image} alt='svg-alt' height={100} width={100} />
    ))
}
        </div>

       
       
    </div>
  )
}

export default PastClients