import { useState,useEffect } from "react";
export default function useSession() {
    const [session, setsession] = useState(null);
    const syncSession=()=>{
        const token= localStorage.getItem("signature");
        log
        if (token) {
            const payload=JSON.parse(atob(token.split('.')[1]));
            setsession({payload,token})
        }else{
            setsession(null)
        }
    }

    useEffect(() => {
        syncSession()

        const token= localStorage.getItem("signature");

    if (token) {
        const payload=JSON.parse(atob(token.split('.')[1]));

        setsession({payload,token})
    }
    window.addEventListener('storage',syncSession)
    return ()=>window.removeEventListener('storage',syncSession)
    }, [])
const clearSession=()=>{
    localStorage.removeItem("signature")
    setsession(null)
}
    return {session,setsession,clearSession,syncSession}
    
}