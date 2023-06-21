import Car from '@/models/Car';
import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import { fileToBase64,} from '@/utils';
import { FileProps } from '@/types';
import { useEffect } from 'react';

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string
})

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    console.log(id);
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

    console.log( 'imageFiles',imageFiles);

    try {
        await connectToDatabase();
        const photoUploadPromises = imageFiles.map(async (file:{ file:{ file:File } } ) => {
            try {
                console.log('file under',file,file.file);
                // const blob = new Blob([file.path]);
                // const buffer = await file.file.arrayBuffer();
                // const base64 = await fileToBase64(file) as string;
                // const base64 =  Buffer.from(file.file.toString()).toString('binary');
                console.log('base64',file.file.base64);
                const res = await imagekit.upload({
                    // file: buffer, //required
                    file: file.file.base64, //required
                    fileName: file.file.name,   //required
                    extensions: [
                        {
                            name: "google-auto-tagging",
                            maxTags: 5,
                            minConfidence: 95
                        }
                    ]
                });
                console.log('uploaded', file,res);
            } catch (error) {
                console.error(error);
            }
        });
        const photosUrl = await Promise.all(photoUploadPromises);
        console.log({ photosUrl });
        // const newCar = new Car({
        //     carTitle,
        //     location,
        //     rentPrice,
        //     capacity,
        //     fuelCapacity,
        //     shortDescription,
        //     typeOfclass,
        //     model,
        //     manufacturer,
        //     cylinders,
        //     cityMPG,
        //     combinationMPG,
        //     highwayMPG,
        //     year,
        //     transmission,
        //     fuelType,
        //     carType,
        //     drive,
        //     imageFiles: photosUrl,
        //     creator: id
        // });
        // await newCar.save();
        // console.log({ newCar });
        return NextResponse.json('hello', { status: 201 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to create a  Car', { status: 500 });
    }
}