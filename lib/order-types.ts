export type OrderStatus =
  | "quote-received"
  | "design-review"
  | "awaiting-approval"
  | "in-production"
  | "quality-check"
  | "shipped"
  | "delivered";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  "quote-received": "Quote Received",
  "design-review": "Design Review",
  "awaiting-approval": "Awaiting Your Approval",
  "in-production": "In Production",
  "quality-check": "Quality Check",
  "shipped": "Shipped",
  "delivered": "Delivered",
};

export const ORDER_STATUSES: OrderStatus[] = [
  "quote-received",
  "design-review",
  "awaiting-approval",
  "in-production",
  "quality-check",
  "shipped",
  "delivered",
];

export interface OrderHistoryEntry {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string;
  productName: string;
  category: string;
  quantity: number;
  decorationMethod: string;
  designNotes: string;
  status: OrderStatus;
  statusHistory: OrderHistoryEntry[];
  trackingNumber?: string;
}
