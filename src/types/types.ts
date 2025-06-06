export type User = {
  id: string;
  email: string;
  password: string;
  username: string;
  avatarUrl: string | null;
  role: "AGENT" | "HOUSE_SEEKER";
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
};

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
  isFavorited?: boolean;
  owner?: User
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

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type LoginData =
  | { email: string; password: string; username?: never }
  | { username: string; password: string; email?: never };

export interface ApiError {
  message: string;
}

type RoleType = "AGENT" | "HOUSE_SEEKER";

export type RoleOption = {
  value: RoleType;
  label: string;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  senderName: string;
  images?: { url: string }[];
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
};

export type Image = {
  id: string;
  url: string;
  messageId: string;
};

export type TokenPayload = {
  userId: string;
  accountType: string;
  id: string;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  sub: string;
};

export type HouseFilters = {
  district?: string;
  sector?: string;
  category?: string;
  userId?: string;
};
