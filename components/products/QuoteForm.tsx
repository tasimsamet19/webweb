"use client";

import { useState } from "react";
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
  quantity: z.coerce.number().min(1, "Minimum 1"),
  numberOfColors: z.coerce.number().min(1).max(20),
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
}

export function QuoteForm({
  open,
  onOpenChange,
  productName,
  productId,
  category,
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
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
      quantity: 12,
      numberOfColors: 1,
    },
  });

  const hasArtwork = watch("hasArtwork");

  async function onSubmit(data: FormValues) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, String(v));
      });
      if (productName) formData.append("productName", productName);
      if (productId) formData.append("productId", productId);
      if (artworkFile) formData.append("artworkFile", artworkFile);

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
    } catch (_err) {
      toast.error("Something went wrong. Please try again or call us directly.");
    }
  }

  function handleClose(open: boolean) {
    if (!open) {
      reset();
      setSubmitted(false);
      setArtworkFile(null);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#111111] border border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#E84520]/15 border border-[#E84520]/30 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#E84520]" />
            </div>
            <h3 className="text-xl font-bold text-white">Quote Request Sent!</h3>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed">
              Thank you! We&apos;ll review your request and get back to you within
              24 hours at the email you provided.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="mt-2 bg-[#E84520] hover:bg-[#FF6040] text-white"
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Contact Us
              </DialogTitle>
              <DialogDescription className="text-white/40 text-sm space-y-1">
                <span className="block">
                  {productName
                    ? `Ürün: ${productName} — Formu doldurun, 24 saat içinde döneceğiz.`
                    : "Projenizi anlatın, 24 saat içinde size dönelim."}
                </span>
                <span className="block text-white/55">
                  Hemen konuşmak ister misiniz?{" "}
                  <a
                    href="tel:+19735804455"
                    className="text-[#E84520] font-semibold hover:underline"
                  >
                    (973) 580-4455
                  </a>
                </span>
              </DialogDescription>
            </DialogHeader>

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
                      min={1}
                      placeholder="12"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
                    {errors.quantity && (
                      <p className="text-[#E84520] text-xs mt-1">{errors.quantity.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">
                      Number of Colors *
                    </Label>
                    <Input
                      {...register("numberOfColors")}
                      type="number"
                      min={1}
                      max={20}
                      placeholder="1"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
                    />
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
