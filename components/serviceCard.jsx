import React from 'react'
import {FaThumbsUp,FaWallet} from "react-icons/fa"
import {AiOutlineCreditCard} from "react-icons/ai"
function ServiceCard() {
  return (
    <div className='grid justify-center gap-15 mt-5 md:flex mb-5'>
     <div className='grid  w-60 gap-3'>
<section>
    <FaThumbsUp size={30} className='text-blue-500'/>

</section>
<h2 className='font-bold text-1xl'>
    Top Buy & Sell Car
</h2>
<p className='leading-relaxed tracking-normal'>
    Buy and Sell the best and most trusted cars we provide the best platform for you and easy to use
</p>
    </div>
     <div className='grid  w-60 gap-3'>
<section>
    <FaWallet size={30} className='text-blue-500'/>

</section>
<h2 className='font-bold text-1xl'>
    Easy Payment
</h2>
<p>
   Transactions are very easy and safe,you can pay using anything and the money will be recieved by us first
</p>
    </div>
     <div className='grid  w-60 gap-3'>
<section>
    <AiOutlineCreditCard size={30} className='text-blue-500'/>

</section>
<h2 className='font-bold text-1xl'>
  Easy To Use
</h2>
<p>
    We will make it easier for you to use our platform and be able to sell or buy the car of your dreams
</p>
    </div>

    </div>
   
  )
}

export default ServiceCard