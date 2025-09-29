"use client"
import React from 'react'
import { MdArrowDownward } from 'react-icons/md'
import {HiChevronDown} from "react-icons/hi"
import { useState } from 'react'
function FAQS() {
    let faqs=[
        {
            id:1,
            question: "1. What is Bidfirst?",
            answer:" Bidfirst is an online and on-site auction platform that connects sellers with buyers for a variety of items, including vehicles, electronics, livestock, household goods, and more."
            
        },
        {
            id:2,
            question: "2. How do I register to bid?",
            answer:"You can create a free account by clicking Sign Up on our homepage. After verifying your email and completing your profile, you’ll be eligible to participate in auctions."
            
        },
        {
            id:3,
            question: "3. Is there a registration fee?  ",
            answer:"Basic registration is *free*. However, some premium auctions may require a refundable deposit or pre-approval to participate."
            
        },
        {
            id:4,
            question: "4. How do I place a bid?",
            answer:" Once registered and logged in, visit the item page, enter your bid amount, and click *Place Bid*. You’ll receive confirmation if your bid is successful."
            
        },
        {
            id:5,
             
           
       
        
            question: "5. What happens if I win an auction?",
            answer:" If you’re the highest bidder when the auction closes, you’ll receive a confirmation and invoice. You’ll need to complete payment within the specified timeframe to avoid penalties."
            
        },
        {
            id:6,
             
           
       
        
            question: "6. What payment methods do you accept?",
            answer:"  We accept bank transfers, mobile money, and selected credit/debit cards. Payment instructions will be provided on your invoice."
            
        },
        {
            id:7,
             
           
       
        
            question: "7. What is a buyer’s premium?  ",
            answer:"A buyer’s premium* is an additional percentage added to the winning bid. It covers administrative costs and will be shown clearly before bidding."
            
        },
        {
            id:8,
             
           
       
        
            question: "8. Can I inspect items before bidding?",
            answer:" Yes, for physical auctions, viewing dates and locations will be listed. For online auctions, detailed descriptions and photos are provided."
            
        },
        {
            id:9,
             
           
       
        
            question: "9. How do I know if an item is sold?*  ",
            answer:" Items marked as \"Sold\" have been awarded to a winning bidder. You can also check your dashboard for updates."
            
        },
        {
            id:10,
             
           
       
        
            question: "10. What happens if I don’t win the bid?    ",
            answer:" If you don’t win, there’s no obligation to pay. You can continue participating in other auctions."
            
        },
        {
            id:11,
            
           
           
       
        
            question: "11. How can I contact support?    ",
            answer:" You can reach us at support@bidfirst.co.zw or through the contact form on our website."
            
        },

        
     
      
      
        
        

        
        
       
  
         
    

      
       
        ]
        const [showAnswer, setshowAnswer] = useState(false)
        const [activeIndex, setactiveIndex] = useState(null)
        const toggleFAQ=(index)=>{
            setactiveIndex(activeIndex===index ? null : index)
        }
  return (
    <>
     <div className='bg-[#635BFF] text-white'>
     <h2 className="text-white text-2xl font-bold px-12 pt-5">
Frequently Asked Questions
</h2>
<div className='px-12 pt-5 '>
    {
   faqs.map((item)=>(
    <section  style={{
        borderBottom:"transparent",
        border:"1px solid white"
    }} className='border-2 border-white w-[90%] '>
  
   
        <main key={item.id} className='mb-4'>
        <h2 className='flex align-middle content-center justify-between mt-2'>
            <span className='px-4'>
           {item.question}
            </span>
            <span onClick={()=>toggleFAQ(item.id)} className='cursor-pointer px-4'>
                <HiChevronDown size={25}/>
            </span>

        </h2>
        {
            activeIndex === item.id&& (
                <p className='px-4 mb-5'>
                {
                  item.answer
                }
    
            </p>
            )
        }
    

    </main>
  

    
    
 
    </section>
  
   ))      
    }
  

</div>


     </div>
    </>
  )
}

export default FAQS