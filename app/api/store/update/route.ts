import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, description, imageSrc, category } = body;

    const store = await prisma.store.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!store) {
      console.log('no store');
      return NextResponse.error()
    }

    console.log('store', store);

    const updatedStore = await prisma.store.update({
      where: { id: store?.id },
      data: {
        name,
        description,
        imageSrc,
        category,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error('Error updating store item:', error);
    // Return an appropriate error response if needed.
    return NextResponse.error();
  }
}
