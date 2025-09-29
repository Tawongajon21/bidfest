"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';

export const setPreviousPath=(path)=>{
    if (typeof window!== "undefined") {
      sessionStorage.setItem("previousPath",path)
    }
  }
  export const getPreviousPath=(path)=>{
    if (typeof window!== "undefined") {
    return  sessionStorage.getItem("previousPath")
    }
    return null
  }
function RouteTracker() {

    const pathname=usePathname();
    useEffect(() => {
        const prevPath=sessionStorage.getItem("currentPath")
        if (prevPath) {
            sessionStorage.setItem("previousPath",prevPath)
        }
sessionStorage.setItem("currentPath",pathname)
    }, [pathname])
    
  return null
}

export default RouteTracker