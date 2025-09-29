import {baseUrl,imageServerUrl} from "../urls"


export async function fetchSearchLots(pageParam=null,searchParams={}){ 
    console.log(searchParams);
   const {search,minimumPrice,maximumPrice,vehicleType,itemType}=searchParams;
   let params= new URLSearchParams({
    ...(pageParam&&{cursor:pageParam}),
    ...(search&&{search}),
    ...(minimumPrice&&{minimumPrice}),
    ...(maximumPrice&&{maximumPrice}),
    ...(vehicleType&&{vehicleType}),
    ...(itemType&&{itemType})

   })
    let res=await fetch(`${baseUrl}lot/get-search-lots?${params||''}`)
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    return res.json()
}