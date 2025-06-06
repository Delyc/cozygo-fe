import { useEffect, useState } from "react";
import { fetchChatImages } from "../apis/chat";
import { Image } from "@/types/types";

export function useFetchChatImages(user1: string, user2: string) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user1 || !user2) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchChatImages(user1, user2);
        setImages(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [user1, user2]);

  return { images, loading, error };
}
