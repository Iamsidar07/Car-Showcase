import React from 'react'
import CarCardSkeleton from '../CarCard/CarCardSkeleton'

const ProfileSkeleton = () => {
    return (
        <section className=' relative pt-16 md:pt-16 animate-pulse '>
            <div className='relative h-52 md:h-64 bg-gray-400 dark:bg-gradient-radial from-slate-700 to-slate-900 '>
            </div>
            <div className='max-w-[1440px] mx-auto'>
                <div className={`relative bg-zinc-600`}>
                    <div className='py-1.5 md:py-2.5 px-5 bg-white/30 backdrop-blur rounded-full absolute right-2 bottom-2 shadow text-sm '>
                        <label htmlFor='file-input' className='flex items-center cursor-pointer w-24 h-3' >

                        </label>
                    </div>
                    <div className='h-24 w-24 md:h-40 md:w-40 absolute left-2 -bottom-8 md:-bottom-10 rounded-full p-2 md:p-2 shadow-2xl border-4 md:border-[8px] bg-white dark:bg-slate-600'>
                    </div>


                </div>
                <div className='rounded-lg w-full pt-9 md:pt-12 p-2 md:p-6 leading-5 gap-2'>
                    <h1 className='text-lg md:text-2xl font-bold h-3 w-full md:max-w-sm  bg-gray-400 dark:bg-slate-700'></h1>
                    <p className='text-gray-500 text-sm h-3 w-1/2 md:max-w-sm mt-2 bg-gray-400 dark:bg-slate-700'></p>
                    <p className='text-gray-500 text-sm h-3 w-1/3 md:max-w-sm mt-2 bg-gray-400 dark:bg-slate-700'></p>
                </div>
                <div className='mt-12 p-2'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3  px-2 w-full h-fit'
                    >
                        {
                            Array(8).fill(0).map((_, i) => (<CarCardSkeleton key={i}/>))
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileSkeleton