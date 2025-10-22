import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

const COUNTER_ROW_ID = 1; // The single row in our table
const TABLE_NAME = 'fitnessedge_page_visits';
const COLUMN_NAME = 'count';

/**
 * POST: Increments the visit count and returns the new count.
 * This should be called once per session.
 */
export async function POST() {
  try {
    // 1. Call the 'increment' RPC function in Supabase
    // This atomically increments the count in the database
    const { data: rpcData, error: rpcError } = await supabase.rpc('increment', {
      table_name: TABLE_NAME,
      row_id: COUNTER_ROW_ID,
      column_name: COLUMN_NAME,
    });

    if (rpcError) {
      console.error('Supabase RPC error:', rpcError.message);
      return NextResponse.json(
        { error: 'Failed to increment count', details: rpcError.message },
        { status: 500 }
      );
    }

    // 2. Fetch the newly incremented value to be certain
    const { data: newData, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select(COLUMN_NAME)
      .eq('id', COUNTER_ROW_ID)
      .single();

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError.message);
      return NextResponse.json(
        { error: 'Failed to fetch new count', details: fetchError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: newData[COLUMN_NAME] });
  } catch (err) {
    const error = err as Error;
    console.error('Visit counter POST error:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET: Only fetches the current count without incrementing.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select(COLUMN_NAME)
      .eq('id', COUNTER_ROW_ID)
      .single();

    if (error) {
      console.error('Supabase GET error:', error.message);
      return NextResponse.json(
        { error: 'Failed to fetch count', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { count: data[COLUMN_NAME] },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0', // Never cache this
        },
      }
    );
  } catch (err) {
    const error = err as Error;
    console.error('Visit counter GET error:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}