import prisma from "@/app/libs/prismadb";
import { Listing } from "@prisma/client";


interface IParams {
    userId: string
}

export default async function getPetsByOwnerId(params: IParams) {
    try {

        const { userId } = params;
        
        if (!userId) {
            const listings: Listing[] = await prisma.listing.findMany({
                where: {
                    userId: userId
                },
                orderBy: {
                    createdAt: 'desc'
                },
            });

            const safeListings = listings.map((listing) => ({
                ...listing,
                createdAt: listing.createdAt.toISOString()
            }));

            return safeListings;
        }
        else
            console.log("No user id provided");
    } catch (error: any) {
        throw new Error(error);
    }
}
