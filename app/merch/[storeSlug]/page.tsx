import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMerchStore } from "@/lib/data/merch";
import { MerchStoreClient } from "./MerchStoreClient";

interface Props {
  params: Promise<{ storeSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { storeSlug } = await params;
  const store = getMerchStore(storeSlug);
  if (!store) return {};
  return {
    title: `${store.name} — Merch Store`,
    description: store.description,
  };
}

export default async function MerchStorePage({ params }: Props) {
  const { storeSlug } = await params;
  const store = getMerchStore(storeSlug);
  if (!store) notFound();

  return <MerchStoreClient store={store} />;
}
