"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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
        body: JSON.stringify({ trackingId, customerName, address, goodsType }),
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
        // Generate new tracking ID
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
      <div className="min-h-auto flex items-center justify-center bg-background">
        <Card className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            Create New Order
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City"
                required
              />
            </div>

            <div>
              <Label htmlFor="goodsType">Type of Goods</Label>
              <Input
                id="goodsType"
                value={goodsType}
                onChange={(e) => setGoodsType(e.target.value)}
                placeholder="e.g. Electronics, Clothing"
                required
              />
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
