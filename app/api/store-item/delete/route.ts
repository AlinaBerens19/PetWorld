// Assuming you have proper type definitions for your Prisma models and the request object.

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const url = req.url
    const id = url.split('=').pop();
    console.log('id:', id);

    // Check if the id is a valid identifier (integer or UUID, depending on your schema)
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    // Check if the item exists before attempting to delete it
    const existingItem = await prisma.storeItem.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const deletedStoreItem = await prisma.storeItem.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(deletedStoreItem, { status: 200 });
  } catch (error) {
    console.error('Error deleting store item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
