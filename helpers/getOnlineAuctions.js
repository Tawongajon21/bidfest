import {baseUrl,imageServerUrl} from "../urls"


export async function getOnlineAuctions(){
    let res=await fetch(`${baseUrl}auction/get-online-auctions`)
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    return res.json()
}