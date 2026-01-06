import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  goodsType: { type: String, required: true },
  weight: { type: Number, required: true }, // kg
  quantity: { type: Number, required: true },
  shipmentMode: {
    type: String,
    enum: ["Air", "Sea", "Land", "Express"],
    required: true,
  },
  expectedDeliveryDate: { type: Date, required: true },
  departureTime: { type: String }, // e.g., "14:30"
  pickupDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  shipperInfo: { type: String, required: true },
  origin: { type: String, required: true },
  packageDetails: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Ready for Pickup", "Delivered"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});
delete mongoose.models.Order;
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
