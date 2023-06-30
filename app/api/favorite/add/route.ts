import Favorite from '@/models/Favorite';
import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
export const POST = async (req: Request) => {
    const favCar = await req.json();
    console.log({favCar});
    try {
        await connectToDatabase();
        const isFavoriteAllreadyExist = await Favorite.findById(favCar._id);
        console.log({isFavoriteAllreadyExist});
        if(isFavoriteAllreadyExist){
            return NextResponse.json('Favorite already exist', { status: 409 });
        }
        const newFavorite = new Favorite(favCar,{new:true});
        await newFavorite.save();
        console.log({ newFavorite });
        return NextResponse.json('newFavorite', { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to create a add a favorite', { status: 500 });
    }
}