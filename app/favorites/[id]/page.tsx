'use client'
import { CarCard } from '@/components';
import { CarProps,} from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

const Favorites = ({ params }: { params: { id: string } }) => {
  const [favoriteCars, setFavoriteCars] = useState<CarProps[]>([]);
  const { data:session } = useSession();
  const router = useRouter();
  const { id } = params;
  

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
        alert('Something went wrong');
      }
    }
    fetchFavCars();
  }, [id,favoriteCars]);
  console.log(favoriteCars)
  return (
    <section className='max-w-[1440px] mx-auto relative pt-16 px-2 md:px-6'>
      {
        favoriteCars?.length === 0 ? (
          <h1>Nothing to see🥸</h1>
        ) :
          (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
              {favoriteCars.map((car, i) => <CarCard key={i} car={car} isFavorite />)}
            </div>
          )
      }
    </section>
  )
}

export default Favorites