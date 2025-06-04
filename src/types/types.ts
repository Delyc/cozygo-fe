export type User = {
    id: string;
    email: string;
    password: string;
    username: string;
    avatarUrl: string | null;
    role: 'AGENT' | 'HOUSE_SEEKER';
    isVerified: boolean;
    verificationToken: string | null;
    isOnline: boolean;
    createdAt: string;
    updatedAt: string;
  };
  
  export type LoginResponse = {
    token: string;
    user: User;
  };

  
export type Profile = {
  id: string;
  username: string;
  avatarUrl: string | null;
  isOnline: boolean;
  isVerified: boolean;


}
  export type House = {
  id: string;
  title: string;
  bedRooms: number;
  bathRooms: number;
  area: number;
  price: number;
  description: string;
  typeOfHouse: string;
  district: string;
  sector: string;
  coverImageUrl?: string;
  pictureUrls?: string[];
  features?: Record<string, boolean>;
  createdAt: string;
  updatedAt: string;
  availableStatus?: string;
  };
  
  export type FeaturesState = {
    airConditioning: boolean;
    balcony: boolean;
    builtInWardrobes: boolean;
    garden: boolean;
    garage: boolean;
    swimmingPool: boolean;
    internet: boolean;
  };
  


export interface RegisterData {
    username: string;
    email: string;
    password: string;
  }
  
export type LoginData =
  | { email: string; password: string; username?: never }
  | { username: string; password: string; email?: never };

  
 export interface ApiError {
    message: string;
  }

  type RoleType = "AGENT" | "HOUSE_SEEKER";

  export interface RoleOption {
    value: RoleType;
    label: string;
  }
  
  