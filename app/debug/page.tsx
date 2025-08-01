'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DebugPage() {
  const { user, userProfile } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allLinks, setAllLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAllData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Get all users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const users: any[] = [];
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setAllUsers(users);
      
      // Get all links
      const linksSnapshot = await getDocs(collection(db, 'links'));
      const links: any[] = [];
      linksSnapshot.forEach((doc) => {
        links.push({ id: doc.id, ...doc.data() });
      });
      setAllLinks(links);
      
      console.log('All users:', users);
      console.log('All links:', links);
      console.log('Current user profile:', userProfile);
      
    } catch (error) {
      console.error('Error loading debug data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkCurrentUser = async () => {
    if (!user) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      console.log('Current user document exists:', userDoc.exists());
      console.log('Current user document data:', userDoc.data());
    } catch (error) {
      console.error('Error checking current user:', error);
    }
  };

  const testPublicProfile = async () => {
    try {
      console.log('🧪 Testing public profile lookup...');
      const { getPublicProfile } = await import('@/utils/firestore');
      
      // Test with the exact username from your profile
      const testUsername = userProfile?.username || 'ismailelfakir';
      console.log('🧪 Testing with username:', testUsername);
      
      const result = await getPublicProfile(testUsername);
      console.log('🧪 Test result:', result);
      
      if (result) {
        console.log('✅ Profile found successfully!');
        console.log('👤 Profile:', result.profile);
        console.log('🔗 Links:', result.links);
      } else {
        console.log('❌ Profile not found or error occurred');
      }
    } catch (error) {
      console.error('🧪 Test error:', error);
    }
  };

  const testLinkCreation = async () => {
    if (!user) {
      console.log('❌ No user logged in');
      return;
    }

    try {
      console.log('🧪 Testing link creation...');
      const { createLink } = await import('@/utils/firestore');
      
      const testLinkData = {
        userId: user.uid,
        title: 'Test Link',
        url: 'https://example.com',
        description: 'This is a test link',
        icon: 'globe',
        isActive: true,
        order: 0,
      };
      
      console.log('🔗 Creating test link with data:', testLinkData);
      const createdLink = await createLink(testLinkData);
      console.log('✅ Test link created successfully:', createdLink);
      
      // Reload all data to see the new link
      await loadAllData();
      
    } catch (error) {
      console.error('❌ Test link creation failed:', error);
      console.error('❌ Error details:', error.message);
      console.error('❌ Error code:', error.code);
    }
  };

  if (!user) {
    return <div>Please log in to view debug info</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <Button onClick={loadAllData} disabled={loading}>
                {loading ? 'Loading...' : 'Load All Data'}
              </Button>
              <Button onClick={checkCurrentUser} variant="outline">
                Check Current User
              </Button>
              <Button onClick={testPublicProfile} variant="secondary">
                Test Profile Lookup
              </Button>
              <Button onClick={() => {
                const url = `/${userProfile?.username || 'ismailelfakir'}`;
                console.log('🌐 Opening profile page:', url);
                window.open(url, '_blank');
              }} variant="secondary">
                Test Profile Page
              </Button>
              <Button onClick={testLinkCreation} variant="destructive">
                Test Link Creation
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Current User Profile</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto">
                  {JSON.stringify(userProfile, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Firebase User</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto">
                  {JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                  }, null, 2)}
                </pre>
              </div>
            </div>
            
            {allUsers.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">All Users ({allUsers.length})</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(allUsers, null, 2)}
                </pre>
              </div>
            )}
            
            {allLinks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">All Links ({allLinks.length})</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(allLinks, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}