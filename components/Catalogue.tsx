'use client'
import Filter from './Filter';
import Searchbar from './Searchbar';
import CarCard from './CarCard';
import CustomButton from './CustomButton';
import { Car } from '@/types';
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
interface CatalogueProps {
    allCars: Car[];
    limit: number;
}
const Catalogue = ({ allCars, limit }: CatalogueProps) => {
    const router = useRouter();

    const handleClick = () => {
        const newLimit = (limit + 1) * 10;
        const pathname = updateSearchParams('limit', `${newLimit}`);
        router.push(pathname);
    }

    return (
        <section className='w-full relative mt-12 p-4 md:p-16 max-w-[1440px] mx-auto'>
            <h1 className='font-bold text-2xl md:text-4xl'>Car Catalogue</h1>
            <p className='mt-2 text-sm'>Explore out cars you might like</p>
            <div className='w-full flex flex-col md:flex-row items-center justify-center  md:justify-between gap-2 mt-6'>
                <Searchbar />
                <Filter />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-2 md:gap-3 mt-12 md:mt-20'
            >
                {
                    allCars?.length === 0 ?
                        (<p className='text-center text-xl'>No cars found</p>) :
                        (
                            allCars?.map((car, i) => <CarCard key={i} car={car} />)
                        )
                }

            </div>
            {
                (limit < allCars?.length) && (<CustomButton title='Show More' type='button' containerStyle='mt-12 mx-auto bg-blue-600 text-white px-6 ' handleClick={handleClick} />)
            }
        </section>
    )
}

export default Catalogue