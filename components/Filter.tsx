'use client'
import { useState } from 'react';
import CustomSelect from './CustomSelect';
import { fuels, yearsOfProduction } from '@/constants';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '@/utils';

const Filter = () => {
    const router = useRouter();
    const [query, setQuery] = useState({ fuel: 'Fuel', year: 'Year' });
    const handleChange = (value: string, name: string) => {
        setQuery({ ...query, [name]: value });
        const pathname = name === 'fuel' ?
            updateSearchParams('fuel_type', value.toLowerCase()) :
            updateSearchParams('year', value);
        router.push(pathname);
    }

    return (
        <div className='flex items-center space-x-2 w-full md:w-fit'>
            <CustomSelect query={query} name={'year'} onChange={handleChange} options={yearsOfProduction} />
            <CustomSelect query={query} name={'fuel'} onChange={handleChange} options={fuels} />
        </div>
    )
}

export default Filter;