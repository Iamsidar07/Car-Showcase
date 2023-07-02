'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
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
    <nav className='absolute z-10 left-0 right-0 w-full'>
      <div className='flex items-center justify-between px-2 md:px-6 max-w-[1440px] mx-auto'>
        <Link href={'/'} className='h-16 w-32' >
          <Image
            src={'/icons/logo.svg'}
            alt='logo'
            width={100}
            height={20}
            className='h-full object-contain'
          />
        </Link>


        {/* Desktop navigation  */}
        <div className='hidden md:flex items-center gap-3'>
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
                  containerStyle='bg-white text-blue-500 border rounded-full'
                  icon={<Image src={'/icons/logout.svg'} alt='logout' width={20} height={20}/>}
                />
              </>

            ) : (
                <Link href={'/user/login'}>
                  <CustomButton title='Login' type='button' containerStyle='bg-white rounded-full border text-blue-500 w-full' />
                </Link>
            )
          }
        </div>
        {/* Mobile navigation  */}
        <Image
          src={'/icons/menu.svg'}
          alt='logo'
          width={20}
          height={20}
          onClick={() => setIsDropdownShown((prevState) => !prevState)}
          className=' flex md:hidden h-full object-contain absolute top-0 right-4 cursor-pointer'
        />
        {
          isDropdownShown && (
            <div className='bg-white/30 min-w-[290px]  rounded-md shadow backdrop-blur-sm absolute top-16 right-8 p-3 flex flex-col gap-2 text-left md:hidden z-50'>
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
                        width={40}
                        height={40}
                        className='cursor-pointer objcet-contain rounded-full'
                      />
                      <span className='ml-2'>My Profile</span>
                    </Link>
                    <CustomButton
                      title='Logout'
                      type='button'
                      handleClick={() => { signOut() }}
                      containerStyle='bg-white text-blue-500 border rounded-full'
                      icon={<Image src={'/icons/logout.svg'} alt='logout' width={20} height={20} />}
                    />
                  </>

                ) : (
                    <Link href={'/user/login'}>
                      <CustomButton title='Login' type='button' containerStyle='bg-white rounded-md border text-blue-500 w-full' />
                    </Link>
                )
              }
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar;