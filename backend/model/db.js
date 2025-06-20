import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getUsers = async (where = {}) => {
    try {
        const user = await prisma.user.findMany({
            where: where,
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to fetch users', 500);
    }
};

const getAllUsers = async () => {
    try {
        const user = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
            },
            orderBy: {
                username: 'asc',
            },
        });
        return user;
    } catch (error) {
        throw new DatabaseError('Unable to fetch users', 500);
    }
};

const createUser = async (username, password) => {
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
                profile: {
                    create: {
                        bio: 'Welcome to my profile!',
                    },
                },
            },
        });
        return user;
    } catch (error) {
        if (error.code == 'P2002') {
            throw new DatabaseError('Username is already in use.', 409);
        }
        throw new DatabaseError('Unable to insert user');
    }
};

const getProfile = async (userId) => {
    try {
        const profile = await prisma.profile.findFirst({
            select: {
                bio: true,
                user: {
                    select: {
                        username: true,
                    },
                },
            },
            where: {
                userId: Number(userId),
            },
        });
        return profile;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve profile');
    }
};

const updateProfile = async (userId, bio) => {
    try {
        const profile = await prisma.profile.update({
            data: {
                bio,
            },
            where: {
                userId,
            },
        });
        return profile;
    } catch (error) {
        throw new DatabaseError('Unable to update profile');
    }
};

const getAllChats = async (userId) => {
    try {
        const chats = await prisma.chat.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                latestMessage: {
                    select: {
                        content: true,
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
            orderBy: {
                latestMessage: {
                    sendTime: 'desc',
                }
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
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('unable to create chat');
    }
};

const getChatMessages = async (userId, chatId) => {
    try {
        const chat = await prisma.chat.findFirst({
            select: {
                messages: {
                    select: {
                        id: true,
                        content: true,
                        sendTime: true,
                        sender: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                    orderBy: {
                        sendTime: 'asc',
                    },
                },
            },
            where: {
                id: Number(chatId),
                users: {
                    some: {
                        id: Number(userId),
                    },
                },
            },
        });
        if (!chat) throw new Error();
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chat');
    }
};

const createMessage = async (chatId, senderId, content) => {
    try {
        const message = await prisma.message.create({
            data: {
                chatId: Number(chatId),
                senderId: Number(senderId),
                content,
                latestMessage: {
                    connect: {
                        id: Number(chatId),
                    },
                },
            },
        });
        return message;
    } catch (error) {
        throw new DatabaseError('Error creating message');
    }
};

export {
    getUsers,
    getAllUsers,
    createUser,
    getProfile,
    updateProfile,
    getAllChats,
    createChat,
    getChatMessages,
    createMessage,
};
