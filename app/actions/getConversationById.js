import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


const getConversationById = async (conversationId) => {
    try {
        const currenUser = await getCurrentUser();

        if (!currenUser?.email) {
            return null;
        }

        const conversation = await prisma.conversetion.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        return conversation
    } catch (error) {
        return null;
    }
}

export default getConversationById;