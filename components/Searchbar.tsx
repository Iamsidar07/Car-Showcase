'use client'
import { manufacturers } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const Searchbar = () => {
    const router = useRouter();
    const [manufacturer, setManufacturer] = useState('');
    const [carName, setCarName] = useState('');
    const [isManufacturerListShown, setIsManufacturerListShown] = useState(false);
    const [filteredManufacturers, setFilteredManufacturers] = useState<string[]>([]);

    const manufacturerHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setManufacturer(e.target.value);
        setIsManufacturerListShown(true);
        const filteredResults = manufacturers.filter((item) => item.replaceAll(' ', '').toLowerCase().includes(e.target.value.replaceAll(' ', '').toLowerCase()));
        setFilteredManufacturers(filteredResults);
    }
    const handleManfacturerItemClick = (item: string) => {
        setManufacturer(item);
        setIsManufacturerListShown(false);
    }

    const handleCarNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCarName(e.target.value);
    }
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (manufacturer === '' && carName === '') {
            return toast('Plase enter a manufacturer or car name');
        }
        updateSearchParams(carName.toLowerCase(), manufacturer.toLowerCase());
    }

    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (model) {
            searchParams.set('model', model);
        } else {
            searchParams.delete('model');
        }
        if (manufacturer) {
            searchParams.set('manufacturer', manufacturer);
        } else {
            searchParams.delete('manufacturer');
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newPathname);
    }

    return (
        <form className='w-full flex flex-col md:flex-row items-center justify-center gap-2 max-w-3xl bg-white dark:bg-slate-800  rounded border dark:border-slate-700 px-2' onSubmit={handleSearch}>
            <div className='flex items-center w-full py-2.5 px-4 relative md:border-r dark:border-slate-700 '>
                <Image
                    src={'/icons/car-logo.svg'}
                    alt='car company logo'
                    width={20}
                    height={20}
                    className='object-contain'
                />
                <input
                    type="text"
                    placeholder='Volkswagen...'
                    className='text-gray-400 flex-1 outline-none pl-4 text-xs bg-transparent'
                    value={manufacturer}
                    onChange={manufacturerHandleChange}
                />

                <button type='submit'>
                    <Image
                        src={'/icons/search.svg'}
                        alt='magnifying glass'
                        width={20}
                        height={20}
                        className='object-contain flex md:hidden'
                    />
                </button>
                {
                    (manufacturer && isManufacturerListShown) && <div className='absolute top-9 left-0 right-0 w-full max-h-60 overflow-y-auto z-20 rounded-lg shadow-lg mt-4'>
                        {
                            filteredManufacturers.map((item, i) => {
                                return <button
                                    key={i}
                                    type='button'
                                    className='bg-white hover:bg-blue-500 hover:text-white px-4 py-2 cursor-pointer w-full text-left text-sm'
                                    onClick={() => handleManfacturerItemClick(item)}
                                >
                                    {item}
                                </button>
                            })
                        }
                    </div>
                }
            </div>
            <div className='flex items-center w-full py-2.5 px-4 '>
                <Image
                    src={'/images/model-icon.png'}
                    alt='model icon'
                    width={20}
                    height={20}
                    className='object-contain'
                />
                <input
                    type="text"
                    placeholder='Teguan...'
                    className='text-gray-400 flex-1 outline-none pl-4 text-xs bg-transparent'
                    value={carName}
                    onChange={handleCarNameChange}
                />
                <button type='submit'>
                    <Image
                        src={'/icons/search.svg'}
                        alt='magnifying glass'
                        width={20}
                        height={20}
                        className='object-contain flex md:hidden'
                    />
                </button>
            </div>
            <button type='submit'>
                <Image
                    src={'/icons/search.svg'}
                    alt='search'
                    width={30}
                    height={30}
                    className='object-contain hidden md:flex'
                />
            </button>
        </form>
    )
}

export default Searchbar;