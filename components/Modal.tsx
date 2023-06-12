import Image from 'next/image'
import React from 'react'

const Modal = () => {
  return (
    <div className='relative z-10'>

      <div className='fixed inset-0 bg-red-400/25 bg-opacity-100 z-20'>
      </div>
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-screen items-center justify-center p-4 text-center'>
          <div className='relative w-full h-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white text-left flex flex-col gap-5 p-6'></div>
        </div>
      </div>
        
    </div>
  )
}

export default Modal