import {baseUrl,imageServerUrl} from "../urls"



export async function fetchLots({queryKey}){
    const [_key,id]=queryKey;
     let res=await fetch(`${baseUrl}auction/get-auction/${id}`,
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