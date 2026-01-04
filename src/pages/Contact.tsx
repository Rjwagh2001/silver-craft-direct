import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you — we'll reply within 2 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "", consent: false });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block animate-fade-in">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in-up">
              Visit or Contact Us
            </h1>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              We'd love to hear from you. Reach out via WhatsApp for quick responses, or visit our showroom in Nanded.
            </p>
            <div className="section-divider mt-8" />
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl mb-8">
                  Contact Information
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-sans font-medium text-foreground mb-1">Address</h3>
                      <p className="font-sans text-muted-foreground">
                        Laxmi Silver<br />
                        Saraf Bazar Association,<br />
                        Nanded, Maharashtra — 431604
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-sans font-medium text-foreground mb-1">Phone</h3>
                      <p className="font-sans text-muted-foreground">
                        <a href="tel:+918983119111" className="hover:text-primary transition-colors">
                          +91 89831 19111
                        </a>
                      </p>
                      <p className="font-sans text-muted-foreground">
                        WhatsApp:{" "}
                        <a href="https://wa.me/919967580919" className="hover:text-primary transition-colors">
                          +91 99675 80919
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-sans font-medium text-foreground mb-1">Email</h3>
                      <p className="font-sans text-muted-foreground">
                        <a href="mailto:laxmisilverofficial@gmail.com" className="hover:text-primary transition-colors">
                          laxmisilverofficial@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-sans font-medium text-foreground mb-1">Business Hours</h3>
                      <p className="font-sans text-muted-foreground">
                        Monday – Saturday: 10:00 AM – 8:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-12 rounded-2xl overflow-hidden shadow-medium h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.1234567890123!2d77.3234567890123!3d19.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzI0LjQiTiA3N8KwMTknMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Laxmi Silver Location"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl mb-8">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-sans text-sm text-foreground mb-2 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-sans text-sm text-foreground mb-2 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg font-sans text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-sm text-foreground mb-2 block">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg font-sans text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-sm text-foreground mb-2 block">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg font-sans text-foreground bg-background focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1"
                    />
                    <label htmlFor="consent" className="font-sans text-sm text-muted-foreground">
                      I agree to be contacted regarding my inquiry. View our{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <Button type="submit" variant="luxury" size="xl" className="w-full gap-3">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>

                {/* Visit Note */}
                <div className="mt-8 p-6 bg-secondary/50 rounded-2xl">
                  <p className="font-sans text-sm text-muted-foreground">
                    <strong className="text-foreground">Walk-ins welcome!</strong> Show this website at our store for priority attention and exclusive offers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
