'use client'
import React, { useState } from 'react'
import CustomSelect from './CustomSelect'
import { fuels, yearsOfProduction } from '@/constants';
import { useRouter } from 'next/navigation';

const Filter = () => {
    const router = useRouter();
    const [query, setQuery] = useState({ fuel: 'Fuel', year: 'Year' });
    const handleChange = (value: string, name: string) => {
        setQuery({ ...query, [name]: value });
        if (name === 'fuel') {
            updateSearchParams('fuel_type', value.toLowerCase());
        } else{
            updateSearchParams('year', value);
        }
    }
    const updateSearchParams = (type:string,value:string) => {
        const searchParams = new URLSearchParams(window.location.search);
        console.log({ searchParams })
        if (value) {
            searchParams.set(type, value);
        } else {
            searchParams.delete(type);
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newPathname);
    }

    return (
        <div className='flex items-center space-x-2 w-full md:w-fit'>
            <CustomSelect query={query} name={'year'} onChange={handleChange} options={yearsOfProduction} />
            <CustomSelect query={query} name={'fuel'} onChange={handleChange} options={fuels} />
        </div>
    )
}

export default Filter