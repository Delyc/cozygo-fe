import { ApiError, Image } from "@/types/types";

const baseURL = "http://localhost:8000/api";

export async function fetchChatImages(
  user1: string,
  user2: string
): Promise<Image[]> {
  
  const res = await fetch(`${baseURL}/chat/images/${user1}/${user2}`);

  if (!res.ok) {
    const errorData: ApiError = await res.json();
    throw new Error(errorData.message || "Failed to fetch images");
  }

  const data: Image[] = await res.json();
  return data;
}
