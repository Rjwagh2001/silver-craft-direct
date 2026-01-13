// ===============================
// Resend Verification Email Page
// ===============================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';


// ===============================
// ResendVerification Component
// ===============================
const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);


  // ===============================
  // Handle Form Submit
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/auth/resend-verification', { email });

      if (response.success) {
        setIsSent(true);
        toast.success('Verification email sent!');
      } else {
        toast.error(response.error || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  // ===============================
  // Render Component
  // ===============================
  return (
    <>
      <Helmet>
        <title>Resend Verification — Laxmi Silver</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-serif text-2xl">
              Resend Verification Email
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Success State */}
            {isSent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="font-medium text-lg">Email Sent!</h2>
                <p className="text-muted-foreground">
                  We've sent a verification link to <strong>{email}</strong>. 
                  Please check your inbox and spam folder.
                </p>
                <div className="pt-4 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsSent(false);
                      setEmail('');
                    }}
                  >
                    Send to Different Email
                  </Button>
                  <Link to="/auth" className="block">
                    <Button variant="luxury" className="w-full">
                      Go to Login
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Enter your email address and we'll send you a new verification link.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  variant="luxury"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Verification Email'
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    to="/auth"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResendVerification;