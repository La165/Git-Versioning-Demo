




const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    image: String,
    des: String
});

const orderSchema = new mongoose.Schema({
    items: [
        {
            id: Number,
            name: String,
            price: Number,
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});
module.exports = { productSchema, orderSchema ,userSchema};


