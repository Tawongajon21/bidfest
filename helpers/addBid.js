import {baseUrl,imageServerUrl} from "../urls"

export async function placeBid(bid){

let token=localStorage.getItem("signature")
     let res=await fetch(`${baseUrl}bid/add-bid`,{

        method:"POST",
      
        headers:{
        "Content-Type": "application/json",
         Authorization : `Bearer ${token}`
        },
     
        body:JSON.stringify(bid),
        
     })
     console.log(res);
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    
    return res.json()

}