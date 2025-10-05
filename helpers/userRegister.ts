import {useMutation,useQueryClient} from "@tanstack/react-query"
import { baseUrl } from "@/urls";
export const useRegister=()=>{
    let queryClient=useQueryClient();
    return useMutation({
        mutationFn:async (formData:{email:String,phone:String,password:String,name:String,surname:String})=>{
            const res=await fetch(`${baseUrl}auth/signup`,{
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