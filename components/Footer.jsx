import React from 'react'
import { FaFacebook,FaInstagram,FaTwitter,FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

function Footer() {
    let date= new Date();
    let year= date.getFullYear()
  return (
    <footer className=' bg-indigo-50  text-[#0A2540] md:flex justify-between'>
     
        <header className='mt-6'>
<div className='flex align-middle items-center gap-5 justify-evenly'>
    <h2 className='text-3xl font-bold  mt-6'>
        Bidfirst
    </h2>
    <ul className='flex gap-4  mt-6'>
        <li>
<Link href="/"><FaInstagram size={30}/></Link>
        </li>
        <li>
<Link href="/"><FaTwitter size={30}/></Link>
        </li>
        <li>
<Link href="/"><FaFacebook size={30}/></Link>
        </li>
        <li>
<Link href="/"><FaLinkedin size={30}/></Link>
        </li>
    </ul>
  
</div>
<div className='flex justify-evenly mt-4 '>
        <Link href="/contactus" className='border-2 border-[#4f46e5] py-2 px-8 cursor-pointer'>
            Contact
        </Link>
        <Link href="/faqs" className='border-2 border-[#0A2540] py-2 px-8 cursor-pointer'>
         Support
        </Link>
    </div>
</header>
<section className='flex justify-evenly mt-4 md:gap-8'>
<div className='' >
   
        <p className='underline decoration-[#4f46e5] decoration-4  mb-3'>
          <Link href="/">
          Shop
          </Link> 

        
        </p>
        <p>
            <Link href="/liveauctions">Live Auctions</Link>
        </p>
        <p>
            <Link href="/upcomingauctions">Upcoming Auctions</Link>
        </p>
        <p>
            <Link href="/onlineauctions">Online Auctions</Link>
        </p>
        <p>
            <Link href="/onsiteauctions">Onsite Auctions</Link>
        </p>
        <p>
            <Link href="/searchpage">Search</Link>
        </p>
  
</div>
<div className='' >
   
        <p className='border-b-blue-500  underline decoration-[#4f46e5] decoration-4  mb-3 '>
           <Link href="/">
           Sell
           </Link>

        
        </p>
        <p>
            <Link href="/">Sell your Vehicle</Link>
        </p>
    
   
</div>




</section>







<section className='flex justify-evenly mt-4 md:gap-8'>

    <div>
        <p className='border-b-blue-500  underline decoration-[#4f46e5] decoration-4  mb-3 '>
           
Discover
        
        </p>
        <p>
            <Link href="/faqs">Frequently Asked <br /> Questions</Link>
        </p>
   
        <p>
            <Link href="/">Terms and Conditions</Link>
        </p>
        <p>
            <Link href="/privacypolicy">Privacy Policy</Link>
        </p>
        <p>
            <Link href="/cookiepolicy">Cookie Policy</Link>
        </p>
    </div>


<div>
      
           
        <p className='border-b-blue-500  underline decoration-[#4f46e5] decoration-4  mb-3 '>
           
          Company
                   
                   </p>
        
      
        <p>
            <Link href="/">About Bidfest</Link>
        </p>
        <p>
            <Link href="/contactus">Contact Us</Link>
        </p>
  
    </div>


</section>







      

   <div className='mt-2 grid '>
<hr  className='md:hidden'/>
<p className='grid justify-center md:mt-5'>
&copy; {year} Bidfirst. All Rights Reserved.
</p>

   </div>
    </footer>
  )
}

export default Footer