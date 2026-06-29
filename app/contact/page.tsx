"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, MapPin, Phone, Mail, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/shared/PageHero";
import { QuoteForm } from "@/components/products/QuoteForm";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject required"),
  message: z.string().min(10, "Please write at least 10 characters"),
});
type FormValues = z.infer<typeof schema>;

function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      toast.error("Something went wrong. Please email us directly.");
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4 bg-[#111111] rounded-xl border border-white/6 p-8">
        <div className="w-14 h-14 rounded-full bg-[#E84520]/15 border border-[#E84520]/30 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#E84520]" />
        </div>
        <h3 className="text-xl font-bold text-white">Message Sent!</h3>
        <p className="text-white/45 text-sm max-w-xs">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#111111] rounded-xl border border-white/6 p-6 space-y-5"
    >
      <h2 className="text-xl font-bold text-white mb-1">Send Us a Message</h2>
      <p className="text-sm text-white/40 mb-2">We respond within one business day.</p>

      <div>
        <Label className="text-white/55 text-xs mb-1.5 block">Your Name *</Label>
        <Input
          {...register("name")}
          placeholder="John Smith"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
        />
        {errors.name && <p className="text-[#E84520] text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label className="text-white/55 text-xs mb-1.5 block">Email Address *</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="john@example.com"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
        />
        {errors.email && <p className="text-[#E84520] text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label className="text-white/55 text-xs mb-1.5 block">Subject *</Label>
        <Input
          {...register("subject")}
          placeholder="What can we help with?"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50"
        />
        {errors.subject && <p className="text-[#E84520] text-xs mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <Label className="text-white/55 text-xs mb-1.5 block">Message *</Label>
        <Textarea
          {...register("message")}
          placeholder="Tell us about your project, question, or anything else..."
          rows={5}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-[#E84520]/50 resize-none"
        />
        {errors.message && <p className="text-[#E84520] text-xs mt-1">{errors.message.message}</p>}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#E84520] hover:bg-[#FF6040] text-white font-bold h-11"
      >
        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : "Send Message"}
      </Button>
    </form>
  );
}

export default function ContactPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact"
        titleAccent="Us"
        description="Have a project in mind? Ready to order? We'd love to hear from you."
      />

      <section className="py-20 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left: Contact Info */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Let&apos;s Talk</h2>
                <p className="text-white/45 text-sm leading-relaxed">
                  Whether you have a question about an order, need a quote, or want to discuss a
                  large project — reach out and we&apos;ll respond within one business day.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Address */}
                <a
                  href="https://maps.google.com/?q=450+NJ-10+Unit+C+Ledgewood+NJ+07852"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#E84520]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/35 uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-sm text-white/75 group-hover:text-[#E84520] transition-colors">
                      450 NJ-10 Unit C<br />Ledgewood, NJ 07852
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#E84520] transition-colors flex-shrink-0 mt-1" />
                </a>

                {/* Phone */}
                <a
                  href="tel:+19735804455"
                  className="flex items-center gap-4 p-4 bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#E84520]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/35 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm text-white/75 group-hover:text-[#E84520] transition-colors">(973) 580-4455</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:printwearledgewood@gmail.com"
                  className="flex items-center gap-4 p-4 bg-[#111111] rounded-xl border border-white/6 hover:border-[#E84520]/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#E84520]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/35 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm text-white/75 group-hover:text-[#E84520] transition-colors">printwearledgewood@gmail.com</p>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 bg-[#111111] rounded-xl border border-white/6">
                  <div className="w-10 h-10 rounded-lg bg-[#E84520]/10 border border-[#E84520]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#E84520]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/35 uppercase tracking-wider mb-1">Business Hours</p>
                    <p className="text-sm text-white/75">Mon – Fri: 9:00 AM – 7:00 PM</p>
                    <p className="text-sm text-white/40">Saturday – Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setQuoteOpen(true)}
                className="bg-[#E84520] hover:bg-[#FF6040] text-white font-bold h-12"
              >
                Request a Quote Instead
              </Button>
            </div>

            {/* Right: Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-[#080808] pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden border border-white/8 h-80 relative">
            <iframe
              src="https://maps.google.com/maps?q=450+NJ-10+Unit+C,+Ledgewood,+NJ+07852&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Printwear Ledgewood Location"
            />
            {/* Overlay link */}
            <a
              href="https://maps.google.com/?q=450+NJ-10+Unit+C+Ledgewood+NJ+07852"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#E84520] text-white text-xs font-semibold rounded-lg hover:bg-[#FF6040] transition-colors shadow-lg"
            >
              <ExternalLink className="w-3 h-3" /> Open in Google Maps
            </a>
          </div>
          <p className="text-center text-xs text-white/25 mt-3">
            450 NJ-10 Unit C, Ledgewood, NJ 07852 — Free parking available
          </p>
        </div>
      </section>

      <QuoteForm open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
}
