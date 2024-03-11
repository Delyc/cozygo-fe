// import { HouseDTO } from "@/types/houses";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
// import { decodeToken } from "@/helpers/decodeToken";
// type AddHouseParams = {
//   userId: number;
//   houseId: number;

// };

// const chatSlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:4000/api/messages/",
//     prepareHeaders: (headers, { getState }) => {
//       const token = localStorage.getItem("token");
//       // const token = (getState() as RootState);
//       if (token != null) {
//         headers.set("authorization", `Bearer ${token}`);
//         return headers;
//       }
//     },
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials: { email: string; password: string }) => {
//         return { url: "/auth/authenticate", method: "POST", body: credentials };
//       },
//     }),

//     register: builder.mutation({
//       query: (info: any) => {
//         return { url: "/auth/register", method: "POST", body: info };
//       },
//     }),

//     registerHouse: builder.mutation({
//       query: (companyData) => ({
//         url: `/houses/create/${companyData.id}`,
//         method: "POST",
//         body: companyData.allData,
//       }),
//     }),

//     updateHouse: builder.mutation({
//       query: (updateHouseData: { houseId: number; data: any }) => ({
//         url: `/updateHouse/${updateHouseData.houseId}`,
//         method: "PUT",
//         body: updateHouseData.data,
//       }),
//     }),

//     fetchHouses: builder.query<HouseDTO[], string>({
//       query: () => "/getAllHouses",
//     }),

//     fetchSingleHouse: builder.query<HouseDTO, string>({
//       query: (houseId: string) => `/getAllHouses/${houseId}`,
//     }),

//     toggleHouseInWishList: builder.mutation<unknown, AddHouseParams>({
//       query: (addHouseParams: AddHouseParams) => ({
//         url: `wishlist/addHouse?user_id=${addHouseParams.userId}&house_id=${addHouseParams.houseId}`,
//         method: "POST",
//       }),
//     }),

//     getHouseWishlist: builder.query<{ house: HouseDTO; id: number }[], number>({
//       query: (id: number) => `/wishlist/get/${id}`,
//     }),

//     deleteHouse: builder.mutation<unknown, number>({
//       query: (houseId: number) => ({
//         url: `deleteHouse/${houseId}`,
//         method: "DELETE",
//       }),
//     }),

//     fetchConvo: builder.query({
//       query:
//     })

//     // fetchEvents: builder.query<EventDto[], string>({
//     //   query: () => "/events",
//     // }),
//     // fetchParticipants: builder.query<ParticipantDto[], string | null>({
//     //   query: (eventId) => {
//     //     if (eventId == null) return "/participants";
//     //     return `/participants/event/${eventId}`;
//     //   },
//     // }),
//     // deleteParticipant: builder.mutation<unknown, string>({
//     //   query: (participantId) => ({
//     //     url: `participants/${participantId}`,
//     //     method: "DELETE",
//     //   }),
//     // }),
//   }),
// });

// export default apiSlice;

// export const {
//   useLoginMutation,
//   useRegisterHouseMutation,
//   useFetchHousesQuery,
//   useGetHouseWishlistQuery,
//   useToggleHouseInWishListMutation,
//   useDeleteHouseMutation,
//   useUpdateHouseMutation,
//   useFetchSingleHouseQuery,
//   useRegisterMutation,
// } = apiSlice;
