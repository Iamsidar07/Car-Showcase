'use client'
import { Catalogue, CustomButton, Hero, Loader } from '@/components';
import { CarProps, FetchCarProps } from '@/types';
import { fetchCars } from '@/utils';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export default  function Home({ searchParams }: { searchParams: FetchCarProps }) {
  const { manufacturer, year, fuelType, limit, model } = searchParams;
  const [allCars,setAllCars] = useState<CarProps[]>([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchAllCars =async () => {
      try {
        const res = await fetch(`/api/car?model=${model}&limit=${limit}&fuelType=${fuelType}&year=${year}&manufacturer=${manufacturer}`);
        const data = await res.json();
        setAllCars(data?.reverse());
      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false);
      }
    };

    toast.promise(fetchAllCars(), {
      loading: 'Fetching cars...',
      success: 'Fetched cars successfully.',
      error: 'Failed to fetch cars.',
    });
  },[model,year,manufacturer,fuelType,limit]);


  return (
    <main className='overflow-hidden'>
      <Hero />
      {
        allCars && <Catalogue isLoading={isLoading} allCars={allCars} limit={(limit || 20) / 10} />
      }

    </main>
  )
}
