import React from 'react'

function UpcomingHeader() {
  return (
    <div className='grid justify-center mt-8'>
<header className='md:flex md:justify-center flex justify-center '>
    <h2 className='text-3xl font-bold   md:justify-center md:text-5xl   '>Featured  <span style={{
        color:"#4f46e5"
     }} >Sales</span></h2>
</header>
<main className='w-full flex justify-center mt-3'>
<p  className='dark:text-gray-100 flex text-gray-900  text-[17px] justify-center text-center mt-3 w-65 mb-8 md:w-90 md:flex md:justify-center'>
    Have a glance of what is on the auction
</p>
</main>


    </div>
  )
}

export default UpcomingHeader
