const classifyAuctions=(auctions)=>{

    let now=new Date();
    let oneWeekFromNow=new Date()
    oneWeekFromNow.setDate(now.getDate()+7)



    let live=[];
    let upcoming=[];


   auctions.forEach((auction)=>{
    const auctionDateTime=new Date(auction.auctionDate);
    let [hours,minutes]=auction.auctionTime.split(":").map(Number);
    auctionDateTime.setHours(hours);
    auctionDateTime.setMinutes(minutes);
    auctionDateTime.setSeconds(0);
    auctionDateTime.setMilliseconds(0);



if (auctionDateTime<=oneWeekFromNow&& auctionDateTime>now) {
    live.push(auction)
}else if(auctionDateTime>oneWeekFromNow){
upcoming.push(auction)
}


   }) 



   return {live,upcoming}
}

export default classifyAuctions