import {  House } from "@/types/types";

const baseURL = "http://localhost:8000/api";

type HouseFilters = {
    district?: string;
    sector?: string;
    category?: string;
    userId?: string; 
  };
  


export async function fetchHousesApi(filters: HouseFilters): Promise<House[]> {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const response = await fetch(`${baseURL}/houses?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch houses');
  }

  return response.json();
}


export async function fetchHouseByIdApi(id: number | string, userId: string): Promise<House> {
  const response = await fetch(`http://localhost:8000/api/houses/${id}?userId=${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch house');
  }

  return response.json();
}

