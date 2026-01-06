/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Stats {
  total: number;
  pending: number;
  delivered: number;
}

export default function DashboardHome() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    delivered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/orders");
        const orders = await res.json();
        const total = orders.length;
        const pending = orders.filter(
          (o: any) => o.status === "Pending"
        ).length;
        const delivered = orders.filter(
          (o: any) => o.status === "Delivered"
        ).length;
        setStats({ total, pending, delivered });
      } catch {
        // Silent fallback
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Quick overview of your logistics system
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-sm text-muted-foreground">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">
            {loading ? "-" : stats.total}
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm text-muted-foreground">Pending Orders</h2>
          <p className="text-3xl font-bold mt-2 text-yellow-500">
            {loading ? "-" : stats.pending}
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm text-muted-foreground">Delivered</h2>
          <p className="text-3xl font-bold mt-2 text-green-500">
            {loading ? "-" : stats.delivered}
          </p>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => router.push("/dashboard/create-order")}>
          Create Order
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/orders")}
        >
          View Orders
        </Button>
      </div>
    </div>
  );
}
