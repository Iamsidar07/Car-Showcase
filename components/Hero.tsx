'use client'
import { CustomButton } from '@/components';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const { data: session, } = useSession();
  const isUser = session?.user;
  return (
    <section className='max-w-[1440px] mx-auto relative flex flex-col md:flex-row items-center'>
      <div className='flex-1 p-4 md:p-16 pt-32 md:pt-28'>
        <h1 className='text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-radial from-[#456efd] to-[#00377b,#017cd0] '>
          {
            isUser && <span className='text-black text-lg'>Hey🙋‍♀️, {session.user?.name?.split(' ')[0]} <br /></span>
          }
          Find, book, rent a car quick and super easy!</h1>

        <p className='text-xl md:text-2xl md:mt-6 mt-4 mb-4 lg:mb-8'>Streamline your car rental experience with our effortless booking process.</p>
        <Link href={'#explore'}>
          <CustomButton
            title='Explore Cars'
            type='button'
            containerStyle='bg-blue-700 text-white'
          />
        </Link>
      </div>
      <div className='flex items-end lg:flex-[1.5] justify-end w-full h-[590px] lg:h-screen '>
        <div className='w-full h-full relative'>
          <Image
            src={'/images/main-car.png'}
            alt='hero'
            quality={100}
            fill
            className='absolute top-0 bottom-0 left-0 right-0 w-[80%] h-[590px] lg:h-full lg:w-full object-contain scale-110 md:scale-125 animate-car'
          />
        </div>
        <div className='absolute  md:-top-16 xl:-top-24 -right-[53%] md:-right-[33%] top-44 xl:-right-[40%] h-full w-full -z-10'>
          <Image
            src={'/images/hero-bg.png'}
            alt='hero bg'
            fill
            className='object-contain w-[90%] md:w-full h-[590px]'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero;