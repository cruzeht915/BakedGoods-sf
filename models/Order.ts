import mongoose, {Schema, model, models} from "mongoose";

const OrderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", require: true},
    items: [
        {
            product: {type: Schema.Types.ObjectId, ref: "Product"},
            quantity: {type: Number}
        }
    ],
    total: {type: Number, require: true},
    pickupDate: {type: Date, require: true},
    createdAt: {type: Date, default: Date.now},
    stripeSessionId: { type: String },
    status: { type: String, default: 'pending' }

})


const Order = models.Order || model('Order', OrderSchema)

export default Order