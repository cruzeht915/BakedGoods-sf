'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'

type ProductProps = {
    productId: string
    name: string,
    price: number,
    description: string,
    imageURL?: string,
    quantityAvailable: number
}

export default function ProductCard(props: ProductProps) {
    const {addToCart} = useCart()

    const handleAdd = () => {
        addToCart({
            productId: props.productId,
            name: props.name,
            price: props.price,
            quantity: 1
        })
    }
    
    return (
        <div className="border border-gray-300 bg-foreground p-4 m-4 rounded-lg shadow-md hover:shadow-lg transition">
            {props.imageURL && (
            <div className="w-full mb-2">
                <Image
                src={props.imageURL}
                alt={props.name}
                width={300} 
                height={200}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            )}
            <h2 className="text-lg text-background font-semibold mt-2">{props.name}</h2>
            <p className="text-sm text-background">{props.description}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-background">${props.price.toFixed(2)}</span>
                <button 
                    onClick={handleAdd}
                    className="bg-orange-500 text-white text-sm px-3 py-1 rounded hover:shadow-md transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}