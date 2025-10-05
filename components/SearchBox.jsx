"use client"
import React from 'react'
import {FiSearch} from "react-icons/fi"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter,useSearchParams } from 'next/navigation'
function SearchBox() {
  const [inputText, setinputText] = useState("")
  const router= useRouter();
  const handleSearch=(e)=>{
    e.preventDefault()
    if (inputText.trim()) {
        router.push(`searchpage?query=${encodeURIComponent(inputText.trim())}`)
    }
  }
 
  return (
    <div style={{
      backgroundColor:"#14263c"
    }} className='grid place-items-center  justify-center content-center items-center  h-50 text-white   z-100'>
        <div>
        <h2 className=" text-3xl  md:text-4xl font-bold flex justify-center"  >
            Search Of Items
        </h2>
        <form onSubmit={handleSearch}  className='mt-4 grid justify-center'>
            <input   name='search' onChange={(e)=>setinputText(e.target.value)} value={inputText} type='text' className='w-80 md:w-120 justify-self-center  pl-2 bg-white  h-10 z-100  text-black   sm:w-90' >

            </input>
            
            <p className='flex justify-center gap-5 mt-4'>
                <Link href="/searchpage" className='cursor-pointer border-3 border-b-white px-5 py-3'>
                    Advanced Search
                </Link>
    
                <button style={{
       
        color:"#4f46e5"
                }} type='submit' className='cursor-pointer border-3  px-17 py-3 '>
<FiSearch className='cursor-pointer' size={20}/>
                </button>
            </p>
        </form>
        </div>
      
    </div>
  )
}

export default SearchBox