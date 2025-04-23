import mongoose, {Schema, model, models} from "mongoose";
import { ProductType } from "./Product";

const InventorySchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    date: {type: String, required: true}, // e.g., '2025-05-14'
    quantityAvailable: {type: Number, required: true},
    maxQuantity: {type: Number, required: true}
})

InventorySchema.index({product: 1, date: 1}, {unique: true})

const Inventory = models.Inventory || model("Inventory", InventorySchema)

export default Inventory

export type PopulatedInventoryItem = {
    product: ProductType
    date: string
    quantityAvailable: number
    maxQuantity: number
  }