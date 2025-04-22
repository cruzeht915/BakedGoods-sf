import mongoose, {Schema, model, models, InferSchemaType} from "mongoose";

const ProductSchema = new Schema({
    name : {type: String, required: true},
    price : {type: Number, required: true},
    maxQuantityPerDay: {type: Number, required: true},
    description: {type: String},
    imageURL: {type: String}
})

const Product = models.Product || model("Product", ProductSchema)

export default Product

export type ProductType = InferSchemaType<typeof ProductSchema>