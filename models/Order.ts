import mongoose, {Schema, model, models} from "mongoose";

const OrderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: false},
    items: [
        {
            product: {type: Schema.Types.ObjectId, ref: "Product"},
            quantity: {type: Number}
        }
    ],
    total: {type: Number, required: true},
    pickupDate: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now},
    stripeSessionId: { type: String },
    status: { type: String, default: 'pending' }

})


const Order = models.Order || model('Order', OrderSchema)

export default Order