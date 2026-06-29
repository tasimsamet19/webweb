# Printwear Ledgewood — Web Sitesi Dokümantasyonu

## Proje Özeti

Amerika'daki özel baskı firması **Printwear Ledgewood** için modern, premium bir web sitesi. Ürün listeleme, teklif alma formu ve portföy galerisi içerir. E-ticaret sonradan eklenebilecek şekilde tasarlandı.

---

## Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 16.x (App Router, TypeScript) |
| Stil | Tailwind CSS v4 |
| UI Bileşenleri | shadcn/ui (Base UI tabanlı yeni sürüm) |
| Animasyon | Framer Motion (`motion/react`) |
| Form | React Hook Form + Zod |
| E-posta | Resend (opsiyonel, env var ile aktifleşir) |
| İkonlar | Lucide React |
| Font | Inter (gövde) + Bebas Neue (başlıklar) |

---

## Kurulum & Çalıştırma

```bash
# Proje dizinine gir
cd "C:\Users\tasim\Desktop\claude code\printwear-ledgewood"

# Bağımlılıkları yükle (ilk kurulumda)
npm install

# Dev server'ı başlat
npm run dev
```

Tarayıcıda aç: **http://localhost:3000**

### E-posta Bildirimleri (Opsiyonel)

Teklif ve iletişim formlarından e-posta almak için:

