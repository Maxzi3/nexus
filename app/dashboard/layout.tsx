"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Create Order", href: "/dashboard/create-order" },
  { label: "Track Order", href: "/dashboard/track-item" },
  { label: "Orders", href: "/dashboard/orders" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      toast.success("Logged out successfully");

      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong while logging out");
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-white">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 border-r border-white/10 p-6 flex-col gap-6">
        <h2 className="text-2xl font-bold">Admin</h2>

        {links.map((link) => (
          <button
            key={link.href}
            onClick={() => router.push(link.href)}
            className={`text-left px-3 py-2 rounded-lg transition ${
              pathname === link.href
                ? "bg-primary text-white"
                : "hover:bg-white/5"
            }`}
          >
            {link.label}
          </button>
        ))}

        <button
          onClick={logout}
          className="mt-auto text-left px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
          <button onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="font-bold">Admin</h2>
        </header>

        {/* Mobile menu */}
        {open && (
          <div className="fixed inset-0 bg-black/50 z-50">
            <div className="w-64 h-full bg-background p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Admin</h2>
                <button onClick={() => setOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    router.push(link.href);
                    setOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={logout}
                className="mt-auto text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
