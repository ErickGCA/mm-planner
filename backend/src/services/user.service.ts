import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

type UserCreationData = {
  email: string;
  password: string;
  name: string;
};

export const userService = {
  create: async (data: UserCreationData) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  }
};