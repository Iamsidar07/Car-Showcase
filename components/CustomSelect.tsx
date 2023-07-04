'use client'
import { CustomSelectProps } from '@/types';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { BsChevronContract } from 'react-icons/bs';

const CustomSelect = ({ options, onChange, label, containerStyle, parentContainerStyle, name }: CustomSelectProps) => {
    const { theme } = useTheme();
    const [isShownOptions, setIsShownOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label);
    return (
        <div className={`w-full  relative ${parentContainerStyle}`}>
            <button type='button' className={`flex items-center justify-between px-4 py-2.5 w-full text-sm relative min-w-[130px] ${containerStyle}`}
                onClick={() => setIsShownOptions(true)}
            >
                <span className='block truncate text-sm capitalize'>{selectedOption}</span>
                <BsChevronContract size={16} className={`ml-4 ${theme === 'dark'?'text-slate-400':'text-slate-700'}`}/>
            </button>
            {
                isShownOptions && (<ul className='bg-white dark:bg-slate-800 border dark:border-slate-700 shadow rounded absolute mt-2 max-h-60 overflow-y-auto space-y-1 flex flex-col items-center w-full z-10 '>
                    {
                        options.map(({ value, title }, i) => (<li key={i} className='text-sm px-2 py-1.5 w-full hover:bg-blue-600 dark:hover:bg-slate-700 hover:text-white  cursor-pointer' onClick={() => {
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
