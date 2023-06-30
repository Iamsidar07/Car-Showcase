'use client'
import Image from 'next/image';
import CustomButton from './CustomButton';
import { CardCardProps, FavoriteCarProps } from '@/types';
import Link from 'next/link';
import { generateCarImageUrl } from '@/utils';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const CarCard = ({ car, isFavorite, handleDelete, handleEdit }: CardCardProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const userId = session?.user?.id;
  const [isFavoriteBtnActive, setIsFavoriteBtnActive] = useState(isFavorite);
  const addToFavorite = async () => {
    try {
      const response = await fetch('/api/favorite/add', {
        method: 'POST',
        body: JSON.stringify({
          ...car,
          creator:userId,
          isFavorite: true
        })
      });
      if (response.ok) {
        alert('Added to favorite');
      }
      if (response.status === 409) {
        alert('Already added to favorite');
      }
    } catch (error) {
      console.error(error);
    }
  }
  const removeFromFavorite = async (id: string | undefined) => {
    if (!id) {
      alert('Missing id');
      return;
    }
    const isReallyWantToDelete = confirm(`Do you really want to delete this car with id:${id}`);
    if (!isReallyWantToDelete) return;
    try {
      await fetch(`/api/favorite/remove/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Convert the car object into a compatible format
  const queryParams = Object.entries(car)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  // Construct the URL with the query string
  const url = `/cars?${queryParams}`;

  const handleHeartClick = (id: string | undefined) => {
    if (!userId) {
      alert('Login/sign in to add to favorite 💖');
      return;
    }
    if (isFavoriteBtnActive) {
      removeFromFavorite(id);
    } else {
      addToFavorite();
    }
    setIsFavoriteBtnActive((prevState) => !prevState);
  }

  return (
    <div className='w-full h-fit  max-w-lg bg-white md:hover:shadow-lg transition-all duration-150 ease-linear p-3 md:p-4 rounded-2xl border md:border-none md:hover:border group '>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg md:text-xl font-bold capitalize truncate max-w-[75%]'>{car.carTitle}
        </h1>
        <button type='button' onClick={() => handleHeartClick(car._id)}>
          <Image
            src={`/icons/${isFavoriteBtnActive ? 'heart-filled' : 'heart-outline'}.svg`}
            alt='favorite buttn'
            width={20}
            height={20}
            className={`object-contain cursor-pointer`}
          />
        </button>
      </div>
      <p className='text-gray-400 capitalize mt-1'>{car.typeOfclass}</p>

      <div className='relative w-full h-40'>
        <Image
          // src={generateCarImageUrl(car)}
          src={car.imageFiles[1] || car.imageFiles[0]}
          alt='car'
          fill
          className='object-contain w-full'
        />
      </div>
      <div className='w-full mt-2 p-2 h-fit'>
        <div className='flex w-full items-center justify-between '>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Image
              src={'/icons/steering-wheel.svg'}
              alt='steering wheel'
              width={20}
              height={20}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm'>Automatic</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Image
              src={'/icons/tire.svg'}
              alt='tire'
              width={20}
              height={20}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm uppercase'>{car.drive}</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Image
              src={'/icons/gas.svg'}
              alt='gas'
              width={20}
              height={20}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm'>{car.combinationMPG} MPG</span>
          </div>

        </div>
        <div className='flex items-center justify-between mt-6'>
          <div className='relative '>
            <span className='absolute top-0 text-xs font-bold'>$</span>
            <span className='text-lg md:text-2xl font-bold text-center ml-2'>{car.rentPrice?.toFixed(2)}</span>
            <span className='absolute bottom-0 text-xs font-bold'>/day</span>
          </div>
          <Link href={url} >
            <CustomButton
              title='More Info'
              type='button'
              containerStyle='bg-blue-600 text-white w-full px-5 rounded-sm '
            />
          </Link>
        </div>
        {
          ((car.creator.email === session?.user.email) && (pathname === '/profile')) &&  (<div className='mt-4 flex items-center justify-between gap-2'>
            <CustomButton title='Edit' type='button' handleClick={()=>handleEdit && handleEdit(car._id)}
            containerStyle='bg-green-600 text-white w-full px-5 rounded-full '
            />
            <CustomButton title='Delete' type='button' handleClick={()=>handleDelete && handleDelete(car._id)}
            containerStyle='border border-red-500 w-full px-5 rounded-full '
            />
          </div>)
        }
      </div>
    </div>
  )
}

export default CarCard;