import prisma from "@/app/libs/prismadb";

interface IParams {
    saleId?: string
}

export default async function getPetForSaleById(
    params: IParams
) {
    const { saleId } = params;

    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: saleId
            },
            include: {
                author: true
            }
        });

        if (!listing) {
            return null;
        }

        const safeListing = {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.author,
                createdAt: listing.author.createdAt.toISOString(),
                updatedAt: listing.author.updatedAt.toISOString(),
                emailVerified:
                     listing.author.emailVerified?.toISOString() || null,
            }
        }

        return safeListing
        
    } catch (error) {
        throw error;
    }
}
