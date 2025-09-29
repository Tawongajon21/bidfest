import { useInfiniteQuery } from "@tanstack/react-query";
import { getOnlineAuctions } from "../../helpers/getOnlineAuctions";
const useOnlineAuctions=()=>{


return    useInfiniteQuery({
        queryKey:["get-online-auctions"],
        queryFn:getOnlineAuctions,
        getNextPageParam:(lastPage)=>lastPage.nextPage?? false,
        refetchOnWindowFocus:false,
        refetchInterval:false
    })
}

export default useOnlineAuctions