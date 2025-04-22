'use client'

import { useCart } from "@/context/CartContext"
import { useState, useEffect } from "react"
import { ProductType } from "@/models/Product"
import { Types } from "mongoose"

type PopulatedInventoryItem = {
    product: ProductType & { _id: Types.ObjectId }
    date: string
    quantityAvailable: number
    maxQuantity: number
  }

export default function CartPage() {
    const {cart, removeFromCart, clearCart} = useCart()
    const [pickupDate, setPickupDate] = useState(() => {
        return new Date().toISOString().split('T')[0] // default to today
    })
    const [inventory, setInventory] = useState<any[]>([])
    
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 2)

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const fetchInventory = async (pickupDate: string)  => {
        const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: pickupDate }),
        })
        return await res.json()
        
    }

    const handleCheckout = async () => {
        const inventoryForDay: PopulatedInventoryItem[] = await fetchInventory(pickupDate)
        setInventory(inventoryForDay)

        const errors = cart.filter((item) => {
            const inventoryItem = inventoryForDay.find((inv) => inv.product._id.toString() === item.productId)
            return item.quantity > (inventoryItem?.quantityAvailable ?? 0)
        })

        if (errors.length > 0) {
            alert('One or more items exceed the available quantity for your selected date.')
            return
        }

        const checkoutRes = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                items: cart,
                pickupDate,
            }),
        })
        const coData = await checkoutRes.json()

        if (coData?.url) {
            window.location.href = coData.url // Redirect to Stripe Checkout
        }
    }

    useEffect(() => {
        const load = async () => {
            const data = await fetchInventory(pickupDate)
            setInventory(data)
        }
        load()
    }, [pickupDate])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className="my-6">
                        <label>
                            Pickup Date:
                            <input 
                                type= "date"
                                value= {pickupDate}
                                min= {new Date().toISOString().split('T')[0]}
                                max= {maxDate.toISOString().split('T')[0]}
                                onChange={(e) => setPickupDate(e.target.value)}
                                className="border px-3 py-2 rounded"
                            />
                        </label>
                    </div>

                    <ul className="space-y-4">
                        {cart.map((item) => {
                            const available = inventory.find((inv) => inv.product._id.toString()===item.productId)?.quantityAvailable
                            return (
                            <li 
                                key={item.productId}
                                className="flex justify-between border-b pb-2"
                            >
                                <div>
                                    {item.name} x {item.quantity}
                                    {available !== undefined && (
                                        <p className="text-xs text-gray-500">
                                            Available for {pickupDate}: {available}
                                        </p>
                                    )}
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                <button 
                                    className="text-red-500 ml-4"
                                    onClick={() => removeFromCart(item.productId)}
                                >
                                    Remove
                                </button>
                            </li>
                            )
                        })}
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