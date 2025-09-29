import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
function useCountdown(openTime,closeTime) {
    const [status, setstatus] = useState("");
    const [timeleft, settimeleft] = useState("")
let open= new Date(openTime)
let close= new Date(closeTime)
    function msToTime(ms){
        let totalSeconds=Math.floor(ms/1000);
        let hrs=String(Math.floor(totalSeconds/3600)).padStart(2,"0");
        let mins=String(Math.floor((totalSeconds%3600)/60)).padStart(2,"0");
        let seconds= String(totalSeconds%60).padStart(2,"0");
console.log();
        return {hrs,mins,seconds}
    }
    useEffect(() => {
 if(!open||!close) return;
 const interval= setInterval(()=>{
    let now= new Date();
    let tempopen= new Date(openTime);
    let tempclose=new Date(closeTime);
    if (now<tempopen) {
        setstatus("Not Yet Open");
        settimeleft(msToTime(tempopen-now));
    }else if(now>=tempopen&& now<tempclose){
setstatus("Open");
settimeleft(msToTime(tempclose-tempopen))
    }
    else{
        setstatus("Closed");
        settimeleft("00:00:00")
        clearInterval(interval)
    }
 },1000)
    }, [open,close])
    
  return {status,timeleft}
}

export default useCountdown