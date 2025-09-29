"use client"
import AuctionClient from "./auctions"
import {baseUrl,imageServerUrl} from "../../urls"
import { useQuery } from "@tanstack/react-query";
import { fetchAuctions } from "../../helpers/fetchData";
import { useMemo } from "react";
import classifyAuctions from '../../helpers/classifyAuctions'
import AuctionsLoading from "../../components/AuctionsLoading";
export default function AuctionWrapper(){
const {data,isLoading,error}=useQuery({
    queryKey:["auctions"],
    queryFn:fetchAuctions
})

console.log(data);

if (data=== undefined) {
    console.log("hello");
}
const live=useMemo(()=>{
    if (!data) {
        return []
    }else{
        return data.liveAuctions
    }

   
},[data])



if (error) {
    return <div>
        Error : {error.message}
    </div>
}
  console.log(live);
    return (
<AuctionClient isLoading={isLoading} data={live}/>
    )
}