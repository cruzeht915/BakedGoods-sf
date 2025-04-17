'use client'

import { useCart } from '@/context/CartContext'

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
        <div className="border border-red-500 bg-red-300 rounded-md shadow-sm p-4 big-white">
            {props.imageURL && (
            <img src={props.imageURL} alt={props.name} className="w-full h-40 object-cover rounded"/>
            )}
            <h2 className="text-lg font-semibold mt-2">{props.name}</h2>
            <p className="text-sm text-gray-600">{props.description}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="font-bold">${props.price.toFixed(2)}</span>
                <button 
                    onClick={handleAdd}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}