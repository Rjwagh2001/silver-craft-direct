import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import TopInfoStrip from "@/components/layout/TopInfoStrip";
import CategorySlider from "@/components/home/CategorySlider";
import HeroSlider from "@/components/home/HeroSlider";
import StoryShowcase from "@/components/home/StoryShowcase";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductSlider from "@/components/home/ProductSlider";
import ReviewsSection from "@/components/home/ReviewsSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import SectionDivider from "@/components/ui/SectionDivider";
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
        {/* Top Info Strip */}
        <TopInfoStrip />
        
        {/* Header */}
        <Navbar />
        
        <main>
          {/* Category Icon Slider */}
          <CategorySlider />
          
          {/* Hero Slider - Brand Story */}
          <HeroSlider />
          
          {/* Section Divider */}
          <SectionDivider variant="ornament" />
          
          {/* Story Showcase - Visual Storytelling */}
          <StoryShowcase />
          
          {/* Section Divider */}
          <SectionDivider variant="line" />
          
          {/* Featured Categories Grid */}
          <FeaturedCategories />
          
          {/* Section Divider */}
          <SectionDivider variant="dots" />
          
          {/* Most Trending Products */}
          <ProductSlider 
            title="Most Trending" 
            subtitle="Loved by Our Silver Family"
            products={trendingProducts}
          />
          
          {/* Section Divider */}
          <SectionDivider variant="line" />
          
          {/* New Arrivals */}
          <ProductSlider 
            title="New Arrivals" 
            subtitle="Fresh Designs, Just Arrived"
            products={newArrivals}
            showNewBadge
          />
          
          {/* Section Divider */}
          <SectionDivider variant="ornament" />
          
          {/* Customer Reviews */}
          <ReviewsSection />
          
          {/* Section Divider */}
          <SectionDivider variant="dots" />
          
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
