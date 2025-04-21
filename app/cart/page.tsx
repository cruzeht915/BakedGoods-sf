'use client'

import { useCart } from "@/context/CartContext"

export default function CartPage() {
    const {cart, removeFromCart, clearCart} = useCart()

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleCheckout = async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart }),
        })

        const data = await res.json()
        if (data?.url) {
            window.location.href = data.url // Redirect to Stripe Checkout
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li 
                                key={item.productId}
                                className="flex justify-between border-b pb-2"
                            >
                                <span>
                                    {item.name} x {item.quantity}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                <button 
                                    className="text-red-500 ml-4"
                                    onClick={() => removeFromCart(item.productId)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 text-right font-semibold">
                        Total: ${total.toFixed(2)}
                    </div>

                    <div className="flex gap-4 mt-4 justify-end">
                        <button
                            onClick={clearCart}
                            className="px-4 py-2 bg-gray-300 text-black rounded"
                        >
                            Clear Cart
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}

        </div>
    )
}