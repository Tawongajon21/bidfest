import {useEffect,useState} from "react"
import {useQueryClient} from "@tanstack/reat-query"
import  {io}  from 'socket.io-client'
import { serverUrl } from '@/urls'
const useSocketNotifications=()=>{
    const queryClient=useQueryClient()
    const [socket, setsocket] = useState(null)

    useEffect(()=>{
        const socketIo=io(serverUrl,{
            auth:{
                token:localStorage.getItem("signature")
            }
        }); 
        setsocket(socketIo)

        socketIo.on("notification",(data)=>{
queryClient.invalidateQueries(["unreadNotifications"])
        })
        

        

    },[])
}

export default useSocketNotifications