import mongoose, {Schema, model, models, InferSchemaType} from "mongoose";
import { Types } from "mongoose";

const ProductSchema = new Schema({
    name : {type: String, required: true},
    price : {type: Number, required: true},
    maxQuantityPerDay: {type: Number, required: true},
    description: {type: String, required: true},
    imageURL: {type: String}
})

const Product = models.Product || model("Product", ProductSchema)

export default Product

export type ProductType = {
    _id: Types.ObjectId
    name : string
    price : number
    maxQuantityPerDay: number
    description: string
    imageURL?: string | undefined | null
}

