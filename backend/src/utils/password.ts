import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(
  hashedPassword: string,
  password: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(password, hashedPassword);
  return isMatched;
}
