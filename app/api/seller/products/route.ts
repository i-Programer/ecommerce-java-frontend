import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('http://localhost:4007/products', {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch data from Java API');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Server Error: ' + error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch('http://localhost:4007/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

     const data = await res.json();

    if (!res.ok) throw new Error('Failed to create data to Java API');
    
    return NextResponse.json(data);
  
  } catch (error) {
    return NextResponse.json({ message: 'Server Error: ' + error }, { status: 500 });
  }
}