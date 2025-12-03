import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are your pieces hallmarked?",
    answer: "Yes — all our products are certified 92.5 sterling silver and hallmarked where applicable. You can verify the authenticity through the BIS hallmark stamp on each piece.",
  },
  {
    question: "Do you ship nationwide?",
    answer: "Yes. We ship across India. Standard delivery takes 3–7 business days. Express shipping is available on request for an additional charge.",
  },
  {
    question: "What's the return policy?",
    answer: "We accept returns for manufacturing defects within 7 days of delivery. Items must be unused and in original packaging. Contact us via WhatsApp to initiate a return.",
  },
  {
    question: "How can I place an order?",
    answer: "Use the \"Buy via WhatsApp\" button on any product page or add items to cart and checkout. We'll confirm order and payment details via WhatsApp within 2 hours.",
  },
  {
    question: "Do you offer wholesale/bulk pricing?",
    answer: "Yes. Contact us at our wholesale inquiry line for bulk rates and custom orders. We offer special pricing for retailers and resellers ordering in quantity.",
  },
  {
    question: "Do you offer custom designs?",
    answer: "Yes. Send a brief to our WhatsApp with reference images and we'll guide you through the design process. Custom pieces typically take 7-14 days to craft.",
  },
  {
    question: "How do I care for my silver jewellery?",
    answer: "Store in a dry place, preferably in the pouch provided. Avoid contact with chemicals, perfumes, and water. Polish occasionally with a soft, lint-free cloth. Proper care keeps your silver shining for years.",
  },
  {
    question: "Is free shipping available?",
    answer: "Yes! We offer free standard shipping on all orders above ₹2,000. Orders below this amount have a nominal shipping charge of ₹99.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, Net Banking, Debit/Credit Cards, and Cash on Delivery (for select locations). All online payments are processed securely.",
  },
  {
    question: "Can I visit your showroom?",
    answer: "Absolutely! Our showroom is located at Saraf Bazar Association, Nanded, Maharashtra. We're open Monday to Saturday, 10 AM to 8 PM. Walk-ins are welcome!",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block animate-fade-in">
              Help Center
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in-up">
              Frequently Asked Questions
            </h1>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Find answers to common questions about our products, ordering process, and policies.
            </p>
            <div className="section-divider mt-8" />
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border rounded-xl px-6 data-[state=open]:shadow-card transition-shadow"
                  >
                    <AccordionTrigger className="font-serif text-lg text-left hover:no-underline hover:text-primary py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-muted-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Contact CTA */}
              <div className="mt-16 text-center p-8 bg-secondary/50 rounded-2xl">
                <h3 className="font-serif text-2xl mb-4">
                  Still Have Questions?
                </h3>
                <p className="font-sans text-muted-foreground mb-6">
                  Our team is here to help. Reach out via WhatsApp for quick assistance.
                </p>
                <a
                  href="https://wa.me/919967580919?text=Hello%2C%20I%20have%20a%20question"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-luxury text-primary hover:gap-4 transition-all duration-300"
                >
                  Chat with Us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
