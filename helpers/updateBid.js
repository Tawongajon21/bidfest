import {baseUrl,imageServerUrl} from "../urls"

export async function updateBid(bid){
   

let token=localStorage.getItem("signature")
     let res=await fetch(`${baseUrl}bid/update-bid/${bid._id}`,{

        method:"PATCH",
      
        headers:{
        "Content-Type": "application/json",
         Authorization : `Bearer ${token}`
        },
     
        body:JSON.stringify(bid),
        
     })
    
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    
    return res.json()

}