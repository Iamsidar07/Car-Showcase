'use client'
import { Form } from '@/components';
import {  CarInfoProps } from '@/types';
import { useSession } from 'next-auth/react';
import { FormEvent, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';



const RentACar = () => {
    const { data: session } = useSession();
    const { width, height } = useWindowSize();
    const [carInfo, setCarInfo] = useState<CarInfoProps>({
        capacity: 0,
        carTitle: '',
        carType: '',
        cityMPG: 0,
        highwayMPG: 0,
        combinationMPG: 0,
        cylinders: 0,
        drive: '',
        fuelCapacity: 0,
        fuelType: '',
        imageFiles: [],
        location: '',
        manufacturer:'',
        model:'',
        rentPrice:1,
        shortDescription:'',
        transmission:'',
        typeOfclass:'',
        year:'',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        }
    }, [isSuccess]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform any additional validation or data processing here
        setIsLoading(true);

        // check if there is a user
        if (!session?.user?.id) {
            toast('Login/Signup to rent a car.');
            return;
        };
        
        toast.promise((async () => {
            try {
                const response = await fetch(`/api/car/user/${session?.user?.id}`, {
                    method: 'POST',
                    body: JSON.stringify(carInfo),
                });
                if (response.ok) {
                    setIsSuccess(true);
                    toast.success('Car has been registered successfully.');
                }
            } catch (error) {
                console.error(error);
                setIsSuccess(false);
            } finally {
                setIsLoading(false);
            }
        })(), {
            loading: 'Registering car...',
            success: 'Car registered successfully.',
            error: (err) => err.message,
        });
    };

    return (
        <section className='relative pt-16 md:pt-20 px-1 '>
            {isSuccess && <Confetti width={width - 100} height={height - 100} />}
            <Form
                carInfo={carInfo}
                setCarInfo={setCarInfo}
                submitBtnTitle='Register car'
                title='Add your car to rent'
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </section>
    )
}

export default RentACar