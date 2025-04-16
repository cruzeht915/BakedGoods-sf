import mongoose from 'mongoose'
import Product from '@/models/Product'
import { connectToDB } from '@/lib/mongodb'
import 'dotenv/config'

const seedProducts = [
  {
    name: 'Chocolate Chip Cookie',
    price: 2.5,
    maxQuantityPerDay: 50,
    quantityAvailable: 50,
    description: 'Soft, chewy, and packed with chocolate chips.',
    imageUrl: '',
  },
  {
    name: 'Blueberry Muffin',
    price: 3.0,
    maxQuantityPerDay: 30,
    quantityAvailable: 30,
    description: 'Moist muffin filled with fresh blueberries.',
    imageUrl: '',
  },
  {
    name: 'Banana Bread Slice',
    price: 2.0,
    maxQuantityPerDay: 40,
    quantityAvailable: 40,
    description: 'Deliciously moist banana bread with a hint of cinnamon.',
    imageUrl: '',
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