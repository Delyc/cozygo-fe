import { useQuery } from "@tanstack/react-query";
import { fetchHouseByIdApi, fetchHousesApi } from "../apis/house";
import { House } from "@/types/types";
import { HouseFilters } from "@/types/types";

export function useFetchHouses(filters: HouseFilters = {}) {
  return useQuery<House[], Error>({
    queryKey: ['houses', filters],
    queryFn: () => fetchHousesApi(filters),
  });
}

export function useFetchHouseById(
  id: string | number | undefined,
  userId: string,
  options = {}
) {
  return useQuery<House, Error>({
    queryKey: ['house', id, userId],
    queryFn: () => {
      if (id === undefined) {
        return Promise.reject(new Error('Invalid id'));
      }
      return fetchHouseByIdApi(id, userId);
    },
    enabled: !!id,
    ...options,
  });
}
