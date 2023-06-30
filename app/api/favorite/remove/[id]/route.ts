import { connectToDatabase } from "@/utils/database";
import Favorite from "@/models/Favorite";
import { NextResponse } from "next/server";
// DELETE (deletes prompt)
export const DELETE = async (req: Request, { params }: { params:{ id:string } }) => {
    const { id } = params;
    try {
        await connectToDatabase();
        await Favorite.findByIdAndRemove(id);
        return NextResponse.json('Deleted successfull with id', { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(`Failed to delete with id:${id}`, { status: 500 });

    }
}