import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, price, imageSrc, category, storeName } = body;

    const updatedStoreItem = await prisma.storeItem.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageSrc,
        category,
        storeName,
      },
    });

    return NextResponse.json(updatedStoreItem);
  } catch (error) {
    console.error('Error updating store item:', error);
    // Return an appropriate error response if needed.
    return NextResponse.error();
  }
}
