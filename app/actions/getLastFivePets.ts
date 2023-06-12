import prisma from "@/app/libs/prismadb";



export default async function getLastFivePets(params: string) {

    try {
        const listing = await prisma.listing.findMany({
            where: {
                kind: params
            },
            take: 4,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listing.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));

        return safeListings;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }

}