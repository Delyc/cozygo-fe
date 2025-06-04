import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  accountType: string;
  id: string;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  sub: string
}

export function decodeToken(token: string): TokenPayload | null {
  try {

    const decoded = jwt.decode(token);
    return decoded as TokenPayload; 
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

