import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// ── IN-MEMORY RATE LIMITER (per-IP, 10 req/min) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT - 1 }
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT - record.count }
}

// ── CLEANUP STALE RATE LIMIT ENTRIES (every 5 min) ──
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip)
    }
  }
}, 5 * 60 * 1000).unref?.()

// ── ROUTE CONFIG ──
export const config = {
  runtime: 'nodejs',
  maxDuration: 30,
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // ── RATE LIMITING ──
    const ip =
      request.headers.get('x-forwarded-for') ??
      request.headers.get('x-real-ip') ??
      'unknown'
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait and try again.', retryAfter: 60 },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // ── REQUEST SIZE & TIMEOUT GUARD ──
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s max

    try {
      const body = await request.json()
      const { email, name, company, role, useCase, source } = body

      // ── VALIDATION ──
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return NextResponse.json(
          { error: 'Valid email is required' },
          { status: 400 }
        )
      }

      // Email length guard
      if (email.length > 254) {
        return NextResponse.json(
          { error: 'Email too long' },
          { status: 400 }
        )
      }

      // Sanitize string inputs
      const sanitize = (val: string | undefined): string | null => {
        if (!val || typeof val !== 'string') return null
        return val.trim().slice(0, 500)
      }

      // ── INSERT INTO SUPABASE ──
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            email: email.toLowerCase().trim(),
            name: sanitize(name),
            company: sanitize(company),
            role: sanitize(role),
            use_case: sanitize(useCase),
            source: sanitize(source) || 'landing_page',
            status: 'new',
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      clearTimeout(timeoutId)

      if (error) {
        // Handle duplicate email (PostgreSQL unique violation)
        if (error.code === '23505') {
          return NextResponse.json(
            { error: 'This email is already registered' },
            { status: 409 }
          )
        }
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'Failed to save lead' },
          { status: 503 }
        )
      }

      return NextResponse.json(
        { success: true, lead: data?.[0] },
        {
          status: 201,
          headers: {
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-Response-Time': `${Date.now() - startTime}ms`,
          },
        }
      )
    } catch (parseErr) {
      clearTimeout(timeoutId)
      if (controller.signal.aborted) {
        return NextResponse.json(
          { error: 'Request timeout' },
          { status: 504 }
        )
      }
      throw parseErr
    }
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
