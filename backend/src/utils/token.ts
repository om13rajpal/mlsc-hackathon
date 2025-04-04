import { sign, verify } from "jsonwebtoken";
import { ISSUER, JWT_SECRET } from "../config/config";

export function generateToken(username: string): unknown {
  const payload = {
    iss: ISSUER + Math.random().toString(),
    sub: username,
    jti: Math.random().toString(),
  };

  return sign(payload, JWT_SECRET!, {
    expiresIn: 86400,
  });
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = verify(token, JWT_SECRET!);
    if (decoded) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
