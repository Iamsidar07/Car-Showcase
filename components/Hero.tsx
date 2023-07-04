'use client'
import { CustomButton } from '@/components';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const { data: session, } = useSession();
  const { theme } = useTheme();
  const isUser = session?.user;
  const heroPattern = theme === 'dark' ? '/images/hero-dark.jpg' : '/images/hero-light.jpg';

  return (
    <section className='max-w-[1440px] mx-auto relative flex flex-col md:flex-row items-center bg-contain light dark:dark bg-no-repeat bg-bottom gradient-radial'>
      <div className='flex-1 p-4 md:p-16 pt-32 md:pt-28'>
        <h1 className='text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-radial from-[#456efd] to-[#00377b,#017cd0] text-blue-500 dark:text-white'>
          {
            isUser && <span className={`text-lg ${theme === 'dark' ? 'text-pink-600' : 'text-indigo-600'} truncate`}>Hey🙋‍♀️, {session.user?.name?.split(' ')[0]} <br /></span>
          }
          Find, book, rent a car quick and super easy!</h1>

        <p className='text-xl md:text-2xl md:mt-6 mt-4 mb-4 lg:mb-8 text-slat-600 dark:text-slate-400'>Streamline your car rental experience with our effortless booking process.</p>
        <Link href={'#explore'}>
          <CustomButton
            title='Explore Cars'
            type='button'
            containerStyle='text-white bg-blue-500 dark:bg-pink-500'
          />
        </Link>
      </div>
     
      <div className='flex items-end lg:flex-[1.25] justify-end w-full h-[590px] lg:h-screen '>
        <div className='w-full h-full relative'>
          <Image
            src={'/images/main-car.png'}
            alt='hero'
            quality={100}
            fill
            className='absolute top-0 bottom-0 left-0 right-0 w-[80%] h-[590px] lg:h-full lg:w-full object-contain md:scale-125 animate-car'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero;