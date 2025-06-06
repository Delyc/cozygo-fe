import { TokenPayload } from '@/types/types';
import jwt from 'jsonwebtoken';

export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token);
    return decoded as TokenPayload; 
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

