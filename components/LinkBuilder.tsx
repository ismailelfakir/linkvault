'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createLink, getUserLinks, updateLink, deleteLink } from '@/utils/firestore';
import { getLinkSuggestions, buildUserContext, type LinkSuggestion } from '@/utils/openai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Loader2, 
  ExternalLink, 
  Edit, 
  Trash2, 
  GripVertical,
  Sparkles,
  Wand2,
  Crown,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Globe,
  Mail,
  Phone,
  ShoppingCart,
  BookOpen,
  Music,
  Camera,
  Heart
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

const iconOptions = [
  { value: 'globe', label: 'Website', icon: Globe },
  { value: 'youtube', label: 'YouTube', icon: Youtube },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'mail', label: 'Email', icon: Mail },
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'shopping', label: 'Shop', icon: ShoppingCart },
  { value: 'book', label: 'Blog', icon: BookOpen },
  { value: 'music', label: 'Music', icon: Music },
  { value: 'camera', label: 'Portfolio', icon: Camera },
  { value: 'heart', label: 'Support', icon: Heart },
];

export default function LinkBuilder() {
  const { user, userProfile } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [isAiSuggestOpen, setIsAiSuggestOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<LinkSuggestion[]>([]);
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    description: '',
    icon: 'globe'
  });

  useEffect(() => {
    if (user) {
      loadLinks();
    }
  }, [user]);

  const loadLinks = async () => {
    try {
      setLoading(true);
      console.log('Loading links for user:', user!.uid);
      const userLinks = await getUserLinks(user!.uid);
      console.log('Loaded links:', userLinks);
      setLinks(userLinks);
    } catch (error) {
      console.error('Error loading links:', error);
      setError('Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async () => {
    if (!user || !newLink.title || !newLink.url) return;

    // Check link limit for free users
    if (!userProfile?.isPro && links.length >= 5) {
      setShowLimitWarning(true);
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      console.log('Creating link:', newLink);

      // Validate URL format
      let url = newLink.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const linkData = {
        userId: user.uid,
        title: newLink.title,
        url: url,
        description: newLink.description,
        icon: newLink.icon,
        isActive: true,
        order: links.length,
      };

      console.log('📝 About to create link with data:', linkData);
      const createdLink = await createLink(linkData);
      console.log('Link created successfully:', createdLink);
      
      // Update local state immediately
      setLinks(prev => [...prev, createdLink]);
      console.log('📝 Updated local links state');
      
      // Reset form
      setNewLink({ title: '', url: '', description: '', icon: 'globe' });
      setIsAddLinkOpen(false);
      
      // Force reload links from database to ensure consistency
      console.log('📝 Reloading links from database...');
      await loadLinks();
    } catch (error) {
      console.error('Error creating link:', error);
      setError('Failed to create link');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAiSuggestions = async () => {
    if (!aiPrompt.trim()) return;

    try {
      setAiLoading(true);
      setError('');
      
      const context = userProfile ? buildUserContext(userProfile) : '';
      const suggestions = await getLinkSuggestions(aiPrompt, context);
      
      setAiSuggestions(suggestions);
      
      if (suggestions.length === 0) {
        setError('No suggestions received. Try a different prompt.');
      }
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      setError(error instanceof Error ? error.message : 'Failed to get AI suggestions');
    } finally {
      setAiLoading(false);
    }
  };

  const handleUseSuggestion = (suggestion: LinkSuggestion) => {
    setNewLink({
      title: suggestion.title,
      url: suggestion.url,
      description: suggestion.description,
      icon: suggestion.icon
    });
    setIsAiSuggestOpen(false);
    setIsAddLinkOpen(true);
  };

  const handleEditLink = async () => {
    if (!editingLink || !editingLink.title || !editingLink.url) return;

    try {
      setSubmitting(true);
      setError('');

      // Validate URL format
      let url = editingLink.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const updates = {
        title: editingLink.title,
        url: url,
        description: editingLink.description,
        icon: editingLink.icon,
      };

      await updateLink(editingLink.id!, updates);
      setLinks(prev => prev.map(link => 
        link.id === editingLink.id 
          ? { ...link, ...updates }
          : link
      ));
      setEditingLink(null);
    } catch (error) {
      console.error('Error updating link:', error);
      setError('Failed to update link');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    try {
      await deleteLink(linkId);
      setLinks(prev => prev.filter(link => link.id !== linkId));
    } catch (error) {
      console.error('Error deleting link:', error);
      setError('Failed to delete link');
    }
  };

  const toggleLinkStatus = async (linkId: string, isActive: boolean) => {
    try {
      await updateLink(linkId, { isActive });
      setLinks(prev => prev.map(link => 
        link.id === linkId 
          ? { ...link, isActive }
          : link
      ));
    } catch (error) {
      console.error('Error updating link status:', error);
      setError('Failed to update link status');
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : Globe;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
          <CardDescription>Loading your links...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Link Form */}
      <Card>
        <CardHeader>
          <CardTitle>Link Builder</CardTitle>
          <CardDescription>
            Create and manage your bio links
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-2">
            <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="flex-1" 
                  disabled={!userProfile?.isPro && links.length >= 5}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {!userProfile?.isPro && links.length >= 5 ? 'Link Limit Reached' : 'Add New Link'}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Link</DialogTitle>
                  <DialogDescription>
                    Create a new link for your bio page. Make sure to include the full URL.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., My YouTube Channel"
                      value={newLink.title}
                      onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">URL *</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com or example.com"
                      value={newLink.url}
                      onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="icon">Icon</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {iconOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setNewLink(prev => ({ ...prev, icon: option.value }))}
                            className={`p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
                              newLink.icon === option.value
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <IconComponent className="w-5 h-5 mx-auto" />
                            <span className="text-xs mt-1 block">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
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
                  <Button 
                    onClick={handleAddLink} 
                    disabled={!newLink.title || !newLink.url || submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Link'
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAiSuggestOpen} onOpenChange={setIsAiSuggestOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Suggest
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Wand2 className="w-5 h-5 mr-2 text-purple-500" />
                    AI Link Suggestions
                  </DialogTitle>
                  <DialogDescription>
                    Describe what you do or what links you need, and AI will suggest optimized bio links for you.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ai-prompt">What do you do? What links do you need?</Label>
                    <Textarea
                      id="ai-prompt"
                      placeholder="e.g., I'm a freelance photographer who posts reels on Instagram and sells Lightroom presets"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAiSuggestions}
                    disabled={!aiPrompt.trim() || aiLoading}
                    className="w-full"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting AI suggestions...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get Smart Suggestions
                      </>
                    )}
                  </Button>
                  
                  {aiSuggestions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                        AI Suggestions (click to use):
                      </h4>
                      {aiSuggestions.map((suggestion, index) => {
                        const IconComponent = getIconComponent(suggestion.icon);
                        return (
                          <button
                            key={index}
                            onClick={() => handleUseSuggestion(suggestion)}
                            className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                                  {suggestion.title}
                                </h5>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  {suggestion.description}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 truncate">
                                  {suggestion.url}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Link Limit Warning */}
          {!userProfile?.isPro && links.length >= 4 && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                    {links.length >= 5 ? 'Link Limit Reached' : 'Almost at your limit!'}
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    {links.length >= 5 
                      ? 'Free users can have up to 5 links. Upgrade to Pro for unlimited links.'
                      : `You have ${links.length}/5 links. Upgrade to Pro for unlimited links.`
                    }
                  </p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Links List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Links ({links.length})</CardTitle>
          <CardDescription>
            Manage and organize your bio links
          </CardDescription>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No links yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create your first bio link to get started
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setIsAddLinkOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Link
                </Button>
                <Button variant="outline" onClick={() => setIsAiSuggestOpen(true)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get AI Suggestions
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link) => {
                const IconComponent = getIconComponent(link.icon || 'globe');
                return (
                  <div
                    key={link.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {link.url}
                        </p>
                        {link.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                            {link.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant={link.isActive ? "default" : "secondary"}>
                        {link.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {link.clicks} clicks
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingLink(link)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLinkStatus(link.id!, !link.isActive)}
                      >
                        {link.isActive ? 'Hide' : 'Show'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLink(link.id!)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Link Dialog */}
      {editingLink && (
        <Dialog open={!!editingLink} onOpenChange={() => setEditingLink(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Link</DialogTitle>
              <DialogDescription>
                Update your link information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={editingLink.title}
                  onChange={(e) => setEditingLink(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-url">URL *</Label>
                <Input
                  id="edit-url"
                  value={editingLink.url}
                  onChange={(e) => setEditingLink(prev => prev ? { ...prev, url: e.target.value } : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-icon">Icon</Label>
                <div className="grid grid-cols-4 gap-2">
                  {iconOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setEditingLink(prev => prev ? { ...prev, icon: option.value } : null)}
                        className={`p-3 rounded-lg border-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          editingLink.icon === option.value
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mx-auto" />
                        <span className="text-xs mt-1 block">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  value={editingLink.description || ''}
                  onChange={(e) => setEditingLink(prev => prev ? { ...prev, description: e.target.value } : null)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingLink(null)}>
                Cancel
              </Button>
              <Button 
                onClick={handleEditLink} 
                disabled={!editingLink.title || !editingLink.url || submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Link'
                )}
              </Button>
            </div>
          ) : !userProfile?.isPro && links.length >= 5 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Link Limit Reached
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Free users can have up to 5 links. Upgrade to Pro for unlimited links and premium features.
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}