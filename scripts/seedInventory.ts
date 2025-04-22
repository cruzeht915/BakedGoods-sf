import { connectToDB } from "@/lib/mongodb";
import Inventory from "@/models/Inventory";
import Product from "@/models/Product";

const run = async () => {
    await connectToDB()
    const products = await Product.find()

    const today = new Date()

    for (let i=0; i<60; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        const dateString = date.toISOString().split('T')[0]

        for (const product of products) {
            const exists = await Inventory.findOne({
                product: product._id,
                date: dateString,
            })

            if (!exists) {
                await Inventory.create({
                    product: product._id,
                    date: dateString,
                    quantityAvailable: product.maxQuantityPerDay,
                    maxQuantity: product.maxQuantityPerDay,
                })
                console.log(`Seeded ${product.name} for ${dateString}`)
            }
        }
    }

    console.log('Inventory seeded for 60 days')
    process.exit()
}

run().catch((err) => {
    console.error(err),
    process.exit(1)
})