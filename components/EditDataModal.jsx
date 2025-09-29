"use client"
import React from 'react'
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import {fetchBid} from "../helpers/fetchBid"
import { FiX } from 'react-icons/fi'
import { FaCalculator } from 'react-icons/fa'
import { memo } from 'react'
import { useState,useEffect } from 'react'
const EditModal=memo( function EditDataModal({data,_id,key,isOpen,bidEdited,isEdit,setIsEdit,amountEdit,setamountedit,formatCurrency,documentHandling,adminFee,buyersPremium,vat,totalWithVat,totalWithVatWithCashHandling,currentPrice,amount,id
}) {
 


    const updateItemById=()=>{
        mutation.mutate({id,updatedData:{amount:"20"}})
    }
    const mutation =useMutation({
        mutationFn:updateItemById,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["item",id]})
            onClose()
        }
    })
    /*
    if (!isOpen) {
        return <div>
            Loading...
        </div>
    }
    const handleUpdate=()=>{
        mutation.mutate({id,updatedData:{amount:"20"}})
    }
    */
  
const [formData, setformData] = useState(0)



  return (

<div key={key} className="fixed inset-0 bg-transparent  bg-opacity-50 z-40 flex items-center justify-center">
    {
  bidEdited === false ?      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
  <p className='flex items-center content-center justify-between'>
      <p>
      <h2 className="text-2xl font-semibold mb-4">
Edit Your Bid
  </h2>
      </p>
  
  <p className='mt-[-15px] cursor-pointer'>
  <FiX onClick={()=>{
    console.log("hello");
      setIsEdit(!isEdit)
///  console.log(bidEdited);
  }} className='text-red-500 font-bold' size={20}/>
  </p>
  </p>
  <p className='flex items-center content-center justify-between'>
      <p className='flex gap-2 items-center align-middle content-center'>
      <p className='mt-1'>
      <FaCalculator size={15} />
      </p>
    
  
      <h2 className="text-xl font-semibold ">
  Bid Calculator 
  </h2>
  
      </p>
  
  
  
  </p>
  <p className='flex align-middle content-center text-[14px]'>
  
  Use calculator below to determine your final invoice amount based on your bid.
     
      </p>
  <p className='mb-2'>
  <p className='mb-2 mt-2 font-bold text-[14px]'>
      The minimum price is ${currentPrice ? currentPrice: ""}
      </p>
  <p className='mb-2 mt-2 font-bold text-[14px]'>
      Your current bid price  is ${data?.amount}
      </p>
      <p className='grid justify-between align-middle content-center'>
  <h3 className='font-bold'>
      Enter Your Bid
  </h3>
  <p>
   
      <input  type='text'  onChange={(e)=>setformData(e.target.value)}    placeholder='' className='w-full pl-1 pr-1 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
  
      </p>
      </p>
    
  
  </p>
  <hr />
  <p className='mb-2'>
  <p className='mb-2 mt-2 text-[14px] flex justify-between'>
     <b>
      Document Handling Fee
     </b>
     <span>
     {formatCurrency(documentHandling)}
     </span>
  
      </p>
    </p>
    
  <p className='mb-2'>
  <p className='mb-2 mt-2 text-[14px] flex justify-between'>
     <b>
      Admin Fee : 
     </b>
     <span>
    {formatCurrency(adminFee)}
     </span>
  
      </p>
  <p className='mb-2 mt-2 text-[14px] flex justify-between'>
     <b>
      Buyers Premium (5.00%) : 
     </b>
     <span>
  {formatCurrency(Math.round(buyersPremium))}
     </span>
  
      </p>
      <hr />
      <p className='mb-2 mt-2 text-[14px] flex justify-between'>
     <b>
     Total VAT (15.00%) : 
     </b>
     <span>
  {formatCurrency(Math.round(vat))}
     </span>
  
      </p>
      <p className='mb-2 mt-2 text-[14px] flex justify-between'>
     <b>
     Total  : 
     </b>
     <span>
  {formatCurrency(Math.round(totalWithVat))}
     </span>
  
      </p>
      <p className='mb-2 mt-2 text-[14px] flex justify-between'>
  Please note, if you pay in cash an additional charge will be applied towards your payment.
      </p>
      <p className='mb-2 mt-2 text-[14px] flex justify-between'>
     <b>
    Cash Total  : 
     </b>
     <span>
      {formatCurrency(Math.round(totalWithVatWithCashHandling))}
     </span>
  
      </p>
  
  </p>
  
  {
      /**
       * <input  type='number' value={amount} onChange={(e)=>setamount(e.target.value)}    placeholder='' className='w-full pl-4 pr-10 py-2 border mb-2 border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-md'/>
  
       */
  }
  <p className='flex justify-center'>
  <button onClick={()=>submitBid()} className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
  Submit
  </button>
  </p>
  
  
  </div> :
    
    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md z-9999999">
    <p className='flex items-center content-center justify-between'>
        <p>
        <h2 className="text-xl font-semibold mb-4">
    Bid edited successfully
    </h2>
        </p>
    
    <p className='mt-[-15px]'>
    <FiX onClick={()=>{
        setIsOpen(!isOpen)
    }} className='text-red-500 font-bold' size={20}/>
    </p>
    </p>
    
    <p className='mb-4'>
    You will be redirected to the my bids page where you can monitor your bids
    </p>
    
    
    </div> 
    }
     
    
    
    
    
    
    
    
    
                    </div>
  )
}
)
export default EditModal