import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, description, imageSrc, category, address, city, country, zipCode, phone, email } = body;

    const existingItem = await prisma.store.findFirst({
      where: {
        userId: userId,
      },
    });

    const nameTaken = await prisma.store.findFirst({
      where: {
        name: name,
      },
    });

    if (nameTaken) {
      console.log('name taken');
      return NextResponse.json({
        status: 402,
        body: {
          message: '100',
        },
      });
    }

    if (existingItem) {
      console.log('already have a store');
      return NextResponse.json({
        status: 401,
        body: {
          message: '101',
        },
      });
    }

    const store = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        imageSrc,
        category,
        address,
        city,
        country,
        zipCode,
        phone,
        email,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error('Error creating store:', error);
    // Return an appropriate error response if needed.
    return NextResponse.error();
  }
}
