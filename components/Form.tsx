'use client'
import { FormProps } from '@/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useState } from 'react'
import CustomSelect from './CustomSelect';
import ImageUploader from './ImageUploader';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { yearsOfProduction } from '@/constants';
import toast from 'react-hot-toast';

const Form = ({ carInfo, setCarInfo, submitBtnTitle, title, handleSubmit, isLoading,  }: FormProps) => {

    const [accepetedFiles, setAccepetedFiles] = useState<File[]>([]);


    // convert image into base64 for that I have to use useeffect
    useEffect(() => {
        const getBase64 = (file: File) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // store reader.result
                carInfo.imageFiles = [];
                carInfo.imageFiles.push(reader.result as string);
            };
            reader.onerror = () => {
                // log the error
                console.error(reader.error);
            }
        };
        accepetedFiles?.map((file) => getBase64(file));

    }, [accepetedFiles, carInfo]);


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCarInfo((prevCarInfo) => ({
            ...prevCarInfo,
            [name]: value,
        }));
    };

    const handleSelectChange = (value: string, name: string) => {
        setCarInfo((prevCarInfo) => ({
            ...prevCarInfo,
            [name]: value,
        }));
    };


    // Handle drop files
    const handleOnDrop = (files: File[]) => {
        if (files.length > 5) {
            toast('You can upload upto 4 images only');
            return;
        }
        setAccepetedFiles(files);
    }

    return (
        <form className='max-w-[1440px] mx-auto  p-3 md:p-5 rounded-lg' onSubmit={handleSubmit}>
            <h1 className='text-lg font-bold'>{title}</h1>
            <p className='text-gray-400 text-sm font-light'>Please enter your car ℹ️info.</p>
            <h2 className='text-xl md:text-2xl text-blue-500 tracking-wide font-bold my-6 uppercase'>Car info</h2>
            <div className='flex flex-col gap-6 md:gap-7'>
                <div className='flex flex-col md:flex-row items-center w-full gap-1 md:gap-4'>
                    <CustomInput label='Car Title' name='carTitle' placeholder='Your title' value={carInfo.carTitle} onChange={handleInputChange} />
                    <CustomInput label='Location' name='location' placeholder='🗾 location' value={carInfo.location} onChange={handleInputChange} />
                </div>
                <div className='flex flex-col md:flex-row items-center w-full gap-1 md:gap-4'>
                    <CustomInput label='Rent Price' name='rentPrice' placeholder='Price in dollar $' type='number' value={carInfo.rentPrice} onChange={handleInputChange} />
                    <CustomInput label='Capacity' name='capacity' placeholder='Capacity in person' type='number' value={carInfo.capacity} onChange={handleInputChange} />
                </div>
                <div className='flex flex-col md:flex-row items-center w-full gap-1 md:gap-4'>
                    <CustomInput label='Fuel Capacity' name='fuelCapacity' placeholder='Fuel capacity in liters' type='number' value={carInfo.fuelCapacity} onChange={handleInputChange} />
                    <CustomInput label='Short Description' name='shortDescription' placeholder='Enter a short description' value={carInfo.shortDescription} onChange={handleInputChange} />
                </div>
                <div className='flex flex-col md:flex-row items-center w-full gap-1 md:gap-4'>
                    <CustomInput label='Class' name='typeOfclass' placeholder='Enter a class' value={carInfo.typeOfclass} onChange={handleInputChange} />
                    <CustomInput label='Model' name='model' placeholder='Enter car model.' value={carInfo.model} onChange={handleInputChange} />
                    <CustomInput label='Manufacturer' name='manufacturer' placeholder='Enter manufacturer of car.' value={carInfo.manufacturer} onChange={handleInputChange} />
                    <div className='w-full'>
                        <h2 className='mb-2 font-bold'>Cylinders</h2>
                        <CustomSelect label='Cylinders' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: '4', value: '4' }, { title: '6', value: '6' }]} containerStyle='border rounded-md py-3 dark:border-slate-700' parentContainerStyle='z-40' name='cylinders' />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-center w-full gap-1 md:gap-4'>
                    <CustomInput label='City Mpg' name='cityMPG' placeholder='12' type='number' value={carInfo.cityMPG} onChange={handleInputChange} />
                    <CustomInput label='Combination MPG' name='combinationMPG' placeholder='24' type='number' value={carInfo.combinationMPG} onChange={handleInputChange} />
                    <CustomInput label='Highway MPG' name='highwayMPG' placeholder='24' type='number' value={carInfo.highwayMPG} onChange={handleInputChange} />
                    <div className='w-full'>
                        <h2 className='mb-2 font-bold'>Model Year</h2>
                        <CustomSelect label='year' onChange={(value, name) => handleSelectChange(value, name)} options={yearsOfProduction} containerStyle='border dark:border-slate-700 rounded-md py-3' parentContainerStyle='z-20' name='year' />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row items-center w-full gap-1 md:gap-4'>
                    <div className='w-full'>
                        <h2 className='mb-2 font-bold'>Transmission</h2>
                        <CustomSelect label='Transmission' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: 'A', value: 'a' }, { title: 'M', value: 'm' }]} containerStyle='border dark:border-slate-700 rounded-md py-3 ' name='transmission' />
                    </div>
                    <div className='w-full'>
                        <h2 className='mb-2 font-bold'>Fuel Type</h2>
                        <CustomSelect label='Fuel Type' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: 'Fuel', value: 'fuel' }, { title: 'Gas', value: 'gas' }, { title: 'Electricity', value: 'electricity' }]} containerStyle='border dark:border-slate-700 rounded-md py-3' name='fuelType' />
                    </div>
                    <div className='w-full'>
                        <h2 className='mb-2 font-bold'>Car Type</h2>
                        <CustomSelect label='Car Type' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: 'Kia', value: 'kia' }, { title: 'BMW', value: 'bmw' }]} containerStyle='border dark:border-slate-700 rounded-md py-3' name='carType' />
                    </div>
                    <div className='w-full'>
                        <h2 className='mb-2 font-bold'>Drive</h2>
                        <CustomSelect label='Drive' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: 'FWD', value: 'fwd' }, { title: 'AWD', value: 'awd' }]} containerStyle='border dark:border-slate-700 rounded-md py-3' name='drive' />
                    </div>
                </div>
                <ImageUploader files={accepetedFiles} handleOnDrop={handleOnDrop} carInfo={carInfo} />
                <CustomButton title={submitBtnTitle} type='submit' containerStyle='bg-blue-600 border text-white ml-auto mt-4 w-fit rounded-full dark:bg-slate-700 dark:border-slate-600' isLoading={isLoading} />
            </div>
        </form>
    )
}

export default Form