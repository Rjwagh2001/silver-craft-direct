import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CategorySlider from "@/components/home/CategorySlider";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductSlider from "@/components/home/ProductSlider";
import TrustSection from "@/components/home/TrustSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";

const Index = () => {
  const trendingProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <>
      <Helmet>
        <title>Lakshmi Silver — Premium 92.5 Silver Jewellery | Bangles • Rings • Chains</title>
        <meta
          name="description"
          content="Shop premium 92.5 sterling silver jewellery — bangles, rings, chains & bridal sets. Lakshmi Silver: wholesale-quality pieces direct to customers. New arrivals daily."
        />
      </Helmet>

      <div className="min-h-screen overflow-x-hidden pb-16 md:pb-0">
        <Navbar />
        <main>
          {/* Category Icon Slider */}
          <CategorySlider />
          
          {/* Hero Slider - Brand Story */}
          <HeroSlider />
          
          {/* Featured Categories Grid */}
          <FeaturedCategories />
          
          {/* Most Trending Products */}
          <ProductSlider 
            title="Most Trending" 
            subtitle="Our bestselling pieces loved by customers"
            products={trendingProducts}
          />
          
          {/* New Arrivals */}
          <ProductSlider 
            title="New Arrivals" 
            subtitle="Fresh designs added daily"
            products={newArrivals}
            showNewBadge
          />
          
          {/* Trust / Why Choose Us Section */}
          <TrustSection />
          
          {/* Customer Reviews */}
          <ReviewsSection />
          
          {/* Instagram Feed */}
          <InstagramFeed />
        </main>
        <Footer />
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </>
  );
};

export default Index;
