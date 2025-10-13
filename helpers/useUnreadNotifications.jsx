import {useQuery} from "@tanstack/react-query"

import {baseUrl,imageServerUrl} from "../urls"





export async function fetchNotifications(){

    let token=localStorage.getItem("signature")
    if (token===null) {
        return {data:[]}
    }else{
        let res=await fetch(`${baseUrl}notification/get-notifications`,{
       
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
    
      let json=await res.json();
    console.log(json.unreadCount);
      return json.unreadCount
    
     
    }


}


const useUnreadNotifications=()=>{
    return useQuery({
        queryKey:["unreadNotifications"],
        queryFn:fetchNotifications,
        refetchOnWindowFocus:false
    })
}

export default useUnreadNotifications