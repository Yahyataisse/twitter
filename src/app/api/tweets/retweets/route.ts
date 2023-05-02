import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
        const tweets = await prisma.tweet.findMany({
            where: {
                isRetweet: true,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        photoUrl: true,
                    },
                },
                likedBy: {
                    select: {
                        id: true,
                    },
                },
                retweetedBy: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
            ],
        });

        return NextResponse.json({ success: true, tweets });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}
