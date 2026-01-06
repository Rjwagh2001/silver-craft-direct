import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, ChevronRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';

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
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    toast({ title: 'Logged out', description: 'You have been successfully logged out.' });
    navigate('/');
  };

  // Show login prompt if not authenticated
  if (!isLoading && !isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>My Account — Laxmi Silver</title>
        </Helmet>

        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
          <Navbar />
          
          <main className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h1 className="font-serif text-2xl mb-3">Welcome to Laxmi Silver</h1>
              <p className="text-muted-foreground mb-6">
                Sign in to view your orders, manage addresses, and access exclusive offers.
              </p>
              <div className="space-y-3">
                <Button variant="luxury" size="lg" className="w-full" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  New customer?{' '}
                  <Link to="/auth" className="text-primary hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Account — Laxmi Silver</title>
        <meta name="description" content="Manage your Laxmi Silver account, orders, and preferences." />
      </Helmet>

      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <Navbar />

        <main className="flex-1 py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 md:p-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <div>
                  <h1 className="font-serif text-xl md:text-2xl">
                    {user?.name || 'Welcome'}
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {user?.email}
                  </p>
                  {user?.phone && (
                    <p className="text-muted-foreground text-sm">
                      {user.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Sections */}
            <div className="grid gap-3 md:gap-4">
              {accountSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Link
                    key={section.title}
                    to={section.path}
                    className="flex items-center gap-4 p-4 md:p-5 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{section.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{section.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </Link>
                );
              })}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 p-4 md:p-5 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors group mt-4"
              >
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <LogOut className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="font-medium text-destructive">Logout</h3>
                  <p className="text-sm text-destructive/70">Sign out of your account</p>
                </div>
              </button>
            </div>

            {/* Help Section */}
            <div className="mt-8 p-6 rounded-xl bg-muted/30 text-center">
              <p className="text-sm text-muted-foreground mb-3">Need help with your account?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/faq">FAQs</Link>
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
