import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { surname, address, country, city, zip, userId, email, phone } = body;

  console.log(body.userId);
  
  let profile = await prisma.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  if (profile) {


    // Profile already exists, update it
    profile = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        surname: surname || profile.surname,
        address: address || profile.address,
        country: country || profile.country,
        city: city || profile.city,
        zip: zip || profile.zip,
        phone: phone || profile.phone,
        email: email || profile.email,
      },
    });
  } else {
    // Profile doesn't exist, create a new one
    profile = await prisma.profile.create({
      data: {
        surname: surname || null,
        address: address || null,
        country: country || null,
        city: city || null,
        zip: zip || null,
        userId: body.userId,
        phone: body.phone || null,
      },
    });
  }

  return NextResponse.json(profile);
}
