# Baked Goods Storefront

A full-stack e-commerce app for ordering baked goods with per-day inventory limits, advance pickup scheduling, and Stripe Checkout integration.

## Features

- 🛒 Add-to-cart with real-time quantity tracking
- 📅 Calendar-based pickup date selection (up to 2 months ahead)
- 📦 Per-item daily inventory enforcement
- 💳 Secure payments via Stripe Checkout
- 📈 Inventory auto-generation for future days
- 🔐 User account support (optional)

## Tech Stack

- **Frontend:** Next.js (App Router) + React + Tailwind CSS
- **Backend:** Next.js API Routes + MongoDB (via Mongoose)
- **Payments:** Stripe Checkout + Webhooks
- **Database Models:** Product, Order, Inventory


## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/baked-storefront.git
   cd baked-storefront
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your environment variables in `.env.local`:
   ```env
   MONGODB_URI=your_mongo_uri
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXTAUTH_SECRET=some_random_secret
   ```

4. Seed products:
   ```bash
   npx tsx scripts/seed.ts
   ```

5. Seed inventory for the next 60 days:
   ```bash
   npx tsx scripts/seedInventory.ts
   ```

6. Run the app:
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment

Use [Vercel](https://vercel.com/) to deploy the app and set the same `.env` variables in the Vercel dashboard under **Project Settings > Environment Variables**.

---

## Webhooks (Live)

To handle Stripe webhooks in production:
1. Deploy the app
2. Add a webhook in your Stripe dashboard
3. Use the live webhook secret in `.env.local` and Vercel

---

## Testing Live Checkout

- Switch Stripe to live mode
- Use real payment details
- Orders reduce the selected day's inventory automatically

---

## Future Improvements

- Admin dashboard for editing inventory
- Email confirmations
- Persistent cart via localStorage or backend
- Auth system with order history

---

## License

MIT

