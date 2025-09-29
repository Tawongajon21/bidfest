import { useEffect,useRef } from "react";
import {io} from "socket.io-client"
import { serverUrl } from "../urls";
export default function useSocket(){
useEffect(() => {
  let socket=io(serverUrl,{
    withCredentials:true
  });

  socket.on("connection",()=>{
    console.log("Connected:",socket.id)
  })


  return () => socket.disconnect()
}, [])

}