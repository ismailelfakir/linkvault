'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Lock, Sparkles } from 'lucide-react';

interface ProFeatureGuardProps {
  children: React.ReactNode;
  feature: string;
  description?: string;
  showUpgrade?: boolean;
}

export default function ProFeatureGuard({ 
  children, 
  feature, 
  description,
  showUpgrade = true 
}: ProFeatureGuardProps) {
  const { userProfile } = useAuth();

  // If user is Pro, render the children
  if (userProfile?.isPro) {
    return <>{children}</>;
  }

  // If not Pro, show the locked feature message
  return (
    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-900/50">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {feature} - Pro Feature
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {description || `Upgrade to LinkVault Pro to unlock ${feature.toLowerCase()} and other premium features.`}
        </p>
        
        {showUpgrade && (
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        )}
        
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            <span>Unlimited links</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            <span>Premium themes</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            <span>Advanced analytics</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}