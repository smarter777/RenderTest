import bcrypt from 'bcryptjs';

export const comparePassword = async (
  normalPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(normalPassword, hashedPassword);
};
