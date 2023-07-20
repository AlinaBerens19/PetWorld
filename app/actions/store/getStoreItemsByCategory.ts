import prisma from "@/app/libs/prismadb";


export default async function getStoreItemsByCategory(cat: string) {
  try {

    const category = cat.toLowerCase();

    const storeItems = await prisma.storeItem.findMany({
        where: {
            category: category,
        },
    });

    const safeStoreItems = storeItems?.map((storeItem) => {
        return {
            ...storeItem,
            createdAt: storeItem.createdAt.toISOString(),
            updatedAt: storeItem.updatedAt.toISOString(),
        };
    });

    return safeStoreItems;

  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
