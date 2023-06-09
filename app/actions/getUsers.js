import prisma from "@/app/libs/prismadb";

import getSession from "./getSessions";

const getUsers = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                NOT: {
                    email: session?.user?.email
                }
            }
        });

        return users;
    } catch (error) {
        return [];
    }
};

export default getUsers;