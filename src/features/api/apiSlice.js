import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
   reducerPath: 'lwsApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9000',
   }),
   endpoints: (builder) => ({
      getVideos: builder.query({
         query: () => '/videos',
      }),
   }),
});

export const { useGetVideosQuery } = apiSlice;
