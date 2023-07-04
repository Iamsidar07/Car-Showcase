'use client'
import Image from 'next/image';
import CustomButton from './CustomButton';
import { CardCardProps } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

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
        toast.success('Added to favorite');
      }
      if (response.status === 409) {
        toast('Already added to favorite');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add favorite.');

    }
  }
  const removeFromFavorite = async (id: string | undefined) => {
    if (!id) {
      toast('Missing id');
      return;
    }
    const isReallyWantToDelete = confirm(`Do you really want to remove this car with id:${id} from favorites.`);
    if (!isReallyWantToDelete) return;
    try {
      const res = await fetch(`/api/favorite/remove/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Removed from favorite');
      }

    } catch (error) {
      console.error(error);
      toast.error('Failed to remove from favorite.');
    }
  }

  const handleHeartClick = (id: string | undefined) => {
    if (!userId) {
      toast('Login/sign in to add to favorite 💖');
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
    <div className='w-full h-fit  max-w-lg mx-auto bg-white dark:bg-gradient-radial from-slate-700 to-slate-900 dark:border-slate-700/70 md:hover:shadow-lg transition-all duration-150 ease-linear p-3 md:p-4 rounded-2xl border group  group-hover:scale-125'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg md:text-xl font-bold capitalize truncate max-w-[75%]'>{car.carTitle}
        </h1>
        <button type='button' onClick={() => handleHeartClick(car._id)}>
          <Image
            src={`/icons/${isFavoriteBtnActive ? 'heart-filled' : 'heart-outline'}.svg`}
            alt='favorite button'
            width={20}
            height={20}
            className={`object-contain cursor-pointer ${isFavoriteBtnActive && "scale-150 transition-transform duration-150 ease-in"}`}
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
          <div className='flex  items-center justify-center gap-1'>
            <Image
              src={'/icons/steering-wheel.svg'}
              alt='steering wheel'
              width={15}
              height={15}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm'>Manual</span>
          </div>
          <div className='flex  items-center justify-center gap-1'>
            <Image
              src={'/icons/fuel-tank.svg'}
              alt='fuel-tank'
              width={15}
              height={15}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm'>{car.fuelCapacity}L</span>
          </div>
          <div className='flex  items-center justify-center gap-1'>
            <Image
              src={'/icons/people.svg'}
              alt='people'
              width={15}
              height={15}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm '>{car.capacity} People</span>
          </div>

        </div>
        <div className='flex items-center justify-between mt-6'>
          <div className='relative '>
            <span className='absolute top-0 text-xs font-bold'>$</span>
            <span className='text-lg md:text-2xl font-bold text-center ml-2'>{car.rentPrice?.toFixed(2)}</span>
            <span className='absolute bottom-0 text-xs font-bold'>/day</span>
          </div>
          <Link href={`/cars/${car._id}`} >
            <CustomButton
              title='More Info'
              type='button'
              containerStyle='bg-blue-600 text-white w-full px-5 rounded-full dark:bg-slate-700 dark:text-slate-300'
            />
          </Link>
        </div>
        {
          ((car.creator.email === session?.user.email) && (pathname === '/profile')) &&  (<div className='mt-4 flex items-center justify-between gap-2'>
            <CustomButton title='Edit' type='button' handleClick={()=>handleEdit && handleEdit(car._id)}
            containerStyle='bg-green-600 text-white w-full px-5 rounded-full rounded-full dark:bg-blue-500 dark:text-slate-300 '
            />
            <CustomButton title='Delete' type='button' handleClick={()=>handleDelete && handleDelete(car._id)}
            containerStyle='border border-red-500 w-full px-5 rounded-full rounded-full dark:bg-red-500 dark:text-slate-300'
            />
          </div>)
        }
      </div>
    </div>
  )
}

export default CarCard;