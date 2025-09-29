import {baseUrl,imageServerUrl} from "../urls"


export async function fetchAuctions(){
    let res=await fetch(`${baseUrl}auction/get-auctions`)
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    return res.json()
}
/*
export async function fetchLots({queryKey}){
    const [_key,id]=queryKey;
     let res=await fetch(`${baseUrl}auction/get-auction/${id}`)
     console.log(res);
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    return res.json()
}
*/