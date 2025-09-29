import {baseUrl,imageServerUrl} from "../urls"



export async function fetchLot({queryKey}){
    const [_key,id]=queryKey;
     let res=await fetch(`${baseUrl}lot/get-lot/${id}`,
  {
     headers:      {
        "Cache-Control":"no-cache"
     }
    }
     )
     console.log(res);
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    return res.json()
}