import { Car } from '@/types';
import { generateCarImageUrl } from '@/utils';
import Image from 'next/image';

const CardDetails = ({ searchParams }: { searchParams: Car }) => {
    const car = searchParams;
    return (
        <section className='relative max-w-[1440px] mx-auto overflow-hidden'>
            <div className='p-4 md:p-16 pt-32 md:pt-28 flex flex-col md:flex-row justify-between gap-8'>
                <div className='w-full h-fit'>
                    <div className='w-full h-full min-h-[290px] relative rounded-2xl'>
                        <Image
                            src={generateCarImageUrl(car)}
                            alt='car'
                            fill
                            className='object-contain w-full h-full scale-110 lg:scale-125 -rotate-6'
                        />
                        <Image
                            src={'/images/pattern.png'}
                            alt='patter'
                            fill
                            className='object-cover absolute w-full h-full -z-10 rounded-2xl'
                        />
                    </div>
                    <div className='flex items-center justify-between gap-5 mt-2'>
                        <div className='relative w-full h-full min-h-[150px] hover:scale-105 transition-all duration-150 ease-linear  bg-[#f5f8ff] rounded-lg shadow-lg'>
                            <Image
                                src={generateCarImageUrl(car, '29')}
                                alt='car'
                                fill
                                className='object-contain w-full h-full hover:-rotate-6 transition-all duration-150 ease-linear'
                            />
                        </div>
                        <div className='relative w-full h-full min-h-[150px] hover:scale-105 transition-all duration-150 ease-linear  bg-[#f5f8ff] rounded-2xl shadow-lg'>
                            <Image
                                src={generateCarImageUrl(car, '13')}
                                alt='car'
                                fill
                                className='object-contain w-full h-full hover:-rotate-6 transition-all duration-150 ease-linear'
                            />
                        </div>
                        <div className='relative w-full h-full min-h-[150px] hover:scale-105 transition-all duration-150 ease-linear  bg-[#f5f8ff] rounded-2xl shadow-lg'>
                            <Image
                                src={generateCarImageUrl(car, '33')}
                                alt='car'
                                fill
                                className='object-contain w-full h-full hover:-rotate-6 transition-all duration-150 ease-linear'
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-lg h-full flex flex-col text-left gap-3 md:border-l px-4 py-3'>
                    <h1 className='font-bold text-lg md:text-3xl '>{car.make} {car.model}</h1>
                    {
                        Object.entries(car).map(([key, value], i) => <div key={i} className='flex items-center justify-between gap-2'>
                            <p className='text-gray-400 capitalize'>{key.replaceAll('_', ' ')}</p>
                            <p className='font-bold '>{value}</p>
                        </div>)
                    }
                </div>
            </div>
        </section>
    )
}

export default CardDetails;