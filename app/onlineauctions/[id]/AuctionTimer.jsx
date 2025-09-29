import React from 'react'

import { useEffect,useState } from 'react'
function AuctionTimer({openTime,closeTime}) {
const [timeLeft, settimeLeft] = useState("");
const [status, setstatus] = useState("");
const [countdown, setcountdown] = useState({})
function getCountdown(openTimeStr,closeTimeStr){
    let now=new Date();
    let openTime=new Date(openTimeStr);
    let closeTime=new Date(closeTimeStr);
    if (now<openTime) {
        return {
            status:'Not Yet Open',
            countdownTo:'Open',
            timeLeft:formatTimeDiff(openTime-now)
        }
    }
    else if(now>=openTime&&now<closeTime){
return {
    status:'Open',
    countdownTo:'Close',
    timeLeft:formatTimeDiff(closeTime-now)
}
    }else{
        return {
            status:'Closed',
            countdownTo:null,
            timeLeft:null

        }
    }

}
function formatTimeDiff(diffMs) {
    let totalSeconds=Math.floor(diffMs/1000);
    let days=Math.floor(totalSeconds/(3600*24));
    let hours=Math.floor((totalSeconds%(3600*24))/3600)
    let minutes=Math.floor((totalSeconds%3600)/60);
    let seconds=totalSeconds%60
    return {days,hours,minutes,seconds}
}
useEffect(()=>{
if(!openTime||!closeTime) return
let timer;
let tick=()=>{
    console.log(openTime);
    let now= new Date();
    let open= new Date(openTime);
    let close=new Date(closeTime);
   
    if(now<open){
setstatus("Not yet open")
settimeLeft(msToTime(open-now))
timer= setTimeout(tick,1000);
    }else if(now>=open && now<close){
        setstatus("open");
        settimeLeft(msToTime(close-now))
        timer=setTimeout(tick,1000)
    }else{
        setstatus("closed");
        settimeLeft("00:00:00")
    }

}
tick()

return ()=>clearTimeout(timer)
},[openTime,closeTime])
const msToTime=(ms)=>{

    let totalSeconds=Math.floor(ms/1000);
    let days=Math.floor(totalSeconds/(3600*24))
    let hrs=Math.floor((totalSeconds%(3600*24))/3600)
        
    let mins=Math.floor((totalSeconds%3600)/60)
    let secs=totalSeconds%60
    return {
        days:String(days).padStart(2,'0'),
        hrs:String(hrs).padStart(2,'0'),
        mins:String(mins).padStart(2,'0'),
        secs:String(secs).padStart(2,'0')
    }
}
useEffect(() => {
let interval=setInterval(()=>{
    let result=getCountdown(openTime,closeTime)
    setcountdown(result)
})
return ()=>clearInterval(interval)
}, [openTime,closeTime])
console.log(countdown);
  return (
    <>
        {
       countdown.status ===  'Not Yet Open' &&    <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
       <span>
       Bidding Opens In
       </span>
       <span>
       {countdown.timeLeft.days} days {countdown.timeLeft.hours} hrs {countdown.timeLeft.minutes} minutes {countdown.timeLeft.seconds} seconds
   
       </span>
     
     </h5>
        }
        {
       countdown.status ===  'Open' &&    <h5 className='text-xl font-semibold mb-2 flex justify-between align-middle items-center'>
       <span>
   Bidding Closes In
       </span>
       <span>
       {countdown.timeLeft.days} days {countdown.timeLeft.hours} hrs {countdown.timeLeft.minutes} minutes {countdown.timeLeft.seconds} seconds
   
       </span>
     
     </h5>
        }
      
     
     

    </>
  )
}

export default AuctionTimer