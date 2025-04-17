'use client'

import { createContext, useContext, useState, ReactNode } from "react"

export type CartItem = {
    itemId: string
    name: string
    price: number
    quantity: number
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (productId: string) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}: {children: ReactNode}) {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.itemId===item.itemId)
            if (existing) {
                return prev.map((p) => p.itemId===item.itemId 
                    ? {...p, quantity:p.quantity+item.quantity} 
                    : p
                )
            } else {
                return [...prev, item]
            }
        })
    }

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((p) => p.itemId !== productId))
    }

    const clearCart = () => setCart([])

    return(
        <CartContext.Provider value = {{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    if(!context) {
        throw new Error("useCart must be used inside CartProvider")
    }

    return context
}