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
import { useMemo } from 'react'
function Page() {
    const {data:auctions,isLoading,error}=useQuery({
        queryKey:["auctions"],
        queryFn:fetchAuctions
    })

    /*
    const {live,upcoming}=useMemo(()=>{
        if (!auctions) {
            return {live:[],upcoming:[]}
        }
        return classifyAuctions(auctions)
    },[auctions])
*/
console.log(auctions?.upcomingAuctions);
let auctionType="Upcoming"
  return (
    <>
 
      <AuctionClient isLoading={isLoading} data={auctions?.upcomingAuctions} auctionType={auctionType}/>
   
 
    </>
    
  )
}

export default Page