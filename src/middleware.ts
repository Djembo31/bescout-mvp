import { type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Diese Middleware läuft bei fast jeder Anfrage an die App.
  const { supabase, response } = createClient(request)

  // Die wichtigste Zeile: Holt die aktuelle Session und aktualisiert das
  // Auth-Cookie, falls es abgelaufen ist. Das sorgt für eine nahtlose
  // und sichere Benutzererfahrung.
  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 