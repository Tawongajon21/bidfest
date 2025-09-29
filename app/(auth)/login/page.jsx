"use client"
import React from 'react'
import Link from 'next/link'
import { AiOutlineEye ,   AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState,useEffect } from 'react'
import { baseUrl } from '@/urls'
import { useRouter,useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
function Page() {
   let searchParams=useSearchParams();
   let page=searchParams.get("from")
console.log(page);
    const [showPassword, setshowPassword] = useState(false)
    const [email, setemail] = useState("")
    const [loading, setloading] = useState(false)
    const [show, setshow] = useState(false)
    const [error, seterror] = useState(null)
    const router=useRouter()
   
    const [password, setpassword] = useState("")
    const togglePassword=()=>{
        setshowPassword(!showPassword)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setloading(true);
        seterror(null);
        try {
        
            const res=await fetch(`${baseUrl}auth/signin`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            const data= await res.json();

            if (res.ok) {
             
             
                localStorage.setItem("signature",data.signature)
                
                if (page==="/" || page===null) {

                    router.push("/")
                }else{
                    router.push(`${page}`)
                }
              
              
         
             }else{
               
                seterror(data)
               
             }
         




           

          // localStorage.setItem("signature",data.signature)
           // router.push("/")
        } catch (error) {
      console.log(error.msg);
            seterror(error.message)
        }
        finally{
            setloading(false)
        }
        
        
        }
        console.log(error?.msg);
        useEffect(() => {
       if (error?.msg) {
        setshow(true);
        const timer=setTimeout(()=>{
            setshow(false)
        },5000)
        return ()=>clearTimeout(timer)
       }
     
        }, [error?.msg])
        
  return (
    <div  className='flex items-center h-screen justify-center'>
        <div className='grid justify-center px-3 py-5' style={{
            boxShadow:"0 0 10px rgba(0,0,0,0.2)"
        }}>
           <h2 className='flex justify-center text-3xl text-blue-950 font-bold'>
            BidFest
            </h2> 
            <main className='mt-10 grid justify-center'> 


      

                <h3 className='flex justify-start text-[20px] text-blue-950 mb-3'>
                    Welcome to BidFest 👋
                </h3>
             
                
                <p className='flex justify-start text-blue-950 w-[85%]'>
                    Please sign-in to your account and start the adventure
                </p>
              
            </main>
            <section className='mt-2'>
               <form  onSubmit={handleSubmit} className='mb-6'>
               {
                    show &&  <p className='mt-3 mb-3 text-red-500'>
               {error?.msg}
                    </p>
                 
                }


{
    loading && <Suspense fallback={<p className='mt-3 mb-3 '>
    Loading....
         </p>}> <p className='mt-3 mb-3 '>
    Loading....
         </p>
         </Suspense>
}


<p className='grid mb-2'>
    <label htmlFor="" className='mb-2 text-blue-950'>Email</label>
    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)}  placeholder='Enter your email' className='py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md   '/>
</p>
<p className='grid mt-2'>
    <p className='flex justify-between align-middle'>
    <label htmlFor="" className='mb-2 text-blue-950'>Password</label>
    <label htmlFor="">
        <Link href="/" className='text-blue-500'>
        Forgot Password?
        </Link>
    </label>
    </p>
 


<div className='relative'>
<input value={password} onChange={(e)=>setpassword(e.target.value)} type={showPassword ? "text":"password"}  placeholder='Enter your password' className='w-full pl-4 pr-10 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>

<span onClick={togglePassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
{
    showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
}
</span>
</div>

  

</p>

<p className='mb-3 grid justify-center mt-5 w-full'>
    <button className='border-2 border-blue-500 bg-blue-500 py-2 px-40 rounded-md text-white cursor-pointer'>
        Sign in
    </button>
</p>
<p className='flex gap-1 justify-center'>
     <span>    New on our platform?   </span> <Link href="/register" className='text-blue-500'> Create an account</Link>
</p>
               </form>
            </section>
        </div>
    </div>
  )
}

export default Page