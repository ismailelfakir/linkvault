'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  LogOut, 
  Settings, 
  Plus, 
  BarChart3, 
  Link as LinkIcon,
  Users,
  Eye
} from 'lucide-react';

export default function DashboardPage() {
  const { user, userProfile, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LV</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {userProfile.displayName}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your bio links and track performance
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  No links created yet
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  No clicks recorded
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  No views yet
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  No followers yet
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Your Bio Link Page</CardTitle>
                <CardDescription>
                  This is how your bio link page will appear to visitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 max-w-sm mx-auto">
                    <div className="text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback className="text-lg">
                          {getInitials(userProfile.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {userProfile.displayName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {userProfile.bio || 'Add a bio to tell visitors about yourself'}
                      </p>
                      <div className="space-y-3">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-gray-500 dark:text-gray-400 text-sm">
                          No links added yet
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback>
                      {getInitials(userProfile.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userProfile.displayName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {userProfile.email}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Theme</span>
                    <Badge variant="secondary">{userProfile.theme || 'Default'}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Member since</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {userProfile.createdAt?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get started with these common tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Plus className="w-6 h-6" />
                  <span>Add Link</span>
                  <span className="text-xs text-gray-500">Create your first bio link</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Settings className="w-6 h-6" />
                  <span>Customize Theme</span>
                  <span className="text-xs text-gray-500">Change colors and layout</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <BarChart3 className="w-6 h-6" />
                  <span>View Analytics</span>
                  <span className="text-xs text-gray-500">Track your performance</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}