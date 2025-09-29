"use client"
import { createContext,useContext,useRef } from "react"
import { usePathname } from "next/navigation"

const PreviousRouteContext=createContext();

export const PreviousRouteProvider=({children})=>{
    const pathname=usePathname();
    const previousPathRef=useRef(null);

    useEffect(()=>{
        previousPathRef.current=pathname
    },[pathname])
    return (
        <PreviousRouteContext.Provider value={previousPathRef.current}>
            {children}
        </PreviousRouteContext.Provider>
    )
}

export const usePreviousRoute=()=>useContext(PreviousRouteContext)