'use client'
import { useEffect, useState } from 'react';
import { CarProps } from '@/types';
import { generateCarImageUrl } from '@/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';

const CardDetails = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [car, setCar] = useState<CarProps>();

    // fecth individual car by its id
    useEffect(() => {
        const fetchSpecificCar = async () => {
            try {
                const res = await fetch(`/api/car/${id}`);
                const carDetail = await res.json();
                setCar(carDetail);
            } catch (error) {
                console.log('Something went wrong', error);
            }
        }

        toast.promise(fetchSpecificCar(), {
            loading: 'Fetching car details...',
            success: 'Fetched car details.',
            error: (err) => err.message
        })
    }, [id]);


    return (
        <section className='relative max-w-[1440px] mx-auto overflow-hidden pt-16 md:pt-24 p-2'>
            {
                car && (
                    <div className='w-full relative h-full bg-[#f2d6c2] dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300 border dark:border-zinc-600 flex flex-col md:flex-row items-center md:items-start justify-center gap-6 p-2.5 md:p-6 rounded-lg  md:rounded-3xl'>
                        <div className='gap-2 min-h-[350px] w-full relative'>
                            <h1 className='text-lg md:text-2xl font-semibold capitalize'>{car.carTitle}</h1>
                            <p className='mt-1 text-xs md:text-sm  capitalize'>{car.manufacturer} | {car.model}</p>
                            <Image
                                src={car.imageFiles[0]}
                                alt={car.carTitle}
                                fill
                                className='object-contain mt-2 scale-110'
                            />
                            <div className='absolute -bottom-4 '>
                                <span className='absolute top-0 text-sm font-bold'>$</span>
                                <span className='text-lg md:text-2xl font-bold text-center ml-2'>{car.rentPrice?.toFixed(2)}</span>
                                <span className='absolute bottom-0 text-sm font-bold'>/day</span>
                            </div>

                        </div>
                        <div className='w-full gap-2 grid grid-cols-2 '>
                            <div className='p-2 md:p-6 rounded-lg md:rounded-3xl bg-[#fbe1cc] dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300  border dark:border-slate-600 gap-2 flex items-center flex-col justify-center w-full row-span-1.25'>
                                <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#f2d6c2] dark:bg-slate-600 border dark:border-slate-500 text-2xl'>
                                    🚔
                                </div>
                                <p>{car.manufacturer}</p>
                            </div>
                            <div className='p-2 md:p-6 rounded-lg md:rounded-3xl bg-[#f7fce7] dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300  border dark:border-slate-600 gap-2 flex items-center flex-col justify-center w-full'>
                                <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#e3e7d7] dark:bg-slate-600 border dark:border-slate-500 text-2xl'>
                                    🧑🏽
                                </div>
                                <p>{car.year} Model</p>
                            </div>
                            <div className='p-2 md:p-6 rounded-lg md:rounded-3xl bg-[#eeefb1] dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300  border dark:border-slate-600 gap-2 flex items-center flex-col justify-center w-full'>
                                <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#dddeb4] dark:bg-slate-600 border dark:border-slate-500 text-2xl'>
                                    👯
                                </div>
                                <p>{car.capacity} People</p>
                            </div>
                            <div className='p-2 md:p-6 rounded-lg md:rounded-3xl bg-[#edf4ff] dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300  border dark:border-slate-600 gap-2 flex items-center flex-col justify-center w-full '>
                                <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#d4dceae9] dark:bg-slate-600 border dark:border-slate-500 text-2xl'>
                                    😮‍💨
                                </div>
                                <p>{car.cylinders} Cylinders</p>
                            </div>
                            <div className='p-2 md:p-6 rounded-lg md:rounded-3xl bg-[#edf4ff] dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300  border dark:border-slate-600 gap-2 flex items-center flex-col w-full col-span-2 '>
                                <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#d4dceae9] dark:bg-slate-600 border dark:border-slate-500 text-2xl'>
                                    💁🏽‍♂️
                                </div>
                                <p>{car.shortDescription}</p>
                            </div>


                        </div>

                    </div>
                )
            }
        </section>
    )
}

export default CardDetails;
