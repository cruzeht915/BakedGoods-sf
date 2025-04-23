import { Types } from "mongoose";
import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectToDB } from "@/lib/mongodb";
import { CartItem } from "@/context/CartContext";
import Order from "@/models/Order";
import Inventory from "@/models/Inventory";
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const endpoint = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
    const rawBody = await req.text()
    const sig = req.headers.get('stripe-signature') as string

    let event

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpoint)
    } catch (err) {
        console.error('Webhook error:', err)
        return new Response(`Webhook Error: ${err}`, { status: 400 })
    }

    //Handle successful checkout
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        await connectToDB()

        const metadata = session.metadata
        const items = JSON.parse(metadata?.items || '[]')
        //const userEmail = metadata?.userEmail
        const pickupDate = metadata?.pickupDate

        const total = session.amount_total!/100

        const productUpdates = items.map(async (item: CartItem) => {
            await Inventory.findOneAndUpdate(
                { product: new Types.ObjectId(item.productId), date: pickupDate },
                { $inc: { quantityAvailable: -item.quantity } }
            )
        })

        await Promise.all(productUpdates)

        await Order.create({
            user: null,
            items: items.map((item:CartItem) => ({
                product: item.productId,
                quantity: item.quantity
            })),
            total,
            pickupDate,
            stripeSessionId: session.id,
            status: 'paid',
        })

        console.log('Order saved and inventory updated')
    }
    return new Response('Webhook received', { status: 200 })
}