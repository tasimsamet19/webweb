"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

// ─── State & Actions ─────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; productId: string; size: string; color: string }
  | { type: "UPDATE_QTY"; productId: string; size: string; color: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };

    case "ADD": {
      const key = (i: CartItem) => `${i.productId}|${i.size}|${i.color}`;
      const existing = state.items.findIndex((i) => key(i) === key(action.item));
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + action.item.quantity,
        };
        return { ...state, items: updated, isOpen: true };
      }
      return { ...state, items: [...state.items, action.item], isOpen: true };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(i.productId === action.productId &&
              i.size === action.size &&
              i.color === action.color)
        ),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId &&
          i.size === action.size &&
          i.color === action.color
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "SET_OPEN":
      return { ...state, isOpen: action.open };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "merch_cart";

export function MerchCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) dispatch({ type: "HYDRATE", items: parsed });
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD", item }), []);
  const removeItem = useCallback(
    (productId: string, size: string, color: string) =>
      dispatch({ type: "REMOVE", productId, size, color }),
    []
  );
  const updateQty = useCallback(
    (productId: string, size: string, color: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", productId, size, color, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => dispatch({ type: "SET_OPEN", open: true }), []);
  const closeCart = useCallback(() => dispatch({ type: "SET_OPEN", open: false }), []);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside MerchCartProvider");
  return ctx;
}
