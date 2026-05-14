import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { bookingSchema } from '@/lib/schemas';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validationResult = bookingSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { service, date, time, fullName, email, phone, budget, message } = validationResult.data;

    // 1. Create a lead first
    const { data: leadData, error: leadError } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          project_type: service,
          budget_range: budget,
          message: `Booking message: ${message || 'No additional details provided.'}`,
          source: 'booking',
          status: 'new',
        },
      ])
      .select()
      .single();

    if (leadError) {
      console.error('Supabase error inserting lead for booking:', leadError);
      return NextResponse.json(
        { error: 'Failed to create lead for booking' },
        { status: 500 }
      );
    }

    // Combine date and time for scheduled_at
    // Assumes date is YYYY-MM-DD and time is like "10:30 AM"
    // Since this is a simple implementation, we'll store the time string as well in admin_notes 
    // or just construct a valid Date object if possible.
    const scheduledAt = new Date(`${date} ${time}`);

    // 2. Create the appointment
    const { data: appointmentData, error: appointmentError } = await supabaseAdmin
      .from('appointments')
      .insert([
        {
          lead_id: leadData.id,
          full_name: fullName,
          email,
          phone,
          service_type: service,
          scheduled_at: isNaN(scheduledAt.getTime()) ? new Date().toISOString() : scheduledAt.toISOString(),
          budget_range: budget,
          admin_notes: `Requested Time: ${time} on ${date}`,
          status: 'confirmed',
        },
      ])
      .select();

    if (appointmentError) {
      console.error('Supabase error inserting appointment:', appointmentError);
      return NextResponse.json(
        { error: 'Failed to submit appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Appointment booked successfully!', data: appointmentData },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in /api/appointments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
