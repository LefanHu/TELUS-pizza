import mongoose from "mongoose";

const PlacedOrderSchema = new mongoose.Schema(
  {
    customer: String,
    customer_id: mongoose.Schema.Types.ObjectId,
    contact: Number,
    address: String,
    delivery: Boolean,
    scheduledTime: String,
    toppings: [String],
  },
  {
    collection: "placedOrders",
  }
);

export default mongoose.model("PlacedOrder", PlacedOrderSchema);
