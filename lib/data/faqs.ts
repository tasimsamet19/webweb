export const faqs = [
  {
    question: "How long does it take to get my order?",
    answer:
      "Standard turnaround is 7–10 business days after artwork approval. Rush production is available for tight deadlines — just let us know when you need it and we'll do our best to accommodate.",
  },
  {
    question: "What printing methods do you offer?",
    answer:
      "We offer screen printing, machine embroidery, all-over sublimation, heat transfer vinyl (HTV), direct-to-garment (DTG), and chenille patches. Each method suits different garments, quantities, and design types. We'll recommend the best option for your project.",
  },
  {
    question: "Do you ship nationwide or only in New Jersey?",
    answer:
      "We ship across the entire USA. While we're based in Ledgewood, NJ and primarily serve Morris County and surrounding areas, we ship finished orders to businesses, teams, and schools nationwide.",
  },
  {
    question: "Can you create the artwork for my order?",
    answer:
      "Yes. Our in-house design team can create or refine artwork for your order. If you have a logo or design, we'll prepare it for print. If you're starting from scratch, share your idea and we'll build it out. Art setup fees may apply.",
  },
  {
    question: "What file formats do you accept for custom artwork?",
    answer:
      "We prefer vector files — .AI, .EPS, or .PDF. High-resolution .PNG or .PSD files (300 DPI minimum) also work for most printing methods. JPEG files are generally not ideal but we'll let you know if there are any issues after review.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Fill out our quote request form on the Contact page or call us at (973) 580-4455. Include the item, quantity, number of print locations, and your deadline. We typically respond within one business day.",
  },
  {
    question: "Do you offer bulk or volume discounts?",
    answer:
      "Yes. Screen printing costs drop significantly at higher quantities — common breakpoints are 24, 48, 72, and 144+ pieces. Embroidery pricing scales similarly. The more you order, the lower the per-piece cost.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
