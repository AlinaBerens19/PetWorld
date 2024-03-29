
import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import { getCurrentUser } from "@/app/actions/getServerSession"

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.redirect("/login")
    }

    const body = await request.json()
    const {
        name,
        age,
        kind,
        breed,
        gender,
        imageSrc,
        description,
        category,
        price,
        latitude,
        longitude,
        firstImage,
        secondImage,
        thirdImage,
        fourthImage,
    } = body

    Object.keys(body).forEach((key)=> {
        if (!body[key]) {
            return NextResponse.error()
        }
    });

    const listing = await prisma.listing.create({
        data: {
            name,
            age: parseInt(age),
            kind,
            breed,
            gender,
            imageSrc,
            description,
            category,
            price: parseInt(price, 10),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            firstImage,
            secondImage,
            thirdImage,
            fourthImage,
            userId: currentUser.id,
        }

    })

    return NextResponse.json(listing)
}