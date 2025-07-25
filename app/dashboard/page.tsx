'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from '@/components/withAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  LogOut, 
  Settings, 
  Plus, 
  BarChart3, 
  Link as LinkIcon,
  Users,
  Eye,
  ExternalLink
} from 'lucide-react';

function DashboardPage() {
  const { user, userProfile, logout } = useAuth();
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    description: ''
  });

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddLink = () => {
    // TODO: Implement link creation logic
    console.log('Adding new link:', newLink);
    setIsAddLinkOpen(false);
    setNewLink({ title: '', url: '', description: '' });
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
                  <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Link
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Link</DialogTitle>
                        <DialogDescription>
                          Create a new link for your bio page. Make sure to include the full URL.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            placeholder="e.g., My YouTube Channel"
                            value={newLink.title}
                            onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="url">URL</Label>
                          <Input
                            id="url"
                            placeholder="https://example.com"
                            value={newLink.url}
                            onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description (Optional)</Label>
                          <Textarea
                            id="description"
                            placeholder="Brief description of this link"
                            value={newLink.description}
                            onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddLinkOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddLink} disabled={!newLink.title || !newLink.url}>
                          Add Link
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Profile URL</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                      <Plus className="w-6 h-6" />
                      <span>Add Link</span>
                      <span className="text-xs text-gray-500">Create your first bio link</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Link</DialogTitle>
                      <DialogDescription>
                        Create a new link for your bio page.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-center py-4">
                      <p className="text-gray-600 dark:text-gray-400">Link creation form will be implemented in the next step.</p>
                    </div>
                  </DialogContent>
                </Dialog>
                
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

          {/* User Info Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
              <CardDescription>
                Your LinkVault account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</Label>
                    <p className="text-lg font-semibold">{userProfile.displayName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</Label>
                    <p className="text-lg">{userProfile.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</Label>
                    <p className="text-lg">{userProfile.createdAt?.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Quick Actions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account</p>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add New Link
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add New Link</DialogTitle>
                          <DialogDescription>
                            Create a new link for your bio page. Make sure to include the full URL.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="quick-title">Title</Label>
                            <Input
                              id="quick-title"
                              placeholder="e.g., My YouTube Channel"
                              value={newLink.title}
                              onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="quick-url">URL</Label>
                            <Input
                              id="quick-url"
                              placeholder="https://example.com"
                              value={newLink.url}
                              onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="quick-description">Description (Optional)</Label>
                            <Textarea
                              id="quick-description"
                              placeholder="Brief description of this link"
                              value={newLink.description}
                              onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddLinkOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddLink} disabled={!newLink.title || !newLink.url}>
                            Add Link
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication
export default withAuth(DashboardPage);

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