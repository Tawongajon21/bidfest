import {baseUrl,imageServerUrl} from "../urls"



export async function fetchBid(id){
   
  console.log(id);
     let res=await fetch(`${baseUrl}bid/get-bid/${id}`)
     console.log(res);
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    return res.json()
}