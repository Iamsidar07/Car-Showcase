'use client'
import { Car, FilterProps } from '@/types'
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import CustomButton from './CustomButton';
import CarCard from './CarCard';
import { availableFilterBrandOptions, availableFilterCylindersOptions } from '@/constants';
import Image from 'next/image';
interface ShowAllCarsProps {
  allCars: Car[],
  limit: number
}
const ShowAllCars = ({ allCars, limit }: ShowAllCarsProps) => {
  const router = useRouter();
  const [searchInputVal, setSearchInputVal] = useState('');
  const [filters, setFilters] = useState<FilterProps>({
    brand: [],
    cylinders: [],
    rentPriceRange: ''
  });

  const handleFilterChange = (category: string, value: string[] | string) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [category]: value
    }));
  };

  const filteredCars = allCars.filter((car) => {
    const { brand, cylinders, rentPriceRange } = filters;
    const calcRentalPrice = car.combination_mpg * car.displacement;
    return (
      (brand.length === 0 || brand.includes(car.make.toLowerCase())) &&
      (cylinders.length === 0 || cylinders.includes(`${car.cylinders}`)) &&
      (rentPriceRange === '' || calcRentalPrice <= parseInt(rentPriceRange))
    );
  })

  const handleClick = () => {
    const newLimit = ((limit || 20) + 1) * 10;
    const pathname = updateSearchParams('limit', `${newLimit}`);
    router.push(pathname);
  }

  const handleSearchValChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputVal(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pathName = updateSearchParams('make', `${searchInputVal}`);
    router.push(pathName);
  }

  return (
    <section className='w-full'>
      <div className='flex flex-col md:flex-row gap-4'>

        <div className='px-4 md:p-6 py-3 flex md:flex-col bg-white shadow-sm rounded-lg gap-3 sticky md:min-h-screen '>
          {/* <Searchbar /> */}
          <form className='py-1.5 border-b hidden md:flex' onSubmit={handleSubmit}>
            <div className='flex items-center'>
              <Image
                src={'/icons/magnifying-glass.svg'}
                alt='search icon'
                width={20}
                height={20}
              />
              <input
                type='text'
                value={searchInputVal}
                onChange={handleSearchValChange}
                placeholder='Search by brand or title'
                className='outline-none bg-transparent text-sm'
              />
              <button type='submit'>
                <Image
                  src={'/icons/magnifying-glass.svg'}
                  alt='search icon'
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </form>
          <div className='flex flex-col'>
            <h2 className='text-gray-400 font-bold my-3'>Brand</h2>
            {
              availableFilterBrandOptions.map(({ value, label }, i) => <label key={i}>
                <input
                  type="checkbox"
                  checked={filters.brand.includes(value)}
                  onChange={() => handleFilterChange('brand', value === '' ? '' : [value])}
                  className='gap-2 checked:bg-violet-600'
                />
                <span className='ml-2'>
                  {label}
                </span>
              </label>)
            }
          </div>
          <div className='flex flex-col'>
            <h2 className='text-gray-400 font-bold my-3'>Cylinders</h2>
            {
              availableFilterCylindersOptions.map(({ value, label }, i) => <label key={i}>
                <input
                  type="checkbox"
                  checked={filters.cylinders.includes(value)}
                  onChange={() => handleFilterChange('cylinders', [value])}
                  className='gap-2 checked:bg-violet-600'
                />
                <span className='ml-2'>
                  {label}
                </span>
              </label>)
            }
          </div>
          <div className='flex flex-col'>
            <h2 className='text-gray-400 font-bold my-3'>Price</h2>
            <input
              type="range"
              value={filters.rentPriceRange}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange('rentPriceRange', e.target.value)}
              min={35}
              max={100}
            />
            <span className='font-bold'>Max {filters.rentPriceRange && `$${filters.rentPriceRange}`}</span>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3 md:flex-1 p-2 '
        >
          {
            filteredCars?.length === 0 ?
              (<p className='text-center text-xl w-full'>No cars found</p>) :
              (
                filteredCars.map((car, i) => <CarCard key={i} car={car} />)
              )
          }

        </div>
      </div>
      {
        (limit || 20 < filteredCars?.length) &&
        (
          <CustomButton title='Show More'
            type='button'
            containerStyle='mt-12 mx-auto bg-blue-600 text-white px-6' handleClick={handleClick}
          />)
      }

    </section>
  )
}

export default ShowAllCars