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
    } = body

    Object.keys(body).forEach((key)=> {
        if (!body[key]) {
            return NextResponse.error()
        }
    });

    const pet = await prisma.pet.create({
        data: {
            name,
            age: parseInt(age),
            kind,
            breed,
            userId: currentUser.id
        }
    });

    return NextResponse.json(pet)
}