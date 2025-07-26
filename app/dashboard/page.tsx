'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserLinks } from '@/utils/firestore';
import { withAuth } from '@/components/withAuth';
import LinkBuilder from '@/components/LinkBuilder';
import Analytics from '@/components/Analytics';
import UpgradeToPro from '@/components/UpgradeToPro';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  Settings, 
  BarChart3, 
  Link as LinkIcon,
  Users,
  Eye,
  ExternalLink,
  Globe,
  Crown
} from 'lucide-react';

interface Link {
  id?: string;
  userId: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  order: number;
  clicks: number;
  createdAt: any;
  updatedAt: any;
}

function DashboardPage() {
  const { user, userProfile, logout } = useAuth();
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadLinks();
    }
  }, [user]);

  const loadLinks = async () => {
    try {
      setLoading(true);
      console.log('Dashboard loading links for user:', user!.uid);
      const userLinks = await getUserLinks(user!.uid);
      console.log('Dashboard loaded links:', userLinks);
      setLinks(userLinks);
    } catch (error) {
      console.error('Error loading links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
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

  // Ensure user and userProfile exist (withAuth should handle this, but extra safety)
  if (!user || !userProfile) {
    return null;
  }

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
                  Email: {userProfile.email}
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
          {/* Main Dashboard Content */}
          <Tabs defaultValue="links" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="links" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{links.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {links.length === 0 ? 'No links created yet' : `${links.filter(l => l.isActive).length} active`}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{links.reduce((sum, link) => sum + link.clicks, 0)}</div>
                    <p className="text-xs text-muted-foreground">
                      {links.length === 0 ? 'No clicks recorded' : 'Total link clicks'}
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
                    <CardTitle className="text-sm font-medium">Active Links</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{links.filter(l => l.isActive).length}</div>
                    <p className="text-xs text-muted-foreground">
                      Currently active
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Link Builder Component */}
              <LinkBuilder />
            </TabsContent>
            
            <TabsContent value="analytics">
              <Analytics />
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Manage your public profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback className="text-lg">
                          {getInitials(userProfile.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{userProfile.displayName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {userProfile.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</span>
                        <p className="text-sm">
                          {userProfile.bio || 'No bio added yet'}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</span>
                        <p className="text-sm">
                          {userProfile.createdAt?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Bio Link Preview</CardTitle>
                    <CardDescription>
                      This is how your page appears to visitors
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
                          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                            {userProfile.bio || 'Add a bio to tell visitors about yourself'}
                          </p>
                          <div className="space-y-3">
                            {links.filter(link => link.isActive).slice(0, 3).map((link) => (
                              <div key={link.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-gray-900 dark:text-white text-sm">
                                {link.title}
                              </div>
                            ))}
                            {links.filter(link => link.isActive).length === 0 && (
                              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-gray-500 dark:text-gray-400 text-sm">
                                Your links will appear here
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="space-y-6">
                {/* Upgrade to Pro Section */}
                <UpgradeToPro />
                
                {/* Account Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Active
                              </Badge>
                              {userProfile.isPro && (
                                <Badge className="bg-yellow-500 text-white">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Pro
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan</span>
                            <p className="text-sm mt-1">
                              {userProfile.isPro ? 'Pro (Lifetime)' : 'Free'}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme</span>
                            <p className="text-sm mt-1">{userProfile.theme || 'Default'}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile URL</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                /{userProfile.username || userProfile.displayName.toLowerCase().replace(/\s+/g, '')}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-auto p-0"
                                onClick={() => window.open(`/${userProfile.username || userProfile.displayName.toLowerCase().replace(/\s+/g, '')}`, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="destructive" onClick={handleLogout}>
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication
export default withAuth(DashboardPage);