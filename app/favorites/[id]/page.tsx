'use client'
import { CarCard } from '@/components';
import { CarCardSkeleton } from '@/components/skeleton';
import { CarProps } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Favorites = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [favoriteCars, setFavoriteCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchFavCars = async () => {
      try {
        const response = await fetch(`/api/favorite/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFavoriteCars(data);
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong!');

      } finally {
        setIsLoading(false);
      }
    }
    fetchFavCars();
  }, [id, favoriteCars]);

  return (
    <section className='max-w-[1440px] mx-auto relative pt-16 md:pt-24 px-2 md:px-6'>
      {
        (favoriteCars?.length === 0 && (!isLoading)) ? (
          <h1 className='text-center mt-12'>Nothing to see🥸</h1>
        ) :
          (<>
            <h1 className='text-lg md:text-2xl font-bold mb-4'>⭐ Your Favorites</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
              {favoriteCars.map((car, i) => <CarCard key={i} car={car} isFavorite />)}
            </div>
          </>
          )
      }
      {
        isLoading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
            {Array(12).fill(0).map((_, i) => <CarCardSkeleton key={i} />)}
          </div>

        )
      }
    </section>
  )
}

export default Favorites