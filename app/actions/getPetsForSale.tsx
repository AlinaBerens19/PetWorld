import prisma from "@/app/libs/prismadb";
import { Listing } from "@prisma/client";

export default async function getPetsForSale() {
    try {
        const listings: Listing[] = await prisma.listing.findMany({
            // where: {
            //     category: 'Sale'
            // },
            orderBy: {
                createdAt: 'desc'
            },
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
