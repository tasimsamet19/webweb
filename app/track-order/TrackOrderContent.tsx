"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, CheckCircle2, Clock, Package, Truck, Star, AlertCircle, ArrowLeft } from "lucide-react";
import { ORDER_STATUS_LABELS, ORDER_STATUSES } from "@/lib/order-types";
import type { Order, OrderStatus } from "@/lib/order-types";
import { cn } from "@/lib/utils";

const STATUS_ICONS: Record<OrderStatus, typeof Clock> = {
  "quote-received": CheckCircle2,
  "design-review": Search,
  "awaiting-approval": AlertCircle,
  "in-production": Package,
  "quality-check": Star,
  "shipped": Truck,
  "delivered": CheckCircle2,
};

export function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState(searchParams.get("order") ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-lookup if order param is in URL
  useEffect(() => {
    const param = searchParams.get("order");
    if (param) {
      lookup(param);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function lookup(orderNum?: string) {
    const num = (orderNum ?? input).trim().toUpperCase();
    if (!num) return;
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/order/${encodeURIComponent(num)}`);
      const data = await res.json() as { success: boolean; order?: Order; error?: string };
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setError("Order not found. Please check the number and try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = order ? ORDER_STATUSES.indexOf(order.status) : -1;

  return (
    <main className="min-h-screen bg-[#080808] pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>
          <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#E84520] mb-3">Order Tracking</div>
          <h1 className="text-4xl font-bold text-white">Track Your Order</h1>
          <p className="text-white/40 mt-2 text-sm">Enter your order number to see the current status.</p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && lookup()}
              placeholder="PW-20261003-0001"
              className="w-full bg-[#111111] border border-white/10 focus:border-[#E84520]/50 rounded-xl px-5 py-4 text-white placeholder:text-white/20 text-base font-mono outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => lookup()}
            disabled={loading || !input.trim()}
            className="px-6 py-4 bg-[#E84520] hover:bg-[#FF6040] disabled:opacity-40 text-white font-bold rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-8">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Order result */}
        {order && (
          <div className="flex flex-col gap-6">

            {/* Order header */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Order Number</div>
                  <div className="text-2xl font-bold font-mono text-white">{order.orderNumber}</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E84520]/15 border border-[#E84520]/25">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E84520] animate-pulse" />
                  <span className="text-xs font-semibold text-[#E84520]">{ORDER_STATUS_LABELS[order.status]}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-white/30 mb-1">Product</div>
                  <div className="text-white/80">{order.productName}</div>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-1">Quantity</div>
                  <div className="text-white/80">{order.quantity} pieces</div>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-1">Ordered</div>
                  <div className="text-white/80">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                </div>
                {order.trackingNumber && (
                  <div>
                    <div className="text-xs text-white/30 mb-1">Tracking #</div>
                    <div className="text-[#E84520] font-mono text-sm">{order.trackingNumber}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Status timeline */}
            <div className="bg-[#111111] rounded-2xl border border-white/8 p-6">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-6">Order Progress</div>
              <div className="flex flex-col gap-0">
                {ORDER_STATUSES.map((status, i) => {
                  const isDone = i <= currentStep;
                  const isCurrent = i === currentStep;
                  const Icon = STATUS_ICONS[status];
                  const historyEntry = order.statusHistory.find((h) => h.status === status);

                  return (
                    <div key={status} className="flex gap-4">
                      {/* Connector line + icon */}
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors",
                          isCurrent
                            ? "bg-[#E84520] border-[#E84520] shadow-lg shadow-[#E84520]/30"
                            : isDone
                              ? "bg-[#E84520]/20 border-[#E84520]/40"
                              : "bg-white/4 border-white/10"
                        )}>
                          <Icon className={cn("w-4 h-4", isDone ? "text-[#E84520]" : "text-white/20", isCurrent && "text-white")} />
                        </div>
                        {i < ORDER_STATUSES.length - 1 && (
                          <div className={cn("w-px flex-1 my-1", isDone && i < currentStep ? "bg-[#E84520]/30" : "bg-white/6")} style={{ minHeight: 20 }} />
                        )}
                      </div>

                      {/* Text */}
                      <div className={cn("pb-6", i === ORDER_STATUSES.length - 1 && "pb-0")}>
                        <div className={cn("text-sm font-semibold leading-tight", isCurrent ? "text-white" : isDone ? "text-white/70" : "text-white/25")}>
                          {ORDER_STATUS_LABELS[status]}
                          {isCurrent && <span className="ml-2 text-xs font-normal text-[#E84520]">← Current</span>}
                        </div>
                        {historyEntry && (
                          <div className="text-xs text-white/30 mt-0.5">
                            {new Date(historyEntry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                            {historyEntry.note && <span className="ml-2 text-white/40">{historyEntry.note}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Help */}
            <div className="text-center py-2">
              <p className="text-sm text-white/30">Questions about your order?</p>
              <a href="tel:+19735804455" className="text-[#E84520] font-semibold hover:underline text-sm">(973) 580-4455</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
