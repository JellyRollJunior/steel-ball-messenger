import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getUsers = async (params = {}) => {
    try {
        const user = await prisma.user.findMany({
            where: params,
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to fetch users', 500);
    }
};

const createUser = async (username, password) => {
    try {
        const user = await prisma.user.create({
            data: { username, password },
        });
        return user;
    } catch (error) {
        if (error.code == 'P2002') {
            throw new DatabaseError('Username is already in use.', 409);
        }
        throw new DatabaseError('Unable to insert user');
    }
};

const getChats = async (userId) => {
    try {
        const chats = await prisma.chat.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
            where: {
                users: {
                    some: {
                        id: Number(userId),
                    },
                },
            },
        });
        return chats;
    } catch (error) {
        throw new DatabaseError('unable to retrieve chats');
    }
};

const createChat = async (users) => {
    try {
        const userIdArray = users.map((user) => ({ id: user.id }));
        const chat = await prisma.chat.create({
            data: {
                users: {
                    connect: userIdArray,
                },
            },
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('unable to insert chat');
    }
};

export { getUsers, createUser, getChats, createChat };
