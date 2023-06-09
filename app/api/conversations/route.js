import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const currenUser = await getCurrentUser();
        const body = await request.json();
        const { userId, isGroup, members, name } = body;
        
        if (!currenUser?.id || !currenUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (isGroup && (!members || members?.length < 2 || !name)) {
            return new NextResponse("Invalid data", { status: 400 });
        }

        if (isGroup) {
            const newConversation = await client.conversetion.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member) => ({
                                id: member.value
                            })),
                            {
                                id: currenUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true,
                },
            });

            newConversation.users.forEach((user) => {
                if (user?.email) {
                    pusherServer.trigger(user?.email, "conversation:new", newConversation)
                }
            })

            return NextResponse.json(newConversation);
        };

        const existingConversations = await client.conversetion.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currenUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currenUser.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await client.conversetion.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currenUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        newConversation.users.map((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, "conversation:new", newConversation)
            }
        })

        return NextResponse.json(newConversation);
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}