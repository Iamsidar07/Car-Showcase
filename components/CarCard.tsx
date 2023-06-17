'use client'
import Image from 'next/image';
import CustomButton from './CustomButton';
import { CardCardProps, FavoriteCarProps } from '@/types';
import Link from 'next/link';
import { generateCarImageUrl } from '@/utils';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const CarCard = ({ car }: CardCardProps) => {
  const { data:session } = useSession();
  const userId = session?.user?.id;
  const { model, drive, combination_mpg, make, displacement,city_mpg,cylinders,fuel_type,highway_mpg,transmission,year } = car;
  console.log(car?.typeOfClass?.length !== 0)
  const [isFavoriteBtnActive,setIsFavoriteBtnActive] = useState(car?.typeOfClass?.length !== 0);
  const typeOfClass = car.class || car.typeOfClass;
  const addToFavorite =async () => {
    try {
      const response = await fetch('/api/favorite/add', {
        method: 'POST',
        body: JSON.stringify({
          city_mpg,
          combination_mpg,
          cylinders,
          displacement,
          drive,
          fuel_type,
          highway_mpg,
          make,
          model,
          transmission,
          year,
          userId,
          typeOfClass
        })
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(car)
  const removeFromFavorite =async () => {
    const id =car._id;
    try {
      await fetch(`/api/favorite/remove/${id}`,{
        method:'DELETE',
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Convert the car object into a compatible format
  const queryParams = Object.entries(car)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  // Construct the URL with the query string
  const url = `/cars?${queryParams}`;

  const handleHeartClick = ()=>{
    if (isFavoriteBtnActive) {
      removeFromFavorite();
    }else{
      addToFavorite();
    }
    setIsFavoriteBtnActive((prevState) => !prevState);
  }

  return (
    <div className='w-full h-fit  max-w-lg bg-white md:hover:shadow-lg transition-all duration-150 ease-linear p-3 md:p-4 rounded-sm group '>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg md:text-xl font-bold capitalize truncate max-w-[75%]'>{make} {model}
        </h1>
        <button type='button' onClick={handleHeartClick}>
        <Image
          src={`/icons/${isFavoriteBtnActive?'heart-filled':'heart-outline'}.svg`}
          alt='favorite buttn'
          width={20}
          height={20}
          className='object-contain cursor-pointer'
        />
        </button>
      </div>
      <p className='text-gray-400 capitalize mt-1'>{car.class}</p>

      <div className='relative w-full h-40'>
        <Image
          src={generateCarImageUrl(car)}
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
            <span className='text-gray-400 text-sm uppercase'>{drive}</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Image
              src={'/icons/gas.svg'}
              alt='gas'
              width={20}
              height={20}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm'>{combination_mpg} MPG</span>
          </div>

        </div>
        <div className='flex items-center justify-between mt-6'>
          <div className='relative '>
            <span className='absolute top-0 text-xs font-bold'>$</span>
            <span className='text-lg md:text-2xl font-bold text-center ml-2'>{(combination_mpg * displacement).toFixed(1)}</span>
            <span className='absolute bottom-0 text-xs font-bold'>/day</span>
          </div>
          <Link href={url} >
            <CustomButton
              title='More Info'
              type='button'
              containerStyle='bg-blue-600 text-white w-full px-5 '
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CarCard;