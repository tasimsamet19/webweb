"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  company: z.string().optional(),
  category: z.string().min(1, "Required"),
  decorationMethod: z.string().min(1, "Required"),
  quantity: z.coerce.number().min(12, "Minimum order is 12 pieces"),
  numberOfColors: z.coerce.number().min(1).max(20),
  preferredBrand: z.string().optional(),
  sizesBreakdown: z.string().optional(),
  neededByDate: z.string().optional(),
  hasArtwork: z.enum(["yes", "no", "needs-design"]),
  pantoneColors: z.string().optional(),
  designNotes: z.string().min(10, "Please describe your design (min. 10 chars)"),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface QuoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  productId?: string;
  category?: string;
  defaultQuantity?: number;
  defaultColors?: number;
  selectedLocations?: string[];
  prefilledSizeBreakdown?: string;
}

export function QuoteForm({
  open,
  onOpenChange,
  productName,
  productId,
  category,
  defaultQuantity,
  defaultColors,
  selectedLocations,
  prefilledSizeBreakdown,
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      category: category ?? "",
      hasArtwork: "yes",
      quantity: defaultQuantity ?? 12,
      numberOfColors: defaultColors ?? 1,
    },
  });

  // Sync configurator values into the form each time the dialog opens
  useEffect(() => {
    if (open) {
      if (defaultQuantity != null) setValue("quantity", defaultQuantity);
      if (defaultColors != null) setValue("numberOfColors", defaultColors);
      if (prefilledSizeBreakdown) setValue("sizesBreakdown", prefilledSizeBreakdown);
    }
  }, [open, defaultQuantity, defaultColors, prefilledSizeBreakdown, setValue]);

  // eslint-disable-next-line react-hooks/incompatible-library -- React Hook Form watch() is intentional; memoization risk is acceptable here
  const hasArtwork = watch("hasArtwork");

  async function onSubmit(data: FormValues) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, String(v));
      });
      if (productName) formData.append("productName", productName);
      if (productId) formData.append("productId", productId);
      if (selectedLocations?.length) formData.append("selectedLocations", selectedLocations.join(", "));
      if (artworkFile) formData.append("artworkFile", artworkFile);

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Submission failed");

      const json = await res.json() as { success: boolean; orderNumber?: string };
      setOrderNumber(json.orderNumber ?? null);
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    }
  }

  function handleClose(open: boolean) {
    if (!open) {
      reset();
      setSubmitted(false);
      setOrderNumber(null);
      setArtworkFile(null);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#111111] border border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#E84520]/15 border border-[#E84520]/30 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#E84520]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Order Received!</h3>
              <p className="text-white/45 mt-2 text-sm leading-relaxed max-w-xs">
                We&apos;ll review your order and reach out within 24 hours.
              </p>
            </div>
            {orderNumber && (
              <div className="w-full bg-[#0D0D0D] border border-white/8 rounded-xl p-5">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Your Order Number</p>
                <p className="text-2xl font-bold font-mono text-white tracking-wider">{orderNumber}</p>
                <p className="text-xs text-white/30 mt-2">Save this number to track your order</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {orderNumber && (
                <a
                  href={`/track-order?order=${orderNumber}`}
                  onClick={() => handleClose(false)}
                  className="flex-1 inline-flex items-center justify-center py-2.5 px-5 rounded-lg border border-[#E84520]/40 text-[#E84520] text-sm font-semibold hover:bg-[#E84520]/10 transition-colors"
                >
                  Track Order
                </a>
              )}
              <Button
                onClick={() => handleClose(false)}
                className="flex-1 bg-[#E84520] hover:bg-[#FF6040] text-white"
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Contact Us
              </DialogTitle>
              <DialogDescription className="text-white/40 text-sm space-y-1">
                <span className="block text-white/55">
                  Prefer to talk now?{" "}
                  <a
                    href="tel:+19735804455"
                    className="text-[#E84520] font-semibold hover:underline"
                  >
                    (973) 580-4455
                  </a>
                </span>
              </DialogDescription>
            </DialogHeader>

            {/* ── Order summary ─────────────────────────────────────────────── */}
            {(productName || prefilledSizeBreakdown) && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                {productName && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/35">Product</span>
                    <span className="text-sm font-semibold text-white">{productName}</span>
                  </div>
                )}
                {prefilledSizeBreakdown && (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/35 block mb-2">Sizes</span>
                    <div className="flex flex-wrap gap-2">
                      {prefilledSizeBreakdown.split(",").map((item) => {
                        const [qty, size] = item.trim().split(" ");
                        return (
                          <div key={item} className="flex items-center gap-1.5 bg-white/8 border border-white/12 rounded-lg px-2.5 py-1.5">
                            <span className="text-xs font-bold text-white">{size}</span>
                            <span className="text-xs text-white/40">×</span>
                            <span className="text-xs font-bold text-[#E84520]">{qty}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedLocations && selectedLocations.length > 0 && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/35 shrink-0">Locations</span>
                    <span className="text-xs text-white/60 text-right">{selectedLocations.join(", ")}</span>
                  </div>
                )}
                {defaultQuantity != null && defaultQuantity > 0 && (
                  <div className="border-t border-white/8 pt-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/35">Total</span>
                    <span className="text-base font-bold text-white">{defaultQuantity} pcs</span>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-2">
              {/* Contact */}
              <fieldset>
                <legend className="text-xs font-bold tracking-[0.2em] uppercase text-[#E84520] mb-4">
                  Contact Information
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      First Name *
                    </Label>
                    <Input
                      {...register("firstName")}
                      placeholder="John"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                    {errors.firstName && (
                      <p className="text-[#E84520] text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Last Name *
                    </Label>
                    <Input
                      {...register("lastName")}
                      placeholder="Smith"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                    {errors.lastName && (
                      <p className="text-[#E84520] text-xs mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Email *
                    </Label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                    {errors.email && (
                      <p className="text-[#E84520] text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Phone *
                    </Label>
                    <Input
                      {...register("phone")}
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                    {errors.phone && (
                      <p className="text-[#E84520] text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Company / Organization
                    </Label>
                    <Input
                      {...register("company")}
                      placeholder="Optional"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Order Details */}
              <fieldset>
                <legend className="text-xs font-bold tracking-[0.2em] uppercase text-[#E84520] mb-4">
                  Order Details
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Product / Category *
                    </Label>
                    <Input
                      {...register("category")}
                      defaultValue={productName ?? category ?? ""}
                      placeholder="e.g. Tee Shirts, Basketball Jerseys..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                    {errors.category && (
                      <p className="text-[#E84520] text-xs mt-1">{errors.category.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Decoration Method *
                    </Label>
                    <Select onValueChange={(v) => { if (v) setValue("decorationMethod", v as "screen-printing" | "embroidery" | "sublimation" | "heat-transfer" | "dtg"); }}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#E84520]/50">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                        <SelectItem value="screen-printing">Screen Printing</SelectItem>
                        <SelectItem value="embroidery">Embroidery</SelectItem>
                        <SelectItem value="sublimation">Sublimation</SelectItem>
                        <SelectItem value="heat-transfer">Heat Transfer</SelectItem>
                        <SelectItem value="dtg">DTG Printing</SelectItem>
                        <SelectItem value="unsure">Not Sure — Help Me Choose</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.decorationMethod && (
                      <p className="text-[#E84520] text-xs mt-1">
                        {errors.decorationMethod.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Quantity *
                    </Label>
                    <Input
                      {...register("quantity")}
                      type="number"
                      min={12}
                      placeholder="12"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                    {errors.quantity && (
                      <p className="text-[#E84520] text-xs mt-1">{errors.quantity.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Number of Ink/Thread Colors *
                    </Label>
                    <Select
                      defaultValue="1"
                      onValueChange={(v) => { if (v) setValue("numberOfColors", Number(v)); }}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#E84520]/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                        <SelectItem value="1">1 color</SelectItem>
                        <SelectItem value="2">2 colors</SelectItem>
                        <SelectItem value="3">3 colors</SelectItem>
                        <SelectItem value="4">4 colors</SelectItem>
                        <SelectItem value="5">5 colors</SelectItem>
                        <SelectItem value="6">6+ colors</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-white/30 text-[11px] mt-1">How many different colors are in your logo/design?</p>
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Date Needed By
                    </Label>
                    <Input
                      {...register("neededByDate")}
                      type="date"
                      className="bg-white/5 border-white/10 text-white focus:border-[#E84520]/50"
                    />
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Preferred Brand
                    </Label>
                    <Select onValueChange={(v) => { if (v) setValue("preferredBrand", String(v)); }}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#E84520]/50">
                        <SelectValue placeholder="No preference" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                        <SelectItem value="no-preference">No preference</SelectItem>
                        <SelectItem value="Gildan">Gildan</SelectItem>
                        <SelectItem value="Bella+Canvas">Bella+Canvas</SelectItem>
                        <SelectItem value="Next Level">Next Level</SelectItem>
                        <SelectItem value="Port Authority">Port Authority</SelectItem>
                        <SelectItem value="Hanes">Hanes</SelectItem>
                        <SelectItem value="Champion">Champion</SelectItem>
                        <SelectItem value="Other">Other (specify in notes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Sizes Breakdown
                    </Label>
                    <Input
                      {...register("sizesBreakdown")}
                      placeholder="e.g. 10 S, 25 M, 30 L, 15 XL, 5 2XL"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Artwork */}
              <fieldset>
                <legend className="text-xs font-bold tracking-[0.2em] uppercase text-[#E84520] mb-4">
                  Artwork
                </legend>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white/60 text-xs mb-3 block">
                      Artwork Status *
                    </Label>
                    <RadioGroup
                      defaultValue="yes"
                      onValueChange={(v) =>
                        setValue("hasArtwork", v as "yes" | "no" | "needs-design")
                      }
                      className="flex flex-col gap-2"
                    >
                      {[
                        { value: "yes", label: "I have print-ready artwork (AI, EPS, PDF, PNG)" },
                        { value: "no", label: "I have a logo but need formatting help" },
                        { value: "needs-design", label: "I need design help from scratch" },
                      ].map((opt) => (
                        <div
                          key={opt.value}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                            hasArtwork === opt.value
                              ? "border-[#E84520]/50 bg-[#E84520]/8"
                              : "border-white/8 hover:border-white/15"
                          )}
                        >
                          <RadioGroupItem
                            value={opt.value}
                            id={opt.value}
                            className="border-white/30 text-[#E84520]"
                          />
                          <Label
                            htmlFor={opt.value}
                            className="text-sm text-white/70 cursor-pointer"
                          >
                            {opt.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {hasArtwork === "yes" && (
                    <div>
                      <Label className="text-white/60 text-xs mb-1.5 block">
                        Upload Artwork File
                      </Label>
                      <label className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-white/15 hover:border-[#E84520]/40 bg-white/3 cursor-pointer transition-colors group">
                        <Upload className="w-5 h-5 text-white/30 group-hover:text-[#E84520] transition-colors flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/50">
                            {artworkFile ? artworkFile.name : "Click to upload"}
                          </p>
                          <p className="text-xs text-white/25 mt-0.5">
                            AI, EPS, PDF, PNG, SVG — max 25MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg"
                          className="hidden"
                          onChange={(e) => setArtworkFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>
                  )}

                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Pantone / Brand Colors
                    </Label>
                    <Input
                      {...register("pantoneColors")}
                      placeholder="e.g. PMS 200 Red, PMS 286 Blue"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                  </div>

                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Design Description *
                    </Label>
                    <Textarea
                      {...register("designNotes")}
                      placeholder="Describe your design, logo placement, colors, text, special instructions..."
                      rows={4}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50 resize-none"
                    />
                    {errors.designNotes && (
                      <p className="text-[#E84520] text-xs mt-1">{errors.designNotes.message}</p>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* Additional */}
              <div>
                <Label className="text-white/60 text-xs mb-1.5 block">
                  Additional Notes
                </Label>
                <Textarea
                  {...register("additionalNotes")}
                  placeholder="Anything else we should know?"
                  rows={2}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E84520] hover:bg-[#FF6040] text-white font-bold h-12 text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Quote Request"
                )}
              </Button>
              <p className="text-xs text-white/25 text-center">
                We respond within 24 hours — usually much faster.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
