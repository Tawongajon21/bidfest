import {io} from "socket.io-client";
import { serverUrl } from "../urls";
const socket=io(serverUrl,{
    transports:['websocket']
})
socket.on('connect',()=>{
    console.log('Connected to socket server',socket.id)
})
export default socket