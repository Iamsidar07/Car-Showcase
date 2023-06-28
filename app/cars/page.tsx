import { Car } from '@/types';
import { generateCarImageUrl } from '@/utils';
import Image from 'next/image';

const CardDetails = ({ searchParams }: { searchParams: Car }) => {
    const car = searchParams;
    return (
        <section className='relative max-w-[1440px] mx-auto overflow-hidden'>
            <div className='p-4 pt-24 flex flex-col md:flex-row justify-between gap-8'>
                <div className='w-full h-fit'>
                    <div className='w-full h-full min-h-[300px] relative rounded '>
                        <Image
                            src={generateCarImageUrl(car)}
                            alt='car'
                            fill
                            className='object-contain w-full h-full scale-[110%] md:hover:scale-[154%] md:hover:-rotate-6 md:hover:translate-x-1/6 z-30 transition-all duration-700 ease-linear'
                        />
                        <Image
                            src={'/images/pattern.png'}
                            alt='patter'
                            fill
                            className='object-cover absolute w-full h-full -z-10 rounded-lg '
                        />
                    </div>
                    <div className='flex items-center justify-between gap-2 bg-white'>
                        <div className='relative w-full h-full min-h-[150px] group '>
                            <Image
                                src={generateCarImageUrl(car, '29')}
                                alt='car'
                                fill
                                className='object-contain w-full h-full
                                group-hover:scale-125 group-hover:-rotate-6 transition-all duration-150 ease-linear'
                            />
                        </div>
                        <div className='relative w-full h-full min-h-[150px]  group  '>
                            <Image
                                src={generateCarImageUrl(car, '13')}
                                alt='car'
                                fill
                                className='object-contain w-full h-full group-hover:scale-125 group-hover:-rotate-6 transition-all duration-150 ease-linear'
                            />
                        </div>
                        <div className='relative w-full h-full min-h-[150px] group '>
                            <Image
                                src={generateCarImageUrl(car, '33')}
                                alt='car'
                                fill
                                className='object-contain w-full h-full group-hover:scale-125  group-hover:-rotate-6 transition-all duration-150 ease-linear'
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-lg h-full flex flex-col text-left gap-3 px-4 py-3 md:p-6 bg-white'>
                    <h1 className='font-bold text-lg md:text-3xl capitalize'>{car.make} {car.model}</h1>
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