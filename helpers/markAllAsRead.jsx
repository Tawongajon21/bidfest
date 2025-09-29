import {baseUrl,imageServerUrl} from "../urls"
import { useMutation,useQueryClient } from "@tanstack/react-query"

export default  function useMarkAllAsRead(){

    let token=localStorage.getItem("signature")
const queryClient=useQueryClient();
return useMutation({
mutationFn:async ()=>{
   await fetch(`${baseUrl}notification/mark-all-read`,{
       
      headers:{
          Authorization : `Bearer ${token}`
      },
      method:"PATCH"
  })
},
onSuccess:()=>{
   queryClient.invalidateQueries(["notifications"])
}
})


}

