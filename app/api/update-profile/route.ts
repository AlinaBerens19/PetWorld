import prisma from '@/app/libs/prismadb';
import { Response, Request } from 'express';
// import prisma and any other necessary dependencies

export default async function handler(req: Request, res: Response) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    const { user, profile } = req.body;
  
    try {
      let updatedUser = null;
      let updatedProfile = null;
  
      // Update user data
      if (user) {
        const { name, image, email, phone } = user;
        updatedUser = await prisma.user.update({
          where: { email: email },
          data: {
            name: name,
            image: image,
            phone: phone,
          },
        });
      }
  
      // Update profile data
      if (profile) {
        const {
          surname,
          address,
          country,
          city,
          zip,
          userId,
        } = profile;
        updatedProfile = await prisma.profile.upsert({
          where: { userId: userId },
          update: {
            surname: surname,
            address: address,
            country: country,
            city: city,
            zip: zip,
          },
          create: {
            surname: surname,
            address: address,
            country: country,
            city: city,
            zip: zip,
            userId: userId,
          },
        });
      }
  
      // Return the updated user and profile data
      res.status(200).json({ user: updatedUser, profile: updatedProfile });
    } catch (error) {
      console.error("Error updating user and profile:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
  