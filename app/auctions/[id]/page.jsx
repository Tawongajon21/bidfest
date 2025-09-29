import React from 'react'
import Wrapper from './Wrapper'
import {fetchAuction} from "../../../helpers/getAuction"

export async function generateMetadata({params}) {
  let auction=await fetchAuction(params.id)
  return {
    title:auction.name,
    description:"Auction Description"
  }
}
async function Page({params}) {
let auction= await fetchAuction(params.id)
console.log(auction?.name);
  return (
    <Wrapper params={params}/>
  )
}



export default Page


