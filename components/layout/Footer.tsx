import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Camera, Users } from "lucide-react";

const productLinks = [
  { href: "/products/custom-t-shirts", label: "Custom T-Shirts" },
  { href: "/products/hoodies-sweatshirts", label: "Hoodies & Sweatshirts" },
  { href: "/products/custom-hats-headwear", label: "Hats & Headwear" },
  { href: "/products/polos-business-apparel", label: "Polos & Business Apparel" },
  { href: "/products/jackets-outerwear", label: "Jackets & Outerwear" },
  { href: "/products/workwear-safety-apparel", label: "Workwear & Safety Apparel" },
  { href: "/products/sports-team-uniforms", label: "Sports Team Uniforms" },
  { href: "/products/varsity-jackets-tackle-twill", label: "Varsity Jackets" },
  { href: "/products/bags-mugs-promo-products", label: "Bags, Mugs & Promo" },
  { href: "/products/custom-sublimated-uniforms", label: "Sublimated Uniforms" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/contact#quote", label: "Get a Quote" },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Printwear Ledgewood"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block text-sm font-bold tracking-widest text-[#E84520] uppercase">
                  Printwear
                </span>
                <span className="block text-xs tracking-widest text-white/50 uppercase">
                  Ledgewood
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Custom embroidery, screen printing, and sublimation for businesses,
              teams, schools, and organizations across the USA.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/printwearledgewood"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#E84520] hover:border-[#E84520]/40 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/printwearledgewood"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#E84520] hover:border-[#E84520]/40 transition-colors"
              >
                <Users className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#E84520] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#E84520] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E84520] flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.google.com/?q=450+NJ-10+Unit+C+Ledgewood+NJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-[#E84520] transition-colors"
                >
                  450 NJ-10 Unit C<br />Ledgewood, NJ 07852
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E84520] flex-shrink-0" />
                <a
                  href="tel:+19735804455"
                  className="text-sm text-white/60 hover:text-[#E84520] transition-colors"
                >
                  (973) 580-4455
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E84520] flex-shrink-0" />
                <a
                  href="mailto:printwearledgewood@gmail.com"
                  className="text-sm text-white/60 hover:text-[#E84520] transition-colors"
                >
                  printwearledgewood@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-white/4 rounded-lg border border-white/8">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                Business Hours
              </p>
              <p className="text-xs text-white/40">Mon–Sat: 9am – 7pm</p>
              <p className="text-xs text-white/40">Sun: 12pm – 5pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Printwear Ledgewood. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Custom Embroidery & Screen Printing — Ledgewood, NJ
          </p>
        </div>
      </div>
    </footer>
  );
}
