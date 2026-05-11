'use client'
import {useEffect, useState} from "react"
import {useQueryClient} from "@tanstack/react-query"
import {io} from 'socket.io-client'
import { serverUrl } from '@/urls'

const useSocketNotifications = () => {
    const queryClient = useQueryClient()
    const [socket, setsocket] = useState(null)

    useEffect(() => {
        const socketIo = io(serverUrl, {
            auth: {
                token: localStorage.getItem("signature")
            }
        }); 
        setsocket(socketIo)

        socketIo.on("notification", (data) => {
            queryClient.invalidateQueries({queryKey: ["unreadNotifications"]}) // ✅ v5 syntax
        })

        return () => socketIo.disconnect() 
    }, [])
}

export default useSocketNotifications

