import bcrypt from "bcrypt";
const saltRounds = 10;

type Password = {
  hashed_password: string;
  salt: string;
};

export const hashPassword = async (password: string): Promise<Password> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed_password = await bcrypt.hash(password, salt);

  return {
    hashed_password,
    salt,
  };
};

export const checkPassword = async (
  password: string,
  hash: string
): Promise<Boolean> => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
