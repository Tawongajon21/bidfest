import {baseUrl,imageServerUrl} from "../urls"


export async function getOnsiteAuctions(){
    let res=await fetch(`${baseUrl}auction/get-onsite-auctions`)
    if (!res.ok) {
        console.log(res.status);
        throw new Error("Failed to fetch lots ")
    }
  
    return res.json()
}
