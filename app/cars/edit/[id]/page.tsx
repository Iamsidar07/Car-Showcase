'use client'
import { FormEvent, useEffect, useState } from 'react';
import { Form } from '@/components';
import { CarInfoProps } from '@/types';
import toast from 'react-hot-toast';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const EditCar = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { width, height } = useWindowSize();
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
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        const getCarInfo = async () => {
            try {
                const res = await fetch(`/api/car/${id}`);
                const data = await res.json();
                setCarInfo(data);
            } catch (error) {
                console.error(error);
            }
        }
        toast.promise(getCarInfo(), {
            loading: 'Fetching car details..',
            success: 'Fetched car detail.',
            error: (err) => err.message
        })
        getCarInfo();
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        }
    }, [isSuccess]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        toast.promise((async () => {
            try {
                const response = await fetch(`/api/car/user/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(carInfo)
                });
                if (response.ok) {
                    setIsSuccess(true);
                }
            } catch (error) {
                console.error(error);
                setIsSuccess(false);
            } finally {
                setIsLoading(false);
            }
        })(), {
            loading: 'Editing car details...',
            success: 'Edited successfully.',
            error: (err) => err.message
        });
    };

    return (
        <section className='relative pt-16 md:pt-20 px-1 '>
            {
                isSuccess && <Confetti
                    width={width - 100}
                    height={height - 100}
                />
            }
            <Form
                carInfo={carInfo}
                setCarInfo={setCarInfo}
                submitBtnTitle='Edit Car'
                title='Edit your car to rent'
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </section>
    )
}

export default EditCar