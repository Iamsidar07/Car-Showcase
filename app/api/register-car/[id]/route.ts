import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import cld from 'cloudinary';
import Car from '@/models/Car';

const cloudinary = cld.v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETE_KEY
});
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    // user id
    const { id } = params;
    //all info
    const {
        carTitle,
        location,
        rentPrice,
        capacity,
        fuelCapacity,
        shortDescription,
        typeOfclass,
        model,
        manufacturer,
        cylinders,
        cityMPG,
        combinationMPG,
        highwayMPG,
        year,
        transmission,
        fuelType,
        carType,
        drive,
        imageFiles,
    } = await req.json();

    try {
        await connectToDatabase();
        //upload all base64 of photos to cloudinary and get their urls 
        const photoUploadPromises = imageFiles.map(async (base64: string) => {
            const { url } = await cloudinary.uploader.upload(base64);
            return url;
        });
        //all photos urls
        const photosUrl = await Promise.all(photoUploadPromises);
        //create new car on mongodb
        const newCar = new Car({
            carTitle,
            location,
            rentPrice,
            capacity,
            fuelCapacity,
            shortDescription,
            typeOfclass,
            model,
            manufacturer,
            cylinders,
            cityMPG,
            combinationMPG,
            highwayMPG,
            year,
            transmission,
            fuelType,
            carType,
            drive,
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