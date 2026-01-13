// ===============================
// Email Verification Page
// ===============================

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';

// <- IMPORT the API_BASE_URL used across the app
import { API_BASE_URL } from '@/lib/api';

// ===============================
// Verification States
// ===============================
type VerifyState = 'verifying' | 'success' | 'error' | 'no-token';

// ===============================
// VerifyEmail Component
// ===============================
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<VerifyState>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  // Get token from URL
  const token = searchParams.get('token');

  // ===============================
  // Verify Email on Mount
  // ===============================
  useEffect(() => {
    if (!token) {
      setState('no-token');
      return;
    }

    try {
      // Build backend verify URL from the shared API_BASE_URL
      // API_BASE_URL already points to something like:
      //   https://laxmi-silver-backend.onrender.com/api
      // so we append '/v1/auth/verify-email'
      const backendVerifyUrl = `${API_BASE_URL.replace(/\/$/, '')}/v1/auth/verify-email?token=${encodeURIComponent(token)}`;

      // Redirect browser to backend GET verify endpoint
      // Backend will verify, set cookie, and return success / redirect
      window.location.href = backendVerifyUrl;
    } catch (error) {
      console.error('Verification redirect error:', error);
      setState('error');
      setErrorMessage('Verification link expired or invalid');
    }
  }, [token]);

  // ===============================
  // Render States
  // ===============================
  return (
    <>
      <Helmet>
        <title>Verify Email — Laxmi Silver</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">

            {/* Verifying State */}
            {state === 'verifying' && (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <h1 className="font-serif text-2xl">Verifying your email...</h1>
                <p className="text-muted-foreground">
                  Please wait while we verify your email address.
                </p>
              </div>
            )}

            {/* Success State (fallback) */}
            {state === 'success' && (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="font-serif text-2xl text-green-600">
                  Email Verified Successfully!
                </h1>
                <p className="text-muted-foreground">
                  Redirecting to your account...
                </p>
                <div className="pt-2">
                  <Link to="/account">
                    <Button variant="luxury">Go to Account</Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Error State */}
            {state === 'error' && (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="font-serif text-2xl text-red-600">
                  Verification Failed
                </h1>
                <p className="text-muted-foreground">
                  {errorMessage || 'Verification link expired or invalid.'}
                </p>
                <div className="pt-4 space-y-3">
                  <Link to="/resend-verification" className="block">
                    <Button variant="luxury" className="w-full">
                      Resend Verification Email
                    </Button>
                  </Link>
                  <Link to="/auth" className="block">
                    <Button variant="outline" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* No Token State */}
            {state === 'no-token' && (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-amber-600" />
                </div>
                <h1 className="font-serif text-2xl">No Verification Token</h1>
                <p className="text-muted-foreground">
                  This page requires a valid verification link from your email.
                </p>
                <div className="pt-4 space-y-3">
                  <Link to="/resend-verification" className="block">
                    <Button variant="luxury" className="w-full">
                      Resend Verification Email
                    </Button>
                  </Link>
                  <Link to="/auth" className="block">
                    <Button variant="outline" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default VerifyEmail;
