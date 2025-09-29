"use client"
import React from 'react'
import { baseUrl } from '../../../urls';
import AuctionClient from './AuctionClient';

import { useQuery } from "@tanstack/react-query";
import  {fetchLots}  from "../../../helpers/fetchLots";
import {use} from "react"
import { useRouter } from 'next/router';
import useSession from "@/middleware/useSession"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRef,useState } from 'react';
import {getPreviousPath} from "../../../components/RouteTracker"
export default  function Page({params}) {
  const {id}=use(params);
  const {session}=useSession();
  let userId=session?.payload._id;

  const {data,isLoading,error}=useQuery({
    queryKey:["lots",id],
    queryFn:fetchLots,
    enabled:!!id,
    refetchOnWindowFocus:false,
    refetchOnMount:false,
  
})
let lots=data?.lots;
let bids=lots?.map((item)=>{
  return item.bids
})

let userBids=bids?.map((item)=>(
  item.find((bid)=>bid.user?._id===userId)
));

let pathname=usePathname();

const previousPathRef=useRef(null);
const [previousPath, setpreviousPath] = useState(null)
useEffect(() => {
 setpreviousPath(previousPathRef.current);
 previousPathRef.current=pathname
}, [pathname])
let previousPathName=getPreviousPath()


//let singleBidUser=bids?.filter((item)=>item===userId)


//console.log(bids);

  return (
    <AuctionClient userBids={userBids} previousPathName={previousPathName} data={data}/>

  )
}

// 
