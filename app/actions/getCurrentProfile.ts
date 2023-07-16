
import prisma from "@/app/libs/prismadb";


export async function getCurrentProfile(userId?: string) {
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                userId
            },
            include: {
                user: true
            }
        });

        if (!profile) {
            return null;
        }

        return profile;
    }
    catch (error) {
        return null;
    }
}