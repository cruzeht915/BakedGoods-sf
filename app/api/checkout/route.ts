import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.json()

    if(!body || !Array.isArray(body.items)) {
        return NextResponse.json({error: "Invalid Cart Data"}, {status: 400})
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: body.items.map((item: any) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.price*100),
                },
                quantity: item.quantity,
            })),
            metadata: {
                items: JSON.stringify(body.items),
                email: body.email || 'guest@example.com',
                pickupDate: body.pickupDate
            },
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cart',
        })
        return NextResponse.json({url: session.url})
    } catch (err: any) {
        return NextResponse.json({error: err.message}, {status: 500})
    }
}