import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { prompt, context } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Build the system prompt
    const systemPrompt = `You are a bio link expert who helps content creators optimize their link-in-bio pages for maximum conversions. 

Your task is to suggest 5 high-converting bio links based on the user's description. Each link should be actionable and drive engagement.

Return ONLY a valid JSON array with this exact format:
[
  {
    "title": "Join My Newsletter",
    "url": "https://example.com/newsletter",
    "description": "Get weekly tips and exclusive content",
    "icon": "mail"
  }
]

Available icons: globe, youtube, instagram, twitter, linkedin, github, mail, phone, shopping, book, music, camera, heart

Focus on:
- Clear, action-oriented titles
- Realistic URLs (use placeholder domains if needed)
- Compelling descriptions that encourage clicks
- Appropriate icons for each link type
- Mix of different link types (social, products, content, contact)`;

    // Build the user prompt
    const userPrompt = context 
      ? `Context: ${context}\n\nRequest: ${prompt}`
      : prompt;

    console.log('🤖 Calling OpenAI with prompt:', userPrompt);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using the latest efficient model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    console.log('🤖 OpenAI raw response:', response);

    // Parse the JSON response
    let suggestions;
    try {
      // Clean the response in case there's extra text
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : response;
      suggestions = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return NextResponse.json(
        { error: 'Invalid response format from AI' },
        { status: 500 }
      );
    }

    // Validate the response format
    if (!Array.isArray(suggestions)) {
      return NextResponse.json(
        { error: 'AI response is not an array' },
        { status: 500 }
      );
    }

    // Sanitize and validate each suggestion
    const validatedSuggestions = suggestions
      .filter(item => item && typeof item === 'object')
      .map(item => ({
        title: String(item.title || '').slice(0, 100),
        url: String(item.url || '').slice(0, 500),
        description: String(item.description || '').slice(0, 200),
        icon: String(item.icon || 'globe').slice(0, 20)
      }))
      .filter(item => item.title && item.url)
      .slice(0, 5); // Limit to 5 suggestions

    console.log('✅ Validated suggestions:', validatedSuggestions);

    return NextResponse.json({
      suggestions: validatedSuggestions,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `AI service error: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}