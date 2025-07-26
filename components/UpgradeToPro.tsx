'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Crown, 
  Check, 
  Loader2, 
  Sparkles,
  Zap,
  Star,
  Shield
} from 'lucide-react';

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function UpgradeToPro() {
  const { user, userProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load PayPal script
    const loadPayPalScript = () => {
      if (window.paypal) {
        setScriptLoaded(true);
        return;
      }

      const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
      if (!clientId) {
        setError('PayPal client ID not configured');
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => {
        console.log('PayPal script loaded successfully');
        setScriptLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load PayPal script');
        setError('Failed to load PayPal. Please refresh the page.');
      };

      document.body.appendChild(script);
    };

    loadPayPalScript();

    return () => {
      // Cleanup script if component unmounts
      const scripts = document.querySelectorAll('script[src*="paypal.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && window.paypal && paypalRef.current && !userProfile?.isPro) {
      // Clear any existing PayPal buttons
      paypalRef.current.innerHTML = '';

      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          console.log('Creating PayPal order...');
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '9.99',
                currency_code: 'USD'
              },
              description: 'LinkVault Pro - Lifetime Access'
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            setLoading(true);
            setError('');
            console.log('PayPal payment approved:', data);

            // Capture the payment
            const details = await actions.order.capture();
            console.log('Payment captured:', details);

            if (details.status === 'COMPLETED') {
              // Update user profile in Firestore
              console.log('Updating user profile to Pro...');
              await updateDoc(doc(db, 'users', user!.uid), {
                isPro: true,
                updatedAt: Timestamp.now(),
                paypalOrderId: data.orderID,
                paypalPayerId: data.payerID,
                upgradeDate: Timestamp.now()
              });

              // Update local state
              await updateUserProfile({ isPro: true });

              setSuccess('🎉 Welcome to LinkVault Pro! Your account has been upgraded successfully.');
              console.log('User successfully upgraded to Pro');
            } else {
              throw new Error('Payment was not completed');
            }
          } catch (error) {
            console.error('Error processing payment:', error);
            setError('Payment was successful but there was an error upgrading your account. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          setError('There was an error processing your payment. Please try again.');
          setLoading(false);
        },
        onCancel: (data: any) => {
          console.log('PayPal payment cancelled:', data);
          setError('Payment was cancelled. You can try again anytime.');
          setLoading(false);
        },
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 45
        }
      }).render(paypalRef.current);
    }
  }, [scriptLoaded, user, userProfile, updateUserProfile]);

  if (!user || !userProfile) {
    return null;
  }

  // If user is already Pro
  if (userProfile.isPro) {
    return (
      <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
            <Crown className="w-6 h-6 mr-2 text-yellow-600" />
            LinkVault Pro
          </CardTitle>
          <CardDescription className="text-yellow-700 dark:text-yellow-300">
            You're already a Pro user! Enjoy all premium features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
              <Star className="w-3 h-3 mr-1" />
              Pro Member
            </Badge>
            <span className="text-sm text-yellow-700 dark:text-yellow-300">
              Upgraded on {userProfile.createdAt?.toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pro Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="w-6 h-6 mr-2 text-yellow-600" />
            Upgrade to LinkVault Pro
          </CardTitle>
          <CardDescription>
            Unlock premium features and take your bio link to the next level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                Pro Features
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Unlimited links
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Custom themes
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Priority AI suggestions
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Remove LinkVault branding
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Priority support
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  $9.99
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  One-time payment • Lifetime access
                </p>
                <div className="flex items-center justify-center space-x-1 text-xs text-green-600 dark:text-green-400">
                  <Shield className="w-3 h-3" />
                  <span>Secure PayPal checkout</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Section */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Upgrade</CardTitle>
          <CardDescription>
            Pay securely with PayPal to unlock all Pro features instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Processing your upgrade...</span>
            </div>
          )}

          {!scriptLoaded && !error && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Loading PayPal...</span>
            </div>
          )}

          {scriptLoaded && !loading && !success && (
            <div>
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>💡 What happens next:</strong>
                </p>
                <ol className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                  <li>1. Click the PayPal button below</li>
                  <li>2. Complete secure payment ($9.99 USD)</li>
                  <li>3. Your account is instantly upgraded to Pro</li>
                  <li>4. Enjoy all premium features immediately!</li>
                </ol>
              </div>
              
              <div ref={paypalRef} id="paypal-button-container"></div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                Powered by PayPal • Secure checkout • 30-day money-back guarantee
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}