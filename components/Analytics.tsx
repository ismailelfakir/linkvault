'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserAnalytics, getUserLinks } from '@/utils/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Clock, 
  ExternalLink,
  RefreshCw,
  Calendar,
  MousePointer
} from 'lucide-react';
import { format } from 'date-fns';

interface ClickEvent {
  id?: string;
  linkId: string;
  userId: string;
  timestamp: any;
  userAgent?: string;
  referrer?: string;
  country?: string;
  city?: string;
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

interface LinkAnalytics {
  linkId: string;
  title: string;
  url: string;
  totalClicks: number;
  recentClicks: number;
  lastClicked?: Date;
  clicksToday: number;
  clicksThisWeek: number;
}

export default function Analytics() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [analytics, setAnalytics] = useState<LinkAnalytics[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalClicksToday, setTotalClicksToday] = useState(0);
  const [totalClicksThisWeek, setTotalClicksThisWeek] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('📊 Loading analytics for user:', user!.uid);
      
      // Get user's links
      const links = await getUserLinks(user!.uid);
      console.log('📊 User links:', links);
      
      // Get click events for the past 30 days
      const clicks = await getUserAnalytics(user!.uid, 30);
      console.log('📊 Click events:', clicks);
      
      // Process analytics data
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const linkAnalytics: LinkAnalytics[] = links.map(link => {
        const linkClicks = clicks.filter(click => click.linkId === link.id);
        const clicksToday = linkClicks.filter(click => {
          const clickDate = click.timestamp.toDate();
          return clickDate >= today;
        }).length;
        
        const clicksThisWeek = linkClicks.filter(click => {
          const clickDate = click.timestamp.toDate();
          return clickDate >= thisWeek;
        }).length;
        
        const lastClick = linkClicks.length > 0 
          ? linkClicks[0].timestamp.toDate() 
          : undefined;
        
        return {
          linkId: link.id!,
          title: link.title,
          url: link.url,
          totalClicks: link.clicks || 0,
          recentClicks: linkClicks.length,
          lastClicked: lastClick,
          clicksToday,
          clicksThisWeek,
        };
      });
      
      // Sort by total clicks descending
      linkAnalytics.sort((a, b) => b.totalClicks - a.totalClicks);
      
      // Calculate totals
      const totalClicks = linkAnalytics.reduce((sum, link) => sum + link.totalClicks, 0);
      const totalClicksToday = linkAnalytics.reduce((sum, link) => sum + link.clicksToday, 0);
      const totalClicksThisWeek = linkAnalytics.reduce((sum, link) => sum + link.clicksThisWeek, 0);
      
      setAnalytics(linkAnalytics);
      setTotalClicks(totalClicks);
      setTotalClicksToday(totalClicksToday);
      setTotalClicksThisWeek(totalClicksThisWeek);
      
      console.log('📊 Analytics processed:', {
        linkAnalytics,
        totalClicks,
        totalClicksToday,
        totalClicksThisWeek
      });
      
    } catch (error) {
      console.error('Error loading analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your link performance and visitor insights</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Clicks</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalClicks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalClicksToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalClicksThisWeek}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Links</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics.filter(link => link.totalClicks > 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Link Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Link Performance
          </CardTitle>
          <CardDescription>
            Detailed analytics for each of your bio links
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Analytics Data Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create some links and share your profile to start seeing analytics
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {analytics.map((link) => (
                <div
                  key={link.linkId}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {link.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                        className="flex-shrink-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {link.url}
                    </p>
                    {link.lastClicked && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          Last clicked: {format(link.lastClicked, 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {link.totalClicks}
                      </p>
                      <p className="text-gray-500">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-green-600">
                        {link.clicksToday}
                      </p>
                      <p className="text-gray-500">Today</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-blue-600">
                        {link.clicksThisWeek}
                      </p>
                      <p className="text-gray-500">Week</p>
                    </div>
                    <Badge variant={link.totalClicks > 0 ? "default" : "secondary"}>
                      {link.totalClicks > 0 ? 'Active' : 'No clicks'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}