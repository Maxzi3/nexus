"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Search,
  Package,
  MapPin,
  User,
  Box,
  AlertCircle,
  CheckCircle2,
  Scale,
  Hash,
  Truck,
  Calendar,
  Clock,
  Ship,
  Globe,
  Info,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const TrackingInput = ({
  placeholder = "Enter Tracking ID",
  className = "",
}: {
  placeholder?: string;
  className?: string;
}) => {
  const [trackingId, setTrackingId] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${trackingId}`);
      const data = await res.json();
      if (res.ok) setOrder(data);
      else setError(data.message || "Order not found");
    } catch {
      setError("Failed to fetch order");
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <>
      <div className={`flex flex-col gap-4 ${className}`}>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder={placeholder}
            className="border px-4 py-2 rounded-full outline-none w-full focus:ring-2 focus:ring-primary transition-all bg-background"
          />
          <Button
            onClick={handleTrack}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 rounded-full px-8"
          >
            {loading ? (
              "Searching..."
            ) : (
              <>
                <Search className="h-4 w-4" /> Track
              </>
            )}
          </Button>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="p-0 border-none shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <div
            className={`p-6 text-white ${
              error ? "bg-destructive" : "bg-primary"
            }`}
          >
            <div className="flex items-center gap-3">
              {error ? (
                <AlertCircle className="h-8 w-8" />
              ) : (
                <Package className="h-8 w-8" />
              )}
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl text-white">
                  {error ? "Oops!" : "Package Found"}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white/80">
                  {error ? "We couldn't locate that ID" : `ID: ${trackingId}`}
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {error ? (
              <div className="py-4 text-center text-muted-foreground">
                {error}. Please check the tracking number and try again.
              </div>
            ) : order ? (
              <div className="space-y-6 ">
                <div className="flex justify-between items-center bg-muted/50 p-4 rounded-xl border border-border">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-semibold">
                      Current Status
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {order.status}
                    </p>
                  </div>
                  <CheckCircle2
                    className={`h-10 w-10 ${
                      ["Delivered", "Ready for Pickup"].includes(order.status)
                        ? "text-green-500"
                        : "text-primary"
                    }`}
                  />
                </div>

                <div className="grid gap-4">
                  <div className="flex gap-3 items-start">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Recipient</p>
                      <p className="font-medium">{order.customerName}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Destination
                      </p>
                      <p className="font-medium">{order.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Box className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Goods Type
                      </p>
                      <p className="font-medium">{order.goodsType}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Scale className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Weight (kg)
                      </p>
                      <p className="font-medium">{order.weight}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Hash className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="font-medium">{order.quantity}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Shipment Mode
                      </p>
                      <p className="font-medium">{order.shipmentMode}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Expected Delivery
                      </p>
                      <p className="font-medium">
                        {order.expectedDeliveryDate
                          ? new Date(
                              order.expectedDeliveryDate
                            ).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Departure Time
                      </p>
                      <p className="font-medium">
                        {order.departureTime || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Pickup Date
                      </p>
                      <p className="font-medium">
                        {order.pickupDate
                          ? new Date(order.pickupDate).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Pickup Time
                      </p>
                      <p className="font-medium">{order.pickupTime}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Ship className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Shipper Info
                      </p>
                      <p className="font-medium whitespace-pre-line">
                        {order.shipperInfo.replace(/ \*/g, "\n")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Origin</p>
                      <p className="font-medium">{order.origin}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Package Details
                      </p>
                      <p className="font-medium">
                        {order.packageDetails || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <AlertDialogFooter className="p-4 bg-muted/30 border-t">
            <AlertDialogAction className="bg-primary hover:bg-primary/90 w-full sm:w-auto px-10 rounded-full">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TrackingInput;
