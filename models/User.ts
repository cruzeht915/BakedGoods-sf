import mongoose, {Schema, model, models} from "mongoose";

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String},
    name: {type: String},
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}],
    createdAt: {type: Date, default: Date.now}
})

const User = models.User || model("User", UserSchema)

export default User