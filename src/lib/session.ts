"use server";

// lib/auth-cache.js
import { cache } from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

// Create a cached version of getSession using React's cache function
export const getSession = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    return session
  } catch (error) {
    console.error('Session validation error:', error)
    return null
  }
})