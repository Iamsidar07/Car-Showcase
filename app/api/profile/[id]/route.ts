import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import cld from 'cloudinary';

const cloudinary = cld.v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETE_KEY
});


// get user profile
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        await connectToDatabase();
        const profile = await User.findById(id);
        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to get user', { status: 500 });
    }
}

// update user profile
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { coverImage } = await req.json();
    // update user profile data
    try {
        await connectToDatabase();
        const { url } = await cloudinary.uploader.upload(coverImage);
        const updatedProfile = await User.findByIdAndUpdate(id,{coverImage:url},{ new: true });
        return NextResponse.json(updatedProfile, { status: 200 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to update user', { status: 500 });
    }
}