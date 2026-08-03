import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { projectBriefSchema } from '@/lib/schemas';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validationResult = projectBriefSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { 
      fullName, 
      businessName, 
      email, 
      phone, 
      projectType, 
      budget, 
      deadline, 
      referenceUrls, 
      message, 
      howFound 
    } = validationResult.data;

    const { error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          full_name: fullName,
          business_name: businessName,
          email,
          phone,
          project_type: projectType,
          budget_range: budget,
          deadline: deadline || null,
          reference_urls: referenceUrls,
          message,
          attribution: howFound,
          source: 'project_form',
          status: 'new',
        },
      ]);

    if (error) {
      console.error('Supabase error inserting project lead:', error);
      return NextResponse.json(
        { error: 'Failed to submit project requirements' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Project requirements submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in /api/leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
