import React from 'react'
import { useState } from 'react'
function LotLoadingSkeleton() {

  return (
    <div className='w-full bg-white shadow rounded p-4 space-y-4 '>

    <div className='h-90 w-full bg-gray-900 rounded animate-pulse'>

    </div>
    <div className='h-5 w-[50%] bg-gray-900 rounded animate-pulse'>

    </div>
    <div className='h-5 w-[45%] bg-gray-900 rounded animate-pulse'>

    </div>
    <div className='h-5 w-[40%] bg-gray-900 rounded animate-pulse'>

    </div>
    <div className='h-5 w-[35%] bg-gray-900 rounded animate-pulse'>

    </div>
    <div className='h-5 w-[30%] bg-gray-900 rounded animate-pulse'>

    </div>
  

   

    </div>
  )
}

export default LotLoadingSkeleton