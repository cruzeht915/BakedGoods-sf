'use client'

type ProductProps = {
    name: string,
    price: number,
    description: string,
    imageURL: string,
    quantityAvailable: number
}

export default function ProductCard({
    name, 
    price, 
    description, 
    imageURL,
    quantityAvailable
}: ProductProps) {
    return (
        <div className="border rounded-md shadow-sm p-4 big-white">
            {imageURL && (
            <img src="imageURL" alt="name" className="w-full h-40 object-cover rounded"/>
            )}
            <h2 className="text-lg font-semibold mt-2">{name}</h2>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="font-bold">${price.toFixed(2)}</span>
                <span className="text-xs text-gray-500">
                    {quantityAvailable} left today
                </span>
            </div>
        </div>
    )
}