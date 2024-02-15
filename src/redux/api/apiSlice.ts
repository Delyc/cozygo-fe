import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
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
        url: "/houses/create/2052",
        method: "POST",
        body: companyData,
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

export const { useLoginMutation, useRegisterHouseMutation } = apiSlice;
