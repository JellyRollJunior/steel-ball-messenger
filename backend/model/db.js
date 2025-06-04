import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (params = {}) => {
    try {
        const user = await prisma.user.findMany({
            where: params
        })
        return user;
    } catch (error) {
        throw error;
    }
}

const insertUser = async (username, password) => {
    try {
        const user = await prisma.user.create({
            data: { username, password },
        });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { getUsers, insertUser }