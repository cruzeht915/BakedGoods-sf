import mongoose, {Schema, model, models} from "mongoose";

const ProductSchema = new Schema({
    name : {type: String, require: true},
    price : {type: Number, require: true},
    maxQuantityPerDay: {type: Number, require: true},
    quantityAvailable: {type: Number, require: true},
    description: {type: String},
    imageURL: {type: String}
})

const Product = models.Product || model("Product", ProductSchema)

export default Product