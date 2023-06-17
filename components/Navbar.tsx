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
    <nav className='absolute z-10 left-0 right-0 w-full '>
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
            <span>Rent car</span>
          </Link>
          <Link href={`/favorites/${id}`} >
            <span>Favorites</span>
          </Link>
          {
            isUser ? (
              <>
                <Image
                  src={session?.user?.image || '/assets/images/user.svg'}
                  alt='Profile Picture'
                  width={40}
                  height={40}
                  className='cursor-pointer objcet-contain rounded-full'
                />
                <CustomButton
                  title='Logout'
                  type='button'
                  handleClick={() => { signOut() }}
                  containerStyle='bg-white text-blue-500 border rounded-full'
                />
              </>

            ) : (
              <div className='flex items-center gap-3'>
                {providers && Object.values(providers).map((provider: any) => <CustomButton
                  key={provider.id}
                  handleClick={() => signIn(provider.id)}
                  type='button'
                  title={`Sign in with ${provider.name}`}
                  containerStyle='bg-white text-blue-500 border rounded-full'
                />
                )}
              </div>
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
            <div className='bg-slate-100/30 min-w-[290px]  rounded-md shadow backdrop-blur absolute top-16 right-8 p-3 flex flex-col gap-4 text-left md:hidden'>
              <Link href={'/view-all'} onClick={() => setIsDropdownShown(false)}>
                <span>Rent car</span>
              </Link>
              <Link href={`/favorites/${id}`} onClick={() => setIsDropdownShown(false)}>
                <span>Favorites</span>
              </Link>
              {
                isUser ? (
                  <>
                    <Image
                      src={session?.user?.image || '/assets/images/user.svg'}
                      alt='Profile Picture'
                      width={40}
                      height={40}
                      className='cursor-pointer objcet-contain rounded-full'
                    />
                    <CustomButton
                      title='Logout'
                      type='button'
                      handleClick={() => { signOut() }}
                      containerStyle='bg-white text-blue-500 border rounded-full'
                    />
                  </>

                ) : (
                  <div className='flex flex-col gap-2'>
                    {providers && Object.values(providers).map((provider: any) => <CustomButton
                      key={provider.id}
                      handleClick={() => signIn(provider.id)}
                      type='button'
                      title={`Sign in with ${provider.name}`}
                      containerStyle='bg-white text-blue-500 border rounded-full w-full'
                    />
                    )}
                  </div>
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