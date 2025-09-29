"use client"
import React from 'react'
import {useRef,useEffect,useContext,createContext} from "react"
import { usePathname } from 'next/navigation'
const PreviousRouteContext=createContext();
export function PreviousRouteProvider({children}) {
    const pathname=usePathname();
    const previousPath=useRef(null)
    useEffect(()=>{
        previousPath.current=pathname;
    },[pathname])
return <PreviousRouteContext.Provider value={previousPath.current}>
{children}
</PreviousRouteContext.Provider>
}

export const usePreviousRoute=()=>useContext(PreviousRouteContext)