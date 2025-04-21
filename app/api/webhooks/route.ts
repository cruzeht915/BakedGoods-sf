import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectToDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Disable automatic body parsing (needed for Stripe signature validation)
export const config = {
    api: {
        bodyParser: false,
    }
}

const endpoint = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
    const rawBody = await req.text()
    const sig = req.headers.get('stripe-signature') as string

    let event

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpoint)
    } catch (err) {
        console.error('❌ Webhook error:', err)
        return new Response(`Webhook Error: ${err}`, { status: 400 })
    }

    //Handle successful checkout
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object

        await connectToDB()

        const metadata = session.metadata
        const items = JSON.parse(metadata?.items || '[]')
        const userEmail = metadata?.userEmail
        const pickupDate = metadata?.pickupDate

        const total = session.amount_total!/100

        const productUpdates = items.map(async (item: any) => {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: {quantityAvailable: -item.quantity}
            })
        })

        await Promise.all(productUpdates)

        await Order.create({
            user: userEmail,
            items: items.map((item:any) => ({
                product: item.productId,
                quantity: item.quantity
            })),
            total,
            pickupDate,
            stripeSessionId: session.id,
            status: 'paid',
        })

        console.log('✅ Order saved and inventory updated')
        return new Response('Webhook received', { status: 200 })
    }
}