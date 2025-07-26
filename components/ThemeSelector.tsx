'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Crown, Lock, Palette, Check } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  preview: {
    background: string;
    accent: string;
    text: string;
  };
}

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and professional',
    isPremium: false,
    preview: {
      background: 'bg-white dark:bg-gray-900',
      accent: 'bg-purple-500',
      text: 'text-gray-900 dark:text-white'
    }
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Colorful gradient background',
    isPremium: true,
    preview: {
      background: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
      accent: 'bg-white',
      text: 'text-white'
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Cyberpunk-inspired dark theme',
    isPremium: true,
    preview: {
      background: 'bg-black',
      accent: 'bg-green-400',
      text: 'text-green-400'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean minimalist design',
    isPremium: true,
    preview: {
      background: 'bg-gray-50',
      accent: 'bg-gray-900',
      text: 'text-gray-900'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Calming blue gradient theme',
    isPremium: true,
    preview: {
      background: 'bg-gradient-to-br from-blue-400 to-teal-500',
      accent: 'bg-white',
      text: 'text-white'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and pink gradients',
    isPremium: true,
    preview: {
      background: 'bg-gradient-to-br from-orange-400 to-pink-500',
      accent: 'bg-white',
      text: 'text-white'
    }
  }
];

export default function ThemeSelector() {
  const { userProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const currentTheme = userProfile?.theme || 'default';

  const handleThemeSelect = async (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    // Check if theme is premium and user is not Pro
    if (theme.isPremium && !userProfile?.isPro) {
      setError('This is a premium theme. Upgrade to Pro to unlock all themes.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await updateUserProfile({ theme: themeId });
      setSuccess(`Theme changed to ${theme.name}!`);
    } catch (error) {
      console.error('Error updating theme:', error);
      setError('Failed to update theme. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Theme Selection
        </CardTitle>
        <CardDescription>
          Customize the appearance of your bio link page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => {
            const isSelected = currentTheme === theme.id;
            const isLocked = theme.isPremium && !userProfile?.isPro;
            
            return (
              <div key={theme.id} className="relative">
                <button
                  onClick={() => handleThemeSelect(theme.id)}
                  disabled={loading || isLocked}
                  className={`w-full p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    isSelected 
                      ? 'border-purple-500 ring-2 ring-purple-200' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  } ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {/* Theme Preview */}
                  <div className={`w-full h-20 rounded-md mb-3 relative overflow-hidden ${theme.preview.background}`}>
                    <div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${theme.preview.accent}`}></div>
                    <div className={`absolute top-2 right-2 w-8 h-1 rounded ${theme.preview.accent} opacity-60`}></div>
                    <div className={`absolute bottom-2 left-2 w-12 h-1 rounded ${theme.preview.accent} opacity-40`}></div>
                    <div className={`absolute bottom-2 right-2 w-6 h-1 rounded ${theme.preview.accent} opacity-40`}></div>
                  </div>
                  
                  {/* Theme Info */}
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {theme.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {theme.isPremium && (
                          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                            <Crown className="w-3 h-3 mr-1" />
                            Pro
                          </Badge>
                        )}
                        {isSelected && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {theme.description}
                    </p>
                  </div>
                </button>
                
                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                      <Lock className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {!userProfile?.isPro && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                  Unlock Premium Themes
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Get access to {themes.filter(t => t.isPremium).length} premium themes with Pro
                </p>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}