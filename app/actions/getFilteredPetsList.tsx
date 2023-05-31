import prisma from "@/app/libs/prismadb";

interface IParams {
  user_input: string[];
}

export default async function getFilteredPetsList(params: IParams) {
  try {
    const { user_input } = params;

    const listings = await prisma.listing.findMany({
      where: {
        AND: user_input
          ?.filter((input) => input !== 'all')
          .map((input) => ({
          console: console.log('INPUT ==> ', input),
          OR: [
            {
              kind: {
                contains: input,
                mode: 'insensitive'
              }
            },
            {
              breed: {
                contains: input,
                mode: 'insensitive'
              }
            },
            {
              category: {
                contains: input,
                mode: 'insensitive'
              }
            },
            {
              gender: {
                contains: input,
                mode: 'insensitive'
              }
            },
          ]
        }))
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
