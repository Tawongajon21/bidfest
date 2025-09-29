
import {baseUrl,imageServerUrl} from "../urls"


export async function fetchFeaturedLots(){
    let res=await fetch(`${baseUrl}lot/get-featured-lots`)
    if (!res.ok) {
        throw new Error("Failed to fetch lots ")
    } 
    return res.json()
}