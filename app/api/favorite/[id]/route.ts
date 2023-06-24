import Favorite from '@/models/Favorite';
import { connectToDatabase } from '@/utils/database';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        await connectToDatabase();
        const favorites = await Favorite.find({
            creator: id
        }).populate('creator');
        console.log('Favorites Fetched successfully,', favorites);
        return new Response(JSON.stringify(favorites), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("Unable to fetch all favorites"), { status: 500 });
    }

}

