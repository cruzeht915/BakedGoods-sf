import mongoose from 'mongoose'
import Product from '@/models/Product'
import { connectToDB } from '@/lib/mongodb'
import 'dotenv/config'

const seedProducts = [
  {
    name: 'Southern Belle Velvet (half dozen)',
    price: 15,
    maxQuantityPerDay: 4,
    quantityAvailable: 4,
    description: 'Soft, moist, with a velvety cream cheese frosting',
    imageURL: '/images/redVelvet.jpg',
  },
  {
    name: 'Pastéis de nata (Protugese Custard Tart, half dozen)',
    price: 12,
    maxQuantityPerDay: 8,
    quantityAvailable: 8,
    description: 'Crunchy outter pastry filled with creamy custard center',
    imageURL: '/images/pasteisDN.jpg',
  },
  {
    name: 'Pear Tarte Tatin',
    price: 2.0,
    maxQuantityPerDay: 40,
    quantityAvailable: 40,
    description: 'Falky puff pastry crust with deliciously caramelized and spiced pear topping',
    imageURL: '/images/pearTT.jpg',
  },
]

async function seed() {
  await connectToDB()
  await Product.deleteMany({}) // Clear existing products if needed
  await Product.insertMany(seedProducts)
  console.log('✅ Seeded baked goods!')
  mongoose.disconnect()
}

seed().catch((err) => {
  console.error('❌ Seeding error:', err)
  mongoose.disconnect()
})