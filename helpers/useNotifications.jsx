import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNotifications } from "./fetchNotifications";
const useNotifications=()=>{


return    useInfiniteQuery({
        queryKey:["notifications"],
        queryFn:({pageParam=null})=>fetchNotifications(pageParam),
        getNextPageParam:(lastPage)=>lastPage.nextCursor?? false,
        refetchOnWindowFocus:false,
        refetchInterval:false
    })
}

export default useNotifications