import {useMutation,useQueryClient} from "@tanstack/react-query"
import { baseUrl } from "@/urls";
export const useLogin=()=>{
    let queryClient=useQueryClient();
    return useMutation({
        mutationFn:async (formData:{email:String;password:String})=>{
            console.log(formData);
            
            const res=await fetch(`${baseUrl}auth/signin`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            if (!res.ok) {
              let json=await res.json()
              let msg=json.msg


               throw new Error(msg)
            }
            const data= await res.json();
          
            localStorage.setItem("signature",data.signature);
            return data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["sessions"]})
        }
    })
}