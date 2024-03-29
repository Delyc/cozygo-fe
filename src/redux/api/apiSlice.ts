import { HouseDTO } from "@/types/houses";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { decodeToken } from "@/helpers/decodeToken";
import { GiMailShirt } from "react-icons/gi";
type AddHouseParams = {
  userId: number;
  houseId: number;

};

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers, { getState }) => {
      // const token = localStorage.getItem("token");
      // const token = (getState() as RootState);
      // if (token != null) {
      //   headers.set("authorization", `Bearer ${token}`);
      //   return headers;
      // }
      return headers;

    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => {
        return { url: "/auth/authenticate", method: "POST", body: credentials };
      },
    }),

    register: builder.mutation({
      query: (info: any) => {
        return { url: "/auth/register", method: "POST", body: info };
      },
    }),

    registerHouse: builder.mutation({
      query: (companyData) => ({
        url: `/agent/addHouse/${companyData.id}`,
        method: "POST",
        body: companyData.allData,
      }),
    }),

    updateHouse: builder.mutation({
      query: (updateHouseData: { houseId: number; data: any }) => ({
        url: `/houses/updateHouse/${updateHouseData.houseId}`,
        method: "PUT",
        body: updateHouseData.data,
      }),
    }),

    fetchHouses: builder.query<HouseDTO[], string>({
      query: () => "/public/houses",
    }),

    fetchSingleHouse: builder.query<HouseDTO, string>({
      query: (houseId: string) => `/public/houses/${houseId}`,
    }),

    userProfile: builder.query<{ user: any }, string>({
      query: (email: string) => `/auth/user/liplann@gmail.com`,
    }),

    toggleHouseInWishList: builder.mutation<unknown, AddHouseParams>({
      query: (addHouseParams: AddHouseParams) => ({
        url: `/user/toggle/${addHouseParams.userId}/${addHouseParams.houseId}`,
        method: "POST",
      }),
    }),

    getHouseWishlist: builder.query<{ house: HouseDTO; id: number }[], number>({
   
      query: (id: number) => `/public/wishlist/get/5`,
    }),

    deleteHouse: builder.mutation<unknown, number>({
      query: (houseId: number) => ({
        url: `deleteHouse/${houseId}`,
        method: "DELETE",
      }),
    }),



    //availabilities

    addAvailability: builder.mutation({
      query: (availabilityData) => ({
        url: `/agent/addAvailability/${availabilityData.id}`,
        method: "POST",
        body: availabilityData,
      }),
    }),

    fetchingAvailabilities: builder.query<any, string>({
      query: (houseId: string) => `/public/allAvailabilities`,
    }),


    updateAvailability: builder.mutation({
      query: (updateAvailabilityData) => ({
        url: `/agent/updateAvailability/${updateAvailabilityData.availabilityId}`,
        method: "PATCH",
        body: updateAvailabilityData.data,
      }),
    }),
    //booking

    bookVisit: builder.mutation({
      query: (requestData) => ({
        url: `/user/book/${requestData.userId}/availability/${requestData.availabilityId}`,
        method: "POST",
        body: requestData,
      }),
    }),


    fetchBookingRequests : builder.query<any, string>({
      query: () => `/user/allBookings`,
    }),

    updateBookingRequest: builder.mutation({
      query: (updateBookingData) => ({
        url: `/agent/updateBooking/${updateBookingData.bookingId}`,
        method: "PATCH",
        body: updateBookingData.data,
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
  useRegisterMutation,
  useUserProfileQuery,
  useAddAvailabilityMutation,
  useFetchingAvailabilitiesQuery,
  useBookVisitMutation,
  useUpdateAvailabilityMutation,
  useFetchBookingRequestsQuery,
  useUpdateBookingRequestMutation
} = apiSlice;






