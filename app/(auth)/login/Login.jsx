"use client"
import React from 'react'
import Link from 'next/link'
import { AiOutlineEye ,   AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState,useEffect } from 'react'
import { baseUrl } from '@/urls'
import { useRouter,useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useLogin } from '@/helpers/userLogin'

function Login() {
    const {mutate:login,isPending,error,isLoading,isSuccess}=useLogin()

   let searchParams=useSearchParams();
   let page=searchParams.get("from")
console.log(error?.message);

    const [showPassword, setshowPassword] = useState(false)
    const [email, setemail] = useState("")
    const [formData, setformData] = useState({email:"",password:""})
    const [loading, setloading] = useState(false)
    const [show, setshow] = useState(false)
   
    const router=useRouter()
   
    const [password, setpassword] = useState("")
    const togglePassword=()=>{
        setshowPassword(!showPassword)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
    
  login(formData)
        
        
        }

        useEffect(() => {
       if (error) {
        setshow(true);
        const timer=setTimeout(()=>{
            setshow(false)
        },5000)
        return ()=>clearTimeout(timer)
       }
       if (isSuccess) {
  router.push("/")
      }
        }, [error,isSuccess])
       
  return (
    <Suspense fallback={<h2>Loading ....</h2>}>
    <div  className='flex items-center h-screen justify-center'>
        <div className='grid justify-center px-3 py-5  dark:shadow-gray-800' style={{
            boxShadow:"0 0 10px rgba(0,0,0,0.2)"
        }}>
           <h2 className='flex justify-center text-3xl text-blue-950 font-bold dark:text-[#4f46e5] '>
            BidFest
            </h2> 
            <main className='mt-10 grid justify-center'> 


      

                <h3 className='flex justify-start text-[20px] text-blue-950 mb-3 dark:text-gray-100'>
                    Welcome to BidFest 👋
                </h3>
             
                
                <p className='flex justify-start text-blue-950 w-[85%] dark:text-gray-100'>
                    Please sign-in to your account and start the adventure
                </p>
              
            </main>
            <section className='mt-2'>
               <form  onSubmit={handleSubmit} className='mb-6'>
               {
                    show &&  <p className='mt-3 mb-3 text-red-500'>
               {error?.message}
                    </p>
                 
                }

{
   isLoading && <Suspense fallback={<p className='mt-3 mb-3 '>
    Loading....
         </p>}> <p className='mt-3 mb-3 '>
    Loading....
         </p>
         </Suspense>
}


<p className='grid mb-2'>
    <label htmlFor="" className='mb-2 text-blue-950 dark:text-gray-100'>Email</label>
    <input type="email" value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})}  placeholder='Enter your email' className='py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md  dark:focus:border-[text-[#4f46e5] dark:focus:ring-[#4f46e5]'/>
</p>
<div className='grid mt-2'>
    <p className='flex justify-between align-middle'>
    <label htmlFor="" className='mb-2 text-blue-950 dark:text-gray-100'>Password</label>
    <label htmlFor="">
        <Link href="/" className='text-blue-500'>
        Forgot Password?
        </Link>
    </label>
    </p>
 


<p className='relative'>
<input value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})}  type={showPassword ? "text":"password"}  placeholder='Enter your password' className='w-full pl-4 pr-10 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md dark:focus:border-[text-[#4f46e5] dark:focus:ring-[#4f46e5]'/>

<span onClick={togglePassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
{
    showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
}
</span>
</p>

  

</div>

<p className='mb-3 grid justify-center mt-5 w-full'>
    {
        /*   text-white px-8  z-100   py-2 mt-4 tracking-wide rounded-md cursor-pointer md:px-15 sm:px-10*/
    }

    <button className='border-2 border-[#4f46e5] bg-[#4f46e5] py-2 px-20 md:px-25 sm:px-40 rounded-md text-white cursor-pointer '>
        Sign in
    </button>
</p>
<p className='flex gap-1 justify-center dark:text-gray-100'>
     <span>    New on our platform?   </span> <Link href="/register" className='text-blue-500'> Create an account</Link>
</p>
               </form>
            </section>
        </div>
    </div>
    </Suspense>
  )
}

export default Login
