export type HouseDTO = {
  updatedAt: any;
  id: number;
  title: string;
  price: string;
  coverImageUrl: string;
  agentPicture: string;
  bathRooms?: number;
  area?: String;
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
  district: any;
  sector: any;
  type: string;
  user: any;
  houseId: any,
  pictures: any

};

export type Wishlist = {
  id: number | null;
  house: HouseDTO | null;
};
