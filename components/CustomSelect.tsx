'use client'
import Image from 'next/image';
import { useState } from 'react';
interface CustomSelectProps {
    options: { value: string, title: string }[];
    query: { fuel: string; year: string; };
    name: keyof { fuel: string; year: string; };
    onChange: (value: string, name: string) => void;
}
const CustomSelect = ({ options, query, name, onChange }: CustomSelectProps) => {
    const [isShownOptions, setIsShownOptions] = useState(false);
    return (
        <div className='w-full  relative z-10'>
            <button type='button' className='flex items-center justify-between px-4 py-2.5 bg-white rounded-md shadow-sm border w-full text-sm relative min-w-[130px]'
                onClick={() => setIsShownOptions(true)}
            >
                <span className='block truncate text-sm capitalize'>{query[name] || name}</span>
                <Image src={'/icons/chevron-up-down.svg'} alt='up down icon' width={20} height={20} className='object-contain' />
            </button>
            {
                isShownOptions && (<ul className='bg-white shadow rounded-md absolute mt-2 max-h-60 overflow-y-auto space-y-1 flex flex-col items-center w-full '>
                    {
                        options.map(({ value, title }, i) => (<li key={i} className='text-sm px-2 py-1.5 w-full hover:bg-blue-600 hover:text-white bg-white cursor-pointer' onClick={() => {
                            onChange(value, name);
                            setIsShownOptions(false);
                        }}>{title}</li>))
                    }
                </ul>)
            }
        </div>
    );
};

export default CustomSelect;
