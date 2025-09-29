import { useInfiniteQuery } from "@tanstack/react-query";
import { getOnsiteAuctions } from "../../helpers/getOnsiteAuctions";
const useOnsiteAuctions=()=>{


return    useInfiniteQuery({
        queryKey:["get-onsite-auctions"],
        queryFn:getOnsiteAuctions,
        getNextPageParam:(lastPage)=>lastPage.nextPage?? false,
        refetchOnWindowFocus:false,
        refetchInterval:false
    })
}

export default useOnsiteAuctions