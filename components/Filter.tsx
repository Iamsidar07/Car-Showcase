'use client'
import { useState } from 'react';
import CustomSelect from './CustomSelect';
import { fuels, yearsOfProduction } from '@/constants';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '@/utils';

const Filter = () => {
    const router = useRouter();

    const handleFuelTypeChange = (value: string) => {
        updateSearchParamsAndPush('fuel_type',value.toLowerCase());
    }
    const handleModelChange = (value: string) => {
        updateSearchParamsAndPush('year',value);
    }

    const updateSearchParamsAndPush = (type: string, value: string) => {
        const pathname = updateSearchParams(`${type}`, value);
        router.push(pathname);
    }

    return (
        <div className='flex items-center space-x-2 w-full md:w-fit'>
            <CustomSelect label='Choose Model' onChange={handleModelChange} options={yearsOfProduction} containerStyle='z-40 border bg-white dark:bg-slate-800 dark:border-slate-700 rounded-md' name='model'/>
            <CustomSelect label='Choose Fuel Type' onChange={handleFuelTypeChange} options={fuels} containerStyle='border bg-white  dark:bg-slate-800 dark:border-slate-700 rounded-md' name='fueltype'/>
        </div>
    )
}

export default Filter;