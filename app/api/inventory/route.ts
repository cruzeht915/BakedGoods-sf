import { connectToDB } from "@/lib/mongodb";
import Inventory from "@/models/Inventory";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";

export async function POST(req: NextRequest) {
    const {date} = await req.json()
    await connectToDB()
    const inventory = await Inventory.find({date}).populate('product')
    console.log('📦 populated inventory:', JSON.stringify(inventory, null, 2))
    return NextResponse.json(inventory)
}