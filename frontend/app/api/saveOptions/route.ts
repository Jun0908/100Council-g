// app/api/saveOptions/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, options } = body;

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    if (!options) {
      return NextResponse.json({ message: 'Options are required' }, { status: 400 });
    }

    console.log('Saving options for user:', userId, options);

    // 保存処理（例: Vercel KV）
    // await kv.set(userId, JSON.stringify(options), { ex: 1800 });

    return NextResponse.json({ message: 'Options saved successfully' });
  } catch (error) {
    console.error('Error saving options:', error);
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
