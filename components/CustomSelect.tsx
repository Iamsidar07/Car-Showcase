'use client'
import { CustomSelectProps } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

const CustomSelect = ({ options, onChange, label, containerStyle, parentContainerStyle, name }: CustomSelectProps) => {
    const [isShownOptions, setIsShownOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label);
    return (
        <div className={`w-full  relative ${parentContainerStyle}`}>
            <button type='button' className={`flex items-center justify-between px-4 py-2.5 w-full text-sm relative min-w-[130px] ${containerStyle}`}
                onClick={() => setIsShownOptions(true)}
            >
                <span className='block truncate text-sm capitalize'>{selectedOption}</span>
                <Image src={'/icons/chevron-up-down.svg'} alt='up down icon' width={20} height={20} className='object-contain' />
            </button>
            {
                isShownOptions && (<ul className='bg-white shadow rounded absolute mt-2 max-h-60 overflow-y-auto space-y-1 flex flex-col items-center w-full z-10 '>
                    {
                        options.map(({ value, title }, i) => (<li key={i} className='text-sm px-2 py-1.5 w-full hover:bg-blue-600 hover:text-white bg-white cursor-pointer' onClick={() => {
                            onChange(value, name);
                            setSelectedOption(value);
                            setIsShownOptions(false);
                        }}>{title}</li>))
                    }
                </ul>)
            }
        </div>
    );
};

export default CustomSelect;
