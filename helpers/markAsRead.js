import {baseUrl,imageServerUrl} from "../urls"
export async function markNotificationRead(id){
    let token=localStorage.getItem("signature")
 let res=await fetch(
    `${baseUrl}notification/read/${id}`,
    
    {
        headers:      {
           "Cache-Control":"no-cache",
           Authorization : `Bearer ${token}`
        },
        method:"PUT"
     
       }
 
 )
 return res.json()

}