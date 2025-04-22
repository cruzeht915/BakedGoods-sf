import { connectToDB } from "@/lib/mongodb";
import Inventory from "@/models/Inventory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {date} = await req.json()
    await connectToDB()
    const inventory = await Inventory.find({date}).populate('product')
    return NextResponse.json(inventory)
}