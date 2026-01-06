"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Package, MapPin, User, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";

interface Order {
  _id: string;
  trackingId: string;
  customerName: string;
  address: string;
  goodsType: string;
  status: "Pending" | "Shipped" | "Delivered" | "Ready for Pickup";
  createdAt: string;
}

export default function OrderHistoryTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast.success("Status updated");
      fetchOrders();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      toast.success("Order deleted");
      fetchOrders();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2e9bff]"></div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-foreground">Order History</h2>
        <Badge
          variant="outline"
          className="w-fit border-[#2e9bff] text-[#2e9bff]"
        >
          {orders.length} Total Orders
        </Badge>
      </div>

      {/* --- MOBILE VIEW (Cards) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-[#2e9bff] uppercase tracking-wider">
                  ID: {order.trackingId}
                </p>
                <h3 className="font-semibold text-lg flex items-center gap-2 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />{" "}
                  {order.customerName}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => deleteOrder(order.trackingId)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" /> {order.goodsType}
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span className="line-clamp-1">{order.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs font-medium">Update Status:</span>
              <Select
                value={order.status}
                onValueChange={(value) => updateStatus(order.trackingId, value)}
              >
                <SelectTrigger className="w-32 h-9 border-[#2e9bff]/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Ready for Pickup">
                    Ready for Pickup
                  </SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW (Traditional Table) --- */}
      <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Tracking ID</TableHead>
              <TableHead className="font-bold">Customer</TableHead>
              <TableHead className="font-bold">Goods</TableHead>
              <TableHead className="font-bold">Address</TableHead>
              <TableHead className="font-bold text-center">Status</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-bold text-[#2e9bff]">
                  {order.trackingId}
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.goodsType}</TableCell>
                <TableCell className="max-w-50 truncate">
                  {order.address}
                </TableCell>
                <TableCell className="flex justify-center">
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      updateStatus(order.trackingId, value)
                    }
                  >
                    <SelectTrigger className="w-32 h-9 border-[#2e9bff]/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Ready for Pickup">
                        Ready for Pickup
                      </SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => deleteOrder(order.trackingId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-xl mt-4 border-2 border-dashed">
          <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            No orders found in the system.
          </p>
        </div>
      )}
    </div>
  );
}
