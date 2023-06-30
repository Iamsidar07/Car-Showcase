'use client'
import { Form } from '@/components';
import { CarInfoProps } from '@/types';
import React, { FormEvent, useEffect, useState } from 'react'

const EditCar = ({ params }: { params: { id: string } }) => {
    const { id } = params;
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
    useEffect(() => {
        const getCarInfo = async () => {
            const res = await fetch(`/api/car/${id}`);
            const data = await res.json();
            setCarInfo(data);
        }
        getCarInfo();
    }, [id]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform any additional validation or data processing here
        console.log(carInfo);

        try {
            const response = await fetch(`/api/car/user/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(carInfo)
            });
            if (response.ok) {
                alert('Car has been edited successfully.');
            }
            console.log(response);
        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    return (
        <section className='relative pt-16 md:pt-20 px-1 '>
            <Form carInfo={carInfo} setCarInfo={setCarInfo} submitBtnTitle='Edit Car' title='Edit your car to rent' handleSubmit={handleSubmit} />
        </section>
    )
}

export default EditCar