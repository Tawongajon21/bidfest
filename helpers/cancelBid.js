import {baseUrl,imageServerUrl} from "../urls"


export async function deleteBid(id){
   
let token=localStorage.getItem("signature")
     let res=await fetch(`${baseUrl}bid/delete-bid/${id}`,{

        method:"DELETE",
      
        headers:{
        "Content-Type": "application/json",
         Authorization : `Bearer ${token}`
        },
     
     
     })
    
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    
    return res.json()

}