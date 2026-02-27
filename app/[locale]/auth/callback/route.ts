import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSupabasePublicKey, getSupabaseUrl } from '@/lib/supabase/config';

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const locale = params.locale ?? 'en';
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ahjazlilanding-production.up.railway.app').replace(/\/$/, '');

  if (!code) {
    return NextResponse.redirect(new URL(`/${locale}/login?error=missing_code`, siteUrl));
  }

  const cookieStore = cookies();
  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabasePublicKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL(`/${locale}/login?error=oauth_exchange_failed`, siteUrl));
  }

  return NextResponse.redirect(new URL(`/${locale}/salles`, siteUrl));
}
