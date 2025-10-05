"use client"
import { useState,useEffect } from "react";
import { useQuery,useQueryClient,useMutation} from "@tanstack/react-query";
export const getSessionFromToken=(token)=>{
const payload= JSON.parse(atob(token.split(".")[1]));
return {token,payload}
}
export const getSession=()=>{
    let token= localStorage.getItem("signature");
    if (!token || token === undefined) {
        return null
    }else{
        console.log(token.split("."));
        let payload= JSON.parse(atob(token.split(".")[1]));
        console.log(payload);
        return {token,payload}
    }
   

  
}
export const clearSession=()=>{
    localStorage.removeItem("signature")
}
export const useSession=()=>{

    return useQuery({
        queryKey:["sessions"],
        queryFn: getSession,
        staleTime:Infinity,
        cacheTime:Infinity,
        refetchOnWindowFocus:false,
     
    })
}

export const useClearSession=()=>{
    let queryClient= useQueryClient()
    const logout=()=>{
        clearSession();
        queryClient.setQueryData(["sessions"],null);

    }
    return logout
}

