'use client'
import Filter from './Filter';
import Searchbar from './Searchbar';
import CarCard from './CarCard';
import CustomButton from './CustomButton';
import { CatalogueProps } from '@/types';
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const Catalogue = ({ allCars, limit }: CatalogueProps) => {

    const router = useRouter();
    // State to store all filetered cars
    const [filteredCars, setFilteredCars] = useState(allCars);

    // Used localstorage so that on back from car details page carRentalPriceValue reinitialized made it persistent
    const [carRentalPrice, setCarRentalPrice] = useState(Number(localStorage.getItem('carRentalPrice')) || 1);

    // function to filter cars by rental price
    const filterCarsByCarRentPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setCarRentalPrice(Number(e.target.value));
        localStorage.setItem('carRentalPrice',e.target.value);
        const tempCarRentalPrice = Number(e.target.value);
        const filteredCarResults = allCars.filter(({ combination_mpg, displacement }) => {
            //car rental price calculation
            const carRent = (combination_mpg * displacement);
            return carRent <= tempCarRentalPrice;
        });
        setFilteredCars(filteredCarResults);
    }

    const handleClick = () => {
        const newLimit = (limit + 1) * 10;
        const pathname = updateSearchParams('limit', `${newLimit}`);
        router.push(pathname);
    }

    return (
        <section id='explore' className='w-full relative mt-12 p-4 md:p-16 max-w-[1440px] mx-auto'>
            <h1 className='font-bold text-2xl md:text-4xl'>Car Catalogue</h1>
            <p className='mt-2 text-sm md:text-lg'>Explore out cars you might like</p>
            <div className='w-full flex flex-col md:flex-row items-center justify-center  md:justify-between gap-2 mt-6'>
                <Searchbar />
                <Filter />
            </div>
            <div className='flex flex-col gap-2 md:max-w-xs mt-4'>
                <span className='text-gray-400 font-bold'>Price</span>
                <input type="range" value={carRentalPrice} onChange={filterCarsByCarRentPrice} min={10} max={100} className='' />
                <p className='font-bold text-lg'>Max ${carRentalPrice}</p>
            </div>
            <h2 className='text-gray-500 text-left mt-6'>Recommonded Cars</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3 mt-6'
            >
                {
                    filteredCars?.length === 0 ?
                        (<p className='text-center text-xl w-full'>No cars found</p>) :
                        (
                            filteredCars.slice(0, 4).map((car, i) => <CarCard key={i} car={car} />)
                        )
                }

            </div>
            <h2 className='text-gray-500 text-left mt-6'>Popuplar Cars</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3 mt-6'
            >
                {
                    filteredCars?.length === 0 ?
                        (<p className='text-center text-xl w-full'>No cars found</p>) :
                        (
                            filteredCars.slice(4).map((car, i) => <CarCard key={i} car={car} />)
                        )
                }

            </div>
            
            {
                (limit < allCars?.length) &&
                (
                    <CustomButton title='Show More'
                        type='button'
                        containerStyle='mt-12 mx-auto bg-blue-600 text-white px-6' handleClick={handleClick}
                    />)
            }
        </section>
    )
}

export default Catalogue;