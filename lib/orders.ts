import fs from "fs/promises";
import path from "path";
import type { Order, OrderStatus } from "@/lib/order-types";

export type { OrderStatus, Order, OrderHistoryEntry } from "@/lib/order-types";
export { ORDER_STATUS_LABELS, ORDER_STATUSES } from "@/lib/order-types";

// File storage — works locally; on Vercel use /tmp (ephemeral across cold starts).
// For production, swap readOrders/writeOrders to use Vercel KV or Supabase.
const DATA_FILE = path.join(process.cwd(), "data", "orders.json");

export async function readOrders(): Promise<Order[]> {
  try {
    const content = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(content) as Order[];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export async function createOrder(
  data: Pick<Order, "customerName" | "customerEmail" | "customerPhone" | "company" | "productName" | "category" | "quantity" | "decorationMethod" | "designNotes">
): Promise<Order> {
  const orders = await readOrders();

  // PW-YYYYMMDD-XXXX
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const todayCount = orders.filter((o) => o.orderNumber.includes(`-${dateStr}-`)).length;
  const seq = String(todayCount + 1).padStart(4, "0");
  const orderNumber = `PW-${dateStr}-${seq}`;

  const order: Order = {
    ...data,
    orderNumber,
    createdAt: now.toISOString(),
    status: "quote-received",
    statusHistory: [{ status: "quote-received", timestamp: now.toISOString() }],
  };

  orders.push(order);
  await writeOrders(orders);
  return order;
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const orders = await readOrders();
  return orders.find((o) => o.orderNumber === orderNumber) ?? null;
}

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
  note?: string,
  trackingNumber?: string
): Promise<Order | null> {
  const orders = await readOrders();
  const order = orders.find((o) => o.orderNumber === orderNumber);
  if (!order) return null;

  order.status = status;
  order.statusHistory.push({ status, timestamp: new Date().toISOString(), note });
  if (trackingNumber) order.trackingNumber = trackingNumber;

  await writeOrders(orders);
  return order;
}
