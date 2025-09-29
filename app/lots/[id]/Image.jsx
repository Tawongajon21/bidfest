import React from 'react'
import Image from 'next/image'
import { imageServerUrl } from '../../../urls'
import { useState,useRef,useEffect } from 'react'
function ImageComponent({images}) {

const [currentIndex, setcurrentIndex] = useState(0);
const carouselRef=useRef(null)
const scrollToIndex=(index)=>{
  const container=carouselRef.current;
  if (!container) {
    return 
  }
  const imageWidth=container.clientWidth;
  container.scrollTo({left:index*imageWidth,behavior:"smooth"})
}
const handleScroll=()=>{
  const container=carouselRef.current;
  if (!container) {
    return
  }
  const index=Math.round(container.scrollLeft/container.clientWidth);
  setcurrentIndex(index)
}
useEffect(()=>{
const container= carouselRef.current;
container?.addEventListener("scroll",handleScroll);
return ()=>container?.removeEventListener("scroll",handleScroll)
},[])
  return (
<div className='w-full'>
<div style={{
  scrollSnapType:"x mandatory"
}} ref={carouselRef} className='flex overflow-x-hidden snap-x snap-mandatory scroll-smooth rounded-lg w-full gap-2 px-1'>
{
  images?.map((img,i)=>(
    <div key={i} className='relative w-full aspect-[4/3] md:aspect-[16/9] flex-shrink-0 snap-center  overflow-hidden '>
<Image src={`${imageServerUrl}${img.newPath}`} className='object-cover rounded' fill sizes='100vw'/>
    </div>
  ))

}
</div>
<div className="flex justify-center mt-3 mb-2 space-x-2 gap-2 overflow-x-hidden">
  {
    images?.map((_,i)=>(
      <button key={i} onClick={()=>scrollToIndex(i)} className={`h-3 w-3 rounded-full transition-all duration-300 ring-1 ring-white ${i===currentIndex ? "bg-indigo-500 w-4": "bg-indigo-300"} overflow-hidden`}/>

     
    ))
  }
</div>
</div>



  )
}

export default ImageComponent