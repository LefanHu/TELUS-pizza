import mongoose from "mongoose";

const PlacedOrderSchema = new mongoose.Schema(
  {
    customerName: String,
    phoneNumber: Number,
    address: String,
    delivery: Boolean,
    scheduledTime: String,
    mushrooms: Boolean,
    pineapples: Boolean,
    olives: Boolean,
    pepperoni: Boolean,
  },
  {
    collection: "placedOrders",
  }
);

export default mongoose.model("PlacedOrder", PlacedOrderSchema);
