'use client'
import { useSession } from "next-auth/react"
import Image from "next/image"
import { ChangeEvent, useState } from "react"

const Profile = () => {
    const { data: session } = useSession();
    const [coverImageSource, setCoverImageSource] = useState(localStorage.getItem('coverImageSrc'));
    const handleCoverImageSourceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files;
        if (file) {
            const url = `${URL.createObjectURL(file[0])}`
            localStorage.setItem('coverImageSrc', url);
            setCoverImageSource(url);
            console.log(url);
        }
    }
    console.log({ coverImageSource })
    return (
        <section className=' relative pt-16 md:pt-16'>
            <div className='relative h-52 md:h-64 bg-zinc-600'>
                <Image src={coverImageSource || '/images/car.webp'} quality={100} alt='cover photo' fill className='object-cover w-full bg-top h-full ' />
                <div className='py-1.5 md:py-2.5 px-5 bg-white/30 backdrop-blur rounded-full absolute right-2 bottom-2 shadow text-sm '>
                    <label htmlFor='file-input' className='flex items-center cursor-pointer'>
                        <Image src={'/icons/edit.svg'} alt='file uploader icon' width={20} height={20} className='object-contain mr-2' />
                        <span>Edit Cover</span>
                    </label>
                    <input type='file' id='file-input' onChange={handleCoverImageSourceChange} className='hidden' />
                </div>
                <div className='h-24 w-24 md:h-40 md:w-40 absolute left-2 -bottom-8 md:-bottom-10 rounded-full p-2 md:p-2 shadow-2xl border-4 md:border-[8px] border-white'>
                    <Image src={session?.user?.image || 'https://api.multiavatar.com/user.svg'} alt='profile photo' fill className='object-contain rounded-full' />
                </div>


            </div>
            <div className='bg-white w-full pt-9 md:pt-12 p-2 md:p-6 leading-5'>
                <h1 className='text-lg md:text-2xl font-bold'>{session?.user?.name}</h1>
                <p className='text-gray-500 text-sm'>{session?.user?.email}</p>
                <small className='text-gray-400'>#{session?.user?.id}</small>
            </div>
            <div className='mt-12'>
                {/* {
                Array(10).fill(0).map((_, i) => (<CarCard car={} key={i}/>))
             } */}
            </div>
        </section>
    )
}

export default Profile