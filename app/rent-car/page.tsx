'use client'
import { CustomButton, CustomInput, CustomSelect, ImageUploader } from '@/components'
import { yearsOfProduction } from '@/constants';
import { CarInfoProps } from '@/types';
import { fileToBase64,} from '@/utils';
import { useSession } from 'next-auth/react';
import { ChangeEvent, FormEvent, useState } from 'react'


const RentACar = () => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [carInfo, setCarInfo] = useState<CarInfoProps>({
        carTitle: '',
        location: '',
        rentPrice: 0,
        capacity: 0,
        fuelCapacity: 0,
        shortDescription: '',
        typeOfclass: '',
        model: '',
        manufacturer: '',
        cylinders: 4,
        cityMPG: 0,
        combinationMPG: 0,
        highwayMPG: 0,
        year: '',
        transmission: '',
        fuelType: '',
        carType: '',
        drive: '',
        imageFiles: [],
    });

    const [accepetedFiles, setAccepetedFiles] = useState<File[]>([]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform any additional validation or data processing here
        console.log(carInfo);

        // check if there is a user
        if(!userId) {
            alert('Login/Signup to rent a car.');
            return;
        }
        
        try {
            const response = await fetch(`/api/register-car/${userId}`, {
                method: 'POST',
                body: JSON.stringify(carInfo)
            });
            // if (response.ok) {
            //     alert('Car has been registered successfully.');
            // }
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Something went wrong!');
        }
    };

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
        console.log(files);
        if (files.length > 5) {
            alert('You can upload upto 4 images only');
            return;
        }
        setAccepetedFiles(files);
        const accepetedFilesUrls = files.map(async(file) => {
            const base64 = await fileToBase64(file);
            const { name, lastModified, lastModifiedDate, path, size, type, webkitRelativePath } = file;
            return (
                {
                   file:{
                    name,
                    lastModified,
                    lastModifiedDate,
                    path,
                    size,
                    type,
                    webkitRelativePath,
                    base64
                   }
                }
            )
        });
        console.log(accepetedFilesUrls);
        setCarInfo((prevCarInfo) => {
            const res = accepetedFilesUrls;
            return ({
                ...prevCarInfo,
                // imageFiles: files
                imageFiles: res
            })
        });
    }

    return (
        <section className='relative pt-16 md:pt-20 px-1 '>
            <form className='max-w-5xl mx-auto bg-white border p-3 md:p-5 rounded-lg' onSubmit={handleSubmit}>
                <h1 className='text-lg font-bold'>Add a Car for rent</h1>
                <p className='text-gray-400 text-sm font-light'>Please enter your car ℹ️info.</p>
                <h2 className='text-xl md:text-2xl text-blue-500 tracking-wide font-bold my-6 uppercase'>Car info</h2>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col md:flex-row items-center w-full gap-1'>
                        <CustomInput label='Car Title' name='carTitle' placeholder='Your title' value={carInfo.carTitle} onChange={handleInputChange} />
                        <CustomInput label='Location' name='location' placeholder='📌 location' value={carInfo.location} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col md:flex-row items-center w-full gap-1'>
                        <CustomInput label='Rent Price' name='rentPrice' placeholder='Price in dollar $' type='number' value={carInfo.rentPrice} onChange={handleInputChange} />
                        <CustomInput label='Capacity' name='capacity' placeholder='Capacity in person' type='number' value={carInfo.capacity} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col md:flex-row items-center w-full gap-1'>
                        <CustomInput label='Fuel Capacity' name='fuelCapacity' placeholder='Fuel capacity in liters' type='number' value={carInfo.fuelCapacity} onChange={handleInputChange} />
                        <CustomInput label='Short Description' name='shortDescription' placeholder='Enter a short description' value={carInfo.shortDescription} onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col md:flex-row items-center w-full gap-1'>
                        <CustomInput label='Class' name='typeOfclass' placeholder='Enter a class' value={carInfo.typeOfclass} onChange={handleInputChange} />
                        <CustomInput label='Model' name='model' placeholder='Enter car model.' value={carInfo.model} onChange={handleInputChange} />
                        <CustomInput label='Manufacturer' name='manufacturer' placeholder='Enter manufacturer of car.' value={carInfo.manufacturer} onChange={handleInputChange} />
                        <div className='w-full'>
                            <h2 className='mb-2 font-bold'>Cylinders</h2>
                            <CustomSelect label='Cylinders' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: '4', value: '4' }, { title: '6', value: '6' }]} containerStyle='rounded-sm bg-[#f5f8ff] py-3' parentContainerStyle='z-40' name='cylinders' />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center w-full gap-1'>
                        <CustomInput label='City Mpg' name='cityMPG' placeholder='12' type='number' value={carInfo.cityMPG} onChange={handleInputChange} />
                        <CustomInput label='Combination MPG' name='combinationMPG' placeholder='24' type='number' value={carInfo.combinationMPG} onChange={handleInputChange} />
                        <CustomInput label='Highway MPG' name='highwayMPG' placeholder='24' type='number' value={carInfo.highwayMPG} onChange={handleInputChange} />
                        <div className='w-full'>
                            <h2 className='mb-2 font-bold'>Model Year</h2>
                            <CustomSelect label='year' onChange={(value, name) => handleSelectChange(value, name)} options={yearsOfProduction} containerStyle='rounded-sm bg-[#f5f8ff] py-3' parentContainerStyle='z-20' name='year' />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row items-center w-full gap-1'>
                        <div className='w-full'>
                            <h2 className='mb-2 font-bold'>Transmission</h2>
                            <CustomSelect label='Transmission' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: 'A', value: 'a' }, { title: 'M', value: 'm' }]} containerStyle='rounded-sm bg-[#f5f8ff] py-3' name='transmission' />
                        </div>
                        <div className='w-full'>
                            <h2 className='mb-2 font-bold'>Fuel Type</h2>
                            <CustomSelect label='Fuel Type' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: 'Fuel', value: 'fuel' }, { title: 'Gas', value: 'gas' }, { title: 'Electricity', value: 'electricity' }]} containerStyle='rounded-sm bg-[#f5f8ff] py-3' name='fuelType' />
                        </div>
                        <div className='w-full'>
                            <h2 className='mb-2 font-bold'>Car Type</h2>
                            <CustomSelect label='Car Type' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: 'Kia', value: 'kia' }, { title: 'BMW', value: 'bmw' }]} containerStyle='rounded-sm bg-[#f5f8ff] py-3' name='carType' />
                        </div>
                        <div className='w-full'>
                            <h2 className='mb-2 font-bold'>Drive</h2>
                            <CustomSelect label='Drive' onChange={(value, name) => handleSelectChange(value, name)} options={[{ title: 'FWD', value: 'fwd' }, { title: 'AWD', value: 'awd' }]} containerStyle='rounded-sm bg-[#f5f8ff] py-3' name='drive' />
                        </div>
                    </div>
                    <ImageUploader files={accepetedFiles} handleOnDrop={handleOnDrop} />
                    <CustomButton title='Register Car' type='submit' containerStyle='bg-blue-600 text-white ml-auto mt-4 w-fit' />
                </div>
            </form>
        </section>
    )
}

export default RentACar