import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, company, role, useCase, source } = body

    // Validate required fields
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          company: company?.trim() || null,
          role: role?.trim() || null,
          use_case: useCase?.trim() || null,
          source: source || 'landing_page',
          status: 'new',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 409 }
        )
      }
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, lead: data?.[0] },
      { status: 201 }
    )
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}