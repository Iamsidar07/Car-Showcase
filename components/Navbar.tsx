import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CustomButton from './CustomButton';

const Navbar = () => {
  return (
    <nav className='absolute z-10 left-0 right-0 w-full '>
      <div className='flex items-center justify-between px-2 md:px-6 max-w-[1440px] mx-auto'>
        <Link href={'/'} className='h-16 w-32' >
          <Image src={'/icons/logo.svg'} alt='logo' width={100} height={20} className='h-full object-contain' />
        </Link>
        <CustomButton title='Sign in' type='button' containerStyle='bg-white text-blue-500 border shadow ' />
      </div>
    </nav>
  )
}

export default Navbar