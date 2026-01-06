import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  goodsType: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Ready for Pickup", "Delivered"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

delete mongoose.models.Order;
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
