import Favorite from '@/models/Favorite';
import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
export const POST = async (req: Request) => {
    const {
        city_mpg,
        typeOfClass,
        combination_mpg,
        cylinders,
        displacement,
        drive,
        fuel_type,
        highway_mpg,
        make,
        model,
        transmission,
        year, userId } = await req.json();
    try {
        await connectToDatabase();
        const newFavorite = new Favorite({
            city_mpg,
            typeOfClass,
            combination_mpg,
            cylinders,
            displacement,
            drive,
            fuel_type,
            highway_mpg,
            make,
            model,
            transmission,
            year,
            creator: userId
        });
        await newFavorite.save();
        console.log({newFavorite});
        return NextResponse.json(newFavorite, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json('Failed to create a add a favorite', { status: 500 });
    }
}