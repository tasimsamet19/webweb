"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Plus, Minus, X, Loader2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./MerchCartProvider";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function MerchCartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-4 h-4 text-white/80" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#E84520] text-white text-[10px] font-bold flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}

export function MerchCart() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice, clearCart } =
    useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const storeSlug = items[0].storeSlug;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, storeSlug }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Checkout failed. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(v) => !v && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#0E0E0E] border-white/8 flex flex-col p-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-white/60" />
            <span className="font-bold text-white">
              Cart
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-normal text-white/40">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              )}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <ShoppingCart className="w-10 h-10 text-white/15" />
              <p className="text-white/35 text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}|${item.size}|${item.color}`}
                className="flex gap-3 p-3 rounded-xl bg-white/4 border border-white/6"
              >
                {/* Image */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#111111] flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    unoptimized={item.image.includes("placehold.co")}
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{item.productName}</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    {item.size} · {item.color}
                  </p>
                  <p className="text-xs text-white/30 mt-0.5">{item.storeName}</p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          item.quantity <= 1
                            ? removeItem(item.productId, item.size, item.color)
                            : updateQty(item.productId, item.size, item.color, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-md bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3 text-white/70" />
                      </button>
                      <span className="text-sm font-medium text-white w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(item.productId, item.size, item.color, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-md bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3 text-white/70" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="p-1 rounded text-white/25 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/8 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">Subtotal</span>
              <span className="text-lg font-bold text-white">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-white/30">
              Shipping and taxes calculated at checkout.
            </p>
            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full h-12 bg-[#E84520] hover:bg-[#FF6040] text-white font-bold text-sm shadow-lg shadow-[#E84520]/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…
                </>
              ) : (
                `Checkout · ${formatPrice(totalPrice)}`
              )}
            </Button>
            <button
              onClick={clearCart}
              className="w-full text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
