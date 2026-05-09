"use client"
import React from 'react'
import Link from 'next/link'
import { AiOutlineEye ,   AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState,useEffect } from 'react'
import { baseUrl } from '@/urls'
import { useRouter } from 'next/navigation'
import { useRegister } from '@/helpers/userRegister'

function Wrapper() {
    const {mutate:register,isPending,error,isLoading,isSuccess}=useRegister()

    const [showPassword, setshowPassword] = useState(false)
    const [name, setname] = useState("")
    const [surname, setsurname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [loading, setloading] = useState(false)
   
    const [valid, setvalid] = useState(true)
    const [show, setshow] = useState(false)
    let router=useRouter()
    const togglePassword=()=>{
        setshowPassword(!showPassword)
    }
    const formatPhoneNumber=(value)=>{
const digits=value.replace(/\D/g,"");
let cleaned=digits.startsWith('263')? digits.slice(3):digits;
let parts=[];
if (cleaned.length>0) {
    parts.push(cleaned.slice(0,3))
}
if(cleaned.length>3){
parts.push(cleaned.slice(3,6))
}
if(cleaned.length>6){
parts.push(cleaned.slice(6,9))
}
return `+263 ${parts.join(' ')}`
    }
const isStrongPassword=(password)=>{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!!%*?&]{8,})$/.test(password);
}
const [isstrong, setisstrong] = useState(true)
  const  handleChange=(e)=>{
        const value=e.target.value;
        const name=e.target.name;
      
            setemail(value)
            setvalid(/^[^\s@]+@[^\s@]+\.[^\s@]+/.test(value))
     
       
    }
  
  const  handlePassword=(e)=>{
        const value=e.target.value;
        const name=e.target.name;
      
            setpassword(value)
            setisstrong(isStrongPassword(value))
     
       
    }



const handleSubmit=async(e)=>{
e.preventDefault();

if (password!==confirmPassword) {
    alert("Password and Confirm Password are not matching")
    return
}
else{
let formData={email,phone,password,name,surname}
    register(formData)
   
}





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
    <div  className='flex items-center h-screen justify-center'>
        <div className='grid justify-center px-3 py-5' style={{
            boxShadow:"0 0 10px rgba(0,0,0,0.2)"
        }}>
           <h2 className='flex justify-center text-3xl text-blue-950 font-bold dark:text-[#4f46e5]'>
            BidFest
            </h2> 
            <main className='mt-10 grid justify-center'> 
                <h3 className='flex justify-start text-[20px] text-blue-950 mb-3 dark:text-gray-100'>
                    Welcome to BidFest 👋
                </h3>
                <p className='flex justify-start text-blue-950 w-[85%] dark:text-gray-100'>
                    Please create your account and start the adventure
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
                    isLoading &&  <p className='mt-3 mb-3 '>
                   Loading...
                         </p>

                }
<p className='grid mb-2'>
    <label htmlFor="" className='mb-2 text-blue-950 dark:text-gray-100'>Name</label>
    <input type="name" value={name} onChange={(e)=>setname(e.target.value)}   placeholder='Enter your name' className='py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md   '/>
</p>
<p className='grid mb-2'>
    <label htmlFor="" className='mb-2 text-blue-950 dark:text-gray-100'>Surname</label>
    <input type="text" value={surname} onChange={(e)=>setsurname(e.target.value)}   placeholder='Enter your surname' className='py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md   '/>
</p>
<p className='grid mb-2'>
    <label htmlFor="" className='mb-2 text-blue-950 dark:text-gray-100'>Phone Number</label>
    <input type="tel" value={phone} onChange={(e)=>setphone(formatPhoneNumber(e.target.value))}   placeholder='Enter your phone number' className='py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md   '/>
</p>
<p className='grid mb-2'>
    <label htmlFor="" className='mb-2 text-blue-950 dark:text-gray-100'>Email</label>
    {
    !valid && <p className='text-red-500 mt-2 mb-2'>
    Invalid email
    </p>
}

    <input name='email' type="email" value={email} onChange={handleChange}   placeholder='Enter your email' className='py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md   '/>

</p>
<p className='grid mt-2'>
    <p className='flex justify-between align-middle'>
    <label htmlFor="" className='mb-2 text-blue-950 dark:text-gray-100'>Password</label>

    </p>
 


<div className='relative'>
<input value={password} onChange={handlePassword}   name='password' type={showPassword ? "text":"password"}  placeholder='Enter your password' className='w-full pl-4 pr-10 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
<span onClick={togglePassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
{
    showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
}
</span>
</div>

  

</p>
<p className='grid mt-2'>
    <p className='flex justify-between align-middle'>
    <label htmlFor="" className='mb-2 text-blue-950 dark:text-gray-100'>Confirm Password</label>

    </p>
 


<div className='relative'>
<input onChange={(e)=>setconfirmPassword(e.target.value)} type={showPassword ? "text":"password"}  placeholder='Enter your password' className='w-full pl-4 pr-10 py-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
<span onClick={togglePassword} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
{
    showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
}
</span>
</div>

  

</p>

<p className='mb-3 grid justify-center mt-5 w-full'>
    <button className='border-2 border-[#4f46e5] bg-[#4f46e5] py-2 px-40 rounded-md text-white cursor-pointer'>
        Sign up
    </button>
</p>
<p className='flex gap-1 justify-center'>
     <span>    Already have an account?   </span> <Link href="/login" className='text-blue-500'> Login</Link>
</p>
               </form>
            </section>
        </div>
    </div>
  )
}

export default Wrapper
