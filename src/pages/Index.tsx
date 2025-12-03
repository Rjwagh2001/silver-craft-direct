import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import InstagramFeed from "@/components/home/InstagramFeed";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollections />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <InstagramFeed />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;