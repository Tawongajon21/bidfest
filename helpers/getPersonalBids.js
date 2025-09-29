import {baseUrl,imageServerUrl} from "../urls"



export async function fetchPersonalBids({queryKey}){
    const [_key,id]=queryKey; 
    let token=localStorage.getItem("signature")
     let res=await fetch(`${baseUrl}bid/get-user-bid/${id}`,
  {
     headers:      {
        "Cache-Control":"no-cache",
        Authorization : `Bearer ${token}`
     }
  
    }
     )
     console.log(res);
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    return res.json()
}