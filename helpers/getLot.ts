import {baseUrl} from "../urls"
export async function getLot(id:string):Promise<any>{
   
    let res=await fetch(`${baseUrl}lot/get-lot/${id}`,
 {
    headers:      {
       "Cache-Control":"no-cache"
    }
   }
    )
 
   if (!res.ok) {
       throw new Error("Failed to fetch lots ")
   } 
   return res.json()
}