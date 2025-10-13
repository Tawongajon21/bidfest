import React from 'react'

export async function fetchLot(id){
   
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
export async function generateMetadata({params}){
    let {id}= params;
    let lotData= await fetchLot(id);
    return {
        title:`Bidfirst Lot Item - ${lotData.propertyName}`
    }
}


async function Page({params}) {
    let {id}= params;
  return (
 <Wrapper id={id}/>
  )
}

