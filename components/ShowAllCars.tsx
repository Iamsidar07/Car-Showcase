'use client'
import { Car, FilterProps } from '@/types'
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import CustomButton from './CustomButton';
import CarCard from './CarCard';
import { availableFilterBrandOptions, availableFilterCylindersOptions, availableFilterDriveOptions, availableFilterFuelTypeOptions, availableFilterTypeOptions } from '@/constants';
import Image from 'next/image';
interface ShowAllCarsProps {
  allCars: Car[],
  limit: number
}
interface FilterCardProps {
  title: string,
  category: keyof FilterProps,
  options: { value: string, label: string }[]
}
const ShowAllCars = ({ allCars, limit }: ShowAllCarsProps) => {
  const router = useRouter();
  const [searchInputVal, setSearchInputVal] = useState('');
  const [searchCarResults, setSearchCarResults] = useState<Car[]>([]);
  const [isShownFilter, setIsShownFilter] = useState(false);
  const [filters, setFilters] = useState<FilterProps>({
    brand: [],
    cylinders: [],
    type: [],
    drive: [],
    fuelType: [],
    rentPriceRange: '100'
  });

  const handleFilterChange = (category: string, value: string[] | string) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [category]: value
    }));
  };

  let filteredCars = allCars.filter((car) => {
    const { brand, cylinders, rentPriceRange, type, drive, fuelType } = filters;
    const calcRentalPrice = car.combination_mpg * car.displacement;

    return (
      (brand.length === 0 || brand.includes(car.make) || brand.includes(car.make)) &&
      (cylinders.length === 0 || cylinders.includes(`${car.cylinders}`)) &&
      (rentPriceRange === '' || calcRentalPrice <= parseInt(rentPriceRange)) &&
      (type.length === 0 || car.class?.includes(type[0])) &&
      (drive.length === 0 || drive.includes(car.drive)) &&
      (fuelType.length === 0 || car.fuel_type.includes(fuelType[0]))
    );
  })

  const handleClick = () => {
    const newLimit = ((limit || 20) + 1) * 10;
    const pathname = updateSearchParams('limit', `${newLimit}`);
    router.push(pathname);
  }

  const handleSearchValChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputVal(e.target.value);
    const searchFilteredCar = allCars.filter((car) => car.class?.includes(searchInputVal.toLowerCase()) ||
      car.model.includes(searchInputVal.toLowerCase()) ||
      car.make.includes(searchInputVal.toLowerCase()));
    setSearchCarResults(searchFilteredCar);
  }

  const FilterCard = ({ title, options, category }: FilterCardProps) => {
    return (
      <div className={`flex flex-col`}>
        <h2 className='text-gray-400 font-bold my-3'>{title}</h2>
        {
          options.map(({ value, label }, i) => <label key={i}>
            <input
              type="checkbox"
              checked={filters[`${category}`].includes(value)}
              onChange={() => handleFilterChange(`${category}`, value === '' ? '' : [value])}
              className='w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 gap-2'
            />
            <span className='ml-2 text-sm'>
              {label}
            </span>
          </label>)
        }
      </div>
    )
  }

  const filterData: FilterCardProps[] = [
    { title: 'Brand', category: 'brand', options: availableFilterBrandOptions },
    { title: 'Drive', category: 'drive', options: availableFilterDriveOptions },
    { title: 'Class', category: 'type', options: availableFilterTypeOptions },
    { title: 'Fuel Type', category: 'fuelType', options: availableFilterFuelTypeOptions },
    { title: 'Cylinders', category: 'cylinders', options: availableFilterCylindersOptions },
  ]


  return (
    <section className='w-full'>
      <div className='flex flex-col md:flex-row gap-4'>
        <button type='button' className='bg-blue-500 text-white px-5 py-1.5 rounded-full w-fit md:hidden ml-2 flex items-center' onClick={()=>setIsShownFilter((prevState)=>!prevState)}>
          <span>Filters</span>
          <Image src={'/icons/filter.svg'} alt='filter icon' width={17} height={17} className='object-contain ml-1'/>
        </button>
        <div className={`px-4 md:p-6 py-3 md:flex  md:flex-col bg-white shadow-sm rounded-lg gap-3 sticky md:min-h-screen flex-wrap transition-all duration-200 ease-linear ${isShownFilter?'flex':'hidden'}`}>
          {/* <Searchbar /> */}
          <div className='items-center py-1.5 border-b-[0.5px] hidden md:flex '>
            <Image
              src={'/icons/search.svg'}
              alt='search icon'
              width={20}
              height={20}
              className='object-contain mr-2'
            />
            <input
              type='text'
              value={searchInputVal}
              onChange={handleSearchValChange}
              placeholder='Search by brand or title'
              className='outline-none bg-transparent text-sm'
            />
          </div>
          
          {
            filterData.map(({ title, category, options }, i) => (<FilterCard key={i} title={title} options={options} category={category} />))
          }

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

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3 md:flex-1 px-2 '
        >
          {
            (filteredCars?.length === 0) || (searchCarResults.length === 0 && searchInputVal) ?
              (<p className='text-center text-xl w-full'>No cars found</p>) :
              (
                searchInputVal ?
                  searchCarResults.map((car, i) => <CarCard key={i} car={car} />) :
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