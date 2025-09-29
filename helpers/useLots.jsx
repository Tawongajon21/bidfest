import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSearchLots } from "./fetchSearchLots";
const useLots=(searchParams={})=>{


return    useInfiniteQuery({
        queryKey:["search-lots",searchParams],
        queryFn:({pageParam=null})=>fetchSearchLots(pageParam,searchParams),
        getNextPageParam:(lastPage)=>lastPage.nextCursor?? false,
        refetchOnWindowFocus:false,
        refetchInterval:false
    })
}

export default useLots