import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)