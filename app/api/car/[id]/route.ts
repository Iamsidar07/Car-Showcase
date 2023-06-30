import Car from "@/models/Car";
import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";

// get a car by id
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        await connectToDatabase();
        const specificCar = await Car.findById(id);
        return NextResponse.json(specificCar, { status: 200 });
    } catch (error) {
        console.error({ error });
        return NextResponse.json('Failed to get a specific car', { status: 500 });
    }
}