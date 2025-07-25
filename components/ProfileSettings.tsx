'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, User, Globe, Eye, EyeOff } from 'lucide-react';

export default function ProfileSettings() {
  const { user, userProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    username: userProfile?.username || '',
    bio: userProfile?.bio || '',
    isPublic: userProfile?.isPublic ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'username' ? value.toLowerCase().replace(/[^a-z0-9]/g, '') : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validate username
      if (formData.username && formData.username.length < 3) {
        setError('Username must be at least 3 characters long');
        return;
      }

      await updateUserProfile({
        displayName: formData.displayName,
        username: formData.username,
        bio: formData.bio,
        isPublic: formData.isPublic,
      });

      setSuccess('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!userProfile) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your public profile information and privacy settings
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="text-lg">
                  {getInitials(userProfile.displayName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" disabled>
                  <User className="w-4 h-4 mr-2" />
                  Change Photo (Coming Soon)
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  Profile photo upload will be available soon
                </p>
              </div>
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
              <p className="text-xs text-gray-500">
                This is how your name appears on your profile
              </p>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">linkvault.com/</span>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="yourusername"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                Your unique URL. Only lowercase letters and numbers allowed.
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell visitors about yourself..."
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500">
                {formData.bio.length}/160 characters
              </p>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Profile</Label>
                  <p className="text-sm text-gray-500">
                    Make your profile visible to everyone
                  </p>
                </div>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isPublic: checked }))
                  }
                />
              </div>
              
              {formData.isPublic && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800 dark:text-green-200">
                      Your profile is public at: /{formData.username || 'yourusername'}
                    </span>
                  </div>
                </div>
              )}
              
              {!formData.isPublic && (
                <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Your profile is private and not accessible to others
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}