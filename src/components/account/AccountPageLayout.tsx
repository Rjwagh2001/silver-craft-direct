import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface AccountPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const AccountPageLayout = ({ title, description, children }: AccountPageLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{title} — Laxmi Silver</title>
        </Helmet>
        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </main>
          <Footer />
          <MobileBottomNav />
        </div>
      </>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>{title} — Laxmi Silver</title>
        </Helmet>
        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
          <Navbar />
          <main className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h1 className="font-serif text-2xl mb-3">Sign in Required</h1>
              <p className="text-muted-foreground mb-6">
                Please sign in to access your {title.toLowerCase()}.
              </p>
              <Button variant="luxury" size="lg" className="w-full" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
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
        <title>{title} — Laxmi Silver</title>
        {description && <meta name="description" content={description} />}
      </Helmet>

      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <Navbar />

        <main className="flex-1 py-6 md:py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button & Header */}
            <div className="mb-6">
              <button
                onClick={() => navigate('/account')}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Account
              </button>
              <h1 className="font-serif text-2xl md:text-3xl text-foreground">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>

            {/* Page Content */}
            {children}
          </div>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default AccountPageLayout;
