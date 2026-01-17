import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

import CartDrawer from "@/components/cart/CartDrawer";

// Pages
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Reviews from "./pages/Reviews";
import VideoFeed from "./pages/VideoFeed";
import Account from "./pages/Account";
import ProfilePage from "./pages/account/ProfilePage";
import OrdersPage from "./pages/account/OrdersPage";
import AddressesPage from "./pages/account/AddressesPage";
import WishlistPage from "./pages/account/WishlistPage";
import SettingsPage from "./pages/account/SettingsPage";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import ResendVerification from "./pages/ResendVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InternalUpload from "./pages/InternalUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <CartDrawer />

              <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/collections" element={<CategoryPage />} />
                <Route path="/collections/:category" element={<CategoryPage />} />

                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />

                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/videos" element={<VideoFeed />} />

                <Route path="/account" element={<Account />} />
                <Route path="/account/profile" element={<ProfilePage />} />
                <Route path="/account/orders" element={<OrdersPage />} />
                <Route path="/account/addresses" element={<AddressesPage />} />
                <Route path="/account/wishlist" element={<WishlistPage />} />
                <Route path="/account/settings" element={<SettingsPage />} />
                <Route path="/auth" element={<Auth />} />

                {/* ✅ PASSWORD FLOW ROUTES */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/resend-verification" element={<ResendVerification />} />

                {/* Hidden admin route - not in navigation */}
                <Route path="/internal-upload" element={<InternalUpload />} />

                {/* MUST BE LAST */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
