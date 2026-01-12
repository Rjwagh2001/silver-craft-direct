// ===============================
// Imports
// ===============================

// React state hook
import { useState } from 'react';

// React Router utilities
// - Link: client-side navigation
// - useNavigate: programmatic redirect
// - useLocation: get previous route (for redirect after login)
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Icons for UI (password toggle, input icons)
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

// Reusable UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Auth context (handles login & register API calls)
import { useAuth } from '@/contexts/AuthContext';

// Toast notifications (success / error messages)
import { useToast } from '@/hooks/use-toast';

// Layout components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Helmet for SEO (dynamic page title)
import { Helmet } from 'react-helmet-async';

// Zod for form validation
import { z } from 'zod';


// ===============================
// Validation Schemas
// ===============================

// Login form validation rules
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Register form validation rules
const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number')
    .optional()
    .or(z.literal('')),
});


// ===============================
// Auth Component
// ===============================

const Auth = () => {

  // Toggle between Login and Register
  const [isLogin, setIsLogin] = useState(true);

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);

  // Loading message for slow server
  const [loadingMessage, setLoadingMessage] = useState('');

  // Store validation errors per field
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  // Auth methods from context
  const { login, register } = useAuth();

  // Toast notifications
  const { toast } = useToast();

  // Navigation utilities
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect user back to the page they came from after login/register
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  // ===============================
  // Wake up backend on page load (Render cold start fix)
  // ===============================
  useState(() => {
    // Ping backend to wake it up when user visits auth page
    fetch('https://laxmi-silver-backend.onrender.com/api/health')
      .catch(() => {}); // Ignore errors, just wake it up
  });


  // ===============================
  // Handle Input Change
  // ===============================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };


  // ===============================
  // Form Validation
  // ===============================
  const validateForm = () => {
    try {
      // Validate based on mode (login / register)
      if (isLogin) {
        loginSchema.parse({
          email: formData.email,
          password: formData.password,
        });
      } else {
        registerSchema.parse(formData);
      }

      // Clear errors if validation passes
      setErrors({});
      return true;

    } catch (error) {
      // Capture Zod validation errors
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });

        setErrors(newErrors);
      }
      return false;
    }
  };


  // ===============================
  // Handle Form Submit
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Stop if validation fails
    if (!validateForm()) return;

    setIsLoading(true);
    setLoadingMessage('');

    // Show helpful message after 3 seconds (Render cold start)
    const slowTimer = setTimeout(() => {
      setLoadingMessage('Server is waking up, please wait...');
    }, 3000);

    // Show extended message after 15 seconds
    const extendedTimer = setTimeout(() => {
      setLoadingMessage('Almost there! Free server takes up to 30s to start...');
    }, 15000);

    try {
      if (isLogin) {
        // Login flow
        const result = await login({
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully logged in.',
          });
          navigate(from, { replace: true });
        } else {
          toast({
            title: 'Login failed',
            description: result.error || 'Invalid email or password',
            variant: 'destructive',
          });
        }

      } else {
        // Register flow
        const result = await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
        });

        if (result.success) {
          toast({
            title: 'Account created!',
            description: 'Welcome to Laxmi Silver.',
          });
          navigate(from, { replace: true });
        } else {
          toast({
            title: 'Registration failed',
            description: result.error || 'Could not create account',
            variant: 'destructive',
          });
        }
      }

    } catch (error) {
      // Generic error handler
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      clearTimeout(slowTimer);
      clearTimeout(extendedTimer);
      setIsLoading(false);
      setLoadingMessage('');
    }
  };


  // ===============================
  // JSX Render
  // ===============================
  return (
    <>
      {/* SEO title */}
      <Helmet>
        <title>
          {isLogin ? 'Login' : 'Create Account'} — Laxmi Silver
        </title>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? 'Sign in to your Laxmi Silver account'
                  : 'Join the Laxmi Silver family today'}
              </p>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* First & Last Name (Register only) */}
              {!isLogin && (
                <>
                  {/* First Name */}
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        className="pl-10"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        className="pl-10"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone (Register only) */}
              {!isLogin && (
                <div>
                  <Label htmlFor="phone">Mobile Number (Optional)</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit mobile"
                      className="pl-10"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={
                      isLogin ? 'Enter your password' : 'Create a password'
                    }
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="luxury"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? isLogin
                    ? 'Signing in...'
                    : 'Creating account...'
                  : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
              </Button>

              {/* Loading Message */}
              {isLoading && loadingMessage && (
                <p className="text-xs text-muted-foreground text-center animate-pulse">
                  {loadingMessage}
                </p>
              )}
            </form>

            {/* Toggle Login/Register */}
            <div className="mt-6 text-center text-sm">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setErrors({});
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    Create one
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setErrors({});
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <span>🔒 Secure Login</span>
                <span>💎 92.5 Pure Silver</span>
                <span>📦 Free Shipping</span>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Auth;
