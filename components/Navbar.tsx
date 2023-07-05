'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import ThemeSwitcher from './theme/ThemeSwitcher';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { RiLogoutBoxLine, RiMenu3Line } from 'react-icons/ri';
const Navbar = () => {
  const { data: session, } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const { theme } = useTheme();
  const isUser = session?.user;
  const id = session?.user.id;

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setupProviders();
  }, []);
  return (
    <nav className='absolute z-10 left-0 right-0 w-full bg-transparent p-2 border-b dark:border-0'>
      <div className='flex items-center justify-between px-2 md:px-6 max-w-[1440px] mx-auto'>
        <Link href={'/'}>
          {/* <Image
            src={'/icons/logo.svg'}
            alt='logo'
            width={100}
            height={20}
            className='h-full object-contain'
          /> */}
          <span className='text-xl md:text-3xl text-indigo-700 font-bold dark:text-white'>Carsify</span>
        </Link>


        {/* Desktop navigation  */}
        <div className='hidden md:flex items-center  gap-3 '>
          <Link href={'/view-all'} >
            <span>Search</span>
          </Link>
          <Link href={'/rent-car'} onClick={() => setIsDropdownShown(false)}>
            <span>AddCar</span>
          </Link>
          
          {
            isUser ? (
              <>
                <Link href={`/favorites/${id}`} >
                  <span>Favorites</span>
                </Link>
                <Link href={`/profile`} onClick={() => setIsDropdownShown(false)} >
                  <Image
                    src={session?.user?.image || '/assets/images/user.svg'}
                    alt='Profile Picture'
                    width={40}
                    height={40}
                    className='cursor-pointer objcet-contain rounded-full'
                  />
                </Link>
                <CustomButton
                  title='Logout'
                  type='button'
                  handleClick={() => { signOut() }}
                  containerStyle='bg-white rounded-full border text-blue-500 rounded-full dark:bg-pink-700 dark:text-slate-300 dark:border-slate-700 dark:text-slate-300'
                  icon={<RiLogoutBoxLine size={16} className={`text-white`} />}
                />
              </>

            ) : (
              <Link href={'/user/login'}>
                <CustomButton title='Login' type='button' containerStyle='bg-white rounded-full border text-blue-500 w-full rounded-full dark:bg-pink-700 dark:text-slate-300 dark:border-slate-700 dark:text-slate-300' />
              </Link>
            )
          }
          <div className='flex items-center gap-4 border-l dark:border-slate-600 ml-4 pl-4'>
            <Link href={'https://github.com/Iamsidar07/Car-Showcase'} onClick={() => setIsDropdownShown(false)} className='flex  gap-2'>
              <BsGithub size={20} className={`h-6 w-6  ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`} />
            </Link>
            <Link href={'https://twitter.com/iamsidar07'} onClick={() => setIsDropdownShown(false)} className='flex gap-2'>
              <BsTwitter size={20} className={`h-6 w-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`} />
            </Link>
            <ThemeSwitcher />
          </div>
         
          
        </div>

        {/* Mobile navigation  */}
        <div className='flex items-center gap-4 md:hidden h-full object-contain cursor-pointer'>
         <ThemeSwitcher />
          <RiMenu3Line size={20} className={`flex items-center md:hidden h-full object-contain cursor-pointer ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`} onClick={() => setIsDropdownShown((prevState) => !prevState)} />
       </div>
        {
          isDropdownShown && (
            <div className='bg-white/30 dark:bg-gradient-radial from-slate-700 to-slate-900 border dark:border-zinc-600 min-w-[290px]  rounded-lg shadow backdrop-blur-sm absolute top-16 right-8 py-6 px-5 flex flex-col gap-2 text-left md:hidden z-50 min-h-[270px] '>
              <Link href={'/view-all'} onClick={() => setIsDropdownShown(false)}>
                <span>Search</span>
              </Link>
              <Link href={'/rent-car'} onClick={() => setIsDropdownShown(false)}>
                <span>AddCar</span>
              </Link>
              {
                isUser ? (
                  <>
                    <Link href={`/favorites/${id}`} onClick={() => setIsDropdownShown(false)}>
                      <span>Favorites</span>
                    </Link>
                    <Link href={'/profile'} className='flex items-center' onClick={() => setIsDropdownShown(false)}>
                      <Image
                        src={session?.user?.image || '/assets/images/user.svg'}
                        alt='Profile Picture'
                        width={30}
                        height={30}
                        className='cursor-pointer objcet-contain rounded-full'
                      />
                      <span className='ml-2'>My Profile</span>
                    </Link>
                    <CustomButton
                      title='Logout'
                      type='button'
                      handleClick={() => { signOut() }}
                      containerStyle='rounded-full text-white dark:bg-pink-700 dark:text-slate-300  px-6'
                      icon={<RiLogoutBoxLine size={16} className={`text-white`}/>}
                    />
                  </>

                ) : (
                  <Link href={'/user/login'}>
                    <CustomButton title='Login' type='button' containerStyle='rounded-full dark:bg-pink-700 dark:text-slate-300 text-white mt-4 px-6' />
                  </Link>
                )
              }
              <div className='flex items-baseline gap-2 absolute bottom-4 flex-1'>
                <Link href={'https://github.com/Iamsidar07/Car-Showcase'} onClick={() => setIsDropdownShown(false)} className='flex gap-2 mr-4'>
                  <BsGithub size={20} className={`h-6 w-6 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-700'}`} />
                  <span>Github</span>
                </Link>
                <Link href={'https://twitter.com/iamsidar07'} onClick={() => setIsDropdownShown(false)} className='flex gap-2 border-l pl-4 dark:border-zinc-500'>
                  <BsTwitter size={20} className={`h-6 w-6 ${theme === 'dark' ? 'text-slate-50' : 'text-slate-700'}`} />
                  <span>Twitter</span>
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar;