import prisma from "../db.js";

type User = {
  id: string;
  username: string;
  hashed_password: string;
  salt: string;
  email: string;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { username, hashed_password, salt, email } = user;
  return await prisma.user.create({
    data: {
      username,
      hashed_password,
      salt,
      email,
    },
  });
};

export const checkUser = async (user: string): Promise<User> => {
  return await prisma.user.findUnique({
    where: {
      username: user,
    },
  });
};