1. [resend.com](https://resend.com) ücretsiz hesap aç (3.000 e-posta/ay ücretsiz)
2. API key al
3. Proje kökünde `.env.local` dosyası oluştur:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

4. Server'ı yeniden başlat — formlar `printwearledgewood@gmail.com` adresine gelir.

> API key olmadan formlar consola log basar (geliştirme modu).

---

## Proje Dosya Yapısı

```
printwear-ledgewood/
├── app/                          # Next.js App Router sayfaları
│   ├── layout.tsx                # Root layout (font, Navbar, Footer, Toaster)
│   ├── page.tsx                  # Ana sayfa
│   ├── not-found.tsx             # 404 sayfası
│   ├── globals.css               # Tailwind v4 + marka renk değişkenleri
│   ├── products/
│   │   ├── page.tsx              # Ürün kataloğu + kategori filtresi
│   │   └── [slug]/page.tsx       # Ürün detay sayfası
│   ├── gallery/page.tsx          # Portföy galerisi
│   ├── about/page.tsx            # Hakkımızda
│   ├── contact/page.tsx          # İletişim
│   └── api/
│       ├── quote/route.ts        # Teklif formu POST → e-posta
│       └── contact/route.ts      # İletişim formu POST → e-posta
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Scroll-aware navbar, mobil menü
│   │   ├── Footer.tsx            # 4 kolonlu footer
│   │   └── PageTransition.tsx    # Sayfa geçiş animasyonu
│   ├── home/
│   │   ├── HeroSection.tsx       # Tam ekran hero, Bebas Neue başlık
│   │   ├── CategoryGrid.tsx      # 10 kategori kartı
│   │   ├── ProcessSteps.tsx      # 4 adım "Nasıl Çalışır"
│   │   ├── FeaturedProducts.tsx  # Öne çıkan 6 ürün
│   │   ├── GalleryPreview.tsx    # 4 iş önizlemesi
│   │   ├── Testimonials.tsx      # 3 müşteri yorumu
│   │   └── CTASection.tsx        # Alt çağrı aksiyonu
│   ├── products/
│   │   ├── ProductCard.tsx       # Ürün kartı
│   │   ├── ProductGrid.tsx       # Filtreli ürün grid (AnimatePresence)
│   │   ├── CategoryFilter.tsx    # URL param tabanlı kategori filtresi
│   │   ├── ProductDetail.tsx     # Ürün detay layout
│   │   ├── ProductGallery.tsx    # Thumbnail geçişli galeri
│   │   └── QuoteForm.tsx         # Teklif formu (Dialog içinde)
│   ├── gallery/
│   │   ├── GalleryGrid.tsx       # Masonry galeri grid
│   │   └── GalleryLightbox.tsx   # Tam ekran lightbox (klavye nav)
│   ├── shared/
│   │   ├── PageHero.tsx          # Sayfa başlık bölümü
│   │   ├── SectionHeader.tsx     # Bölüm başlığı komponenti
│   │   └── AnimatedSection.tsx   # whileInView wrapper
│   └── ui/
│       ├── button.tsx            # shadcn Button (Base UI tabanlı)
│       ├── link-button.tsx       # Link/Anchor için button stili
│       ├── dialog.tsx            # Modal dialog
│       ├── sheet.tsx             # Mobil menü drawer
│       ├── select.tsx            # Dropdown seçici
│       ├── radio-group.tsx       # Radio butonlar
│       ├── input.tsx             # Metin girişi
│       ├── textarea.tsx          # Çok satırlı metin
│       ├── sonner.tsx            # Toast bildirimleri
│       └── ...diğer shadcn bileşenleri
│
├── lib/
│   ├── types.ts                  # TypeScript arayüzleri
│   ├── utils.ts                  # cn(), slugify(), formatDecorationMethod()
│   ├── animations.ts             # Framer Motion varyantları
│   └── data/
│       ├── categories.ts         # 10 kategori tanımı
│       ├── products.ts           # 16 statik ürün
│       ├── gallery.ts            # 24 portföy görseli
│       └── testimonials.ts       # 3 müşteri yorumu
│
├── hooks/
│   └── useScrolled.ts            # Scroll pozisyon hook'u (navbar için)
│
├── public/
│   └── logo.jpeg                 # Printwear Ledgewood logosu
│
├── next.config.ts                # placehold.co görsel izni
├── components.json               # shadcn/ui yapılandırması
└── .env.local                    # (Oluşturmanız lazım) RESEND_API_KEY
```

---

## Sayfalar

### Ana Sayfa `/`
Sırayla 7 bölüm:
1. **Hero** — Tam ekran, Bebas Neue tipografi, kırmızı glow efektleri, 4 istatistik
2. **Kategori Grid** — 10 kategori kartı, hover animasyonu
3. **Nasıl Çalışır** — 4 adım: Teklif → Tasarım Onayla → Baskı → Teslim
4. **Öne Çıkan Ürünler** — `featured: true` olan 6 ürün
5. **Galeri Önizleme** — 4 iş örneği, portfolyoya yönlendirme
6. **Müşteri Yorumları** — 3 referans kartı
7. **CTA** — "Siparişinizi Bugün Başlatın" aksiyonu

### Ürünler `/products`
- URL param tabanlı kategori filtresi (`?category=tee-shirts`)
- Framer Motion `AnimatePresence` ile yumuşak filtre geçişleri
- Her kart: görsel, dekorasyon metodu badge'leri, min. adet, detay linki

### Ürün Detay `/products/[slug]`
- Thumbnail geçişli görsel galerisi
- Özellikler listesi, beden seçenekleri, teslimat süresi
- "Teklif İste" butonu → Dialog açılır (ürün bilgisi önceden dolu)
- Altta ilgili ürünler
- `generateStaticParams()` ile statik oluşturma (hızlı yükleme + SEO)

### Galeri `/gallery`
- 24 iş örneği, 4 kolonlu grid
- Hover'da başlık + dekorasyon metodu gösterimi
- Tıklayınca tam ekran lightbox
- Klavye navigasyonu: ← → gezin, Esc kapat

### Hakkımızda `/about`
- Firma hikayesi + 4 istatistik kartı
- Değerler: Kalite, Hız, Kişisel Servis, Topluluk
- Yetenekler listesi (screen printing, embroidery, sublimation, vb.)

### İletişim `/contact`
- Adres, telefon, e-posta, çalışma saatleri
- İletişim formu (React Hook Form + Zod validasyon)
- "Teklif İste" butonu → QuoteForm Dialog

---

## Teklif Formu

Ürün detay sayfasında "Teklif İste" butonuna tıklayınca açılır. Ürün adı ve kategorisi otomatik dolar.

**Form Alanları:**
- **İletişim**: Ad, soyad, e-posta, telefon, firma adı
- **Sipariş**: Ürün/kategori, dekorasyon metodu, adet, renk sayısı, beden dağılımı, teslim tarihi
- **Tasarım**: Tasarım durumu (hazır / logo var / sıfırdan lazım), dosya yükleme (.ai .eps .pdf .png .svg, 25MB), Pantone renkleri, tasarım açıklaması
- **Ekler**: Ek notlar

Gönderilince `/api/quote` endpoint'ine POST atar. Resend API key varsa e-posta gider, yoksa console'a log basar.

---

## Tasarım Sistemi

### Renkler

| Değişken | Hex | Kullanım |
|----------|-----|---------|
| `#080808` | Yakın siyah | Sayfa arka planı |
| `#111111` | Kart arka planı | Tüm kartlar |
| `#1A1A1A` | Elevated yüzey | Hover durumları |
| `#E84520` | Marka turuncu-kırmızı | Accent, CTA, vurgular |
| `#FF6040` | Açık accent | Hover durumları |
| `#F0F0F0` | Ana metin | Başlıklar, gövde |
| `rgba(255,255,255,0.08)` | Border | Kart kenarlıkları |

Renk logodan türetildi: **PRINTWEAR** yazısının turuncu-kırmızısı `#E84520`.

### Tipografi

| Font | Kullanım | Sınıf |
|------|----------|-------|
| **Bebas Neue** | Hero başlıklar, büyük display metinler | `font-display` |
| **Inter** | Her şey diğeri | `font-sans` (varsayılan) |

### Animasyon

`lib/animations.ts` içinde tanımlı ortak varyantlar:

```ts
fadeInUp    // Aşağıdan yukarı + fade
fadeIn      // Sadece opacity
scaleIn     // Hafif scale + fade
staggerContainer  // Çocukları sırayla animasyonla
```

- **Navbar**: Scroll sonrası arka plan beliriyor
- **Hero**: Stagger ile kelime kelime reveal
- **Kartlar**: `whileInView` + stagger, hover'da `y: -4` kalkış
- **Ürün filtresi**: `layout` prop + `AnimatePresence` yumuşak geçiş
- **Lightbox**: `AnimatePresence` ile aç/kapat
- **Sayfa geçişleri**: `usePathname` key'li `AnimatePresence`
- **Erişilebilirlik**: `useReducedMotion()` kontrolü her animasyonda

---

## Ürün Kategorileri (10 adet)

| Slug | Etiket |
|------|--------|
| `tee-shirts` | Tee Shirts |
| `sweatshirts` | Sweatshirts |
| `jackets` | Jackets |
| `hats` | Hats & Headwear |
| `polo-shirts` | Polo Shirts |
| `pants-shorts` | Pants & Shorts |
| `sports-apparel` | Sports Apparel |
| `varsity-jackets` | Varsity Jackets |
| `other-products` | Other Products |
| `sublimated-uniforms` | Sublimated Uniforms |

---

## Statik Veri (Veritabanı Yokken)

Tüm ürünler, kategoriler ve galeri öğeleri `lib/data/` altında TypeScript dosyalarında tutuluyor. E-ticaret eklendiğinde bu dosyalar Postgres/Supabase için seed verisi olarak kullanılabilir.

Geliştirme sırasında görseller `placehold.co` ile placeholder. Gerçek görseller eklenince:
1. `public/images/` klasörüne yükle
2. `lib/data/products.ts` içindeki `images` dizisini güncelle

---

## E-Ticaret İçin Hazırlık

Site e-ticaret eklenebilecek şekilde tasarlandı:

- `Product` tipinde `priceRange` alanı mevcut (şu an gösterilmiyor)
- Tüm ürünler `slug` tabanlı — URL yapısı değişmeyecek
- Statik veri → Prisma/Supabase geçişi için tip uyumlu
- Sepet durumu için Zustand veya Redux eklenebilir
- Ödeme için Stripe entegrasyonu `/app/api/checkout/` altına eklenebilir

---

## Sonraki Adımlar

### Kısa Vadeli
- [ ] Gerçek ürün fotoğraflarını ekle
- [ ] Resend API key ile e-posta bildirimlerini aç
- [ ] Google Maps iletişim sayfasına ekle
- [ ] Instagram/Facebook/LinkedIn sosyal medya linkleri

### Orta Vadeli
- [ ] CMS entegrasyonu (Sanity veya Contentful) — ürünleri panelden yönet
- [ ] Müşteri yorum sistemi
- [ ] Blog / haber sayfası

### Uzun Vadeli (E-Ticaret)
- [ ] Supabase veritabanı kurulumu
- [ ] Kullanıcı girişi (NextAuth)
- [ ] Sepet ve ödeme (Stripe)
- [ ] Sipariş takip sistemi
- [ ] Admin paneli

---

## Geliştirici Notları

### shadcn/ui Sürüm Farkı
Bu projede shadcn'ın yeni sürümü kullanılıyor (`@base-ui/react` tabanlı). Eski sürümdeki `asChild` prop **yok**. Link butonlar için `components/ui/link-button.tsx` kullanıldı.

### Tailwind v4
`tailwind.config.ts` yerine `globals.css` içindeki `@theme` bloğu ile renkler yapılandırılıyor. Özel renkler CSS değişkeni olarak tanımlanıp `@theme` ile Tailwind'e aktarıldı.

### Framer Motion
React 19 uyumlu `motion/react` paketi kullanıldı (eski `framer-motion` import'u değil).

---

*Hazırlandı: Haziran 2026*
