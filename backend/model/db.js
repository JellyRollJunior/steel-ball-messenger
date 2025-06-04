import { PrismaClient } from "@prisma/client";
import { DatabaseError } from "../errors/DatabaseError.js";

const prisma = new PrismaClient();

const getUsers = async (params = {}) => {
    try {
        const user = await prisma.user.findMany({
            where: params,
        });
        return user;
    } catch (error) {
        throw new DatabaseError("Unable to fetch users", 500);
    }
};

const insertUser = async (username, password) => {
    try {
        const user = await prisma.user.create({
            data: { username, password },
        });
        return user;
    } catch (error) {
        if (error.code == "P2002") {
            throw new DatabaseError("Username is already in use.", 409);
        }
        throw new DatabaseError("Unable to insert user");
    }
};

export { getUsers, insertUser };
