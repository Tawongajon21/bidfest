import React from 'react'
import AuctionCard from "../../helpers/components/auctionCard"
function Page() {
  return (
    <>
<div className='bg-blue-500 py-8 text-3xl  md:text-4xl font-bold flex justify-center '>
    <h2 className='text-white'>
        BidFest Kadoma Auction
    </h2>
</div>
<div className=' px-13 flex gap-14 flex-wrap  justify-center'> 
    <AuctionCard/>
    <AuctionCard/>
    <AuctionCard/>
    <AuctionCard/>
    <AuctionCard/>
    <AuctionCard/>
    <AuctionCard/>
    <AuctionCard/>
    <AuctionCard/>
    <AuctionCard/>
    </div>
    </>
  )
}

export default Page