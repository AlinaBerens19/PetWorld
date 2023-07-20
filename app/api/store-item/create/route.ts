import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeId, name, description, price, imageSrc, category, storeName } = body;

    const storeItem = await prisma.storeItem.create({
      data: {
        storeId,
        name,
        description,
        price,
        imageSrc,
        category,
        storeName,
      },
    });

    return NextResponse.json(storeItem);
  } catch (error) {
    console.error('Error creating store item:', error);
    // Return an appropriate error response if needed.
    return NextResponse.error();
  }
}