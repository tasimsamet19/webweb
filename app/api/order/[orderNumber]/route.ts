import { NextResponse } from "next/server";
import { getOrderByNumber, updateOrderStatus, ORDER_STATUSES } from "@/lib/orders";
import type { OrderStatus } from "@/lib/orders";

export async function GET(
  _req: Request,
  context: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await context.params;
  const order = await getOrderByNumber(orderNumber.toUpperCase());
  if (!order) {
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, order });
}

// PATCH /api/order/[orderNumber] — admin status update
// Protected by ADMIN_SECRET env var
export async function PATCH(
  req: Request,
  context: { params: Promise<{ orderNumber: string }> }
) {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { orderNumber } = await context.params;
  const body = await req.json() as { status?: string; note?: string; trackingNumber?: string };

  if (!body.status || !ORDER_STATUSES.includes(body.status as OrderStatus)) {
    return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
  }

  const updated = await updateOrderStatus(
    orderNumber.toUpperCase(),
    body.status as OrderStatus,
    body.note,
    body.trackingNumber
  );

  if (!updated) {
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, order: updated });
}
