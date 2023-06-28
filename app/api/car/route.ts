import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import Car from '@/models/Car';

// get all cars
export const GET = async (req: Request) => {

    try {
        await connectToDatabase();
        const allCars = await Car.find({});
        return NextResponse.json(allCars, { status: 200 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to create a  Car', { status: 500 });
    }
    
}