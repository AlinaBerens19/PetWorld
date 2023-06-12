import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, surname, address, country, city, zip, userId, email, phone, image } = body;

  console.log(body.userId);
  
  let user = await prisma.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  if (user) {
    // Profile already exists, update it
    user = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        name: name || user.name,
        surname: surname || user.surname,
        address: address || user.address,
        country: country || user.country,
        city: city || user.city,
        zip: zip || user.zip,
        phone: phone || user.phone,
        email: email || user.email,
        image: image || user.image,
      },
    });
  } else {
    // Profile doesn't exist, create a new one
    user = await prisma.profile.create({
      data: {
        name: name || null,
        surname: surname || null,
        address: address || null,
        country: country || null,
        city: city || null,
        zip: zip || null,
        userId: body.userId,
        phone: body.phone || null,
        email: body.email || null,
        image: image || null,
      },
    });
  }

  return NextResponse.json(user);
}
