import {baseUrl,imageServerUrl} from "../urls"


export async function fetchAuction(id){
   

       let res=await fetch(`${baseUrl}auction/get-auction/${id}`)
      
      if (!res.ok) {
          throw new Error("Failed to fetch lots ")
      } 
      return res.json()
  }