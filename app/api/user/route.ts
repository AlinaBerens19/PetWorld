import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, image, email, phone } = body;

  console.log(body.id);
  
  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {


    // Profile already exists, update it
    user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: name || user.name,
        image: image || user.image,
        phone: phone || user.phone,
        email: email || user.email,
      },
    });
  } 

  return NextResponse.json(user);
}
