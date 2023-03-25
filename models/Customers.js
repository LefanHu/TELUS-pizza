import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  customerName: String,
  phoneNumber: Number,
  placedOrders: [mongoose.Schema.Types.ObjectId],
});

export default mongoose.model("Customer", CustomerSchema);
