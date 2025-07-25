'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPublicProfile, recordClick } from '@/utils/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Loader2,
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
  Heart,
  User
} from 'lucide-react';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  username?: string;
  bio?: string;
  avatar?: string;
  theme?: string;
  isPublic: boolean;
  createdAt: any;
  updatedAt: any;
}

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
  { value: 'globe', icon: Globe },
  { value: 'youtube', icon: Youtube },
  { value: 'instagram', icon: Instagram },
  { value: 'twitter', icon: Twitter },
  { value: 'linkedin', icon: Linkedin },
  { value: 'github', icon: Github },
  { value: 'mail', icon: Mail },
  { value: 'phone', icon: Phone },
  { value: 'shopping', icon: ShoppingCart },
  { value: 'book', icon: BookOpen },
  { value: 'music', icon: Music },
  { value: 'camera', icon: Camera },
  { value: 'heart', icon: Heart },
];

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [clickingLinkId, setClickingLinkId] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      loadPublicProfile();
    }
  }, [username]);

  const loadPublicProfile = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      
      console.log('🚀 Loading public profile for username:', username);
      
      const profileData = await getPublicProfile(username);
      console.log('📦 Profile data received:', profileData);
      
      if (!profileData) {
        console.log('❌ No profile data found, setting notFound to true');
        setNotFound(true);
        return;
      }
      
      console.log('✅ Setting profile and links');
      console.log('👤 Profile:', profileData.profile);
      console.log('🔗 Links:', profileData.links);
      setProfile(profileData.profile);
      setLinks(profileData.links);
    } catch (error) {
      console.error('❌ Error loading public profile:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (link: Link) => {
    if (!link.id) return;
    
    try {
      setClickingLinkId(link.id);
      
      console.log('Recording click for link:', link.id);
      
      // Record the click
      await recordClick(link.id, link.userId, {
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
      
      console.log('Click recorded successfully');
      
      // Update local click count
      setLinks(prev => prev.map(l => 
        l.id === link.id 
          ? { ...l, clicks: l.clicks + 1 }
          : l
      ));
      
      // Open link in new tab
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error recording click:', error);
      // Still open the link even if click recording fails
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } finally {
      setClickingLinkId(null);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : Globe;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Profile Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The profile "@{username}" doesn't exist or is not public.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Go to LinkVault
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">LV</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">LinkVault</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/'}
              className="text-xs"
            >
              Create Your Own
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-purple-100 dark:ring-purple-900/50">
                <AvatarImage src={profile.avatar} alt={profile.displayName} />
                <AvatarFallback className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  {getInitials(profile.displayName)}
                </AvatarFallback>
              </Avatar>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {profile.displayName}
              </h1>
              
              {profile.username && (
                <p className="text-purple-600 dark:text-purple-400 mb-3">
                  @{profile.username}
                </p>
              )}
              
              {profile.bio && (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Links */}
            <div className="space-y-4">
              {links.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No links available yet
                  </p>
                </div>
              ) : (
                links.map((link) => {
                  const IconComponent = getIconComponent(link.icon || 'globe');
                  const isClicking = clickingLinkId === link.id;
                  
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link)}
                      disabled={isClicking}
                      className="w-full group relative overflow-hidden"
                    >
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-purple-300 dark:hover:border-purple-600 group-active:scale-[0.98]">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            {isClicking ? (
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            ) : (
                              <IconComponent className="w-6 h-6 text-white" />
                            )}
                          </div>
                          
                          <div className="flex-1 text-left min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 truncate">
                              {link.title}
                            </h3>
                            {link.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {link.description}
                              </p>
                            )}
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {link.clicks} clicks
                              </Badge>
                            </div>
                          </div>
                          
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200 flex-shrink-0" />
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Powered by LinkVault
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/'}
                className="text-xs"
              >
                Create Your Bio Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}