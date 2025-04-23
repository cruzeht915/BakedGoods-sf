import Link from "next/link"

export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Thank you for your order. We&apos;ll have your baked goods ready for pickup at your selected time!
            </p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Continue Shopping
            </Link>
        </div>
    )
}