interface LinkSuggestion {
  title: string;
  url: string;
  description: string;
  icon: string;
}

interface SuggestionsResponse {
  suggestions: LinkSuggestion[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface SuggestionsError {
  error: string;
}

export async function getLinkSuggestions(
  prompt: string,
  context?: string
): Promise<LinkSuggestion[]> {
  try {
    console.log('🚀 Requesting AI suggestions for:', prompt);
    
    const response = await fetch('/api/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        context,
      }),
    });

    if (!response.ok) {
      const errorData: SuggestionsError = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data: SuggestionsResponse = await response.json();
    console.log('✅ Received AI suggestions:', data.suggestions);
    
    if (data.usage) {
      console.log('📊 Token usage:', data.usage);
    }

    return data.suggestions;
  } catch (error) {
    console.error('❌ Failed to get AI suggestions:', error);
    throw error;
  }
}

// Helper function to build context from user profile
export function buildUserContext(userProfile: any): string {
  const parts = [];
  
  if (userProfile?.displayName) {
    parts.push(`Name: ${userProfile.displayName}`);
  }
  
  if (userProfile?.bio) {
    parts.push(`Bio: ${userProfile.bio}`);
  }
  
  if (userProfile?.username) {
    parts.push(`Username: ${userProfile.username}`);
  }
  
  return parts.join('. ');
}

export type { LinkSuggestion, SuggestionsResponse };