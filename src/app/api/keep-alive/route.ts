import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// This endpoint pings the Supabase database to prevent it from pausing
// due to inactivity on the free tier (pauses after 7 days of no activity).
// Called automatically by Vercel Cron every 5 days.

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Simple query to keep the database active
    const { data, error } = await supabase
      .from('services')
      .select('id')
      .limit(1);

    if (error) {
      return NextResponse.json(
        { status: 'error', message: error.message, timestamp: new Date().toISOString() },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase database is alive',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err.message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
