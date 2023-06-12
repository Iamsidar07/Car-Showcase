'use client'
import { manufacturers } from '@/constants'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'

const Searchbar = () => {
    const router = useRouter();
    const [manufacturer, setManufacturer] = useState('');
    const [carName, setCarName] = useState('');
    const [isManufacturerListShown, setIsManufacturerListShown] = useState(false);
    const [filteredManufacturers,setFilteredManufacturers] = useState<string[]>([])
    const manufacturerHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setManufacturer(e.target.value);
        setIsManufacturerListShown(true);
        const filteredResults  = manufacturers.filter((item)=>item.replaceAll(' ','').toLowerCase().includes(e.target.value.replaceAll(' ','').toLowerCase()));
        setFilteredManufacturers(filteredResults);
    }
    const handleManfacturerItemClick = (item: string) => {
        setManufacturer(item);
        setIsManufacturerListShown(false);
    }

    const handleCarNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCarName(e.target.value);
    }
    const handleSearch = (e:FormEvent<HTMLFormElement>)=>{
        console.log('hello')
        e.preventDefault();
        if (manufacturer === '' && carName === '') {
            return alert('Plase enter a manufacturer or car name')
        }
        updateSearchParams(carName.toLowerCase(),manufacturer.toLowerCase());
    }
    const updateSearchParams = (model:string,manufacturer:string)=>{
        const searchParams = new URLSearchParams(window.location.search);
        console.log({searchParams})
        if (model) {
            searchParams.set('model',model);
        }else{
            searchParams.delete('model');
        }
        if (manufacturer) {
            searchParams.set('manufacturer',manufacturer);
        }else{
            searchParams.delete('manufacturer');
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newPathname);
    }

    console.log(manufacturer, carName)
    return (
        <form className='w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 max-w-3xl' onSubmit={handleSearch}>
            <div className='flex items-center p-2 bg-[#3b3c9808] rounded shadow-sm w-full relative'>
                <Image src={'/icons/car-logo.svg'} alt='car company logo' width={20} height={20} className='object-contain' />
                <input
                    type="text"
                    placeholder='Volkswagen...'
                    className='text-gray-400 flex-1 outline-none pl-4 text-xs bg-transparent'
                    value={manufacturer}
                    onChange={manufacturerHandleChange}
                />

                <Image src={'/icons/magnifying-glass.svg'} alt='car company logo' width={20} height={20} className='object-contain flex md:hidden' />
                {
                    (manufacturer && isManufacturerListShown) && <div className='absolute top-9 left-0 right-0 w-full max-h-60 overflow-y-auto z-20 rounded-lg shadow-lg mt-4'>
                        {
                            filteredManufacturers.map((item, i) => {
                                return <button type='button' key={i} className='bg-white hover:bg-blue-500 hover:text-white px-4 py-2 cursor-pointer w-full text-left text-sm' onClick={() => handleManfacturerItemClick(item)}>{item}</button>
                            })
                        }

                    </div>
                }
            </div>
            <div className='flex items-center space-x-2 bg-[#3b3c9808] p-2 rounded shadow-sm w-full '>
                <Image src={'/images/model-icon.png'} alt='car company logo' width={20} height={20} className='object-contain' />
                <input
                    type="text"
                    placeholder='Teguan...'
                    className='text-gray-400 flex-1 outline-none pl-4 text-xs bg-transparent'
                    value={carName}
                    onChange={handleCarNameChange}
                />
                <Image src={'/icons/magnifying-glass.svg'} alt='car company logo' width={20} height={20} className='object-contain flex md:hidden' />
            </div>
            <button type='submit'>
                <Image src={'/icons/magnifying-glass.svg'} alt='car company logo' width={80} height={80} className='object-contain hidden md:flex' />
            </button>
        </form>
    )
}

export default Searchbar