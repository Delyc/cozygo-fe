export type HouseDTO = {
  id: number;
  title: string;
  price: string;
  coverImageUrl: string;
  agentPicture: string;
  baths?: number;
  area?: number;
  description: string;
  lat: number | null;
  longi: number | null;
  streetNumber: number | null;
  wishlists: Wishlist[];
  agentId: number;
  agentName: string;
  agentEmail: string;
  agentPhoneNumber: string;
  bedRooms: number;
  typeOfHouse: string | null;
  pictureUrls: string[];
  videoUrls: string[];
  address: string;
  features: Record<string, any>;
  country: string;
};

export type Wishlist = {
  id: number | null;
  house: HouseDTO | null;
};
