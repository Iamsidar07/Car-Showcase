'use client'
import { Catalogue, Hero } from '@/components';
import { CarProps, FetchCarProps } from '@/types';
import { fetchCars } from '@/utils';
import { useEffect, useState } from 'react';

export default  function Home({ searchParams }: { searchParams: FetchCarProps }) {
  const { manufacturer, year, fuelType, limit, model } = searchParams;
  const [allCars,setAllCars] = useState<CarProps[]>([]);

  useEffect(()=>{
    const fetchAllCars =async () => {
      try {
        const res = await fetch(`/api/car?model=${model}&limit=${limit}&fuelType=${fuelType}&year=${year}&manufacturer=${manufacturer}`);
        const data = await res.json();
        setAllCars(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllCars();
  },[model,year,manufacturer,fuelType,limit]);
  console.log(allCars)


  return (
    <main className='overflow-hidden'>
      <Hero />
      {
        allCars && <Catalogue allCars={allCars} limit={(limit || 20) / 10} />
      }
    </main>
  )
}
