'use client'
import { ShowAllCars } from '@/components';
import { CarProps, FetchCarProps } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const ViewAllCars = ({ searchParams }: { searchParams: FetchCarProps }) => {
    const { manufacturer, year, fuelType, limit, model } = searchParams;
    const [allCars, setAllCars] = useState<CarProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchAllCars = async () => {
            try {
                const res = await fetch(`/api/car?model=${model}&limit=${limit}&fuelType=${fuelType}&year=${year}&manufacturer=${manufacturer}`);
                const data = await res.json();
                setAllCars(data.reverse());
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        toast.promise(
            fetchAllCars(),
            {
                loading: 'Fetching Cars...',
                success: 'Cars fetched successfully',
                error: (err) => err.message,
            }
        );
    }, [model, year, manufacturer, fuelType, limit]);


    return (
        <section className='max-w-[1440px] mx-auto relative pt-16 md:pt-24'>
            {
                allCars && <ShowAllCars
                    allCars={allCars}
                    limit={(limit || 20) / 10}
                    isLoading={isLoading}
                />
            }
        </section>
    )
}

export default ViewAllCars;