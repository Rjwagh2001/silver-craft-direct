// ===============================
// Email Verification Page
// ===============================

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { Helmet } from 'react-helmet-async';


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
    const verifyEmail = async () => {
      // No token in URL
      if (!token) {
        setState('no-token');
        return;
      }

      try {
        // Call backend verification endpoint
        const response = await api.post('/auth/verify-email', { token });

        if (response.success) {
          setState('success');
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate('/auth', { replace: true });
          }, 2000);
        } else {
          setState('error');
          setErrorMessage(response.error || 'Verification failed');
        }
      } catch (error) {
        setState('error');
        setErrorMessage('Verification link expired or invalid');
      }
    };

    verifyEmail();
  }, [token, navigate]);


  // ===============================
  // Render States
  // ===============================
  return (
    <>
      <Helmet>
        <title>Verify Email — Laxmi Silver</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">

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

          {/* Success State */}
          {state === 'success' && (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="font-serif text-2xl text-green-600">
                Email Verified Successfully!
              </h1>
              <p className="text-muted-foreground">
                Your email has been verified. Redirecting to login...
              </p>
              <div className="pt-2">
                <Link to="/auth">
                  <Button variant="luxury">Go to Login</Button>
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
              <div className="pt-2 space-y-2">
                <Link to="/auth">
                  <Button variant="luxury">Back to Login</Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Need help? <Link to="/contact" className="text-primary hover:underline">Contact support</Link>
                </p>
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
              <div className="pt-2">
                <Link to="/auth">
                  <Button variant="luxury">Go to Login</Button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
