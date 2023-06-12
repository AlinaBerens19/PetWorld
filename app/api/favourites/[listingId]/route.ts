import { getCurrentUser } from '@/app/actions/getServerSession';
import { NextResponse } from 'next/server'
import prisma from "@/app/libs/prismadb"


interface FavouritesRouteParams {
    listingId?: string
}

export async function POST(
    request: Request,
    {params}: {params: FavouritesRouteParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.redirect('/login');
    }

    const {listingId} = params;

    if (!listingId ||typeof listingId !== 'string') {
        return NextResponse.redirect('/404');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user)

}

export async function DELETE(
    request: Request,
    {params}: {params: FavouritesRouteParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.redirect('/login');
    }

    const {listingId} = params;

    if (!listingId ||typeof listingId !== 'string') {
        return NextResponse.redirect('/404');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user)

}
