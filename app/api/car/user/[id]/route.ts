import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import Car from '@/models/Car';
import cld from 'cloudinary';

const cloudinary = cld.v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETE_KEY
});

// get all cars specific to user
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        await connectToDatabase();
        const allCars = await Car.find({ creator: id }).populate('creator');
        return NextResponse.json(allCars, { status: 200 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to create a  Car', { status: 500 });
    }
}



// delete a user car by its id;
export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        await connectToDatabase();
        await Car.findByIdAndDelete(id);
        return NextResponse.json('Car deleted successfully', { status: 200 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to delete a  Car', { status: 500 });
    }
}

// update a user car by its id;
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const carInfo = await req.json();

    try {
        await connectToDatabase();
        //upload all base64 of photos to cloudinary and get their urls 
        const photoUploadPromises = carInfo.imageFiles.map(async (base64: string) => {
            const { url } = await cloudinary.uploader.upload(base64);
            return url;
        });
        //all photos urls
        const photosUrl = await Promise.all(photoUploadPromises);
        carInfo.imageFiles = photosUrl;
        const updatedCar = await Car.findByIdAndUpdate(id,{
            ...carInfo,
            imageFiles:photosUrl
        });
        return NextResponse.json(updatedCar, { status: 201 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to create a  Car', { status: 500 });
    }
}

// create a new car for a user
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    // user id
    const { id } = params;
    //all info
    const carInfo = await req.json();

    try {
        await connectToDatabase();
        //upload all base64 of photos to cloudinary and get their urls 
        const photoUploadPromises = carInfo.imageFiles.map(async (base64: string) => {
            const { url } = await cloudinary.uploader.upload(base64);
            return url;
        });
        //all photos urls
        const photosUrl = await Promise.all(photoUploadPromises);
        //create new car on mongodb
        const newCar = new Car({
            ...carInfo,
            imageFiles: photosUrl,
            creator: id
        });
        //save new car
        await newCar.save();
        return NextResponse.json(newCar, { status: 201 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to create a  Car', { status: 500 });
    }
}