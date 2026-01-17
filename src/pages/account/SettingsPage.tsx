import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, LogOut, Bell, Shield, Eye, EyeOff, Loader2, ChevronRight } from 'lucide-react';
import AccountPageLayout from '@/components/account/AccountPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { userService } from '@/services/user.service';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Confirm your password'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

const SettingsPage = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Notification preferences (UI only - stored locally)
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: false,
    newsletter: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onChangePassword = async (data: PasswordFormData) => {
    setIsSubmitting(true);
    try {
      const response = await userService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.success) {
        toast({
          title: 'Password Changed',
          description: 'Your password has been updated successfully.',
        });
        setIsPasswordDialogOpen(false);
        reset();
      } else {
        throw new Error(response.error || 'Failed to change password');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to change password',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast({ title: 'Logged out', description: 'You have been successfully logged out.' });
    navigate('/');
  };

  const settingsSections = [
    {
      title: 'Security',
      icon: Shield,
      items: [
        {
          label: 'Change Password',
          description: 'Update your account password',
          action: () => setIsPasswordDialogOpen(true),
          icon: Lock,
        },
      ],
    },
  ];

  return (
    <AccountPageLayout 
      title="Settings" 
      description="Account settings and preferences"
    >
      <div className="space-y-6">
        {/* Security Section */}
        {settingsSections.map((section) => (
          <div key={section.title} className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground">{section.title}</h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Notifications Section */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">Notifications</h3>
            </div>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">Order Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about order status</p>
              </div>
              <Switch 
                checked={notifications.orders} 
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, orders: checked }))}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">Promotions</p>
                <p className="text-sm text-muted-foreground">Receive promotional offers</p>
              </div>
              <Switch 
                checked={notifications.promotions} 
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, promotions: checked }))}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">Newsletter</p>
                <p className="text-sm text-muted-foreground">Weekly jewelry trends & tips</p>
              </div>
              <Switch 
                checked={notifications.newsletter} 
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newsletter: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="bg-card rounded-xl border border-destructive/20 shadow-card overflow-hidden">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="w-full flex items-center gap-4 p-5 hover:bg-destructive/5 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-destructive" />
            </div>
            <div className="text-left">
              <p className="font-medium text-destructive">Logout</p>
              <p className="text-sm text-destructive/70">Sign out of your account</p>
            </div>
          </button>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  {...register('currentPassword')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  {...register('newPassword')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-destructive">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsPasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="luxury" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update Password'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AccountPageLayout>
  );
};

export default SettingsPage;
