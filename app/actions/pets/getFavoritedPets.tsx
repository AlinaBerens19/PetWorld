import prisma from "@/app/libs/prismadb";
import { SafeUser } from "../../types";

interface IParams {
  currentUser?: SafeUser | undefined | null;
}

export default async function getFavoritedPetsList(params: IParams) {
  try {
    const { currentUser } = params;

    const listings = await prisma.listing.findMany({
      where: {
        id: {
            in: currentUser?.favoriteIds
        }
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }));

    return safeListings;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
