import { NextResponse } from "next/server";

import { prisma } from "@/prisma/client";

export async function GET(request: Request, { params: { tweetId } }: { params: { tweetId: string } }) {
    try {
        const tweet = await prisma.tweet.findUnique({
            where: {
                id: tweetId,
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
                        username: true,
                        name: true,
                        description: true,
                        photoUrl: true,
                        followers: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                photoUrl: true,
                            },
                        },
                    },
                },
                retweetedBy: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        description: true,
                        photoUrl: true,
                        followers: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                photoUrl: true,
                            },
                        },
                    },
                },
                retweetOf: {
                    select: {
                        id: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                photoUrl: true,
                            },
                        },
                        authorId: true,
                        createdAt: true,
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
                        photoUrl: true,
                        text: true,
                        isReply: true,
                        replies: {
                            select: {
                                authorId: true,
                            },
                        },
                    },
                },
                repliedTo: {
                    select: {
                        id: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
                replies: {
                    select: {
                        authorId: true,
                    },
                },
            },
        });
        return NextResponse.json({ success: true, tweet });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}
