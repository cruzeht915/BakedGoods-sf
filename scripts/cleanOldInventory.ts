import { connectToDB } from "@/lib/mongodb";
import Inventory from "@/models/Inventory";

const run = async () => {
    await connectToDB()

    const today = new Date().toISOString().split('T')[0]

    const result = await Inventory.deleteMany({
        date: {$lt: today}, // delete entries older than today
    })

    console.log(`Deleted ${result.deletedCount} old inventory entries`)
    process.exit()
}

run().catch((err) => {
    console.error('Cleanup error:', err)
    process.exit(1)
})
