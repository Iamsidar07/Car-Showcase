'use client'
import Filter from './Filter';
import Searchbar from './Searchbar';
import CarCard from './CarCard';
import CustomButton from './CustomButton';
import { CatalogueProps, FilterProps } from '@/types';
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Catalogue = ({ allCars, limit }: CatalogueProps) => {
    const router = useRouter();
    const handleClick = () => {
        const newLimit = ((limit || 20) + 1) * 10;
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


            <div className='flex items-center justify-between'>
                <h2 className='text-gray-500 text-left mt-6'>Recommonded Cars</h2>
                <Link href={'/view-all'} className='text-blue-600 text-sm'>
                    view all
                </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3 mt-6'
            >
                {
                    allCars?.length === 0 ?
                        (<p className='text-center text-xl w-full'>No cars found</p>) :
                        (
                            allCars.slice(0, 4).map((car, i) => <CarCard key={i} car={car} />)
                        )
                }

            </div>
            <div className='flex items-center justify-between'>
                <h2 className='text-gray-500 text-left mt-6'>Popular Cars</h2>
                <Link href={'/view-all'} className='text-blue-600 text-sm'>
                    view all
                </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3 mt-6'
            >
                {
                    allCars?.length === 0 ?
                        (<p className='text-center text-xl w-full'>No cars found</p>) :
                        (
                            allCars.slice(4).map((car, i) => <CarCard key={i} car={car} />)
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