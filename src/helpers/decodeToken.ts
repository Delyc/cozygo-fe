import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  accountType:String;
  id: String;
  profilePictureUrl: any;
  firstName: String;
  lastName: String;
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
