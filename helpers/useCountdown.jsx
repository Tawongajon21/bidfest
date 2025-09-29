import React from 'react'
import { useState,useEffect } from 'react'
function useCountdown(targetDate,targetTime) {
    let tempTargetDate=targetDate?.split("T")[0];
  
const [timeleft, settimeleft] = useState({days:0,hours:0,minutes:0,seconds:0});
useEffect(()=>{
    const target=new Date(`${tempTargetDate}T${targetTime}:00`);
    let interval=setInterval(()=>{
        let now=new Date();
        let difference=target-now;
        if (difference<0) {
            clearInterval(interval);
            settimeleft({days:0,hours:0,minutes:0,seconds:0})
            return
        }
        const days=Math.floor(difference/(1000*60*60*24));
        const hours=Math.floor((difference/(1000*60*60))%24);
        const minutes=Math.floor((difference/1000/60)%60);
        const seconds=Math.floor((difference/1000)%60)
settimeleft({days,hours,minutes,seconds})

    },1000)
    return ()=>clearInterval(interval)
},[targetDate,targetTime])
  return timeleft
}

export default useCountdown