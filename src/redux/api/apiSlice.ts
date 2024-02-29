import { HouseDTO } from "@/types/houses";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type AddHouseParams = {
  userId: number;
  houseId: number;
};

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://capstoneapi-production-b1ec.up.railway.app/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token != null) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return { url: "/users/login", method: "POST", body: credentials };
      },
    }),

    registerHouse: builder.mutation({
      query: (companyData) => ({
        url: "/houses/create/1",
        method: "POST",
        body: companyData,
      }),
    }),

    updateHouse: builder.mutation({
      query: (updateHouseData: { houseId: number; data: any }) => ({
        url: `/updateHouse/${updateHouseData.houseId}`,
        method: "PUT",
        body: updateHouseData.data,
      }),
    }),

    fetchHouses: builder.query<HouseDTO[], string>({
      query: () => "/getAllHouses",
    }),

    fetchSingleHouse: builder.query<HouseDTO, string>({
      query: (houseId: string) => `/getAllHouses/${houseId}`,
    }),

    toggleHouseInWishList: builder.mutation<unknown, AddHouseParams>({
      query: (addHouseParams: AddHouseParams) => ({
        url: `wishlist/addHouse?user_id=${addHouseParams.userId}&house_id=${addHouseParams.houseId}`,
        method: "POST",
      }),
    }),

    getHouseWishlist: builder.query<{ house: HouseDTO; id: number }[], number>({
      query: (userId: number) => `/wishlist/get/${2}`,
    }),

    deleteHouse: builder.mutation<unknown, number>({
      query: (houseId: number) => ({
        url: `deleteHouse/${houseId}`,
        method: "DELETE",
      }),
    }),

    // fetchEvents: builder.query<EventDto[], string>({
    //   query: () => "/events",
    // }),
    // fetchParticipants: builder.query<ParticipantDto[], string | null>({
    //   query: (eventId) => {
    //     if (eventId == null) return "/participants";
    //     return `/participants/event/${eventId}`;
    //   },
    // }),
    // deleteParticipant: builder.mutation<unknown, string>({
    //   query: (participantId) => ({
    //     url: `participants/${participantId}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export default apiSlice;

export const {
  useLoginMutation,
  useRegisterHouseMutation,
  useFetchHousesQuery,
  useGetHouseWishlistQuery,
  useToggleHouseInWishListMutation,
  useDeleteHouseMutation,
  useUpdateHouseMutation,
  useFetchSingleHouseQuery,
} = apiSlice;
