import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        const { conversationId } = params;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const conversation = await client.conversetion.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if (!conversation) {
            return new NextResponse("Invalid id", {status: 400})
        }

        const deletedConversation = await client.conversetion.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        conversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, "conversation:remove", conversation)
            }
        })

        return NextResponse.json(deletedConversation);
    } catch (error) {
        console.log(error, "ERROR_CONVERSATION_DELETE");
        return new NextResponse("Internal error", {status: 500})
    }
}