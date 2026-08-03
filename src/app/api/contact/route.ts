import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { contactSchema } from '@/lib/schemas';

// Initialize Supabase admin client (server-side only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { fullName, email, phone, projectType, budget, message } = validationResult.data;

    // Insert into leads table
    const { error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          project_type: projectType,
          budget_range: budget,
          message,
          source: 'contact_form',
          status: 'new',
        },
      ]);

    if (error) {
      console.error('Supabase error inserting contact lead:', error);
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      );
    }

    // TODO: Send email notification via Resend here if configured

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
