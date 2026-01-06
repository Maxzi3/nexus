"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CreateOrderForm() {
  const [trackingId, setTrackingId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [goodsType, setGoodsType] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipmentMode, setShipmentMode] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [shipperInfo, setShipperInfo] = useState("");
  const [origin, setOrigin] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [createdTrackingId, setCreatedTrackingId] = useState("");

  useEffect(() => {
    const prefix = "TRK";
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    setTrackingId(`${prefix}${random}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingId,
          customerName,
          address,
          goodsType,
          weight,
          quantity,
          shipmentMode,
          expectedDeliveryDate,
          departureTime,
          pickupDate,
          pickupTime,
          shipperInfo,
          origin,
          packageDetails,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedTrackingId(data.trackingId);
        setShowDialog(true);
        toast.success("Order created successfully");

        // Reset form
        setCustomerName("");
        setAddress("");
        setGoodsType("");
        setWeight("");
        setQuantity("");
        setShipmentMode("");
        setExpectedDeliveryDate("");
        setDepartureTime("");
        setPickupDate("");
        setPickupTime("");
        setShipperInfo("");
        setOrigin("");
        setPackageDetails("");

        // New tracking ID
        const prefix = "TRK";
        const random = Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase();
        setTrackingId(`${prefix}${random}`);
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to create order");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background py-8">
        <Card className="w-full max-w-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            Create New Order
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="trackingId">Tracking ID (auto-generated)</Label>
                <Input
                  id="trackingId"
                  value={trackingId}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="goodsType">Type of Goods</Label>
                <Input
                  id="goodsType"
                  value={goodsType}
                  onChange={(e) => setGoodsType(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.01"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="shipmentMode">Shipment Mode</Label>
                <Select
                  value={shipmentMode}
                  onValueChange={setShipmentMode}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Air">Air</SelectItem>
                    <SelectItem value="Sea">Sea</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Express">Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="expectedDeliveryDate">
                  Expected Delivery Date
                </Label>
                <Input
                  id="expectedDeliveryDate"
                  type="date"
                  value={expectedDeliveryDate}
                  onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input
                  id="departureTime"
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="pickupTime">Pickup Time</Label>
                <Input
                  id="pickupTime"
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="shipperInfo">Shipper Information</Label>
                <Input
                  id="shipperInfo"
                  value={shipperInfo}
                  onChange={(e) => setShipperInfo(e.target.value)}
                  placeholder="Name, phone, etc."
                  required
                />
              </div>

              <div>
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="package">Package Details</Label>
                <Input
                  id="package"
                  value={packageDetails}
                  onChange={(e) => setPackageDetails(e.target.value)}
                  placeholder="Dimensions, description, etc."
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? "Creating..." : "Create Order"}
            </Button>
          </form>
        </Card>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order Created Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Tracking ID:{" "}
              <span className="font-bold text-lg">{createdTrackingId}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
