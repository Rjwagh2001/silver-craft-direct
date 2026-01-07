import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Hero from "@/components/home/Hero";
import CategorySlider from "@/components/home/CategorySlider";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductSlider from "@/components/home/ProductSlider";
import TrustSection from "@/components/home/TrustSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import SectionDivider from "@/components/ui/SectionDivider";
import { useFeaturedProducts, useProducts } from "@/hooks/use-products";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";

const Index = () => {
  // Fetch from API with fallback to static data
  const { data: apiFeaturedProducts } = useFeaturedProducts();
  const { data: apiNewArrivals } = useProducts({ sort: '-createdAt', limit: 12 });

  // Use API data or fall back to static
  const trendingProducts = apiFeaturedProducts?.length ? apiFeaturedProducts : getFeaturedProducts();
  const newArrivals = apiNewArrivals?.products?.length ? apiNewArrivals.products : getNewArrivals();

  return (
    <>
      <Helmet>
        <title>Laxmi Silver — Premium 92.5 Silver Jewellery | Bangles • Rings • Chains</title>
        <meta
          name="description"
          content="Shop premium 92.5 sterling silver jewellery — bangles, rings, chains & bridal sets. Laxmi Silver: wholesale-quality pieces direct to customers. New arrivals daily."
        />
      </Helmet>

      <div className="min-h-screen overflow-x-hidden pb-16 md:pb-0">
        {/* Header */}
        <Navbar />
        
        <main>
          {/* Category Icon Slider */}
          <CategorySlider />
          
          {/* Combined Hero + Story Section (auto-transition) */}
          <Hero />
          
          {/* Section Divider */}
          <SectionDivider variant="ornament" />
          
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
          
          {/* Trust Section */}
          <TrustSection />
          
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
