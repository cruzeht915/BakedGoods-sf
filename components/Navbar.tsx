"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"

export default function Navbar() {
    const {cart} = useCart()
    const itemCount = cart.reduce((total, item) => total+item.quantity, 0)

    return(
        <nav className="flex justify-between items-center bg-white px-6 py-4 shadow">
            <Link href="/" className="text-xl text-gray-700 font-bold font-serif italic">
                🧁 Baked Goods
            </Link>
            <Link href="/cart" className="relative">
                <span className="text-lg">🛒</span>
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </Link>
        </nav>
    )
}