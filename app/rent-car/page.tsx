'use client'
import { Form } from '@/components';
import { CarInfoProps } from '@/types';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';


const RentACar = () => {
    const {data:session} = useSession();
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
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform any additional validation or data processing here
        setIsLoading(true);

        // check if there is a user
        if (!session?.user?.id) {
            toast('Login/Signup to rent a car.');
            return;
        }
        toast.promise((async()=>{
            try {
                const response = await fetch(`/api/car/user/${session?.user?.id}`, {
                    method: 'POST',
                    body: JSON.stringify(carInfo),
                });
                if (response.ok) {
                    toast.success('Car has been registered successfully.');
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong!');
            } finally {
                setIsLoading(false);
            }
        })(),{
            loading: 'Registering car...',
            success: 'Car registered successfully.',
            error:(err)=>err.message,
        })
    };

    return (
        <section className='relative pt-16 md:pt-20 px-1 '>
           <Form carInfo={carInfo} setCarInfo={setCarInfo} submitBtnTitle='Register car' title='Add your car to rent' handleSubmit={handleSubmit} isLoading={isLoading} />
        </section>
    )
}

export default RentACar