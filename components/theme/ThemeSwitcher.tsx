'use client'
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { MdDarkMode } from 'react-icons/md';
import { BsSun } from 'react-icons/bs';


const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [isDropdownShown, setIsDropdownShown] = useState(false);


    return (
        <div className='relative'>
            
            {
                theme === 'light' ? (<BsSun size={20} className={`h-6 w-6 text-slate-700 cursor-pointer `} onClick={() => setIsDropdownShown((prevState) => !prevState)} />) : (<MdDarkMode size={20} className={`h-6 w-6 text-slate-400 cursor-pointer `} onClick={() => setIsDropdownShown((prevState) => !prevState)} />)
            }
            {
                isDropdownShown && (
                    <div className='bg-white/70 dark:bg-gradient-radial from-slate-700 to-slate-900 min-w-[140px]  rounded-md backdrop-blur-lg absolute top-12 -right-6 md:-right-1/3 flex flex-col  z-50 text-center border dark:border-slate-700/95  '>

                        <button onClick={() => {
                            setIsDropdownShown(false);
                            setTheme('light');
                        }} className='flex gap-2 items-center p-2  hover:bg-white/30 dark:hover:bg-slate-700 rounded-t-md'>
                            <BsSun size={20} className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-500' : 'text-slate-700'}`} />
                            <span className='text-slate-600 dark:text-slate-300'>Light</span>
                        </button>
                        <button onClick={() => {
                            setIsDropdownShown(false);
                            setTheme('dark');
                        }} className='flex gap-2 items-center p-2  hover:bg-white/30 dark:hover:bg-slate-700 '>
                            <MdDarkMode size={20} className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-500' : 'text-slate-700'}`} />
                            <span className='text-slate-600 dark:text-slate-300'>Dark</span>
                        </button>

                    </div>
                )
            }</div>
    )
}

export default ThemeSwitcher