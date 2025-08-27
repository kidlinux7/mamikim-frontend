// app/api/chat/route.ts (App Router) OR pages/api/chat.js (Pages Router)
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Check if API key exists
    if (!process.env.NEXT_PUBLIC_OPEN_AI_KEYS) {
      console.error('OpenAI API key is missing')
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }



    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_KEYS}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 100,
        temperature: 0.7,
      })
    })

    const data = await res.json()
    
    if (data.error) {
      console.error('OpenAI API Error:', data.error)
      
      // Check if it's a quota error
      if (data.error.message?.includes('quota') || data.error.message?.includes('billing')) {
        return NextResponse.json({
          reply: {
            content: "I'm currently experiencing high demand due to API quota limits. Please try again later or contact support to resolve this issue. In the meantime, you can explore our courses at /courses for self-paced learning."
          }
        })
      }
      
      return NextResponse.json(
        { error: data.error.message || 'Failed to get response from AI' },
        { status: 500 }
      )
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected OpenAI response format:', data)
      return NextResponse.json(
        { error: 'Unexpected response format from AI' },
        { status: 500 }
      )
    }

    const reply = data.choices[0].message

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
