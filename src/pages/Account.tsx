import { Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, ChevronRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { Helmet } from 'react-helmet-async';

const accountSections = [
  {
    icon: User,
    title: 'Profile',
    description: 'Manage your personal information',
    path: '/account/profile',
  },
  {
    icon: Package,
    title: 'Orders',
    description: 'Track and manage your orders',
    path: '/account/orders',
  },
  {
    icon: MapPin,
    title: 'Addresses',
    description: 'Manage delivery addresses',
    path: '/account/addresses',
  },
  {
    icon: Heart,
    title: 'Wishlist',
    description: 'View your saved items',
    path: '/account/wishlist',
  },
  {
    icon: Settings,
    title: 'Settings',
    description: 'Account settings and preferences',
    path: '/account/settings',
  },
];

const Account = () => {
  // Simulated user data - replace with actual auth when backend is enabled
  const isLoggedIn = false;
  const user = {
    name: 'Guest User',
    email: 'guest@example.com',
  };

  return (
    <>
      <Helmet>
        <title>My Account — Laxmi Silver</title>
        <meta name="description" content="Manage your Laxmi Silver account, orders, addresses, and wishlist." />
      </Helmet>

      <div className="min-h-screen flex flex-col overflow-x-hidden pb-20 md:pb-0">
        <Navbar />

        <main className="flex-1 py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2">My Account</h1>
              {isLoggedIn ? (
                <p className="text-muted-foreground">Welcome back, {user.name}</p>
              ) : (
                <p className="text-muted-foreground">Sign in to access your account</p>
              )}
            </div>

            {/* Login/Register CTA for guests */}
            {!isLoggedIn && (
              <div className="max-w-md mx-auto mb-8 sm:mb-12 p-6 bg-muted/30 rounded-lg text-center">
                <h2 className="font-serif text-lg sm:text-xl mb-2">New to Laxmi Silver?</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Create an account to track orders, save favorites, and get exclusive offers.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="luxury" size="lg">
                    Sign In
                  </Button>
                  <Button variant="luxury-outline" size="lg">
                    Create Account
                  </Button>
                </div>
              </div>
            )}

            {/* Account Sections Grid */}
            <div className="max-w-2xl mx-auto">
              <div className="grid gap-3 sm:gap-4">
                {accountSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Link
                      key={section.title}
                      to={section.path}
                      className="flex items-center gap-4 p-4 sm:p-5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-background rounded-full flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-base sm:text-lg group-hover:text-primary transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                  );
                })}

                {/* Logout Button */}
                {isLoggedIn && (
                  <button
                    className="flex items-center gap-4 p-4 sm:p-5 bg-muted/30 rounded-lg hover:bg-destructive/10 transition-colors group w-full text-left"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-background rounded-full flex items-center justify-center shrink-0">
                      <LogOut className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base sm:text-lg text-destructive">
                        Logout
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Sign out of your account
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Help Section */}
            <div className="max-w-2xl mx-auto mt-8 sm:mt-12 p-6 border border-border rounded-lg text-center">
              <h3 className="font-serif text-lg mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our customer support team is here to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="luxury-outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="luxury-outline" asChild>
                  <Link to="/faq">View FAQs</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default Account;
