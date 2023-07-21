import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";



export async function getTheStore(userId: string) {
    try {
        if(!userId) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if(!currentUser) {
            return null;
        }

        const store = await prisma.store.findFirst({
            where: {
                userId: currentUser?.id,
            },
        });

        if(!store) {
            return null;
        }

        const safeStore = {
            ...store,
            createdAt: store.createdAt.toISOString(),
            updatedAt: store.updatedAt.toISOString(),
        }

        return safeStore;
    }
    catch (error) {
        return null;
    }
}