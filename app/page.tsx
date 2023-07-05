'use client'
import { Catalogue,  Hero} from '@/components';
import { CarProps, FetchCarProps } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home({ searchParams }: { searchParams: FetchCarProps }) {
  const { manufacturer, year, fuelType, limit, model } = searchParams;
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const res = await fetch(`/api/car?model=${model}&limit=${limit}&fuelType=${fuelType}&year=${year}&manufacturer=${manufacturer}`);
        const data = await res.json();
        setAllCars(data?.reverse());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    toast.promise(fetchAllCars(), {
      loading: 'Fetching cars...',
      success: 'Fetched cars successfully.',
      error: 'Failed to fetch cars.',
    });
  }, [model, year, manufacturer, fuelType, limit]);

  return (
    <main className="overflow-hidden relative  dark:bg-slate-900 backdrop-blur-3xl backdrop-filter">
      <div className="w-44 h-44 hidden md:flex dark:bg-gradient-radial from-pink-500 to-purple-700 rounded-full rotate-12 absolute top-3/4 right-1/2 blur-3xl" />
      <div className="w-44 h-44 dark:bg-gradient-radial from-blue-500 to-violet-950 rounded-2xl rotate-12 absolute top-[98%] left-1/2 blur-3xl" />
      <div className="w-72 h-72 dark:bg-gradient-radial from-indigo-900 to-purple-700 rounded-2xl rotate-12 absolute top-1/2 left-1/2 blur-3xl" />
      <div className="w-72 h-20 dark:bg-gradient-radial from-teal-500 to-green-700 rounded-2xl rotate-12 absolute top-0 left-4 blur-3xl" />
      <div className="w-72 h-72 dark:bg-gradient-radial from-slate-700 to-[#343434] rounded-2xl rotate-12 absolute top-[15%] right-0 blur-3xl" />

      <Hero />
      { allCars && <Catalogue
        isLoading={isLoading}
        allCars={allCars}
        limit={(limit || 20) / 10}
      />}

    </main>
  );
}
