'use client'
import { useEffect,useRef } from "react";
import {io} from "socket.io-client"
import { serverUrl } from "../urls";

export default function useSocket() {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(serverUrl, {
      withCredentials: true
    });

    socketRef.current.on("connection", () => {
      console.log("Connected:", socketRef.current.id)
    })

    return () => socketRef.current.disconnect()
  }, [])

  return socketRef.current;
}