import React from 'react'

const CarCardSkeleton = () => {
  return (
      <div className='w-full h-fit  max-w-lg md:hover:shadow-lg transition-all duration-150 ease-linear p-3 md:p-4 rounded-2xl   md:hover:border group animate-pulse bg-white dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300 border dark:border-zinc-600'>
          <div className='flex items-center justify-between'>
              <h1 className='text-lg md:text-xl font-bold capitalize truncate max-w-[75%] h-3 bg-gray-400 dark:bg-slate-900 w-28'>
              </h1>
              <div className='w-[30px] h-[30px] rounded-full bg-gray-400 dark:bg-slate-900'>

              </div>
          </div>
          <p className='text-gray-400 capitalize mt-1 h-3 w-24 bg-gray-400 dark:bg-slate-900'></p>

          <div className='relative w-full h-40 mt-2'>
              <div className='w-full h-full rounded bg-gray-400 dark:bg-slate-900'>

              </div>
          </div>
          <div className='w-full mt-2 p-2 h-fit'>
              <div className='flex w-full items-center justify-between gap-4'>
                  <div className='flex gap-2 items-center justify-center max-w-xs w-full'>
                      <span className='text-gray-400 text-sm h-3 bg-gray-400 dark:bg-slate-900 w-full'></span>
                  </div>
                  <div className='flex gap-2 items-center justify-center max-w-xs w-full'>
                      <span className='text-gray-400 text-sm h-3 bg-gray-400 dark:bg-slate-900 w-full'></span>
                  </div>
                  <div className='flex gap-2 items-center justify-center max-w-xs w-full'>
                      <span className='text-gray-400 text-sm h-3 bg-gray-400 dark:bg-slate-900 w-full'></span>
                  </div>

              </div>
              <div className='flex items-center justify-between mt-6'>
                  <div className='relative w-12 h-3 bg-gray-400 dark:bg-slate-900 '>
                      
                  </div>
                  <div className='w-32 h-10 rounded-full bg-gray-400 dark:bg-slate-900'></div>
              </div>
          </div>
      </div>
  )
}

export default CarCardSkeleton