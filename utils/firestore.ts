import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// User Profile Types
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  username?: string;
  bio?: string;
  avatar?: string;
  theme?: string;
  customDomain?: string;
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Link Types
export interface Link {
  id?: string;
  userId: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  order: number;
  clicks: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Analytics Types
export interface ClickEvent {
  id?: string;
  linkId: string;
  userId: string;
  timestamp: Timestamp;
  userAgent?: string;
  referrer?: string;
  country?: string;
  city?: string;
}

// User Profile Functions
export const createUserProfile = async (profileData: Omit<UserProfile, 'createdAt' | 'updatedAt'>) => {
  try {
    const userRef = doc(db, 'users', profileData.uid);
    const userData = {
      ...profileData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    await setDoc(userRef, userData);
    return userData;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', uid);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now(),
    };
    
    await updateDoc(userRef, updateData);
    return updateData;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Link Functions
export const createLink = async (linkData: Omit<Link, 'id' | 'createdAt' | 'updatedAt' | 'clicks'>) => {
  try {
    console.log('🔗 Creating link with data:', linkData);
    const linksRef = collection(db, 'links');
    const newLink = {
      ...linkData,
      clicks: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    console.log('🔗 Prepared link data:', newLink);
    const docRef = await addDoc(linksRef, newLink);
    console.log('🔗 Link created with ID:', docRef.id);
    
    const createdLink = { id: docRef.id, ...newLink };
    console.log('🔗 Returning created link:', createdLink);
    return createdLink;
  } catch (error) {
    console.error('Error creating link:', error);
    console.error('Error details:', error.message);
    throw error;
  }
};

export const getUserLinks = async (userId: string): Promise<Link[]> => {
  try {
    console.log('🔗 getUserLinks called with userId:', userId);
    const linksRef = collection(db, 'links');
    const q = query(
      linksRef, 
      where('userId', '==', userId),
      orderBy('order', 'asc')
    );
    
    console.log('🔗 Executing Firestore query...');
    const querySnapshot = await getDocs(q);
    console.log('🔗 Query completed, docs found:', querySnapshot.size);
    const links: Link[] = [];
    
    querySnapshot.forEach((doc) => {
      console.log('🔗 Processing doc:', doc.id, doc.data());
      links.push({ id: doc.id, ...doc.data() } as Link);
    });
    
    console.log('🔗 Final links array:', links);
    return links;
  } catch (error) {
    console.error('Error getting user links:', error);
    console.error('❌ Error details:', error.message);
    console.error('❌ Error code:', error.code);
    throw error;
  }
};

export const updateLink = async (linkId: string, updates: Partial<Link>) => {
  try {
    const linkRef = doc(db, 'links', linkId);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now(),
    };
    
    await updateDoc(linkRef, updateData);
    return updateData;
  } catch (error) {
    console.error('Error updating link:', error);
    throw error;
  }
};

export const deleteLink = async (linkId: string) => {
  try {
    const linkRef = doc(db, 'links', linkId);
    await deleteDoc(linkRef);
  } catch (error) {
    console.error('Error deleting link:', error);
    throw error;
  }
};

// Analytics Functions
export const recordClick = async (linkId: string, userId: string, metadata?: Partial<ClickEvent>) => {
  try {
    console.log('🔥 Recording click for link:', linkId, 'user:', userId);
    const clicksRef = collection(db, 'clicks');
    const clickData = {
      linkId,
      userId,
      timestamp: Timestamp.now(),
      ...metadata,
    };
    
    console.log('🔥 Click data:', clickData);
    await addDoc(clicksRef, clickData);
    console.log('🔥 Click recorded in Firestore');
    
    // Update link click count
    const linkRef = doc(db, 'links', linkId);
    const linkSnap = await getDoc(linkRef);
    
    if (linkSnap.exists()) {
      const currentClicks = linkSnap.data().clicks || 0;
      console.log('🔥 Updating link click count from', currentClicks, 'to', currentClicks + 1);
      await updateDoc(linkRef, { clicks: currentClicks + 1 });
      console.log('🔥 Link click count updated successfully');
    }
    
    return clickData;
  } catch (error) {
    console.error('Error recording click:', error);
    throw error;
  }
};

export const getUserAnalytics = async (userId: string, days: number = 30) => {
  try {
    console.log('📊 Getting analytics for user:', userId, 'for', days, 'days');
    const clicksRef = collection(db, 'clicks');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    console.log('📊 Fetching clicks since:', startDate);
    
    const q = query(
      clicksRef,
      where('userId', '==', userId),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const clicks: ClickEvent[] = [];
    
    querySnapshot.forEach((doc) => {
      clicks.push({ id: doc.id, ...doc.data() } as ClickEvent);
    });
    
    console.log('📊 Found', clicks.length, 'clicks');
    return clicks;
  } catch (error) {
    console.error('Error getting user analytics:', error);
    console.error('❌ Analytics error details:', error.message);
    throw error;
  }
};

// Public Profile Functions
export const getPublicProfile = async (username: string): Promise<{ profile: UserProfile; links: Link[] } | null> => {
  try {
    console.log('🔍 Looking for username:', username);
    
    // First try to find by username field
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);
    
    console.log('📊 Username query results:', querySnapshot.size);
    
    if (querySnapshot.empty) {
      console.log('❌ No profile found for username:', username);
      return null;
    }
    
    const userDoc = querySnapshot.docs[0];
    const profile = { ...userDoc.data() } as UserProfile;
    
    console.log('✅ Found profile:', profile);
    
    // Check if profile is public
    if (!profile.isPublic) {
      console.log('❌ Profile is not public');
      return null;
    }
    
    // Get user's active links
    console.log('🔗 Loading links for user:', profile.uid);
    let links: Link[] = [];
    try {
      links = await getUserLinks(profile.uid);
    } catch (linkError) {
      console.error('❌ Error loading links, continuing with empty array:', linkError);
      links = [];
    }
    console.log('📋 Found links:', links);
    const activeLinks = links.filter(link => link.isActive);
    console.log('✅ Active links:', activeLinks);
    
    return { profile, links: activeLinks };
  } catch (error) {
    console.error('❌ Error getting public profile:', error);
    console.error('❌ Error details:', error.message);
    return null;
  }
};