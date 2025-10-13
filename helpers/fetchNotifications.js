import {baseUrl,imageServerUrl} from "../urls"
export async function fetchNotifications(cursor=null){

    let token=localStorage.getItem("signature")
console.log(token);
if(token === null){
  return {data:[]}
}


    if (token!==null) {
      let res=await fetch(`${baseUrl}notification/get-notifications?cursor=${cursor||""}`,{
       
        headers:{
            Authorization : `Bearer ${token}`
        }
    })

  let json=await res.json();
console.log(json);
  return json
    }




 

}